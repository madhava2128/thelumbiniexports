import React from "react";
import { type StoneItem } from "@/content/stones";

export interface StoneSpecTableProps {
  stone: StoneItem;
}

interface SpecRow {
  label: string;
  value: string | undefined;
  isClientTodo?: boolean;
}

export function StoneSpecTable({ stone }: StoneSpecTableProps) {
  const specs = stone.specifications;

  const rawRows: SpecRow[] = [
    {
      label: "Stone Classification",
      value: stone.type,
    },
    {
      label: "Colour Family",
      value: specs.primaryColor,
    },
    {
      label: "Quarry Source Region",
      value: specs.quarryOrigin,
      isClientTodo: specs.quarryOrigin?.includes("TODO"),
    },
    {
      label: "Available Forms",
      value: specs.slabSizesAvailable,
    },
    {
      label: "Surface Finishes",
      value: specs.finishOptions && specs.finishOptions.length > 0 ? specs.finishOptions.join(", ") : undefined,
    },
    {
      label: "Typical Applications",
      value: specs.recommendedUses && specs.recommendedUses.length > 0 ? specs.recommendedUses.join(", ") : undefined,
    },
    {
      label: "Standard Thicknesses",
      value: specs.standardThickness && specs.standardThickness.length > 0 ? specs.standardThickness.join(", ") : undefined,
    },
    {
      label: "Water Absorption",
      value: specs.waterAbsorption,
      isClientTodo: specs.waterAbsorption?.includes("TODO"),
    },
    {
      label: "Compressive Strength",
      value: specs.compressiveStrength,
      isClientTodo: specs.compressiveStrength?.includes("TODO"),
    },
  ];

  // Hide any row that has no value rather than showing "N/A"
  const activeRows = rawRows.filter((row) => row.value && row.value.trim().length > 0);

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
        {activeRows.map((row) => {
          // Clean display value if internal comment is present
          const displayValue = row.value?.split("//")[0]?.trim() || row.value;

          return (
            <div
              key={row.label}
              className="grid grid-cols-1 sm:grid-cols-12 py-3.5 px-6 gap-2 text-sm"
            >
              <div className="sm:col-span-4 font-sans font-medium text-stone-grey-text">
                {row.label}
              </div>
              <div className="sm:col-span-8 font-sans text-obsidian">
                <span>{displayValue}</span>
                {row.isClientTodo && (
                  <span className="ml-2 inline-block text-[10px] font-mono text-stone italic">
                    {/* TODO(client): confirm specification */}
                    (Client confirmation pending)
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
