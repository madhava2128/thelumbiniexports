"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { headerNav } from "@/content/nav";
import { siteConfig } from "@/content/site";
import { Logo, Button } from "@/components/ui";
import { cn } from "@/lib/utils";

export interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}

export function MobileNav({ isOpen, onClose, pathname }: MobileNavProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const prevPathnameRef = useRef(pathname);

  // Close on route change
  useEffect(() => {
    if (prevPathnameRef.current !== pathname) {
      prevPathnameRef.current = pathname;
      if (isOpen) {
        onClose();
      }
    }
  }, [pathname, isOpen, onClose]);

  // Lock body scroll while drawer is open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // Trap focus & handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    // Focus the close button when opened
    const timer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "Tab" && drawerRef.current) {
        const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
    >
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-in drawer container */}
      <div
        ref={drawerRef}
        className={cn(
          "relative z-10 flex h-full w-full max-w-sm flex-col justify-between",
          "bg-obsidian text-ivory border-l border-gold/30 shadow-2xl p-6 sm:p-8",
          "overflow-y-auto"
        )}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-6 border-b border-gold/20">
          <Logo size="sm" href="/" />

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-sm border border-gold/30 text-ivory hover:border-gold hover:text-gold hover:bg-gold/10 transition-colors focus-visible:outline-2 focus-visible:outline-gold"
            aria-label="Close navigation menu"
          >
            {/* Close X icon */}
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.75"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Large, easy-to-tap Navigation Links */}
        <nav aria-label="Mobile Main Navigation" className="py-8 flex flex-col space-y-2">
          {headerNav
            .filter((item) => !item.isCta)
            .map((item) => {
              const isActive =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center justify-between py-3.5 px-3 rounded-xs font-serif text-2xl transition-all duration-200",
                    isActive
                      ? "text-gold font-medium bg-gold/10 border-l-2 border-gold pl-4"
                      : "text-ivory/85 hover:text-gold hover:bg-white/5"
                  )}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />
                  )}
                </Link>
              );
            })}
        </nav>

        {/* Drawer Footer with Quote CTA & Direct Inquiries */}
        <div className="space-y-4 pt-6 border-t border-gold/20">
          <Button
            href="/get-quote"
            variant="primary"
            size="lg"
            className="w-full text-center shadow-md py-4 text-sm font-semibold tracking-wider"
          >
            Get a Quote
          </Button>

          <div className="pt-2 text-xs text-ivory/70 space-y-1">
            <p className="font-mono text-gold text-[11px] uppercase tracking-wider">
              Direct Inquiries
            </p>
            {siteConfig.contactPerson && (
              <p className="text-ivory font-medium">
                {siteConfig.contactPerson}
              </p>
            )}
            <p className="truncate">
              <a
                href={`mailto:${siteConfig.email}`}
                className="hover:text-gold transition-colors underline underline-offset-4 decoration-gold/40"
              >
                {siteConfig.email}
              </a>
            </p>
            {siteConfig.phone && (
              <p>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
                  className="hover:text-gold transition-colors"
                >
                  {siteConfig.phone}
                </a>
              </p>
            )}
            {siteConfig.secondaryPhone && (
              <p>
                <a
                  href={`tel:${siteConfig.secondaryPhone.replace(/\s+/g, "")}`}
                  className="hover:text-gold transition-colors"
                >
                  {siteConfig.secondaryPhone}
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
