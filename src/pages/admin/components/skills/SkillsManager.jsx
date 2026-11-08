import React, { useState, useEffect } from "react";
import { FiPlus, FiCheck, FiCpu } from "react-icons/fi";
import SkillCategoryCard from "./components/SkillCategoryCard";
import AddCategoryModal from "./components/AddCategoryModal";

const SkillsManager = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  // 1. Fetch from Disk API
  const fetchSkills = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/data/skills");
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        setCategories(json.data);
      }
    } catch {
      showToast("Error loading skills from disk!", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const showToast = (message, type = "success") => {
    setStatusMessage({ message, type });
    setTimeout(() => setStatusMessage(null), 3000);
  };

  // 2. Save Updated Array to Disk
  const saveToDisk = async (
    updatedList,
    successText = "Skills updated on disk!",
  ) => {
    setCategories(updatedList);
    try {
      const res = await fetch("/api/admin/data/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: updatedList }),
      });
      const json = await res.json();
      if (json.success) {
        showToast(successText);
      }
    } catch {
      showToast("Failed to write to skills.json", "error");
    }
  };

  // 3. Category Operations
  const handleUpdateCategory = (index, updatedCat) => {
    const updated = [...categories];
    updated[index] = updatedCat;
    saveToDisk(updated, "Category updated!");
  };

  const handleDeleteCategory = (index) => {
    const catName = categories[index]?.category;
    if (
      !window.confirm(`Delete entire category "${catName}" and all its skills?`)
    ) {
      return;
    }
    const updated = categories.filter((_, idx) => idx !== index);
    saveToDisk(updated, `Category "${catName}" deleted!`);
  };

  const handleMoveCategory = (index, direction) => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= categories.length) return;

    const updated = [...categories];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);
    saveToDisk(updated, "Categories reordered!");
  };

  const handleAddCategory = (newCat) => {
    const updated = [...categories, newCat];
    saveToDisk(updated, `Category "${newCat.category}" created!`);
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

      {/* Control Bar */}
      <div className="bg-[#120c2e]/90 border border-[#26194d] rounded-2xl p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold">
            <FiCpu className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-white">
              Skills & Technical Stack
            </h2>
            <p className="text-[11px] text-slate-400 font-medium">
              Manage categories and tags synced with{" "}
              <code className="text-indigo-400">src/data/json/skills.json</code>
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold text-xs rounded-xl shadow-lg hover:shadow-indigo-500/25 active:scale-95 transition-all cursor-pointer"
        >
          <FiPlus className="w-4 h-4" />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Categories Bento Grid */}
      {loading ? (
        <div className="py-20 text-center text-slate-400 text-sm font-semibold">
          Loading skills from{" "}
          <code className="text-indigo-400">skills.json</code>...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat, idx) => (
            <SkillCategoryCard
              key={idx}
              categoryData={cat}
              index={idx}
              totalCount={categories.length}
              onUpdateCategory={handleUpdateCategory}
              onDeleteCategory={handleDeleteCategory}
              onMoveCategory={handleMoveCategory}
            />
          ))}
        </div>
      )}

      {/* Add Category Modal */}
      <AddCategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddCategory={handleAddCategory}
      />
    </div>
  );
};

export default SkillsManager;
