import React, { useState, useEffect } from "react";
import axios from "axios";
import { Ruler, Save, CheckCircle, AlertCircle } from "lucide-react";
import { useUnit } from "../../context/UnitContext";
import UnitToggle from "./UnitToggle";
import { calculateBodyType } from "../../utils/bodyTypeUtils";

const API_BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

export default function Measurements({ userId, onMeasurementsSaved }) {
  const [measurements, setMeasurements] = useState({
    height: "",
    weight: "",
    neck: "",
    chest: "",
    bust: "",
    waist: "",
    hips: "",
    shoulder: "",
    armLength: "",
    sleeve: "",
    inseam: "",
  });

  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [existingId, setExistingId] = useState(null);

  const { unit, cmToInches, inchesToCm, cmToFeetInches, feetInchesToCm, getUnitLabel } = useUnit();

  // For ft/in height input
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");

  const token = localStorage.getItem("token");

  // Fetch existing measurements
  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    axios
      .get(`${API_BASE_URL}/measurements/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const data = res.data?.data;
        if (data && data.length > 0) {
          const latest = data[0];
          setExistingId(latest._id);
          // Store internally in cm always
          setMeasurements({
            height: latest.height || "",
            weight: latest.weight || "",
            neck: latest.neck || "",
            chest: latest.chest || "",
            bust: latest.bust || "",
            waist: latest.waist || "",
            hips: latest.hips || "",
            shoulder: latest.shoulder || "",
            armLength: latest.armLength || "",
            sleeve: latest.sleeve || "",
            inseam: latest.inseam || "",
          });
          // Set height ft/in fields too
          if (latest.height) {
            const { feet, inches } = cmToFeetInches(latest.height);
            setHeightFeet(String(feet));
            setHeightInches(String(Math.round(inches)));
          }
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [token]);

  // Convert display value to cm for storage
  const displayToCm = (value, fieldName) => {
    if (value === "" || value === null || value === undefined) return "";
    if (fieldName === "weight") return value; // weight stays as-is
    if (unit === "cm") return value;
    // ft/in mode: input is in inches, convert to cm
    return inchesToCm(value);
  };

  // Convert cm value to display value
  const cmToDisplay = (valueCm, fieldName) => {
    if (valueCm === "" || valueCm === null || valueCm === undefined) return "";
    if (fieldName === "weight") return valueCm;
    if (unit === "cm") return valueCm;
    // ft/in mode: show in inches
    return cmToInches(valueCm);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "weight" || name === "height") {
      // height in cm mode or weight — store directly
      if (name === "height" && unit === "cm") {
        setMeasurements({ ...measurements, height: value });
        // Also update ft/in fields
        if (value) {
          const { feet, inches } = cmToFeetInches(value);
          setHeightFeet(String(feet));
          setHeightInches(String(Math.round(inches)));
        }
      } else if (name === "weight") {
        setMeasurements({ ...measurements, weight: value });
      }
    } else {
      // For body measurements: convert display value back to cm for storage
      const cmValue = displayToCm(value, name);
      setMeasurements({ ...measurements, [name]: cmValue });
    }
    setSaved(false);
    setError("");
  };

  // Handle ft/in height inputs
  const handleHeightFeetChange = (e) => {
    const ft = e.target.value;
    setHeightFeet(ft);
    const cm = feetInchesToCm(ft, heightInches);
    setMeasurements((prev) => ({ ...prev, height: cm || "" }));
    setSaved(false);
    setError("");
  };

  const handleHeightInchesChange = (e) => {
    const inc = e.target.value;
    setHeightInches(inc);
    const cm = feetInchesToCm(heightFeet, inc);
    setMeasurements((prev) => ({ ...prev, height: cm || "" }));
    setSaved(false);
    setError("");
  };

  // Save or update measurements (always sends cm to backend)
  const handleSave = async () => {
    try {
      setError("");
      const payload = {};
      Object.entries(measurements).forEach(([key, val]) => {
        if (val !== "" && val !== null && val !== undefined) {
          payload[key] = Number(val);
        }
      });

      if (Object.keys(payload).length === 0) {
        setError("Please enter at least one measurement.");
        return;
      }

      const detected = calculateBodyType(payload);
      if (detected) {
        payload.bodyType = detected.id;
      }

      if (existingId) {
        await axios.patch(
          `${API_BASE_URL}/measurements/${existingId}`,
          { ...payload, measurementMethod: "manual" },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        const res = await axios.post(
          `${API_BASE_URL}/measurements/`,
          { ...payload, measurementMethod: "manual" },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setExistingId(res.data?.data?._id);
      }

      setSaved(true);
      if (onMeasurementsSaved) onMeasurementsSaved(measurements);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save measurements");
    }
  };

  const fields = [
    { label: "Height", name: "height" },
    { label: "Weight", name: "weight" },
    { label: "Neck", name: "neck" },
    { label: "Chest", name: "chest" },
    { label: "Bust", name: "bust" },
    { label: "Waist", name: "waist" },
    { label: "Hips", name: "hips" },
    { label: "Shoulder", name: "shoulder" },
    { label: "Arm Length", name: "armLength" },
    { label: "Sleeve", name: "sleeve" },
    { label: "Inseam", name: "inseam" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Unit Toggle */}
      <div className="flex justify-end mb-3">
        <UnitToggle size="sm" />
      </div>

      {/* Two-Column Grid */}
      <div className="grid grid-cols-2 gap-3">
        {fields.map((item) => {
          const unitLabel = getUnitLabel(item.name, unit);

          // Special height input for ft/in mode
          if (item.name === "height" && unit === "ft/in") {
            return (
              <div key={item.name} className="flex flex-col">
                <label className="text-xs font-medium text-stone-500 mb-1 uppercase tracking-wider">
                  {item.label}
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="number"
                      placeholder="5"
                      value={heightFeet}
                      onChange={handleHeightFeetChange}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 text-sm focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none transition-all pr-8"
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-stone-400">
                      ft
                    </span>
                  </div>
                  <div className="relative flex-1">
                    <input
                      type="number"
                      placeholder="7"
                      value={heightInches}
                      onChange={handleHeightInchesChange}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 text-sm focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none transition-all pr-8"
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-stone-400">
                      in
                    </span>
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div key={item.name} className="flex flex-col">
              <label className="text-xs font-medium text-stone-500 mb-1 uppercase tracking-wider">
                {item.label}
              </label>
              <div className="relative">
                <input
                  type="number"
                  name={item.name}
                  placeholder="—"
                  value={
                    item.name === "weight" || (item.name === "height" && unit === "cm")
                      ? measurements[item.name] || ""
                      : cmToDisplay(measurements[item.name], item.name)
                  }
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-stone-800 text-sm focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none transition-all pr-10"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400">
                  {unitLabel}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="mt-5 w-full bg-gradient-to-r from-rose-600 to-orange-500 text-white py-2.5 rounded-lg shadow-md hover:from-rose-700 hover:to-orange-600 transition-all font-medium text-sm flex items-center justify-center gap-2"
      >
        <Save className="w-4 h-4" />
        {existingId ? "Update Measurements" : "Save Measurements"}
      </button>

      {saved && (
        <div className="flex items-center justify-center gap-2 mt-3 text-green-600 text-sm font-medium">
          <CheckCircle className="w-4 h-4" />
          Measurements saved successfully!
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center gap-2 mt-3 text-red-500 text-sm font-medium">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}
    </div>
  );
}
