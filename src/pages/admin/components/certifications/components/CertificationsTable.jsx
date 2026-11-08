import React from "react";
import {
  FiArrowUp,
  FiArrowDown,
  FiEdit2,
  FiTrash2,
  FiExternalLink,
  FiAward,
  FiCalendar,
} from "react-icons/fi";

const CertificationsTable = ({
  certifications,
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
        Loading certifications from{" "}
        <code className="text-indigo-400">certifications.json</code>...
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
              <th className="py-3.5 px-4">Certificate & Issuer</th>
              <th className="py-3.5 px-4">Issue Date</th>
              <th className="py-3.5 px-4">Skills Covered</th>
              <th className="py-3.5 px-4">Credential Link</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#26194d]/60">
            {certifications.map((item, idx) => (
              <tr
                key={item.id || idx}
                className="hover:bg-[#181140]/60 transition-colors group"
              >
                {/* Rank Selector & Reorder */}
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

                {/* Badge Icon & Certificate Title */}
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0 overflow-hidden">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      ) : (
                        <FiAward className="w-4 h-4" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm tracking-tight line-clamp-1 max-w-[280px]">
                        {item.title}
                      </h3>
                      <p className="text-indigo-400 font-semibold text-xs mt-0.5">
                        {item.issuer}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Date */}
                <td className="py-3 px-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#1a1240] text-indigo-300 border border-[#2d1e5a]">
                    <FiCalendar className="w-3 h-3 text-indigo-400" />
                    <span>{item.issueDate || "—"}</span>
                  </span>
                </td>

                {/* Skills Tags */}
                <td className="py-3 px-4">
                  <div className="flex flex-wrap gap-1 max-w-[220px]">
                    {item.skills?.slice(0, 3).map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-[#1a1240] text-slate-300 border border-[#2d1e5a]"
                      >
                        {skill}
                      </span>
                    ))}
                    {item.skills?.length > 3 && (
                      <span className="text-[10px] text-slate-500">
                        +{item.skills.length - 3}
                      </span>
                    )}
                  </div>
                </td>

                {/* Credential URL Link */}
                <td className="py-3 px-4">
                  {item.credentialUrl ? (
                    <a
                      href={item.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#0e0a24] text-indigo-300 hover:text-white rounded-lg border border-[#2d1e5a] hover:border-indigo-500 text-xs font-semibold transition-all"
                    >
                      <span>Verify</span>
                      <FiExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="text-slate-600 font-mono text-xs">—</span>
                  )}
                </td>

                {/* Actions */}
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => onOpenEdit(item)}
                      className="p-2 text-indigo-400 hover:text-white hover:bg-indigo-600/20 rounded-lg transition-colors cursor-pointer"
                      title="Edit Certification"
                    >
                      <FiEdit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDelete(item)}
                      className="p-2 text-rose-400 hover:text-white hover:bg-rose-600/20 rounded-lg transition-colors cursor-pointer"
                      title="Delete Certification"
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

export default CertificationsTable;
