import React, { useState } from "react";
import { FiX, FiPlus } from "react-icons/fi";

const AddCategoryModal = ({ isOpen, onClose, onAddCategory }) => {
  const [categoryName, setCategoryName] = useState("");
  const [initialSkills, setInitialSkills] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!categoryName.trim()) return;

    const items = initialSkills
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    onAddCategory({
      category: categoryName.trim(),
      items: items,
    });

    setCategoryName("");
    setInitialSkills("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#140e34] border border-[#2d1e5a] rounded-3xl w-full max-w-md p-6 shadow-2xl relative">
        <div className="flex items-center justify-between pb-4 border-b border-[#26194d]">
          <h2 className="text-base font-black text-white">
            Add New Skill Category
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-[#1e154a]"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-200">
              Category Name <span className="text-rose-400">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Cloud & DevOps or AI / ML"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#0b0819] border border-[#2d1e5a] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
              autoFocus
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-200">
              Initial Skills{" "}
              <span className="text-slate-500 font-normal">
                (Comma separated)
              </span>
            </label>
            <input
              type="text"
              placeholder="e.g. AWS, Docker, Kubernetes"
              value={initialSkills}
              onChange={(e) => setInitialSkills(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#0b0819] border border-[#2d1e5a] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="pt-3 border-t border-[#26194d] flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-[#1a1240]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold text-xs rounded-xl shadow-lg hover:shadow-indigo-500/25 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <FiPlus className="w-3.5 h-3.5" />
              <span>Create Category</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal;
