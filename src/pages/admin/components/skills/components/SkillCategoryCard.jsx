import React, { useState } from "react";
import {
  FiArrowUp,
  FiArrowDown,
  FiTrash2,
  FiEdit2,
  FiCheck,
  FiX,
  FiPlus,
} from "react-icons/fi";

const SkillCategoryCard = ({
  categoryData,
  index,
  totalCount,
  onUpdateCategory,
  onDeleteCategory,
  onMoveCategory,
}) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleInput, setTitleInput] = useState(categoryData.category);
  const [newSkillInput, setNewSkillInput] = useState("");

  // Rename Category Title
  const handleSaveTitle = () => {
    if (titleInput.trim()) {
      onUpdateCategory(index, {
        ...categoryData,
        category: titleInput.trim(),
      });
      setIsEditingTitle(false);
    }
  };

  // Add Skill Item
  const handleAddSkill = (e) => {
    if (e.key === "Enter" && newSkillInput.trim()) {
      e.preventDefault();
      const clean = newSkillInput.trim().replace(/^,|,$/g, "");
      if (clean && !categoryData.items?.includes(clean)) {
        onUpdateCategory(index, {
          ...categoryData,
          items: [...(categoryData.items || []), clean],
        });
      }
      setNewSkillInput("");
    }
  };

  // Remove Skill Item
  const handleRemoveSkill = (skillToRemove) => {
    onUpdateCategory(index, {
      ...categoryData,
      items: (categoryData.items || []).filter((s) => s !== skillToRemove),
    });
  };

  return (
    <div className="bg-[#120c2e]/90 border border-[#26194d] rounded-2xl p-5 flex flex-col justify-between shadow-xl hover:border-indigo-500/40 transition-all group">
      {/* Card Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#26194d] gap-2">
        {isEditingTitle ? (
          <div className="flex items-center gap-1.5 flex-1">
            <input
              type="text"
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSaveTitle()}
              className="px-2.5 py-1 bg-[#0b0819] border border-indigo-500 rounded-lg text-xs font-bold text-white flex-1 focus:outline-none"
              autoFocus
            />
            <button
              onClick={handleSaveTitle}
              className="p-1.5 text-emerald-400 hover:text-white bg-emerald-500/20 rounded-lg"
              title="Save Name"
            >
              <FiCheck className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => {
                setTitleInput(categoryData.category);
                setIsEditingTitle(false);
              }}
              className="p-1.5 text-slate-400 hover:text-white"
            >
              <FiX className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <h3 className="font-extrabold text-white text-sm tracking-tight capitalize">
              {categoryData.category}
            </h3>
            <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
              {categoryData.items?.length || 0}
            </span>
            <button
              onClick={() => setIsEditingTitle(true)}
              className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-indigo-400 transition-opacity"
              title="Rename Category"
            >
              <FiEdit2 className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Reorder and Delete Controls */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => onMoveCategory(index, "up")}
            disabled={index === 0}
            className="p-1 text-slate-400 hover:text-white disabled:opacity-20 cursor-pointer"
            title="Move Up"
          >
            <FiArrowUp className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onMoveCategory(index, "down")}
            disabled={index === totalCount - 1}
            className="p-1 text-slate-400 hover:text-white disabled:opacity-20 cursor-pointer"
            title="Move Down"
          >
            <FiArrowDown className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onDeleteCategory(index)}
            className="p-1 text-rose-400/80 hover:text-rose-400 cursor-pointer ml-1"
            title="Delete Category"
          >
            <FiTrash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Skill Tags List */}
      <div className="py-4 flex flex-wrap gap-1.5 min-h-[90px] content-start">
        {categoryData.items?.map((skill, sIdx) => (
          <span
            key={sIdx}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-semibold bg-[#1a1240] text-indigo-200 border border-[#2d1e5a] shadow-sm hover:border-indigo-500 transition-all"
          >
            <span>{skill}</span>
            <button
              type="button"
              onClick={() => handleRemoveSkill(skill)}
              className="text-slate-400 hover:text-rose-400 font-bold ml-0.5"
              title="Delete Skill"
            >
              ×
            </button>
          </span>
        ))}

        {(!categoryData.items || categoryData.items.length === 0) && (
          <p className="text-xs text-slate-500 italic py-2">
            No skills in this category yet.
          </p>
        )}
      </div>

      {/* Inline Quick Add Input */}
      <div className="pt-2 border-t border-[#26194d]/60">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Type skill & press Enter (e.g. Next.js)..."
            value={newSkillInput}
            onChange={(e) => setNewSkillInput(e.target.value)}
            onKeyDown={handleAddSkill}
            className="w-full pl-3 pr-8 py-2 bg-[#0b0819] border border-[#26194d] rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <button
            type="button"
            onClick={() => {
              if (newSkillInput.trim()) {
                onUpdateCategory(index, {
                  ...categoryData,
                  items: [...(categoryData.items || []), newSkillInput.trim()],
                });
                setNewSkillInput("");
              }
            }}
            className="absolute right-2 text-indigo-400 hover:text-white p-1"
            title="Add Skill"
          >
            <FiPlus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillCategoryCard;
