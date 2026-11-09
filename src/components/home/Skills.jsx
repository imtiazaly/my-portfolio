import { motion } from "framer-motion";
import {
  FiLayout,
  FiServer,
  FiDatabase,
  FiActivity,
  FiCpu,
  FiTool,
} from "react-icons/fi";
import skills from "../../data/skills";

const categoryMeta = {
  frontend: {
    desc: "Building clean, interactive, and responsive user interfaces with focus on modern usability.",
    iconBg: "bg-indigo-500/10 dark:bg-indigo-500/20",
    borderClass:
      "hover:border-indigo-500/40 hover:shadow-indigo-500/[0.06] dark:hover:shadow-indigo-500/[0.03]",
    icon: <FiLayout className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />,
    radialGlow: "rgba(99, 102, 241, 0.12)",
  },
  backend: {
    desc: "Developing MVC web applications, background tasks, and clean REST APIs using Laravel and Node.",
    iconBg: "bg-pink-500/10 dark:bg-pink-500/20",
    borderClass:
      "hover:border-pink-500/40 hover:shadow-pink-500/[0.06] dark:hover:shadow-pink-500/[0.03]",
    icon: <FiServer className="w-5 h-5 text-pink-500 dark:text-pink-400" />,
    radialGlow: "rgba(244, 63, 94, 0.12)",
  },
  database: {
    desc: "Designing relational database schemas, writing optimized queries, and managing tables.",
    iconBg: "bg-blue-500/10 dark:bg-blue-500/20",
    borderClass:
      "hover:border-blue-500/40 hover:shadow-blue-500/[0.06] dark:hover:shadow-blue-500/[0.03]",
    icon: <FiDatabase className="w-5 h-5 text-blue-500 dark:text-blue-400" />,
    radialGlow: "rgba(59, 130, 246, 0.12)",
  },
  "qa automation": {
    desc: "Writing automated end-to-end integration tests using Playwright for regression checks.",
    iconBg: "bg-emerald-500/10 dark:bg-emerald-500/20",
    borderClass:
      "hover:border-emerald-500/40 hover:shadow-emerald-500/[0.06] dark:hover:shadow-emerald-500/[0.03]",
    icon: (
      <FiActivity className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
    ),
    radialGlow: "rgba(16, 185, 129, 0.12)",
  },
  desktop: {
    desc: "Creating cross-platform desktop applications using Electron.js wrappers.",
    iconBg: "bg-purple-500/10 dark:bg-purple-500/20",
    borderClass:
      "hover:border-purple-500/40 hover:shadow-purple-500/[0.06] dark:hover:shadow-purple-500/[0.03]",
    icon: <FiCpu className="w-5 h-5 text-purple-500 dark:text-purple-400" />,
    radialGlow: "rgba(168, 85, 247, 0.12)",
  },
  tools: {
    desc: "Utilizing Git, GitHub workflows, and standard team collaboration utilities.",
    iconBg: "bg-amber-500/10 dark:bg-amber-500/20",
    borderClass:
      "hover:border-amber-500/40 hover:shadow-amber-500/[0.06] dark:hover:shadow-amber-500/[0.03]",
    icon: <FiTool className="w-5 h-5 text-amber-500 dark:text-amber-400" />,
    radialGlow: "rgba(245, 158, 11, 0.12)",
  },
};

const skillDetails = {
  react: {
    percentage: 85,
    label: "Proficient",
    color: "from-cyan-400 to-cyan-500",
    text: "group-hover/row:text-cyan-500 dark:group-hover/row:text-cyan-400",
    glow: "rgba(34, 211, 238, 0.45)",
  },
  javascript: {
    percentage: 86,
    label: "Proficient",
    color: "from-yellow-400 to-amber-500",
    text: "group-hover/row:text-yellow-600 dark:group-hover/row:text-yellow-400",
    glow: "rgba(234, 179, 8, 0.45)",
  },
  vue: {
    percentage: 82,
    label: "Proficient",
    color: "from-emerald-400 to-teal-500",
    text: "group-hover/row:text-emerald-600 dark:group-hover/row:text-emerald-400",
    glow: "rgba(16, 185, 129, 0.45)",
  },
  typescript: {
    percentage: 75,
    label: "Comfortable",
    color: "from-blue-500 to-indigo-600",
    text: "group-hover/row:text-blue-500 dark:group-hover/row:text-blue-400",
    glow: "rgba(59, 130, 246, 0.45)",
  },
  tailwind: {
    percentage: 88,
    label: "Proficient",
    color: "from-teal-400 to-cyan-500",
    text: "group-hover/row:text-teal-500 dark:group-hover/row:text-teal-400",
    glow: "rgba(45, 212, 191, 0.45)",
  },
  bootstrap: {
    percentage: 80,
    label: "Proficient",
    color: "from-purple-500 to-indigo-500",
    text: "group-hover/row:text-purple-500 dark:group-hover/row:text-purple-400",
    glow: "rgba(168, 85, 247, 0.45)",
  },
  html: {
    percentage: 90,
    label: "Proficient",
    color: "from-orange-400 to-red-500",
    text: "group-hover/row:text-orange-500 dark:group-hover/row:text-orange-400",
    glow: "rgba(249, 115, 22, 0.45)",
  },
  css: {
    percentage: 88,
    label: "Proficient",
    color: "from-blue-400 to-indigo-500",
    text: "group-hover/row:text-blue-600 dark:group-hover/row:text-blue-400",
    glow: "rgba(59, 130, 246, 0.45)",
  },
  laravel: {
    percentage: 86,
    label: "Proficient",
    color: "from-red-500 to-orange-600",
    text: "group-hover/row:text-red-500 dark:group-hover/row:text-red-400",
    glow: "rgba(239, 68, 68, 0.45)",
  },
  php: {
    percentage: 85,
    label: "Proficient",
    color: "from-violet-500 to-purple-600",
    text: "group-hover/row:text-violet-500 dark:group-hover/row:text-violet-400",
    glow: "rgba(139, 92, 246, 0.45)",
  },
  "rest api": {
    percentage: 84,
    label: "Proficient",
    color: "from-pink-500 to-rose-600",
    text: "group-hover/row:text-pink-500 dark:group-hover/row:text-pink-400",
    glow: "rgba(236, 72, 153, 0.45)",
  },
  "node.js": {
    percentage: 78,
    label: "Comfortable",
    color: "from-green-500 to-emerald-600",
    text: "group-hover/row:text-green-500 dark:group-hover/row:text-green-400",
    glow: "rgba(34, 197, 94, 0.45)",
  },
  mysql: {
    percentage: 84,
    label: "Proficient",
    color: "from-blue-500 to-sky-600",
    text: "group-hover/row:text-blue-500 dark:group-hover/row:text-blue-400",
    glow: "rgba(59, 130, 246, 0.45)",
  },
  postgresql: {
    percentage: 78,
    label: "Comfortable",
    color: "from-indigo-500 to-blue-600",
    text: "group-hover/row:text-indigo-500 dark:group-hover/row:text-indigo-400",
    glow: "rgba(99, 102, 241, 0.45)",
  },
  playwright: {
    percentage: 74,
    label: "Comfortable",
    color: "from-emerald-500 to-teal-600",
    text: "group-hover/row:text-emerald-500 dark:group-hover/row:text-emerald-400",
    glow: "rgba(16, 185, 129, 0.45)",
  },
  "electron.js": {
    percentage: 75,
    label: "Comfortable",
    color: "from-purple-500 to-violet-600",
    text: "group-hover/row:text-purple-500 dark:group-hover/row:text-purple-400",
    glow: "rgba(168, 85, 247, 0.45)",
  },
  git: {
    percentage: 88,
    label: "Proficient",
    color: "from-orange-500 to-red-500",
    text: "group-hover/row:text-orange-500 dark:group-hover/row:text-orange-400",
    glow: "rgba(249, 115, 22, 0.45)",
  },
  github: {
    percentage: 86,
    label: "Proficient",
    color: "from-slate-500 to-slate-700",
    text: "group-hover/row:text-slate-600 dark:group-hover/row:text-slate-300",
    glow: "rgba(100, 116, 139, 0.45)",
  },
  "vs code": {
    percentage: 90,
    label: "Proficient",
    color: "from-blue-500 to-indigo-500",
    text: "group-hover/row:text-blue-500 dark:group-hover/row:text-blue-400",
    glow: "rgba(59, 130, 246, 0.45)",
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
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

const Skills = () => {
  return (
    <section
      id="skills"
      className="py-24 px-6 relative overflow-hidden bg-transparent"
    >
      {/* Background Glow Node */}
      <div className="glow-node w-[450px] h-[450px] bg-indigo-500/5 left-[50%] top-[30%] -translate-x-1/2 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Title */}
        <div className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-indigo-500 dark:text-indigo-400 mb-3">
            Expertise
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
            Technical Skills
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-indigo-500 to-pink-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Bento Grid (Symmetric 3-Column Layout) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.08 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left"
        >
          {skills.map((skill, index) => {
            const meta = categoryMeta[skill.category.toLowerCase()] || {
              desc: "Core technology stack items.",
              iconBg: "bg-indigo-500/10",
              borderClass: "hover:border-indigo-500/30",
              icon: <FiTool className="w-5 h-5 text-indigo-500" />,
              radialGlow: "rgba(99, 102, 241, 0.12)",
            };

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`terminal-card p-6 flex flex-col justify-between hover:scale-[1.02] transition-all duration-300 relative group overflow-hidden min-h-[380px] h-full ${meta.borderClass}`}
              >
                {/* Category-themed ambient glow background inside card */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 10% 10%, ${meta.radialGlow} 0%, transparent 60%)`,
                  }}
                />

                <div className="relative z-10 space-y-4">
                  {/* Header */}
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-xl ${meta.iconBg} shrink-0 shadow-sm border border-slate-200/10 dark:border-white/[0.02]`}
                    >
                      {meta.icon}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                      {skill.category}
                    </h3>
                  </div>

                  {/* Subtitle / Context description */}
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                    {meta.desc}
                  </p>
                </div>

                {/* Skills Rating Progress Bars */}
                <div className="space-y-4 pt-6 relative z-10">
                  {skill.items.map((item, idx) => {
                    const skillKey =
                      typeof item === "string" ? item.toLowerCase() : "";
                    const skillName =
                      typeof item === "string" ? item : item.name;
                    const detail = skillDetails[skillKey] || {
                      percentage: 80,
                      label: "Proficient",
                      color: "from-indigo-500 to-pink-500",
                      text: "group-hover/row:text-indigo-500 dark:group-hover/row:text-indigo-400",
                      glow: "rgba(99, 102, 241, 0.4)",
                    };

                    return (
                      <div
                        key={idx}
                        className="space-y-1.5 group/row transition-all duration-300 hover:translate-x-1.5 cursor-default"
                      >
                        <div className="flex items-center justify-between text-base sm:text-sm font-bold">
                          <span
                            className={`transition-colors duration-300 ${detail.text} text-slate-800 dark:text-slate-200`}
                          >
                            {skillName}
                          </span>
                          <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-mono">
                            {detail.label} • {detail.percentage}%
                          </span>
                        </div>

                        <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-900/60 rounded-full overflow-hidden border border-slate-200/40 dark:border-white/[0.02] shadow-inner">
                          <motion.div
                            className={`h-full bg-gradient-to-r ${detail.color} rounded-full`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${detail.percentage}%` }}
                            viewport={{ once: false }}
                            transition={{
                              duration: 0.8,
                              ease: "easeOut",
                              delay: idx * 0.05,
                            }}
                            style={{ boxShadow: `0 0 10px ${detail.glow}` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
