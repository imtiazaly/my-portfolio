import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiLock,
  FiFolder,
  FiBriefcase,
  FiAward,
  FiCpu,
  FiUser,
  FiExternalLink,
  FiLogOut,
  FiShield,
  FiCheckCircle,
} from "react-icons/fi";
import ProjectsManager from "./components/projects/ProjectsManager";
import ExperienceManager from "./components/experience/ExperienceManager";
import CertificationsManager from "./components/certifications/CertificationsManager";
import SkillsManager from "./components/skills/SkillsManager";
import ProfileManager from "./components/profile/ProfileManager";

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [authError, setAuthError] = useState("");
  const [activeTab, setActiveTab] = useState("projects");
  const [loading, setLoading] = useState(false);

  // Check saved session on load
  useEffect(() => {
    const savedToken = sessionStorage.getItem("portfolio_admin_token");
    if (savedToken === "portfolio-admin-session") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAuthError("");

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      });
      const data = await res.json();

      if (data.success) {
        sessionStorage.setItem("portfolio_admin_token", data.token);
        setIsAuthenticated(true);
      } else {
        setAuthError(data.message || "Invalid PIN!");
      }
    } catch {
      setAuthError("Failed to connect to Vite Admin Server!");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("portfolio_admin_token");
    setIsAuthenticated(false);
    setPin("");
  };

  const navItems = [
    { id: "projects", label: "Projects Hub", icon: FiFolder, count: "51" },
    { id: "experience", label: "Work Experience", icon: FiBriefcase },
    { id: "certifications", label: "Certifications", icon: FiAward },
    { id: "skills", label: "Skills & Tech", icon: FiCpu },
    { id: "profile", label: "Profile & Content", icon: FiUser },
  ];

  // 1. PIN Lock Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0d091e] text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute w-[450px] h-[450px] bg-indigo-500/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-md w-full bg-[#160f38]/90 border border-[#2d1e5a] rounded-3xl p-8 backdrop-blur-2xl shadow-2xl relative z-10 text-center">
          <div className="w-16 h-16 bg-gradient-to-tr from-indigo-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-500/25">
            <FiShield className="w-8 h-8 text-white" />
          </div>

          <h1 className="text-2xl font-black tracking-tight text-white mb-2">
            Portfolio Admin
          </h1>
          <p className="text-sm text-[#beafdc] mb-8 font-medium">
            Enter your Admin PIN to manage projects, content & live JSON files.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Enter Admin PIN (default: admin123)"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full px-5 py-3.5 bg-[#0e0a24] border border-[#2d1e5a] rounded-xl text-center text-lg font-mono tracking-widest text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                autoFocus
                required
              />
            </div>

            {authError && (
              <p className="text-xs font-semibold text-rose-400">{authError}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-xl font-bold text-sm tracking-wide shadow-lg hover:shadow-indigo-500/25 hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <FiLock className="w-4 h-4" />
              <span>{loading ? "Verifying..." : "Unlock Dashboard"}</span>
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#2d1e5a]/60 text-xs text-slate-500">
            <Link to="/" className="text-indigo-400 hover:underline">
              ← Return to public website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. Authenticated Dashboard Layout
  return (
    <div className="h-screen bg-[#0b0819] text-slate-100 flex flex-col md:flex-row overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 h-full bg-[#120c2e] border-r border-[#26194d] flex flex-col shrink-0 select-none">
        {/* Brand */}
        <div className="p-6 border-b border-[#26194d] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-pink-500 flex items-center justify-center font-black text-white text-sm shadow-md">
              A
            </div>
            <div>
              <h2 className="text-sm font-black tracking-tight text-white leading-none">
                Admin Studio
              </h2>
              <span className="text-[10px] font-semibold text-emerald-400 inline-flex items-center gap-1 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Sync
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="p-4 space-y-1.5 flex-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                    : "text-[#beafdc] hover:bg-[#1a1240] hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.count && (
                  <span className="px-2 py-0.5 rounded-md text-[10px] bg-black/20">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#26194d] space-y-2 shrink-0">
          <Link
            to="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-[#1a1240] text-[#beafdc] hover:text-white rounded-xl text-xs font-bold transition-all"
          >
            <span>View Public Site</span>
            <FiExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 text-rose-400 hover:bg-rose-500/10 rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            <FiLogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-[#120c2e]/60 backdrop-blur-xl border-b border-[#26194d] px-6 flex items-center justify-between shrink-0">
          <div>
            <h1 className="text-base font-extrabold text-white capitalize">
              {navItems.find((n) => n.id === activeTab)?.label}
            </h1>
            <p className="text-[11px] text-slate-400 font-medium">
              Live updates direct to{" "}
              <code className="text-indigo-300">src/data/json/</code>
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg">
            <FiCheckCircle className="w-3.5 h-3.5" />
            <span>Disk Write Active</span>
          </div>
        </header>

        {/* Tab Body */}
        <div className="p-6 md:p-8 flex-1 overflow-y-auto">
          {activeTab === "projects" && <ProjectsManager />}
          {activeTab === "experience" && <ExperienceManager />}
          {activeTab === "certifications" && <CertificationsManager />}
          {activeTab === "skills" && <SkillsManager />}
          {activeTab === "profile" && <ProfileManager />}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
