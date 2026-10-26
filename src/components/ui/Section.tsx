import React from "react";
import { cn } from "@/lib/utils";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  background?: "ivory" | "charcoal" | "sage" | "hero";
  spacing?: "default" | "compact" | "spacious" | "none";
}

const backgroundStyles: Record<NonNullable<SectionProps["background"]>, string> = {
  ivory: "bg-ivory text-obsidian",
  charcoal: "bg-obsidian text-ivory",
  sage: "bg-sage text-ivory",
  hero: "hero-gradient text-ivory",
};

const spacingStyles: Record<NonNullable<SectionProps["spacing"]>, string> = {
  none: "py-0",
  compact: "py-10 sm:py-14",
  default: "py-16 sm:py-20 lg:py-24",
  spacious: "py-20 sm:py-28 lg:py-32",
};

export function Section({
  background = "ivory",
  spacing = "default",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "relative w-full overflow-hidden transition-colors",
        backgroundStyles[background],
        spacingStyles[spacing],
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}
