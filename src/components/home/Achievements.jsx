import { motion } from "framer-motion";
import { FiAward, FiCheckCircle, FiCpu, FiTrendingUp } from "react-icons/fi";
import profile from "../../data/profile";

const achievements = profile.achievements;

const getIcon = (id) => {
  switch (id) {
    case 1:
      return <FiCpu className="w-6 h-6" />;
    case 2:
      return <FiCheckCircle className="w-6 h-6" />;
    case 3:
      return <FiTrendingUp className="w-6 h-6" />;
    case 4:
      return <FiAward className="w-6 h-6" />;
    default:
      return <FiAward className="w-6 h-6" />;
  }
};

const getMilestoneTheme = (id) => {
  switch (id) {
    case 1:
      return {
        bar: "from-indigo-500 to-violet-600",
        iconClass: "bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border-indigo-500/20",
        glow: "rgba(99, 102, 241, 0.15)",
        shadowHover: "hover:shadow-[0_15px_40px_rgba(99,102,241,0.22)]"
      };
    case 2:
      return {
        bar: "from-emerald-500 to-teal-650",
        iconClass: "bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border-emerald-500/20",
        glow: "rgba(16, 185, 129, 0.15)",
        shadowHover: "hover:shadow-[0_15px_40px_rgba(16,185,129,0.22)]"
      };
    case 3:
      return {
        bar: "from-pink-500 to-rose-600",
        iconClass: "bg-pink-500/10 text-pink-500 dark:text-pink-400 border-pink-500/20",
        glow: "rgba(244, 63, 94, 0.15)",
        shadowHover: "hover:shadow-[0_15px_40px_rgba(244,63,94,0.22)]"
      };
    case 4:
      return {
        bar: "from-amber-500 to-orange-605",
        iconClass: "bg-amber-500/10 text-amber-500 dark:text-amber-400 border-amber-500/20",
        glow: "rgba(245, 158, 11, 0.15)",
        shadowHover: "hover:shadow-[0_15px_40px_rgba(245,158,11,0.22)]"
      };
    default:
      return {
        bar: "from-indigo-500 to-violet-600",
        iconClass: "bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border-indigo-500/20",
        glow: "rgba(99, 102, 241, 0.15)",
        shadowHover: "hover:shadow-[0_15px_40px_rgba(99,102,241,0.22)]"
      };
  }
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const Achievements = () => {
  return (
    <section id="achievements" className="py-24 px-6 relative overflow-hidden bg-transparent">
      {/* Background ambient space glow highlights */}
      <div className="glow-node w-[400px] h-[400px] bg-indigo-500/5 left-[10%] bottom-[5%] rounded-full blur-[100px] pointer-events-none" />
      <div className="glow-node w-[350px] h-[350px] bg-pink-500/5 right-[10%] top-[10%] rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Title Block */}
        <div className="text-center mb-20 animate-fade-in">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-indigo-500 dark:text-indigo-400 mb-3 select-none">
            Milestones
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Key Achievements
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-indigo-500 to-pink-500 mx-auto mt-4 rounded-full shadow-sm" />
        </div>

        {/* Staggered Achievements Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {achievements.map((item) => {
            const theme = getMilestoneTheme(item.id);

            return (
              <motion.div
                key={item.id}
                variants={cardVariants}
                className={`group flex flex-col justify-between h-full bg-[#ffffff] dark:bg-[#160f38] border border-slate-200 dark:border-[#2d1e5a] rounded-3xl overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:scale-[1.005] hover:shadow-[0_15px_40px_rgba(99,102,241,0.05)] ${theme.shadowHover} hover:border-indigo-500/40 dark:hover:border-indigo-500/40 relative`}
              >
                {/* 4px Gradient Accent Bar at the top of the card */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${theme.bar} shrink-0`} />

                <div className="p-6 flex-grow flex flex-col justify-between">
                  {/* Category-themed glowing backdrop on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-b-3xl"
                    style={{
                      background: `radial-gradient(circle at 10% 15%, ${theme.glow} 0%, transparent 60%)`
                    }}
                  />

                  <div className="space-y-4 relative z-10">
                    {/* Icon Wrapper */}
                    <div className={`flex items-center justify-center w-12 h-12 rounded-2xl border shadow-inner shrink-0 group-hover:scale-115 transition-transform duration-300 ${theme.iconClass}`}>
                      {getIcon(item.id)}
                    </div>

                    {/* Information */}
                    <div className="space-y-2.5">
                      <h3 className="text-lg md:text-xl font-extrabold text-slate-900 dark:text-[#f0ebff] group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-[#beafdc]/90 font-medium leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Sub-decoration verified footer line */}
                  <div className="mt-8 pt-4 border-t border-slate-150 dark:border-[#2d1e5a]/40 flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 relative z-10 select-none">
                    <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span>Verified</span>
                    </div>
                    <span className="font-mono text-[10px] font-bold">#{String(item.id).padStart(2, "0")}</span>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;