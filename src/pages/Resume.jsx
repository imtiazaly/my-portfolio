import { motion } from "framer-motion";
import {
  FiBriefcase,
  FiCalendar,
  FiDownload,
  FiCheckCircle,
  FiLayers,
  FiFileText,
  FiExternalLink
} from "react-icons/fi";
import skills from "../data/skills";
import experience from "../data/experience";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const Resume = () => {
  return (
    <div className="min-h-screen bg-transparent py-12 pt-28 px-4 md:px-8 relative overflow-hidden transition-colors duration-300">
      {/* Glow Blur Nodes */}
      <div className="glow-node w-[400px] h-[400px] bg-indigo-500/5 left-[-100px] top-[20%] rounded-full blur-[100px] pointer-events-none" />
      <div className="glow-node w-[400px] h-[400px] bg-pink-500/5 right-[-100px] bottom-[10%] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-8 border-b border-slate-200 dark:border-[#2d1e5a]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-indigo-500 dark:text-indigo-400 mb-2 select-none">
              Credentials
            </p>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Professional Resume
            </h1>
            <p className="text-slate-650 dark:text-[#beafdc] mt-2 font-medium">
              Review qualifications, career timelines, and core skills profile.
            </p>
          </div>

          <a
            href="/resume/imtiazsResume.pdf"
            download
            className="shrink-0 block select-none"
          >
            <button className="group inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all duration-350 shadow-[0_4px_12px_rgba(99,102,241,0.2)] hover:shadow-[0_8px_20px_rgba(168,85,247,0.35)] hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
              <FiDownload className="text-sm group-hover:translate-y-0.5 transition-transform duration-300" />
              <span>Download PDF Resume</span>
            </button>
          </a>
        </div>

        {/* Grid Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-12 gap-10"
        >
          {/* Left: Timeline & Summary */}
          <div className="lg:col-span-7 space-y-10">
            {/* Professional Summary */}
            <motion.div
              variants={itemVariants}
              className="bg-[#ffffff]/90 dark:bg-[#160f38]/90 border border-slate-200 dark:border-[#2d1e5a] backdrop-blur-xl rounded-[28px] p-6 md:p-8 space-y-4 shadow-sm relative overflow-hidden"
            >
              {/* Gradient accent flare */}
              <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-indigo-500/10 to-pink-500/10 rounded-full blur-xl pointer-events-none" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-[#f0ebff] flex items-center gap-2 relative z-10">
                <FiFileText className="text-indigo-500" />
                <span>Professional Profile</span>
              </h2>
              <p className="text-sm md:text-base text-slate-650 dark:text-[#beafdc] font-medium leading-relaxed relative z-10">
                Detail-oriented and results-driven Junior Full Stack Developer
                currently working at Softleed Company. Experienced in building,
                maintaining, and updating web applications using Laravel, React,
                Vue, and relational databases. Developed a diverse portfolio of
                30 personal projects including frontend interfaces, web
                workflows, and desktop utility applications.
              </p>
            </motion.div>

            {/* Experience Timeline */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-[#f0ebff] flex items-center gap-2 mb-2">
                <FiBriefcase className="text-indigo-500" />
                <span>Work Experience</span>
              </h2>

              <div className="relative border-l-2 border-slate-200 dark:border-[#2d1e5a]/80 ml-4 space-y-8">
                {experience.map((item) => (
                  <div key={item.id} className="relative pl-8 group">
                    {/* Timeline Dot */}
                    <div className="absolute -left-[9px] top-4 z-20 flex h-4 w-4 items-center justify-center select-none">
                      <span className="animate-ping absolute inline-flex h-3.5 w-3.5 rounded-full bg-indigo-500 opacity-40"></span>
                      <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-white dark:bg-[#160f38] border-2 border-indigo-500 dark:border-indigo-400 group-hover:bg-indigo-500 dark:group-hover:bg-indigo-400 transition-colors shadow-sm" />
                    </div>

                    <div className="bg-[#ffffff]/90 dark:bg-[#160f38]/90 border border-slate-200 dark:border-[#2d1e5a] backdrop-blur-xl p-6 rounded-[28px] space-y-3 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition-all duration-300 shadow-sm relative overflow-hidden group/exp-card">
                      {/* Gradient accent flare */}
                      <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-full blur-xl pointer-events-none" />

                      {/* Title Bar */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 relative z-10">
                        <div>
                          <h3 className="text-base md:text-lg font-black text-slate-900 dark:text-[#f0ebff] tracking-tight">
                            {item.role}
                          </h3>
                          <span className="text-xs font-semibold text-indigo-500 dark:text-indigo-400">
                            {item.company}
                          </span>
                        </div>

                        {/* Date Tag */}
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-indigo-700 dark:text-[#f0ebff] bg-indigo-50 dark:bg-[#251a54] border border-indigo-100 dark:border-[#3d2a84] px-2.5 py-1 rounded-full w-fit shadow-sm">
                          <FiCalendar className="text-[10px]" />
                          <span>{item.period}</span>
                        </span>
                      </div>

                      <p className="text-xs md:text-sm text-slate-650 dark:text-[#beafdc] font-medium leading-relaxed relative z-10">
                        {item.description}
                      </p>

                      {/* Accomplishments */}
                      {item.highlights && item.highlights.length > 0 && (
                        <div className="pt-2 border-t border-slate-100 dark:border-[#2d1e5a]/30 mt-3 relative z-10">
                          <ul className="space-y-2">
                            {item.highlights.map((highlight, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-[#beafdc] font-medium leading-relaxed"
                              >
                                <div className="flex items-center justify-center w-4 h-4 rounded-full bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 shrink-0 mt-0.5 shadow-sm">
                                  <FiCheckCircle className="w-2.5 h-2.5" />
                                </div>
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Skills Bento Grid & Document Preview */}
          <div className="lg:col-span-5 space-y-8">
            {/* Technical Skills Bento Grid */}
            <motion.div
              variants={itemVariants}
              className="bg-[#ffffff]/90 dark:bg-[#160f38]/90 border border-slate-200 dark:border-[#2d1e5a] backdrop-blur-xl rounded-[28px] p-6 md:p-8 space-y-6 shadow-sm relative overflow-hidden"
            >
              {/* Gradient accent flare */}
              <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-indigo-500/10 to-pink-500/10 rounded-full blur-xl pointer-events-none" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-[#f0ebff] flex items-center gap-2 relative z-10">
                <FiLayers className="text-indigo-500" />
                <span>Technical Stack</span>
              </h2>

              <div className="space-y-5 relative z-10">
                {skills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 select-none">
                      {skill.category}
                    </h3>

                    {/* Tags container */}
                    <div className="flex flex-wrap gap-1.5">
                      {skill.items.map((item, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 text-xs font-bold rounded-xl bg-indigo-50 dark:bg-[#261f5c] text-indigo-700 dark:text-[#e3dbff] border border-indigo-100 dark:border-[#3c3182] shadow-sm transition-all duration-300 hover:bg-indigo-500 dark:hover:bg-indigo-500 hover:text-white dark:hover:text-white hover:border-transparent dark:hover:border-transparent hover:scale-105 active:scale-95 cursor-default"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Document Preview & Embed Hub */}
            <motion.div
              variants={itemVariants}
              className="bg-[#ffffff]/90 dark:bg-[#160f38]/90 border border-slate-200 dark:border-[#2d1e5a] backdrop-blur-xl rounded-[28px] p-6 space-y-4 shadow-sm relative overflow-hidden"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 dark:border-[#2d1e5a] bg-slate-950 flex flex-col shadow-sm relative group">
                {/* Real Browser Chrome Mock Bar */}
                <div className="h-8 bg-slate-100 dark:bg-[#11092e] border-b border-slate-200/80 dark:border-[#2d1e5a]/80 flex items-center px-4 gap-2 select-none shrink-0 z-20">
                  {/* Dot window controls */}
                  <div className="flex gap-1.2 shrink-0">
                    <span className="w-2 h-2 rounded-full bg-[#ff5f56] opacity-90 shadow-sm" />
                    <span className="w-2 h-2 rounded-full bg-[#ffbd2e] opacity-90 shadow-sm" />
                    <span className="w-2 h-2 rounded-full bg-[#27c93f] opacity-90 shadow-sm" />
                  </div>
                  {/* Address Bar */}
                  <div className="flex-grow mx-2.5 max-w-[200px] h-5 rounded-md bg-white dark:bg-black/20 border border-slate-250 dark:border-white/[0.04] px-2.5 flex items-center text-[9px] text-slate-400 dark:text-[#beafdc]/60 gap-1 shadow-inner">
                    <span className="w-1 h-1 bg-indigo-500 rounded-full animate-pulse" />
                    <span className="truncate font-mono">resume.pdf</span>
                  </div>
                </div>
                {/* Embed PDF Preview */}
                <div className="flex-grow w-full relative">
                  <iframe
                    src="/resume/imtiazsResume.pdf#toolbar=0"
                    className="w-full h-full border-0"
                    title="PDF Resume Preview"
                  />
                  {/* Cover Overlay for full screen action */}
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none z-30">
                    <a
                      href="/resume/imtiazsResume.pdf"
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 bg-white text-slate-900 rounded-xl font-bold text-xs shadow-md flex items-center gap-1.5 pointer-events-auto hover:scale-105 active:scale-95 transition-all duration-300"
                    >
                      <span>Open PDF Full Screen</span>
                      <FiExternalLink />
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center gap-4 pt-2 select-none">
                <div className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                  <p>Document Format: PDF</p>
                  <p>Last Updated: June 2026</p>
                </div>

                <a
                  href="/resume/imtiazsResume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-indigo-500 dark:text-indigo-400 hover:text-indigo-650 dark:hover:text-indigo-300 transition-colors flex items-center gap-1"
                >
                  <span>Open in Tab</span>
                  <FiExternalLink />
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Resume;