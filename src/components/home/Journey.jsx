import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiBookOpen, FiLayers, FiCompass, FiGithub } from "react-icons/fi";
import profile from "../../data/profile";

const uiMeta = [
  {
    icon: <FiBookOpen className="w-5 h-5" />,
    color: "from-blue-500 to-indigo-500",
    hoverColor: "group-hover:from-blue-500 group-hover:to-indigo-500",
    glowColor: "rgba(59, 130, 246, 0.25)",
  },
  {
    icon: <FiGithub className="w-5 h-5" />,
    color: "from-indigo-500 to-pink-500",
    hoverColor: "group-hover:from-indigo-500 group-hover:to-pink-500",
    glowColor: "rgba(168, 85, 247, 0.25)",
  },
  {
    icon: <FiLayers className="w-5 h-5" />,
    color: "from-pink-500 to-rose-500",
    hoverColor: "group-hover:from-pink-500 group-hover:to-rose-500",
    glowColor: "rgba(244, 63, 94, 0.25)",
  },
  {
    icon: <FiCompass className="w-5 h-5" />,
    color: "from-rose-500 to-amber-500",
    hoverColor: "group-hover:from-rose-500 group-hover:to-amber-500",
    glowColor: "rgba(245, 158, 11, 0.25)",
  },
];

const milestones = profile.journey.map((item, idx) => ({
  ...item,
  ...uiMeta[idx % uiMeta.length],
}));

const Journey = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = milestones.length;

  // Auto-scroll vertically every 4 seconds (pauses on mouse hover)
  useEffect(() => {
    if (isPaused || total <= 1) return;

    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % total);
    }, 4000);

    return () => clearInterval(timer);
  }, [total, isPaused]);

  return (
    <section
      id="journey"
      className="py-24 px-6 relative overflow-hidden bg-transparent"
    >
      {/* Background ambient space glow highlights */}
      <div className="glow-node w-[500px] h-[500px] bg-pink-500/5 left-[5%] top-[35%] rounded-full blur-[120px] pointer-events-none" />
      <div className="glow-node w-[400px] h-[400px] bg-indigo-500/5 right-[5%] bottom-[15%] rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-indigo-500 dark:text-indigo-400 mb-3 select-none">
            Origin story
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            My Learning Journey
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-indigo-500 to-pink-500 mx-auto mt-4 rounded-full shadow-sm" />
        </div>

        {/* Vertical Reel Stage Container */}
        <div
          className="relative w-full h-[530px] md:h-[490px] overflow-hidden select-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Glowing Gradient Vertical Timeline Line Track */}
          <div className="absolute left-[20px] md:left-[32px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-blue-500 via-indigo-500 via-pink-500 via-rose-500 to-amber-500 opacity-60 dark:opacity-40" />

          {/* Cards Render Loop */}
          {milestones.map((stone, index) => {
            // Circular shortest distance from active card
            let diff = index - activeIdx;
            while (diff > total / 2) diff -= total;
            while (diff < -total / 2) diff += total;

            const isCenter = diff === 0;
            const isVisible = Math.abs(diff) <= 1;

            return (
              <motion.div
                key={stone.phase}
                onClick={() => !isCenter && setActiveIdx(index)}
                initial={false}
                animate={{
                  y: `calc(-50% + ${diff * 100}% + ${diff * 1.25}rem)`,
                  scale: isCenter ? 1.02 : 0.94,
                  opacity: isCenter ? 1 : isVisible ? 0.48 : 0,
                  zIndex: isCenter ? 30 : isVisible ? 10 : 0,
                }}
                transition={{
                  y: { type: "spring", stiffness: 220, damping: 26 },
                  scale: { duration: 0.45, ease: [0.25, 1, 0.5, 1] },
                  opacity: { duration: 0.35 },
                }}
                style={{
                  pointerEvents: isVisible ? "auto" : "none",
                }}
                className={`absolute left-[44px] md:left-[64px] w-[calc(100%-48px)] md:w-[calc(100%-80px)] h-[155px] md:h-[135px] top-1/2 ${
                  !isCenter
                    ? "cursor-pointer hover:opacity-75 transition-opacity"
                    : "cursor-default"
                }`}
              >
                {/* Glowing Circle Timeline bullet / phase identifier */}
                <div
                  className={`absolute -left-[40px] md:-left-[54px] top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 md:w-11 md:h-11 rounded-full bg-white dark:bg-[#160f38] border transition-all duration-500 select-none z-20 ${
                    isCenter
                      ? "border-indigo-500 dark:border-indigo-400 scale-110 shadow-[0_0_20px_rgba(99,102,241,0.45)]"
                      : "border-slate-200 dark:border-[#2d1e5a] shadow-sm"
                  }`}
                >
                  <span
                    className={`text-xs font-extrabold transition-colors duration-300 ${
                      isCenter
                        ? "text-indigo-600 dark:text-indigo-400"
                        : "text-slate-400 dark:text-[#beafdc]"
                    }`}
                  >
                    {stone.phase}
                  </span>
                </div>

                {/* Outer Glow Wrapper */}
                <div className="glow-card-wrapper rounded-[20px] p-[1px] w-full h-full">
                  {/* Moving Neon Border: ONLY active on Center Card (No hover needed) */}
                  <div
                    className={`glow-card-border rounded-[20px] transition-opacity duration-500 ${
                      isCenter ? "!opacity-100" : "!opacity-0"
                    }`}
                  />

                  {/* Inner Content Card (Solid Opaque, Zero bleed) */}
                  <div
                    className={`relative z-10 w-full h-full bg-[#ffffff] dark:bg-[#160f38] border ${
                      isCenter
                        ? "border-indigo-500/40 dark:border-indigo-400/30 shadow-[0_15px_40px_rgba(99,102,241,0.12)] dark:shadow-[0_15px_40px_rgba(167,92,255,0.25)]"
                        : "border-slate-200 dark:border-[#2d1e5a]"
                    } rounded-[19px] p-4 md:p-6 grid md:grid-cols-12 gap-4 md:gap-6 items-center overflow-hidden transition-all duration-500`}
                  >
                    {/* Category-themed glowing spot background */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[19px]"
                      style={{
                        background: `radial-gradient(circle at 10% 10%, ${stone.glowColor} 0%, transparent 60%)`,
                      }}
                    />

                    {/* Year and Icon Column */}
                    <div className="md:col-span-3 space-y-2 relative z-10 select-none">
                      <span
                        className={`inline-flex text-[10px] font-extrabold tracking-widest uppercase text-white bg-gradient-to-r ${stone.color} px-3 py-1 rounded-full shadow-sm`}
                      >
                        {stone.year}
                      </span>

                      <div className="flex items-center gap-2.5">
                        <div
                          className={`flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-xl bg-slate-100 dark:bg-slate-900/60 shadow-inner border border-slate-200/10 dark:border-white/[0.02] transition-colors duration-300 ${
                            isCenter
                              ? "bg-gradient-to-br from-indigo-500 to-pink-500 text-white"
                              : "text-slate-600 dark:text-[#beafdc]"
                          }`}
                        >
                          {stone.icon}
                        </div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                          Milestone
                        </span>
                      </div>
                    </div>

                    {/* Text Details Column */}
                    <div className="md:col-span-9 space-y-1.5 relative z-10">
                      <h3
                        className={`text-base md:text-xl font-extrabold leading-snug transition-colors duration-300 ${
                          isCenter
                            ? "text-indigo-600 dark:text-indigo-400"
                            : "text-slate-900 dark:text-[#f0ebff]"
                        }`}
                      >
                        {stone.title}
                      </h3>
                      <p className="text-xs md:text-sm text-slate-650 dark:text-[#beafdc] font-medium leading-relaxed line-clamp-2">
                        {stone.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Phase Indicator Navigation Dots */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {milestones.map((stone, i) => (
            <button
              key={i}
              onClick={() => setActiveIdx(i)}
              aria-label={`Go to phase ${stone.phase}`}
              className={`h-2 rounded-full transition-all duration-500 ${
                i === activeIdx
                  ? "w-8 bg-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.6)]"
                  : "w-2 bg-slate-300 dark:bg-slate-700 hover:bg-indigo-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Journey;
