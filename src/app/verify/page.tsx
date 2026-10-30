import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Container, Section, Heading, Eyebrow, Button } from "@/components/ui";

export const metadata: Metadata = {
  title: "Credential Verification | The Lumbini Exports",
  description: "Verify official internship credentials and certificates issued by The Lumbini Exports.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function VerifyIndexPage() {
  async function handleSearch(formData: FormData) {
    "use server";
    const id = formData.get("credentialId")?.toString().trim();
    if (id) {
      redirect(`/verify/${encodeURIComponent(id)}`);
    }
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Header Band */}
      <Section
        background="charcoal"
        spacing="default"
        className="border-b border-gold/20 hero-gradient-subtle pt-28 sm:pt-32"
      >
        <Container>
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <Eyebrow accent="gold" withLine>
              The Lumbini Exports &bull; Official Registry
            </Eyebrow>
            <Heading variant="display" as="h1" className="text-ivory text-3xl sm:text-4xl lg:text-5xl">
              Credential Verification
            </Heading>
            <p className="type-body text-ivory/80 text-base sm:text-lg leading-relaxed">
              Verify the authenticity of internship certificates and appointment records issued by The Lumbini Exports against our official administrative registry.
            </p>
          </div>
        </Container>
      </Section>

      {/* Lookup Form */}
      <Section background="ivory" spacing="default" className="flex-1">
        <Container>
          <div className="max-w-xl mx-auto">
            <div className="bg-ivory-surface rounded-lg border border-stone/25 p-6 sm:p-10 shadow-xs space-y-6">
              <div className="space-y-2 text-center sm:text-left">
                <h2 className="text-obsidian font-serif text-2xl font-normal">
                  Enter Credential Identifier
                </h2>
                <p className="text-stone-grey-text text-sm">
                  Enter the unique credential ID printed on the certificate or offer letter.
                </p>
              </div>

              <form action={handleSearch} className="space-y-4">
                <div>
                  <label
                    htmlFor="credentialId"
                    className="block text-xs uppercase tracking-wider font-semibold text-stone-grey-text mb-2"
                  >
                    Credential ID
                  </label>
                  <input
                    type="text"
                    id="credentialId"
                    name="credentialId"
                    required
                    placeholder="e.g. TLE-INT-2026-001"
                    className="w-full px-4 py-3 bg-white border border-stone/30 rounded-sm font-mono text-sm text-obsidian placeholder:text-stone/60 focus-visible:outline-2 focus-visible:outline-gold"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full justify-center"
                >
                  Verify Credential
                </Button>
              </form>

              <div className="pt-4 border-t border-stone/15 text-xs text-stone-grey-text text-center sm:text-left">
                <p>
                  Scanning the QR code on an official certificate will automatically bring you directly to its verified record page.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}

