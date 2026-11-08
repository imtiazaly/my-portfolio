import React, { useEffect } from "react";
import { FiX, FiPlus, FiMove } from "react-icons/fi";

const ExperienceForm = ({
  isOpen,
  onClose,
  formData,
  setFormData,
  onSave,
  saving,
  allCount,
}) => {
  // Auto-clean on open/close
  useEffect(() => {
    // Clean mount
  }, [isOpen, formData?.id]);

  if (!isOpen) return null;

  // Dynamic Highlights Bullets Handlers
  const handleHighlightChange = (index, value) => {
    const updated = [...(formData.highlights || [])];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, highlights: updated }));
  };

  const handleAddHighlight = () => {
    setFormData((prev) => ({
      ...prev,
      highlights: [...(prev.highlights || []), ""],
    }));
  };

  const handleRemoveHighlight = (index) => {
    setFormData((prev) => ({
      ...prev,
      highlights: (prev.highlights || []).filter((_, idx) => idx !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(e, formData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#140e34] border border-[#2d1e5a] rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl relative my-auto">
        {/* Header */}
        <div className="p-6 border-b border-[#26194d] flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-white">
              {formData.id ? "Edit Experience" : "Add New Experience"}
            </h2>
            <p className="text-xs text-[#beafdc]">
              Updates disk file:{" "}
              <code className="text-indigo-400">
                src/data/json/experience.json
              </code>
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-[#1e154a]"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5 overflow-y-auto flex-1 text-slate-300"
        >
          {/* Row 1: Role, Company & Position */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-200">
                Job Role / Title <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Full Stack Developer"
                value={formData.role || ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, role: e.target.value }))
                }
                className="w-full px-4 py-2.5 bg-[#0b0819] border border-[#2d1e5a] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-200">
                Company / Organization <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Softleed Company"
                value={formData.company || ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, company: e.target.value }))
                }
                className="w-full px-4 py-2.5 bg-[#0b0819] border border-[#2d1e5a] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-200 flex items-center gap-1">
                <FiMove className="w-3 h-3 text-indigo-400" />
                <span>Rank / Position</span>
              </label>
              <input
                type="number"
                min="1"
                max={allCount + 1}
                value={formData.order || 1}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, order: e.target.value }))
                }
                className="w-full px-4 py-2.5 bg-[#0b0819] border border-[#2d1e5a] rounded-xl text-xs text-white text-center font-bold focus:outline-none focus:border-indigo-500"
                title="Position in timeline (1 is newest)"
              />
            </div>
          </div>

          {/* Row 2: Period */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-200">
              Period / Duration <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Sep 2025 - Present or Jul 2025 - Aug 2025"
              value={formData.period || ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, period: e.target.value }))
              }
              className="w-full px-4 py-2 bg-[#0b0819] border border-[#2d1e5a] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Row 3: Description (Optional) */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-200">
              Role Summary / Description{" "}
              <span className="text-slate-500 font-normal">(Optional)</span>
            </label>
            <textarea
              rows="3"
              value={formData.description || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Brief overview of responsibilities and impact..."
              className="w-full px-4 py-2.5 bg-[#0b0819] border border-[#2d1e5a] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 leading-relaxed"
            />
          </div>

          {/* Row 4: Key Highlights Dynamic Bullets (Optional) */}
          <div className="space-y-2 pt-2 border-t border-[#26194d]/80">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-200">
                Key Accomplishments / Highlights{" "}
                <span className="text-slate-500 font-normal">(Optional)</span>
              </label>
              <button
                type="button"
                onClick={handleAddHighlight}
                className="text-[11px] font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                <FiPlus /> Add Bullet
              </button>
            </div>

            <div className="space-y-2">
              {formData.highlights?.map((point, pIdx) => (
                <div key={pIdx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={point}
                    onChange={(e) =>
                      handleHighlightChange(pIdx, e.target.value)
                    }
                    placeholder={`Accomplishment ${pIdx + 1}...`}
                    className="flex-1 px-4 py-2 bg-[#0b0819] border border-[#2d1e5a] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveHighlight(pIdx)}
                    className="p-2 text-rose-400 hover:text-white hover:bg-rose-600/20 rounded-lg"
                    title="Remove Bullet"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {(!formData.highlights || formData.highlights.length === 0) && (
                <div className="p-3 border border-dashed border-[#2d1e5a] rounded-xl text-center text-xs text-slate-500">
                  No highlight bullets added. Click "+ Add Bullet" to list
                  achievements.
                </div>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-[#26194d] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-[#1a1240] disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold text-xs rounded-xl shadow-lg hover:shadow-indigo-500/25 active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
            >
              {saving
                ? "Saving to Disk..."
                : formData.id
                  ? "Update Experience"
                  : "Add Experience"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExperienceForm;
