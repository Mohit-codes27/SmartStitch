import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  Scissors,
  ArrowRight,
  Info,
  Shirt,
  Compass,
  Sliders,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  BarChart3,
} from "lucide-react";
import {
  calculateBodyType,
  BODY_TYPES,
  BODY_TYPES_DATA,
  getRecommendedProducts,
} from "../../utils/bodyTypeUtils";
import { dummyProducts } from "../../data/dummyProducts";

/**
 * Silhouette Graphic SVG for Body Shapes
 */
function BodySilhouetteIcon({ type, className = "w-12 h-12" }) {
  switch (type) {
    case "hourglass":
      return (
        <svg viewBox="0 0 100 120" className={className} fill="currentColor">
          <path
            d="M30 15 C42 15, 60 15, 70 15 C65 35, 65 42, 54 55 C46 55, 46 55, 46 55 C35 42, 35 35, 30 15 Z"
            opacity="0.85"
          />
          <path
            d="M46 65 C54 65, 54 65, 54 65 C65 78, 65 85, 70 105 C60 105, 42 105, 30 105 C35 85, 35 78, 46 65 Z"
            opacity="0.85"
          />
          <circle cx="50" cy="60" r="4" opacity="0.4" />
        </svg>
      );
    case "pear":
      return (
        <svg viewBox="0 0 100 120" className={className} fill="currentColor">
          <path
            d="M40 20 C46 20, 54 20, 60 20 C58 40, 56 50, 50 60 C44 50, 42 40, 40 20 Z"
            opacity="0.85"
          />
          <path
            d="M50 60 C58 72, 70 82, 76 105 C62 105, 38 105, 24 105 C30 82, 42 72, 50 60 Z"
            opacity="0.85"
          />
        </svg>
      );
    case "inverted_triangle":
      return (
        <svg viewBox="0 0 100 120" className={className} fill="currentColor">
          <path
            d="M22 20 C40 20, 60 20, 78 20 C68 45, 60 65, 54 75 C46 75, 46 75, 46 75 C40 65, 32 45, 22 20 Z"
            opacity="0.85"
          />
          <path
            d="M46 75 C54 75, 54 75, 54 75 C56 85, 58 95, 60 105 C54 105, 46 105, 40 105 C42 95, 44 85, 46 75 Z"
            opacity="0.85"
          />
        </svg>
      );
    case "apple":
      return (
        <svg viewBox="0 0 100 120" className={className} fill="currentColor">
          <ellipse cx="50" cy="60" rx="30" ry="40" opacity="0.85" />
          <path d="M48 18 C48 12, 52 10, 54 12" stroke="currentColor" strokeWidth="3" fill="none" />
        </svg>
      );
    case "rectangle":
    default:
      return (
        <svg viewBox="0 0 100 120" className={className} fill="currentColor">
          <rect x="32" y="18" width="36" height="84" rx="10" opacity="0.85" />
        </svg>
      );
  }
}

// Preset archetypes for simulator testing
const PRESET_MEASUREMENTS = {
  hourglass: { bust: 94, waist: 70, hips: 96, label: "Hourglass Preset" },
  pear: { bust: 85, waist: 72, hips: 102, label: "Pear Preset" },
  inverted_triangle: { bust: 98, waist: 76, hips: 86, label: "Inverted Triangle Preset" },
  rectangle: { bust: 88, waist: 78, hips: 90, label: "Rectangle Preset" },
  apple: { bust: 92, waist: 88, hips: 90, label: "Apple Preset" },
};

export default function BodyTypeCard({
  measurements,
  compact = false,
  showRecommendations = true,
  className = "",
}) {
  const [activeTab, setActiveTab] = useState("outfits"); // 'outfits' | 'necklines' | 'tips' | 'avoid' | 'scores'
  const [showAllTypesModal, setShowAllTypesModal] = useState(false);
  const [selectedInspectType, setSelectedInspectType] = useState(null);
  const [showSimulator, setShowSimulator] = useState(false);
  const [manualOverrideType, setManualOverrideType] = useState(null);

  // Editable simulation measurements initialized from props
  const [simBust, setSimBust] = useState(90);
  const [simWaist, setSimWaist] = useState(74);
  const [simHips, setSimHips] = useState(92);
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    if (measurements) {
      setSimBust(parseFloat(measurements.bust || measurements.chest || 90));
      setSimWaist(parseFloat(measurements.waist || 74));
      setSimHips(parseFloat(measurements.hips || 92));
    }
  }, [measurements]);

  // Active measurement source
  const effectiveMeasurements = useMemo(() => {
    if (isSimulating) {
      return {
        ...(measurements || {}),
        bust: simBust,
        chest: simBust,
        waist: simWaist,
        hips: simHips,
      };
    }
    return measurements;
  }, [measurements, isSimulating, simBust, simWaist, simHips]);

  // Compute body type with continuous scoring
  const bodyType = useMemo(() => {
    return calculateBodyType(effectiveMeasurements, manualOverrideType);
  }, [effectiveMeasurements, manualOverrideType]);

  // Recommended clothes for this body type from SmartStitch dummy catalogue
  const recommendedItems = useMemo(() => {
    if (!bodyType) return [];
    return getRecommendedProducts(dummyProducts, bodyType).slice(0, 3);
  }, [bodyType]);

  const handleApplyPreset = (presetKey) => {
    const p = PRESET_MEASUREMENTS[presetKey];
    if (p) {
      setSimBust(p.bust);
      setSimWaist(p.waist);
      setSimHips(p.hips);
      setIsSimulating(true);
      setManualOverrideType(null);
    }
  };

  const handleResetSimulation = () => {
    if (measurements) {
      setSimBust(parseFloat(measurements.bust || measurements.chest || 90));
      setSimWaist(parseFloat(measurements.waist || 74));
      setSimHips(parseFloat(measurements.hips || 92));
    }
    setIsSimulating(false);
    setManualOverrideType(null);
  };

  // If measurements are missing key fields
  if (!bodyType) {
    const hasAny =
      measurements &&
      (measurements.bust || measurements.chest || measurements.waist || measurements.hips);

    return (
      <div
        className={`bg-gradient-to-br from-stone-50 to-rose-50/50 border border-stone-200/80 rounded-3xl p-6 shadow-sm ${className}`}
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-600 shrink-0">
            <Compass className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-stone-900">
                Body Type & Outfit Analysis
              </h3>
              <span className="text-xs bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full font-medium">
                Measurements Needed
              </span>
            </div>
            <p className="text-sm text-stone-600 mt-1.5 leading-relaxed">
              {hasAny
                ? "To determine your exact body shape (Hourglass, Pear, Rectangle, Inverted Triangle, or Apple), please add your Waist, Hips, and Chest/Bust measurements."
                : "Unlock personalized silhouette recommendations! Enter your measurements or test different shapes with the live simulator below."}
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              <Link
                to="/ai-tryon"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-semibold hover:bg-rose-700 transition shadow-sm"
              >
                <Sparkles className="w-3.5 h-3.5" />
                AI Body Scan
              </Link>
              <button
                onClick={() => {
                  setIsSimulating(true);
                  setSimBust(94);
                  setSimWaist(70);
                  setSimHips(96);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-semibold hover:bg-stone-800 transition shadow-sm"
              >
                <Sliders className="w-3.5 h-3.5" />
                Launch Shape Simulator
              </button>
              <button
                onClick={() => {
                  setSelectedInspectType(BODY_TYPES_DATA.hourglass);
                  setShowAllTypesModal(true);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-stone-200 text-stone-700 rounded-xl text-xs font-semibold hover:bg-stone-50 transition"
              >
                <Info className="w-3.5 h-3.5" />
                Browse Body Shapes Guide
              </button>
            </div>
          </div>
        </div>

        {showAllTypesModal && renderGuideModal()}
      </div>
    );
  }

  // Active display type
  const current = selectedInspectType || bodyType;

  function renderGuideModal() {
    return (
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center pb-4 border-b border-stone-100">
            <h4 className="text-xl font-bold text-stone-900 flex items-center gap-2">
              <Compass className="w-5 h-5 text-rose-600" />
              Body Shape Guide & Styling Index
            </h4>
            <button
              onClick={() => {
                setShowAllTypesModal(false);
                setSelectedInspectType(null);
              }}
              className="text-stone-400 hover:text-stone-700 text-2xl font-bold leading-none p-1"
            >
              &times;
            </button>
          </div>

          {/* Type selector pills */}
          <div className="flex flex-wrap gap-2 my-4">
            {Object.values(BODY_TYPES_DATA).map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedInspectType(t)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                  current.id === t.id
                    ? `${t.colorTheme.badgeBg} ${t.colorTheme.badgeText} border ${t.colorTheme.badgeBorder} ring-2 ${t.colorTheme.ringAccent}`
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>

          {/* Inspected Type details */}
          <div className="space-y-4">
            <div className={`p-4 rounded-2xl bg-gradient-to-r ${current.colorTheme.lightGradient} border ${current.colorTheme.badgeBorder}`}>
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl bg-white/80 flex items-center justify-center ${current.colorTheme.accent}`}>
                  <BodySilhouetteIcon type={current.id} className="w-8 h-8" />
                </div>
                <div>
                  <h5 className="font-bold text-stone-900 text-base">{current.name}</h5>
                  <p className="text-xs text-stone-600 mt-0.5">{current.tagline}</p>
                </div>
              </div>
              <p className="text-xs text-stone-700 mt-3 leading-relaxed">{current.description}</p>
            </div>

            <div>
              <h6 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                What Flatters This Shape
              </h6>
              <ul className="space-y-1.5 text-xs text-stone-700">
                {current.flatteringOutfits.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h6 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                Recommended Necklines & Cuts
              </h6>
              <div className="flex flex-wrap gap-1.5">
                {current.flatteringNecklines.map((neck, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-stone-100 text-stone-800 rounded-lg text-xs font-medium"
                  >
                    {neck}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h6 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                What to Avoid
              </h6>
              <ul className="space-y-1.5 text-xs text-stone-600">
                {current.stylesToAvoid.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // COMPACT VIEW
  if (compact) {
    return (
      <div
        className={`bg-white border rounded-2xl p-4 shadow-sm ${bodyType.colorTheme.badgeBorder} ${className}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl bg-gradient-to-br ${bodyType.colorTheme.gradient} text-white flex items-center justify-center shadow-sm`}
            >
              <BodySilhouetteIcon type={bodyType.id} className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                  Detected Silhouette
                </span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                  {bodyType.confidence}% Match
                </span>
              </div>
              <h4 className="text-base font-bold text-stone-900">{bodyType.name}</h4>
            </div>
          </div>
          <span
            className={`text-xs px-2.5 py-1 rounded-full font-medium ${bodyType.colorTheme.badgeBg} ${bodyType.colorTheme.badgeText}`}
          >
            {bodyType.flatteringNecklines[0]} &bull; {bodyType.flatteringOutfits[0]?.split(" ")[0]}
          </span>
        </div>
        <p className="text-xs text-stone-600 mt-2.5">{bodyType.tagline}</p>
      </div>
    );
  }

  // FULL DETAILED VIEW WITH SIMULATOR & COMPREHENSIVE ANALYSIS
  return (
    <div
      className={`bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-xl relative overflow-hidden ${className}`}
    >
      {/* Decorative background glow */}
      <div
        className={`absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br ${bodyType.colorTheme.gradient} opacity-10 rounded-full blur-3xl pointer-events-none`}
      />

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200/70">
        <div className="flex items-center gap-4">
          <div
            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${bodyType.colorTheme.gradient} text-white flex items-center justify-center shadow-lg p-2 shrink-0 transition-transform duration-300 hover:scale-105`}
          >
            <BodySilhouetteIcon type={bodyType.id} className="w-10 h-10" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Your Silhouette Analysis
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold px-2 py-0.5 rounded-full">
                <Sparkles className="w-3 h-3" />
                {bodyType.confidence}% Match Score
              </span>
              {bodyType.isManualOverride && (
                <span className="text-[10px] bg-purple-100 text-purple-800 font-semibold px-2 py-0.5 rounded-full">
                  User Custom Preference
                </span>
              )}
              {isSimulating && (
                <span className="text-[10px] bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded-full">
                  Simulation Mode Active
                </span>
              )}
            </div>
            <h3 className="text-2xl font-serif font-bold text-stone-900 mt-0.5">
              {bodyType.name}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 font-medium">
              {bodyType.tagline}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex sm:flex-col items-end gap-2 shrink-0">
          <div className="flex items-center gap-1.5 text-xs text-stone-600 bg-stone-50 border border-stone-200/80 rounded-xl px-3 py-1.5">
            <span className="text-stone-400">Waist/Hip:</span>
            <span className="font-bold text-stone-900">{bodyType.ratios.waistToHip}</span>
            <span className="text-stone-300">|</span>
            <span className="text-stone-400">Bust/Hip:</span>
            <span className="font-bold text-stone-900">{bodyType.ratios.bustToHip}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSimulator(!showSimulator)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                showSimulator || isSimulating
                  ? "bg-stone-900 text-white shadow-sm"
                  : "bg-stone-100 text-stone-700 hover:bg-stone-200"
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              {showSimulator ? "Hide Simulator" : "Simulate / Test Shape"}
            </button>
            <button
              onClick={() => {
                setSelectedInspectType(bodyType);
                setShowAllTypesModal(true);
              }}
              className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1 transition px-2 py-1.5"
            >
              <Compass className="w-3.5 h-3.5" />
              All Shapes
            </button>
          </div>
        </div>
      </div>

      {/* LIVE SILHOUETTE SIMULATOR & TUNING DRAWER */}
      {showSimulator && (
        <div className="my-5 p-5 rounded-2xl bg-gradient-to-br from-stone-50 via-rose-50/30 to-amber-50/30 border border-rose-200/80 shadow-inner">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-rose-600" />
                Interactive Silhouette Simulator & Tuner
              </h4>
              <p className="text-xs text-stone-600">
                Nudge your measurements or click presets to see how shapes and clothing recommendations adapt in real time!
              </p>
            </div>
            {isSimulating && (
              <button
                onClick={handleResetSimulation}
                className="text-xs text-stone-500 hover:text-stone-900 font-semibold flex items-center gap-1 underline"
              >
                <RotateCcw className="w-3 h-3" />
                Reset to Saved
              </button>
            )}
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-1.5 mb-4">
            <span className="text-[11px] font-semibold text-stone-500 mr-1">Quick Presets:</span>
            {Object.entries(PRESET_MEASUREMENTS).map(([key, item]) => (
              <button
                key={key}
                onClick={() => handleApplyPreset(key)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                  bodyType.id === key && isSimulating
                    ? "bg-rose-600 text-white shadow-xs"
                    : "bg-white border border-stone-200 text-stone-700 hover:bg-stone-100"
                }`}
              >
                {BODY_TYPES_DATA[key].name}
              </button>
            ))}
          </div>

          {/* Interactive Sliders */}
          <div className="grid sm:grid-cols-3 gap-4 bg-white/80 p-4 rounded-xl border border-stone-200/60">
            {/* Bust */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-stone-700 mb-1">
                <span>Bust / Chest</span>
                <span className="text-rose-600 font-bold">{simBust} cm</span>
              </div>
              <input
                type="range"
                min="70"
                max="125"
                step="1"
                value={simBust}
                onChange={(e) => {
                  setSimBust(Number(e.target.value));
                  setIsSimulating(true);
                  setManualOverrideType(null);
                }}
                className="w-full accent-rose-600 cursor-pointer"
              />
            </div>

            {/* Waist */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-stone-700 mb-1">
                <span>Waist</span>
                <span className="text-rose-600 font-bold">{simWaist} cm</span>
              </div>
              <input
                type="range"
                min="55"
                max="115"
                step="1"
                value={simWaist}
                onChange={(e) => {
                  setSimWaist(Number(e.target.value));
                  setIsSimulating(true);
                  setManualOverrideType(null);
                }}
                className="w-full accent-rose-600 cursor-pointer"
              />
            </div>

            {/* Hips */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-stone-700 mb-1">
                <span>Hips</span>
                <span className="text-rose-600 font-bold">{simHips} cm</span>
              </div>
              <input
                type="range"
                min="70"
                max="130"
                step="1"
                value={simHips}
                onChange={(e) => {
                  setSimHips(Number(e.target.value));
                  setIsSimulating(true);
                  setManualOverrideType(null);
                }}
                className="w-full accent-rose-600 cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* Key Observations & Traits */}
      {bodyType.keyObservations && bodyType.keyObservations.length > 0 && (
        <div className="my-4 p-3.5 rounded-2xl bg-stone-50/90 border border-stone-200/70 text-xs text-stone-700">
          <div className="font-semibold text-stone-900 mb-1 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-rose-600" />
            Why this classification?
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-stone-600">
            {bodyType.keyObservations.map((obs, idx) => (
              <span key={idx}>&bull; {obs}</span>
            ))}
            {bodyType.secondaryType && (
              <span className="text-rose-600 font-medium">
                &bull; Close runner-up shape: {bodyType.secondaryType.name} ({bodyType.secondaryType.score}% affinity)
              </span>
            )}
          </div>
        </div>
      )}

      {/* Description Summary */}
      <div className="mb-5 p-4 rounded-2xl bg-stone-50/60 border border-stone-200/50 text-xs sm:text-sm text-stone-700 leading-relaxed">
        <p>{bodyType.description}</p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200/70 pb-3 mb-5 overflow-x-auto">
        {[
          { key: "outfits", label: "Flattering Fits", icon: Shirt },
          { key: "necklines", label: "Necklines & Sleeves", icon: Scissors },
          { key: "tips", label: "Styling Tips", icon: Sparkles },
          { key: "avoid", label: "What to Avoid", icon: XCircle },
          { key: "scores", label: "Shape Compatibility Scores", icon: BarChart3 },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition shrink-0 ${
                isActive
                  ? "bg-stone-900 text-white shadow-sm"
                  : "bg-stone-100/70 text-stone-600 hover:bg-stone-100 hover:text-stone-900"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="min-h-[140px]">
        {/* TAB 1: OUTFITS */}
        {activeTab === "outfits" && (
          <div className="grid sm:grid-cols-2 gap-3">
            {bodyType.flatteringOutfits.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-3 rounded-2xl bg-emerald-50/50 border border-emerald-100/70 text-xs sm:text-sm text-stone-800"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: NECKLINES & SLEEVES */}
        {activeTab === "necklines" && (
          <div className="space-y-4">
            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2.5">
                Flattering Neckline Cuts
              </h5>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {bodyType.flatteringNecklines.map((neck, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-rose-50/70 border border-rose-100 text-center font-semibold text-xs sm:text-sm text-rose-900 shadow-2xs"
                  >
                    {neck}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h5 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2.5">
                Recommended Sleeve Styles
              </h5>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {bodyType.flatteringSleeves.map((sleeve, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-amber-50/70 border border-amber-100 text-center font-semibold text-xs sm:text-sm text-amber-900 shadow-2xs"
                  >
                    {sleeve}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: STYLING TIPS */}
        {activeTab === "tips" && (
          <div className="space-y-2.5">
            {bodyType.stylingTips.map((tip, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-2xl bg-gradient-to-r from-stone-50 to-rose-50/40 border border-stone-200/70 text-xs sm:text-sm text-stone-700"
              >
                <span className="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{tip}</span>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: AVOID */}
        {activeTab === "avoid" && (
          <div className="space-y-2.5">
            {bodyType.stylesToAvoid.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-3 rounded-2xl bg-red-50/60 border border-red-100 text-xs sm:text-sm text-red-900"
              >
                <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        )}

        {/* TAB 5: SHAPE COMPATIBILITY SCORES BREAKDOWN */}
        {activeTab === "scores" && bodyType.scores && (
          <div className="space-y-3 p-4 bg-stone-50/80 rounded-2xl border border-stone-200/70">
            <div className="flex items-center justify-between text-xs text-stone-500 font-semibold mb-2">
              <span>Body Shape</span>
              <span>Match Affinity Score</span>
            </div>
            {Object.entries(bodyType.scores)
              .sort((a, b) => b[1] - a[1])
              .map(([id, score]) => {
                const info = BODY_TYPES_DATA[id];
                const isSelected = bodyType.id === id;
                return (
                  <div key={id} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className={`font-bold ${isSelected ? "text-stone-900" : "text-stone-600"}`}>
                          {info.name}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                            Primary Match
                          </span>
                        )}
                      </div>
                      <span className="font-bold text-stone-800">{score}%</span>
                    </div>
                    <div className="w-full bg-stone-200/80 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${info.colorTheme.barColor}`}
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>

      {/* RECOMMENDED SMARTSTITCH STYLES */}
      {showRecommendations && recommendedItems.length > 0 && (
        <div className="mt-8 pt-6 border-t border-stone-200/70">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-base font-bold text-stone-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-rose-600" />
                Tailored for Your Body Shape
              </h4>
              <p className="text-xs text-stone-500">
                Recommended SmartStitch pieces handpicked for your proportions
              </p>
            </div>
            <Link
              to="/shop"
              className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1"
            >
              View Shop
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {recommendedItems.map((prod) => (
              <Link
                key={prod._id}
                to={`/product/${prod._id}`}
                className="group block bg-stone-50/80 hover:bg-white border border-stone-200/80 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-all duration-300"
              >
                <div className="aspect-4/3 overflow-hidden bg-stone-200 relative">
                  <img
                    src={prod.images?.[0] || prod.designs?.[0]?.image}
                    alt={prod.title || prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-2 left-2 bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                    {prod.category}
                  </span>
                </div>
                <div className="p-3">
                  <h5 className="font-bold text-stone-900 text-xs sm:text-sm truncate">
                    {prod.title || prod.name}
                  </h5>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-xs font-bold text-rose-600">
                      ₹{prod.price?.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-stone-500 flex items-center gap-0.5 group-hover:text-rose-600">
                      Customize <ArrowRight className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Guide Modal */}
      {showAllTypesModal && renderGuideModal()}
    </div>
  );
}
