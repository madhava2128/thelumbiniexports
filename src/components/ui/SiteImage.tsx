import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { imageSlots, type ImageSlotKey } from "@/content/images";

export interface SiteImageProps {
  imageKey: ImageSlotKey;
  className?: string;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
  showDetailsInPlaceholder?: boolean;
  showPlaceholderBadge?: boolean;
}

const aspectClasses: Record<string, string> = {
  "16:9": "aspect-[16/9]",
  "4:3": "aspect-[4/3]",
  "3:2": "aspect-[3/2]",
  "1:1": "aspect-square",
  "21:9": "aspect-[21/9]",
};

/**
 * SiteImage component for The Lumbini Exports.
 *
 * Renders an optimized Next.js Image when an asset exists in `images.ts`.
 * When `src` is null, renders a refined, brand-consistent placeholder with
 * a dark charcoal-to-sage gradient, subtle granite grain, and slot dimensions.
 */
export function SiteImage({
  imageKey,
  className,
  priority = false,
  sizes,
  fill = false,
  showDetailsInPlaceholder = true,
  showPlaceholderBadge = true,
}: SiteImageProps) {
  const slot = imageSlots[imageKey];

  if (!slot) {
    return (
      <div className="flex items-center justify-center bg-obsidian text-stone text-xs p-4 border border-red-500/30">
        Unknown Image Key: {imageKey}
      </div>
    );
  }

  const aspectClass = aspectClasses[slot.aspectRatio] || "aspect-[3/2]";

  // Case 1: Image src is configured
  if (slot.src) {
    if (fill) {
      return (
        <div className={cn("relative overflow-hidden", aspectClass, className)}>
          <Image
            src={slot.src}
            alt={slot.alt}
            fill
            sizes={sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
            priority={priority}
            className="object-cover"
          />
        </div>
      );
    }

    return (
      <Image
        src={slot.src}
        alt={slot.alt}
        width={slot.recommendedWidth}
        height={slot.recommendedHeight}
        priority={priority}
        sizes={sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
        className={cn("h-auto w-full object-cover", aspectClass, className)}
      />
    );
  }

  // Case 2: On-brand placeholder (charcoal-to-sage gradient with subtle grain)
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden",
        showPlaceholderBadge && "border border-gold/20",
        "bg-gradient-to-br from-obsidian via-[#2D3330] to-sage text-ivory/80",
        "stone-grain-pattern select-none transition-all duration-300",
        aspectClass,
        className
      )}
      role="img"
      aria-label={`Placeholder: ${slot.alt}`}
    >
      {/* Decorative fine-line border accent */}
      {showPlaceholderBadge && (
        <div className="absolute inset-2 border border-white/5 pointer-events-none rounded-[2px]" />
      )}

      {/* Center stone slot insignia */}
      {showPlaceholderBadge && (
        <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-sm">
          <div className="mb-2.5 flex h-10 w-10 items-center justify-center rounded-full border border-gold/40 bg-obsidian/70 backdrop-blur-xs text-gold shadow-sm">
            {/* Subtle slab / stone diamond icon */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 15l6-6 4 4 8-8" />
              <circle cx="8" cy="8" r="1.5" fill="currentColor" />
            </svg>
          </div>

          {showDetailsInPlaceholder && (
            <>
              <span className="font-serif text-sm tracking-wide text-ivory/90 font-medium line-clamp-1">
                {slot.label}
              </span>
              <div className="mt-1.5 flex items-center gap-2 text-[11px] font-sans tracking-wider text-stone uppercase">
                <span>{slot.aspectRatio}</span>
                <span className="text-gold/60">•</span>
                <span>
                  {slot.recommendedWidth} &times; {slot.recommendedHeight} px
                </span>
              </div>
              <span className="mt-1 text-[10px] text-stone/70 tracking-widest uppercase">
                Photo Slot
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
