"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui";
import { stones } from "@/content/stones";
import {
  finishOptions,
  quantityUnits,
  thicknessOptions,
  sizeChoices,
  deliveryChoices,
} from "@/content/quote-options";
import {
  quoteSchema,
  type QuoteFormInput,
  type QuoteFormErrors,
} from "@/lib/quote-schema";

export interface QuoteFormProps {
  initialValues?: Partial<QuoteFormInput>;
}

export function QuoteForm({ initialValues }: QuoteFormProps) {
  // Validate and sanitize pre-filled values
  const defaultStone =
    initialValues?.stone && stones.some((s) => s.slug === initialValues.stone)
      ? initialValues.stone
      : stones[0]?.slug || "tan-brown";

  const defaultUnit =
    initialValues?.unit && quantityUnits.some((u) => u.id === initialValues.unit)
      ? initialValues.unit
      : quantityUnits[0]?.id || "sq_ft";

  const defaultThickness =
    initialValues?.thickness &&
    thicknessOptions.some((t) => t.id === initialValues.thickness)
      ? initialValues.thickness
      : thicknessOptions[1]?.id || "20mm";

  const defaultSize =
    initialValues?.size && sizeChoices.some((s) => s.id === initialValues.size)
      ? initialValues.size
      : sizeChoices[0]?.id || "slabs";

  const defaultDelivery =
    initialValues?.delivery &&
    deliveryChoices.some((d) => d.id === initialValues.delivery)
      ? initialValues.delivery
      : deliveryChoices[1]?.id || "fob";

  // Form State
  const [formData, setFormData] = useState<QuoteFormInput>({
    name: initialValues?.name || "",
    company: initialValues?.company || "",
    email: initialValues?.email || "",
    phone: initialValues?.phone || "",
    country: initialValues?.country || "",
    stone: defaultStone,
    finish: initialValues?.finish || "",
    quantity: initialValues?.quantity || "",
    unit: defaultUnit,
    thickness: defaultThickness,
    size: defaultSize,
    customSize: initialValues?.customSize || "",
    delivery: defaultDelivery,
    destination: initialValues?.destination || "",
    message: initialValues?.message || "",
    consent: false,
    website_hp: "",
    turnstileToken: "",
  });

  const [errors, setErrors] = useState<QuoteFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // Field change handler
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear field-level error on change
    if (errors[name as keyof QuoteFormInput]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    // 1. Client-Side Zod Validation
    const validationResult = quoteSchema.safeParse(formData);

    if (!validationResult.success) {
      const fieldErrors: QuoteFormErrors = {};
      const issues = validationResult.error.issues;

      for (const issue of issues) {
        const fieldName = issue.path[0] as keyof QuoteFormInput;
        if (fieldName && !fieldErrors[fieldName]) {
          fieldErrors[fieldName] = issue.message;
        }
      }

      setErrors(fieldErrors);

      // Move focus to first errored field for keyboard accessibility
      const firstErrorField = Object.keys(fieldErrors)[0];
      if (firstErrorField) {
        const el = document.getElementById(`quote-field-${firstErrorField}`);
        if (el) {
          el.focus();
        }
      }
      return;
    }

    // 2. Submit to Route Handler
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validationResult.data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        if (result.fieldErrors) {
          const serverFieldErrors: QuoteFormErrors = {};
          for (const [key, errList] of Object.entries(result.fieldErrors)) {
            if (Array.isArray(errList) && errList.length > 0) {
              serverFieldErrors[key as keyof QuoteFormInput] = errList[0];
            }
          }
          setErrors(serverFieldErrors);
        }
        setSubmitError(
          result.error ||
            "Unable to submit quote request. Please try again or email us directly at thelumbiniexports@gmail.com."
        );
        return;
      }

      // Success
      setIsSuccess(true);
    } catch (err) {
      console.error("Quote submission error:", err);
      setSubmitError(
        "A network error occurred while submitting your request. Please check your connection or contact us directly at thelumbiniexports@gmail.com."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render Success Panel
  if (isSuccess) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-xs border border-gold/40 bg-ivory-surface p-8 sm:p-10 shadow-sm space-y-6"
      >
        <div className="flex items-center gap-3">
          <span className="p-3 rounded-full bg-obsidian text-gold">
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <div>
            <span className="type-label text-[11px] text-sage font-semibold uppercase tracking-wider block">
              Inquiry Confirmed
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-obsidian font-medium">
              Thank You, {formData.name}
            </h2>
          </div>
        </div>

        <div className="type-body text-stone-grey-text space-y-3 text-base leading-relaxed border-t border-b border-stone/20 py-5">
          <p>
            Your request for wholesale pricing on natural granite has been successfully received. We will reply to{" "}
            <strong className="text-obsidian">{formData.email}</strong> shortly.
          </p>
          <p className="text-sm">
            Our engineering and logistics team at the Elkathurthy unit will review your quantity and cutting specifications to calculate an itemized FOB or CIF quotation.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-4">
          <Button
            onClick={() => {
              setIsSuccess(false);
              setFormData((prev) => ({
                ...prev,
                quantity: "",
                customSize: "",
                message: "",
                consent: false,
              }));
            }}
            variant="goldOutline"
            size="md"
          >
            Submit Another Inquiry
          </Button>
          <Button href="/collection" variant="primary" size="md">
            Explore Stone Collection
          </Button>
        </div>
      </div>
    );
  }

  const colourStones = stones.filter((s) => s.category === "Colour");
  const finishStones = stones.filter((s) => s.category === "Finish");

  return (
    <div className="rounded-xs border border-stone/20 bg-ivory-surface p-6 sm:p-8 lg:p-10 shadow-xs">
      <div className="mb-8 border-b border-stone/20 pb-4">
        <span className="type-label text-[11px] text-sage font-semibold uppercase tracking-wider block">
          Direct Factory Quote
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl text-obsidian font-medium mt-1">
          Project Specification Form
        </h2>
        <p className="type-body text-stone-grey-text text-sm mt-1">
          Complete the details below for export pricing, slab calibration, and shipping schedules.
        </p>
      </div>

      {/* Global Submit Error Alert */}
      {submitError && (
        <div
          role="alert"
          className="mb-8 p-4 rounded-xs border border-red-300 bg-red-50 text-red-900 text-sm space-y-1.5"
        >
          <div className="flex items-center gap-2 font-semibold">
            <svg className="h-4 w-4 text-red-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Submission Error</span>
          </div>
          <p>{submitError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {/* Anti-spam honeypot field (hidden from real users) */}
        <div style={{ display: "none" }} aria-hidden="true">
          <label htmlFor="website_hp">Website (leave blank)</label>
          <input
            id="website_hp"
            name="website_hp"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={formData.website_hp}
            onChange={handleInputChange}
          />
        </div>

        {/* 1. Contact Details Section */}
        <div>
          <h3 className="text-xs font-sans font-bold uppercase tracking-wider text-obsidian border-b border-stone/15 pb-2 mb-4">
            1. Contact &amp; Company
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div>
              <label
                htmlFor="quote-field-name"
                className="block text-xs font-sans font-semibold uppercase tracking-wider text-obsidian mb-1"
              >
                Full Name <span className="text-red-700">*</span>
              </label>
              <input
                id="quote-field-name"
                name="name"
                type="text"
                autoComplete="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g. David Vance"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "quote-error-name" : undefined}
                className="w-full rounded-xs border border-stone/30 bg-white px-3.5 py-2.5 text-sm text-obsidian placeholder:text-stone/60 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              />
              {errors.name && (
                <p id="quote-error-name" role="alert" className="mt-1 text-xs text-red-700 font-medium">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Company */}
            <div>
              <label
                htmlFor="quote-field-company"
                className="block text-xs font-sans font-semibold uppercase tracking-wider text-obsidian mb-1"
              >
                Company / Firm <span className="text-red-700">*</span>
              </label>
              <input
                id="quote-field-company"
                name="company"
                type="text"
                autoComplete="organization"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="e.g. Vance Architectural Imports"
                aria-invalid={Boolean(errors.company)}
                aria-describedby={errors.company ? "quote-error-company" : undefined}
                className="w-full rounded-xs border border-stone/30 bg-white px-3.5 py-2.5 text-sm text-obsidian placeholder:text-stone/60 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              />
              {errors.company && (
                <p id="quote-error-company" role="alert" className="mt-1 text-xs text-red-700 font-medium">
                  {errors.company}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="quote-field-email"
                className="block text-xs font-sans font-semibold uppercase tracking-wider text-obsidian mb-1"
              >
                Business Email <span className="text-red-700">*</span>
              </label>
              <input
                id="quote-field-email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="e.g. d.vance@architectural.com"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "quote-error-email" : undefined}
                className="w-full rounded-xs border border-stone/30 bg-white px-3.5 py-2.5 text-sm text-obsidian placeholder:text-stone/60 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              />
              {errors.email && (
                <p id="quote-error-email" role="alert" className="mt-1 text-xs text-red-700 font-medium">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="quote-field-phone"
                className="block text-xs font-sans font-semibold uppercase tracking-wider text-obsidian mb-1"
              >
                Phone / WhatsApp <span className="text-stone-grey-text text-[11px] font-normal">(Optional)</span>
              </label>
              <input
                id="quote-field-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="e.g. +1 555 123 4567"
                className="w-full rounded-xs border border-stone/30 bg-white px-3.5 py-2.5 text-sm text-obsidian placeholder:text-stone/60 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              />
            </div>

            {/* Country */}
            <div className="sm:col-span-2">
              <label
                htmlFor="quote-field-country"
                className="block text-xs font-sans font-semibold uppercase tracking-wider text-obsidian mb-1"
              >
                Country / Destination Location <span className="text-red-700">*</span>
              </label>
              <input
                id="quote-field-country"
                name="country"
                type="text"
                value={formData.country}
                onChange={handleInputChange}
                placeholder="e.g. Netherlands, United Kingdom, USA, or United Arab Emirates"
                aria-invalid={Boolean(errors.country)}
                aria-describedby={errors.country ? "quote-error-country" : undefined}
                className="w-full rounded-xs border border-stone/30 bg-white px-3.5 py-2.5 text-sm text-obsidian placeholder:text-stone/60 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              />
              {errors.country && (
                <p id="quote-error-country" role="alert" className="mt-1 text-xs text-red-700 font-medium">
                  {errors.country}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* 2. Stone Specifications Section */}
        <div className="pt-2">
          <h3 className="text-xs font-sans font-bold uppercase tracking-wider text-obsidian border-b border-stone/15 pb-2 mb-4">
            2. Stone &amp; Quantity Specifications
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Stone Variety Select Grouped as Colours and Finishes */}
            <div>
              <label
                htmlFor="quote-field-stone"
                className="block text-xs font-sans font-semibold uppercase tracking-wider text-obsidian mb-1"
              >
                Granite Range <span className="text-red-700">*</span>
              </label>
              <select
                id="quote-field-stone"
                name="stone"
                value={formData.stone}
                onChange={handleInputChange}
                aria-invalid={Boolean(errors.stone)}
                aria-describedby={errors.stone ? "quote-error-stone" : undefined}
                className="w-full rounded-xs border border-stone/30 bg-white px-3.5 py-2.5 text-sm text-obsidian focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              >
                <optgroup label="Colours">
                  {colourStones.map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {s.name}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Finishes">
                  {finishStones.map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {s.name}
                    </option>
                  ))}
                </optgroup>
              </select>
              {errors.stone && (
                <p id="quote-error-stone" role="alert" className="mt-1 text-xs text-red-700 font-medium">
                  {errors.stone}
                </p>
              )}
            </div>

            {/* Surface Finish Select / Input */}
            <div>
              <label
                htmlFor="quote-field-finish"
                className="block text-xs font-sans font-semibold uppercase tracking-wider text-obsidian mb-1"
              >
                Surface Finish <span className="text-stone-grey-text text-[11px] font-normal">(Optional)</span>
              </label>
              <select
                id="quote-field-finish"
                name="finish"
                value={formData.finish || ""}
                onChange={handleInputChange}
                className="w-full rounded-xs border border-stone/30 bg-white px-3.5 py-2.5 text-sm text-obsidian focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              >
                <option value="">Standard / Project Specification</option>
                {finishOptions.map((opt) => (
                  <option key={opt.id} value={opt.label}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity and Unit (Split Grid) */}
            <div className="sm:col-span-2">
              <label
                htmlFor="quote-field-quantity"
                className="block text-xs font-sans font-semibold uppercase tracking-wider text-obsidian mb-1"
              >
                Required Quantity <span className="text-red-700">*</span>
              </label>
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-7 sm:col-span-8">
                  <input
                    id="quote-field-quantity"
                    name="quantity"
                    type="number"
                    min="1"
                    step="any"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    placeholder="e.g. 1500"
                    aria-invalid={Boolean(errors.quantity)}
                    aria-describedby={errors.quantity ? "quote-error-quantity" : undefined}
                    className="w-full rounded-xs border border-stone/30 bg-white px-3.5 py-2.5 text-sm text-obsidian placeholder:text-stone/60 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                </div>
                <div className="col-span-5 sm:col-span-4">
                  <label htmlFor="quote-field-unit" className="sr-only">
                    Quantity Unit
                  </label>
                  <select
                    id="quote-field-unit"
                    name="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
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
              {errors.quantity && (
                <p id="quote-error-quantity" role="alert" className="mt-1 text-xs text-red-700 font-medium">
                  {errors.quantity}
                </p>
              )}
            </div>

            {/* Thickness Select */}
            <div>
              <label
                htmlFor="quote-field-thickness"
                className="block text-xs font-sans font-semibold uppercase tracking-wider text-obsidian mb-1"
              >
                Thickness <span className="text-red-700">*</span>
              </label>
              <select
                id="quote-field-thickness"
                name="thickness"
                value={formData.thickness}
                onChange={handleInputChange}
                className="w-full rounded-xs border border-stone/30 bg-white px-3.5 py-2.5 text-sm text-obsidian focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              >
                {thicknessOptions.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label} &ndash; {t.description}
                  </option>
                ))}
              </select>
            </div>

            {/* Size / Format Select */}
            <div>
              <label
                htmlFor="quote-field-size"
                className="block text-xs font-sans font-semibold uppercase tracking-wider text-obsidian mb-1"
              >
                Format / Cut Format <span className="text-red-700">*</span>
              </label>
              <select
                id="quote-field-size"
                name="size"
                value={formData.size}
                onChange={handleInputChange}
                className="w-full rounded-xs border border-stone/30 bg-white px-3.5 py-2.5 text-sm text-obsidian focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              >
                {sizeChoices.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Conditional Free Text for Custom Format */}
            {formData.size === "custom" && (
              <div className="sm:col-span-2">
                <label
                  htmlFor="quote-field-customSize"
                  className="block text-xs font-sans font-semibold uppercase tracking-wider text-obsidian mb-1"
                >
                  Specify Custom Dimensions <span className="text-red-700">*</span>
                </label>
                <input
                  id="quote-field-customSize"
                  name="customSize"
                  type="text"
                  value={formData.customSize}
                  onChange={handleInputChange}
                  placeholder="e.g. 600x600x30mm flamed tiles or staircase steps"
                  aria-invalid={Boolean(errors.customSize)}
                  aria-describedby={errors.customSize ? "quote-error-customSize" : undefined}
                  className="w-full rounded-xs border border-stone/30 bg-white px-3.5 py-2.5 text-sm text-obsidian placeholder:text-stone/60 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                />
                {errors.customSize && (
                  <p id="quote-error-customSize" role="alert" className="mt-1 text-xs text-red-700 font-medium">
                    {errors.customSize}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 3. Logistics & Delivery Section */}
        <div className="pt-2">
          <h3 className="text-xs font-sans font-bold uppercase tracking-wider text-obsidian border-b border-stone/15 pb-2 mb-4">
            3. Delivery &amp; Incoterms
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Delivery Incoterms Select */}
            <div>
              <label
                htmlFor="quote-field-delivery"
                className="block text-xs font-sans font-semibold uppercase tracking-wider text-obsidian mb-1"
              >
                Shipment Terms <span className="text-red-700">*</span>
              </label>
              <select
                id="quote-field-delivery"
                name="delivery"
                value={formData.delivery}
                onChange={handleInputChange}
                className="w-full rounded-xs border border-stone/30 bg-white px-3.5 py-2.5 text-sm text-obsidian focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              >
                {deliveryChoices.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Destination Port / City */}
            <div>
              <label
                htmlFor="quote-field-destination"
                className="block text-xs font-sans font-semibold uppercase tracking-wider text-obsidian mb-1"
              >
                Destination Port or City <span className="text-stone-grey-text text-[11px] font-normal">(Optional)</span>
              </label>
              <input
                id="quote-field-destination"
                name="destination"
                type="text"
                value={formData.destination}
                onChange={handleInputChange}
                placeholder="e.g. Rotterdam, Hamburg, or Jebel Ali"
                className="w-full rounded-xs border border-stone/30 bg-white px-3.5 py-2.5 text-sm text-obsidian placeholder:text-stone/60 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
              />
            </div>
          </div>
        </div>

        {/* 4. Project Message & Drawings */}
        <div className="pt-2">
          <h3 className="text-xs font-sans font-bold uppercase tracking-wider text-obsidian border-b border-stone/15 pb-2 mb-4">
            4. Project Notes &amp; Specifications
          </h3>

          <div>
            <label
              htmlFor="quote-field-message"
              className="block text-xs font-sans font-semibold uppercase tracking-wider text-obsidian mb-1"
            >
              Additional Notes or Cutting Schedule <span className="text-stone-grey-text text-[11px] font-normal">(Optional)</span>
            </label>
            <textarea
              id="quote-field-message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Include project timelines, surface finish requirements, edge profiling, or container packaging instructions."
              className="w-full rounded-xs border border-stone/30 bg-white px-3.5 py-2.5 text-sm text-obsidian placeholder:text-stone/60 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold leading-relaxed"
            />
          </div>
        </div>

        {/* 5. Privacy Consent Checkbox */}
        <div className="pt-2">
          <div className="flex items-start gap-3">
            <input
              id="quote-field-consent"
              name="consent"
              type="checkbox"
              checked={formData.consent}
              onChange={handleInputChange}
              aria-invalid={Boolean(errors.consent)}
              aria-describedby={errors.consent ? "quote-error-consent" : undefined}
              className="mt-1 h-4 w-4 rounded-xs border-stone/40 text-gold focus:ring-gold"
            />
            <label
              htmlFor="quote-field-consent"
              className="text-xs text-stone-grey-text leading-relaxed select-none"
            >
              I agree to the{" "}
              <Link
                href="/privacy"
                target="_blank"
                className="text-obsidian underline hover:text-gold transition-colors font-medium"
              >
                Privacy Policy
              </Link>{" "}
              and consent to The Lumbini Exports contacting me regarding this stone quotation request.
              <span className="text-red-700 ml-1">*</span>
            </label>
          </div>
          {errors.consent && (
            <p id="quote-error-consent" role="alert" className="mt-1.5 text-xs text-red-700 font-medium">
              {errors.consent}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-stone/20">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-10 py-4 text-sm font-semibold tracking-wider shadow-md"
          >
            {isSubmitting ? "Submitting Quotation Request..." : "Submit Quote Request"}
          </Button>

          <p className="mt-3 text-[11px] text-stone-grey-text">
            Prompt response within 24&ndash;48 business hours from our Elkathurthy operations desk.
          </p>
        </div>
      </form>
    </div>
  );
}
