import React from "react";
import { cn } from "@/lib/utils";

export interface EyebrowProps extends React.HTMLAttributes<HTMLSpanElement> {
  accent?: "gold" | "sage" | "stone" | "ivory";
  withLine?: boolean;
}

const accentColors: Record<NonNullable<EyebrowProps["accent"]>, string> = {
  gold: "text-gold",
  sage: "text-sage",
  stone: "text-stone-grey-text",
  ivory: "text-ivory/80",
};

const lineColors: Record<NonNullable<EyebrowProps["accent"]>, string> = {
  gold: "bg-gold/60",
  sage: "bg-sage/60",
  stone: "bg-stone/60",
  ivory: "bg-ivory/40",
};

export function Eyebrow({
  accent = "gold",
  withLine = false,
  className,
  children,
  ...props
}: EyebrowProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 type-label font-semibold",
        accentColors[accent],
        className
      )}
      {...props}
    >
      {withLine && (
        <span
          className={cn("h-[1px] w-6 shrink-0", lineColors[accent])}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </span>
  );
}
