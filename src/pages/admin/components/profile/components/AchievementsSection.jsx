import React from "react";
import { FiPlus, FiX, FiAward } from "react-icons/fi";

const AchievementsSection = ({ achievements = [], onChange }) => {
  const handleItemChange = (index, field, value) => {
    const updated = [...achievements];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    onChange(updated);
  };

  const handleAddAchievement = () => {
    const newId =
      achievements.length > 0
        ? Math.max(...achievements.map((a) => a.id || 0)) + 1
        : 1;

    onChange([
      ...achievements,
      {
        id: newId,
        title: "",
        description: "",
      },
    ]);
  };

  const handleRemoveAchievement = (index) => {
    onChange(achievements.filter((_, idx) => idx !== index));
  };

  return (
    <div className="bg-[#120c2e]/90 border border-[#26194d] rounded-2xl p-6 space-y-6 shadow-xl">
      <div className="flex items-center justify-between pb-3 border-b border-[#26194d]">
        <div className="flex items-center gap-2">
          <FiAward className="text-amber-400 w-4 h-4" />
          <h3 className="font-extrabold text-white text-sm">
            Achievements Cards
          </h3>
        </div>
        <button
          type="button"
          onClick={handleAddAchievement}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1a1240] text-indigo-300 hover:text-white rounded-xl text-xs font-bold border border-[#2d1e5a] hover:border-indigo-500 transition-all cursor-pointer"
        >
          <FiPlus className="w-3.5 h-3.5" />
          <span>Add Card</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map((item, idx) => (
          <div
            key={item.id || idx}
            className="p-4 bg-[#0b0819] border border-[#2d1e5a] rounded-2xl space-y-3 relative group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20 font-mono">
                Card #{idx + 1}
              </span>
              <button
                type="button"
                onClick={() => handleRemoveAchievement(idx)}
                className="text-slate-500 hover:text-rose-400 p-1"
                title="Remove Card"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-200">
                Card Title
              </label>
              <input
                type="text"
                value={item.title || ""}
                onChange={(e) => handleItemChange(idx, "title", e.target.value)}
                placeholder="e.g. 50+ Personal Projects Built"
                className="w-full px-3 py-2 bg-[#120c2e] border border-[#2d1e5a] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 font-semibold"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-200">
                Description
              </label>
              <textarea
                rows="2"
                value={item.description || ""}
                onChange={(e) =>
                  handleItemChange(idx, "description", e.target.value)
                }
                placeholder="Brief description of the milestone..."
                className="w-full px-3 py-2 bg-[#120c2e] border border-[#2d1e5a] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        ))}

        {achievements.length === 0 && (
          <div className="md:col-span-2 p-6 border border-dashed border-[#2d1e5a] rounded-xl text-center text-xs text-slate-500">
            No achievement cards yet. Click "+ Add Card" above to create one.
          </div>
        )}
      </div>
    </div>
  );
};

export default AchievementsSection;
