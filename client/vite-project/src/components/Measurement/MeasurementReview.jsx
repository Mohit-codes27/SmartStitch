import React, { useState } from "react";
import { Edit2, Save, Sparkles, AlertCircle } from "lucide-react";
import axios from "axios";
import { useUnit } from "../../context/UnitContext";
import UnitToggle from "./UnitToggle";

const API_BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

export default function MeasurementReview({ 
  initialMeasurements, 
  isAIGenerated = false, 
  userId,
  onSaveComplete 
}) {
  const [measurements, setMeasurements] = useState(initialMeasurements);
  const [isEditing, setIsEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const { unit, cmToInches, inchesToCm, formatMeasurement, getUnitLabel } = useUnit();

  const measurementFields = [
    { label: "Height", name: "height" },
    { label: "Bust", name: "bust" },
    { label: "Chest", name: "chest" },
    { label: "Waist", name: "waist" },
    { label: "Hips", name: "hips" },
    { label: "Shoulder", name: "shoulder" },
    { label: "Arm Length", name: "armLength" },
    { label: "Neck", name: "neck" },
    { label: "Sleeve", name: "sleeve" },
  ];

  // Convert cm stored value to display value
  const cmToDisplay = (valueCm, fieldName) => {
    if (valueCm === "" || valueCm === null || valueCm === undefined) return "";
    if (unit === "cm") return valueCm;
    return cmToInches(valueCm);
  };

  // Convert display value back to cm for storage
  const displayToCm = (value, fieldName) => {
    if (value === "" || value === null || value === undefined) return "";
    if (unit === "cm") return value;
    return inchesToCm(value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Convert input back to cm for internal storage
    const cmValue = displayToCm(value, name);
    setMeasurements({ ...measurements, [name]: cmValue });
  };

  const handleSave = async () => {
    try {
      setError("");
      
      // Prepare measurement data for backend (always in cm)
      const measurementData = {
        userId,
        ...measurements,
        isAIGenerated,
        confidence: measurements.confidence || null,
      };

      await axios.post(`${API_BASE_URL}/measurements/`, measurementData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setSaved(true);
      setIsEditing(false);
      
      setTimeout(() => {
        setSaved(false);
        if (onSaveComplete) {
          onSaveComplete();
        }
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save measurements");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {isAIGenerated && <Sparkles className="w-6 h-6 text-rose-600" />}
          <h2 className="text-xl font-semibold text-stone-900">
            {isAIGenerated ? "AI-Generated " : ""}Measurements
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <UnitToggle size="sm" />
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-4 py-2 rounded-xl font-medium transition-all flex items-center gap-2 ${
              isEditing
                ? "bg-stone-200 text-stone-700 hover:bg-stone-300"
                : "bg-rose-100 text-rose-700 hover:bg-rose-200"
            }`}
          >
            <Edit2 className="w-4 h-4" />
            {isEditing ? "Cancel Edit" : "Edit"}
          </button>
        </div>
      </div>

      {/* AI Confidence Banner */}
      {isAIGenerated && measurements.confidence && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-blue-900">
              AI Confidence: {measurements.confidence}%
            </p>
            <p className="text-xs text-blue-700 mt-1">
              These measurements were generated using AI. Please review and adjust if needed.
            </p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Measurements Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {measurementFields.map((field) => {
          const unitLabel = getUnitLabel(field.name, unit);
          return (
            <div key={field.name} className="flex flex-col">
              <label className="text-sm text-stone-600 mb-1">{field.label}</label>
              <div className="relative">
                <input
                  type="number"
                  name={field.name}
                  placeholder={`Enter ${field.label}`}
                  value={
                    isEditing
                      ? cmToDisplay(measurements[field.name], field.name)
                      : cmToDisplay(measurements[field.name], field.name)
                  }
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 pr-12 bg-stone-50 border rounded-xl text-stone-800 outline-none shadow-sm ${
                    isEditing
                      ? "border-stone-300 focus:ring-2 focus:ring-rose-400"
                      : "border-stone-200 cursor-not-allowed"
                  }`}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-stone-500">
                  {unitLabel}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <button
        onClick={handleSave}
        className="w-full bg-rose-600 text-white py-3 rounded-xl shadow-md hover:bg-rose-700 transition-all font-medium flex items-center justify-center gap-2"
      >
        <Save className="w-5 h-5" />
        Save to Profile
      </button>

      {saved && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl text-center">
          <p className="text-green-700 font-medium">
            ✓ Measurements Saved Successfully
          </p>
        </div>
      )}

      {/* Note */}
      {!isEditing && (
        <div className="mt-4 p-3 bg-stone-50 rounded-xl">
          <p className="text-xs text-stone-600 text-center">
            Click "Edit" to modify your measurements
          </p>
        </div>
      )}
    </div>
  );
}
