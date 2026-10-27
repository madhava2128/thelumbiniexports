import React from "react";
import { SiteImage } from "@/components/ui";
import { cn } from "@/lib/utils";
import { type InfrastructurePhotoCard } from "@/content/infrastructure";

export interface InfrastructureCardProps {
  card: InfrastructurePhotoCard;
  index: number;
  sectionLabel: string;
}

export function InfrastructureCard({
  card,
  index,
  sectionLabel,
}: InfrastructureCardProps) {
  // Alternate image placement on desktop (even: image on left, odd: image on right)
  const isReversed = index % 2 === 1;

  return (
    <article
      aria-labelledby={`card-heading-${card.id}`}
      className={cn(
        "group flex flex-col rounded-xs bg-ivory-surface border border-stone/20 shadow-xs hover:border-gold/45 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden",
        isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
      )}
    >
      {/* Photo Container: 3:2 Aspect Ratio */}
      <div className="w-full lg:w-1/2 overflow-hidden bg-obsidian shrink-0 aspect-[3/2]">
        <SiteImage
          imageKey={card.imageKey}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
        />
      </div>

      {/* Content Container */}
      <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center space-y-3.5">
        <div className="flex items-center gap-2">
          <span className="type-label text-[11px] text-sage font-semibold uppercase tracking-wider">
            {sectionLabel} &bull; Step {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Small Side Heading in DM Sans */}
        <h3
          id={`card-heading-${card.id}`}
          className="font-sans font-semibold text-obsidian text-xl sm:text-2xl leading-snug group-hover:text-gold-hover transition-colors"
        >
          {card.sideHeading}
        </h3>

        {/* One or two lines of descriptive text */}
        <p className="type-body text-stone-grey-text text-sm sm:text-base leading-relaxed">
          {card.description}
        </p>
      </div>
    </article>
  );
}
