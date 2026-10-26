import { Container } from "@/components/ui";

export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading page content"
      className="flex-1 flex flex-col items-center justify-center min-h-[50vh] bg-ivory"
    >
      <Container>
        <div className="flex flex-col items-center justify-center space-y-4 text-center py-16">
          {/* Subtle gold brand spinner */}
          <div className="relative w-12 h-12 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-stone/20" />
            <div className="absolute inset-0 rounded-full border-2 border-gold border-t-transparent animate-spin" />
            <span className="w-2.5 h-2.5 rounded-full bg-gold" aria-hidden="true" />
          </div>

          <div className="space-y-1">
            <span className="type-label text-[11px] text-obsidian font-semibold uppercase tracking-wider block">
              The Lumbini Exports
            </span>
            <p className="font-sans text-xs text-stone-grey-text tracking-wide">
              Loading content...
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
