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
  const activeMilestone = milestones.find((m) => m.id === activeNode);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setActiveNode((prev) => {
        if (prev === 2) return 1; // Intern (2) -> Full-Time (1)
        if (prev === 1) return 3; // Full-Time (1) -> Continuous (3)
        return 2; // Continuous (3) -> Intern (2)
      });
    }, 5500); // Transitions every 5.5 seconds

    return () => clearInterval(timer);
  }, [activeNode, isPlaying]);

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
          {/* Left Column: SVG Git branch visualizer */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-4 glow-card-wrapper rounded-[24px] p-[1px] hover:-translate-y-1 transition-all duration-300 h-full"
          >
            <div className="glow-card-border rounded-[24px]" />

            <div className="relative z-10 w-full h-full bg-[#ffffff] dark:bg-[#160f38] border border-slate-200 dark:border-[#2d1e5a] rounded-[23px] overflow-hidden p-6 flex flex-col items-center">
              <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-6 flex items-center gap-1.5 self-start select-none">
                <FiGitBranch className="text-indigo-500" />
                <span>Git Branch Roadmap</span>
              </h3>

              {/* Mobile / Small Screens Horizontal Graph */}
              <div className="block lg:hidden w-full overflow-x-auto scrollbar-none py-2 select-none">
                <div className="w-[320px] mx-auto relative">
                  <svg className="w-full h-20" viewBox="0 0 320 80">
                    {/* Base Lines (Main branch and Internship split) */}
                    <path
                      d="M 20,25 L 300,25"
                      className="stroke-slate-200 dark:stroke-slate-800"
                      strokeWidth="4"
                      strokeLinecap="round"
                      fill="transparent"
                    />
                    <path
                      d="M 40,25 C 40,25 55,55 80,55 L 120,55 C 145,55 160,25 160,25"
                      className="stroke-pink-200/50 dark:stroke-pink-500/15"
                      strokeWidth="4"
                      strokeLinecap="round"
                      fill="transparent"
                    />

                    {/* Active Highlight Line Segments */}
                    {activeNode === 1 && (
                      <motion.path
                        d="M 20,25 L 220,25"
                        className="stroke-indigo-500/40 dark:stroke-indigo-400/40"
                        strokeWidth="4"
                        fill="transparent"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                    )}
                    {activeNode === 3 && (
                      <motion.path
                        d="M 20,25 L 280,25"
                        className="stroke-emerald-500/40 dark:stroke-emerald-400/40"
                        strokeWidth="4"
                        fill="transparent"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                    )}

                    {/* Node 1: Internship (x = 100, y = 55) */}
                    <g
                      onClick={() => setActiveNode(2)}
                      className="cursor-pointer"
                    >
                      <circle
                        cx="100"
                        cy="55"
                        r="14"
                        className="fill-white dark:fill-[#080416] stroke-pink-500/20"
                        strokeWidth="2"
                      />
                      {activeNode === 2 && (
                        <motion.circle
                          cx="100"
                          cy="55"
                          r="10"
                          className="fill-pink-500"
                          layoutId="mobileGlowCircle"
                        />
                      )}
                      <circle
                        cx="100"
                        cy="55"
                        r="5"
                        className={
                          activeNode === 2
                            ? "fill-white"
                            : "fill-slate-300 dark:fill-slate-600"
                        }
                      />
                    </g>

                    {/* Node 2: Full-Time (x = 220, y = 25) */}
                    <g
                      onClick={() => setActiveNode(1)}
                      className="cursor-pointer"
                    >
                      <circle
                        cx="220"
                        cy="25"
                        r="14"
                        className="fill-white dark:fill-[#080416] stroke-indigo-500/20"
                        strokeWidth="2"
                      />
                      {activeNode === 1 && (
                        <motion.circle
                          cx="220"
                          cy="25"
                          r="10"
                          className="fill-indigo-500"
                          layoutId="mobileGlowCircle"
                        />
                      )}
                      <circle
                        cx="220"
                        cy="25"
                        r="5"
                        className={
                          activeNode === 1
                            ? "fill-white"
                            : "fill-slate-300 dark:fill-slate-600"
                        }
                      />
                    </g>

                    {/* Node 3: Present (x = 280, y = 25) */}
                    <g
                      onClick={() => setActiveNode(3)}
                      className="cursor-pointer"
                    >
                      <circle
                        cx="280"
                        cy="25"
                        r="14"
                        className="fill-white dark:fill-[#080416] stroke-emerald-500/20"
                        strokeWidth="2"
                      />
                      {activeNode === 3 && (
                        <motion.circle
                          cx="280"
                          cy="25"
                          r="10"
                          className="fill-emerald-500"
                          layoutId="mobileGlowCircle"
                        />
                      )}
                      <circle
                        cx="280"
                        cy="25"
                        r="5"
                        className={
                          activeNode === 3
                            ? "fill-white"
                            : "fill-slate-300 dark:fill-slate-600"
                        }
                      />
                    </g>

                    {/* Labels */}
                    <text
                      x="100"
                      y="78"
                      textAnchor="middle"
                      className="font-mono text-[9px] font-bold fill-slate-500 dark:fill-slate-400"
                    >
                      Intern
                    </text>
                    <text
                      x="220"
                      y="12"
                      textAnchor="middle"
                      className="font-mono text-[9px] font-bold fill-slate-500 dark:fill-slate-400"
                    >
                      Engineer
                    </text>
                    <text
                      x="280"
                      y="12"
                      textAnchor="middle"
                      className="font-mono text-[9px] font-bold fill-slate-500 dark:fill-slate-400"
                    >
                      HEAD
                    </text>
                  </svg>
                </div>
              </div>

              {/* Desktop Vertical Graph */}
              <div className="hidden lg:flex items-center justify-center w-full h-[320px] select-none">
                <svg className="w-full h-full" viewBox="0 0 160 300">
                  {/* Main Branch line */}
                  <path
                    d="M 50,280 L 50,20"
                    className="stroke-slate-200 dark:stroke-slate-800"
                    strokeWidth="4"
                    strokeLinecap="round"
                    fill="transparent"
                  />

                  {/* Internship Branch Curve */}
                  <path
                    d="M 50,260 C 50,260 90,245 90,220 L 90,200 C 90,175 50,160 50,160"
                    className="stroke-pink-200/50 dark:stroke-pink-500/15"
                    strokeWidth="4"
                    strokeLinecap="round"
                    fill="transparent"
                  />

                  {/* Active Highlight Line Segments */}
                  {activeNode === 1 && (
                    <motion.path
                      d="M 50,280 L 50,140"
                      className="stroke-indigo-500/40 dark:stroke-indigo-400/40"
                      strokeWidth="4"
                      fill="transparent"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  )}
                  {activeNode === 3 && (
                    <motion.path
                      d="M 50,280 L 50,60"
                      className="stroke-emerald-500/40 dark:stroke-emerald-400/40"
                      strokeWidth="4"
                      fill="transparent"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  )}

                  {/* Node 1: Internship Node (x=90, y=210) */}
                  <g
                    onClick={() => setActiveNode(2)}
                    className="cursor-pointer group"
                  >
                    <circle
                      cx="90"
                      cy="210"
                      r="16"
                      className="fill-white dark:fill-[#080416] stroke-pink-500/15"
                      strokeWidth="2"
                    />
                    {activeNode === 2 && (
                      <motion.circle
                        cx="90"
                        cy="210"
                        r="11"
                        className="fill-pink-500/90"
                        layoutId="desktopGlowCircle"
                      />
                    )}
                    <circle
                      cx="90"
                      cy="210"
                      r="5.5"
                      className={
                        activeNode === 2
                          ? "fill-white"
                          : "fill-slate-300 dark:fill-slate-700 group-hover:fill-pink-500"
                      }
                    />
                    <text
                      x="115"
                      y="214"
                      className={`font-mono text-[10px] font-bold ${activeNode === 2 ? "fill-pink-600 dark:fill-pink-400" : "fill-slate-400 dark:fill-slate-500"}`}
                    >
                      internship
                    </text>
                  </g>

                  {/* Node 2: Full-Time Node (x=50, y=140) */}
                  <g
                    onClick={() => setActiveNode(1)}
                    className="cursor-pointer group"
                  >
                    <circle
                      cx="50"
                      cy="140"
                      r="16"
                      className="fill-white dark:fill-[#080416] stroke-indigo-500/15"
                      strokeWidth="2"
                    />
                    {activeNode === 1 && (
                      <motion.circle
                        cx="50"
                        cy="140"
                        r="11"
                        className="fill-indigo-500/90"
                        layoutId="desktopGlowCircle"
                      />
                    )}
                    <circle
                      cx="50"
                      cy="140"
                      r="5.5"
                      className={
                        activeNode === 1
                          ? "fill-white"
                          : "fill-slate-300 dark:fill-slate-700 group-hover:fill-indigo-500"
                      }
                    />
                    <text
                      x="75"
                      y="144"
                      className={`font-mono text-[10px] font-bold ${activeNode === 1 ? "fill-indigo-600 dark:fill-indigo-400" : "fill-slate-400 dark:fill-slate-500"}`}
                    >
                      main (Sep 2025)
                    </text>
                  </g>

                  {/* Node 3: HEAD Node (x=50, y=60) */}
                  <g
                    onClick={() => setActiveNode(3)}
                    className="cursor-pointer group"
                  >
                    <circle
                      cx="50"
                      cy="60"
                      r="16"
                      className="fill-white dark:fill-[#080416] stroke-emerald-500/15"
                      strokeWidth="2"
                    />
                    {activeNode === 3 && (
                      <motion.circle
                        cx="50"
                        cy="60"
                        r="11"
                        className="fill-emerald-500/90"
                        layoutId="desktopGlowCircle"
                      />
                    )}
                    <circle
                      cx="50"
                      cy="60"
                      r="5.5"
                      className={
                        activeNode === 3
                          ? "fill-white"
                          : "fill-slate-300 dark:fill-slate-700 group-hover:fill-emerald-500"
                      }
                    />
                    <text
                      x="75"
                      y="64"
                      className={`font-mono text-[10px] font-bold ${activeNode === 3 ? "fill-emerald-600 dark:fill-emerald-400" : "fill-slate-400 dark:fill-slate-500"}`}
                    >
                      HEAD (Present)
                    </text>
                  </g>
                </svg>
              </div>

              <p className="text-[10px] font-medium font-mono text-slate-400 dark:text-slate-500 mt-4 text-center select-none">
                Softleed timeline (click nodes to inspect)
              </p>
            </div>
          </motion.div>

          {/* Right Column: Terminal File Inspector Card */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-8 glow-card-wrapper rounded-[24px] p-[1px]"
          >
            <div className="glow-card-border rounded-[24px]" />

            <div className="relative z-10 w-full h-full bg-[#ffffff] dark:bg-[#160f38] border border-slate-200 dark:border-[#2d1e5a] rounded-[23px] overflow-hidden flex flex-col min-h-[380px] shadow-2xl">
              <div className="terminal-card flex flex-col w-full min-h-[380px] shadow-2xl relative">
                {/* Terminal Title Bar */}
                <div className="terminal-header px-6 py-4 flex items-center justify-between select-none">
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

                {/* Dynamic Content Panel */}
                <div className="p-6 md:p-8 flex-grow">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeNode}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.3 }}
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

                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900/60 border border-slate-200/60 dark:border-white/[0.04] px-4 py-2 rounded-full w-fit shadow-sm select-none">
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
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
