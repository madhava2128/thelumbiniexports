import React from "react";
import { type StoneItem } from "@/content/stones";

export interface StoneSpecTableProps {
  stone: StoneItem;
}

interface SpecRow {
  label: string;
  value: string | undefined;
}

export function StoneSpecTable({ stone }: StoneSpecTableProps) {
  const specs = stone.specifications;

  const rawRows: SpecRow[] = [
    {
      label: "Material",
      value: "Natural Granite",
    },
    {
      label: "Category",
      value: stone.category,
    },
    {
      label: "Colour / Tone",
      value: specs.primaryColor,
    },
    {
      label: "Surface Finish",
      value: specs.surfaceFinish,
    },
    {
      label: "Available Forms",
      value: specs.availableForms,
    },
    {
      label: "Finish Options",
      value:
        specs.finishOptions && specs.finishOptions.length > 0
          ? specs.finishOptions.join(", ")
          : undefined,
    },
    {
      label: "Typical Applications",
      value:
        specs.recommendedUses && specs.recommendedUses.length > 0
          ? specs.recommendedUses.join(", ")
          : undefined,
    },
    {
      label: "Standard Thicknesses",
      value:
        specs.standardThickness && specs.standardThickness.length > 0
          ? specs.standardThickness.join(", ")
          : undefined,
    },
  ];

  // Strictly omit any row without a confirmed value
  const activeRows = rawRows.filter(
    (row) =>
      row.value &&
      row.value.trim().length > 0 &&
      !row.value.toLowerCase().includes("pending") &&
      !row.value.toLowerCase().includes("tbc") &&
      !row.value.toLowerCase().includes("todo") &&
      !row.value.toLowerCase().includes("n/a")
  );

  return (
    <div className="overflow-hidden rounded-xs border border-stone/20 bg-ivory-surface shadow-xs">
      <div className="bg-obsidian px-6 py-3.5 border-b border-gold/30 flex items-center justify-between">
        <span className="type-label text-gold text-xs">
          Technical Specifications
        </span>
        <span className="text-[11px] font-mono text-ivory/60 uppercase">
          Standard Properties
        </span>
      </div>

      <div className="divide-y divide-stone/15">
        {activeRows.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-1 sm:grid-cols-12 py-3.5 px-6 gap-2 text-sm"
          >
            <div className="sm:col-span-4 font-sans font-medium text-stone-grey-text">
              {row.label}
            </div>
            <div className="sm:col-span-8 font-sans text-obsidian font-normal">
              {row.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
