import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Exact aspect ratio of the official logo (738 / 338 = 2.1834)
const LOGO_ASPECT_RATIO = "738 / 338";

export interface LogoProps {
  variant?: "onDark" | "onLight";
  size?: "sm" | "md" | "lg" | "header" | "footer" | "showcase";
  width?: number | string;
  height?: number | string;
  href?: string;
  className?: string;
  priority?: boolean;
}

/**
 * Official Logo Component for The Lumbini Exports.
 *
 * Renders the authentic brand emblem (sacred lotus + serene Buddha + gold divider)
 * and typography ("THE LUMBINI EXPORTS GRANITE FACTORY").
 *
 * Clean, fast, and razor-sharp across all viewports without shader/canvas distortion.
 * - onDark (default): Crisp white typography and luminous Buddha for obsidian (#252827) headers & footers.
 * - onLight: Original navy typography for ivory/light backgrounds.
 */
export default function Logo({
  variant = "onDark",
  size,
  width,
  height,
  href,
  className,
  priority = false,
}: LogoProps = {}) {
  const logoSrc =
    variant === "onLight" ? "/brand/logo.png" : "/brand/logo-light.png";

  // Pre-calibrated responsive sizing:
  // - header: h-[48px] sm:h-[54px] lg:h-[60px] (renders ~105px to 131px wide).
  //   Visible and clear without crowding navigation links or CTA button.
  // - footer: h-[90px] sm:h-[110px] lg:h-[125px] (renders ~196px to 273px wide).
  //   Prominent centerpiece utilizing the footer space generously.
  // - sm: h-[42px] sm:h-[48px] (for mobile navigation drawer).
  // - md: h-[54px] sm:h-[62px].
  // - lg: h-[72px] sm:h-[84px].
  // - showcase: w-[280px] sm:w-[360px] lg:w-[440px].
  let sizeClasses = "w-[260px] sm:w-[340px] lg:w-[420px] h-auto";

  if (size === "header") {
    sizeClasses = "h-[48px] sm:h-[54px] lg:h-[60px] w-auto";
  } else if (size === "footer") {
    sizeClasses = "h-[90px] sm:h-[110px] lg:h-[125px] w-auto";
  } else if (size === "sm") {
    sizeClasses = "h-[42px] sm:h-[48px] w-auto";
  } else if (size === "md") {
    sizeClasses = "h-[54px] sm:h-[62px] w-auto";
  } else if (size === "lg") {
    sizeClasses = "h-[72px] sm:h-[84px] w-auto";
  } else if (size === "showcase") {
    sizeClasses = "w-[280px] sm:w-[360px] lg:w-[440px] h-auto";
  }

  const customStyle: React.CSSProperties = {
    aspectRatio: LOGO_ASPECT_RATIO,
    ...(width !== undefined ? { width } : {}),
    ...(height !== undefined ? { height } : {}),
  };

  const imageElement = (
    <div
      className={cn(
        "relative overflow-hidden select-none shrink-0 inline-flex items-center",
        width === undefined && height === undefined ? sizeClasses : undefined,
        className
      )}
      style={customStyle}
    >
      <Image
        src={logoSrc}
        alt="The Lumbini Exports - Granite Factory & Natural Stone Exporters"
        width={738}
        height={338}
        priority={priority || size === "header"}
        className="w-full h-full object-contain pointer-events-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]"
      />
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="inline-flex items-center justify-center rounded-sm focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-4 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
        aria-label="The Lumbini Exports - Return to Homepage"
      >
        {imageElement}
      </Link>
    );
  }

  return imageElement;
}

export { Logo };
