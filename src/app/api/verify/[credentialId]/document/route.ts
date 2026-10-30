import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { getAllCredentials } from "@/lib/credential-service";

interface RouteParams {
  params: Promise<{ credentialId: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { credentialId } = await params;
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const isDownload = searchParams.get("download") === "1" || searchParams.get("download") === "true";

  if (!type || (type !== "certificate" && type !== "offer-letter")) {
    return NextResponse.json(
      { error: "Invalid document type requested. Valid options: 'certificate', 'offer-letter'." },
      { status: 400 }
    );
  }

  try {
    const records = await getAllCredentials();
    const record = records.find(
      (r) => r.id.toLowerCase() === (credentialId || "").trim().toLowerCase()
    );

    if (!record) {
      return NextResponse.json(
        { error: "Credential record not found." },
        { status: 404 }
      );
    }

    if (record.status !== "active") {
      return NextResponse.json(
        { error: `Document access unavailable. Credential status is '${record.status}'.` },
        { status: 403 }
      );
    }

    const docRef =
      type === "certificate"
        ? record.certificateDocument
        : record.offerLetterDocument;

    if (!docRef || !docRef.path) {
      return NextResponse.json(
        {
          error: `Document not yet supplied. The ${
            type === "certificate" ? "completion certificate" : "offer letter"
          } PDF is pending client upload.`,
        },
        { status: 404 }
      );
    }

    // Secure path resolution to prevent directory traversal
    const safeDocPath = path.resolve(/*turbopackIgnore: true*/ process.cwd(), docRef.path);
    if (!safeDocPath.startsWith(process.cwd())) {
      return NextResponse.json(
        { error: "Access denied." },
        { status: 403 }
      );
    }

    if (!fs.existsSync(safeDocPath)) {
      return NextResponse.json(
        {
          error: `Document file not found on server. The ${
            type === "certificate" ? "completion certificate" : "offer letter"
          } PDF has not yet been placed on the server.`,
        },
        { status: 404 }
      );
    }

    const fileBuffer = await fs.promises.readFile(safeDocPath);
    const filename = docRef.filename || `${type}.pdf`;
    const disposition = isDownload ? "attachment" : "inline";

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `${disposition}; filename="${encodeURIComponent(filename)}"`,
        "X-Content-Type-Options": "nosniff",
        "Cache-Control": "private, no-cache, no-store, must-revalidate",
      },
    });
  } catch (error) {
    console.error(`[Document API Error] Failed to serve ${type} for ${credentialId}:`, error);
    return NextResponse.json(
      { error: "Internal server error while processing document request." },
      { status: 500 }
    );
  }
}
