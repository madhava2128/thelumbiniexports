import React from "react";
import Link from "next/link";
import { Heading, SiteImage } from "@/components/ui";
import { type StoneItem } from "@/content/stones";

export interface StoneCardProps {
  stone: StoneItem;
  priority?: boolean;
}

export function StoneCard({ stone, priority = false }: StoneCardProps) {
  return (
    <Link
      href={`/collection/${stone.slug}`}
      className="group flex flex-col justify-between overflow-hidden rounded-xs bg-ivory-surface border border-stone/20 shadow-xs hover:border-gold/50 hover:-translate-y-1 transition-all duration-300"
    >
      <div>
        {/* Real Stone Photo Container (3:2) */}
        <div className="overflow-hidden bg-obsidian aspect-[3/2]">
          <SiteImage
            imageKey={stone.imageKeys.main}
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
          />
        </div>

        {/* Stone Details */}
        <div className="p-6 sm:p-7 space-y-3">
          <div className="flex items-center justify-between">
            <span className="type-label text-[11px] text-sage font-semibold tracking-wider uppercase block">
              {stone.category}
            </span>
            <span className="text-[11px] font-mono text-stone">
              Granite
            </span>
          </div>

          {/* Stone Name in DM Sans at Product Heading Size */}
          <Heading
            variant="product"
            as="h3"
            className="text-obsidian group-hover:text-gold-hover transition-colors"
          >
            {stone.name}
          </Heading>

          {/* Two-Line Plain-English Description */}
          <p className="type-body text-stone-grey-text text-sm sm:text-base line-clamp-2 leading-relaxed">
            {stone.shortDescription}
          </p>
        </div>
      </div>

      {/* Card Action Link: View details */}
      <div className="px-6 sm:px-7 pb-6 pt-3 flex items-center justify-between border-t border-stone/15 text-xs font-sans font-medium text-obsidian group-hover:text-gold transition-colors">
        <span className="uppercase tracking-wider font-semibold">
          View details
        </span>
        <span
          className="transform group-hover:translate-x-1.5 transition-transform duration-200 text-gold"
          aria-hidden="true"
        >
          &rarr;
        </span>
      </div>
    </Link>
  );
}
