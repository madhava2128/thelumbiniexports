"use client";

import React, { useState } from "react";
import { Copy, Check, Download } from "lucide-react";
import { Heading, Button } from "@/components/ui";
import { CredentialRecord } from "@/lib/credential-types";

interface CredentialActionsProps {
  credential: CredentialRecord;
  canonicalUrl: string;
  linkedInUrl: string;
}

export function CredentialActions({
  credential,
  canonicalUrl,
  linkedInUrl,
}: CredentialActionsProps) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  const handleCopyLink = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(canonicalUrl);
        setCopied(true);
        setCopyError(false);
        setTimeout(() => setCopied(false), 3000);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = canonicalUrl;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const successful = document.execCommand("copy");
        document.body.removeChild(textArea);
        if (successful) {
          setCopied(true);
          setTimeout(() => setCopied(false), 3000);
        } else {
          setCopyError(true);
        }
      }
    } catch (err) {
      console.error("Failed to copy URL:", err);
      setCopyError(true);
    }
  };

  const certAvailable = Boolean(credential.certificateDocument?.fileAvailable);
  const offerAvailable = Boolean(credential.offerLetterDocument?.fileAvailable);

  const certDownloadUrl = `/api/verify/${encodeURIComponent(credential.id)}/document?type=certificate&download=1`;
  const offerDownloadUrl = `/api/verify/${encodeURIComponent(credential.id)}/document?type=offer-letter&download=1`;

  return (
    <div className="space-y-6">
      <div>
        <Heading variant="section" as="h2" className="text-obsidian text-2xl sm:text-3xl">
          Credential Actions
        </Heading>
        <p className="text-stone-grey-text text-sm sm:text-base mt-1">
          Share, download, or link this verified credential to professional profiles.
        </p>
      </div>

      <div className="bg-ivory-surface rounded-lg border border-stone/25 p-6 sm:p-8 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Action A: Download Certificate (if available) */}
          {certAvailable && (
            <Button
              href={certDownloadUrl}
              variant="primary"
              size="md"
              className="w-full flex items-center justify-center gap-2"
              aria-label="Download verified completion certificate PDF"
            >
              <Download className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Certificate PDF</span>
            </Button>
          )}

          {/* Action B: Copy Verification Link */}
          <button
            type="button"
            onClick={handleCopyLink}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-[14px] tracking-wide rounded-sm font-sans uppercase font-medium border border-obsidian/30 hover:border-obsidian hover:bg-obsidian/5 transition-all duration-200 cursor-pointer min-h-[44px] text-obsidian focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            aria-label="Copy canonical verification URL to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-700 shrink-0" aria-hidden="true" />
                <span className="text-emerald-800 font-semibold">Link Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-stone-grey-text shrink-0" aria-hidden="true" />
                <span>Copy Link</span>
              </>
            )}
          </button>

          {/* Action C: Add to LinkedIn Profile */}
          <a
            href={linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-[14px] tracking-wide rounded-sm font-sans uppercase font-medium bg-[#0A66C2] text-white hover:bg-[#084e96] transition-all duration-200 cursor-pointer min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold shadow-xs"
            aria-label="Add this credential to LinkedIn profile (opens LinkedIn in new tab)"
          >
            <svg
              className="w-4 h-4 fill-current shrink-0"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
            <span>Add to LinkedIn</span>
          </a>

          {/* Action D: Download Offer Letter (if available) */}
          {offerAvailable && (
            <Button
              href={offerDownloadUrl}
              variant="secondary"
              size="md"
              className="w-full flex items-center justify-center gap-2"
              aria-label="Download internship offer letter PDF"
            >
              <Download className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Offer Letter PDF</span>
            </Button>
          )}
        </div>

        {/* Accessible status feedback for screen readers & visual users */}
        <div className="mt-4 pt-4 border-t border-stone/15 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-grey-text">
          <div aria-live="polite" className="font-mono">
            {copied && (
              <span className="text-emerald-700 font-medium">
                Canonical URL copied to clipboard: {canonicalUrl}
              </span>
            )}
            {copyError && (
              <span className="text-rose-700 font-medium">
                Unable to copy automatically. Please copy the URL from your browser address bar.
              </span>
            )}
            {!copied && !copyError && (
              <span className="truncate max-w-md block">
                Verification URL: {canonicalUrl}
              </span>
            )}
          </div>
          <span className="text-stone-grey-text/80">
            Official production verification link
          </span>
        </div>
      </div>
    </div>
  );
}
