import React, { useState } from "react";
import { FiX, FiPlus, FiUploadCloud, FiMove, FiLayers } from "react-icons/fi";

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
  const [uploadingGallery, setUploadingGallery] = useState(false);

  if (!isOpen) return null;

  // 1. Slug Generator Helper
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  // 2. Tech Stack Tag Handlers (Optional)
  const handleAddTag = (e) => {
    if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
      e.preventDefault();
      const clean = tagInput.trim().replace(/^,|,$/g, "");
      if (clean && !formData.stack?.includes(clean)) {
        setFormData((prev) => ({
          ...prev,
          stack: [...(prev.stack || []), clean],
        }));
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      stack: (prev.stack || []).filter((t) => t !== tagToRemove),
    }));
  };

  // 3. Key Features Dynamic Handlers (Optional)
  const handleFeatureChange = (index, value) => {
    const updated = [...(formData.features || [])];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, features: updated }));
  };

  const handleAddFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...(prev.features || []), ""],
    }));
  };

  const handleRemoveFeature = (index) => {
    setFormData((prev) => ({
      ...prev,
      features: (prev.features || []).filter((_, idx) => idx !== index),
    }));
  };

  // 4. Main Thumbnail Upload (Single File)
  const handleThumbnailUpload = async (e) => {
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
          onShowToast?.(`Thumbnail saved to ${json.url}`);
        } else {
          onShowToast?.("Thumbnail upload failed", "error");
        }
      } catch {
        onShowToast?.("Error uploading thumbnail", "error");
      }
    };
    reader.readAsDataURL(file);
  };

  // 5. Multiple Images URL Boxes Handlers
  const handleGalleryBoxChange = (index, value) => {
    const updated = [...(formData.images || [])];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, images: updated }));
  };

  const handleAddGalleryBox = () => {
    setFormData((prev) => ({
      ...prev,
      images: [...(prev.images || []), ""],
    }));
  };

  const handleRemoveGalleryBox = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: (prev.images || []).filter((_, idx) => idx !== index),
    }));
  };

  // Upload Single File inside a specific box
  const handleSingleGalleryBoxUpload = async (e, index) => {
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
          handleGalleryBoxChange(index, json.url);
          onShowToast?.(`Saved image: ${file.name}`);
        }
      } catch {
        onShowToast?.("Upload failed", "error");
      }
    };
    reader.readAsDataURL(file);
  };

  // Upload Multiple Files (creates an input URL box for each file)
  const handleMultipleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setUploadingGallery(true);
    const newUrls = [];

    for (const file of files) {
      await new Promise((resolve) => {
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
              newUrls.push(json.url);
            }
          } catch {
            // continue next file
          }
          resolve();
        };
        reader.readAsDataURL(file);
      });
    }

    setUploadingGallery(false);
    if (newUrls.length > 0) {
      setFormData((prev) => ({
        ...prev,
        images: [...(prev.images || []), ...newUrls],
      }));
      onShowToast?.(`${newUrls.length} image URL box(es) created!`);
    }
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
          className="p-6 space-y-6 overflow-y-auto flex-1 text-slate-300"
        >
          {/* Row 1: Title & Rank */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-3 space-y-1">
              <label className="text-xs font-bold text-slate-200">
                Project Title <span className="text-rose-400">*</span>
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
              <label className="text-xs font-bold text-slate-200 flex items-center gap-1">
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
              <label className="text-xs font-bold text-slate-200">
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
              <label className="text-xs font-bold text-slate-200">Type</label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, type: e.target.value }))
                }
                className="w-full px-4 py-2 bg-[#0b0819] border border-[#2d1e5a] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 capitalize"
              >
                <option value="company">company</option>
                <option value="web">web</option>
                <option value="mobile">mobile</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-200">
                Category Tag{" "}
                <span className="text-slate-500 font-normal">(Optional)</span>
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

          {/* Tech Stack Chip Input (Optional) */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-200">
              Tech Stack{" "}
              <span className="text-slate-500 font-normal">
                (Optional — Type & Press Enter or Comma)
              </span>
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
                placeholder="Add tech (e.g. React 19, Tailwind)..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                className="flex-1 min-w-[140px] bg-transparent text-xs text-white focus:outline-none px-1"
              />
            </div>
          </div>

          {/* Description (Optional) */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-200">
              Description{" "}
              <span className="text-slate-500 font-normal">(Optional)</span>
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
              placeholder="Detailed description of what this application does..."
              className="w-full px-4 py-2.5 bg-[#0b0819] border border-[#2d1e5a] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 leading-relaxed"
            />
          </div>

          {/* Key Features Bullets (Optional) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-200">
                Key Features{" "}
                <span className="text-slate-500 font-normal">(Optional)</span>
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
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(fIdx)}
                    className="p-2 text-rose-400 hover:text-white hover:bg-rose-600/20 rounded-lg"
                    title="Remove Bullet"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Links: Live & GitHub (Optional) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-200">
                Live URL{" "}
                <span className="text-slate-500 font-normal">(Optional)</span>
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
              <label className="text-xs font-bold text-slate-200">
                GitHub Repository URL{" "}
                <span className="text-slate-500 font-normal">(Optional)</span>
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

          {/* Main Thumbnail Image */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-200">
              Main Thumbnail Image{" "}
              <span className="text-slate-500 font-normal">(Optional)</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={formData.image}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, image: e.target.value }))
                }
                placeholder="/images/projects/web/propelio/propelio1.png"
                className="flex-1 px-4 py-2 bg-[#0b0819] border border-[#2d1e5a] rounded-xl text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
              />
              <label className="px-4 py-2 bg-[#1f154d] text-indigo-300 hover:text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer border border-[#2d1e5a] hover:border-indigo-500 transition-colors shrink-0">
                <FiUploadCloud className="w-4 h-4" />
                <span>Upload</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* 🔥 Multiple Images URL Boxes ("images": []) */}
          <div className="space-y-3 pt-4 border-t border-[#26194d]/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <FiLayers className="text-indigo-400" />
                  <span>
                    Gallery Screenshots URL Boxes (`images` array){" "}
                    <span className="text-slate-500 font-normal">
                      (Optional)
                    </span>
                  </span>
                </label>
                <p className="text-[11px] text-slate-500">
                  Multiple images select karein ya manually path enter karein.
                </p>
              </div>

              {/* Action Buttons: Add Box & Multi-Upload */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleAddGalleryBox}
                  className="px-3 py-1.5 bg-[#1b1342] text-indigo-300 hover:text-white rounded-xl text-xs font-bold border border-[#2d1e5a] hover:border-indigo-500 flex items-center gap-1"
                >
                  <FiPlus className="w-3.5 h-3.5" />
                  <span>Add URL Box</span>
                </button>

                <label className="px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer hover:opacity-95 shadow-md">
                  <FiUploadCloud className="w-3.5 h-3.5" />
                  <span>
                    {uploadingGallery ? "Uploading..." : "Upload Multiple"}
                  </span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleMultipleGalleryUpload}
                    disabled={uploadingGallery}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* List of URL Boxes */}
            <div className="space-y-2">
              {formData.images?.map((imgUrl, imgIdx) => (
                <div key={imgIdx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={imgUrl}
                    onChange={(e) =>
                      handleGalleryBoxChange(imgIdx, e.target.value)
                    }
                    placeholder={`Image path ${imgIdx + 1} (e.g. /images/projects/web/propelio/propelio${imgIdx + 1}.png)...`}
                    className="flex-1 px-4 py-2 bg-[#0b0819] border border-[#2d1e5a] rounded-xl text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
                  />
                  {/* Single upload/change button for this box */}
                  <label
                    className="px-3 py-2 bg-[#1f154d] text-indigo-300 hover:text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer border border-[#2d1e5a] hover:border-indigo-500 transition-colors shrink-0"
                    title="Upload / Replace this image"
                  >
                    <FiUploadCloud className="w-3.5 h-3.5" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleSingleGalleryBoxUpload(e, imgIdx)}
                      className="hidden"
                    />
                  </label>
                  {/* Remove / Unselect Box */}
                  <button
                    type="button"
                    onClick={() => handleRemoveGalleryBox(imgIdx)}
                    className="p-2 text-rose-400 hover:text-white hover:bg-rose-600/20 rounded-lg shrink-0"
                    title="Remove this URL box"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {(!formData.images || formData.images.length === 0) && (
                <div className="p-3 border border-dashed border-[#2d1e5a] rounded-xl text-center text-xs text-slate-500">
                  Koi extra screenshot add nahi hua. "Upload Multiple" par click
                  karke ek sath files select karein ya "+ Add URL Box" dabayein.
                </div>
              )}
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