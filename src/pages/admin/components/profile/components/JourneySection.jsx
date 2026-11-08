import React from "react";
import { FiPlus, FiX, FiCompass } from "react-icons/fi";

const JourneySection = ({ journey = [], onChange }) => {
  const handleMilestoneChange = (index, field, value) => {
    const updated = [...journey];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    onChange(updated);
  };

  const handleAddMilestone = () => {
    const nextPhaseNum = (journey.length + 1).toString().padStart(2, "0");
    onChange([
      ...journey,
      {
        phase: nextPhaseNum,
        year: "",
        title: "",
        description: "",
      },
    ]);
  };

  const handleRemoveMilestone = (index) => {
    onChange(journey.filter((_, idx) => idx !== index));
  };

  return (
    <div className="bg-[#120c2e]/90 border border-[#26194d] rounded-2xl p-6 space-y-6 shadow-xl">
      <div className="flex items-center justify-between pb-3 border-b border-[#26194d]">
        <div className="flex items-center gap-2">
          <FiCompass className="text-indigo-400 w-4 h-4" />
          <h3 className="font-extrabold text-white text-sm">
            Learning Journey Milestones
          </h3>
        </div>
        <button
          type="button"
          onClick={handleAddMilestone}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1a1240] text-indigo-300 hover:text-white rounded-xl text-xs font-bold border border-[#2d1e5a] hover:border-indigo-500 transition-all cursor-pointer"
        >
          <FiPlus className="w-3.5 h-3.5" />
          <span>Add Milestone</span>
        </button>
      </div>

      <div className="space-y-4">
        {journey.map((item, idx) => (
          <div
            key={idx}
            className="p-5 bg-[#0b0819] border border-[#2d1e5a] rounded-2xl space-y-3 relative group"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#26194d]/60">
              <span className="text-xs font-black text-indigo-400 font-mono tracking-wider">
                Phase {item.phase || `0${idx + 1}`}
              </span>
              <button
                type="button"
                onClick={() => handleRemoveMilestone(idx)}
                className="text-slate-500 hover:text-rose-400 p-1"
                title="Remove Milestone"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-200">
                  Phase Code
                </label>
                <input
                  type="text"
                  value={item.phase || ""}
                  onChange={(e) =>
                    handleMilestoneChange(idx, "phase", e.target.value)
                  }
                  placeholder="01, 02, etc."
                  className="w-full px-3 py-2 bg-[#120c2e] border border-[#2d1e5a] rounded-xl text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-200">
                  Year / Timeline
                </label>
                <input
                  type="text"
                  value={item.year || ""}
                  onChange={(e) =>
                    handleMilestoneChange(idx, "year", e.target.value)
                  }
                  placeholder="e.g. 2024 - 2025"
                  className="w-full px-3 py-2 bg-[#120c2e] border border-[#2d1e5a] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-200">
                  Milestone Title
                </label>
                <input
                  type="text"
                  value={item.title || ""}
                  onChange={(e) =>
                    handleMilestoneChange(idx, "title", e.target.value)
                  }
                  placeholder="e.g. Softleed Turning Point"
                  className="w-full px-3 py-2 bg-[#120c2e] border border-[#2d1e5a] rounded-xl text-xs text-white font-bold focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-200">
                Milestone Narrative
              </label>
              <textarea
                rows="2"
                value={item.description || ""}
                onChange={(e) =>
                  handleMilestoneChange(idx, "description", e.target.value)
                }
                placeholder="What did you learn or accomplish during this phase?..."
                className="w-full px-3 py-2 bg-[#120c2e] border border-[#2d1e5a] rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 leading-relaxed"
              />
            </div>
          </div>
        ))}

        {journey.length === 0 && (
          <div className="p-6 border border-dashed border-[#2d1e5a] rounded-xl text-center text-xs text-slate-500">
            No milestones added. Click "+ Add Milestone" to add your career
            phases.
          </div>
        )}
      </div>
    </div>
  );
};

export default JourneySection;
