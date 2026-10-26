import React from "react";
import { cn } from "@/lib/utils";

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  variant?: "solid" | "gradient" | "short";
}

export function Divider({
  variant = "solid",
  className,
  ...props
}: DividerProps) {
  if (variant === "gradient") {
    return (
      <div
        className={cn(
          "h-[1px] w-full bg-gradient-to-r from-transparent via-gold/50 to-transparent my-6",
          className
        )}
        role="separator"
      />
    );
  }

  if (variant === "short") {
    return (
      <div
        className={cn(
          "h-[2px] w-16 bg-gold my-4",
          className
        )}
        role="separator"
      />
    );
  }

  return (
    <hr
      className={cn(
        "border-0 border-t border-gold/30 w-full my-6",
        className
      )}
      {...props}
    />
  );
}
