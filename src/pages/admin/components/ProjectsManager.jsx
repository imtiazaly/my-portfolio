import { useState, useEffect, useMemo } from "react";
import {
  FiPlus,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiArrowUp,
  FiArrowDown,
  FiUploadCloud,
  FiExternalLink,
  FiGithub,
  FiX,
  FiCheck,
  FiLayers,
  FiMove,
} from "react-icons/fi";

const INITIAL_PROJECT_FORM = {
  id: null,
  title: "",
  slug: "",
  type: "web",
  category: "Full Stack",
  stack: [],
  description: "",
  features: [""],
  live: "",
  github: "",
  image: "",
  images: [],
  order: 1,
};

const ProjectsManager = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(INITIAL_PROJECT_FORM);
  const [tagInput, setTagInput] = useState("");
  const [statusMessage, setStatusMessage] = useState(null);
  const [saving, setSaving] = useState(false);
  const [reorderLoadingId, setReorderLoadingId] = useState(null);

  // 1. Fetch Projects from Disk API
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/data/projects");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        // Sort by order ascending
        const sorted = [...json.data].sort(
          (a, b) => (a.order || 0) - (b.order || 0),
        );
        setProjects(sorted);
      }
    } catch {
      showToast("Error loading projects from disk!", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const showToast = (message, type = "success") => {
    setStatusMessage({ message, type });
    setTimeout(() => setStatusMessage(null), 3500);
  };

  // 2. Filtered Projects (Optimized Memo)
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchSearch =
        p.title?.toLowerCase().includes(search.toLowerCase()) ||
        p.category?.toLowerCase().includes(search.toLowerCase()) ||
        p.stack?.some((t) => t.toLowerCase().includes(search.toLowerCase()));

      const matchType = selectedType === "all" || p.type === selectedType;
      return matchSearch && matchType;
    });
  }, [projects, search, selectedType]);

  // 3. Slug Generator Helper
  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  // 4. Modal Open Handlers
  const handleOpenAdd = () => {
    setFormData({
      ...INITIAL_PROJECT_FORM,
      order: 1, // Default top rank
    });
    setTagInput("");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project) => {
    setFormData({
      ...project,
      features: project.features?.length ? project.features : [""],
      stack: project.stack || [],
      images: project.images || [],
    });
    setTagInput("");
    setIsModalOpen(true);
  };

  // 5. Tech Stack Chip Management
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

  // 6. Dynamic Features Bullets
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

  // 7. Image Upload Handler (Disk public folder upload)
  const handleFileUpload = async (e, fieldName) => {
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
          if (fieldName === "image") {
            setFormData((prev) => ({ ...prev, image: json.url }));
          } else if (fieldName === "images") {
            setFormData((prev) => ({
              ...prev,
              images: [...prev.images, json.url],
            }));
          }
          showToast(`Image saved to ${json.url}`);
        } else {
          showToast("Image upload failed", "error");
        }
      } catch {
        showToast("Error uploading file", "error");
      }
    };
    reader.readAsDataURL(file);
  };

  // 8. Save Project (Create or Update)
  const handleSaveProject = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      showToast("Title is required!", "error");
      return;
    }

    setSaving(true);
    try {
      const cleanSlug = formData.slug || generateSlug(formData.title);
      const cleanFeatures = formData.features.filter(
        (f) => f.trim().length > 0,
      );

      let updatedList = [...projects];

      if (formData.id) {
        // Edit Mode
        const targetOrder = Math.max(
          1,
          Math.min(projects.length, Number(formData.order) || 1),
        );
        const existingIdx = updatedList.findIndex((p) => p.id === formData.id);

        if (existingIdx !== -1) {
          const updatedItem = {
            ...formData,
            slug: cleanSlug,
            features: cleanFeatures,
          };
          // Remove old position
          updatedList.splice(existingIdx, 1);
          // Insert at new target order
          updatedList.splice(targetOrder - 1, 0, updatedItem);
        }
      } else {
        // Add Mode
        const newId =
          projects.length > 0
            ? Math.max(...projects.map((p) => p.id || 0)) + 1
            : 1;
        const targetOrder = Math.max(
          1,
          Math.min(projects.length + 1, Number(formData.order) || 1),
        );

        const newItem = {
          ...formData,
          id: newId,
          slug: cleanSlug,
          features: cleanFeatures,
        };

        // Insert at target position
        updatedList.splice(targetOrder - 1, 0, newItem);
      }

      // Reassign clean 1-based order
      const normalized = updatedList.map((item, index) => ({
        ...item,
        order: index + 1,
      }));

      // Write directly to disk
      const res = await fetch("/api/admin/data/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: normalized }),
      });

      const json = await res.json();
      if (json.success) {
        setProjects(normalized);
        setIsModalOpen(false);
        showToast(
          formData.id
            ? "Project updated successfully!"
            : "New project added to disk!",
        );
      } else {
        showToast("Failed to save changes", "error");
      }
    } catch {
      showToast("Error updating project data", "error");
    } finally {
      setSaving(false);
    }
  };

  // 9. Position Reorder (Move Up / Down / Jump to Rank)
  const handleMovePosition = async (project, direction) => {
    const currentIndex = projects.findIndex((p) => p.id === project.id);
    if (currentIndex === -1) return;

    const targetIndex =
      direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= projects.length) return;

    setReorderLoadingId(project.id);
    const updated = [...projects];
    const [movedItem] = updated.splice(currentIndex, 1);
    updated.splice(targetIndex, 0, movedItem);

    try {
      const res = await fetch("/api/admin/reorder/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reorderedList: updated }),
      });
      const json = await res.json();
      if (json.success) {
        setProjects(updated.map((p, idx) => ({ ...p, order: idx + 1 })));
        showToast(`Moved to Rank #${targetIndex + 1}`);
      }
    } catch {
      showToast("Reorder failed", "error");
    } finally {
      setReorderLoadingId(null);
    }
  };

  const handleSetExactRank = async (project, newRank) => {
    const targetRank = parseInt(newRank, 10);
    if (isNaN(targetRank) || targetRank < 1 || targetRank > projects.length)
      return;

    const currentIndex = projects.findIndex((p) => p.id === project.id);
    if (currentIndex === -1 || currentIndex === targetRank - 1) return;

    setReorderLoadingId(project.id);
    const updated = [...projects];
    const [movedItem] = updated.splice(currentIndex, 1);
    updated.splice(targetRank - 1, 0, movedItem);

    try {
      const res = await fetch("/api/admin/reorder/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reorderedList: updated }),
      });
      const json = await res.json();
      if (json.success) {
        setProjects(updated.map((p, idx) => ({ ...p, order: idx + 1 })));
        showToast(`Project moved to Position #${targetRank}`);
      }
    } catch {
      showToast("Position update failed", "error");
    } finally {
      setReorderLoadingId(null);
    }
  };

  // 10. Delete Project with Confirmation
  const handleDelete = async (project) => {
    if (
      !window.confirm(
        `Are you sure you want to delete "${project.title}" from disk?`,
      )
    ) {
      return;
    }

    try {
      const updated = projects
        .filter((p) => p.id !== project.id)
        .map((p, idx) => ({ ...p, order: idx + 1 }));

      const res = await fetch("/api/admin/data/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: updated }),
      });

      const json = await res.json();
      if (json.success) {
        setProjects(updated);
        showToast("Project deleted from disk!", "error");
      }
    } catch {
      showToast("Delete operation failed", "error");
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {statusMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl shadow-2xl font-bold text-xs flex items-center gap-2 transition-all duration-300 ${
            statusMessage.type === "error"
              ? "bg-rose-500 text-white"
              : "bg-emerald-500 text-white"
          }`}
        >
          <FiCheck className="w-4 h-4" />
          <span>{statusMessage.message}</span>
        </div>
      )}

      {/* Control Bar: Search, Filters & Add CTA */}
      <div className="bg-[#120c2e]/90 border border-[#26194d] rounded-2xl p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by title, category, stack..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#0c0820] border border-[#26194d] rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 bg-[#0c0820] border border-[#26194d] rounded-xl text-xs font-bold text-[#beafdc] focus:outline-none focus:border-indigo-500 capitalize cursor-pointer"
          >
            <option value="all">All Types ({projects.length})</option>
            <option value="company">Company</option>
            <option value="web">Web</option>
            <option value="mobile">Mobile</option>
          </select>
        </div>

        {/* Add Project Button */}
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold text-xs rounded-xl shadow-lg hover:shadow-indigo-500/25 active:scale-95 transition-all cursor-pointer"
        >
          <FiPlus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Projects List / Table */}
      {loading ? (
        <div className="py-20 text-center text-slate-400 text-sm font-semibold">
          Loading 51 projects from{" "}
          <code className="text-indigo-400">projects.json</code>...
        </div>
      ) : (
        <div className="bg-[#120c2e]/90 border border-[#26194d] rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#18103d] text-slate-300 font-extrabold uppercase tracking-wider text-[10px] border-b border-[#26194d]">
                <tr>
                  <th className="py-3.5 px-4 w-28 text-center">Rank #</th>
                  <th className="py-3.5 px-4">Project</th>
                  <th className="py-3.5 px-4">Type / Category</th>
                  <th className="py-3.5 px-4">Tech Stack</th>
                  <th className="py-3.5 px-4">Links</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#26194d]/60">
                {filteredProjects.map((project, idx) => (
                  <tr
                    key={project.id || idx}
                    className="hover:bg-[#181140]/60 transition-colors group"
                  >
                    {/* Rank & Reorder Index Controls */}
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <select
                          value={project.order || idx + 1}
                          onChange={(e) =>
                            handleSetExactRank(project, e.target.value)
                          }
                          disabled={reorderLoadingId === project.id}
                          className="px-1.5 py-1 bg-[#0b0819] border border-[#2d1e5a] rounded-lg text-[11px] font-black text-indigo-300 text-center cursor-pointer hover:border-indigo-500 focus:outline-none"
                          title="Change Position Rank"
                        >
                          {projects.map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                              #{i + 1}
                            </option>
                          ))}
                        </select>

                        <div className="flex flex-col gap-0.5">
                          <button
                            onClick={() => handleMovePosition(project, "up")}
                            disabled={
                              project.order === 1 ||
                              reorderLoadingId === project.id
                            }
                            className="p-1 text-slate-400 hover:text-white disabled:opacity-20 cursor-pointer"
                            title="Move Up"
                          >
                            <FiArrowUp className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleMovePosition(project, "down")}
                            disabled={
                              project.order === projects.length ||
                              reorderLoadingId === project.id
                            }
                            className="p-1 text-slate-400 hover:text-white disabled:opacity-20 cursor-pointer"
                            title="Move Down"
                          >
                            <FiArrowDown className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </td>

                    {/* Thumbnail & Title */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-9 rounded-lg bg-slate-900 border border-[#2d1e5a] overflow-hidden shrink-0 flex items-center justify-center">
                          {project.image ? (
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.style.display = "none";
                              }}
                            />
                          ) : (
                            <FiLayers className="text-slate-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-white tracking-tight line-clamp-1 max-w-[280px]">
                            {project.title}
                          </p>
                          <span className="text-[10px] text-slate-500 font-mono">
                            /{project.slug}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Type & Category */}
                    <td className="py-3 px-4">
                      <div className="space-y-1">
                        <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                          {project.type || "web"}
                        </span>
                        <p className="text-[11px] text-[#beafdc] font-medium">
                          {project.category}
                        </p>
                      </div>
                    </td>

                    {/* Tech Stack Pills */}
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1 max-w-[220px]">
                        {project.stack?.slice(0, 3).map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-[#1a1240] text-slate-300 border border-[#2d1e5a]"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.stack?.length > 3 && (
                          <span className="text-[10px] text-slate-500">
                            +{project.stack.length - 3}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Links */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 text-slate-400 hover:text-white bg-[#0e0a24] rounded-lg border border-[#2d1e5a]"
                            title="Live URL"
                          >
                            <FiExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 text-slate-400 hover:text-white bg-[#0e0a24] rounded-lg border border-[#2d1e5a]"
                            title="GitHub URL"
                          >
                            <FiGithub className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(project)}
                          className="p-2 text-indigo-400 hover:text-white hover:bg-indigo-600/20 rounded-lg transition-colors cursor-pointer"
                          title="Edit Project"
                        >
                          <FiEdit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(project)}
                          className="p-2 text-rose-400 hover:text-white hover:bg-rose-600/20 rounded-lg transition-colors cursor-pointer"
                          title="Delete Project"
                        >
                          <FiTrash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Project Modal Drawer */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#140e34] border border-[#2d1e5a] rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl relative my-auto">
            {/* Modal Header */}
            <div className="p-6 border-b border-[#26194d] flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black text-white">
                  {formData.id ? "Edit Project" : "Add New Project"}
                </h2>
                <p className="text-xs text-[#beafdc]">
                  Saves directly to{" "}
                  <code className="text-indigo-400">
                    src/data/json/projects.json
                  </code>
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-[#1e154a]"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form
              onSubmit={handleSaveProject}
              className="p-6 space-y-5 overflow-y-auto flex-1"
            >
              {/* Row 1: Title & Rank Position */}
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
                    max={projects.length + 1}
                    value={formData.order}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        order: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2.5 bg-[#0b0819] border border-[#2d1e5a] rounded-xl text-xs text-white text-center font-bold focus:outline-none focus:border-indigo-500"
                    title="Choose position (1 is top of the list)"
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
                  <label className="text-xs font-bold text-slate-300">
                    Type
                  </label>
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
                      setFormData((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                    placeholder="Full Stack, QA / Automation, etc."
                    className="w-full px-4 py-2 bg-[#0b0819] border border-[#2d1e5a] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Tech Stack Chip Input */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300">
                  Tech Stack (Type and press Enter or Comma)
                </label>
                <div className="p-2.5 bg-[#0b0819] border border-[#2d1e5a] rounded-xl flex flex-wrap items-center gap-1.5 min-h-[46px]">
                  {formData.stack.map((tag, idx) => (
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
                    placeholder="Add tech (e.g. React 19, Docker)..."
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
                  placeholder="Detailed overview of what this application does..."
                  className="w-full px-4 py-2.5 bg-[#0b0819] border border-[#2d1e5a] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 leading-relaxed"
                />
              </div>

              {/* Key Features Dynamic List */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-300">
                    Key Features / Bullets
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
                  {formData.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={feat}
                        onChange={(e) =>
                          handleFeatureChange(fIdx, e.target.value)
                        }
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
                      setFormData((prev) => ({
                        ...prev,
                        github: e.target.value,
                      }))
                    }
                    placeholder="https://github.com/..."
                    className="w-full px-4 py-2 bg-[#0b0819] border border-[#2d1e5a] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Thumbnail Image with Direct Upload */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-300">
                  Main Thumbnail Image
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        image: e.target.value,
                      }))
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
                      onChange={(e) => handleFileUpload(e, "image")}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-[#26194d] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
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
      )}
    </div>
  );
};

export default ProjectsManager;
