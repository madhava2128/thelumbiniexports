import React from "react";
import { siteConfig } from "@/content/site";

export function QuoteContactCard() {
  const directionsUrl =
    siteConfig.addresses.physicalUnit.googleMapsUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      siteConfig.addresses.physicalUnit.fullAddress
    )}`;

  return (
    <div className="space-y-6">
      {/* Primary Contact Card */}
      <div className="rounded-xs border border-stone/20 bg-ivory-surface p-6 sm:p-8 shadow-xs space-y-6">
        <div className="border-b border-stone/20 pb-4">
          <span className="type-label text-[11px] text-sage font-semibold uppercase tracking-wider block">
            Direct Commercial Inquiries
          </span>
          <h2 className="font-serif text-2xl text-obsidian font-medium mt-1">
            Factory &amp; Sales Contact
          </h2>
          <p className="type-body text-stone-grey-text text-xs sm:text-sm mt-1 leading-relaxed">
            Our estimation team at Elkathurthy reviews cutting schedules and issues itemized FOB/CIF quotations within 24&ndash;48 business hours.
          </p>
        </div>

        {/* Contact Details List */}
        <div className="space-y-4 text-sm">
          {/* Contact Person */}
          {siteConfig.contactPerson && (
            <div>
              <span className="block text-[11px] font-sans font-semibold text-stone-grey-text uppercase tracking-wider">
                Contact Person
              </span>
              <p className="font-sans font-medium text-obsidian text-base">
                {siteConfig.contactPerson}
              </p>
            </div>
          )}

          {/* Email */}
          <div>
            <span className="block text-[11px] font-sans font-semibold text-stone-grey-text uppercase tracking-wider">
              Official Email
            </span>
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-sans font-medium text-obsidian hover:text-gold transition-colors text-base"
            >
              {siteConfig.email}
            </a>
          </div>

          {/* Phone (Primary) */}
          {siteConfig.phone && (
            <div>
              <span className="block text-[11px] font-sans font-semibold text-stone-grey-text uppercase tracking-wider">
                Telephone (Primary)
              </span>
              <a
                href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}
                className="font-sans font-medium text-obsidian hover:text-gold transition-colors"
              >
                {siteConfig.phone}
              </a>
            </div>
          )}

          {/* Phone (Secondary) */}
          {siteConfig.secondaryPhone && (
            <div>
              <span className="block text-[11px] font-sans font-semibold text-stone-grey-text uppercase tracking-wider">
                Telephone (Secondary)
              </span>
              <a
                href={`tel:${siteConfig.secondaryPhone.replace(/\s+/g, "")}`}
                className="font-sans font-medium text-obsidian hover:text-gold transition-colors"
              >
                {siteConfig.secondaryPhone}
              </a>
            </div>
          )}

          {/* WhatsApp */}
          {siteConfig.whatsApp && (
            <div>
              <span className="block text-[11px] font-sans font-semibold text-stone-grey-text uppercase tracking-wider">
                Direct WhatsApp
              </span>
              <a
                href={`https://wa.me/${siteConfig.whatsApp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans font-medium text-obsidian hover:text-gold transition-colors inline-flex items-center gap-1.5"
              >
                <span>Chat on WhatsApp ({siteConfig.whatsApp})</span>
                <span aria-hidden="true">&#x2197;</span>
              </a>
            </div>
          )}

          {/* GST Number */}
          {siteConfig.gstNumber && (
            <div>
              <span className="block text-[11px] font-sans font-semibold text-stone-grey-text uppercase tracking-wider">
                GST Identification No. (GSTIN)
              </span>
              <span className="font-mono font-medium text-obsidian text-xs sm:text-sm tracking-wider">
                {siteConfig.gstNumber}
              </span>
            </div>
          )}

          {/* Processing Unit Address */}
          <div className="pt-2 border-t border-stone/15">
            <span className="block text-[11px] font-sans font-semibold text-stone-grey-text uppercase tracking-wider">
              Processing &amp; Cutting Unit
            </span>
            <p className="font-sans text-obsidian text-xs leading-relaxed mt-1">
              {siteConfig.addresses.physicalUnit.fullAddress}
            </p>
            <div className="mt-2">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold uppercase tracking-wider text-obsidian hover:text-gold transition-colors underline decoration-gold/50"
              >
                <span>Get directions in Google Maps</span>
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>

          {/* Registered Office */}
          <div className="pt-2 border-t border-stone/15">
            <span className="block text-[11px] font-sans font-semibold text-stone-grey-text uppercase tracking-wider">
              Registered Office
            </span>
            <p className="font-sans text-stone-grey-text text-xs leading-relaxed mt-1">
              {siteConfig.addresses.registeredOffice.fullAddress}
            </p>
          </div>
        </div>
      </div>

      {/* Guidance Note: What to include in an enquiry */}
      <div className="rounded-xs border border-gold/30 bg-obsidian text-ivory p-6 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-gold" aria-hidden="true" />
          <h3 className="font-sans font-semibold text-sm uppercase tracking-wider text-gold">
            What to Include in Your RFQ
          </h3>
        </div>
        <p className="type-body text-ivory/80 text-xs leading-relaxed">
          To receive an accurate and timely quote, please specify:
        </p>
        <ul className="space-y-1.5 text-xs text-ivory/70 list-disc list-inside leading-relaxed">
          <li>Target thickness (e.g., 18 mm, 20 mm, 30 mm, or custom block)</li>
          <li>Surface finish required (polished, honed, flamed, or bush-hammered)</li>
          <li>Destination seaport or delivery city for freight calculation</li>
          <li>Target installation date or required shipment schedule</li>
        </ul>
      </div>
    </div>
  );
}
