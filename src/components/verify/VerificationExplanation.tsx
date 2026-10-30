import React from "react";
import { ShieldCheck, Info } from "lucide-react";
import { Heading } from "@/components/ui";

interface VerificationExplanationProps {
  recipientName: string;
}

export function VerificationExplanation({
  recipientName,
}: VerificationExplanationProps) {
  return (
    <div className="space-y-6">
      <div>
        <Heading variant="section" as="h2" className="text-obsidian text-2xl sm:text-3xl">
          About This Verification
        </Heading>
        <p className="text-stone-grey-text text-sm sm:text-base mt-1">
          How credential authenticity is established and verified.
        </p>
      </div>

      <div className="bg-ivory-surface rounded-lg border border-stone/25 p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="flex items-start gap-3.5">
          <ShieldCheck className="w-6 h-6 text-gold shrink-0 mt-0.5" aria-hidden="true" />
          <div className="space-y-2">
            <h3 className="font-sans font-semibold text-obsidian text-base sm:text-lg">
              Issuer Stored Record Verification
            </h3>
            <p className="text-stone-grey-text text-sm sm:text-base leading-relaxed">
              Issued by The Lumbini Exports to {recipientName} and checked against the issuer&apos;s stored credential record. When this page is opened, the credential is automatically verified against the authoritative server record in real time.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-stone/15 flex items-start gap-3.5">
          <Info className="w-5 h-5 text-stone-grey-text shrink-0 mt-0.5" aria-hidden="true" />
          <p className="text-xs sm:text-sm text-stone-grey-text leading-relaxed">
            <strong className="text-obsidian font-semibold">Important Distinction:</strong> This online verification confirms that the award record, dates, and programme identity exist in The Lumbini Exports&apos; official administrative registry. Because PDF files can be renamed or modified once downloaded and shared, always refer to this canonical URL for authentic confirmation.
          </p>
        </div>
      </div>
    </div>
  );
}

