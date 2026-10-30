import type { Metadata } from "next";
import { Container, Section, Heading, Divider, Button } from "@/components/ui";
import {
  VerificationHeader,
  CertificatePreview,
  InternshipDetails,
  CompletedWork,
  OfferLetterPreview,
  VerificationExplanation,
  CredentialActions,
} from "@/components/verify";
import {
  verifyCredential,
  generateLinkedInCertUrl,
} from "@/lib/credential-service";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface VerifyPageProps {
  params: Promise<{ credentialId: string }>;
}

export async function generateMetadata({
  params,
}: VerifyPageProps): Promise<Metadata> {
  const { credentialId } = await params;
  const result = await verifyCredential(credentialId);

  const title =
    result.state === "verified" && result.credential?.recipientName
      ? `Internship Credential Verification: ${result.credential.recipientName} | The Lumbini Exports`
      : "Credential Verification | The Lumbini Exports";

  const description =
    "Official credential verification page for internship completion issued by The Lumbini Exports.";

  return {
    title,
    description,
    alternates: {
      canonical: result.canonicalVerificationUrl,
    },
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function VerifyCredentialPage({ params }: VerifyPageProps) {
  const { credentialId } = await params;
  const result = await verifyCredential(credentialId);

  const { state, statusMessage, checkedAtFormattedIst, credential, maskedEmail, canonicalVerificationUrl, taskSummary } =
    result;

  return (
    <div className="flex-1 flex flex-col">
      {/* 1. VERIFICATION HEADER BAND (Charcoal Background) */}
      <Section
        background="charcoal"
        spacing="default"
        className="border-b border-gold/20 hero-gradient-subtle pt-28 sm:pt-32"
      >
        <Container>
          <VerificationHeader
            state={state}
            statusMessage={statusMessage}
            checkedAtFormattedIst={checkedAtFormattedIst}
            recipientName={credential?.recipientName}
            credentialId={credential?.id || credentialId}
          />
        </Container>
      </Section>

      {/* Main Content Area (Ivory Background) */}
      <Section background="ivory" spacing="default" className="flex-1">
        <Container>
          {state === "verified" && credential ? (
            <div className="max-w-5xl mx-auto space-y-12 sm:space-y-16">
              {/* 2. COMPLETION CERTIFICATE PREVIEW */}
              <section aria-labelledby="certificate-heading">
                <CertificatePreview
                  credentialId={credential.id}
                  document={credential.certificateDocument}
                />
              </section>

              <Divider variant="solid" />

              {/* 3. INTERNSHIP DETAILS */}
              <section aria-labelledby="details-heading">
                <InternshipDetails
                  credential={credential}
                  maskedEmail={maskedEmail}
                />
              </section>

              <Divider variant="solid" />

              {/* 4. WORK COMPLETED DURING THE INTERNSHIP */}
              <section aria-labelledby="work-heading">
                <CompletedWork
                  tasks={credential.tasks}
                  taskSummary={taskSummary}
                />
              </section>

              <Divider variant="solid" />

              {/* 5. OFFER LETTER */}
              <section aria-labelledby="offer-letter-heading">
                <OfferLetterPreview
                  credentialId={credential.id}
                  document={credential.offerLetterDocument}
                />
              </section>

              <Divider variant="solid" />

              {/* 6. VERIFICATION EXPLANATION */}
              <section aria-labelledby="explanation-heading">
                <VerificationExplanation
                  recipientName={credential.recipientName}
                />
              </section>

              <Divider variant="solid" />

              {/* 7. ACTIONS */}
              <section aria-labelledby="actions-heading">
                <CredentialActions
                  credential={credential}
                  canonicalUrl={canonicalVerificationUrl}
                  linkedInUrl={generateLinkedInCertUrl(
                    credential,
                    canonicalVerificationUrl
                  )}
                />
              </section>
            </div>
          ) : (
            /* Unverified / Error / Revoked / Not Found View */
            <div className="max-w-2xl mx-auto py-8 sm:py-12 text-center space-y-6">
              <div className="bg-ivory-surface rounded-lg border border-stone/25 p-8 sm:p-12 space-y-6 shadow-xs">
                <Heading variant="section" as="h2" className="text-obsidian text-2xl sm:text-3xl">
                  {state === "not_found" && "Credential Not Found"}
                  {state === "revoked" && "Credential Revoked"}
                  {state === "pending" && "Verification Pending Confirmation"}
                  {state === "error" && "Verification Service Temporarily Unavailable"}
                </Heading>

                <p className="text-stone-grey-text text-base leading-relaxed">
                  {state === "not_found" && (
                    <>
                      The requested credential ID{" "}
                      <code className="font-mono text-sm px-2 py-0.5 bg-stone/10 rounded-sm text-obsidian font-semibold">
                        {credentialId}
                      </code>{" "}
                      does not match any confirmed record in The Lumbini Exports registry. Please ensure you scanned the correct QR code or entered the exact verification URL.
                    </>
                  )}
                  {state === "revoked" &&
                    "This credential record has been marked as revoked by the issuing authority and is no longer valid."}
                  {state === "pending" &&
                    "This credential record is awaiting final administrative confirmation and authorization before public verification."}
                  {state === "error" &&
                    "An error occurred while verifying the credential against the server registry. Please refresh this page or try again in a few moments."}
                </p>

                <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                  <Button href="/verify" variant="secondary" size="md">
                    Check Another Credential
                  </Button>
                  <Button href="/get-quote" variant="primary" size="md">
                    Contact The Lumbini Exports
                  </Button>
                </div>
              </div>

              <p className="text-xs text-stone-grey-text">
                For administrative inquiries regarding credentials, email{" "}
                <a
                  href="mailto:thelumbiniexports@gmail.com"
                  className="text-gold-hover hover:underline font-medium"
                >
                  thelumbiniexports@gmail.com
                </a>
              </p>
            </div>
          )}
        </Container>
      </Section>
    </div>
  );
}
