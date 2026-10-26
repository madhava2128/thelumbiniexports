import type { Metadata } from "next";
import { Suspense } from "react";
import { Container, Section, Heading, Eyebrow } from "@/components/ui";
import { QuoteForm, QuoteContactCard } from "@/components/quote";
import { type QuoteFormInput } from "@/lib/quote-schema";

export const metadata: Metadata = {
  title: "Request a Quote | The Lumbini Exports",
  description:
    "Request direct factory pricing and containerized export quotes for Indian granite, marble, and basalt stone. Prompt itemized quotations within 24-48 hours.",
};

interface GetQuotePageProps {
  searchParams: Promise<{
    stone?: string;
    stoneName?: string;
    quantity?: string;
    unit?: string;
    thickness?: string;
    size?: string;
    customSize?: string;
    delivery?: string;
    destination?: string;
  }>;
}

async function QuoteFormContainer({
  searchParams,
}: {
  searchParams: Promise<{
    stone?: string;
    stoneName?: string;
    quantity?: string;
    unit?: string;
    thickness?: string;
    size?: string;
    customSize?: string;
    delivery?: string;
    destination?: string;
  }>;
}) {
  const params = await searchParams;

  const initialValues: Partial<QuoteFormInput> = {
    stone: params.stone,
    quantity: params.quantity,
    unit: params.unit,
    thickness: params.thickness,
    size: params.size,
    customSize: params.customSize,
    delivery: params.delivery,
    destination: params.destination,
  };

  return <QuoteForm initialValues={initialValues} />;
}

function QuoteFormFallback() {
  return (
    <div className="rounded-xs border border-stone/20 bg-ivory-surface p-8 sm:p-10 shadow-xs animate-pulse space-y-6">
      <div className="h-6 w-40 bg-stone/20 rounded-xs" />
      <div className="h-10 w-3/4 bg-stone/20 rounded-xs" />
      <div className="space-y-4 pt-4">
        <div className="h-12 bg-stone/15 rounded-xs" />
        <div className="h-12 bg-stone/15 rounded-xs" />
        <div className="h-12 bg-stone/15 rounded-xs" />
        <div className="h-24 bg-stone/15 rounded-xs" />
      </div>
    </div>
  );
}

export default function GetQuotePage({ searchParams }: GetQuotePageProps) {
  return (
    <div className="flex-1">
      {/* 1. Page Header Band (Charcoal) */}
      <Section
        background="charcoal"
        spacing="default"
        className="border-b border-gold/20 hero-gradient-subtle"
      >
        <Container>
          <div className="max-w-3xl space-y-4">
            <Eyebrow accent="gold" withLine>
              Wholesale &amp; Export Inquiries
            </Eyebrow>
            <Heading variant="display" as="h1" className="text-ivory leading-tight">
              Request a Quote
            </Heading>
            <p className="type-body text-ivory/80 text-lg sm:text-xl font-normal leading-relaxed">
              Direct quarry and factory pricing on granite, marble, and basalt. We calculate itemized FOB or CIF quotations and reply promptly within 24&ndash;48 business hours.
            </p>
          </div>
        </Container>
      </Section>

      {/* 2. Main Body: Form (Left) & Contact Card (Right) */}
      <Section background="ivory" spacing="spacious">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* Left Column: Quote Form */}
            <div className="lg:col-span-7">
              <Suspense fallback={<QuoteFormFallback />}>
                <QuoteFormContainer searchParams={searchParams} />
              </Suspense>
            </div>

            {/* Right Column: Contact & Information Card (Sticky on Desktop) */}
            <div className="lg:col-span-5 lg:sticky lg:top-24">
              <QuoteContactCard />
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
