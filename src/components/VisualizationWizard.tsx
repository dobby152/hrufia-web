"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useCallback } from "react";

const FLOOR_TYPES = [
  { id: "hardwood", label: "Dřevěná podlaha", emoji: "🪵" },
  { id: "tiles", label: "Dlažba", emoji: "🧱" },
  { id: "vinyl", label: "Vinyl / LVT", emoji: "📐" },
  { id: "carpet", label: "Koberec", emoji: "🧶" },
  { id: "concrete", label: "Betonová stěrka", emoji: "⬜" },
  { id: "marble", label: "Mramor", emoji: "💎" },
];

const STYLES = [
  { id: "modern", label: "Moderní" },
  { id: "scandinavian", label: "Skandinávský" },
  { id: "industrial", label: "Industriální" },
  { id: "classic", label: "Klasický" },
  { id: "minimalist", label: "Minimalistický" },
  { id: "boho", label: "Boho" },
  { id: "japandi", label: "Japandi" },
  { id: "rustic", label: "Rustikální" },
];

const MATERIALS = [
  { id: "wood", label: "Dřevo" },
  { id: "concrete", label: "Beton" },
  { id: "stone", label: "Kámen" },
  { id: "metal", label: "Kov" },
  { id: "glass", label: "Sklo" },
  { id: "brick", label: "Cihla" },
];

const LIGHTING = [
  { id: "warm", label: "Teplé útulné" },
  { id: "cool", label: "Studené moderní" },
  { id: "daylight", label: "Denní světlo" },
  { id: "evening", label: "Večerní atmosféra" },
  { id: "dramatic", label: "Dramatické" },
];

const FURNITURE = [
  { id: "modern", label: "Moderní" },
  { id: "retro", label: "Retro / vintage" },
  { id: "wooden", label: "Dřevěný" },
  { id: "upholstered", label: "Čalouněný" },
  { id: "metal", label: "Kovový" },
  { id: "mixed", label: "Mix stylů" },
];

const WALL_PRESETS = [
  { color: "#FFFFFF", label: "Bílá" },
  { color: "#F5F0E8", label: "Krémová" },
  { color: "#E8D5B7", label: "Béžová" },
  { color: "#D4C4A8", label: "Písková" },
  { color: "#C4B5A0", label: "Taupe" },
  { color: "#B8C4B8", label: "Šalvějová" },
  { color: "#A8B8C8", label: "Ledově modrá" },
  { color: "#8B9EB0", label: "Oceánová" },
  { color: "#2D4A3E", label: "Tmavě zelená" },
  { color: "#1A2744", label: "Námořnická" },
  { color: "#4A3728", label: "Čokoládová" },
  { color: "#C17F59", label: "Terakota" },
  { color: "#D4A574", label: "Zlatá" },
  { color: "#E8B4B8", label: "Růžová" },
  { color: "#9B8EC4", label: "Levandulová" },
  { color: "#333333", label: "Antracitová" },
];

const TOTAL_STEPS = 4;

export function VisualizationWizard({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState(0);
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [wallColor, setWallColor] = useState("#F5F0E8");
  const [customColor, setCustomColor] = useState("#F5F0E8");
  const [floorType, setFloorType] = useState("hardwood");
  const [style, setStyle] = useState("modern");
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>(["wood"]);
  const [lighting, setLighting] = useState("warm");
  const [furnitureType, setFurnitureType] = useState("modern");
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    setPhoto(file);
    const reader = new FileReader();
    reader.onload = (e) => setPhotoPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const toggleMaterial = (id: string) => {
    setSelectedMaterials((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const handleGenerate = async () => {
    if (!photo) return;
    setIsGenerating(true);
    setError(null);

    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("wallColor", wallColor);
    formData.append(
      "floorType",
      FLOOR_TYPES.find((f) => f.id === floorType)?.label || floorType
    );
    formData.append(
      "style",
      STYLES.find((s) => s.id === style)?.label || style
    );
    formData.append(
      "materials",
      selectedMaterials
        .map((m) => MATERIALS.find((mat) => mat.id === m)?.label || m)
        .join(", ")
    );
    formData.append(
      "lighting",
      LIGHTING.find((l) => l.id === lighting)?.label || lighting
    );
    formData.append(
      "furnitureType",
      FURNITURE.find((f) => f.id === furnitureType)?.label || furnitureType
    );

    try {
      const res = await fetch("/api/visualize", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.error) {
        setError(data.error);
      } else {
        setResultImage(data.image);
        setStep(TOTAL_STEPS);
      }
    } catch {
      setError("Nepodařilo se vygenerovat vizualizaci. Zkuste to znovu.");
    } finally {
      setIsGenerating(false);
    }
  };

  const reset = () => {
    setStep(0);
    setPhoto(null);
    setPhotoPreview(null);
    setResultImage(null);
    setError(null);
    setIsGenerating(false);
  };

  const handleClose = () => {
    onClose();
    setTimeout(reset, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={handleClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-charcoal/80 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-cream w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center text-charcoal/40 hover:text-charcoal transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Progress bar */}
            {step < TOTAL_STEPS && (
              <div className="h-1 bg-charcoal/5">
                <motion.div
                  className="h-full bg-amber"
                  initial={{ width: 0 }}
                  animate={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            )}

            <div className="p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {/* Step 0: Upload photo */}
                {step === 0 && (
                  <motion.div
                    key="step0"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="font-display text-2xl sm:text-3xl text-charcoal mb-2">
                      Nahrajte fotku místnosti
                    </h3>
                    <p className="text-stone mb-6">
                      Vyfoťte nebo nahrajte fotku prostoru, který chcete proměnit.
                    </p>

                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                      }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-sm p-8 text-center cursor-pointer transition-all duration-300 ${
                        isDragging
                          ? "border-amber bg-amber/5"
                          : photoPreview
                          ? "border-amber/30 bg-white"
                          : "border-charcoal/15 hover:border-amber/40 bg-white"
                      }`}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFile(file);
                        }}
                      />

                      {photoPreview ? (
                        <div className="space-y-4">
                          <img
                            src={photoPreview}
                            alt="Preview"
                            className="max-h-64 mx-auto rounded-sm object-contain"
                          />
                          <p className="text-stone text-sm">
                            Klikněte pro změnu fotky
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4 py-8">
                          <div className="w-16 h-16 bg-amber/10 rounded-full flex items-center justify-center mx-auto">
                            <svg className="w-8 h-8 text-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-semibold text-charcoal">
                              Přetáhněte fotku sem
                            </p>
                            <p className="text-stone text-sm mt-1">
                              nebo klikněte pro výběr souboru
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end mt-6">
                      <button
                        onClick={() => setStep(1)}
                        disabled={!photo}
                        className="bg-charcoal text-cream px-8 py-3 font-semibold tracking-[0.1em] uppercase text-sm rounded-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-charcoal/90 transition-colors"
                      >
                        Pokračovat
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 1: Colors & Floor */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="font-display text-2xl sm:text-3xl text-charcoal mb-6">
                      Barvy a podlaha
                    </h3>

                    {/* Wall color */}
                    <div className="mb-8">
                      <label className="text-sm font-semibold tracking-[0.15em] uppercase text-charcoal/60 mb-3 block">
                        Barva stěn
                      </label>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {WALL_PRESETS.map((preset) => (
                          <button
                            key={preset.color}
                            onClick={() => {
                              setWallColor(preset.color);
                              setCustomColor(preset.color);
                            }}
                            className={`w-9 h-9 rounded-full border-2 transition-all duration-200 ${
                              wallColor === preset.color
                                ? "border-charcoal scale-110 shadow-md"
                                : "border-charcoal/10 hover:border-charcoal/30"
                            }`}
                            style={{ backgroundColor: preset.color }}
                            title={preset.label}
                          />
                        ))}
                      </div>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={customColor}
                          onChange={(e) => {
                            setCustomColor(e.target.value);
                            setWallColor(e.target.value);
                          }}
                          className="w-9 h-9 rounded-full cursor-pointer border-0 p-0 bg-transparent"
                        />
                        <span className="text-stone text-sm">
                          Vlastní barva: <span className="font-mono">{wallColor}</span>
                        </span>
                      </div>
                    </div>

                    {/* Floor type */}
                    <div>
                      <label className="text-sm font-semibold tracking-[0.15em] uppercase text-charcoal/60 mb-3 block">
                        Typ podlahy
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {FLOOR_TYPES.map((floor) => (
                          <button
                            key={floor.id}
                            onClick={() => setFloorType(floor.id)}
                            className={`p-3 rounded-sm border-2 text-left transition-all duration-200 ${
                              floorType === floor.id
                                ? "border-amber bg-amber/5"
                                : "border-charcoal/10 hover:border-charcoal/20 bg-white"
                            }`}
                          >
                            <span className="text-lg mr-2">{floor.emoji}</span>
                            <span className="text-sm font-medium text-charcoal">
                              {floor.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between mt-8">
                      <button
                        onClick={() => setStep(0)}
                        className="text-stone hover:text-charcoal transition-colors text-sm font-medium"
                      >
                        Zpět
                      </button>
                      <button
                        onClick={() => setStep(2)}
                        className="bg-charcoal text-cream px-8 py-3 font-semibold tracking-[0.1em] uppercase text-sm rounded-sm hover:bg-charcoal/90 transition-colors"
                      >
                        Pokračovat
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Style & Materials */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="font-display text-2xl sm:text-3xl text-charcoal mb-6">
                      Styl a materiály
                    </h3>

                    {/* Style */}
                    <div className="mb-8">
                      <label className="text-sm font-semibold tracking-[0.15em] uppercase text-charcoal/60 mb-3 block">
                        Styl interiéru
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {STYLES.map((s) => (
                          <button
                            key={s.id}
                            onClick={() => setStyle(s.id)}
                            className={`p-3 rounded-sm border-2 text-center transition-all duration-200 ${
                              style === s.id
                                ? "border-amber bg-amber/5"
                                : "border-charcoal/10 hover:border-charcoal/20 bg-white"
                            }`}
                          >
                            <span className="text-sm font-medium text-charcoal">
                              {s.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Materials */}
                    <div>
                      <label className="text-sm font-semibold tracking-[0.15em] uppercase text-charcoal/60 mb-3 block">
                        Materiály{" "}
                        <span className="text-charcoal/30 normal-case tracking-normal">
                          (vyberte více)
                        </span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {MATERIALS.map((m) => (
                          <button
                            key={m.id}
                            onClick={() => toggleMaterial(m.id)}
                            className={`p-3 rounded-sm border-2 text-center transition-all duration-200 ${
                              selectedMaterials.includes(m.id)
                                ? "border-amber bg-amber/5"
                                : "border-charcoal/10 hover:border-charcoal/20 bg-white"
                            }`}
                          >
                            <span className="text-sm font-medium text-charcoal">
                              {m.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between mt-8">
                      <button
                        onClick={() => setStep(1)}
                        className="text-stone hover:text-charcoal transition-colors text-sm font-medium"
                      >
                        Zpět
                      </button>
                      <button
                        onClick={() => setStep(3)}
                        className="bg-charcoal text-cream px-8 py-3 font-semibold tracking-[0.1em] uppercase text-sm rounded-sm hover:bg-charcoal/90 transition-colors"
                      >
                        Pokračovat
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Lighting & Furniture */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <h3 className="font-display text-2xl sm:text-3xl text-charcoal mb-6">
                      Osvětlení a nábytek
                    </h3>

                    {/* Lighting */}
                    <div className="mb-8">
                      <label className="text-sm font-semibold tracking-[0.15em] uppercase text-charcoal/60 mb-3 block">
                        Osvětlení
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {LIGHTING.map((l) => (
                          <button
                            key={l.id}
                            onClick={() => setLighting(l.id)}
                            className={`p-3 rounded-sm border-2 text-center transition-all duration-200 ${
                              lighting === l.id
                                ? "border-amber bg-amber/5"
                                : "border-charcoal/10 hover:border-charcoal/20 bg-white"
                            }`}
                          >
                            <span className="text-sm font-medium text-charcoal">
                              {l.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Furniture */}
                    <div>
                      <label className="text-sm font-semibold tracking-[0.15em] uppercase text-charcoal/60 mb-3 block">
                        Styl nábytku
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {FURNITURE.map((f) => (
                          <button
                            key={f.id}
                            onClick={() => setFurnitureType(f.id)}
                            className={`p-3 rounded-sm border-2 text-center transition-all duration-200 ${
                              furnitureType === f.id
                                ? "border-amber bg-amber/5"
                                : "border-charcoal/10 hover:border-charcoal/20 bg-white"
                            }`}
                          >
                            <span className="text-sm font-medium text-charcoal">
                              {f.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {error && (
                      <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-sm text-red-700 text-sm">
                        {error}
                      </div>
                    )}

                    <div className="flex justify-between mt-8">
                      <button
                        onClick={() => setStep(2)}
                        className="text-stone hover:text-charcoal transition-colors text-sm font-medium"
                      >
                        Zpět
                      </button>
                      <button
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        className="group relative bg-amber text-charcoal px-10 py-4 font-semibold tracking-[0.1em] uppercase text-sm rounded-sm overflow-hidden disabled:opacity-70"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          {isGenerating ? (
                            <>
                              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              Generuji vizualizaci...
                            </>
                          ) : (
                            "Vygenerovat vizualizaci"
                          )}
                        </span>
                        {!isGenerating && (
                          <div className="absolute inset-0 bg-amber-light scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Result */}
                {step === TOTAL_STEPS && resultImage && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                  >
                    <div className="w-14 h-14 bg-amber/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-7 h-7 text-amber" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                      </svg>
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl text-charcoal mb-2">
                      Vaše vizualizace je hotová!
                    </h3>
                    <p className="text-stone mb-6">
                      Takto by mohl vypadat váš prostor po rekonstrukci.
                    </p>

                    {/* Before / After */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div>
                        <span className="text-xs font-semibold tracking-[0.15em] uppercase text-charcoal/40 mb-2 block">
                          Před
                        </span>
                        <img
                          src={photoPreview!}
                          alt="Původní fotka"
                          className="w-full rounded-sm border border-charcoal/10 object-cover aspect-[4/3]"
                        />
                      </div>
                      <div>
                        <span className="text-xs font-semibold tracking-[0.15em] uppercase text-amber mb-2 block">
                          Po rekonstrukci
                        </span>
                        <img
                          src={resultImage}
                          alt="Vizualizace"
                          className="w-full rounded-sm border-2 border-amber/30 object-cover aspect-[4/3]"
                        />
                      </div>
                    </div>

                    <div className="bg-charcoal/5 rounded-sm p-4 mb-6 text-left">
                      <p className="text-sm text-charcoal/70">
                        Líbí se vám, co vidíte? Rádi vám připravíme nezávaznou cenovou nabídku
                        na realizaci vaší rekonstrukce.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                      <a
                        href="/kontakt"
                        className="magnetic-btn group relative bg-amber text-charcoal px-10 py-4 font-semibold tracking-[0.1em] uppercase text-sm rounded-sm overflow-hidden w-full sm:w-auto text-center"
                      >
                        <span className="relative z-10">Chci nabídku</span>
                        <div className="absolute inset-0 bg-amber-light scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                      </a>
                      <button
                        onClick={reset}
                        className="text-stone hover:text-charcoal transition-colors text-sm font-medium py-3"
                      >
                        Zkusit znovu
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
