import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "goldOutline";
  size?: "sm" | "md" | "lg";
  href?: string;
  isExternal?: boolean;
}

const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-gold text-obsidian font-semibold hover:bg-gold-hover shadow-sm transition-all duration-200 active:scale-[0.99] border border-gold-light/40",
  secondary:
    "bg-transparent text-obsidian border border-obsidian/30 hover:border-obsidian hover:bg-obsidian/5 transition-all duration-200 font-medium",
  goldOutline:
    "bg-transparent text-gold border border-gold/60 hover:border-gold hover:bg-gold/10 transition-all duration-200 font-medium",
  ghost:
    "bg-transparent text-obsidian hover:bg-obsidian/5 transition-all duration-200 font-medium",
};

const sizeStyles: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "px-3.5 py-1.5 text-[13px] tracking-wide rounded-sm",
  md: "px-5 py-2.5 text-[14px] tracking-wide rounded-sm",
  lg: "px-7 py-3.5 text-[15px] tracking-wide rounded-sm",
};

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      variant = "primary",
      size = "md",
      className,
      href,
      isExternal,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-sans uppercase tracking-wider text-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold disabled:opacity-50 disabled:pointer-events-none cursor-pointer min-h-[44px]";

    const combinedClassName = cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    if (href) {
      if (isExternal) {
        return (
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            className={combinedClassName}
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        );
      }
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={combinedClassName}
        >
          {children}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        disabled={disabled}
        className={combinedClassName}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
