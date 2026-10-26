import React from "react";
import { cn } from "@/lib/utils";

type HeadingVariant = "display" | "section" | "product";
type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  variant?: HeadingVariant;
  as?: HeadingTag;
}

const defaultTags: Record<HeadingVariant, HeadingTag> = {
  display: "h1",
  section: "h2",
  product: "h3",
};

const variantClasses: Record<HeadingVariant, string> = {
  display: "type-hero font-normal tracking-tight",
  section: "type-section font-normal tracking-tight",
  product: "type-product font-semibold tracking-normal",
};

export function Heading({
  variant = "section",
  as,
  className,
  children,
  ...props
}: HeadingProps) {
  const Component = as || defaultTags[variant];

  return (
    <Component
      className={cn(variantClasses[variant], className)}
      {...props}
    >
      {children}
    </Component>
  );
}
