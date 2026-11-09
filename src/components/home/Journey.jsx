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
  ...uiMeta[idx],
}));

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

const Journey = () => {
  return (
    <section id="journey" className="py-24 px-6 relative overflow-hidden bg-transparent">
      {/* Background ambient space glow highlights */}
      <div className="glow-node w-[500px] h-[500px] bg-pink-500/5 left-[5%] top-[35%] rounded-full blur-[120px] pointer-events-none" />
      <div className="glow-node w-[400px] h-[400px] bg-indigo-500/5 right-[5%] bottom-[15%] rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-in">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-indigo-500 dark:text-indigo-400 mb-3 select-none">
            Origin story
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            My Learning Journey
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-indigo-500 to-pink-500 mx-auto mt-4 rounded-full shadow-sm" />
        </div>

        {/* Visual Timeline Layout */}
        <div className="relative pl-8 md:pl-20 ml-4 md:ml-10">

          {/* Glowing Gradient Vertical Timeline Line Track */}
          <div className="absolute left-[20px] md:left-[35px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-blue-500 via-indigo-500 via-pink-500 via-rose-500 to-amber-500 opacity-60 dark:opacity-40" />

          {/* Staggered Milestone Grid cards container */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            className="space-y-12"
          >
            {milestones.map((stone, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="relative group"
              >
                {/* Glowing Circle Timeline bullet / phase identifier */}
                <div className="absolute -left-[45px] md:-left-[85px] top-1.5 flex items-center justify-center w-8 h-8 md:w-11 md:h-11 rounded-full bg-white dark:bg-[#160f38] border border-slate-200 dark:border-[#2d1e5a] shadow-md group-hover:border-indigo-500 dark:group-hover:border-indigo-400 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(167,92,255,0.2)] transition-all duration-300 select-none z-20">
                  <span className="text-xs font-extrabold text-slate-400 dark:text-[#beafdc] group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
                    {stone.phase}
                  </span>
                </div>

                {/* Grid content card with high contrast violet theme */}
                <div className="bg-[#ffffff] dark:bg-[#160f38] border border-slate-200 dark:border-[#2d1e5a] rounded-2xl p-6 md:p-8 grid md:grid-cols-12 gap-6 items-start transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:shadow-[0_15px_40px_rgba(99,102,241,0.05)] dark:hover:shadow-[0_15px_40px_rgba(167,92,255,0.18)] hover:border-indigo-500/50 dark:hover:border-indigo-500/50 relative">

                  {/* Category-themed glowing spot background */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl"
                    style={{
                      background: `radial-gradient(circle at 10% 10%, ${stone.glowColor} 0%, transparent 60%)`
                    }}
                  />

                  {/* Year and Icon Column */}
                  <div className="md:col-span-3 space-y-4 relative z-10 select-none">
                    <span className={`inline-flex text-[10px] font-extrabold tracking-widest uppercase text-white bg-gradient-to-r ${stone.color} px-3.5 py-1.5 rounded-full shadow-sm`}>
                      {stone.year}
                    </span>

                    <div className="flex items-center gap-3">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900/60 text-slate-600 dark:text-[#beafdc] shadow-inner border border-slate-200/10 dark:border-white/[0.02] bg-gradient-to-br transition-colors duration-300 group-hover:text-white dark:group-hover:text-white group-hover:bg-gradient-to-br ${stone.hoverColor}`}>
                        {stone.icon}
                      </div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        Milestone
                      </span>
                    </div>
                  </div>

                  {/* Text Details Column */}
                  <div className="md:col-span-9 space-y-2.5 relative z-10">
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-[#f0ebff] group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                      {stone.title}
                    </h3>
                    <p className="text-sm text-slate-650 dark:text-[#beafdc] font-medium leading-relaxed">
                      {stone.description}
                    </p>
                  </div>

                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Journey;