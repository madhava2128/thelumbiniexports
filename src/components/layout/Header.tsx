"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container, Button, Logo } from "@/components/ui";
import { headerNav } from "@/content/nav";
import { MobileNav } from "./MobileNav";
import { cn } from "@/lib/utils";

/**
 * Global Header Component for The Lumbini Exports.
 *
 * Rules:
 * - Logo on the left.
 * - Navigation links: Home, Company, Collection, Infrastructure.
 * - Active page highlighted with a thin gold underline.
 * - Persistent gold "Get Quote" button on the right.
 * - Home route: Starts transparent over hero, becomes solid charcoal after scroll.
 * - Non-home routes: Always solid charcoal.
 * - Sticky on scroll with a slim, calm transition.
 */
export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isSolid = !isHome || isScrolled;

  const navLinks = headerNav.filter((item) => !item.isCta);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 ease-out",
          isSolid
            ? "bg-obsidian/95 backdrop-blur-xs border-b border-gold/20 shadow-lg py-0"
            : "bg-transparent border-b border-transparent py-1 sm:py-2"
        )}
      >
        <Container size="wide">
          <div className="flex h-20 sm:h-24 items-center justify-between gap-4">
            {/* Big textless logo on the top-left */}
            <div className="flex shrink-0 items-center">
              <Logo size="header" href="/" priority />
            </div>

            {/* Desktop Navigation Links */}
            <nav
              aria-label="Primary Navigation"
              className="hidden lg:flex items-center gap-8"
            >
              {navLinks.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative py-2.5 type-nav tracking-wide transition-colors duration-200 select-none",
                      isActive
                        ? "text-gold font-medium"
                        : "text-ivory/85 hover:text-gold"
                    )}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold rounded-full transition-all duration-200"
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right actions: Persistent Gold "Get Quote" button & Mobile Hamburger */}
            <div className="flex items-center gap-4">
              {/* Persistent Gold CTA button */}
              <div className="hidden sm:block">
                <Button
                  href="/get-quote"
                  variant="primary"
                  size="sm"
                  className="shadow-sm font-semibold tracking-wider text-xs px-5 py-2.5"
                >
                  Request a Quote
                </Button>
              </div>

              {/* Mobile hamburger button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="flex lg:hidden h-11 w-11 items-center justify-center rounded-sm border border-gold/30 text-ivory hover:border-gold hover:text-gold hover:bg-gold/10 transition-colors focus-visible:outline-2 focus-visible:outline-gold"
                aria-expanded={mobileMenuOpen}
                aria-label="Open mobile navigation menu"
              >
                {/* 3-bar hamburger icon */}
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Spacer to push content down on non-home pages where header is solid */}
      {!isHome && <div className="h-20 w-full shrink-0" aria-hidden="true" />}

      {/* Mobile Drawer Navigation */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        pathname={pathname}
      />
    </>
  );
}
