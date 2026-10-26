"use client";

import { useSyncExternalStore } from "react";

export interface CopyrightYearProps {
  initialYear: number;
}

const emptySubscribe = () => () => {};

/**
 * Client component to display the dynamic current copyright year
 * safely across SSR and client hydration using useSyncExternalStore.
 */
export function CopyrightYear({ initialYear }: CopyrightYearProps) {
  const currentYear = useSyncExternalStore(
    emptySubscribe,
    () => new Date().getFullYear(),
    () => initialYear
  );

  return <span>{currentYear}</span>;
}
