import React from "react";
import { CheckCircle2, Clock, AlertTriangle, XCircle, Ban } from "lucide-react";
import { Eyebrow, Heading } from "@/components/ui";
import { VerificationState } from "@/lib/credential-types";

interface VerificationHeaderProps {
  state: VerificationState;
  statusMessage: string;
  checkedAtFormattedIst: string;
  recipientName?: string;
  credentialId?: string;
}

export function VerificationHeader({
  state,
  statusMessage,
  checkedAtFormattedIst,
  recipientName,
  credentialId,
}: VerificationHeaderProps) {
  const getStatusBadge = () => {
    switch (state) {
      case "verified":
        return (
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium tracking-wide bg-emerald-50 text-emerald-900 border border-emerald-600/30"
            role="status"
            aria-label="Verification status: Verified credential"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" aria-hidden="true" />
            <span className="font-semibold uppercase tracking-wider">{statusMessage}</span>
          </div>
        );
      case "pending":
        return (
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium tracking-wide bg-amber-50 text-amber-900 border border-amber-500/40"
            role="status"
            aria-label="Verification status: Verification pending"
          >
            <Clock className="w-4 h-4 text-amber-700 shrink-0" aria-hidden="true" />
            <span className="font-semibold uppercase tracking-wider">{statusMessage}</span>
          </div>
        );
      case "revoked":
        return (
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium tracking-wide bg-rose-50 text-rose-900 border border-rose-500/40"
            role="status"
            aria-label="Verification status: Credential revoked"
          >
            <Ban className="w-4 h-4 text-rose-700 shrink-0" aria-hidden="true" />
            <span className="font-semibold uppercase tracking-wider">{statusMessage}</span>
          </div>
        );
      case "not_found":
        return (
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium tracking-wide bg-rose-50 text-rose-900 border border-rose-500/40"
            role="status"
            aria-label="Verification status: Credential not found"
          >
            <XCircle className="w-4 h-4 text-rose-700 shrink-0" aria-hidden="true" />
            <span className="font-semibold uppercase tracking-wider">{statusMessage}</span>
          </div>
        );
      case "error":
      default:
        return (
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium tracking-wide bg-rose-50 text-rose-900 border border-rose-500/40"
            role="status"
            aria-label="Verification status: Unable to verify"
          >
            <AlertTriangle className="w-4 h-4 text-rose-700 shrink-0" aria-hidden="true" />
            <span className="font-semibold uppercase tracking-wider">{statusMessage}</span>
          </div>
        );
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Eyebrow accent="gold" withLine>
          The Lumbini Exports &bull; Official Credential Record
        </Eyebrow>
        {getStatusBadge()}
      </div>

      <div className="space-y-2">
        <Heading variant="display" as="h1" className="text-ivory text-3xl sm:text-4xl lg:text-5xl">
          {state === "verified" && recipientName
            ? `Internship Credential Verification: ${recipientName}`
            : "Internship Credential Verification"}
        </Heading>

        {credentialId && (
          <p className="font-mono text-xs sm:text-sm text-gold/90 tracking-wider">
            RECORD ID: {credentialId}
          </p>
        )}
      </div>

      <div className="pt-2 border-t border-gold/20 flex flex-wrap items-center justify-between gap-y-2 gap-x-4 text-xs sm:text-sm text-ivory/70">
        <p>
          <span className="text-ivory/50">Authoritative Check:</span>{" "}
          <span className="text-ivory/90 font-medium">{checkedAtFormattedIst}</span>
        </p>
        <p className="text-xs text-ivory/60">
          Evaluated against the issuer&apos;s stored credential registry
        </p>
      </div>
    </div>
  );
}

