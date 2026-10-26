import React from "react";
import Link from "next/link";
import { Container, Logo, Divider } from "@/components/ui";
import { siteConfig } from "@/content/site";
import { footerNav } from "@/content/nav";
import { CopyrightYear } from "./CopyrightYear";

/**
 * Global Footer Component for The Lumbini Exports.
 *
 * Rules:
 * - Charcoal background (bg-obsidian).
 * - Generously spaced layout utilizing the full width with rich typography.
 * - Prominent official logo with zero shader/canvas distortion.
 * - Clear factory & registered office addresses with Google Maps direction link.
 * - Official contact details: Kommaraju Srinadh, primary & secondary phone, WhatsApp, email.
 * - GSTIN registration badge.
 * - Navigation and stone collection directory.
 * - Accessible, responsive, and passes WCAG AA contrast.
 */
export function Footer() {
  return (
    <footer className="w-full bg-obsidian text-ivory border-t border-gold/25 pt-16 pb-20 sm:pb-14">
      <Container size="wide">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-10">
          {/* Column 1: Brand & Factory Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex flex-col items-start">
              <Logo size="footer" href="/" className="mb-2" />
              <p className="text-sm text-ivory/75 max-w-md leading-relaxed mt-2">
                Suppliers and global exporters of architectural-grade Indian
                granite, marble, and basalt stone. Precision cutting and
                polishing unit in Telangana, India.
              </p>
            </div>

            {/* Address Cards & Registration */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-ivory/70">
              {/* Factory & Processing Unit */}
              <div className="bg-white/5 border border-gold/15 rounded-sm p-3.5 space-y-1.5 hover:border-gold/30 transition-colors">
                <span className="text-gold font-medium block uppercase tracking-wider text-[11px]">
                  {siteConfig.addresses.physicalUnit.label}
                </span>
                <p className="leading-relaxed text-ivory/80 text-[11px]">
                  {siteConfig.addresses.physicalUnit.fullAddress}
                </p>
                {siteConfig.addresses.physicalUnit.googleMapsUrl && (
                  <a
                    href={siteConfig.addresses.physicalUnit.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-gold hover:underline pt-1"
                  >
                    <span>View on Google Maps</span>
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                )}
              </div>

              {/* Registered Corporate Office */}
              <div className="bg-white/5 border border-gold/15 rounded-sm p-3.5 space-y-1.5 hover:border-gold/30 transition-colors">
                <span className="text-gold font-medium block uppercase tracking-wider text-[11px]">
                  {siteConfig.addresses.registeredOffice.label}
                </span>
                <p className="leading-relaxed text-ivory/80 text-[11px]">
                  {siteConfig.addresses.registeredOffice.fullAddress}
                </p>
                {siteConfig.gstNumber && (
                  <div className="pt-1 border-t border-white/5 mt-1">
                    <span className="text-stone block uppercase tracking-wider text-[10px]">
                      GSTIN
                    </span>
                    <span className="font-mono text-ivory text-[11px] font-medium tracking-wide">
                      {siteConfig.gstNumber}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <span className="type-label text-gold tracking-widest text-xs uppercase block border-b border-gold/20 pb-2">
              Navigation
            </span>
            <ul className="space-y-2.5">
              {footerNav.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ivory/80 hover:text-gold transition-colors inline-block py-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Natural Stone Collection (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <span className="type-label text-gold tracking-widest text-xs uppercase block border-b border-gold/20 pb-2">
              Collection
            </span>
            <ul className="space-y-2.5">
              {footerNav.collectionLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ivory/80 hover:text-gold transition-colors inline-block py-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Direct Export Desk & Inquiries (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <span className="type-label text-gold tracking-widest text-xs uppercase block border-b border-gold/20 pb-2">
              Export Desk
            </span>
            <div className="space-y-3.5 text-sm text-ivory/85">
              {/* Contact Person */}
              {siteConfig.contactPerson && (
                <div>
                  <span className="text-[11px] text-stone block uppercase tracking-wider">
                    Contact Person
                  </span>
                  <span className="text-ivory font-semibold text-sm block">
                    {siteConfig.contactPerson}
                  </span>
                </div>
              )}

              {/* Email */}
              <div>
                <span className="text-[11px] text-stone block uppercase tracking-wider">
                  Official Email
                </span>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-gold transition-colors underline underline-offset-4 decoration-gold/40 break-all text-xs sm:text-sm"
                >
                  {siteConfig.email}
                </a>
              </div>

              {/* Phone Numbers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {siteConfig.phone && (
                  <div>
                    <span className="text-[11px] text-stone block uppercase tracking-wider">
                      Primary
                    </span>
                    <a
                      href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
                      className="hover:text-gold font-mono transition-colors text-xs sm:text-sm block"
                    >
                      {siteConfig.phone}
                    </a>
                  </div>
                )}

                {siteConfig.secondaryPhone && (
                  <div>
                    <span className="text-[11px] text-stone block uppercase tracking-wider">
                      Secondary
                    </span>
                    <a
                      href={`tel:${siteConfig.secondaryPhone.replace(/\s+/g, "")}`}
                      className="hover:text-gold font-mono transition-colors text-xs sm:text-sm block"
                    >
                      {siteConfig.secondaryPhone}
                    </a>
                  </div>
                )}
              </div>

              {/* WhatsApp Direct Action */}
              {siteConfig.whatsApp && (
                <div className="pt-2">
                  <a
                    href={`https://wa.me/${siteConfig.whatsApp.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xs bg-[#25D366]/15 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/25 transition-colors text-xs font-medium"
                  >
                    <svg
                      className="w-4 h-4 fill-current"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.477-.15-.678.15-.2.301-.778.978-.954 1.179-.176.2-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.496-.896-.799-1.501-1.786-1.677-2.087-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.176.201-.301.301-.502.101-.2.05-.376-.025-.526-.075-.15-.678-1.635-.929-2.239-.245-.589-.494-.509-.678-.519l-.578-.01c-.2 0-.527.075-.803.376-.276.301-1.054 1.029-1.054 2.509 0 1.48 1.079 2.909 1.229 3.11.15.2 2.122 3.24 5.141 4.544.718.31 1.279.496 1.716.635.721.23 1.377.197 1.896.12.578-.087 1.78-.727 2.03-1.43.25-.703.25-1.306.175-1.43-.075-.125-.276-.2-.577-.35zM12.04 2C6.516 2 2.028 6.488 2.028 12.012c0 1.988.583 3.842 1.597 5.405L2 22l4.735-1.562a9.98 9.98 0 005.305 1.574h.004c5.524 0 10.012-4.488 10.012-10.012C22.056 6.488 17.564 2 12.04 2z" />
                    </svg>
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Thin gold divider above bottom bar */}
        <Divider variant="solid" className="my-10 border-gold/20" />

        {/* Bottom bar with legal & copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ivory/65">
          <p>
            &copy; {siteConfig.establishedYear}&ndash;
            <CopyrightYear initialYear={2025} /> {siteConfig.name}. All rights
            reserved.
          </p>

          <div className="flex flex-wrap items-center gap-6">
            {footerNav.legal.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-gold transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
