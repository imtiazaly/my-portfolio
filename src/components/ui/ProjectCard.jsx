import { useNavigate } from "react-router-dom";
import { FiExternalLink, FiGithub, FiCheck } from "react-icons/fi";

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  const handleCardClick = (e) => {
    // Prevent routing if user clicked an external link icon or anchor tag
    if (
      e.target.tagName.toLowerCase() === "a" ||
      e.target.closest("a") ||
      e.target.tagName.toLowerCase() === "button" ||
      e.target.closest("button")
    ) {
      return;
    }
    navigate(`/projects/${project.slug}`, { state: { from: "projects" } });
  };

  return (
    <div
      onClick={handleCardClick}
      className="group flex flex-col h-full bg-[#ffffff] dark:bg-[#160f38] rounded-[28px] overflow-hidden border border-slate-200 dark:border-[#2d1e5a] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2.5 hover:scale-[1.005] hover:shadow-[0_20px_50px_rgba(99,102,241,0.06)] dark:hover:shadow-[0_20px_50px_rgba(167,92,255,0.22)] hover:border-indigo-500/50 dark:hover:border-indigo-500/50 cursor-pointer relative z-10"
    >
      {/* Image Container with Custom Real Browser Chrome Frame */}
      <div className="relative overflow-hidden bg-slate-950 flex flex-col shrink-0 border-b border-slate-200 dark:border-[#2d1e5a] w-full aspect-[16/10]">
        {/* Real Browser Chrome Mock Bar */}
        <div className="h-9 bg-slate-100 dark:bg-[#11092e] border-b border-slate-200/80 dark:border-[#2d1e5a]/80 flex items-center px-4 gap-2 select-none shrink-0 z-20">
          {/* Dot window controls */}
          <div className="flex gap-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] opacity-90 shadow-sm" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] opacity-90 shadow-sm" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] opacity-90 shadow-sm" />
          </div>
          {/* Address Bar */}
          <div className="flex-grow mx-2.5 max-w-[200px] md:max-w-[250px] h-6 rounded-md bg-white dark:bg-black/20 border border-slate-250 dark:border-white/[0.04] px-3 flex items-center text-[10px] text-slate-400 dark:text-[#beafdc]/60 gap-1.5 shadow-inner">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            <span className="truncate font-mono">{project.slug || project.title.toLowerCase().replace(/\s+/g, '-')}.imtiaz.dev</span>
          </div>
          <FiExternalLink className="text-slate-400 dark:text-slate-500 w-3 h-3 shrink-0" />
        </div>

        {/* Screenshot Screen */}
        <div className="relative flex-grow overflow-hidden select-none bg-slate-950">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover transition-all duration-[800ms] ease-out filter brightness-[90%] group-hover:brightness-100 group-hover:scale-105"
          />

          {/* Glowing hover mesh shine */}
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-transparent to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* Launch Action Overlay Indicator */}
          <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
            <span className="text-[10px] font-extrabold text-white tracking-[0.2em] uppercase bg-indigo-650/90 border border-indigo-400/30 px-3.5 py-2 rounded-xl shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              Launch Details
            </span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-grow p-6 space-y-4">
        {/* Category Tag & Type Badge */}
        <div className="flex items-center justify-between gap-2">
          {project.category && (
            <span className="inline-block text-[10px] font-extrabold tracking-[0.15em] uppercase text-indigo-500 dark:text-indigo-400 select-none">
              {project.category}
            </span>
          )}
          {project.type === "company" && (
            <span className="inline-flex items-center gap-1 text-[9px] font-extrabold tracking-[0.05em] uppercase bg-indigo-500/10 text-indigo-650 dark:bg-indigo-500/20 dark:text-indigo-300 border border-indigo-500/20 dark:border-indigo-500/30 px-2 py-0.5 rounded-full select-none shadow-sm">
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
              Company
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-black text-slate-900 dark:text-[#f0ebff] group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors leading-snug">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-650 dark:text-[#beafdc] font-medium leading-relaxed line-clamp-3 flex-grow">
          {project.description}
        </p>

        {/* Key features (direct visibility, top 2 features) */}
        {project.features && project.features.length > 0 && (
          <ul className="space-y-1.5 py-1 border-t border-slate-100 dark:border-[#2d1e5a]/20 pt-3">
            {project.features.slice(0, 2).map((feature, i) => (
              <li
                key={i}
                className="text-[11px] text-slate-700 dark:text-[#beafdc] font-semibold flex items-start gap-2.5 leading-relaxed"
              >
                <div className="flex items-center justify-center w-4 h-4 rounded-full bg-emerald-500/10 text-emerald-500 shrink-0 mt-0.5 shadow-sm">
                  <FiCheck className="w-2 h-2" />
                </div>
                <span className="line-clamp-1">{feature}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Badges & Actions Footer */}
        <div className="mt-4 pt-4 border-t border-slate-150 dark:border-[#2d1e5a]/40 space-y-4">
          {/* Tech Badges */}
          {project.stack && project.stack.length > 0 && (
            <div className="flex flex-wrap gap-1 select-none">
              {project.stack.slice(0, 4).map((tech, index) => (
                <span
                  key={index}
                  className="text-[9px] font-extrabold bg-[#78699b]/8 dark:bg-[#78699b]/15 text-slate-700 dark:text-[#beafdc] px-2.5 py-0.5 rounded-full border border-slate-200/40 dark:border-[#78699b]/25 shadow-sm"
                >
                  {tech}
                </span>
              ))}
              {project.stack.length > 4 && (
                <span className="text-[9px] font-extrabold bg-[#78699b]/8 dark:bg-[#78699b]/15 text-slate-400 dark:text-slate-500 px-2 py-0.5 rounded-full">
                  +{project.stack.length - 4}
                </span>
              )}
            </div>
          )}

          {/* Action Links and Buttons */}
          <div className="flex items-center justify-between text-xs pt-1">
            {/* Workspace details link */}
            <button
              onClick={() => {
                navigate(`/projects/${project.slug}`, { state: { from: "projects" } });
              }}
              className="font-bold text-indigo-500 hover:text-indigo-650 dark:text-indigo-400 dark:hover:text-indigo-300 group/link flex items-center gap-1 bg-transparent border-0 cursor-pointer"
            >
              <span>Workspace</span>
              <span className="group-hover/link:translate-x-1.5 transition-transform duration-350">
                &rarr;
              </span>
            </button>

            {/* Pill Action Buttons */}
            <div className="flex items-center gap-2 select-none">
              {project.live && project.live !== "#" && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="group/live inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl text-[10px] font-extrabold transition-all duration-300 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-[0_4px_12px_rgba(99,102,241,0.2)] hover:shadow-[0_8px_20px_rgba(168,85,247,0.35)] hover:scale-[1.03] active:scale-[0.97]"
                  title={project.type === "company" ? "Visit Live Site" : "Launch Live Demo"}
                >
                  <FiExternalLink className="text-[11px] group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5 transition-transform duration-300" />
                  <span>{project.type === "company" ? "Live Site" : "Live Demo"}</span>
                </a>
              )}

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="group/repo inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-xl text-[10px] font-extrabold transition-all duration-300 bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 border border-slate-200 hover:border-indigo-500/50 dark:bg-[#0f0a28]/60 dark:hover:bg-indigo-950/40 dark:text-[#beafdc] dark:hover:text-indigo-300 dark:border-[#2d1e5a]/80 dark:hover:border-indigo-500/50 hover:scale-[1.03] active:scale-[0.97] hover:shadow-[0_4px_12px_rgba(99,102,241,0.05)] dark:hover:shadow-[0_4px_12px_rgba(168,85,247,0.15)] shadow-sm"
                  title="View Codebase"
                >
                  <FiGithub className="text-[11px] group-hover/repo:rotate-12 transition-transform duration-300" />
                  <span>Repository</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
