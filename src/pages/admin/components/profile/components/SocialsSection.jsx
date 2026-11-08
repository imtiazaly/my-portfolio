import React from "react";
import { FiPlus, FiX, FiShare2 } from "react-icons/fi";

const SocialsSection = ({ socialLinks = [], onChange }) => {
  const handleItemChange = (index, field, value) => {
    const updated = [...socialLinks];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    onChange(updated);
  };

  const handleAddSocial = () => {
    onChange([
      ...socialLinks,
      {
        name: "",
        url: "",
        icon: "external",
      },
    ]);
  };

  const handleRemoveSocial = (index) => {
    onChange(socialLinks.filter((_, idx) => idx !== index));
  };

  return (
    <div className="bg-[#120c2e]/90 border border-[#26194d] rounded-2xl p-6 space-y-6 shadow-xl">
      <div className="flex items-center justify-between pb-3 border-b border-[#26194d]">
        <div className="flex items-center gap-2">
          <FiShare2 className="text-pink-400 w-4 h-4" />
          <h3 className="font-extrabold text-white text-sm">
            Social Profiles & Contact Links
          </h3>
        </div>
        <button
          type="button"
          onClick={handleAddSocial}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1a1240] text-indigo-300 hover:text-white rounded-xl text-xs font-bold border border-[#2d1e5a] hover:border-indigo-500 transition-all cursor-pointer"
        >
          <FiPlus className="w-3.5 h-3.5" />
          <span>Add Social Link</span>
        </button>
      </div>

      <div className="space-y-3">
        {socialLinks.map((item, idx) => (
          <div
            key={idx}
            className="p-4 bg-[#0b0819] border border-[#2d1e5a] rounded-xl flex flex-col md:flex-row md:items-center gap-3"
          >
            {/* Platform Name */}
            <div className="w-full md:w-44 space-y-1">
              <label className="text-[11px] font-bold text-slate-400">
                Platform
              </label>
              <input
                type="text"
                value={item.name || ""}
                onChange={(e) => handleItemChange(idx, "name", e.target.value)}
                placeholder="e.g. GitHub, LinkedIn, Twitter"
                className="w-full px-3 py-2 bg-[#120c2e] border border-[#2d1e5a] rounded-lg text-xs text-white font-bold focus:outline-none focus:border-indigo-500 capitalize"
              />
            </div>

            {/* URL */}
            <div className="flex-1 space-y-1">
              <label className="text-[11px] font-bold text-slate-400">
                Profile / Contact URL
              </label>
              <input
                type="text"
                value={item.url || ""}
                onChange={(e) => handleItemChange(idx, "url", e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-2 bg-[#120c2e] border border-[#2d1e5a] rounded-lg text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Remove */}
            <div className="flex items-end justify-end md:self-end pt-1">
              <button
                type="button"
                onClick={() => handleRemoveSocial(idx)}
                className="p-2 text-rose-400 hover:text-white hover:bg-rose-600/20 rounded-lg transition-colors"
                title="Remove Link"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {socialLinks.length === 0 && (
          <div className="p-6 border border-dashed border-[#2d1e5a] rounded-xl text-center text-xs text-slate-500">
            No social links added yet. Click "+ Add Social Link" above.
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialsSection;
