import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiAward,
  FiCheckCircle,
  FiChevronLeft,
  FiChevronRight,
  FiMaximize2,
  FiX,
  FiShield,
  FiCalendar,
  FiBriefcase,
  FiLayers,
} from "react-icons/fi";
import certifications from "../../data/certifications";

// Directional slide animation variants
const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
    scale: 0.94,
    filter: "blur(6px)",
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: (direction) => ({
    x: direction > 0 ? -100 : 100,
    opacity: 0,
    scale: 0.94,
    filter: "blur(6px)",
    transition: {
      duration: 0.35,
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

  // Auto-advance every 5.5s (pauses on hover or when modal is open)
  useEffect(() => {
    if (isPaused || isModalOpen || total <= 1) return;
    const timer = setInterval(() => {
      paginate(1);
    }, 5500);
    return () => clearInterval(timer);
  }, [activeIdx, isPaused, isModalOpen, total]);

  return (
    <section
      id="certifications"
      className="py-24 px-4 sm:px-6 relative overflow-hidden bg-transparent"
    >
      {/* ─── SHOWROOM ATMOSPHERE & CEILING SPOTLIGHTS ─── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-indigo-500/15 via-purple-500/5 to-transparent blur-[120px] pointer-events-none rounded-full" />
      <div className="glow-node w-[450px] h-[450px] bg-indigo-500/5 left-[10%] top-[25%] rounded-full blur-[100px] pointer-events-none" />
      <div className="glow-node w-[450px] h-[450px] bg-pink-500/5 right-[10%] bottom-[15%] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in select-none">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 mb-3 shadow-xs">
            <FiShield className="w-3.5 h-3.5 text-indigo-500" />
            <span>CREDENTIAL SHOWROOM</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Verified Certifications
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-indigo-500 to-pink-500 mx-auto mt-4 rounded-full shadow-xs" />
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-3 font-medium">
            Industry accredited qualifications & engineering competencies.
          </p>
        </div>

        {/* ─── SHOWROOM MAIN STAGE (AT A TIME 1 CARD) ─── */}
        <div
          className="relative max-w-3xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Showroom Left Navigation Glass Arrow */}
          <button
            onClick={() => paginate(-1)}
            aria-label="Previous Certificate"
            className="absolute -left-4 sm:-left-12 lg:-left-16 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/80 dark:bg-[#160f38]/80 backdrop-blur-xl border border-slate-200 dark:border-[#2d1e5a] shadow-lg flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <FiChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Showroom Right Navigation Glass Arrow */}
          <button
            onClick={() => paginate(1)}
            aria-label="Next Certificate"
            className="absolute -right-4 sm:-right-12 lg:-right-16 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white/80 dark:bg-[#160f38]/80 backdrop-blur-xl border border-slate-200 dark:border-[#2d1e5a] shadow-lg flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <FiChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Spotlight Stage Vault Card */}
          <div className="relative min-h-[460px] flex items-center justify-center">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full"
              >
                {/* Moving Neon Border Frame */}
                <div className="glow-card-wrapper rounded-3xl p-[1px] w-full shadow-2xl">
                  <div className="glow-card-border rounded-3xl !opacity-100" />

                  {/* Inner Solid Card Canvas */}
                  <div className="relative z-10 bg-[#ffffff] dark:bg-[#160f38] border border-slate-200 dark:border-[#2d1e5a] rounded-[23px] overflow-hidden p-6 sm:p-10 flex flex-col justify-between">
                    {/* Atmospheric Watermark / Background Accent */}
                    <div
                      className="absolute -right-16 -top-16 w-64 h-64 opacity-15 pointer-events-none rounded-full blur-2xl"
                      style={{ background: current.accentColor }}
                    />

                    {/* Top Meta Bar */}
                    <div className="flex items-center justify-between pb-6 border-b border-slate-200/60 dark:border-white/[0.06] relative z-10 select-none">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-indigo-50 dark:bg-white/[0.04] border border-indigo-200/40 dark:border-white/[0.08] shadow-inner text-indigo-600 dark:text-indigo-400">
                          <FiAward className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                              CERTIFICATE #{String(current.id).padStart(2, "0")}
                            </span>
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          </div>
                          <p className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mt-0.5">
                            <FiBriefcase className="text-indigo-500 w-3.5 h-3.5" />
                            <span>{current.issuer}</span>
                          </p>
                        </div>
                      </div>

                      {/* Badge / Issue Date */}
                      <div className="flex items-center gap-2">
                        <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 px-3 py-1 rounded-lg bg-slate-100 dark:bg-black/30 border border-slate-200/50 dark:border-white/[0.04]">
                          <FiCalendar className="w-3.5 h-3.5 text-indigo-500" />
                          <span>{current.issueDate}</span>
                        </span>

                        <span
                          className={`text-[10px] font-mono font-extrabold uppercase tracking-widest text-white px-3 py-1 rounded-full shadow-xs bg-gradient-to-r ${current.theme}`}
                        >
                          {current.badge}
                        </span>
                      </div>
                    </div>

                    {/* Main Certificate Content */}
                    <div className="py-8 space-y-5 relative z-10">
                      <div className="space-y-2">
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight">
                          {current.title}
                        </h3>
                        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                          {current.description}
                        </p>
                      </div>

                      {/* Competency Skills Capsules */}
                      <div className="space-y-2.5 pt-2">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                          <FiLayers className="text-indigo-500" />
                          <span>Key Competencies Mastered</span>
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {current.skills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-[#1b1442] border border-slate-200/80 dark:border-white/[0.08] text-slate-800 dark:text-slate-200 shadow-2xs hover:border-indigo-500/40 transition-colors"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Verification Pedestal Row */}
                    <div className="pt-6 border-t border-slate-200/60 dark:border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
                      {/* Official Security Seal Badge */}
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 dark:text-amber-400 shadow-xs">
                          <FiCheckCircle className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                            <span>Officially Verified Credential</span>
                          </p>
                          <p className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
                            Issued by accredited authority
                          </p>
                        </div>
                      </div>

                      {/* Action Button: Open Luxury Modal */}
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-xs shadow-md shadow-indigo-500/20 flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer"
                      >
                        <FiMaximize2 className="w-3.5 h-3.5" />
                        <span>Examine Certificate</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ─── SHOWROOM FLOOR GLASS REFLECTION ─── */}
          <div className="h-10 mx-auto max-w-2xl bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent blur-md -mt-2 rounded-full pointer-events-none" />
        </div>

        {/* ─── SHOWROOM SELECTOR PEDESTAL BAR ─── */}
        <div className="mt-10 flex flex-wrap justify-center items-center gap-2.5 select-none">
          {certifications.map((item, idx) => {
            const isSelected = idx === activeIdx;

            return (
              <button
                key={item.id}
                onClick={() => jumpTo(idx)}
                className={`flex items-center gap-2 px-4 py-2 rounded-2xl border text-xs font-semibold transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-500/30 scale-105"
                    : "bg-white/60 dark:bg-[#160f38]/60 backdrop-blur-md border-slate-200 dark:border-[#2d1e5a] text-slate-600 dark:text-slate-300 hover:border-indigo-400 hover:scale-102"
                }`}
              >
                <span className="font-mono text-[10px] opacity-75">
                  #{String(item.id).padStart(2, "0")}
                </span>
                <span className="truncate max-w-[150px] sm:max-w-[180px]">
                  {item.issuer.split("/")[0].trim()}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── LUXURY PRODUCT EXAMINATION MODAL ─── */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Modal Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-xl transition-opacity"
            />

            {/* Modal Presentation Plaque */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-2xl bg-white dark:bg-[#120a2e] border border-slate-200 dark:border-[#38266e] rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-10 select-none"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/[0.08] text-slate-500 dark:text-slate-300 flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer"
              >
                <FiX className="w-5 h-5" />
              </button>

              {/* Certificate Formal Plaque Layout */}
              <div className="border-4 border-double border-indigo-500/20 dark:border-indigo-400/20 p-6 sm:p-8 rounded-2xl relative bg-radial from-indigo-500/[0.02] to-transparent">
                {/* Header */}
                <div className="text-center space-y-2 pb-6 border-b border-slate-200/60 dark:border-white/[0.06]">
                  <div className="w-12 h-12 mx-auto rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    <FiAward className="w-7 h-7" />
                  </div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-indigo-500 font-extrabold">
                    CERTIFICATE OF ENGINEERING RECOGNITION
                  </p>
                  <h4 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                    {current.title}
                  </h4>
                </div>

                {/* Body */}
                <div className="py-6 space-y-4 text-center">
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 uppercase tracking-widest font-mono">
                    Awarded By
                  </p>
                  <p className="text-lg sm:text-xl font-extrabold text-indigo-600 dark:text-indigo-400">
                    {current.issuer}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto leading-relaxed">
                    {current.description}
                  </p>

                  <div className="flex flex-wrap justify-center gap-1.5 pt-2">
                    {current.skills.map((s, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Sign-off & Seal */}
                <div className="pt-6 border-t border-slate-200/60 dark:border-white/[0.06] flex items-center justify-between text-left">
                  <div>
                    <p className="text-[10px] font-mono uppercase text-slate-400">
                      Date of Issue
                    </p>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {current.issueDate}
                    </p>
                  </div>

                  {/* Gold Rosette Seal */}
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400">
                    <FiCheckCircle className="w-4 h-4" />
                    <span className="text-[10px] font-mono font-extrabold uppercase tracking-wider">
                      VALIDATED RECORD
                    </span>
                  </div>
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