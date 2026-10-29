import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal";
import { termsContent } from "@/content/legal";
import { JsonLd, getBreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Terms & Conditions | The Lumbini Exports",
  description:
    "Terms and conditions governing quotation requests, natural stone variations, and supply contracts with The Lumbini Exports in Telangana, India.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Terms & Conditions", path: "/terms" },
        ])}
      />
      <LegalPageLayout document={termsContent} />
    </>
  );
}
