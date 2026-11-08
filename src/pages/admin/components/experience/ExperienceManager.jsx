import React, { useState, useEffect, useMemo } from "react";
import { FiCheck } from "react-icons/fi";
import ExperienceToolbar from "./components/ExperienceToolbar";
import ExperienceTable from "./components/ExperienceTable";
import ExperienceForm from "./components/ExperienceForm";

const INITIAL_EXP_FORM = {
  id: null,
  role: "",
  company: "",
  period: "",
  description: "",
  highlights: [""],
  order: 1,
};

const ExperienceManager = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(INITIAL_EXP_FORM);
  const [statusMessage, setStatusMessage] = useState(null);
  const [saving, setSaving] = useState(false);
  const [reorderLoadingId, setReorderLoadingId] = useState(null);

  // 1. Fetch from Disk API
  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/data/experience");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        const sorted = [...json.data].sort(
          (a, b) => (a.order || 0) - (b.order || 0),
        );
        setExperiences(sorted);
      }
    } catch {
      showToast("Error loading experiences!", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const showToast = (message, type = "success") => {
    setStatusMessage({ message, type });
    setTimeout(() => setStatusMessage(null), 3500);
  };

  // 2. Memoized Filter
  const filteredExperiences = useMemo(() => {
    return experiences.filter((item) => {
      const q = search.toLowerCase();
      return (
        item.role?.toLowerCase().includes(q) ||
        item.company?.toLowerCase().includes(q) ||
        item.description?.toLowerCase().includes(q)
      );
    });
  }, [experiences, search]);

  // 3. Modal Triggers
  const handleOpenAdd = () => {
    setFormData({
      ...INITIAL_EXP_FORM,
      order: 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setFormData({
      ...item,
      highlights: Array.isArray(item.highlights) ? [...item.highlights] : [""],
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData(INITIAL_EXP_FORM);
  };

  // 4. Save Experience (Create / Update)
  const handleSaveExperience = async (e, submittedData) => {
    if (e) e.preventDefault();
    const currentData = submittedData || formData;

    if (!currentData.role?.trim() || !currentData.company?.trim()) {
      showToast("Role and Company are required!", "error");
      return;
    }

    setSaving(true);
    try {
      const cleanHighlights = (currentData.highlights || []).filter(
        (h) => h && h.trim().length > 0,
      );
      let updatedList = [...experiences];

      if (currentData.id) {
        // Edit Mode
        const targetOrder = Math.max(
          1,
          Math.min(experiences.length, Number(currentData.order) || 1),
        );
        const existingIdx = updatedList.findIndex(
          (exp) => exp.id === currentData.id,
        );

        if (existingIdx !== -1) {
          const updatedItem = { ...currentData, highlights: cleanHighlights };
          updatedList.splice(existingIdx, 1);
          updatedList.splice(targetOrder - 1, 0, updatedItem);
        }
      } else {
        // Add Mode
        const newId =
          experiences.length > 0
            ? Math.max(...experiences.map((exp) => exp.id || 0)) + 1
            : 1;
        const targetOrder = Math.max(
          1,
          Math.min(experiences.length + 1, Number(currentData.order) || 1),
        );

        const newItem = {
          ...currentData,
          id: newId,
          highlights: cleanHighlights,
        };
        updatedList.splice(targetOrder - 1, 0, newItem);
      }

      // Reassign clean 1-based order
      const normalized = updatedList.map((item, index) => ({
        ...item,
        order: index + 1,
      }));

      const res = await fetch("/api/admin/data/experience", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: normalized }),
      });

      const json = await res.json();
      if (json.success) {
        setExperiences(normalized);
        handleCloseModal();
        showToast(
          currentData.id
            ? "Experience updated!"
            : "New experience added to disk!",
        );
      }
    } catch {
      showToast("Failed to save changes", "error");
    } finally {
      setSaving(false);
    }
  };

  // 5. Position Reorder (Move Up / Down / Jump to Rank)
  const handleMovePosition = async (item, direction) => {
    const currentIndex = experiences.findIndex((exp) => exp.id === item.id);
    if (currentIndex === -1) return;

    const targetIndex =
      direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= experiences.length) return;

    setReorderLoadingId(item.id);
    const updated = [...experiences];
    const [movedItem] = updated.splice(currentIndex, 1);
    updated.splice(targetIndex, 0, movedItem);

    try {
      const res = await fetch("/api/admin/reorder/experience", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reorderedList: updated }),
      });
      const json = await res.json();
      if (json.success) {
        setExperiences(updated.map((exp, idx) => ({ ...exp, order: idx + 1 })));
        showToast(`Moved to Rank #${targetIndex + 1}`);
      }
    } catch {
      showToast("Reorder failed", "error");
    } finally {
      setReorderLoadingId(null);
    }
  };

  const handleSetExactRank = async (item, newRank) => {
    const targetRank = parseInt(newRank, 10);
    if (isNaN(targetRank) || targetRank < 1 || targetRank > experiences.length)
      return;

    const currentIndex = experiences.findIndex((exp) => exp.id === item.id);
    if (currentIndex === -1 || currentIndex === targetRank - 1) return;

    setReorderLoadingId(item.id);
    const updated = [...experiences];
    const [movedItem] = updated.splice(currentIndex, 1);
    updated.splice(targetRank - 1, 0, movedItem);

    try {
      const res = await fetch("/api/admin/reorder/experience", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reorderedList: updated }),
      });
      const json = await res.json();
      if (json.success) {
        setExperiences(updated.map((exp, idx) => ({ ...exp, order: idx + 1 })));
        showToast(`Position updated to #${targetRank}`);
      }
    } catch {
      showToast("Position update failed", "error");
    } finally {
      setReorderLoadingId(null);
    }
  };

  // 6. Delete
  const handleDelete = async (item) => {
    if (
      !window.confirm(
        `Are you sure you want to delete "${item.role} at ${item.company}" from disk?`,
      )
    ) {
      return;
    }

    try {
      const updated = experiences
        .filter((exp) => exp.id !== item.id)
        .map((exp, idx) => ({ ...exp, order: idx + 1 }));

      const res = await fetch("/api/admin/data/experience", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: updated }),
      });

      const json = await res.json();
      if (json.success) {
        setExperiences(updated);
        showToast("Experience deleted from disk!", "error");
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
      <ExperienceToolbar
        search={search}
        onSearchChange={setSearch}
        totalCount={experiences.length}
        onOpenAdd={handleOpenAdd}
      />

      {/* 2. Table */}
      <ExperienceTable
        experiences={filteredExperiences}
        allCount={experiences.length}
        loading={loading}
        reorderLoadingId={reorderLoadingId}
        onMovePosition={handleMovePosition}
        onSetExactRank={handleSetExactRank}
        onOpenEdit={handleOpenEdit}
        onDelete={handleDelete}
      />

      {/* 3. Add/Edit Modal */}
      <ExperienceForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSaveExperience}
        saving={saving}
        allCount={experiences.length}
      />
    </div>
  );
};

export default ExperienceManager;
