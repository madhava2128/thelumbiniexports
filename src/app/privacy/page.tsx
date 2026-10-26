// ============================================================================
// DRAFT: to be reviewed by a qualified professional before launch.
// ============================================================================

import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal";
import { privacyContent } from "@/content/legal";

export const metadata: Metadata = {
  title: "Privacy Policy | The Lumbini Exports",
  description:
    "Privacy policy detailing data collection, RFQ inquiry processing, transactional email transmission, data retention, and visitor rights for The Lumbini Exports.",
};

export default function PrivacyPage() {
  return (
    <>
      {/* DRAFT: to be reviewed by a qualified professional before launch. */}
      <LegalPageLayout document={privacyContent} />
    </>
  );
}
