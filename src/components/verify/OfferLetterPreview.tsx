import React from "react";
import { FileText, Download, ExternalLink, AlertCircle } from "lucide-react";
import { Heading, Button } from "@/components/ui";
import { DocumentReference } from "@/lib/credential-types";

interface OfferLetterPreviewProps {
  credentialId: string;
  document?: DocumentReference | null;
}

export function OfferLetterPreview({
  credentialId,
  document,
}: OfferLetterPreviewProps) {
  const isAvailable = Boolean(document?.fileAvailable);
  const inlineDocUrl = `/api/verify/${encodeURIComponent(credentialId)}/document?type=offer-letter`;
  const downloadDocUrl = `/api/verify/${encodeURIComponent(credentialId)}/document?type=offer-letter&download=1`;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Heading variant="section" as="h2" className="text-obsidian text-2xl sm:text-3xl">
            Offer Letter
          </Heading>
          <p className="text-stone-grey-text text-sm sm:text-base mt-1">
            Official internship appointment and offer letter issued by The Lumbini Exports.
          </p>
        </div>

        {isAvailable && (
          <div className="flex flex-wrap items-center gap-3">
            <Button
              href={inlineDocUrl}
              isExternal
              variant="secondary"
              size="sm"
              aria-label="Open internship offer letter in full size tab"
            >
              <ExternalLink className="w-3.5 h-3.5 mr-1.5" aria-hidden="true" />
              Open Full Size
            </Button>
            <Button
              href={downloadDocUrl}
              variant="primary"
              size="sm"
              aria-label="Download internship offer letter PDF"
            >
              <Download className="w-3.5 h-3.5 mr-1.5" aria-hidden="true" />
              Download PDF
            </Button>
          </div>
        )}
      </div>

      {isAvailable ? (
        <div className="rounded-lg border border-stone/25 bg-ivory-surface overflow-hidden shadow-xs">
          <div className="bg-obsidian/5 px-4 py-3 border-b border-stone/20 flex items-center justify-between text-xs text-stone-grey-text">
            <span className="font-mono truncate">{document?.filename || "offer-letter.pdf"}</span>
            <a
              href={inlineDocUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-hover hover:underline inline-flex items-center gap-1 font-medium"
            >
              <span>Direct Link</span>
              <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
          </div>

          <div className="w-full aspect-[4/3] sm:aspect-[16/10] max-h-[640px] bg-stone/10 relative">
            <object
              data={inlineDocUrl}
              type="application/pdf"
              className="w-full h-full"
              aria-label="Internship Offer Letter Document Viewer"
            >
              <div className="flex flex-col items-center justify-center p-8 text-center h-full space-y-4">
                <FileText className="w-12 h-12 text-stone/50" aria-hidden="true" />
                <p className="text-obsidian font-medium">
                  Your browser does not display PDFs inline.
                </p>
                <p className="text-stone-grey-text text-sm max-w-md">
                  You can open or download the original offer letter PDF using the links below.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <Button
                    href={inlineDocUrl}
                    isExternal
                    variant="secondary"
                    size="md"
                    aria-label="Open offer letter PDF in new tab"
                  >
                    Open PDF in New Window
                  </Button>
                  <Button
                    href={downloadDocUrl}
                    variant="primary"
                    size="md"
                    aria-label="Download offer letter PDF directly"
                  >
                    Download Offer Letter
                  </Button>
                </div>
              </div>
            </object>
          </div>
        </div>
      ) : (
        <div className="rounded-lg border border-amber-600/30 bg-amber-50/50 p-6 sm:p-8 flex items-start gap-4 text-left">
          <AlertCircle className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" aria-hidden="true" />
          <div className="space-y-2">
            <h3 className="font-sans font-semibold text-amber-900 text-base">
              Offer Letter Pending Client Supply
            </h3>
            <p className="text-stone-grey-text text-sm leading-relaxed max-w-2xl">
              The original internship offer letter PDF is to be supplied separately by the owner. No synthetic or substitute letter has been created. The document preview and download options will appear once deposited in the registry.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

