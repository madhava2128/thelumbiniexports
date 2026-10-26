"use client";

import React, { useEffect } from "react";
import { Container, Section, Heading, Eyebrow, Button } from "@/components/ui";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to client-side monitoring if enabled
    console.error("Application error boundary triggered:", error);
  }, [error]);

  return (
    <div className="flex-1 flex flex-col justify-center min-h-[65vh] bg-obsidian">
      <Section
        background="charcoal"
        spacing="spacious"
        className="hero-gradient-subtle flex-1 flex items-center"
      >
        <Container>
          <div className="max-w-2xl mx-auto text-center space-y-6 sm:space-y-8">
            <div className="space-y-2">
              <Eyebrow accent="gold" withLine>
                System Notification
              </Eyebrow>
              <Heading
                variant="display"
                as="h1"
                className="text-ivory leading-tight mt-1"
              >
                Something Went Wrong
              </Heading>
            </div>

            <p className="type-body text-ivory/80 text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
              We encountered an unexpected technical issue while preparing this page. You can try refreshing the view or return to our homepage.
            </p>

            {error?.digest && (
              <p className="text-[11px] font-mono text-stone">
                Incident ID: {error.digest}
              </p>
            )}

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Button
                onClick={() => reset()}
                variant="primary"
                size="md"
                className="w-full sm:w-auto px-7"
              >
                Try Again
              </Button>
              <Button href="/" variant="goldOutline" size="md" className="w-full sm:w-auto px-7">
                Return to Home
              </Button>
              <Button href="/get-quote" variant="secondary" size="md" className="w-full sm:w-auto px-7">
                Contact &amp; Support
              </Button>
            </div>

            <div className="pt-6 border-t border-white/10 text-xs text-ivory/50">
              Need assistance? Email our technical desk at{" "}
              <a
                href="mailto:thelumbiniexports@gmail.com"
                className="text-gold hover:underline"
              >
                thelumbiniexports@gmail.com
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
