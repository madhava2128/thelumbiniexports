import { z } from "zod";

/**
 * Shared Zod Schema for Stone Quote RFQ requests.
 * Used for both client-side validation and server-side route handler enforcement.
 */
export const quoteSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Please enter your full name (at least 2 characters)")
      .max(100, "Name must be less than 100 characters"),

    company: z
      .string()
      .trim()
      .min(2, "Please enter your company or firm name")
      .max(120, "Company name must be less than 120 characters"),

    email: z
      .string()
      .trim()
      .min(1, "Please enter your email address")
      .email("Please enter a valid email address"),

    phone: z
      .string()
      .trim()
      .max(30, "Phone number is too long")
      .optional()
      .or(z.literal("")),

    country: z
      .string()
      .trim()
      .min(2, "Please enter your destination country or location")
      .max(100, "Country name is too long"),

    stone: z
      .string()
      .trim()
      .min(1, "Please select a stone type from our collection"),

    quantity: z
      .string()
      .trim()
      .min(1, "Please enter required quantity"),

    unit: z
      .string()
      .trim()
      .min(1, "Please select a quantity unit"),

    thickness: z
      .string()
      .trim()
      .min(1, "Please select a thickness"),

    size: z
      .string()
      .trim()
      .min(1, "Please select a size or format"),

    customSize: z
      .string()
      .trim()
      .max(300, "Custom size description is too long")
      .optional()
      .or(z.literal("")),

    delivery: z
      .string()
      .trim()
      .min(1, "Please select a delivery shipment term"),

    destination: z
      .string()
      .trim()
      .max(150, "Destination is too long")
      .optional()
      .or(z.literal("")),

    message: z
      .string()
      .trim()
      .max(3000, "Message must be under 3000 characters")
      .optional()
      .or(z.literal("")),

    consent: z
      .boolean()
      .refine((val) => val === true, "You must agree to the Privacy Policy to submit an inquiry"),

    // Anti-spam honeypot (must remain empty for real humans)
    website_hp: z.string().optional().or(z.literal("")),

    // Optional Cloudflare Turnstile token
    turnstileToken: z.string().optional().or(z.literal("")),
  })
  .refine(
    (data) => {
      const num = parseFloat(data.quantity);
      return !isNaN(num) && num > 0;
    },
    {
      message: "Please enter a valid quantity greater than 0",
      path: ["quantity"],
    }
  )
  .refine(
    (data) => {
      if (data.size === "custom") {
        return Boolean(data.customSize && data.customSize.trim().length > 0);
      }
      return true;
    },
    {
      message: "Please specify your custom dimensions or project cutting requirements",
      path: ["customSize"],
    }
  );

export type QuoteFormValues = z.infer<typeof quoteSchema>;
export type QuoteFormInput = z.input<typeof quoteSchema>;
export type QuoteFormErrors = Partial<Record<keyof QuoteFormInput, string>>;
