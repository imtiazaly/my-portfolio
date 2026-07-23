import { useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft, FiExternalLink, FiGithub, FiLayers, FiCheckCircle, FiInfo, FiX } from "react-icons/fi";
import projects from "../data/projects";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

const ProjectDetails = () => {
  const { slug } = useParams();
  const location = useLocation();

  // Find by slug first, otherwise try by ID for backwards compatibility
  const project = projects.find((p) => p.slug === slug || p.id === Number(slug));

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center bg-transparent px-6">
        <div className="space-y-6 max-w-md w-full p-8 bg-[#ffffff] dark:bg-[#160f38] border border-slate-200 dark:border-[#2d1e5a] rounded-3xl shadow-lg">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">Project Not Found</h1>
          <p className="text-sm text-slate-650 dark:text-[#beafdc] font-medium leading-relaxed">
            The project workspace you are looking for does not exist or has been relocated.
          </p>
          <Link
            to={location.state?.from === "home" ? "/" : "/projects"}
            className="group inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-xl font-bold shadow-md hover:shadow-lg transition-all"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span>{location.state?.from === "home" ? "Back to Home" : "Back to Projects"}</span>
          </Link>
        </div>
      </div>
    );
  }

  const projectImages = project.images && project.images.length > 0 ? project.images : [project.image];

  return (
    /* KEY FIX: overflow-x-hidden on the section prevents any child from bleeding out */
    <section className="w-full overflow-x-hidden pt-20 pb-12 sm:py-24 px-4 sm:px-6 relative bg-transparent min-h-screen">

      {/* Background ambient glow — pointer-events-none so they don't affect layout */}
      <div className="glow-node fixed w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-pink-500/5 left-[-150px] top-[10%] rounded-full blur-[100px] sm:blur-[120px] pointer-events-none -z-10" />
      <div className="glow-node fixed w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-indigo-500/5 right-[-100px] bottom-[15%] rounded-full blur-[90px] sm:blur-[110px] pointer-events-none -z-10" />

      {/* KEY FIX: w-full max-w-6xl ensures container never exceeds viewport */}
      <div className="w-full max-w-6xl mx-auto relative z-10 pt-4 sm:pt-8">

        {/* Navigation Back Link */}
        <div className="flex justify-start mb-6 sm:mb-8 select-none">
          <Link
            to={location.state?.from === "home" ? "/" : "/projects"}
            className="group inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 bg-[#ffffff] dark:bg-[#160f38] text-slate-700 dark:text-[#beafdc] border border-slate-200 dark:border-[#2d1e5a] hover:border-indigo-500/50 dark:hover:border-indigo-500/50 hover:text-indigo-650 dark:hover:text-indigo-300 rounded-xl text-xs font-bold transition-all duration-300 hover:-translate-x-0.5 active:translate-x-0 shadow-sm"
          >
            <FiArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform duration-300 ease-out shrink-0" />
            <span>{location.state?.from === "home" ? "Back to Home" : "Back to Projects"}</span>
          </Link>
        </div>

        {/* Layout Grid — single column on mobile/tablet, 12-col on lg+ */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 w-full"
        >
          {/* ── MAIN CONTENT COLUMN ── */}
          <div className="lg:col-span-8 flex flex-col gap-6 sm:gap-8 min-w-0">

            {/* Title / Description Card */}
            <motion.div
              variants={itemVariants}
              className="w-full bg-[#ffffff]/90 dark:bg-[#160f38]/90 border border-slate-200 dark:border-[#2d1e5a] backdrop-blur-xl rounded-2xl sm:rounded-[28px] p-4 sm:p-6 md:p-8 shadow-sm relative overflow-hidden"
            >
              {/* Gradient accent flare */}
              <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-indigo-500/10 to-pink-500/10 rounded-full blur-xl pointer-events-none" />

              <div className="relative z-10 flex flex-col gap-3">
                {/* Category Badge */}
                {project.category && (
                  <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 border border-indigo-500/30 text-indigo-600 dark:text-indigo-300 font-extrabold text-[10px] uppercase tracking-wider select-none">
                    <span className="relative flex h-2 w-2 shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                    </span>
                    <span>{project.category}</span>
                  </div>
                )}

                {/* Title — break-words stops long titles from overflowing */}
                <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 dark:text-[#f0ebff] leading-tight tracking-tight break-words">
                  {project.title}
                </h1>

                <p className="text-xs sm:text-sm md:text-base text-slate-600 dark:text-[#beafdc] font-medium leading-relaxed">
                  {project.description}
                </p>
              </div>
            </motion.div>

            {/* Screenshot / Gallery Card */}
            <motion.div
              variants={itemVariants}
              className="w-full rounded-2xl sm:rounded-[28px] overflow-hidden border border-slate-200 dark:border-[#2d1e5a] bg-slate-950 flex flex-col shadow-[0_15px_40px_rgba(99,102,241,0.04)] dark:shadow-[0_15px_40px_rgba(167,92,255,0.18)]"
            >
              {/* Browser Chrome Mock Bar */}
              <div className="h-8 sm:h-9 bg-slate-100 dark:bg-[#11092e] border-b border-slate-200/80 dark:border-[#2d1e5a]/80 flex items-center px-3 sm:px-4 gap-2 select-none shrink-0 min-w-0">
                <div className="flex gap-1.5 shrink-0">
                  <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#ff5f56] opacity-90" />
                  <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#ffbd2e] opacity-90" />
                  <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#27c93f] opacity-90" />
                </div>
                {/* KEY FIX: min-w-0 + overflow-hidden prevents address bar from inflating parent */}
                <div className="flex-1 min-w-0 mx-2 h-5 sm:h-6 rounded-md bg-white dark:bg-black/20 border dark:border-white/[0.04] px-2 sm:px-3 flex items-center gap-1.5 shadow-inner overflow-hidden">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shrink-0" />
                  <span className="truncate font-mono text-[9px] sm:text-[10px] text-slate-400 dark:text-[#beafdc]/60">{project.slug}.imtiaz.dev</span>
                </div>
                <FiExternalLink className="text-slate-400 dark:text-slate-500 w-3 h-3 shrink-0" />
              </div>

              {/* Main Image Viewer */}
              <div
                onClick={() => { setLightboxIndex(activeImageIndex); setIsLightboxOpen(true); }}
                className="relative w-full aspect-[4/3] sm:aspect-[16/9] overflow-hidden bg-slate-950 cursor-zoom-in group/screen"
              >
                <img
                  src={projectImages[activeImageIndex]}
                  alt={project.title}
                  className="w-full h-full object-contain object-center brightness-[95%] hover:brightness-100 transition-all duration-[600ms] ease-out"
                />

                {/* Nav arrows — always visible on touch devices */}
                {projectImages.length > 1 && (
                  <>
                    <button
                      onClick={(e) => { e.stopPropagation(); setActiveImageIndex((p) => (p === 0 ? projectImages.length - 1 : p - 1)); }}
                      className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-30 bg-black/70 text-white p-2 sm:p-2.5 rounded-full transition-all active:scale-90 border border-white/10 text-xs sm:text-sm"
                    >
                      &#10094;
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setActiveImageIndex((p) => (p === projectImages.length - 1 ? 0 : p + 1)); }}
                      className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-30 bg-black/70 text-white p-2 sm:p-2.5 rounded-full transition-all active:scale-90 border border-white/10 text-xs sm:text-sm"
                    >
                      &#10095;
                    </button>
                  </>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-transparent to-pink-500/10 opacity-0 group-hover/screen:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="absolute inset-0 bg-black/35 opacity-0 group-hover/screen:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <span className="text-[9px] sm:text-[10px] font-extrabold text-white tracking-[0.2em] uppercase bg-[#1a0f3c]/90 border border-[#3c2584]/30 px-3 py-1.5 rounded-xl shadow-lg">
                    Click to Expand
                  </span>
                </div>
              </div>

              {/* Thumbnail Strip
                  KEY FIX: outer div is overflow-x-auto but has NO w-max child.
                  We use inline-flex directly with padding so it scrolls cleanly
                  without causing the parent page to overflow. */}
              {projectImages.length > 1 && (
                <div className="w-full bg-slate-50 dark:bg-[#11092e]/40 border-t border-slate-200/60 dark:border-[#2d1e5a]/60 overflow-x-auto overscroll-x-contain select-none"
                     style={{ WebkitOverflowScrolling: "touch" }}>
                  <div className="flex items-center gap-1.5 sm:gap-2 px-3 py-2.5 sm:py-3">
                    {projectImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`w-11 sm:w-16 md:w-20 aspect-[16/10] rounded-md overflow-hidden border-2 transition-all duration-200 shrink-0 cursor-pointer ${
                          activeImageIndex === idx
                            ? "border-indigo-500 opacity-100"
                            : "border-transparent opacity-50 hover:opacity-80"
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover block" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Key Features Card */}
            {project.features && project.features.length > 0 && (
              <motion.div
                variants={itemVariants}
                className="w-full bg-[#ffffff]/90 dark:bg-[#160f38]/90 border border-slate-200 dark:border-[#2d1e5a] backdrop-blur-xl rounded-2xl sm:rounded-[28px] p-4 sm:p-6 md:p-8 shadow-sm"
              >
                <h2 className="flex items-center gap-2.5 text-lg sm:text-xl md:text-2xl font-black text-slate-900 dark:text-[#f0ebff] mb-4 sm:mb-6">
                  <div className="flex items-center justify-center w-8 sm:w-10 h-8 sm:h-10 rounded-xl bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border border-indigo-500/20 shrink-0">
                    <FiCheckCircle className="w-4 sm:w-5 h-4 sm:h-5" />
                  </div>
                  <span>Key Features &amp; Architecture</span>
                </h2>

                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5 sm:gap-3">
                      <div className="flex items-center justify-center w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-emerald-500/10 text-emerald-500 shrink-0 mt-0.5">
                        <FiCheckCircle className="w-2.5 sm:w-3 h-2.5 sm:h-3" />
                      </div>
                      <span className="text-xs sm:text-sm text-slate-700 dark:text-[#beafdc] font-semibold leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </div>

          {/* ── SIDEBAR COLUMN ── */}
          <div className="lg:col-span-4 flex flex-col gap-4 sm:gap-6 min-w-0">

            {/* Resource Links Card */}
            <motion.div
              variants={itemVariants}
              className="w-full bg-[#ffffff]/90 dark:bg-[#160f38]/90 border border-slate-200 dark:border-[#2d1e5a] backdrop-blur-xl rounded-2xl sm:rounded-[28px] p-4 sm:p-6 shadow-sm"
            >
              <h3 className="text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 sm:mb-4 select-none">
                Resource Links
              </h3>
              <div className="flex flex-col gap-2.5 sm:gap-3">
                {project.live && project.live !== "#" && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-3 sm:py-3.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all shadow-[0_4px_12px_rgba(99,102,241,0.2)] hover:shadow-[0_8px_20px_rgba(168,85,247,0.35)] hover:-translate-y-0.5 active:scale-[0.98]"
                  >
                    <FiExternalLink />
                    <span>{project.type === "company" ? "Visit Live Site" : "Launch Live Demo"}</span>
                  </a>
                )}
                {project.github && project.github !== "#" && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-3 sm:py-3.5 bg-slate-50 dark:bg-[#0f0a28]/60 text-slate-700 dark:text-[#beafdc] border border-slate-200 dark:border-[#2d1e5a]/80 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all hover:-translate-y-0.5 active:scale-[0.98] shadow-sm"
                  >
                    <FiGithub />
                    <span>View Repository</span>
                  </a>
                )}
              </div>
            </motion.div>

            {/* Tech Stack Card */}
            {project.stack && project.stack.length > 0 && (
              <motion.div
                variants={itemVariants}
                className="w-full bg-[#ffffff]/90 dark:bg-[#160f38]/90 border border-slate-200 dark:border-[#2d1e5a] backdrop-blur-xl rounded-2xl sm:rounded-[28px] p-4 sm:p-6 shadow-sm"
              >
                <h3 className="flex items-center gap-2 text-[10px] sm:text-xs font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 sm:mb-4 select-none">
                  <FiLayers className="text-indigo-500 shrink-0" />
                  <span>Technologies Used</span>
                </h3>
                {/* KEY FIX: flex-wrap so badges never push outside the card */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.stack.map((tech, i) => (
                    <span
                      key={i}
                      className="text-[11px] sm:text-xs font-bold px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-indigo-50 dark:bg-[#261f5c] text-indigo-700 dark:text-[#e3dbff] border border-indigo-100 dark:border-[#3c3182] shadow-sm cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Specifications Card */}
            <motion.div
              variants={itemVariants}
              className="w-full bg-[#ffffff]/90 dark:bg-[#160f38]/90 border border-slate-200 dark:border-[#2d1e5a] backdrop-blur-xl rounded-2xl sm:rounded-[28px] p-4 sm:p-6 shadow-sm"
            >
              <h4 className="flex items-center gap-2 font-extrabold text-slate-700 dark:text-[#f0ebff] uppercase tracking-wider text-xs sm:text-sm mb-2 sm:mb-3 select-none">
                <FiInfo className="text-indigo-500 shrink-0" />
                <span>Specifications</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-[#beafdc] font-medium leading-relaxed">
                This workspace is maintained as part of Imtiaz Ali's active code portfolio.
                All components are verified locally for responsive layouts and fast client-side performance.
              </p>
            </motion.div>

          </div>
        </motion.div>
      </div>

      {/* ── LIGHTBOX MODAL ── */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsLightboxOpen(false)}
            className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-3 sm:p-6 select-none"
          >
            {/* Close */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-3 sm:top-5 right-3 sm:right-5 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 sm:p-2.5 rounded-full z-50 border border-white/10 active:scale-90 transition-all cursor-pointer"
            >
              <FiX className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Image + Prev/Next */}
            <div
              className="relative w-full max-w-5xl flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {projectImages.length > 1 && (
                <button
                  onClick={() => setLightboxIndex((p) => (p === 0 ? projectImages.length - 1 : p - 1))}
                  className="absolute left-0 sm:left-2 z-50 text-white bg-black/60 hover:bg-black/85 p-2 sm:p-3 rounded-full border border-white/10 active:scale-95 transition-all text-sm cursor-pointer"
                >
                  &#10094;
                </button>
              )}

              <motion.img
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                src={projectImages[lightboxIndex]}
                alt={`${project.title} Preview ${lightboxIndex + 1}`}
                className="max-h-[62vh] sm:max-h-[78vh] max-w-[calc(100%-64px)] sm:max-w-[calc(100%-80px)] object-contain rounded-xl shadow-2xl"
              />

              {projectImages.length > 1 && (
                <button
                  onClick={() => setLightboxIndex((p) => (p === projectImages.length - 1 ? 0 : p + 1))}
                  className="absolute right-0 sm:right-2 z-50 text-white bg-black/60 hover:bg-black/85 p-2 sm:p-3 rounded-full border border-white/10 active:scale-95 transition-all text-sm cursor-pointer"
                >
                  &#10095;
                </button>
              )}
            </div>

            {/* Counter + Thumbnail strip */}
            <div
              className="mt-3 sm:mt-5 flex flex-col items-center gap-2 w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-white/50 text-[10px] sm:text-xs font-semibold tracking-wider">
                {lightboxIndex + 1} / {projectImages.length}
              </span>

              {/* KEY FIX: overflow-x-auto with no w-max wrapper */}
              {projectImages.length > 1 && (
                <div className="w-full overflow-x-auto overscroll-x-contain"
                     style={{ WebkitOverflowScrolling: "touch" }}>
                  <div className="flex gap-1.5 px-2 py-1 w-max mx-auto">
                    {projectImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setLightboxIndex(idx)}
                        className={`w-9 sm:w-11 h-6 sm:h-7 rounded border-2 overflow-hidden shrink-0 cursor-pointer transition-all duration-200 ${
                          lightboxIndex === idx
                            ? "border-indigo-500 opacity-100"
                            : "border-white/15 opacity-50 hover:opacity-80"
                        }`}
                      >
                        <img src={img} className="w-full h-full object-cover block" alt="" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectDetails;