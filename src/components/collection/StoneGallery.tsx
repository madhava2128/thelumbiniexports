"use client";

import React, { useState, useEffect, useRef } from "react";
import { SiteImage } from "@/components/ui";
import { type ImageSlotKey } from "@/content/images";
import { cn } from "@/lib/utils";

export interface StoneGalleryProps {
  imageKeys: {
    main: ImageSlotKey;
    texture: ImageSlotKey;
    slab: ImageSlotKey;
    application: ImageSlotKey;
  };
  stoneName: string;
}

const thumbnailLabels: Record<string, string> = {
  main: "Primary Slab",
  texture: "Texture Detail",
  slab: "Factory Batch",
  application: "Application",
};

export function StoneGallery({ imageKeys, stoneName }: StoneGalleryProps) {
  const [selectedKey, setSelectedKey] = useState<ImageSlotKey>(imageKeys.main);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const galleryItems: { key: ImageSlotKey; label: string }[] = [
    { key: imageKeys.main, label: thumbnailLabels.main },
    { key: imageKeys.texture, label: thumbnailLabels.texture },
    { key: imageKeys.slab, label: thumbnailLabels.slab },
    { key: imageKeys.application, label: thumbnailLabels.application },
  ];

  // Handle lightbox keyboard shortcuts & body scroll lock
  useEffect(() => {
    if (!isLightboxOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsLightboxOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLightboxOpen]);

  return (
    <div className="space-y-4">
      {/* Main Image Frame with Enlarge Action */}
      <div className="relative group overflow-hidden rounded-xs border border-stone/25 bg-obsidian shadow-sm">
        <div
          onClick={() => setIsLightboxOpen(true)}
          className="cursor-zoom-in relative block"
          title={`Click to enlarge ${stoneName} photograph`}
        >
          <SiteImage
            imageKey={selectedKey}
            priority
            className="w-full aspect-[3/2] object-cover transition-transform duration-300 group-hover:scale-[1.01]"
          />

          {/* Enlarge badge overlay button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsLightboxOpen(true);
            }}
            className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-xs bg-obsidian/85 hover:bg-obsidian text-ivory border border-gold/40 text-xs font-sans tracking-wider uppercase backdrop-blur-xs transition-colors focus-visible:outline-2 focus-visible:outline-gold"
            aria-label={`Enlarge photo of ${stoneName}`}
          >
            {/* Expand / zoom icon */}
            <svg
              className="h-3.5 w-3.5 text-gold"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 3h6m0 0v6m0-6L14 10M9 21H3m0 0v-6m0 6l7-7" />
            </svg>
            <span>Enlarge</span>
          </button>
        </div>
      </div>

      {/* Accessible Thumbnail Row */}
      <div
        role="group"
        aria-label={`${stoneName} image gallery thumbnails`}
        className="grid grid-cols-4 gap-3 sm:gap-4"
      >
        {galleryItems.map((item) => {
          const isSelected = selectedKey === item.key;
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => setSelectedKey(item.key)}
              aria-pressed={isSelected}
              aria-label={`View ${item.label} for ${stoneName}`}
              className={cn(
                "relative overflow-hidden rounded-xs border transition-all duration-200 text-left cursor-pointer",
                isSelected
                  ? "border-gold ring-2 ring-gold/40 scale-[1.02] shadow-sm"
                  : "border-stone/25 opacity-70 hover:opacity-100 hover:border-gold/50"
              )}
            >
              <SiteImage
                imageKey={item.key}
                showDetailsInPlaceholder={false}
                className="w-full aspect-[3/2] object-cover"
              />
              <span className="sr-only">{item.label}</span>
              <span className="block text-[10px] text-center font-sans uppercase tracking-wider py-1 bg-ivory-surface text-stone-grey-text truncate px-1">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Full view of ${stoneName}`}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              className="absolute -top-12 right-0 flex items-center gap-2 px-3 py-1.5 rounded-sm bg-obsidian text-ivory border border-gold/40 hover:text-gold hover:border-gold transition-colors focus-visible:outline-2 focus-visible:outline-gold text-xs uppercase tracking-wider"
              aria-label="Close enlarged photo view"
            >
              <span>Close</span>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Enlarged Image */}
            <div className="w-full rounded-xs overflow-hidden border border-gold/30 bg-obsidian shadow-2xl">
              <SiteImage
                imageKey={selectedKey}
                priority
                className="w-full h-auto max-h-[80vh] object-contain"
              />
            </div>

            {/* Caption */}
            <div className="mt-3 text-center text-ivory/80 text-xs sm:text-sm font-sans">
              <span className="text-gold font-medium">{stoneName}</span> &bull; {thumbnailLabels[selectedKey] || "Photograph"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
