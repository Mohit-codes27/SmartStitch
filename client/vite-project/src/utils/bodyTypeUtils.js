/**
 * Body Type Analysis & Wardrobe Recommendation Engine
 *
 * Computes body shape classification (Hourglass, Pear, Inverted Triangle, Rectangle, Apple)
 * based on anthropometric measurement ratios and continuous multi-factor scoring.
 * Provides personalized garment, neckline, sleeve, and styling recommendations.
 */

export const BODY_TYPES = {
  HOURGLASS: "hourglass",
  PEAR: "pear",
  INVERTED_TRIANGLE: "inverted_triangle",
  RECTANGLE: "rectangle",
  APPLE: "apple",
};

export const BODY_TYPES_DATA = {
  [BODY_TYPES.HOURGLASS]: {
    id: BODY_TYPES.HOURGLASS,
    name: "Hourglass",
    shapeTitle: "Hourglass Silhouette",
    tagline: "Balanced proportions with a naturally well-defined waistline",
    description:
      "Your bust and hips are closely balanced in width, while your waist is significantly narrower. This creates a curvy, proportionate, and classic hourglass contour.",
    idealRatiosText: "Waist is noticeably smaller than bust & hips (waist-to-hip ratio <= 0.80); bust and hips are balanced.",
    colorTheme: {
      badgeBg: "bg-rose-50",
      badgeText: "text-rose-700",
      badgeBorder: "border-rose-200",
      gradient: "from-rose-500 to-pink-600",
      lightGradient: "from-rose-50/90 to-pink-50/90",
      accent: "text-rose-600",
      borderAccent: "border-rose-300",
      ringAccent: "focus:ring-rose-400",
      barColor: "bg-rose-500",
    },
    flatteringOutfits: [
      "Wrap tops & wrap dresses that cinch at the narrowest waist point",
      "Fitted tailored suits and blazers that follow body contours",
      "A-line, mermaid, and fit-and-flare dresses",
      "High-waisted trousers and belted pencil skirts",
      "Tailored kurtas with side slits and defined waist seams",
    ],
    flatteringNecklines: ["V-Neck", "Sweetheart", "Scoop Neck", "Wrap / Surplice"],
    flatteringSleeves: ["Fitted Full Sleeves", "Three-Quarter Sleeves", "Cap Sleeves"],
    stylesToAvoid: [
      "Boxy, shapeless oversized tunics that hide your natural waist",
      "Stiff straight-cut dresses with no taper",
      "Excessive ruffles around both bust and hips at once",
    ],
    stylingTips: [
      "Always emphasize your waist using belts, darts, or fitted seam lines.",
      "Opt for fluid, body-skimming fabrics like crepe, silk, soft cotton blends, and jersey.",
      "V-necklines visually elongate the torso while enhancing proportional balance.",
    ],
    recommendedCategories: ["Suits", "Dresses", "Kurtas"],
    recommendedKeywords: ["V-Neck", "Fitted", "Belted", "Wrap", "Classic Suit"],
  },

  [BODY_TYPES.PEAR]: {
    id: BODY_TYPES.PEAR,
    name: "Pear (Triangle)",
    shapeTitle: "Pear / Triangle Silhouette",
    tagline: "Graceful shoulders with curvier hips and thighs",
    description:
      "Your hips and lower torso are fuller than your bust and shoulders, paired with a defined waist. Dressing aims to highlight your upper torso and balance your lower proportions.",
    idealRatiosText: "Hips are wider than bust/chest; waist tapers inward relative to hips.",
    colorTheme: {
      badgeBg: "bg-emerald-50",
      badgeText: "text-emerald-700",
      badgeBorder: "border-emerald-200",
      gradient: "from-emerald-500 to-teal-600",
      lightGradient: "from-emerald-50/90 to-teal-50/90",
      accent: "text-emerald-600",
      borderAccent: "border-emerald-300",
      ringAccent: "focus:ring-emerald-400",
      barColor: "bg-emerald-500",
    },
    flatteringOutfits: [
      "A-line dresses and flared kurtas that glide gently over the hips",
      "Statement tops with detailed necklines or full sleeves to draw gaze upward",
      "Tailored blazers with slight shoulder structure ending just above hips",
      "Fit-and-flare suits with fluid, drapey trousers",
      "Off-shoulder or boat neck tops that visually broaden the shoulders",
    ],
    flatteringNecklines: ["Boat Neck", "Round Neck", "Wide V-Neck", "Square Neck"],
    flatteringSleeves: ["Full Sleeves", "Puff / Statement Sleeves", "Flutter Sleeves"],
    stylesToAvoid: [
      "Skin-tight tapered bottoms that overly accentuate lower half width",
      "Tops ending straight across the widest part of your hips",
      "Heavy pocket details or horizontal stripes around hips",
    ],
    stylingTips: [
      "Wear lighter, brighter colors or prints on top with solid, darker tones on the bottom.",
      "A-line silhouettes provide the most comfortable and flattering movement.",
      "Add neckline jewelry or structured collars to frame your face and upper body.",
    ],
    recommendedCategories: ["Kurtas", "Dresses", "Suits"],
    recommendedKeywords: ["Round Neck", "A-Line", "Full Sleeves", "Floral", "Flared"],
  },

  [BODY_TYPES.INVERTED_TRIANGLE]: {
    id: BODY_TYPES.INVERTED_TRIANGLE,
    name: "Inverted Triangle",
    shapeTitle: "Inverted Triangle Silhouette",
    tagline: "Athletic broad shoulders with narrow hips and sleek legs",
    description:
      "Your shoulders and bust are broader than your hips, tapering down to slender hips and legs. Outfits look best when adding soft volume or flare to the lower half.",
    idealRatiosText: "Bust or shoulders are noticeably wider than hips.",
    colorTheme: {
      badgeBg: "bg-violet-50",
      badgeText: "text-violet-700",
      badgeBorder: "border-violet-200",
      gradient: "from-violet-500 to-indigo-600",
      lightGradient: "from-violet-50/90 to-indigo-50/90",
      accent: "text-violet-600",
      borderAccent: "border-violet-300",
      ringAccent: "focus:ring-violet-400",
      barColor: "bg-violet-500",
    },
    flatteringOutfits: [
      "V-neck and deep scoop neck tops that draw the eye vertically inward",
      "Flared A-line dresses and pleated skirts that balance shoulder width",
      "Wide-leg trousers, palazzos, and bootcut pant suits",
      "Peplum tops and flared tunic kurtas that add curve to the hips",
      "Raglan sleeves or unpadded, deconstructed shoulder jackets",
    ],
    flatteringNecklines: ["V-Neck", "Deep Scoop", "Asymmetrical", "Collarless V"],
    flatteringSleeves: ["Sleeveless", "Half Sleeves", "Kimono / Dolman Sleeves"],
    stylesToAvoid: [
      "Heavy shoulder pads and boat necklines that widen the upper frame",
      "Chunky horizontal neckline frills or epaulets",
      "Skinny pants paired with tight, high-neck tops",
    ],
    stylingTips: [
      "V-necklines create vertical focal lines that break up broad upper bodies effortlessly.",
      "Keep tops understated and clean, letting prints, flares, or colors shine on the bottom.",
      "Opt for fluid, raglan cuts or sleeveless cuts for unrestricted shoulder drape.",
    ],
    recommendedCategories: ["Dresses", "Suits", "Kurtas"],
    recommendedKeywords: ["V-Neck", "Wide Leg", "Half Sleeves", "Palazzo", "Casual Suit"],
  },

  [BODY_TYPES.RECTANGLE]: {
    id: BODY_TYPES.RECTANGLE,
    name: "Rectangle (Athletic)",
    shapeTitle: "Rectangle / Athletic Silhouette",
    tagline: "Uniform, streamlined proportions from shoulders to hips",
    description:
      "Your bust, waist, and hips are aligned in similar widths with a straight vertical line. Dressing gives you freedom to create curves, add texture, or flaunt clean architectural tailoring.",
    idealRatiosText: "Bust, waist, and hips within close range of each other with balanced lines.",
    colorTheme: {
      badgeBg: "bg-amber-50",
      badgeText: "text-amber-800",
      badgeBorder: "border-amber-200",
      gradient: "from-amber-500 to-orange-600",
      lightGradient: "from-amber-50/90 to-orange-50/90",
      accent: "text-amber-600",
      borderAccent: "border-amber-300",
      ringAccent: "focus:ring-amber-400",
      barColor: "bg-amber-500",
    },
    flatteringOutfits: [
      "Belted suits and dresses that instantly define an hourglass impression",
      "Fit-and-flare kurtas with contrasting waist tie-backs",
      "Tiered, ruffled, or pleated floral dresses adding dynamic dimensional volume",
      "Cropped jackets paired with high-rise pleated trousers",
      "Color-blocked outfits that visually sculpt the silhouette",
    ],
    flatteringNecklines: ["Round Neck", "Sweetheart", "Cowl Neck", "V-Neck with collar"],
    flatteringSleeves: ["Full Sleeves with cuffs", "Cap Sleeves", "Half Sleeves with trim"],
    stylesToAvoid: [
      "Completely straight column dresses without any belt, break, or waist detail",
      "Square, boxy shapeless t-shirts that emphasize boxiness",
    ],
    stylingTips: [
      "Use statement belts or contrast stitching to break up the vertical torso line.",
      "Layering blazers over contrasting tops creates visual dimension and depth.",
      "Don't hesitate to play with textures: silk, linen weaves, and floral patterns look striking.",
    ],
    recommendedCategories: ["Dresses", "Kurtas", "Suits"],
    recommendedKeywords: ["Belted", "Floral", "Round Neck", "Tiered", "Layered"],
  },

  [BODY_TYPES.APPLE]: {
    id: BODY_TYPES.APPLE,
    name: "Apple (Round)",
    shapeTitle: "Apple / Round Silhouette",
    tagline: "Fuller torso with shapely shoulders, arms, and legs",
    description:
      "Your midsection and chest are the most prominent parts of your silhouette, typically with slender legs, shapely arms, and softer waist definition. Outfits that elongate the torso work best.",
    idealRatiosText: "Waist is close to or wider than hips and bust.",
    colorTheme: {
      badgeBg: "bg-cyan-50",
      badgeText: "text-cyan-800",
      badgeBorder: "border-cyan-200",
      gradient: "from-cyan-600 to-blue-600",
      lightGradient: "from-cyan-50/90 to-blue-50/90",
      accent: "text-cyan-700",
      borderAccent: "border-cyan-300",
      ringAccent: "focus:ring-cyan-400",
      barColor: "bg-cyan-500",
    },
    flatteringOutfits: [
      "Empire waist dresses that taper right below the bustline",
      "Flowy straight-cut kurtas with vertical button or embroidery plackets",
      "V-neck tunic tops paired with slim or straight-cut trousers",
      "Open-front longline jackets and duster coats that create slimming vertical lines",
      "A-line dresses that float effortlessly away from the midsection",
    ],
    flatteringNecklines: ["V-Neck", "Plunging / Notch Neck", "Deep Scoop", "Sweetheart"],
    flatteringSleeves: ["Three-Quarter Sleeves", "Full Sleeves", "Split Sleeves"],
    stylesToAvoid: [
      "Thick, tight belts centered directly over the tummy",
      "Bulky horizontal chest details, high turtlenecks, or pleated waists",
      "Clingy fabrics that stick to the midriff",
    ],
    stylingTips: [
      "Draw attention to your collarbone and legs — your standout features!",
      "V-necklines elongate your neckline and torso instantly.",
      "Choose structured yet flowing fabrics like linen, breathable cotton, and georgette.",
    ],
    recommendedCategories: ["Kurtas", "Suits", "Dresses"],
    recommendedKeywords: ["V-Neck", "Flowy", "Straight Cut", "Empire", "Classic Kurta"],
  },
};

/**
 * Continuous scoring model for body type compatibility.
 * Instead of rigid all-or-nothing cutoffs, this calculates
 * affinity percentage (0 to 100%) for each body archetype.
 *
 * @param {Object} measurements - { bust, chest, waist, hips, shoulder }
 * @returns {Object} Scores for each body type + calculated metrics
 */
export const calculateBodyTypeScores = (measurements) => {
  if (!measurements) return null;

  const b = parseFloat(measurements.bust || measurements.chest || 0);
  const w = parseFloat(measurements.waist || 0);
  const h = parseFloat(measurements.hips || 0);
  const s = parseFloat(measurements.shoulder || 0);

  if (!w || !h || !b || w <= 0 || h <= 0 || b <= 0) {
    return null;
  }

  const waistToHip = w / h;
  const bustToHip = b / h;
  const waistToBust = w / b;
  const bustHipDiffPct = Math.abs(b - h) / Math.max(b, h);
  const shoulderToHip = s > 0 ? s / h : null;

  // 1. HOURGLASS SCORE
  // Key traits: balanced bust & hips (within 10%), distinctly pinched waist (WHR <= 0.80)
  let hourglassScore = 30;
  if (bustHipDiffPct <= 0.05) hourglassScore += 35;
  else if (bustHipDiffPct <= 0.10) hourglassScore += 25;
  else if (bustHipDiffPct <= 0.15) hourglassScore += 10;

  if (waistToHip <= 0.75) hourglassScore += 35;
  else if (waistToHip <= 0.79) hourglassScore += 25;
  else if (waistToHip <= 0.83) hourglassScore += 12;
  else hourglassScore -= 15;

  if (waistToBust <= 0.80) hourglassScore += 5;

  // 2. PEAR SCORE
  // Key traits: Hips are noticeably larger than bust (h > b * 1.05), defined waist
  let pearScore = 20;
  const hipOverBustRatio = h / b;
  if (hipOverBustRatio >= 1.15) pearScore += 45;
  else if (hipOverBustRatio >= 1.08) pearScore += 35;
  else if (hipOverBustRatio >= 1.04) pearScore += 20;
  else if (hipOverBustRatio >= 1.00) pearScore += 5;

  if (waistToHip <= 0.80) pearScore += 25;
  else if (waistToHip <= 0.86) pearScore += 15;

  if (shoulderToHip && shoulderToHip < 0.95) pearScore += 10;

  // 3. INVERTED TRIANGLE SCORE
  // Key traits: Bust or shoulders are noticeably larger than hips (b > h * 1.05)
  let invertedScore = 20;
  const bustOverHipRatio = b / h;
  if (bustOverHipRatio >= 1.15) invertedScore += 45;
  else if (bustOverHipRatio >= 1.08) invertedScore += 35;
  else if (bustOverHipRatio >= 1.04) invertedScore += 20;

  if (shoulderToHip && shoulderToHip >= 1.12) invertedScore += 25;
  else if (shoulderToHip && shoulderToHip >= 1.05) invertedScore += 15;

  if (waistToBust <= 0.85) invertedScore += 10;

  // 4. APPLE SCORE
  // Key traits: Waist is close to or exceeds hips and bust (WHR >= 0.86)
  let appleScore = 20;
  if (waistToHip >= 0.95) appleScore += 55;
  else if (waistToHip >= 0.89) appleScore += 40;
  else if (waistToHip >= 0.85) appleScore += 25;
  else if (waistToHip >= 0.82) appleScore += 10;

  if (w >= b * 0.95) appleScore += 25;
  else if (w >= b * 0.90) appleScore += 15;

  // 5. RECTANGLE SCORE
  // Key traits: Uniform column, bust & hips balanced, waist NOT deeply indented (WHR > 0.80)
  let rectangleScore = 30;
  if (bustHipDiffPct <= 0.08) rectangleScore += 30;
  else if (bustHipDiffPct <= 0.14) rectangleScore += 18;

  if (waistToHip >= 0.80 && waistToHip <= 0.89) rectangleScore += 35;
  else if (waistToHip >= 0.78 && waistToHip <= 0.92) rectangleScore += 20;

  // Clamp all scores between 10 and 98
  const clamp = (val) => Math.max(10, Math.min(98, Math.round(val)));
  return {
    [BODY_TYPES.HOURGLASS]: clamp(hourglassScore),
    [BODY_TYPES.PEAR]: clamp(pearScore),
    [BODY_TYPES.INVERTED_TRIANGLE]: clamp(invertedScore),
    [BODY_TYPES.RECTANGLE]: clamp(rectangleScore),
    [BODY_TYPES.APPLE]: clamp(appleScore),
    ratios: {
      waistToHip: +waistToHip.toFixed(2),
      bustToHip: +bustToHip.toFixed(2),
      waistToBust: +waistToBust.toFixed(2),
      bustHipDiffCm: +Math.abs(b - h).toFixed(1),
      waistDiffCm: +(Math.min(b, h) - w).toFixed(1),
    },
    raw: { bust: b, waist: w, hips: h, shoulder: s },
  };
};

/**
 * Detect user's body type from body measurements with continuous scoring.
 *
 * @param {Object} measurements - { bust, chest, waist, hips, shoulder, height, ... }
 * @param {string|null} overrideType - Optional manual override if user selects a preferred shape
 * @returns {Object|null} Body type result object or null if insufficient data.
 */
export const calculateBodyType = (measurements, overrideType = null) => {
  const result = calculateBodyTypeScores(measurements);
  if (!result) return null;

  const { ratios, raw, ...scores } = result;

  // Rank shapes by score
  const sortedTypes = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const primaryId = overrideType && BODY_TYPES_DATA[overrideType] ? overrideType : sortedTypes[0][0];
  const primaryScore = scores[primaryId];
  const runnerUp = sortedTypes.find(([id]) => id !== primaryId);

  const info = BODY_TYPES_DATA[primaryId] || BODY_TYPES_DATA[BODY_TYPES.RECTANGLE];

  // Specific trait observations explaining why this shape was selected
  const keyObservations = [];
  if (ratios.bustHipDiffCm <= 4) {
    keyObservations.push(`Bust (${raw.bust} cm) and Hips (${raw.hips} cm) are evenly balanced.`);
  } else if (raw.hips > raw.bust) {
    keyObservations.push(`Hips (${raw.hips} cm) are ${ratios.bustHipDiffCm} cm wider than bust (${raw.bust} cm).`);
  } else {
    keyObservations.push(`Bust (${raw.bust} cm) is ${ratios.bustHipDiffCm} cm wider than hips (${raw.hips} cm).`);
  }

  if (ratios.waistToHip <= 0.78) {
    keyObservations.push(`High waist definition with a slim waist-to-hip ratio of ${ratios.waistToHip}.`);
  } else if (ratios.waistToHip >= 0.87) {
    keyObservations.push(`Fuller waistline with a waist-to-hip ratio of ${ratios.waistToHip}.`);
  } else {
    keyObservations.push(`Moderate waist indentation with a waist-to-hip ratio of ${ratios.waistToHip}.`);
  }

  return {
    ...info,
    confidence: primaryScore,
    scores,
    allRankedTypes: sortedTypes.map(([id, score]) => ({
      id,
      name: BODY_TYPES_DATA[id].name,
      score,
    })),
    secondaryType: runnerUp && runnerUp[1] >= primaryScore - 14 ? {
      id: runnerUp[0],
      name: BODY_TYPES_DATA[runnerUp[0]].name,
      score: runnerUp[1],
    } : null,
    ratios,
    rawMeasurements: raw,
    keyObservations,
    isManualOverride: Boolean(overrideType && overrideType !== sortedTypes[0][0]),
  };
};

/**
 * Filter and sort catalog products that match a given body type.
 *
 * @param {Array} products - Catalog of clothing items
 * @param {Object|string} bodyType - Result of calculateBodyType or body type string ID
 * @returns {Array} Filtered/ranked products ideal for this body type
 */
export const getRecommendedProducts = (products = [], bodyType) => {
  if (!products || !products.length || !bodyType) return [];

  const typeId = typeof bodyType === "string" ? bodyType : bodyType?.id;
  const info = BODY_TYPES_DATA[typeId];
  if (!info) return products;

  const targetCategories = (info.recommendedCategories || []).map((c) => c.toLowerCase());
  const targetKeywords = (info.recommendedKeywords || []).map((k) => k.toLowerCase());

  return products
    .map((product) => {
      let score = 0;
      const title = (product.title || product.name || "").toLowerCase();
      const desc = (product.description || "").toLowerCase();
      const cat = (product.category || "").toLowerCase();
      const tags = (product.tags || []).map((t) => t.toLowerCase());
      const designs = (product.designs || []).map((d) =>
        (typeof d === "object" ? d.name || "" : d).toLowerCase()
      );

      // Category matches
      if (targetCategories.includes(cat)) {
        score += 3;
      }

      // Keyword matches in title, designs, tags, or description
      targetKeywords.forEach((kw) => {
        if (title.includes(kw)) score += 4;
        if (designs.some((d) => d.includes(kw))) score += 5;
        if (tags.some((t) => t.includes(kw))) score += 2;
        if (desc.includes(kw)) score += 1;
      });

      return { product, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.product);
};
