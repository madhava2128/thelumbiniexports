import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { quoteSchema } from "@/lib/quote-schema";
import { stones } from "@/content/stones";
import {
  quantityUnits,
  thicknessOptions,
  sizeChoices,
  deliveryChoices,
} from "@/content/quote-options";

// In-memory rate limiting tracker (per IP)
interface RateLimitEntry {
  count: number;
  resetAt: number;
}
const rateLimitMap = new Map<string, RateLimitEntry>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

// Periodically purge expired rate limit entries to prevent memory leaks
function cleanupRateLimits() {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (entry.resetAt <= now) {
      rateLimitMap.delete(ip);
    }
  }
}

// Helpers to get human-readable labels for email formatting
function getStoneLabel(slug: string): string {
  const found = stones.find((s) => s.slug === slug);
  return found ? `${found.name} (${found.type})` : slug;
}

function getUnitLabel(unitId: string): string {
  const found = quantityUnits.find((u) => u.id === unitId);
  return found ? found.label : unitId;
}

function getThicknessLabel(thicknessId: string): string {
  const found = thicknessOptions.find((t) => t.id === thicknessId);
  return found ? `${found.label} - ${found.description}` : thicknessId;
}

function getSizeLabel(sizeId: string): string {
  const found = sizeChoices.find((s) => s.id === sizeId);
  return found ? found.label : sizeId;
}

function getDeliveryLabel(deliveryId: string): string {
  const found = deliveryChoices.find((d) => d.id === deliveryId);
  return found ? `${found.label} - ${found.description}` : deliveryId;
}

export async function POST(req: NextRequest) {
  try {
    // 1. IP extraction & in-memory rate limiting
    const forwardedHeader = req.headers.get("x-forwarded-for");
    const ip =
      forwardedHeader?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";

    cleanupRateLimits();
    const now = Date.now();
    const existingLimit = rateLimitMap.get(ip);

    if (existingLimit && existingLimit.resetAt > now) {
      if (existingLimit.count >= MAX_REQUESTS_PER_WINDOW) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Too many quote requests from this network. Please wait a few minutes before submitting again or email us directly at thelumbiniexports@gmail.com.",
          },
          { status: 429 }
        );
      }
      existingLimit.count += 1;
    } else {
      rateLimitMap.set(ip, {
        count: 1,
        resetAt: now + RATE_LIMIT_WINDOW_MS,
      });
    }

    // 2. Parse request payload
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid JSON request payload." },
        { status: 400 }
      );
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Missing inquiry request body." },
        { status: 400 }
      );
    }

    const payload = body as Record<string, unknown>;

    // 3. Honeypot check (anti-bot)
    if (payload.website_hp && typeof payload.website_hp === "string" && payload.website_hp.trim().length > 0) {
      // Silently return success to mislead spam bots
      return NextResponse.json({
        success: true,
        message: "Your inquiry has been received.",
      });
    }

    // 4. Optional Cloudflare Turnstile Verification
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY?.trim();
    if (turnstileSecret) {
      const turnstileToken = payload.turnstileToken;
      if (!turnstileToken || typeof turnstileToken !== "string" || !turnstileToken.trim()) {
        return NextResponse.json(
          { success: false, error: "Bot verification required. Please reload the page." },
          { status: 400 }
        );
      }

      try {
        const verifyRes = await fetch(
          "https://challenges.cloudflare.com/turnstile/v0/siteverify",
          {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              secret: turnstileSecret,
              response: turnstileToken.trim(),
              remoteip: ip,
            }),
          }
        );
        const outcome = await verifyRes.json();
        if (!outcome.success) {
          return NextResponse.json(
            { success: false, error: "Bot verification failed. Please try again." },
            { status: 400 }
          );
        }
      } catch (err) {
        console.error("Turnstile verification error:", err);
        // Fail closed if Turnstile verification service errors
        return NextResponse.json(
          { success: false, error: "Security verification service unavailable. Please email us directly." },
          { status: 503 }
        );
      }
    }

    // 5. Zod Validation
    const parseResult = quoteSchema.safeParse(payload);
    if (!parseResult.success) {
      const flattened = parseResult.error.flatten();
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed. Please correct the highlighted errors.",
          fieldErrors: flattened.fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = parseResult.data;

    // 6. Build Email Content
    const stoneDisplay = getStoneLabel(data.stone);
    const unitDisplay = getUnitLabel(data.unit);
    const thicknessDisplay = getThicknessLabel(data.thickness);
    const sizeDisplay = getSizeLabel(data.size);
    const deliveryDisplay = getDeliveryLabel(data.delivery);

    const plainText = `
============================================================
NEW NATURAL STONE QUOTE REQUEST - THE LUMBINI EXPORTS
============================================================

CLIENT & CONTACT DETAILS:
------------------------------------------------------------
Name:             ${data.name}
Company:          ${data.company}
Email:            ${data.email}
Phone / WhatsApp: ${data.phone || "Not provided"}
Country:          ${data.country}

STONE SPECIFICATIONS:
------------------------------------------------------------
Stone Variety:    ${stoneDisplay}
Quantity:         ${data.quantity} ${unitDisplay}
Thickness:        ${thicknessDisplay}
Cut / Format:     ${sizeDisplay}${data.customSize ? `\nCustom Size Notes: ${data.customSize}` : ""}
Delivery Terms:   ${deliveryDisplay}${data.destination ? `\nDestination:       ${data.destination}` : ""}

PROJECT NOTES & MESSAGE:
------------------------------------------------------------
${data.message ? data.message : "No additional notes provided."}

METADATA:
------------------------------------------------------------
Submission Time:  ${new Date().toISOString()}
Sender IP:        ${ip}
============================================================
`.trim();

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Quote Request</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f6f2; color: #252827; margin: 0; padding: 24px;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 640px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2ddd5; border-radius: 4px; overflow: hidden;">
    <!-- Header -->
    <tr>
      <td style="background-color: #252827; padding: 24px; text-align: left; border-bottom: 2px solid #b89555;">
        <span style="color: #b89555; font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; font-weight: 600; display: block;">The Lumbini Exports &bull; RFQ Inquiry</span>
        <h1 style="color: #f3f0e8; font-size: 20px; margin: 4px 0 0 0; font-weight: 500;">New Stone Quote Request</h1>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="padding: 28px;">
        <!-- Contact Block -->
        <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #53645a; margin: 0 0 12px 0; border-bottom: 1px solid #e2ddd5; padding-bottom: 6px;">1. Client &amp; Contact Details</h2>
        <table width="100%" style="font-size: 14px; margin-bottom: 24px;">
          <tr>
            <td width="35%" style="color: #777c7d; padding: 4px 0;"><strong>Name:</strong></td>
            <td style="color: #252827; padding: 4px 0;">${data.name}</td>
          </tr>
          <tr>
            <td style="color: #777c7d; padding: 4px 0;"><strong>Company:</strong></td>
            <td style="color: #252827; padding: 4px 0;">${data.company}</td>
          </tr>
          <tr>
            <td style="color: #777c7d; padding: 4px 0;"><strong>Email:</strong></td>
            <td style="color: #252827; padding: 4px 0;"><a href="mailto:${data.email}" style="color: #b89555;">${data.email}</a></td>
          </tr>
          <tr>
            <td style="color: #777c7d; padding: 4px 0;"><strong>Phone:</strong></td>
            <td style="color: #252827; padding: 4px 0;">${data.phone || "Not provided"}</td>
          </tr>
          <tr>
            <td style="color: #777c7d; padding: 4px 0;"><strong>Country / Location:</strong></td>
            <td style="color: #252827; padding: 4px 0;">${data.country}</td>
          </tr>
        </table>

        <!-- Specs Block -->
        <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #53645a; margin: 0 0 12px 0; border-bottom: 1px solid #e2ddd5; padding-bottom: 6px;">2. Stone Requirements</h2>
        <table width="100%" style="font-size: 14px; margin-bottom: 24px;">
          <tr>
            <td width="35%" style="color: #777c7d; padding: 4px 0;"><strong>Stone Variety:</strong></td>
            <td style="color: #252827; padding: 4px 0; font-weight: 600;">${stoneDisplay}</td>
          </tr>
          <tr>
            <td style="color: #777c7d; padding: 4px 0;"><strong>Quantity:</strong></td>
            <td style="color: #252827; padding: 4px 0;">${data.quantity} ${unitDisplay}</td>
          </tr>
          <tr>
            <td style="color: #777c7d; padding: 4px 0;"><strong>Thickness:</strong></td>
            <td style="color: #252827; padding: 4px 0;">${thicknessDisplay}</td>
          </tr>
          <tr>
            <td style="color: #777c7d; padding: 4px 0;"><strong>Format / Sizing:</strong></td>
            <td style="color: #252827; padding: 4px 0;">${sizeDisplay}</td>
          </tr>
          ${
            data.customSize
              ? `<tr>
            <td style="color: #777c7d; padding: 4px 0;"><strong>Custom Cut Notes:</strong></td>
            <td style="color: #252827; padding: 4px 0; background-color: #f7f6f2; padding: 6px 8px; border-radius: 3px;">${data.customSize}</td>
          </tr>`
              : ""
          }
          <tr>
            <td style="color: #777c7d; padding: 4px 0;"><strong>Shipment Term:</strong></td>
            <td style="color: #252827; padding: 4px 0;">${deliveryDisplay}</td>
          </tr>
          ${
            data.destination
              ? `<tr>
            <td style="color: #777c7d; padding: 4px 0;"><strong>Destination:</strong></td>
            <td style="color: #252827; padding: 4px 0;">${data.destination}</td>
          </tr>`
              : ""
          }
        </table>

        <!-- Message Block -->
        <h2 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #53645a; margin: 0 0 12px 0; border-bottom: 1px solid #e2ddd5; padding-bottom: 6px;">3. Project Message</h2>
        <div style="background-color: #f9f8f5; border: 1px solid #e2ddd5; border-radius: 4px; padding: 14px; font-size: 14px; line-height: 1.6; color: #252827; margin-bottom: 24px; white-space: pre-wrap;">
          ${data.message ? data.message : "<em>No additional notes provided.</em>"}
        </div>

        <div style="text-align: center; padding-top: 8px;">
          <a href="mailto:${data.email}?subject=Quotation%20from%20The%20Lumbini%20Exports%20-%20${encodeURIComponent(data.stone)}" style="display: inline-block; background-color: #b89555; color: #252827; padding: 10px 24px; font-size: 13px; font-weight: 600; text-decoration: none; border-radius: 2px; text-transform: uppercase; letter-spacing: 1px;">Reply to Customer</a>
        </div>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background-color: #f7f6f2; padding: 14px 24px; text-align: center; font-size: 12px; color: #777c7d; border-top: 1px solid #e2ddd5;">
        The Lumbini Exports &bull; Elkathurthy Mandal, Hanamkonda District, Telangana 505476, India
      </td>
    </tr>
  </table>
</body>
</html>
`.trim();

    // 7. Send Email or Handle Development Fallback
    const resendApiKey = process.env.RESEND_API_KEY?.trim();
    const toEmail = process.env.QUOTE_TO_EMAIL?.trim() || "thelumbiniexports@gmail.com";
    const fromEmail =
      process.env.QUOTE_FROM_EMAIL?.trim() || "The Lumbini Exports <onboarding@resend.dev>";

    // If RESEND_API_KEY is missing (local development without keys), log to console and return success
    if (!resendApiKey || resendApiKey === "re_placeholder" || resendApiKey.startsWith("your_")) {
      if (process.env.NODE_ENV !== "production") {
        console.log("==================================================");
        console.log("[DEV MODE - RESEND_API_KEY NOT SET] Quote Received:");
        console.log(plainText);
        console.log("==================================================");
      }
      return NextResponse.json({
        success: true,
        message: "Quote request received successfully.",
        devMode: true,
      });
    }

    // Production email dispatch via Resend
    const resend = new Resend(resendApiKey);
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: data.email,
      subject: `New Stone Quote Request: ${data.name} - ${data.company} (${stoneDisplay})`,
      text: plainText,
      html: htmlContent,
    });

    if (emailError) {
      console.error("Resend API error:", emailError);
      return NextResponse.json(
        {
          success: false,
          error:
            "We were unable to deliver your quote inquiry automatically. Please contact us directly at thelumbiniexports@gmail.com.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Quote request submitted successfully.",
      id: emailData?.id,
    });
  } catch (error) {
    console.error("Unexpected error in /api/quote:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          "An unexpected server error occurred. Please try again or email us directly at thelumbiniexports@gmail.com.",
      },
      { status: 500 }
    );
  }
}
