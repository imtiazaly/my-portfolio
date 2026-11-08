import React from "react";
import { FiPlus, FiX, FiTerminal } from "react-icons/fi";

const AboutSection = ({ aboutData = {}, onChange }) => {
  const handleFieldChange = (field, value) => {
    onChange({
      ...aboutData,
      [field]: value,
    });
  };

  // Bio Paragraphs handlers
  const handleParagraphChange = (index, value) => {
    const updated = [...(aboutData.bioParagraphs || [])];
    updated[index] = value;
    handleFieldChange("bioParagraphs", updated);
  };

  const handleAddParagraph = () => {
    handleFieldChange("bioParagraphs", [
      ...(aboutData.bioParagraphs || []),
      "",
    ]);
  };

  const handleRemoveParagraph = (index) => {
    handleFieldChange(
      "bioParagraphs",
      (aboutData.bioParagraphs || []).filter((_, idx) => idx !== index),
    );
  };

  // Console Log Messages handlers
  const handleLogChange = (index, value) => {
    const updated = [...(aboutData.consoleLogs || [])];
    updated[index] = value;
    handleFieldChange("consoleLogs", updated);
  };

  const handleAddLog = () => {
    handleFieldChange("consoleLogs", [...(aboutData.consoleLogs || []), ""]);
  };

  const handleRemoveLog = (index) => {
    handleFieldChange(
      "consoleLogs",
      (aboutData.consoleLogs || []).filter((_, idx) => idx !== index),
    );
  };

  return (
    <div className="bg-[#120c2e]/90 border border-[#26194d] rounded-2xl p-6 space-y-6 shadow-xl">
      <div className="flex items-center gap-2 pb-3 border-b border-[#26194d]">
        <span className="w-2.5 h-2.5 rounded-full bg-pink-500" />
        <h3 className="font-extrabold text-white text-sm">
          About Me Section Settings
        </h3>
      </div>

      {/* Main Heading */}
      <div className="space-y-1">
        <label className="text-xs font-bold text-slate-200">
          About Card Main Heading
        </label>
        <input
          type="text"
          value={aboutData.heading || ""}
          onChange={(e) => handleFieldChange("heading", e.target.value)}
          placeholder="e.g. Building clean web applications and responsive user experiences."
          className="w-full px-4 py-2.5 bg-[#0b0819] border border-[#2d1e5a] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* Experience Counter Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-200">
            Experience Stat Value
          </label>
          <input
            type="text"
            value={aboutData.experienceValue || ""}
            onChange={(e) =>
              handleFieldChange("experienceValue", e.target.value)
            }
            placeholder="e.g. 1 Year or 2+ Years"
            className="w-full px-4 py-2.5 bg-[#0b0819] border border-[#2d1e5a] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-200">
            Experience Label Text
          </label>
          <input
            type="text"
            value={aboutData.experienceLabel || ""}
            onChange={(e) =>
              handleFieldChange("experienceLabel", e.target.value)
            }
            placeholder="e.g. Experience"
            className="w-full px-4 py-2.5 bg-[#0b0819] border border-[#2d1e5a] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Bio Paragraphs List */}
      <div className="space-y-3 pt-2 border-t border-[#26194d]/60">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-200">
            Bio Narrative Paragraphs
          </label>
          <button
            type="button"
            onClick={handleAddParagraph}
            className="text-[11px] font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
          >
            <FiPlus /> Add Paragraph
          </button>
        </div>

        <div className="space-y-3">
          {aboutData.bioParagraphs?.map((para, pIdx) => (
            <div key={pIdx} className="flex items-start gap-2">
              <textarea
                rows="3"
                value={para}
                onChange={(e) => handleParagraphChange(pIdx, e.target.value)}
                placeholder={`Paragraph ${pIdx + 1}...`}
                className="flex-1 px-4 py-2.5 bg-[#0b0819] border border-[#2d1e5a] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 leading-relaxed"
              />
              {aboutData.bioParagraphs.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveParagraph(pIdx)}
                  className="p-2 text-rose-400 hover:text-white hover:bg-rose-600/20 rounded-lg mt-1"
                  title="Remove Paragraph"
                >
                  <FiX className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Terminal Console Logs */}
      <div className="space-y-3 pt-2 border-t border-[#26194d]/60">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
            <FiTerminal className="text-emerald-400" />
            <span>Terminal Console Log Messages (Rotating in card)</span>
          </label>
          <button
            type="button"
            onClick={handleAddLog}
            className="text-[11px] font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
          >
            <FiPlus /> Add Log Line
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {aboutData.consoleLogs?.map((log, lIdx) => (
            <div key={lIdx} className="flex items-center gap-1.5">
              <input
                type="text"
                value={log}
                onChange={(e) => handleLogChange(lIdx, e.target.value)}
                placeholder="system message..."
                className="flex-1 px-3 py-1.5 bg-[#0b0819] border border-[#2d1e5a] rounded-xl text-xs font-mono text-emerald-400 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="button"
                onClick={() => handleRemoveLog(lIdx)}
                className="p-1.5 text-rose-400 hover:text-white"
                title="Remove Log"
              >
                <FiX className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
