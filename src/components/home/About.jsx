import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FiCheckCircle, FiStar, FiFileText } from "react-icons/fi";
import profile from "../../data/profile";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const LOG_MESSAGES = profile.about.consoleLogs;

const ConsoleLogger = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setLogs((prev) => {
        const next = [...prev, `> ${LOG_MESSAGES[index]}`];
        if (next.length > 2) {
          next.shift(); // Keep only last 2 lines for card height balance
        }
        return next;
      });
      index = (index + 1) % LOG_MESSAGES.length;
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-900 dark:bg-black/75 rounded-xl p-3 font-mono text-[10px] text-emerald-400 border border-slate-950 dark:border-white/[0.04] space-y-1 h-[58px] overflow-hidden select-none shadow-inner">
      {logs.length === 0 ? (
        <div className="animate-pulse text-emerald-400/80">
          {"$ listening for updates..."}
        </div>
      ) : (
        logs.map((log, idx) => (
          <div key={idx} className="truncate text-emerald-400">
            {log}
          </div>
        ))
      )}
    </div>
  );
};

const ProgressCircle = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-20px" });

  return (
    <div
      ref={ref}
      className="relative w-14 h-14 shrink-0 flex items-center justify-center select-none"
    >
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="28"
          cy="28"
          r="23"
          className="stroke-slate-200 dark:stroke-slate-800"
          strokeWidth="3.5"
          fill="transparent"
        />
        <circle
          cx="28"
          cy="28"
          r="23"
          className="stroke-indigo-500 dark:stroke-indigo-400 transition-all duration-1000 ease-out"
          strokeWidth="3.5"
          strokeDasharray="144.5" // 2 * PI * 23 = 144.5
          strokeDashoffset={isInView ? 0 : 144.5}
          fill="transparent"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute text-indigo-500 dark:text-indigo-400">
        <FiStar className="w-4 h-4 animate-pulse" />
      </div>
    </div>
  );
};

const About = () => {
  return (
    <section
      id="about"
      className="py-24 px-6 relative overflow-hidden bg-transparent"
    >
      {/* Background glow */}
      <div className="glow-node w-[350px] h-[350px] bg-indigo-500/5 left-[15%] bottom-[5%] rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Title */}
        <div className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-indigo-500 dark:text-indigo-400 mb-3">
            Introduction
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
            About Me
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-indigo-500 to-pink-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Bento Grid Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(180px,_auto)] w-full text-left"
        >
          {/* Card 1: Narrative (About Bio) */}
          <motion.div
            variants={cardVariants}
            className="md:col-span-2 md:row-span-2 terminal-card flex flex-col justify-between hover:scale-[1.01] transition-all duration-300"
          >
            {/* Terminal Window Header / Control Bar */}
            <div className="terminal-header px-6 py-4 flex items-center justify-between select-none">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] shadow-sm" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dfa023] shadow-sm" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] shadow-sm" />
              </div>

              <div className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500 flex items-center gap-1.5 bg-white/20 dark:bg-[#121218]/40 border border-slate-200/30 dark:border-white/[0.04] px-3.5 py-1.5 rounded-lg shadow-sm">
                <span className="text-indigo-500 dark:text-indigo-400 font-extrabold">
                  &gt;_
                </span>
                <span>profile.md</span>
              </div>

              <div className="w-[54px] lg:block hidden" />
            </div>

            {/* Narrative Content */}
            <div className="p-6 sm:p-8 flex flex-col justify-center flex-grow space-y-4 md:space-y-5">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white leading-snug">
                Building clean web applications and responsive client-side user
                experiences.
              </h3>

              {profile.about.bioParagraphs.map((para, idx) => (
                <p
                  key={idx}
                  className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base"
                >
                  {para}
                </p>
              ))}
            </div>
          </motion.div>

          {/* Card 2: Experience Counter */}
          <motion.div
            variants={cardVariants}
            className="md:col-span-1 md:row-span-1 terminal-card p-6 flex flex-col justify-between hover:scale-[1.02] transition-all duration-300"
          >
            <div className="flex items-center justify-between w-full">
              <div className="space-y-1">
                <span className="text-3xl font-extrabold bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
                  {profile.about.experienceValue}
                </span>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  {profile.about.experienceLabel}
                </h4>
              </div>

              <ProgressCircle />
            </div>

            <div className="border-t border-slate-200/40 dark:border-white/[0.04] pt-3 mt-4">
              <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
                At Softleed Company
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-300 mt-1.5 leading-relaxed font-medium">
                Joined as intern in July 2025; transitioned to full-time
                developer role in Sept 2025.
              </p>
            </div>
          </motion.div>

          {/* Card 3: Projects Counter */}
          <motion.div
            variants={cardVariants}
            className="md:col-span-1 md:row-span-1 terminal-card p-6 flex flex-col justify-between hover:scale-[1.02] transition-all duration-300"
          >
            <div className="flex items-center justify-between w-full">
              <div className="space-y-1">
                <span className="text-3xl font-extrabold bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
                  30+
                </span>
                <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  Personal Projects
                </h4>
              </div>

              <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 text-xl shadow-sm border border-indigo-200/60 dark:border-indigo-500/20 shrink-0">
                <FiFileText className="w-5 h-5" />
              </div>
            </div>

            <div className="mt-4">
              <ConsoleLogger />
            </div>
          </motion.div>

          {/* Card 4: Skills Checklist Capsules */}
          <motion.div
            variants={cardVariants}
            className="md:col-span-3 md:row-span-1 terminal-card p-6 flex flex-col justify-between hover:scale-[1.01] transition-all duration-300"
          >
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
              <FiCheckCircle className="text-indigo-500 dark:text-indigo-400" />
              <span>Core Development Standards</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
              {[
                {
                  text: "Responsive Web Design",
                  color:
                    "hover:border-cyan-500/50 hover:bg-cyan-500/[0.04] hover:text-cyan-600 dark:hover:text-cyan-400",
                },
                {
                  text: "Full-Stack REST APIs",
                  color:
                    "hover:border-red-500/50 hover:bg-red-500/[0.04] hover:text-red-600 dark:hover:text-red-400",
                },
                {
                  text: "Desktop Wrappers (Electron)",
                  color:
                    "hover:border-violet-500/50 hover:bg-violet-500/[0.04] hover:text-violet-600 dark:hover:text-violet-400",
                },
                {
                  text: "Modern Frontend Frameworks",
                  color:
                    "hover:border-indigo-500/50 hover:bg-indigo-500/[0.04] hover:text-indigo-600 dark:hover:text-indigo-400",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-3 p-3.5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white/70 dark:bg-slate-900/60 transition-all duration-300 font-bold text-slate-800 dark:text-slate-200 select-none ${item.color}`}
                >
                  <FiCheckCircle className="shrink-0 text-indigo-500 dark:text-indigo-400 w-4 h-4" />
                  <span className="text-xs sm:text-sm font-extrabold font-sans">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
