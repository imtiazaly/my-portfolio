import React from "react";
import {
  FiArrowUp,
  FiArrowDown,
  FiEdit2,
  FiTrash2,
  FiExternalLink,
  FiGithub,
  FiLayers,
} from "react-icons/fi";

const ProjectTable = ({
  projects,
  allProjectsCount,
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
        Loading projects from{" "}
        <code className="text-indigo-400">projects.json</code>...
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
              <th className="py-3.5 px-4">Project</th>
              <th className="py-3.5 px-4">Type / Category</th>
              <th className="py-3.5 px-4">Tech Stack</th>
              <th className="py-3.5 px-4">Links</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#26194d]/60">
            {projects.map((project, idx) => (
              <tr
                key={project.id || idx}
                className="hover:bg-[#181140]/60 transition-colors group"
              >
                {/* Rank & Reorder Controls */}
                <td className="py-3 px-4 text-center">
                  <div className="flex items-center justify-center gap-1">
                    <select
                      value={project.order || idx + 1}
                      onChange={(e) => onSetExactRank(project, e.target.value)}
                      disabled={reorderLoadingId === project.id}
                      className="px-1.5 py-1 bg-[#0b0819] border border-[#2d1e5a] rounded-lg text-[11px] font-black text-indigo-300 text-center cursor-pointer hover:border-indigo-500 focus:outline-none"
                      title="Set Position Rank"
                    >
                      {Array.from(
                        { length: allProjectsCount },
                        (_, i) => i + 1,
                      ).map((num) => (
                        <option key={num} value={num}>
                          #{num}
                        </option>
                      ))}
                    </select>

                    <div className="flex flex-col gap-0.5">
                      <button
                        onClick={() => onMovePosition(project, "up")}
                        disabled={
                          project.order === 1 || reorderLoadingId === project.id
                        }
                        className="p-1 text-slate-400 hover:text-white disabled:opacity-20 cursor-pointer"
                        title="Move Up"
                      >
                        <FiArrowUp className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => onMovePosition(project, "down")}
                        disabled={
                          project.order === allProjectsCount ||
                          reorderLoadingId === project.id
                        }
                        className="p-1 text-slate-400 hover:text-white disabled:opacity-20 cursor-pointer"
                        title="Move Down"
                      >
                        <FiArrowDown className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </td>

                {/* Thumbnail & Title */}
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-9 rounded-lg bg-slate-900 border border-[#2d1e5a] overflow-hidden shrink-0 flex items-center justify-center">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      ) : (
                        <FiLayers className="text-slate-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-white tracking-tight line-clamp-1 max-w-[280px]">
                        {project.title}
                      </p>
                      <span className="text-[10px] text-slate-500 font-mono">
                        /{project.slug}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Type & Category */}
                <td className="py-3 px-4">
                  <div className="space-y-1">
                    <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                      {project.type || "web"}
                    </span>
                    <p className="text-[11px] text-[#beafdc] font-medium">
                      {project.category}
                    </p>
                  </div>
                </td>

                {/* Tech Stack Pills */}
                <td className="py-3 px-4">
                  <div className="flex flex-wrap gap-1 max-w-[220px]">
                    {project.stack?.slice(0, 3).map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-[#1a1240] text-slate-300 border border-[#2d1e5a]"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.stack?.length > 3 && (
                      <span className="text-[10px] text-slate-500">
                        +{project.stack.length - 3}
                      </span>
                    )}
                  </div>
                </td>

                {/* Links */}
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 text-slate-400 hover:text-white bg-[#0e0a24] rounded-lg border border-[#2d1e5a]"
                        title="Live Preview"
                      >
                        <FiExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 text-slate-400 hover:text-white bg-[#0e0a24] rounded-lg border border-[#2d1e5a]"
                        title="GitHub Repo"
                      >
                        <FiGithub className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </td>

                {/* Actions */}
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => onOpenEdit(project)}
                      className="p-2 text-indigo-400 hover:text-white hover:bg-indigo-600/20 rounded-lg transition-colors cursor-pointer"
                      title="Edit Project"
                    >
                      <FiEdit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDelete(project)}
                      className="p-2 text-rose-400 hover:text-white hover:bg-rose-600/20 rounded-lg transition-colors cursor-pointer"
                      title="Delete Project"
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

export default ProjectTable;
