// ============================================================================
// DRAFT: to be reviewed by a qualified professional before launch.
// ============================================================================

import type { Metadata } from "next";
import { LegalPageLayout } from "@/components/legal";
import { termsContent } from "@/content/legal";

export const metadata: Metadata = {
  title: "Terms & Conditions | The Lumbini Exports",
  description:
    "Terms and conditions governing the use of The Lumbini Exports website, product representations, non-binding quotations, and legal jurisdiction.",
};

export default function TermsPage() {
  return (
    <>
      {/* DRAFT: to be reviewed by a qualified professional before launch. */}
      <LegalPageLayout document={termsContent} />
    </>
  );
}
