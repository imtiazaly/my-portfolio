import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiAward,
  FiChevronLeft,
  FiChevronRight,
  FiMaximize2,
  FiX,
  FiShield,
  FiCheckCircle,
  FiExternalLink,
} from "react-icons/fi";
import certifications from "../../data/certifications";

// 3D Rotational Slide Animation
const trophyVariants = {
  enter: (direction) => ({
    rotateY: direction > 0 ? 35 : -35,
    x: direction > 0 ? 120 : -120,
    opacity: 0,
    scale: 0.88,
    filter: "blur(4px)",
  }),
  center: {
    rotateY: 0,
    x: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: (direction) => ({
    rotateY: direction > 0 ? -35 : 35,
    x: direction > 0 ? -120 : 120,
    opacity: 0,
    scale: 0.88,
    filter: "blur(4px)",
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const Certifications = () => {
  const [[activeIdx, direction], setPage] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const total = certifications.length;

  const current = certifications[activeIdx] || certifications[0];

  const paginate = (newDirection) => {
    let nextIdx = activeIdx + newDirection;
    if (nextIdx < 0) nextIdx = total - 1;
    if (nextIdx >= total) nextIdx = 0;
    setPage([nextIdx, newDirection]);
  };

  const jumpTo = (index) => {
    if (index === activeIdx) return;
    setPage([index, index > activeIdx ? 1 : -1]);
  };

  // Auto-advance (pauses on hover or modal view)
  useEffect(() => {
    if (isPaused || isModalOpen || total <= 1) return;
    const timer = setInterval(() => {
      paginate(1);
    }, 6000);
    return () => clearInterval(timer);
  }, [activeIdx, isPaused, isModalOpen, total]);

  return (
    <section
      id="certifications"
      className="py-24 px-4 sm:px-6 relative overflow-hidden bg-transparent select-none"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-xs font-mono font-bold text-amber-600 dark:text-amber-400 mb-3 shadow-xs">
            <FiShield className="w-3.5 h-3.5" />
            <span>AUTHENTICATED CREDENTIAL VAULT</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Engineering Honors & Certifications
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-amber-500 via-indigo-500 to-pink-500 mx-auto mt-4 rounded-full shadow-xs" />
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-3 font-medium">
            Step inside the 3D exhibition gallery — verified industry
            achievements on display.
          </p>
        </div>

        {/* ─── 3D ARCHITECTURAL SHOWROOM CHAMBER ─── */}
        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Arrows */}
          <button
            onClick={() => paginate(-1)}
            aria-label="Previous Showcase"
            className="absolute -left-3 sm:-left-8 lg:-left-12 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-white/90 dark:bg-[#1b143d]/90 backdrop-blur-xl border border-slate-200 dark:border-white/[0.1] shadow-2xl flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-amber-500 dark:hover:text-amber-400 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <FiChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => paginate(1)}
            aria-label="Next Showcase"
            className="absolute -right-3 sm:-right-8 lg:-right-12 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-white/90 dark:bg-[#1b143d]/90 backdrop-blur-xl border border-slate-200 dark:border-white/[0.1] shadow-2xl flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-amber-500 dark:hover:text-amber-400 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <FiChevronRight className="w-6 h-6" />
          </button>

          {/* 3D Box Perspective Wrapper */}
          <div
            className="relative rounded-3xl overflow-hidden border border-slate-300/80 dark:border-white/[0.08] shadow-[0_25px_70px_rgba(0,0,0,0.15)] dark:shadow-[0_25px_80px_rgba(0,0,0,0.6)] bg-gradient-to-b from-slate-100 via-slate-200 to-slate-300 dark:from-[#0f0a24] dark:via-[#090518] dark:to-[#05030e] min-h-[580px] sm:min-h-[620px] flex flex-col justify-between"
            style={{ perspective: "1200px" }}
          >
            {/* 1. CEILING ARCHITECTURE WITH SPOTLIGHT FIXTURES */}
            <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-slate-300/60 dark:from-[#1b123d] to-transparent z-10 pointer-events-none flex justify-center">
              {/* Dual Spotlights radiating down */}
              <div className="w-40 sm:w-56 h-full bg-gradient-to-b from-amber-400/25 via-amber-400/5 to-transparent blur-xl -rotate-12 translate-x-12" />
              <div className="w-40 sm:w-56 h-full bg-gradient-to-b from-indigo-400/25 via-indigo-400/5 to-transparent blur-xl rotate-12 -translate-x-12" />
              {/* Center Downlight emitter */}
              <div className="absolute top-0 w-32 h-2 rounded-b-full bg-amber-400/80 dark:bg-amber-300 blur-xs shadow-[0_0_25px_rgba(251,191,36,0.8)]" />
            </div>

            {/* 2. ARCHITECTURAL SIDE WALLS (GIVING 3D DEPTH) */}
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-14 bg-gradient-to-r from-slate-400/30 dark:from-[#060312] to-transparent border-r border-slate-300/50 dark:border-white/[0.03] z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-14 bg-gradient-to-l from-slate-400/30 dark:from-[#060312] to-transparent border-l border-slate-300/50 dark:border-white/[0.03] z-10 pointer-events-none" />

            {/* 3. CENTER SHOWROOM ARENA (WHERE THE TROPHY IS EXHIBITED) */}
            <div className="relative flex-1 flex flex-col items-center justify-center p-4 sm:p-8 z-20">
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={current.id}
                  custom={direction}
                  variants={trophyVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="flex flex-col items-center max-w-lg w-full"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* ─── A. THE ACRYLIC CERTIFICATE FRAME (TROPHY TOP) ─── */}
                  <div
                    onClick={() => setIsModalOpen(true)}
                    className="group/frame relative w-full aspect-[16/10] sm:aspect-[16/9.5] rounded-2xl p-[3px] bg-gradient-to-br from-amber-400 via-slate-300 to-amber-600 dark:from-amber-400/80 dark:via-purple-500/40 dark:to-amber-600/80 shadow-[0_20px_50px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_60px_rgba(245,158,11,0.2)] cursor-pointer hover:scale-[1.02] transition-transform duration-500"
                  >
                    {/* Corner Metallic Clamps */}
                    <span className="absolute -top-1.5 -left-1.5 w-4 h-4 rounded-sm bg-gradient-to-br from-amber-300 to-amber-600 shadow-md z-30 border border-amber-200" />
                    <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-sm bg-gradient-to-br from-amber-300 to-amber-600 shadow-md z-30 border border-amber-200" />
                    <span className="absolute -bottom-1.5 -left-1.5 w-4 h-4 rounded-sm bg-gradient-to-br from-amber-300 to-amber-600 shadow-md z-30 border border-amber-200" />
                    <span className="absolute -bottom-1.5 -right-1.5 w-4 h-4 rounded-sm bg-gradient-to-br from-amber-300 to-amber-600 shadow-md z-30 border border-amber-200" />

                    {/* Inner Glass Enclosure */}
                    <div className="relative w-full h-full rounded-[14px] overflow-hidden bg-slate-950 flex items-center justify-center">
                      {/* Certificate Image */}
                      <img
                        src={current.image}
                        alt={current.title}
                        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover/frame:scale-105"
                      />

                      {/* Glass Diagonal Glare Sheen */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent pointer-events-none" />

                      {/* Top Overlay Badge */}
                      <div className="absolute top-3 left-3 z-20">
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono font-extrabold uppercase tracking-widest text-white bg-black/70 backdrop-blur-md border border-white/20 shadow-md">
                          {current.issuer}
                        </span>
                      </div>

                      {/* Hover Overlay: Examine Certificate Prompt */}
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-xs opacity-0 group-hover/frame:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 text-white z-30">
                        <div className="w-11 h-11 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center shadow-lg text-amber-300">
                          <FiMaximize2 className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider font-mono">
                          Inspect Certificate
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ─── B. THE BRUSHED METAL CONNECTING STEM ─── */}
                  <div className="relative w-8 h-10 sm:h-12 bg-gradient-to-b from-slate-400 via-slate-200 to-slate-500 dark:from-slate-600 dark:via-slate-400 dark:to-slate-700 shadow-md border-x border-slate-400/40 z-10 flex items-center justify-center">
                    {/* Metal bracket highlights */}
                    <div className="w-1.5 h-full bg-white/40 dark:bg-white/20 blur-[1px]" />
                  </div>

                  {/* ─── C. THE HEAVY ENGRAVED TROPHY PEDESTAL / BASE ─── */}
                  <div className="relative w-full max-w-sm rounded-xl p-[2px] bg-gradient-to-r from-amber-600 via-amber-400 to-amber-700 shadow-2xl z-20">
                    <div className="bg-[#ffffff] dark:bg-[#120a28] rounded-[10px] p-4 text-center border border-amber-500/30">
                      {/* Gold Engraved Plaque Header */}
                      <div className="flex items-center justify-center gap-2 text-amber-600 dark:text-amber-400 mb-1">
                        <FiAward className="w-4 h-4" />
                        <span className="text-[10px] font-mono font-black uppercase tracking-[0.25em]">
                          AWARDED TO: {current.recipient || "IMTIAZ ALI"}
                        </span>
                      </div>

                      <h4 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white truncate">
                        {current.title}
                      </h4>

                      <div className="flex items-center justify-center gap-3 mt-2 text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400">
                        <span>Issued: {current.issueDate}</span>
                        <span>•</span>
                        <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <FiCheckCircle className="w-3 h-3" />
                          <span>Verified</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* 4. GLOSSY SHOWROOM FLOOR WITH REFLECTION */}
            <div className="relative h-20 bg-gradient-to-t from-slate-400/40 dark:from-black via-slate-300/20 dark:via-[#160f38]/60 to-transparent border-t border-slate-300 dark:border-white/[0.05] flex items-center justify-center z-10">
              {/* Floor spotlight reflection pool */}
              <div className="w-80 h-10 rounded-full bg-amber-400/15 dark:bg-amber-400/10 blur-xl pointer-events-none" />
              {/* Pedestal shadow */}
              <div className="absolute top-1 w-64 h-3 bg-black/30 dark:bg-black/80 blur-md rounded-full pointer-events-none" />
            </div>
          </div>
        </div>

        {/* ─── SHOWROOM SELECTOR PEDESTAL BAR (ALL CERTIFICATES) ─── */}
        <div className="mt-8 flex flex-wrap justify-center items-center gap-2 select-none">
          {certifications.map((item, idx) => {
            const isSelected = idx === activeIdx;

            return (
              <button
                key={item.id}
                onClick={() => jumpTo(idx)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-semibold transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-lg shadow-amber-500/20 scale-105"
                    : "bg-white/70 dark:bg-[#160f38]/70 backdrop-blur-md border-slate-200 dark:border-[#2d1e5a] text-slate-600 dark:text-slate-300 hover:border-amber-400 hover:scale-102"
                }`}
              >
                <span className="font-mono text-[10px] opacity-75">
                  #{String(item.id).padStart(2, "0")}
                </span>
                <span className="truncate max-w-[140px]">
                  {item.title.split(" ")[0]} {item.title.split(" ")[1] || ""}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── LUXURY INSPECTION ZOOM MODAL ─── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-3xl bg-white dark:bg-[#120a2e] border-2 border-amber-500/40 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 dark:bg-white/[0.08] text-slate-600 dark:text-slate-200 flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer z-20"
              >
                <FiX className="w-5 h-5" />
              </button>

              {/* High-Res Certificate Full Plaque */}
              <div className="space-y-6">
                <div className="aspect-[16/10] w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-white/[0.1] shadow-xl bg-black">
                  <img
                    src={current.image}
                    alt={current.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-slate-200/60 dark:border-white/[0.06]">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {current.title}
                    </h3>
                    <p className="text-xs font-mono text-amber-600 dark:text-amber-400 mt-0.5">
                      Issued to: {current.recipient || "Imtiaz Ali"} •{" "}
                      {current.issuer}
                    </p>
                  </div>

                  <a
                    href={current.image}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer shrink-0"
                  >
                    <span>View High-Res Image</span>
                    <FiExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certifications;