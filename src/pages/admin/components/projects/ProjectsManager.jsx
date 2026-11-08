import React, { useState, useEffect, useMemo } from "react";
import { FiCheck } from "react-icons/fi";
import ProjectToolbar from "./components/ProjectToolbar";
import ProjectTable from "./components/ProjectTable";
import ProjectForm from "./components/ProjectForm";

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
  const [statusMessage, setStatusMessage] = useState(null);
  const [saving, setSaving] = useState(false);
  const [reorderLoadingId, setReorderLoadingId] = useState(null);

  // 1. Fetch from Disk API
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/data/projects");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
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

  // 2. Memoized Filtering
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

  // 3. Modal Triggers
  const handleOpenAdd = () => {
    setFormData({
      ...INITIAL_PROJECT_FORM,
      order: 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project) => {
    setFormData({
      ...project,
      features: project.features?.length ? project.features : [""],
      stack: project.stack || [],
      images: project.images || [],
    });
    setIsModalOpen(true);
  };

  // 4. Save Project (Create / Update)
  const handleSaveProject = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      showToast("Title is required!", "error");
      return;
    }

    setSaving(true);
    try {
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
          const updatedItem = { ...formData, features: cleanFeatures };
          updatedList.splice(existingIdx, 1);
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
          features: cleanFeatures,
        };
        updatedList.splice(targetOrder - 1, 0, newItem);
      }

      // Reassign clean 1-based order
      const normalized = updatedList.map((item, index) => ({
        ...item,
        order: index + 1,
      }));

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
      }
    } catch {
      showToast("Failed to save changes", "error");
    } finally {
      setSaving(false);
    }
  };

  // 5. Position Reorder (Move Up / Down / Jump to Rank)
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

  // 6. Delete
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

      {/* 1. Toolbar */}
      <ProjectToolbar
        search={search}
        onSearchChange={setSearch}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
        totalCount={projects.length}
        onOpenAdd={handleOpenAdd}
      />

      {/* 2. Table */}
      <ProjectTable
        projects={filteredProjects}
        allProjectsCount={projects.length}
        loading={loading}
        reorderLoadingId={reorderLoadingId}
        onMovePosition={handleMovePosition}
        onSetExactRank={handleSetExactRank}
        onOpenEdit={handleOpenEdit}
        onDelete={handleDelete}
      />

      {/* 3. Add/Edit Modal */}
      <ProjectForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSaveProject}
        saving={saving}
        allProjectsCount={projects.length}
        onShowToast={showToast}
      />
    </div>
  );
};

export default ProjectsManager;
