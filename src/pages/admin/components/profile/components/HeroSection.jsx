import React, { useState } from "react";
import { FiPlus, FiX, FiLayers } from "react-icons/fi";

const HeroSection = ({ heroData = {}, onChange }) => {
  const [wordInput, setWordInput] = useState("");

  const handleFieldChange = (field, value) => {
    onChange({
      ...heroData,
      [field]: value,
    });
  };

  const handleAddWord = (e) => {
    if ((e.key === "Enter" || e.key === ",") && wordInput.trim()) {
      e.preventDefault();
      const clean = wordInput.trim().replace(/^,|,$/g, "");
      if (clean && !heroData.typewriterWords?.includes(clean)) {
        onChange({
          ...heroData,
          typewriterWords: [...(heroData.typewriterWords || []), clean],
        });
      }
      setWordInput("");
    }
  };

  const handleRemoveWord = (wordToRemove) => {
    onChange({
      ...heroData,
      typewriterWords: (heroData.typewriterWords || []).filter(
        (w) => w !== wordToRemove,
      ),
    });
  };

  return (
    <div className="bg-[#120c2e]/90 border border-[#26194d] rounded-2xl p-6 space-y-6 shadow-xl">
      <div className="flex items-center gap-2 pb-3 border-b border-[#26194d]">
        <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
        <h3 className="font-extrabold text-white text-sm">
          Hero Section Settings
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Developer Name */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-200">
            Developer Name
          </label>
          <input
            type="text"
            value={heroData.name || ""}
            onChange={(e) => handleFieldChange("name", e.target.value)}
            placeholder="e.g. Imtiaz Ali"
            className="w-full px-4 py-2.5 bg-[#0b0819] border border-[#2d1e5a] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Availability Badge */}
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-200">
            Availability Status Tag
          </label>
          <input
            type="text"
            value={heroData.status || ""}
            onChange={(e) => handleFieldChange("status", e.target.value)}
            placeholder="e.g. Available for Freelance & Roles"
            className="w-full px-4 py-2.5 bg-[#0b0819] border border-[#2d1e5a] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Typewriter Animated Words Chips */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
          <FiLayers className="text-indigo-400" />
          <span>Typewriter Animated Titles (Type and press Enter)</span>
        </label>
        <div className="p-3 bg-[#0b0819] border border-[#2d1e5a] rounded-xl flex flex-wrap items-center gap-1.5 min-h-[48px]">
          {heroData.typewriterWords?.map((word, wIdx) => (
            <span
              key={wIdx}
              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 flex items-center gap-1.5 shadow-sm"
            >
              <span>{word}</span>
              <button
                type="button"
                onClick={() => handleRemoveWord(word)}
                className="text-indigo-300 hover:text-white"
                title="Remove Title"
              >
                <FiX className="w-3 h-3" />
              </button>
            </span>
          ))}
          <input
            type="text"
            placeholder="Add title (e.g. React & Vue Developer)..."
            value={wordInput}
            onChange={(e) => setWordInput(e.target.value)}
            onKeyDown={handleAddWord}
            className="flex-1 min-w-[160px] bg-transparent text-xs text-white focus:outline-none px-1"
          />
        </div>
      </div>

      {/* Short Pitch / Description */}
      <div className="space-y-1">
        <label className="text-xs font-bold text-slate-200">
          Hero Pitch Paragraph
        </label>
        <textarea
          rows="3"
          value={heroData.pitch || ""}
          onChange={(e) => handleFieldChange("pitch", e.target.value)}
          placeholder="Brief summary displayed under the typewriter on the homepage..."
          className="w-full px-4 py-2.5 bg-[#0b0819] border border-[#2d1e5a] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 leading-relaxed"
        />
      </div>
    </div>
  );
};

export default HeroSection;
