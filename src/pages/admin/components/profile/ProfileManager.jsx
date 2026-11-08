import React, { useState, useEffect } from "react";
import {
  FiCheck,
  FiSave,
  FiUser,
  FiFileText,
  FiAward,
  FiCompass,
  FiShare2,
} from "react-icons/fi";

import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import AchievementsSection from "./components/AchievementsSection";
import JourneySection from "./components/JourneySection";
import ResumeSection from "./components/ResumeSection";
import SocialsSection from "./components/SocialsSection";

const ProfileManager = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [activeSection, setActiveSection] = useState("hero");

  // 1. Fetch from Disk
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/data/profile");
      const json = await res.json();
      if (json.success && json.data) {
        setProfileData(json.data);
      }
    } catch {
      showToast("Error loading profile from disk!", "error");
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

  // 2. Save All to Disk
  const handleSaveAll = async (e) => {
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
        showToast("All profile & site content saved to disk!");
      } else {
        showToast("Save failed", "error");
      }
    } catch {
      showToast("Failed to save to profile.json", "error");
    } finally {
      setSaving(false);
    }
  };

  const sections = [
    { id: "hero", label: "Hero Section", icon: FiUser },
    { id: "about", label: "About Me", icon: FiFileText },
    { id: "achievements", label: "Achievements", icon: FiAward },
    { id: "journey", label: "Learning Journey", icon: FiCompass },
    { id: "resume", label: "Resume Page", icon: FiFileText },
    { id: "socials", label: "Social Links", icon: FiShare2 },
  ];

  if (loading || !profileData) {
    return (
      <div className="py-20 text-center text-slate-400 text-sm font-semibold">
        Loading profile content from{" "}
        <code className="text-indigo-400">profile.json</code>...
      </div>
    );
  }

  return (
    <div className="space-y-6">
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

      {/* Control Bar */}
      <div className="bg-[#120c2e]/90 border border-[#26194d] rounded-2xl p-4 md:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-extrabold text-white">
            Site Content & Profile Hub
          </h2>
          <p className="text-[11px] text-slate-400 font-medium">
            Synced directly with{" "}
            <code className="text-indigo-400">src/data/json/profile.json</code>
          </p>
        </div>

        <button
          type="button"
          onClick={handleSaveAll}
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold text-xs rounded-xl shadow-lg hover:shadow-indigo-500/25 active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
        >
          <FiSave className="w-4 h-4" />
          <span>{saving ? "Writing to Disk..." : "Save All Changes"}</span>
        </button>
      </div>

      {/* Sub-Tabs Pills */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-[#120c2e]/90 border border-[#26194d] rounded-2xl">
        {sections.map((sec) => {
          const Icon = sec.icon;
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "text-[#beafdc] hover:text-white hover:bg-[#1a1240]"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{sec.label}</span>
            </button>
          );
        })}
      </div>

      {/* Active Section Child Component */}
      <div>
        {activeSection === "hero" && (
          <HeroSection
            heroData={profileData.hero}
            onChange={(updatedHero) =>
              setProfileData((prev) => ({ ...prev, hero: updatedHero }))
            }
          />
        )}

        {activeSection === "about" && (
          <AboutSection
            aboutData={profileData.about}
            onChange={(updatedAbout) =>
              setProfileData((prev) => ({ ...prev, about: updatedAbout }))
            }
          />
        )}

        {activeSection === "achievements" && (
          <AchievementsSection
            achievements={profileData.achievements}
            onChange={(updatedAchievements) =>
              setProfileData((prev) => ({
                ...prev,
                achievements: updatedAchievements,
              }))
            }
          />
        )}

        {activeSection === "journey" && (
          <JourneySection
            journey={profileData.journey}
            onChange={(updatedJourney) =>
              setProfileData((prev) => ({ ...prev, journey: updatedJourney }))
            }
          />
        )}

        {activeSection === "resume" && (
          <ResumeSection
            resumeData={profileData.resume}
            onChange={(updatedResume) =>
              setProfileData((prev) => ({ ...prev, resume: updatedResume }))
            }
            onShowToast={showToast}
          />
        )}

        {activeSection === "socials" && (
          <SocialsSection
            socialLinks={profileData.socialLinks}
            onChange={(updatedSocials) =>
              setProfileData((prev) => ({
                ...prev,
                socialLinks: updatedSocials,
              }))
            }
          />
        )}
      </div>
    </div>
  );
};

export default ProfileManager;