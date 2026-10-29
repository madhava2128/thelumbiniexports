import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { imageSlots, type ImageSlot, type ImageSlotKey } from "@/content/images";

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
 * In production, placeholders never display labels, dimensions, or technical slot text.
 */
export function SiteImage({
  imageKey,
  className,
  priority = false,
  sizes,
  fill = false,
  showDetailsInPlaceholder = false,
}: SiteImageProps) {
  const slot: ImageSlot | undefined = imageSlots[imageKey];

  if (!slot) {
    return (
      <div className="flex items-center justify-center bg-obsidian text-stone text-xs p-4">
        Image unavailable
      </div>
    );
  }

  const aspectClass = aspectClasses[slot.aspectRatio] || "aspect-[3/2]";
  const isProduction = process.env.NODE_ENV === "production";

  // Case 1: Image src is configured
  if (slot.src) {
    const objectPositionStyle = slot.objectPosition
      ? { objectPosition: slot.objectPosition }
      : undefined;

    if (fill) {
      return (
        <div className={cn("relative overflow-hidden", className)}>
          <Image
            src={slot.src}
            alt={slot.alt}
            fill
            sizes={sizes || "100vw"}
            priority={priority}
            placeholder="empty"
            style={objectPositionStyle}
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
        placeholder="empty"
        style={objectPositionStyle}
        sizes={sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
        className={cn("h-auto w-full object-cover", aspectClass, className)}
      />
    );
  }

  // Case 2: Placeholder mode (charcoal-to-sage gradient)
  // In production builds, technical labels and dimensions are never rendered.
  const allowDetails = !isProduction && showDetailsInPlaceholder;

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden",
        "bg-gradient-to-br from-obsidian via-[#2D3330] to-sage text-ivory/80",
        "stone-grain-pattern select-none transition-all duration-300",
        aspectClass,
        className
      )}
      role="img"
      aria-label={slot.alt || "The Lumbini Exports granite"}
    >
      {allowDetails && (
        <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-sm">
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
        </div>
      )}
    </div>
  );
}
