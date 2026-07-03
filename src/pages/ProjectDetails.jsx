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
        <div className="space-y-6 max-w-md p-8 bg-[#ffffff] dark:bg-[#160f38] border border-slate-200 dark:border-[#2d1e5a] rounded-3xl shadow-lg">
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

  return (
    <section className="py-24 px-6 relative overflow-hidden bg-transparent min-h-screen">
      
      {/* Background ambient space glow highlights */}
      <div className="glow-node w-[500px] h-[500px] bg-pink-500/5 left-[-200px] top-[10%] rounded-full blur-[120px] pointer-events-none" />
      <div className="glow-node w-[400px] h-[400px] bg-indigo-500/5 right-[-150px] bottom-[15%] rounded-full blur-[110px] pointer-events-none" />
      <div className="glow-node w-[350px] h-[350px] bg-cyan-400/5 left-[40%] bottom-[5%] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 pt-8">
        
        {/* Navigation Back Link Button */}
        <div className="flex justify-start mb-8 select-none">
          <Link
            to={location.state?.from === "home" ? "/" : "/projects"}
            className="group inline-flex items-center gap-2 px-4 py-2.5 bg-[#ffffff] dark:bg-[#160f38] text-slate-700 dark:text-[#beafdc] border border-slate-200 dark:border-[#2d1e5a] hover:border-indigo-500/50 dark:hover:border-indigo-500/50 hover:text-indigo-650 dark:hover:text-indigo-300 rounded-xl text-xs font-bold transition-all duration-300 hover:-translate-x-0.5 active:translate-x-0 shadow-sm"
          >
            <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300 ease-out" />
            <span>{location.state?.from === "home" ? "Back to Home" : "Back to Projects"}</span>
          </Link>
        </div>

        {/* Layout container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-12 gap-10"
        >
          {/* Main Info Column */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Title / Description Card with High Readability Glassmorphism */}
            <motion.div
              variants={itemVariants}
              className="bg-[#ffffff]/90 dark:bg-[#160f38]/90 border border-slate-200 dark:border-[#2d1e5a] backdrop-blur-xl rounded-[28px] p-6 md:p-8 space-y-4 shadow-sm relative overflow-hidden"
            >
              {/* Gradient accent flare */}
              <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-indigo-500/10 to-pink-500/10 rounded-full blur-xl pointer-events-none" />
              
              {project.category && (
                <div className="absolute top-3.5 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 border border-indigo-500/30 text-indigo-650 dark:text-indigo-300 font-extrabold text-[10px] uppercase tracking-wider select-none shadow-[0_2px_12px_rgba(99,102,241,0.06)]">
                  {/* Blinking dot indicator */}
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                  </span>
                  <span className="animate-pulse">{project.category}</span>
                </div>
              )}

              <div className="relative z-10 space-y-3.5 pt-8">
                <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-[#f0ebff] leading-tight tracking-tight">
                  {project.title}
                </h1>
                <p className="text-sm md:text-base text-slate-650 dark:text-[#beafdc] font-medium leading-relaxed">
                  {project.description}
                </p>
              </div>
            </motion.div>

            {/* Screen Mockup Image with Custom Real Browser Chrome Frame */}
            {(() => {
              const projectImages = project.images && project.images.length > 0 ? project.images : [project.image];
              return (
                <motion.div
                  variants={itemVariants}
                  className="rounded-[28px] overflow-hidden border border-slate-200 dark:border-[#2d1e5a] bg-slate-950 flex flex-col shadow-[0_15px_40px_rgba(99,102,241,0.04)] dark:shadow-[0_15px_40px_rgba(167,92,255,0.18)]"
                >
                  {/* Real Browser Chrome Mock Bar */}
                  <div className="h-9 bg-slate-100 dark:bg-[#11092e] border-b border-slate-200/80 dark:border-[#2d1e5a]/80 flex items-center px-4 gap-2 select-none shrink-0 z-20">
                    {/* Dot window controls */}
                    <div className="flex gap-1.5 shrink-0">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] opacity-90 shadow-sm" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] opacity-90 shadow-sm" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] opacity-90 shadow-sm" />
                    </div>
                    {/* Address Bar */}
                    <div className="flex-grow mx-2.5 max-w-[250px] h-6 rounded-md bg-white dark:bg-black/20 border border-slate-250 dark:border-white/[0.04] px-3 flex items-center text-[10px] text-slate-400 dark:text-[#beafdc]/60 gap-1.5 shadow-inner">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                      <span className="truncate font-mono">{project.slug}.imtiaz.dev</span>
                    </div>
                    <FiExternalLink className="text-slate-400 dark:text-slate-500 w-3 h-3 shrink-0" />
                  </div>

                  {/* Screenshot screen area */}
                  <div
                    onClick={() => {
                      setLightboxIndex(activeImageIndex);
                      setIsLightboxOpen(true);
                    }}
                    className="relative aspect-[16/9] overflow-hidden select-none bg-slate-950 cursor-zoom-in group/screen"
                  >
                    <img
                      src={projectImages[activeImageIndex]}
                      alt={project.title}
                      className="w-full h-full object-contain object-center filter brightness-[95%] hover:brightness-100 transition-all duration-[600ms] ease-out group-hover/screen:scale-[1.01]"
                    />

                    {/* Left/Right Main Image Navigation Arrows */}
                    {projectImages.length > 1 && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveImageIndex((prev) => (prev === 0 ? projectImages.length - 1 : prev - 1));
                          }}
                          className="absolute left-3 top-1/2 -translate-y-1/2 z-30 bg-black/60 hover:bg-black/85 text-white/95 hover:text-white p-2.5 rounded-full opacity-0 group-hover/screen:opacity-100 transition-all cursor-pointer border border-white/5 active:scale-90"
                        >
                          &#10094;
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveImageIndex((prev) => (prev === projectImages.length - 1 ? 0 : prev + 1));
                          }}
                          className="absolute right-3 top-1/2 -translate-y-1/2 z-30 bg-black/60 hover:bg-black/85 text-white/95 hover:text-white p-2.5 rounded-full opacity-0 group-hover/screen:opacity-100 transition-all cursor-pointer border border-white/5 active:scale-90"
                        >
                          &#10095;
                        </button>
                      </>
                    )}

                    {/* Glowing hover mesh shine */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-transparent to-pink-500/10 opacity-0 group-hover/screen:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    {/* Launch Action Overlay Indicator */}
                    <div className="absolute inset-0 bg-black/35 opacity-0 group-hover/screen:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                      <span className="text-[10px] font-extrabold text-white tracking-[0.2em] uppercase bg-[#1a0f3c]/90 border border-[#3c2584]/30 px-3.5 py-2 rounded-xl shadow-lg">
                        Click to Expand
                      </span>
                    </div>
                  </div>

                  {/* Thumbnails Row */}
                  {projectImages.length > 1 && (
                    <div className="bg-slate-50 dark:bg-[#11092e]/40 p-4 border-t border-slate-200/60 dark:border-[#2d1e5a]/60 flex items-center justify-center gap-3 overflow-x-auto select-none no-scrollbar">
                      {projectImages.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveImageIndex(idx)}
                          className={`w-16 md:w-20 aspect-[16/10] rounded-lg border-2 overflow-hidden transition-all duration-300 shrink-0 cursor-pointer ${
                            activeImageIndex === idx
                              ? "border-indigo-500 scale-105 shadow-md shadow-indigo-500/10"
                              : "border-slate-200 dark:border-[#2d1e5a] opacity-70 hover:opacity-100"
                          }`}
                        >
                          <img src={img} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })()}

            {/* Key Features card */}
            {project.features && project.features.length > 0 && (
              <motion.div
                variants={itemVariants}
                className="bg-[#ffffff]/90 dark:bg-[#160f38]/90 border border-slate-200 dark:border-[#2d1e5a] backdrop-blur-xl rounded-[28px] p-6 md:p-8 space-y-6 shadow-sm"
              >
                <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-[#f0ebff] flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border border-indigo-500/20 shadow-sm shrink-0">
                    <FiCheckCircle className="w-5 h-5" />
                  </div>
                  <span>Key Features &amp; Architecture</span>
                </h2>

                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3.5 text-sm text-slate-700 dark:text-[#beafdc] font-semibold leading-relaxed"
                    >
                      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-500 shrink-0 mt-0.5 shadow-sm">
                        <FiCheckCircle className="w-3 h-3" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

          </div>

          {/* Sidebar Action Column */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* CTA project links card */}
            <motion.div
              variants={itemVariants}
              className="bg-[#ffffff]/90 dark:bg-[#160f38]/90 border border-slate-200 dark:border-[#2d1e5a] backdrop-blur-xl rounded-[28px] p-6 space-y-5 shadow-sm"
            >
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 select-none">
                Resource Links
              </h3>

              <div className="flex flex-col gap-3">
                {project.live && project.live !== "#" && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="group/live flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all duration-350 shadow-[0_4px_12px_rgba(99,102,241,0.2)] hover:shadow-[0_8px_20px_rgba(168,85,247,0.35)] hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <FiExternalLink className="group-hover/live:translate-x-0.5 group-hover/live:-translate-y-0.5 transition-transform duration-300" />
                    <span>{project.type === "company" ? "Visit Live Site" : "Launch Live Demo"}</span>
                  </a>
                )}

                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="group/repo flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 border border-slate-200 hover:border-indigo-500/50 dark:bg-[#0f0a28]/60 dark:hover:bg-indigo-950/40 dark:text-[#beafdc] dark:hover:text-indigo-300 dark:border-[#2d1e5a]/80 dark:hover:border-indigo-500/50 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all duration-350 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98] hover:shadow-md shadow-sm"
                  >
                    <FiGithub className="group-hover/repo:rotate-12 transition-transform duration-300" />
                    <span>View Repository</span>
                  </a>
                )}
              </div>
            </motion.div>

            {/* Tech Stack items card */}
            {project.stack && project.stack.length > 0 && (
              <motion.div
                variants={itemVariants}
                className="bg-[#ffffff]/90 dark:bg-[#160f38]/90 border border-slate-200 dark:border-[#2d1e5a] backdrop-blur-xl rounded-[28px] p-6 space-y-4 shadow-sm"
              >
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2 select-none">
                  <FiLayers className="text-indigo-500" />
                  <span>Technologies Used</span>
                </h3>

                <div className="flex flex-wrap gap-2 pt-2 select-none">
                  {project.stack.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs font-bold px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-[#261f5c] text-indigo-700 dark:text-[#e3dbff] border border-indigo-100 dark:border-[#3c3182] shadow-sm transition-all duration-300 hover:bg-indigo-500 dark:hover:bg-indigo-500 hover:text-white dark:hover:text-white hover:border-transparent dark:hover:border-transparent hover:scale-105 active:scale-95 cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Quick specifications context */}
            <motion.div
              variants={itemVariants}
              className="bg-[#ffffff]/90 dark:bg-[#160f38]/90 border border-slate-200 dark:border-[#2d1e5a] backdrop-blur-xl rounded-[28px] p-6 space-y-4 text-xs shadow-sm"
            >
              <h4 className="font-extrabold text-slate-700 dark:text-[#f0ebff] flex items-center gap-2 uppercase tracking-wider text-sm select-none">
                <FiInfo className="text-indigo-500" /> 
                <span>Specifications</span>
              </h4>
              <p className="text-slate-600 dark:text-[#beafdc] font-medium leading-relaxed">
                This workspace is maintained as part of Imtiaz Ali's active code portfolio. 
                All components are verified locally for responsive layouts and fast client-side performance.
              </p>
            </motion.div>

          </div>
        </motion.div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (() => {
          const projectImages = project.images && project.images.length > 0 ? project.images : [project.image];
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsLightboxOpen(false)}
              className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 select-none"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all cursor-pointer z-50 border border-white/5 active:scale-90"
                title="Close Preview"
              >
                <FiX className="w-6 h-6" />
              </button>

              {/* Slider Image Container */}
              <div 
                className="relative max-w-5xl w-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Prev Button */}
                {projectImages.length > 1 && (
                  <button
                    onClick={() => {
                      setLightboxIndex((prev) => (prev === 0 ? projectImages.length - 1 : prev - 1));
                    }}
                    className="absolute left-4 z-50 text-white/85 hover:text-white bg-black/55 hover:bg-black/80 p-3 rounded-full border border-white/10 hover:scale-105 active:scale-95 transition-all text-xl cursor-pointer"
                    title="Previous Image"
                  >
                    &#10094;
                  </button>
                )}

                {/* Lightbox Image */}
                <motion.img
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  src={projectImages[lightboxIndex]}
                  alt={`${project.title} Preview ${lightboxIndex + 1}`}
                  className="max-h-[80vh] max-w-full object-contain rounded-xl shadow-2xl"
                />

                {/* Next Button */}
                {projectImages.length > 1 && (
                  <button
                    onClick={() => {
                      setLightboxIndex((prev) => (prev === projectImages.length - 1 ? 0 : prev + 1));
                    }}
                    className="absolute right-4 z-50 text-white/85 hover:text-white bg-black/55 hover:bg-black/80 p-3 rounded-full border border-white/10 hover:scale-105 active:scale-95 transition-all text-xl cursor-pointer"
                    title="Next Image"
                  >
                    &#10095;
                  </button>
                )}
              </div>

              {/* Image Counter & Slider Thumbnails */}
              <div className="mt-6 flex flex-col items-center gap-3" onClick={(e) => e.stopPropagation()}>
                <span className="text-white/60 text-xs font-semibold tracking-wider">
                  Image {lightboxIndex + 1} of {projectImages.length}
                </span>
                {projectImages.length > 1 && (
                  <div className="flex gap-2">
                    {projectImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setLightboxIndex(idx)}
                        className={`w-12 h-8 rounded border-2 overflow-hidden transition-all duration-300 shrink-0 cursor-pointer ${
                          lightboxIndex === idx ? "border-indigo-500 scale-105" : "border-white/20 opacity-60 hover:opacity-100"
                        }`}
                      >
                        <img src={img} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
};

export default ProjectDetails;