"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui";
import { type StoneItem } from "@/content/stones";
import {
  quantityUnits,
  thicknessOptions,
  sizeChoices,
  deliveryChoices,
} from "@/content/quote-options";

export interface StoneQuotePanelProps {
  stone: StoneItem;
}

export function StoneQuotePanel({ stone }: StoneQuotePanelProps) {
  const router = useRouter();

  // Form states initialized with sensible defaults from quote-options.ts
  const [quantity, setQuantity] = useState<string>("");
  const [unit, setUnit] = useState<string>(quantityUnits[0]?.id || "sq_ft");
  const [thickness, setThickness] = useState<string>(thicknessOptions[1]?.id || "20mm");
  const [size, setSize] = useState<string>(sizeChoices[0]?.id || "slabs");
  const [customSize, setCustomSize] = useState<string>("");
  const [delivery, setDelivery] = useState<string>(deliveryChoices[1]?.id || "fob");
  const [destination, setDestination] = useState<string>("");

  // Validation state
  const [quantityError, setQuantityError] = useState<string | null>(null);
  const [customSizeError, setCustomSizeError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;

    // Validate quantity
    const parsedQty = parseFloat(quantity);
    if (!quantity.trim() || isNaN(parsedQty) || parsedQty <= 0) {
      setQuantityError("Please enter a valid quantity greater than 0.");
      hasError = true;
    } else {
      setQuantityError(null);
    }

    // Validate custom size if chosen
    if (size === "custom" && !customSize.trim()) {
      setCustomSizeError("Please provide your custom size specifications.");
      hasError = true;
    } else {
      setCustomSizeError(null);
    }

    if (hasError) return;

    // Build URL search parameters to pre-fill the quote form on /get-quote
    const params = new URLSearchParams({
      stone: stone.slug,
      stoneName: stone.name,
      quantity: quantity.trim(),
      unit,
      thickness,
      size,
      delivery,
    });

    if (size === "custom" && customSize.trim()) {
      params.set("customSize", customSize.trim());
    }

    if (destination.trim()) {
      params.set("destination", destination.trim());
    }

    router.push(`/get-quote?${params.toString()}`);
  };

  return (
    <div className="rounded-xs border border-gold/30 bg-ivory-surface shadow-md overflow-hidden">
      {/* Panel Header */}
      <div className="bg-obsidian text-ivory px-6 py-4 border-b border-gold/30">
        <span className="type-label text-gold text-xs block">
          Request a Quotation
        </span>
        <h2 className="font-serif text-xl sm:text-2xl text-ivory font-medium mt-0.5">
          Configure {stone.name}
        </h2>
      </div>

      {/* Interactive Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-5" noValidate>
        {/* 1. Quantity & Unit Select */}
        <div>
          <label
            htmlFor="quote-quantity"
            className="block text-xs font-sans font-semibold uppercase tracking-wider text-obsidian mb-1.5"
          >
            Required Quantity <span className="text-red-700">*</span>
          </label>
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-7 sm:col-span-8">
              <input
                id="quote-quantity"
                type="number"
                min="1"
                step="any"
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                  if (quantityError) setQuantityError(null);
                }}
                placeholder="e.g. 1500"
                aria-invalid={Boolean(quantityError)}
                aria-describedby={quantityError ? "quantity-error" : undefined}
                className="w-full rounded-xs border border-stone/30 bg-white px-3.5 py-2.5 text-sm text-obsidian placeholder:text-stone/60 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              />
            </div>
            <div className="col-span-5 sm:col-span-4">
              <label htmlFor="quote-unit" className="sr-only">Quantity Unit</label>
              <select
                id="quote-unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full rounded-xs border border-stone/30 bg-white px-3 py-2.5 text-xs sm:text-sm text-obsidian focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              >
                {quantityUnits.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {quantityError && (
            <p id="quantity-error" role="alert" className="mt-1.5 text-xs text-red-700 font-medium">
              {quantityError}
            </p>
          )}
        </div>

        {/* 2. Thickness Select */}
        <div>
          <label
            htmlFor="quote-thickness"
            className="block text-xs font-sans font-semibold uppercase tracking-wider text-obsidian mb-1.5"
          >
            Slab / Stone Thickness
          </label>
          <select
            id="quote-thickness"
            value={thickness}
            onChange={(e) => setThickness(e.target.value)}
            className="w-full rounded-xs border border-stone/30 bg-white px-3.5 py-2.5 text-sm text-obsidian focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          >
            {thicknessOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label} &ndash; {opt.description}
              </option>
            ))}
          </select>
        </div>

        {/* 3. Size / Cut Format Select */}
        <div>
          <label
            htmlFor="quote-size"
            className="block text-xs font-sans font-semibold uppercase tracking-wider text-obsidian mb-1.5"
          >
            Size / Format Choice
          </label>
          <select
            id="quote-size"
            value={size}
            onChange={(e) => {
              setSize(e.target.value);
              if (customSizeError) setCustomSizeError(null);
            }}
            className="w-full rounded-xs border border-stone/30 bg-white px-3.5 py-2.5 text-sm text-obsidian focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          >
            {sizeChoices.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>

          {/* Conditional Free-Text Field if "Custom" is Chosen */}
          {size === "custom" && (
            <div className="mt-2.5">
              <label
                htmlFor="quote-custom-size"
                className="block text-[11px] font-sans font-medium text-stone-grey-text mb-1"
              >
                Specify Custom Dimensions / Project Cut <span className="text-red-700">*</span>
              </label>
              <input
                id="quote-custom-size"
                type="text"
                value={customSize}
                onChange={(e) => {
                  setCustomSize(e.target.value);
                  if (customSizeError) setCustomSizeError(null);
                }}
                placeholder="e.g. 600x600x30mm flamed tiles or staircase risers"
                aria-invalid={Boolean(customSizeError)}
                aria-describedby={customSizeError ? "custom-size-error" : undefined}
                className="w-full rounded-xs border border-stone/30 bg-white px-3 py-2 text-sm text-obsidian placeholder:text-stone/60 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              />
              {customSizeError && (
                <p id="custom-size-error" role="alert" className="mt-1 text-xs text-red-700 font-medium">
                  {customSizeError}
                </p>
              )}
            </div>
          )}
        </div>

        {/* 4. Delivery Select & Destination Port / Country */}
        <div>
          <label
            htmlFor="quote-delivery"
            className="block text-xs font-sans font-semibold uppercase tracking-wider text-obsidian mb-1.5"
          >
            Shipment Term (Incoterms)
          </label>
          <select
            id="quote-delivery"
            value={delivery}
            onChange={(e) => setDelivery(e.target.value)}
            className="w-full rounded-xs border border-stone/30 bg-white px-3.5 py-2.5 text-sm text-obsidian focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
          >
            {deliveryChoices.map((d) => (
              <option key={d.id} value={d.id}>
                {d.label}
              </option>
            ))}
          </select>

          {/* Destination Port or Country */}
          <div className="mt-2.5">
            <label
              htmlFor="quote-destination"
              className="block text-[11px] font-sans font-medium text-stone-grey-text mb-1"
            >
              Destination Port or Delivery City
            </label>
            <input
              id="quote-destination"
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g. Port of Rotterdam, Hamburg, or Jebel Ali"
              className="w-full rounded-xs border border-stone/30 bg-white px-3 py-2 text-sm text-obsidian placeholder:text-stone/60 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
            />
          </div>
        </div>

        {/* Submit Action */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full py-3.5 text-sm font-semibold tracking-wider shadow-md"
          >
            Request a Quote
          </Button>

          <p className="mt-2.5 text-center text-[11px] text-stone-grey-text leading-tight">
            Direct pricing from our Elkathurthy unit &bull; Fast turn-around
          </p>
        </div>
      </form>
    </div>
  );
}
