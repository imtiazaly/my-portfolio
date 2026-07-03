import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import projects from "../../data/projects";
import Button from "../common/Button";
import { FiExternalLink, FiGithub, FiCheck, FiArrowRight } from "react-icons/fi";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
};

const Projects = () => {
  const navigate = useNavigate();

  // Get the top 3 company and personal projects
  const companyProjects = projects.filter((p) => p.type === "company").slice(0, 3);
  const personalProjects = projects.filter((p) => p.type !== "company").slice(0, 3);

  const handleCardClick = (projectSlug, e) => {
    // Prevent routing if user clicked an external icon link or button
    if (
      e.target.tagName.toLowerCase() === "a" ||
      e.target.closest("a") ||
      e.target.tagName.toLowerCase() === "button" ||
      e.target.closest("button")
    ) {
      return;
    }
    navigate(`/projects/${projectSlug}`, { state: { from: "home" } });
  };

  return (
    <section id="projects" className="py-24 px-6 relative overflow-hidden bg-transparent">
      {/* Premium ambient space glow highlights */}
      <div className="glow-node w-[600px] h-[600px] bg-pink-500/5 right-[-250px] bottom-[15%] rounded-full blur-[130px] pointer-events-none" />
      <div className="glow-node w-[500px] h-[500px] bg-indigo-500/5 left-[-200px] top-[5%] rounded-full blur-[120px] pointer-events-none" />
      <div className="glow-node w-[400px] h-[400px] bg-cyan-400/5 left-[30%] bottom-[5%] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Main Header */}
        <div className="text-center mb-20 animate-fade-in">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-indigo-500 dark:text-indigo-400 mb-3 select-none">
            Selected Work
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Featured Projects
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-indigo-500 to-pink-500 mx-auto mt-4 rounded-full shadow-sm" />
        </div>

        {/* --- SECTION 1: COMPANY WORK --- */}
        <div className="mb-24">
          <div className="flex items-center gap-3.5 mb-10 border-b border-slate-200/50 dark:border-[#2d1e5a]/30 pb-4 select-none">
            <span className="text-3xl filter drop-shadow">🏢</span>
            <div>
              <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-[#f0ebff] tracking-tight">
                Enterprise & Contributed Systems
              </h3>
              <p className="text-xs text-slate-500 dark:text-[#beafdc]/60 font-semibold mt-1">
                Real-world projects developed for agency clients and active companies.
              </p>
            </div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.12 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {companyProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                onClick={(e) => handleCardClick(project.slug, e)}
                className="group flex flex-col bg-[#ffffff] dark:bg-[#160f38] rounded-[28px] overflow-hidden border border-slate-200 dark:border-[#2d1e5a] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2.5 hover:scale-[1.005] hover:shadow-[0_20px_50px_rgba(99,102,241,0.06)] dark:hover:shadow-[0_20px_50px_rgba(167,92,255,0.22)] hover:border-indigo-500/50 dark:hover:border-indigo-500/50 cursor-pointer relative z-10"
              >
                {/* Mock Browser Frame */}
                <div className="relative overflow-hidden bg-slate-950 flex flex-col shrink-0 border-b border-slate-200 dark:border-[#2d1e5a] w-full aspect-[16/10]">
                  <div className="h-9 bg-slate-100 dark:bg-[#11092e] border-b border-slate-200/80 dark:border-[#2d1e5a]/80 flex items-center px-4 gap-2 select-none shrink-0 z-20">
                    <div className="flex gap-1.5 shrink-0">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] opacity-90 shadow-sm" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] opacity-90 shadow-sm" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] opacity-90 shadow-sm" />
                    </div>
                    <div className="flex-grow mx-2.5 max-w-[200px] md:max-w-[250px] h-6 rounded-md bg-white dark:bg-black/20 border border-slate-250 dark:border-white/[0.04] px-3 flex items-center text-[10px] text-slate-400 dark:text-[#beafdc]/60 gap-1.5 shadow-inner">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                      <span className="truncate font-mono">
                        {project.slug}.imtiaz.dev
                      </span>
                    </div>
                    <FiExternalLink className="text-slate-400 dark:text-slate-500 w-3 h-3 shrink-0" />
                  </div>
                  <div className="relative flex-grow overflow-hidden select-none bg-slate-950">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-all duration-[800ms] ease-out filter brightness-[90%] group-hover:brightness-100 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-transparent to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                      <span className="text-[10px] font-extrabold text-white tracking-[0.2em] uppercase bg-indigo-650/90 border border-indigo-400/30 px-3.5 py-2 rounded-xl shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        Launch Details
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      {project.category && (
                        <span className="inline-block text-[10px] font-extrabold tracking-[0.15em] uppercase text-indigo-500 dark:text-indigo-400 select-none">
                          {project.category}
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1.5 text-[9px] font-extrabold tracking-[0.05em] uppercase bg-indigo-500/10 text-indigo-650 dark:bg-indigo-500/20 dark:text-indigo-300 border border-indigo-500/20 dark:border-indigo-500/30 px-2.5 py-0.5 rounded-full select-none shadow-sm animate-pulse-glow">
                        <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
                        Company Work
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-[#f0ebff] group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors leading-snug line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-650 dark:text-[#beafdc] font-medium leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-150 dark:border-[#2d1e5a]/40 space-y-4">
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
                      </div>
                    )}
                    <div className="flex items-center justify-between text-xs pt-1">
                      <button
                        onClick={() => {
                          navigate(`/projects/${project.slug}`, { state: { from: "home" } });
                        }}
                        className="font-bold text-indigo-500 hover:text-indigo-650 dark:text-indigo-400 dark:hover:text-indigo-300 group/link flex items-center gap-1 bg-transparent border-0 cursor-pointer"
                      >
                        <span>Workspace</span>
                        <span className="group-hover/link:translate-x-1.5 transition-transform duration-350">
                          &rarr;
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* --- SECTION 2: PERSONAL WORK --- */}
        <div className="mb-20">
          <div className="flex items-center gap-3.5 mb-10 border-b border-slate-200/50 dark:border-[#2d1e5a]/30 pb-4 select-none">
            <span className="text-3xl filter drop-shadow">🚀</span>
            <div>
              <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-[#f0ebff] tracking-tight">
                Personal Products & Open Source
              </h3>
              <p className="text-xs text-slate-500 dark:text-[#beafdc]/60 font-semibold mt-1">
                Independent projects, utility tools, and practice architectures.
              </p>
            </div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.12 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {personalProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                onClick={(e) => handleCardClick(project.slug, e)}
                className="group flex flex-col bg-[#ffffff] dark:bg-[#160f38] rounded-[28px] overflow-hidden border border-slate-200 dark:border-[#2d1e5a] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2.5 hover:scale-[1.005] hover:shadow-[0_20px_50px_rgba(99,102,241,0.06)] dark:hover:shadow-[0_20px_50px_rgba(167,92,255,0.22)] hover:border-indigo-500/50 dark:hover:border-indigo-500/50 cursor-pointer relative z-10"
              >
                {/* Mock Browser Frame */}
                <div className="relative overflow-hidden bg-slate-950 flex flex-col shrink-0 border-b border-slate-200 dark:border-[#2d1e5a] w-full aspect-[16/10]">
                  <div className="h-9 bg-slate-100 dark:bg-[#11092e] border-b border-slate-200/80 dark:border-[#2d1e5a]/80 flex items-center px-4 gap-2 select-none shrink-0 z-20">
                    <div className="flex gap-1.5 shrink-0">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] opacity-90 shadow-sm" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] opacity-90 shadow-sm" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] opacity-90 shadow-sm" />
                    </div>
                    <div className="flex-grow mx-2.5 max-w-[200px] md:max-w-[250px] h-6 rounded-md bg-white dark:bg-black/20 border border-slate-250 dark:border-white/[0.04] px-3 flex items-center text-[10px] text-slate-400 dark:text-[#beafdc]/60 gap-1.5 shadow-inner">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                      <span className="truncate font-mono">
                        {project.slug}.imtiaz.dev
                      </span>
                    </div>
                    <FiExternalLink className="text-slate-400 dark:text-slate-500 w-3 h-3 shrink-0" />
                  </div>
                  <div className="relative flex-grow overflow-hidden select-none bg-slate-950">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-all duration-[800ms] ease-out filter brightness-[90%] group-hover:brightness-100 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-transparent to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                      <span className="text-[10px] font-extrabold text-white tracking-[0.2em] uppercase bg-indigo-650/90 border border-indigo-400/30 px-3.5 py-2 rounded-xl shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        Launch Details
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div className="space-y-4">
                    {project.category && (
                      <span className="inline-block text-[10px] font-extrabold tracking-[0.15em] uppercase text-indigo-500 dark:text-indigo-400 select-none">
                        {project.category}
                      </span>
                    )}
                    <h3 className="text-xl font-black text-slate-900 dark:text-[#f0ebff] group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors leading-snug line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-650 dark:text-[#beafdc] font-medium leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-150 dark:border-[#2d1e5a]/40 space-y-4">
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
                      </div>
                    )}
                    <div className="flex items-center justify-between text-xs pt-1">
                      <button
                        onClick={() => {
                          navigate(`/projects/${project.slug}`, { state: { from: "home" } });
                        }}
                        className="font-bold text-indigo-500 hover:text-indigo-650 dark:text-indigo-400 dark:hover:text-indigo-300 group/link flex items-center gap-1 bg-transparent border-0 cursor-pointer"
                      >
                        <span>Workspace</span>
                        <span className="group-hover/link:translate-x-1.5 transition-transform duration-350">
                          &rarr;
                        </span>
                      </button>

                      <div className="flex items-center gap-2 select-none">
                        {project.live && project.live !== "#" && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noreferrer"
                            className="group/live inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-xl text-[10px] font-extrabold transition-all duration-300 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-md hover:scale-[1.03] active:scale-[0.97]"
                          >
                            <FiExternalLink />
                            <span>Live</span>
                          </a>
                        )}
                        {project.github && project.github !== "#" && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            className="group/repo inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-xl text-[10px] font-extrabold transition-all duration-300 bg-slate-50 dark:bg-[#0f0a28]/60 text-slate-700 dark:text-[#beafdc] border border-slate-200 dark:border-[#2d1e5a]/85 hover:scale-[1.03] active:scale-[0.97]"
                          >
                            <FiGithub />
                            <span>Repo</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* View All Projects Action Button */}
        <div className="mt-20 text-center">
          <Button
            variant="primary"
            onClick={() => {
              navigate("/projects");
            }}
            className="group px-10 py-4.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-0 rounded-2xl font-extrabold text-sm uppercase tracking-wider transition-all duration-350 shadow-[0_4px_20px_rgba(99,102,241,0.2)] hover:shadow-[0_8px_30px_rgba(168,85,247,0.4)] hover:-translate-y-1 hover:scale-[1.03] active:scale-[0.97] flex items-center justify-center gap-2 mx-auto cursor-pointer"
          >
            <span>Explore All Projects</span>
            <FiArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1.5 transition-transform duration-300 ease-out text-white" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
