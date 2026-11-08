import React from "react";
import {
  FiArrowUp,
  FiArrowDown,
  FiEdit2,
  FiTrash2,
  FiCalendar,
  FiCheckCircle,
} from "react-icons/fi";

const ExperienceTable = ({
  experiences,
  allCount,
  loading,
  reorderLoadingId,
  onMovePosition,
  onSetExactRank,
  onOpenEdit,
  onDelete,
}) => {
  if (loading) {
    return (
      <div className="py-20 text-center text-slate-400 text-sm font-semibold">
        Loading experiences from{" "}
        <code className="text-indigo-400">experience.json</code>...
      </div>
    );
  }

  return (
    <div className="bg-[#120c2e]/90 border border-[#26194d] rounded-2xl overflow-hidden shadow-xl">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#18103d] text-slate-300 font-extrabold uppercase tracking-wider text-[10px] border-b border-[#26194d]">
            <tr>
              <th className="py-3.5 px-4 w-28 text-center">Rank #</th>
              <th className="py-3.5 px-4">Role & Company</th>
              <th className="py-3.5 px-4">Timeline / Period</th>
              <th className="py-3.5 px-4">Description</th>
              <th className="py-3.5 px-4 text-center">Highlights</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#26194d]/60">
            {experiences.map((item, idx) => (
              <tr
                key={item.id || idx}
                className="hover:bg-[#181140]/60 transition-colors group"
              >
                {/* Rank Selector & Up/Down */}
                <td className="py-3 px-4 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <select
                      value={item.order || idx + 1}
                      onChange={(e) => onSetExactRank(item, e.target.value)}
                      disabled={reorderLoadingId === item.id}
                      className="px-1.5 py-1 bg-[#0b0819] border border-[#2d1e5a] rounded-lg text-[11px] font-black text-indigo-300 text-center cursor-pointer hover:border-indigo-500 focus:outline-none"
                      title="Set Position Rank"
                    >
                      {Array.from({ length: allCount }, (_, i) => i + 1).map(
                        (num) => (
                          <option key={num} value={num}>
                            #{num}
                          </option>
                        ),
                      )}
                    </select>

                    <div className="flex flex-col gap-0.5">
                      <button
                        onClick={() => onMovePosition(item, "up")}
                        disabled={
                          item.order === 1 || reorderLoadingId === item.id
                        }
                        className="p-1 text-slate-400 hover:text-white disabled:opacity-20 cursor-pointer"
                        title="Move Up"
                      >
                        <FiArrowUp className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => onMovePosition(item, "down")}
                        disabled={
                          item.order === allCount ||
                          reorderLoadingId === item.id
                        }
                        className="p-1 text-slate-400 hover:text-white disabled:opacity-20 cursor-pointer"
                        title="Move Down"
                      >
                        <FiArrowDown className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </td>

                {/* Role & Company */}
                <td className="py-3 px-4">
                  <div>
                    <h3 className="font-bold text-white text-sm tracking-tight">
                      {item.role}
                    </h3>
                    <p className="text-indigo-400 font-semibold text-xs mt-0.5">
                      {item.company}
                    </p>
                  </div>
                </td>

                {/* Period */}
                <td className="py-3 px-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#1a1240] text-indigo-300 border border-[#2d1e5a]">
                    <FiCalendar className="w-3 h-3 text-indigo-400" />
                    <span>{item.period}</span>
                  </span>
                </td>

                {/* Description */}
                <td className="py-3 px-4 max-w-[280px]">
                  <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">
                    {item.description || "—"}
                  </p>
                </td>

                {/* Highlights Count */}
                <td className="py-3 px-4 text-center">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    <FiCheckCircle className="w-3 h-3" />
                    <span>{item.highlights?.length || 0} bullets</span>
                  </span>
                </td>

                {/* Actions */}
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => onOpenEdit(item)}
                      className="p-2 text-indigo-400 hover:text-white hover:bg-indigo-600/20 rounded-lg transition-colors cursor-pointer"
                      title="Edit Experience"
                    >
                      <FiEdit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDelete(item)}
                      className="p-2 text-rose-400 hover:text-white hover:bg-rose-600/20 rounded-lg transition-colors cursor-pointer"
                      title="Delete Experience"
                    >
                      <FiTrash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExperienceTable;
