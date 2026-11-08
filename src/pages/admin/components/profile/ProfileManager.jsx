import React, { useState, useEffect } from "react";
import {
  FiCheck,
  FiUser,
  FiFileText,
  FiShare2,
  FiUploadCloud,
  FiPlus,
  FiX,
  FiSave,
} from "react-icons/fi";

const ProfileManager = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [newWordInput, setNewWordInput] = useState("");

  // 1. Fetch profile.json
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/data/profile");
      const json = await res.json();
      if (json.success && json.data) {
        setProfileData(json.data);
      }
    } catch {
      showToast("Error loading profile data from disk!", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const showToast = (message, type = "success") => {
    setStatusMessage({ message, type });
    setTimeout(() => setStatusMessage(null), 3000);
  };

  // 2. Save profile.json to disk
  const handleSave = async (e) => {
    e?.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/data/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: profileData }),
      });
      const json = await res.json();
      if (json.success) {
        showToast("Profile & site content saved to disk!");
      }
    } catch {
      showToast("Failed to write to profile.json", "error");
    } finally {
      setSaving(false);
    }
  };

  // 3. Resume PDF Upload Handler
  const handleResumePdfUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64Data = reader.result;
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            filename: file.name,
            targetFolder: "resume",
            base64Data,
          }),
        });
        const json = await res.json();
        if (json.success) {
          setProfileData((prev) => ({
            ...prev,
            resume: {
              ...prev.resume,
              pdfPath: json.url,
            },
          }));
          showToast(`Uploaded new resume: ${file.name}`);
        }
      } catch {
        showToast("Error uploading PDF", "error");
      }
    };
    reader.readAsDataURL(file);
  };

  // 4. Typewriter Words Handlers
  const handleAddWord = (e) => {
    if (e.key === "Enter" && newWordInput.trim()) {
      e.preventDefault();
      const clean = newWordInput.trim();
      if (!profileData.hero?.typewriterWords?.includes(clean)) {
        setProfileData((prev) => ({
          ...prev,
          hero: {
            ...prev.hero,
            typewriterWords: [...(prev.hero?.typewriterWords || []), clean],
          },
        }));
      }
      setNewWordInput("");
    }
  };

  const handleRemoveWord = (wordToRemove) => {
    setProfileData((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        typewriterWords: (prev.hero?.typewriterWords || []).filter(
          (w) => w !== wordToRemove,
        ),
      },
    }));
  };

  // 5. Social Links Handlers
  const handleSocialChange = (index, field, value) => {
    const updated = [...(profileData.socialLinks || [])];
    updated[index] = { ...updated[index], [field]: value };
    setProfileData((prev) => ({ ...prev, socialLinks: updated }));
  };

  if (loading || !profileData) {
    return (
      <div className="py-20 text-center text-slate-400 text-sm font-semibold">
        Loading profile content from{" "}
        <code className="text-indigo-400">profile.json</code>...
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Toast Notification */}
      {statusMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl shadow-2xl font-bold text-xs flex items-center gap-2 transition-all ${
            statusMessage.type === "error"
              ? "bg-rose-500 text-white"
              : "bg-emerald-500 text-white"
          }`}
        >
          <FiCheck className="w-4 h-4" />
          <span>{statusMessage.message}</span>
        </div>
      )}

      {/* Top Header Control Bar */}
      <div className="bg-[#120c2e]/90 border border-[#26194d] rounded-2xl p-4 md:p-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold">
            <FiUser className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-white">
              Profile & Site Content Hub
            </h2>
            <p className="text-[11px] text-slate-400 font-medium">
              Controls text for Hero, About, Resume, & Socials in{" "}
              <code className="text-indigo-400">
                src/data/json/profile.json
              </code>
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold text-xs rounded-xl shadow-lg hover:shadow-indigo-500/25 active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
        >
          <FiSave className="w-4 h-4" />
          <span>{saving ? "Saving Changes..." : "Save All Changes"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. Hero Section Content */}
        <div className="bg-[#120c2e]/90 border border-[#26194d] rounded-2xl p-6 space-y-4 shadow-xl">
          <h3 className="font-extrabold text-white text-sm flex items-center gap-2 border-b border-[#26194d] pb-3">
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
            <span>Hero Section</span>
          </h3>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-200">
              Main Headline
            </label>
            <input
              type="text"
              value={profileData.hero?.headline || ""}
              onChange={(e) =>
                setProfileData((prev) => ({
                  ...prev,
                  hero: { ...prev.hero, headline: e.target.value },
                }))
              }
              className="w-full px-4 py-2 bg-[#0b0819] border border-[#2d1e5a] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-200">
              Availability Status Badge
            </label>
            <input
              type="text"
              value={profileData.hero?.status || ""}
              onChange={(e) =>
                setProfileData((prev) => ({
                  ...prev,
                  hero: { ...prev.hero, status: e.target.value },
                }))
              }
              className="w-full px-4 py-2 bg-[#0b0819] border border-[#2d1e5a] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-200">
              Hero Brief Summary
            </label>
            <textarea
              rows="2"
              value={profileData.hero?.summary || ""}
              onChange={(e) =>
                setProfileData((prev) => ({
                  ...prev,
                  hero: { ...prev.hero, summary: e.target.value },
                }))
              }
              className="w-full px-4 py-2 bg-[#0b0819] border border-[#2d1e5a] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Typewriter Words */}
          <div className="space-y-2 pt-2 border-t border-[#26194d]/60">
            <label className="text-xs font-bold text-slate-200">
              Typewriter Animated Titles (Press Enter to Add)
            </label>
            <div className="flex flex-wrap gap-1.5 p-2 bg-[#0b0819] border border-[#2d1e5a] rounded-xl min-h-[46px]">
              {profileData.hero?.typewriterWords?.map((word, wIdx) => (
                <span
                  key={wIdx}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 flex items-center gap-1.5"
                >
                  <span>{word}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveWord(word)}
                    className="hover:text-white"
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                type="text"
                placeholder="Type title & press Enter..."
                value={newWordInput}
                onChange={(e) => setNewWordInput(e.target.value)}
                onKeyDown={handleAddWord}
                className="flex-1 min-w-[140px] bg-transparent text-xs text-white focus:outline-none px-1"
              />
            </div>
          </div>
        </div>

        {/* 2. About Me Bio */}
        <div className="bg-[#120c2e]/90 border border-[#26194d] rounded-2xl p-6 space-y-4 shadow-xl">
          <h3 className="font-extrabold text-white text-sm flex items-center gap-2 border-b border-[#26194d] pb-3">
            <span className="w-2 h-2 rounded-full bg-pink-500" />
            <span>About Me Bio</span>
          </h3>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-200">
              Professional Summary Bio
            </label>
            <textarea
              rows="7"
              value={profileData.about?.bio || ""}
              onChange={(e) =>
                setProfileData((prev) => ({
                  ...prev,
                  about: { ...prev.about, bio: e.target.value },
                }))
              }
              className="w-full px-4 py-2.5 bg-[#0b0819] border border-[#2d1e5a] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 leading-relaxed"
            />
          </div>
        </div>

        {/* 3. Resume PDF Manager */}
        <div className="bg-[#120c2e]/90 border border-[#26194d] rounded-2xl p-6 space-y-4 shadow-xl">
          <h3 className="font-extrabold text-white text-sm flex items-center gap-2 border-b border-[#26194d] pb-3">
            <FiFileText className="text-indigo-400" />
            <span>PDF Resume Manager</span>
          </h3>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-200">
              Current Resume PDF Path
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={profileData.resume?.pdfPath || ""}
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    resume: { ...prev.resume, pdfPath: e.target.value },
                  }))
                }
                className="flex-1 px-4 py-2 bg-[#0b0819] border border-[#2d1e5a] rounded-xl text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
              />
              <label className="px-4 py-2 bg-[#1f154d] text-indigo-300 hover:text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer border border-[#2d1e5a] hover:border-indigo-500 transition-colors shrink-0">
                <FiUploadCloud className="w-4 h-4" />
                <span>Upload PDF</span>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleResumePdfUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-200">
              Last Updated Date Tag
            </label>
            <input
              type="text"
              placeholder="e.g. June 2026 or Oct 2026"
              value={profileData.resume?.lastUpdated || ""}
              onChange={(e) =>
                setProfileData((prev) => ({
                  ...prev,
                  resume: { ...prev.resume, lastUpdated: e.target.value },
                }))
              }
              className="w-full px-4 py-2 bg-[#0b0819] border border-[#2d1e5a] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* 4. Social Links */}
        <div className="bg-[#120c2e]/90 border border-[#26194d] rounded-2xl p-6 space-y-4 shadow-xl">
          <h3 className="font-extrabold text-white text-sm flex items-center gap-2 border-b border-[#26194d] pb-3">
            <FiShare2 className="text-pink-400" />
            <span>Social Profile Links</span>
          </h3>

          <div className="space-y-3">
            {profileData.socialLinks?.map((social, sIdx) => (
              <div key={sIdx} className="space-y-1">
                <label className="text-xs font-bold text-slate-300 capitalize">
                  {social.name} Link
                </label>
                <input
                  type="text"
                  value={social.url || ""}
                  onChange={(e) =>
                    handleSocialChange(sIdx, "url", e.target.value)
                  }
                  className="w-full px-4 py-2 bg-[#0b0819] border border-[#2d1e5a] rounded-xl text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  );
};

export default ProfileManager;
