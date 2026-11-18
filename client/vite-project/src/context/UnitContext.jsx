import React, { createContext, useContext, useState, useCallback } from "react";

const UnitContext = createContext();

/**
 * Conversion helpers:
 * - Internal storage is always in cm (database stays in cm).
 * - Display can be cm or ft/in.
 *
 * For height: shown as  5' 8"  (feet + inches)
 * For other body measurements: shown as inches (e.g. 36 in)
 * Weight stays in kg regardless of unit.
 */

// cm → total inches
const cmToInches = (cm) => {
  if (cm === "" || cm === null || cm === undefined || isNaN(Number(cm))) return "";
  return +(Number(cm) / 2.54).toFixed(1);
};

// inches → cm
const inchesToCm = (inches) => {
  if (inches === "" || inches === null || inches === undefined || isNaN(Number(inches))) return "";
  return +(Number(inches) * 2.54).toFixed(1);
};

// cm → { feet, inches } for height display
const cmToFeetInches = (cm) => {
  if (cm === "" || cm === null || cm === undefined || isNaN(Number(cm))) return { feet: "", inches: "" };
  const totalInches = Number(cm) / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = +(totalInches % 12).toFixed(1);
  return { feet, inches };
};

// { feet, inches } → cm
const feetInchesToCm = (feet, inches) => {
  const f = Number(feet) || 0;
  const i = Number(inches) || 0;
  return +((f * 12 + i) * 2.54).toFixed(1);
};

/**
 * Format a measurement value for display.
 * @param {number|string} valueCm - value stored in cm
 * @param {string} fieldName - the measurement field name (e.g. "height", "chest", "weight")
 * @param {string} unit - current unit system: "cm" | "ft/in"
 * @returns {string} formatted display string
 */
const formatMeasurement = (valueCm, fieldName, unit) => {
  if (valueCm === "" || valueCm === null || valueCm === undefined) return "—";
  const num = Number(valueCm);
  if (isNaN(num)) return "—";

  // Weight is always kg
  if (fieldName === "weight") return `${num} kg`;

  if (unit === "cm") {
    return `${Math.round(num)} cm`;
  }

  // ft/in mode
  if (fieldName === "height") {
    const { feet, inches } = cmToFeetInches(num);
    return `${feet}' ${Math.round(inches)}"`;
  }

  // Everything else → inches
  return `${cmToInches(num)} in`;
};

/**
 * Get the display unit label for a field.
 */
const getUnitLabel = (fieldName, unit) => {
  if (fieldName === "weight") return "kg";
  if (unit === "cm") return "cm";
  if (fieldName === "height") return "ft/in";
  return "in";
};

export function UnitProvider({ children }) {
  const [unit, setUnit] = useState("cm"); // "cm" | "ft/in"

  const toggleUnit = useCallback(() => {
    setUnit((prev) => (prev === "cm" ? "ft/in" : "cm"));
  }, []);

  const value = {
    unit,
    setUnit,
    toggleUnit,
    cmToInches,
    inchesToCm,
    cmToFeetInches,
    feetInchesToCm,
    formatMeasurement,
    getUnitLabel,
  };

  return <UnitContext.Provider value={value}>{children}</UnitContext.Provider>;
}

export function useUnit() {
  const ctx = useContext(UnitContext);
  if (!ctx) throw new Error("useUnit must be used within a UnitProvider");
  return ctx;
}

export default UnitContext;
