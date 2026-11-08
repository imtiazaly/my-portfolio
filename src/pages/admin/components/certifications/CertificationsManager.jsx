import React, { useState, useEffect, useMemo } from "react";
import { FiCheck } from "react-icons/fi";
import CertificationsToolbar from "./components/CertificationsToolbar";
import CertificationsTable from "./components/CertificationsTable";
import CertificationsForm from "./components/CertificationsForm";

const INITIAL_CERT_FORM = {
  id: null,
  title: "",
  issuer: "",
  issueDate: "",
  credentialId: "",
  credentialUrl: "",
  skills: [],
  image: "",
  order: 1,
};

const CertificationsManager = () => {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(INITIAL_CERT_FORM);
  const [statusMessage, setStatusMessage] = useState(null);
  const [saving, setSaving] = useState(false);
  const [reorderLoadingId, setReorderLoadingId] = useState(null);

  // 1. Fetch from Disk API
  const fetchCertifications = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/data/certifications");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        const sorted = [...json.data].sort(
          (a, b) => (a.order || 0) - (b.order || 0),
        );
        setCertifications(sorted);
      }
    } catch {
      showToast("Error loading certifications!", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertifications();
  }, []);

  const showToast = (message, type = "success") => {
    setStatusMessage({ message, type });
    setTimeout(() => setStatusMessage(null), 3500);
  };

  // 2. Memoized Filter
  const filteredCertifications = useMemo(() => {
    return certifications.filter((item) => {
      const q = search.toLowerCase();
      return (
        item.title?.toLowerCase().includes(q) ||
        item.issuer?.toLowerCase().includes(q) ||
        item.skills?.some((s) => s.toLowerCase().includes(q))
      );
    });
  }, [certifications, search]);

  // 3. Modal Triggers
  const handleOpenAdd = () => {
    setFormData({
      ...INITIAL_CERT_FORM,
      order: 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setFormData({
      ...item,
      skills: Array.isArray(item.skills) ? [...item.skills] : [],
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData(INITIAL_CERT_FORM);
  };

  // 4. Save Certification (Create / Update)
  const handleSaveCertification = async (e, submittedData) => {
    if (e) e.preventDefault();
    const currentData = submittedData || formData;

    if (!currentData.title?.trim() || !currentData.issuer?.trim()) {
      showToast("Title and Issuer are required!", "error");
      return;
    }

    setSaving(true);
    try {
      const cleanSkills = (currentData.skills || []).filter(
        (s) => s && s.trim().length > 0,
      );
      let updatedList = [...certifications];

      if (currentData.id) {
        // Edit Mode
        const targetOrder = Math.max(
          1,
          Math.min(certifications.length, Number(currentData.order) || 1),
        );
        const existingIdx = updatedList.findIndex(
          (c) => c.id === currentData.id,
        );

        if (existingIdx !== -1) {
          const updatedItem = { ...currentData, skills: cleanSkills };
          updatedList.splice(existingIdx, 1);
          updatedList.splice(targetOrder - 1, 0, updatedItem);
        }
      } else {
        // Add Mode
        const newId =
          certifications.length > 0
            ? Math.max(...certifications.map((c) => c.id || 0)) + 1
            : 1;
        const targetOrder = Math.max(
          1,
          Math.min(certifications.length + 1, Number(currentData.order) || 1),
        );

        const newItem = {
          ...currentData,
          id: newId,
          skills: cleanSkills,
        };
        updatedList.splice(targetOrder - 1, 0, newItem);
      }

      // Reassign clean 1-based order
      const normalized = updatedList.map((item, index) => ({
        ...item,
        order: index + 1,
      }));

      const res = await fetch("/api/admin/data/certifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: normalized }),
      });

      const json = await res.json();
      if (json.success) {
        setCertifications(normalized);
        handleCloseModal();
        showToast(
          currentData.id
            ? "Certification updated!"
            : "New certification added to disk!",
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
    const currentIndex = certifications.findIndex((c) => c.id === item.id);
    if (currentIndex === -1) return;

    const targetIndex =
      direction === "up" ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= certifications.length) return;

    setReorderLoadingId(item.id);
    const updated = [...certifications];
    const [movedItem] = updated.splice(currentIndex, 1);
    updated.splice(targetIndex, 0, movedItem);

    try {
      const res = await fetch("/api/admin/reorder/certifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reorderedList: updated }),
      });
      const json = await res.json();
      if (json.success) {
        setCertifications(updated.map((c, idx) => ({ ...c, order: idx + 1 })));
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
    if (
      isNaN(targetRank) ||
      targetRank < 1 ||
      targetRank > certifications.length
    )
      return;

    const currentIndex = certifications.findIndex((c) => c.id === item.id);
    if (currentIndex === -1 || currentIndex === targetRank - 1) return;

    setReorderLoadingId(item.id);
    const updated = [...certifications];
    const [movedItem] = updated.splice(currentIndex, 1);
    updated.splice(targetRank - 1, 0, movedItem);

    try {
      const res = await fetch("/api/admin/reorder/certifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reorderedList: updated }),
      });
      const json = await res.json();
      if (json.success) {
        setCertifications(updated.map((c, idx) => ({ ...c, order: idx + 1 })));
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
        `Are you sure you want to delete "${item.title}" from disk?`,
      )
    ) {
      return;
    }

    try {
      const updated = certifications
        .filter((c) => c.id !== item.id)
        .map((c, idx) => ({ ...c, order: idx + 1 }));

      const res = await fetch("/api/admin/data/certifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: updated }),
      });

      const json = await res.json();
      if (json.success) {
        setCertifications(updated);
        showToast("Certification deleted from disk!", "error");
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
      <CertificationsToolbar
        search={search}
        onSearchChange={setSearch}
        totalCount={certifications.length}
        onOpenAdd={handleOpenAdd}
      />

      {/* 2. Table */}
      <CertificationsTable
        certifications={filteredCertifications}
        allCount={certifications.length}
        loading={loading}
        reorderLoadingId={reorderLoadingId}
        onMovePosition={handleMovePosition}
        onSetExactRank={handleSetExactRank}
        onOpenEdit={handleOpenEdit}
        onDelete={handleDelete}
      />

      {/* 3. Add/Edit Modal */}
      <CertificationsForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSaveCertification}
        saving={saving}
        allCount={certifications.length}
        onShowToast={showToast}
      />
    </div>
  );
};

export default CertificationsManager;
