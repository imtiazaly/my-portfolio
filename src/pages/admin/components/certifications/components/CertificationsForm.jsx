import React, { useState, useEffect } from "react";
import { FiX, FiUploadCloud, FiMove, FiClock } from "react-icons/fi";

const CertificationsForm = ({
  isOpen,
  onClose,
  formData,
  setFormData,
  onSave,
  saving,
  allCount,
  onShowToast,
}) => {
  const [skillInput, setSkillInput] = useState("");
  // Staged in memory (NO DISK WRITE until submit!)
  const [pendingBadgeFile, setPendingBadgeFile] = useState(null);
  const [uploadingOnSubmit, setUploadingOnSubmit] = useState(false);

  // Auto clean state on open / close
  useEffect(() => {
    if (isOpen) {
      setPendingBadgeFile(null);
      setSkillInput("");
      setUploadingOnSubmit(false);
    }
  }, [isOpen, formData?.id]);

  if (!isOpen) return null;

  const handleCleanClose = () => {
    setPendingBadgeFile(null);
    setSkillInput("");
    setUploadingOnSubmit(false);
    onClose();
  };

  // Skills Tag Handlers (Optional)
  const handleAddSkill = (e) => {
    if ((e.key === "Enter" || e.key === ",") && skillInput.trim()) {
      e.preventDefault();
      const clean = skillInput.trim().replace(/^,|,$/g, "");
      if (clean && !formData.skills?.includes(clean)) {
        setFormData((prev) => ({
          ...prev,
          skills: [...(prev.skills || []), clean],
        }));
      }
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: (prev.skills || []).filter((s) => s !== skillToRemove),
    }));
  };

  // Staged Badge File Select (NO DISK WRITE YET)
  const handleBadgeSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const plannedUrl = `/images/certificates/${file.name}`;
    setFormData((prev) => ({ ...prev, image: plannedUrl }));
    setPendingBadgeFile(file); // Saved in memory only!
    onShowToast?.(`Selected: ${file.name} (will save on submit)`);
  };

  // Upload helper
  const uploadFileToDisk = (file) => {
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
              targetFolder: "images/certificates",
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

  // Submit Handler: Upload staged badge, then save JSON
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!formData.title?.trim() || !formData.issuer?.trim()) {
      onShowToast?.("Certificate Title and Issuer are required!", "error");
      return;
    }

    setUploadingOnSubmit(true);
    try {
      let finalImage = formData.image;
      if (pendingBadgeFile) {
        onShowToast?.("Uploading certificate badge to disk...");
        finalImage = await uploadFileToDisk(pendingBadgeFile);
      }

      const completeData = {
        ...formData,
        image: finalImage,
      };

      onSave(e, completeData);
    } catch {
      onShowToast?.("Failed to upload certificate image", "error");
    } finally {
      setUploadingOnSubmit(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#140e34] border border-[#2d1e5a] rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl relative my-auto">
        {/* Header */}
        <div className="p-6 border-b border-[#26194d] flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-white">
              {formData.id ? "Edit Certification" : "Add New Certification"}
            </h2>
            <p className="text-xs text-[#beafdc]">
              Updates disk file:{" "}
              <code className="text-indigo-400">
                src/data/json/certifications.json
              </code>
            </p>
          </div>
          <button
            type="button"
            onClick={handleCleanClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-[#1e154a]"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form
          onSubmit={handleSubmitForm}
          className="p-6 space-y-5 overflow-y-auto flex-1 text-slate-300"
        >
          {/* Row 1: Title & Rank */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-3 space-y-1">
              <label className="text-xs font-bold text-slate-200">
                Certificate Title <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Meta Full Stack Developer Specialization"
                value={formData.title || ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
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
                title="Position in the list (1 is top)"
              />
            </div>
          </div>

          {/* Row 2: Issuer & Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-200">
                Issuer / Platform <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Coursera / Meta or Google / AWS"
                value={formData.issuer || ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, issuer: e.target.value }))
                }
                className="w-full px-4 py-2 bg-[#0b0819] border border-[#2d1e5a] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-200">
                Issue Date <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Oct 2025 or 2025"
                value={formData.issueDate || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    issueDate: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 bg-[#0b0819] border border-[#2d1e5a] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Row 3: Credential ID & URL (Optional) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-200">
                Credential ID{" "}
                <span className="text-slate-500 font-normal">(Optional)</span>
              </label>
              <input
                type="text"
                placeholder="e.g. META-FS-2025-01"
                value={formData.credentialId || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    credentialId: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 bg-[#0b0819] border border-[#2d1e5a] rounded-xl text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-200">
                Verification / Credential URL{" "}
                <span className="text-slate-500 font-normal">(Optional)</span>
              </label>
              <input
                type="url"
                placeholder="https://coursera.org/verify/..."
                value={formData.credentialUrl || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    credentialUrl: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 bg-[#0b0819] border border-[#2d1e5a] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Row 4: Skills Covered Tags (Optional) */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-200">
              Skills Covered{" "}
              <span className="text-slate-500 font-normal">
                (Optional — Type & Press Enter)
              </span>
            </label>
            <div className="p-2.5 bg-[#0b0819] border border-[#2d1e5a] rounded-xl flex flex-wrap items-center gap-1.5 min-h-[46px]">
              {formData.skills?.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 rounded-lg text-xs font-medium flex items-center gap-1.5"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-indigo-300 hover:text-white"
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                type="text"
                placeholder="Add skill (e.g. React, Node.js)..."
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleAddSkill}
                className="flex-1 min-w-[140px] bg-transparent text-xs text-white focus:outline-none px-1"
              />
            </div>
          </div>

          {/* Row 5: Certificate Image / Badge (Staged) */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-200">
                Certificate Badge / Image URL{" "}
                <span className="text-slate-500 font-normal">(Optional)</span>
              </label>
              {pendingBadgeFile && (
                <span className="text-[10px] font-semibold text-amber-400 flex items-center gap-1">
                  <FiClock className="w-3 h-3" />
                  Staged (saves on submit)
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="/images/certificates/meta.png"
                value={formData.image || ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, image: e.target.value }))
                }
                className="flex-1 px-4 py-2 bg-[#0b0819] border border-[#2d1e5a] rounded-xl text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
              />
              <label className="px-4 py-2 bg-[#1f154d] text-indigo-300 hover:text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer border border-[#2d1e5a] hover:border-indigo-500 transition-colors shrink-0">
                <FiUploadCloud className="w-4 h-4" />
                <span>Select File</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBadgeSelect}
                  className="hidden"
                />
              </label>
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
              className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold text-xs rounded-xl shadow-lg hover:shadow-indigo-500/25 active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
            >
              {uploadingOnSubmit
                ? "Saving Badge to Disk..."
                : saving
                  ? "Writing JSON..."
                  : formData.id
                    ? "Update Certification"
                    : "Add Certification"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CertificationsForm;
