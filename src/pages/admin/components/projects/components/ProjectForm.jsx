import React, { useState, useEffect } from "react";
import {
  FiX,
  FiPlus,
  FiUploadCloud,
  FiMove,
  FiLayers,
  FiClock,
} from "react-icons/fi";

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
  // Staged files in memory
  const [pendingThumbnailFile, setPendingThumbnailFile] = useState(null);
  const [pendingGalleryFiles, setPendingGalleryFiles] = useState({});
  const [uploadingOnSubmit, setUploadingOnSubmit] = useState(false);

  // 🔥 Naya: Jab bhi modal open ho ya project change ho, pichla saara staged kachra saaf karein!
  useEffect(() => {
    if (isOpen) {
      setPendingThumbnailFile(null);
      setPendingGalleryFiles({});
      setTagInput("");
      setUploadingOnSubmit(false);
    }
  }, [isOpen, formData?.id]);

  // 🔥 Naya: Clean Close helper
  const handleCleanClose = () => {
    setPendingThumbnailFile(null);
    setPendingGalleryFiles({});
    setTagInput("");
    setUploadingOnSubmit(false);
    onClose();
  };

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

  // 3. Dynamic Features Handlers (Optional)
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

  // 4. Staged Thumbnail Selection (NO DISK WRITE YET)
  const handleThumbnailSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const targetSlug = formData.slug || generateSlug(formData.title) || "temp";
    const plannedUrl = `/images/projects/${formData.type || "web"}/${targetSlug}/${file.name}`;

    setFormData((prev) => ({ ...prev, image: plannedUrl }));
    setPendingThumbnailFile(file); // Saved in memory only!
    onShowToast?.(`Selected thumbnail: ${file.name} (will save on submit)`);
  };

  // 5. Staged Multiple Gallery Images Selection (NO DISK WRITE YET)
  const handleMultipleGallerySelect = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const targetSlug = formData.slug || generateSlug(formData.title) || "temp";
    const newUrls = [];
    const newPending = { ...pendingGalleryFiles };
    const currentLength = (formData.images || []).length;

    files.forEach((file, idx) => {
      const plannedUrl = `/images/projects/${formData.type || "web"}/${targetSlug}/${file.name}`;
      newUrls.push(plannedUrl);
      newPending[currentLength + idx] = file; // Saved in memory only!
    });

    setFormData((prev) => ({
      ...prev,
      images: [...(prev.images || []), ...newUrls],
    }));
    setPendingGalleryFiles(newPending);
    onShowToast?.(`${files.length} image(s) staged (will save on submit)`);
  };

  // Staged Single Box Image Replace (in memory only)
  const handleSingleGalleryBoxSelect = (e, index) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const targetSlug = formData.slug || generateSlug(formData.title) || "temp";
    const plannedUrl = `/images/projects/${formData.type || "web"}/${targetSlug}/${file.name}`;

    const updatedImages = [...(formData.images || [])];
    updatedImages[index] = plannedUrl;
    setFormData((prev) => ({ ...prev, images: updatedImages }));

    setPendingGalleryFiles((prev) => ({ ...prev, [index]: file }));
  };

  // 6. Manual URL Box Handlers
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
    // Remove URL and clean up staged memory file
    const updatedImages = (formData.images || []).filter(
      (_, idx) => idx !== index,
    );
    setFormData((prev) => ({ ...prev, images: updatedImages }));

    const updatedPending = {};
    Object.keys(pendingGalleryFiles).forEach((key) => {
      const numKey = Number(key);
      if (numKey < index) {
        updatedPending[numKey] = pendingGalleryFiles[numKey];
      } else if (numKey > index) {
        updatedPending[numKey - 1] = pendingGalleryFiles[numKey];
      }
    });
    setPendingGalleryFiles(updatedPending);
  };

  // 7. Helper: Upload a File to Disk
  const uploadFileToDisk = (file, targetFolder) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const base64Data = reader.result;
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
            resolve(json.url);
          } else {
            reject(new Error(json.message || "Upload failed"));
          }
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // 8. Submit Handler: UPLOAD PENDING FILES FIRST, THEN SAVE DATA!
  const handleSubmitForm = async (e) => {
    e.preventDefault();

    if (!formData.title?.trim()) {
      onShowToast?.("Project title is required!", "error");
      return;
    }

    setUploadingOnSubmit(true);
    const targetSlug = formData.slug || generateSlug(formData.title) || "temp";
    const targetFolder = `images/projects/${formData.type || "web"}/${targetSlug}`;

    try {
      let finalThumbnail = formData.image;
      let finalImages = [...(formData.images || [])];

      // A. Upload Thumbnail if staged
      if (pendingThumbnailFile) {
        onShowToast?.("Uploading thumbnail to disk...");
        finalThumbnail = await uploadFileToDisk(
          pendingThumbnailFile,
          targetFolder,
        );
      }

      // B. Upload Gallery Images if staged
      const pendingIndexes = Object.keys(pendingGalleryFiles);
      if (pendingIndexes.length > 0) {
        onShowToast?.(
          `Uploading ${pendingIndexes.length} gallery image(s) to disk...`,
        );
        for (const idxStr of pendingIndexes) {
          const idx = Number(idxStr);
          const file = pendingGalleryFiles[idx];
          if (file) {
            const savedUrl = await uploadFileToDisk(file, targetFolder);
            finalImages[idx] = savedUrl;
          }
        }
      }

      // C. Submit to parent with updated paths
      const completeData = {
        ...formData,
        slug: targetSlug,
        image: finalThumbnail,
        images: finalImages,
      };

      onSave(e, completeData);
    } catch {
      onShowToast?.("Failed to save images to disk", "error");
    } finally {
      setUploadingOnSubmit(false);
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
            onClick={handleCleanClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-[#1e154a]"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form
          onSubmit={handleSubmitForm}
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

          {/* Tech Stack (Optional) */}
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

          {/* Main Thumbnail Image (Staged) */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-200">
                Main Thumbnail Image{" "}
                <span className="text-slate-500 font-normal">(Optional)</span>
              </label>
              {pendingThumbnailFile && (
                <span className="text-[10px] font-semibold text-amber-400 flex items-center gap-1">
                  <FiClock className="w-3 h-3" />
                  Staged (saves on submit)
                </span>
              )}
            </div>
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
                <span>Select File</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailSelect}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Multiple Images URL Boxes (Staged) */}
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
                  Select files or enter paths. Files will upload only when you
                  submit.
                </p>
              </div>

              {/* Action Buttons */}
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
                  <span>Select Multiple</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleMultipleGallerySelect}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* List of URL Boxes */}
            <div className="space-y-2">
              {formData.images?.map((imgUrl, imgIdx) => {
                const isPending = !!pendingGalleryFiles[imgIdx];
                return (
                  <div key={imgIdx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={imgUrl}
                      onChange={(e) =>
                        handleGalleryBoxChange(imgIdx, e.target.value)
                      }
                      placeholder={`Image path ${imgIdx + 1}...`}
                      className="flex-1 px-4 py-2 bg-[#0b0819] border border-[#2d1e5a] rounded-xl text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
                    />

                    {isPending && (
                      <span className="text-[10px] text-amber-400 font-bold bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded-lg shrink-0">
                        Staged
                      </span>
                    )}

                    {/* Single Replace File Picker */}
                    <label
                      className="px-3 py-2 bg-[#1f154d] text-indigo-300 hover:text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer border border-[#2d1e5a] hover:border-indigo-500 transition-colors shrink-0"
                      title="Replace file in memory"
                    >
                      <FiUploadCloud className="w-3.5 h-3.5" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleSingleGalleryBoxSelect(e, imgIdx)
                        }
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
                );
              })}

              {(!formData.images || formData.images.length === 0) && (
                <div className="p-3 border border-dashed border-[#2d1e5a] rounded-xl text-center text-xs text-slate-500">
                  Koi extra screenshot add nahi hua. "Select Multiple" dabayein
                  ya "+ Add URL Box" se path likhein.
                </div>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-[#26194d] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleCleanClose}
              disabled={saving || uploadingOnSubmit}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-[#1a1240] disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || uploadingOnSubmit}
              className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold text-xs rounded-xl shadow-lg hover:shadow-indigo-500/25 active:scale-95 transition-all disabled:opacity-50 cursor-pointer flex items-center gap-2"
            >
              {uploadingOnSubmit
                ? "Saving Images to Disk..."
                : saving
                  ? "Writing JSON..."
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
