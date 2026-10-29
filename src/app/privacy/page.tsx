import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal";
import { privacyContent } from "@/content/legal";
import { JsonLd, getBreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Privacy Policy | The Lumbini Exports",
  description:
    "Privacy policy detailing how The Lumbini Exports handles commercial inquiry information and communications for granite supply requests.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy" },
        ])}
      />
      <LegalPageLayout document={privacyContent} />
    </>
  );
}
