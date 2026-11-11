import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCalendar,
  FiCheckCircle,
  FiTerminal,
  FiGitBranch,
  FiLayers,
  FiPlay,
  FiPause,
} from "react-icons/fi";
import experience from "../../data/experience";

const uiMeta = {
  1: {
    themeColor: "from-indigo-500 to-violet-600",
    glowColor: "rgba(99, 102, 241, 0.15)",
  },
  2: {
    themeColor: "from-pink-500 to-rose-600",
    glowColor: "rgba(244, 63, 94, 0.15)",
  },
  3: {
    themeColor: "from-emerald-500 to-teal-600",
    glowColor: "rgba(16, 185, 129, 0.15)",
  },
};

const milestones = experience.map((item) => ({
  ...item,
  ...uiMeta[item.id],
}));

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Experience = () => {
  const [activeNode, setActiveNode] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const activeMilestone =
    milestones.find((m) => m.id === activeNode) || milestones[0];

  // Dynamic Autoplay (cycles through all milestones automatically)
  useEffect(() => {
    if (!isPlaying || milestones.length <= 1) return;

    const timer = setInterval(() => {
      setActiveNode((prev) => {
        const currentIndex = milestones.findIndex((m) => m.id === prev);
        const nextIndex = (currentIndex + 1) % milestones.length;
        return milestones[nextIndex].id;
      });
    }, 5500);

    return () => clearInterval(timer);
  }, [isPlaying]);

  // Dynamic height calculation for the Git SVG based on node count
  const svgHeight = Math.max(320, milestones.length * 80 + 30);

  return (
    <section
      id="experience"
      className="py-24 px-6 relative overflow-hidden bg-transparent"
    >
      {/* Background ambient glow */}
      <div className="glow-node w-[450px] h-[450px] bg-indigo-500/5 left-[-100px] top-[20%] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Title */}
        <div className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-indigo-500 dark:text-indigo-400 mb-3">
            Career Pathway
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
            Professional Experience
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-indigo-500 to-pink-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Interactive Workspace Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.08 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          {/* Left Column: Dynamic & Scrollable SVG Git branch visualizer */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-4 glow-card-wrapper rounded-[24px] p-[1px] h-[680px] w-full"
          >
            <div className="glow-card-border rounded-[24px]" />

            <div className="relative z-10 w-full h-full bg-[#ffffff] dark:bg-[#160f38] border border-slate-200 dark:border-[#2d1e5a] rounded-[23px] overflow-hidden p-6 flex flex-col justify-between items-center">
              {/* Header */}
              <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4 flex items-center gap-1.5 self-start select-none shrink-0">
                <FiGitBranch className="text-indigo-500" />
                <span>Git Branch Roadmap</span>
              </h3>

              {/* Scrollable Git Branch Node Area */}
              <div className="w-full flex-1 overflow-y-auto pr-1 overflow-x-hidden flex justify-center">
                <svg
                  className="w-full"
                  style={{ height: `${svgHeight}px`, minWidth: "240px" }}
                  viewBox={`0 0 240 ${svgHeight}`}
                >
                  {/* Main trunk line */}
                  <path
                    d={`M 45,20 L 45,${svgHeight - 20}`}
                    className="stroke-slate-200 dark:stroke-slate-800"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    fill="transparent"
                  />

                  {/* Dynamic Nodes and Connection Curves */}
                  {milestones.map((m, idx) => {
                    const y = 45 + idx * 80;
                    const isBranch =
                      m.id === 2 ||
                      m.badgeText?.toLowerCase().includes("intern") ||
                      m.role?.toLowerCase().includes("intern");
                    const nodeX = isBranch ? 85 : 45;
                    const isActive = activeNode === m.id;
                    const strokeColor = isBranch
                      ? "stroke-pink-500/30"
                      : "stroke-indigo-500/30";
                    const activeColor = isBranch
                      ? "fill-pink-500"
                      : "fill-indigo-500";
                    const textColor = isActive
                      ? isBranch
                        ? "fill-pink-600 dark:fill-pink-400 font-bold"
                        : "fill-indigo-600 dark:fill-indigo-400 font-bold"
                      : "fill-slate-500 dark:fill-slate-400 font-semibold";

                    return (
                      <g
                        key={m.id}
                        onClick={() => setActiveNode(m.id)}
                        className="cursor-pointer group select-none"
                      >
                        {/* Branch Curve if separated node */}
                        {isBranch && (
                          <path
                            d={`M 45,${y - 40} C 45,${y - 20} 85,${y - 20} 85,${y} C 85,${y + 20} 45,${y + 20} 45,${y + 40}`}
                            className="stroke-pink-200/70 dark:stroke-pink-500/25"
                            strokeWidth="3"
                            strokeLinecap="round"
                            fill="transparent"
                          />
                        )}

                        {/* Click target hit-box */}
                        <rect
                          x="20"
                          y={y - 25}
                          width="210"
                          height="50"
                          fill="transparent"
                        />

                        {/* Outer Circle Ring */}
                        <circle
                          cx={nodeX}
                          cy={y}
                          r="15"
                          className={`fill-white dark:fill-[#0c0824] ${strokeColor} transition-transform duration-300 group-hover:scale-110`}
                          strokeWidth="2"
                        />

                        {/* Active Glowing Circle Indicator */}
                        {isActive && (
                          <motion.circle
                            cx={nodeX}
                            cy={y}
                            r="10"
                            className={activeColor}
                            layoutId="gitActiveNodeGlow"
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 25,
                            }}
                          />
                        )}

                        {/* Center Dot */}
                        <circle
                          cx={nodeX}
                          cy={y}
                          r="5"
                          className={
                            isActive
                              ? "fill-white"
                              : "fill-slate-300 dark:fill-slate-600 group-hover:fill-indigo-400"
                          }
                        />

                        {/* Milestone Badge Text */}
                        <text
                          x={nodeX + 24}
                          y={y - 2}
                          className={`font-mono text-[11px] ${textColor} transition-colors duration-200`}
                        >
                          {m.badgeText || m.role}
                        </text>

                        {/* Period / Date subtitle */}
                        <text
                          x={nodeX + 24}
                          y={y + 14}
                          className="font-mono text-[9px] fill-slate-400 dark:fill-slate-500 select-none"
                        >
                          {m.period}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Footer Hint */}
              <p className="text-[10px] font-medium font-mono text-slate-400 dark:text-slate-500 pt-3 text-center select-none shrink-0 border-t border-slate-200/40 dark:border-white/[0.04] w-full">
                Softleed timeline (click nodes to inspect)
              </p>
            </div>
          </motion.div>

          {/* Right Column: Terminal File Inspector Card (Static Uniform Height) */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-8 glow-card-wrapper rounded-[24px] p-[1px] h-[680px] w-full"
          >
            <div className="glow-card-border rounded-[24px]" />

            <div className="relative z-10 w-full h-full bg-[#ffffff] dark:bg-[#160f38] border border-slate-200 dark:border-[#2d1e5a] rounded-[23px] overflow-hidden flex flex-col shadow-2xl">
              {/* Terminal Title Bar */}
              <div className="terminal-header px-6 py-4 flex items-center justify-between select-none shrink-0 border-b border-slate-200/60 dark:border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]" />
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dfa023]" />
                  <span className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]" />
                </div>

                <div className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500 flex items-center gap-1.5 bg-white/20 dark:bg-[#121218]/40 border border-slate-200/30 dark:border-white/[0.04] px-3.5 py-1.5 rounded-lg shadow-sm">
                  <FiTerminal className="text-indigo-500 dark:text-indigo-400 font-extrabold" />
                  <span>imtiaz@softleed-desktop: ~/experience</span>
                </div>

                <div className="flex items-center gap-3">
                  {/* Play/Pause Autoplay Toggle Button */}
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`
                      flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[9px] font-extrabold uppercase tracking-wider transition-all duration-350 shadow-sm cursor-pointer select-none active:scale-95
                      ${
                        isPlaying
                          ? "bg-emerald-500/10 dark:bg-emerald-500/20 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:border-emerald-500/50 hover:shadow-[0_0_10px_rgba(16,185,129,0.15)] animate-pulse"
                          : "bg-amber-500/10 dark:bg-amber-500/20 border-amber-500/30 text-amber-600 dark:text-amber-400 hover:border-amber-500/50 hover:shadow-[0_0_10px_rgba(245,158,11,0.15)]"
                      }
                    `}
                    title={
                      isPlaying
                        ? "Click to Pause Autoplay Rotation"
                        : "Click to Start Autoplay Rotation"
                    }
                  >
                    {isPlaying ? (
                      <>
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                        </span>
                        <FiPause className="w-3 h-3 text-emerald-500" />
                        <span>Autoplay On</span>
                      </>
                    ) : (
                      <>
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
                        </span>
                        <FiPlay className="w-3 h-3 text-amber-500" />
                        <span>Autoplay Paused</span>
                      </>
                    )}
                  </button>

                  <span className="px-2.5 py-1 rounded bg-indigo-500/10 dark:bg-indigo-500/20 text-[10px] font-bold tracking-wide text-indigo-600 dark:text-indigo-400 border border-indigo-200/30 dark:border-indigo-500/10 uppercase select-none">
                    {activeMilestone.badgeText}
                  </span>
                </div>
              </div>

              {/* Dynamic Content Panel (Fixed height with smooth internal scroll) */}
              <div className="p-6 md:p-8 flex-1 overflow-y-auto pr-1 overflow-x-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeNode}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-6"
                  >
                    {/* Commit Message log line */}
                    <div className="font-mono text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-black/30 border border-slate-200/20 dark:border-white/[0.02] p-3 rounded-xl flex items-start gap-2.5 shadow-inner">
                      <span className="text-indigo-500 font-bold shrink-0">
                        $
                      </span>
                      <span className="text-slate-700 dark:text-slate-200 leading-relaxed break-all select-all">
                        {activeMilestone.commit}
                      </span>
                    </div>

                    {/* Role / Period Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-200/40 dark:border-white/[0.03] pb-4">
                      <div>
                        <h4 className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
                          {activeMilestone.role}
                        </h4>
                        <p className="text-md font-bold text-indigo-600 dark:text-indigo-400 mt-1">
                          {activeMilestone.company}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900/60 border border-slate-200/60 dark:border-white/[0.04] px-4 py-2 rounded-full w-fit shadow-sm select-none shrink-0">
                        <FiCalendar className="text-indigo-500 dark:text-indigo-400" />
                        <span>{activeMilestone.period}</span>
                      </div>
                    </div>

                    {/* Dashboard Layout: Two Columns (Highlights vs Strengths) */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-2">
                      {/* Highlights */}
                      <div className="md:col-span-7 space-y-4">
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                          {activeMilestone.description}
                        </p>

                        <div className="space-y-3 pt-2">
                          <h5 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 select-none">
                            Key Accomplishments
                          </h5>
                          <ul className="space-y-2.5">
                            {activeMilestone.highlights.map(
                              (highlight, idx) => (
                                <li
                                  key={idx}
                                  className="flex items-start gap-3 text-xs text-slate-700 dark:text-slate-300 leading-relaxed"
                                >
                                  <FiCheckCircle className="w-4 h-4 text-indigo-500 dark:text-indigo-400 mt-0.5 shrink-0" />
                                  <span>{highlight}</span>
                                </li>
                              ),
                            )}
                          </ul>
                        </div>
                      </div>

                      {/* Technical Strengths */}
                      <div className="md:col-span-5 space-y-4 bg-slate-50/50 dark:bg-[#100a28]/25 border border-slate-200/60 dark:border-white/[0.04] p-5 rounded-2xl shadow-sm">
                        <h5 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5 select-none">
                          <FiLayers className="text-indigo-500" />
                          <span>Stack Strength Matrix</span>
                        </h5>

                        <div className="space-y-4 pt-2">
                          {activeMilestone.skills.map((skill, idx) => (
                            <div key={idx} className="space-y-1.5">
                              <div className="flex items-center justify-between text-[11px] font-bold text-slate-800 dark:text-slate-200">
                                <span>{skill.name}</span>
                                <span className="font-mono">
                                  {skill.value}%
                                </span>
                              </div>
                              <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800/80 rounded-full overflow-hidden select-none">
                                <motion.div
                                  className="h-full bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${skill.value}%` }}
                                  transition={{ duration: 0.8, delay: 0.15 }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
