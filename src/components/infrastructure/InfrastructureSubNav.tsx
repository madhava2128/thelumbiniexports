"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Container } from "@/components/ui";
import { cn } from "@/lib/utils";
import { type InfrastructureSection } from "@/content/infrastructure";

export interface InfrastructureSubNavProps {
  sections: InfrastructureSection[];
}

export function InfrastructureSubNav({ sections }: InfrastructureSubNavProps) {
  const [activeId, setActiveId] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const currentHash = window.location.hash.replace("#", "");
      if (currentHash && sections.some((s) => s.id === currentHash)) {
        return currentHash;
      }
    }
    return sections[0]?.id || "machines";
  });

  // Handle smooth scroll on anchor click and update URL hash
  const handleAnchorClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, anchorId: string) => {
      e.preventDefault();
      const targetElement = document.getElementById(anchorId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.pushState(null, "", `#${anchorId}`);
        setActiveId(anchorId);
      }
    },
    []
  );

  useEffect(() => {
    // Listen for manual hash changes
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && sections.some((s) => s.id === hash)) {
        setActiveId(hash);
      }
    };
    window.addEventListener("hashchange", handleHashChange);

    // Set up IntersectionObserver for robust section tracking
    const observerCallback: IntersectionObserverCallback = (entries) => {
      // Find the entry that has the highest intersection or is currently intersecting
      const intersectingEntries = entries.filter((entry) => entry.isIntersecting);
      if (intersectingEntries.length > 0) {
        // Pick the top-most visible section
        const sorted = intersectingEntries.sort(
          (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
        );
        const topSectionId = sorted[0]?.target.getAttribute("id");
        if (topSectionId) {
          setActiveId(topSectionId);
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "-20% 0px -60% 0px", // Trigger when section passes upper viewport
      threshold: [0, 0.2, 0.5],
    });

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      observer.disconnect();
    };
  }, [sections]);

  return (
    <nav
      aria-label="Infrastructure sections"
      className="sticky top-16 sm:top-20 z-30 bg-obsidian/95 backdrop-blur-md border-b border-gold/25 shadow-xs transition-colors"
      style={{ scrollTargetGroup: "auto" } as React.CSSProperties}
    >
      <Container>
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar py-2.5 sm:py-3 gap-2 sm:gap-3">
          <span className="text-[11px] font-mono text-ivory/50 uppercase tracking-wider hidden md:inline-block mr-2 select-none">
            Jump to:
          </span>
          {sections.map((section) => {
            const isActive = activeId === section.id;
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                onClick={(e) => handleAnchorClick(e, section.id)}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xs text-xs sm:text-sm font-sans font-medium tracking-wide whitespace-nowrap transition-all duration-200 border",
                  isActive
                    ? "bg-gold/15 text-gold border-gold/50 shadow-xs ring-1 ring-gold/30 font-semibold"
                    : "text-ivory/75 border-transparent hover:text-ivory hover:border-gold/30 hover:bg-white/5"
                )}
              >
                {section.navLabel}
              </a>
            );
          })}
        </div>
      </Container>
    </nav>
  );
}
