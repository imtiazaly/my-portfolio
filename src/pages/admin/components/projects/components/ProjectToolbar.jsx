import React from "react";
import { FiSearch, FiPlus } from "react-icons/fi";

const ProjectToolbar = ({
  search,
  onSearchChange,
  selectedType,
  onTypeChange,
  totalCount,
  onOpenAdd,
}) => {
  return (
    <div className="bg-[#120c2e]/90 border border-[#26194d] rounded-2xl p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex flex-1 items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by title, category, stack..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#0c0820] border border-[#26194d] rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Type Filter */}
        <select
          value={selectedType}
          onChange={(e) => onTypeChange(e.target.value)}
          className="px-3 py-2 bg-[#0c0820] border border-[#26194d] rounded-xl text-xs font-bold text-[#beafdc] focus:outline-none focus:border-indigo-500 capitalize cursor-pointer"
        >
          <option value="all">All Types ({totalCount})</option>
          <option value="company">Company</option>
          <option value="web">Web</option>
          <option value="mobile">Mobile</option>
        </select>
      </div>

      {/* Add New CTA */}
      <button
        onClick={onOpenAdd}
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold text-xs rounded-xl shadow-lg hover:shadow-indigo-500/25 active:scale-95 transition-all cursor-pointer"
      >
        <FiPlus className="w-4 h-4" />
        <span>Add New Project</span>
      </button>
    </div>
  );
};

export default ProjectToolbar;
