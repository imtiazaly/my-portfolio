import React, { useState } from "react";
import { FiX, FiPlus, FiUploadCloud, FiMove } from "react-icons/fi";

const ProjectForm = ({
  isOpen,
  onClose,
  formData,
  setFormData,
  onSave,
  saving,
  allProjectsCount,
  onShowToast,
}) => {
  const [tagInput, setTagInput] = useState("");

  if (!isOpen) return null;

  // Slug Generator Helper
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  // Tech Stack Tag Handlers
  const handleAddTag = (e) => {
    if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
      e.preventDefault();
      const clean = tagInput.trim().replace(/^,|,$/g, "");
      if (clean && !formData.stack.includes(clean)) {
        setFormData((prev) => ({ ...prev, stack: [...prev.stack, clean] }));
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      stack: prev.stack.filter((t) => t !== tagToRemove),
    }));
  };

  // Dynamic Features Handlers
  const handleFeatureChange = (index, value) => {
    const updated = [...formData.features];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, features: updated }));
  };

  const handleAddFeature = () => {
    setFormData((prev) => ({ ...prev, features: [...prev.features, ""] }));
  };

  const handleRemoveFeature = (index) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, idx) => idx !== index),
    }));
  };

  // File Upload Helper (Uploads to Disk)
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64Data = reader.result;
        const targetFolder = `images/projects/${formData.type || "web"}/${formData.slug || "temp"}`;
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            filename: file.name,
            targetFolder,
            base64Data,
          }),
        });
        const json = await res.json();
        if (json.success) {
          setFormData((prev) => ({ ...prev, image: json.url }));
          onShowToast?.(`Image saved to ${json.url}`);
        } else {
          onShowToast?.("Image upload failed", "error");
        }
      } catch {
        onShowToast?.("Error uploading file", "error");
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#140e34] border border-[#2d1e5a] rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl relative my-auto">
        {/* Header */}
        <div className="p-6 border-b border-[#26194d] flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-white">
              {formData.id ? "Edit Project" : "Add New Project"}
            </h2>
            <p className="text-xs text-[#beafdc]">
              Updates disk file:{" "}
              <code className="text-indigo-400">
                src/data/json/projects.json
              </code>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-[#1e154a]"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form
          onSubmit={onSave}
          className="p-6 space-y-5 overflow-y-auto flex-1"
        >
          {/* Row 1: Title & Rank */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-3 space-y-1">
              <label className="text-xs font-bold text-slate-300">
                Project Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. ✨ Propelio — AI Proposal Generator"
                value={formData.title}
                onChange={(e) => {
                  const title = e.target.value;
                  setFormData((prev) => ({
                    ...prev,
                    title,
                    slug: prev.id ? prev.slug : generateSlug(title),
                  }));
                }}
                className="w-full px-4 py-2.5 bg-[#0b0819] border border-[#2d1e5a] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1">
                <FiMove className="w-3 h-3 text-indigo-400" />
                <span>Rank / Position</span>
              </label>
              <input
                type="number"
                min="1"
                max={allProjectsCount + 1}
                value={formData.order}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, order: e.target.value }))
                }
                className="w-full px-4 py-2.5 bg-[#0b0819] border border-[#2d1e5a] rounded-xl text-xs text-white text-center font-bold focus:outline-none focus:border-indigo-500"
                title="Position in the list (1 is top)"
              />
            </div>
          </div>

          {/* Row 2: Slug, Type & Category */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">
                URL Slug
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, slug: e.target.value }))
                }
                className="w-full px-4 py-2 bg-[#0b0819] border border-[#2d1e5a] rounded-xl text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">Type</label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, type: e.target.value }))
                }
                className="w-full px-4 py-2 bg-[#0b0819] border border-[#2d1e5a] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="company">company</option>
                <option value="web">web</option>
                <option value="mobile">mobile</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">
                Category Tag
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, category: e.target.value }))
                }
                placeholder="Full Stack, QA, etc."
                className="w-full px-4 py-2 bg-[#0b0819] border border-[#2d1e5a] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Tech Stack Chip Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300">
              Tech Stack (Type & Press Enter or Comma)
            </label>
            <div className="p-2.5 bg-[#0b0819] border border-[#2d1e5a] rounded-xl flex flex-wrap items-center gap-1.5 min-h-[46px]">
              {formData.stack?.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 rounded-lg text-xs font-medium flex items-center gap-1.5"
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="text-indigo-300 hover:text-white"
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                type="text"
                placeholder="Add tech (e.g. React 19)..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                className="flex-1 min-w-[140px] bg-transparent text-xs text-white focus:outline-none px-1"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">
              Description
            </label>
            <textarea
              rows="3"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Detailed description of the application..."
              className="w-full px-4 py-2.5 bg-[#0b0819] border border-[#2d1e5a] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 leading-relaxed"
            />
          </div>

          {/* Key Features Bullets */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300">
                Key Features
              </label>
              <button
                type="button"
                onClick={handleAddFeature}
                className="text-[11px] font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                <FiPlus /> Add Bullet
              </button>
            </div>
            <div className="space-y-2">
              {formData.features?.map((feat, fIdx) => (
                <div key={fIdx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={feat}
                    onChange={(e) => handleFeatureChange(fIdx, e.target.value)}
                    placeholder={`Feature ${fIdx + 1}...`}
                    className="flex-1 px-4 py-2 bg-[#0b0819] border border-[#2d1e5a] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                  {formData.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(fIdx)}
                      className="p-2 text-rose-400 hover:text-white hover:bg-rose-600/20 rounded-lg"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Links: Live & GitHub */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">
                Live URL
              </label>
              <input
                type="url"
                value={formData.live}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, live: e.target.value }))
                }
                placeholder="https://..."
                className="w-full px-4 py-2 bg-[#0b0819] border border-[#2d1e5a] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">
                GitHub Repository URL
              </label>
              <input
                type="url"
                value={formData.github}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, github: e.target.value }))
                }
                placeholder="https://github.com/..."
                className="w-full px-4 py-2 bg-[#0b0819] border border-[#2d1e5a] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Thumbnail Image with Upload */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-300">
              Main Thumbnail Image
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={formData.image}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, image: e.target.value }))
                }
                placeholder="/images/projects/web/propelio/propelio1.png"
                className="flex-1 px-4 py-2 bg-[#0b0819] border border-[#2d1e5a] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
              />
              <label className="px-4 py-2 bg-[#1f154d] text-indigo-300 hover:text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer border border-[#2d1e5a] hover:border-indigo-500 transition-colors">
                <FiUploadCloud className="w-4 h-4" />
                <span>Upload</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-[#26194d] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-[#1a1240]"
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
                  ? "Update Project"
                  : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
