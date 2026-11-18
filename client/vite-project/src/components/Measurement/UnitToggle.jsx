import React from "react";
import { useUnit } from "../../context/UnitContext";
import { ArrowLeftRight } from "lucide-react";

/**
 * A compact toggle switch for cm ↔ ft/in.
 * Drop it anywhere — it reads and writes through UnitContext.
 *
 * Props:
 *   size  – "sm" | "md" (default "md")
 */
export default function UnitToggle({ size = "md" }) {
  const { unit, toggleUnit } = useUnit();

  const isCm = unit === "cm";

  const sizeClasses =
    size === "sm"
      ? "text-xs px-2 py-1 gap-1.5"
      : "text-sm px-3 py-1.5 gap-2";

  return (
    <button
      type="button"
      onClick={toggleUnit}
      className={`inline-flex items-center ${sizeClasses} rounded-full border transition-all font-medium select-none
        ${
          isCm
            ? "bg-rose-50 border-rose-200 text-rose-700 hover:bg-rose-100"
            : "bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
        }`}
      title={`Switch to ${isCm ? "feet / inches" : "centimeters"}`}
    >
      <ArrowLeftRight className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} />
      <span>{isCm ? "cm" : "ft / in"}</span>
    </button>
  );
}
