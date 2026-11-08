import { motion } from "framer-motion";
import { FiArrowRight, FiGithub, FiLinkedin, FiMail, FiLayout, FiServer, FiCpu, FiTerminal } from "react-icons/fi";
import Button from "../common/Button";
import Typewriter from "../ui/Typewriter";

const words = [
  "Full Stack Developer",
  "Laravel Developer",
  "React & Vue Developer",
  "Electron.js Developer",
];

// Framer Motion Animation Variants for staggering content entry on scroll-in
const containerVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.65,
      ease: "easeOut",
      staggerChildren: 0.08,
      when: "beforeChildren",
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const profileVariants = {
  hidden: { opacity: 0, x: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut", delay: 0.15 },
  },
};

const Hero = () => {
  const handleScroll = (e, id) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 py-24 lg:py-0 overflow-hidden mesh-gradient-bg transition-colors duration-500"
    >
      {/* Multi-hue magical glow orbs */}
      <div className="glow-node w-[500px] h-[500px] bg-violet-500/20 left-[5%] top-[10%] rounded-full blur-[120px]" />
      <div className="glow-node w-[450px] h-[450px] bg-fuchsia-500/20 right-[10%] bottom-[10%] rounded-full blur-[110px]" />
      <div className="glow-node w-[350px] h-[350px] bg-cyan-400/15 left-[40%] bottom-[20%] rounded-full blur-[90px]" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10 w-full">
        {/* Left Side: Content Terminal Card */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          className="lg:col-span-7 bg-[#ffffff] dark:bg-[#160f38] border border-slate-200 dark:border-[#2d1e5a] rounded-[28px] overflow-hidden flex flex-col w-full text-left hover:shadow-[0_20px_50px_rgba(99,102,241,0.06)] dark:hover:shadow-[0_20px_50px_rgba(167,92,255,0.22)] hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition-all duration-500"
        >
          {/* Terminal Window Header / Control Bar */}
          <div className="terminal-header px-6 py-4 flex items-center justify-between select-none">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] shadow-sm" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dfa023] shadow-sm" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] shadow-sm" />
            </div>

            {/* Terminal Tab Label */}
            <div className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500 flex items-center gap-1.5 bg-white/20 dark:bg-[#121218]/40 border border-slate-200/30 dark:border-white/[0.04] px-3.5 py-1.5 rounded-lg shadow-sm">
              <span className="text-indigo-500 dark:text-indigo-400 font-extrabold">
                &gt;_
              </span>
              <span>index.jsx</span>
            </div>

            <div className="w-[54px] lg:block hidden" />
          </div>

          {/* Terminal Body Content */}
          <div className="p-6 sm:p-8 md:p-10 flex flex-col items-start space-y-6 md:space-y-8 w-full">
            {/* Intro Tag */}
            <motion.div
              variants={childVariants}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 dark:border-[#262630] bg-white/50 dark:bg-[#121218]/50 backdrop-blur-sm text-xs font-semibold text-indigo-600 dark:text-indigo-400 shadow-sm"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for Freelance &amp; Roles</span>
            </motion.div>

            {/* Name Title with Editor Syntax Highlighting */}
            <motion.div variants={childVariants} className="space-y-2">
              <p className="text-slate-400 dark:text-slate-500 font-mono font-bold tracking-wide text-xs sm:text-sm uppercase select-none">
                <span className="text-pink-500 dark:text-pink-400">const</span>{" "}
                <span className="text-indigo-600 dark:text-indigo-400">
                  developer
                </span>{" "}
                <span className="text-slate-400 dark:text-slate-600">=</span>{" "}
                <span className="text-amber-500 dark:text-amber-400">
                  &#123;
                </span>
              </p>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-none pl-4">
                Imtiaz Ali
              </h1>
              <p className="text-slate-400 dark:text-slate-500 font-mono font-bold tracking-wide text-xs sm:text-sm pl-4 select-none">
                <span className="text-amber-500 dark:text-amber-400">
                  &#125;
                </span>
                <span className="text-slate-400 dark:text-slate-600">;</span>
              </p>
            </motion.div>

            {/* Dynamic Subtitle */}
            <motion.div
              variants={childVariants}
              className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent min-h-[2rem]"
            >
              <span>I'm a </span>
              <Typewriter words={words} />
            </motion.div>

            {/* Short Pitch with Improved Text Readability */}
            <motion.p
              variants={childVariants}
              className="max-w-xl text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base md:text-lg font-medium"
            >
              Junior Full Stack Developer with 1 year of hands-on experience. I
              build modern, responsive, and user focused web applications using
              React, Vue.js, Laravel, Node.js, and Electron.js.
            </motion.p>

            {/* Call to Actions */}
            <motion.div
              variants={childVariants}
              className="flex flex-col sm:flex-row items-center gap-4 pt-2 w-full sm:w-auto"
            >
              <Button
                variant="primary"
                onClick={(e) => handleScroll(e, "#projects")}
                className="w-full sm:w-auto glow-btn bg-indigo-600 text-white hover:bg-indigo-700 font-bold px-8 py-3.5 flex items-center justify-center gap-2 shadow-lg hover:shadow-indigo-500/20"
              >
                <span>Explore Work</span>
                <FiArrowRight className="text-base" />
              </Button>

              <Button
                variant="outline"
                onClick={(e) => handleScroll(e, "#contact")}
                className="w-full sm:w-auto border-slate-300 text-slate-700 dark:border-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#1b1b24] font-bold px-8 py-3.5"
              >
                <span>Contact Me</span>
              </Button>
            </motion.div>

            {/* Social Links Panel with Premium Button Styling */}
            <motion.div
              variants={childVariants}
              className="flex items-center gap-4 pt-6 w-full border-t border-slate-200/40 dark:border-white/[0.04]"
            >
              <span className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase select-none mr-2">
                socials:
              </span>

              <a
                href="https://github.com/imtiazaly"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Profile"
                className="social-btn github-btn flex items-center justify-center w-11 h-11 rounded-xl text-lg text-slate-500 dark:text-slate-400 glass-panel border border-slate-200/60 dark:border-white/[0.06] hover:scale-110 active:scale-95 transition-all duration-300"
              >
                <FiGithub />
              </a>

              <a
                href="https://www.linkedin.com/in/imtiaz-ali-79476a385/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Profile"
                className="social-btn linkedin-btn flex items-center justify-center w-11 h-11 rounded-xl text-lg text-slate-500 dark:text-slate-400 glass-panel border border-slate-200/60 dark:border-white/[0.06] hover:scale-110 active:scale-95 transition-all duration-300"
              >
                <FiLinkedin />
              </a>

              <a
                href="mailto:imtiazali80102@gmail.com"
                aria-label="Email Address"
                className="social-btn email-btn flex items-center justify-center w-11 h-11 rounded-xl text-lg text-slate-500 dark:text-slate-400 glass-panel border border-slate-200/60 dark:border-white/[0.06] hover:scale-110 active:scale-95 transition-all duration-300"
              >
                <FiMail />
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side: Profile Terminal Card */}
        <motion.div
          variants={profileVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          className="lg:col-span-5 flex justify-center items-center relative"
        >
          {/* Main Wrapper with overflow-visible to show floating badges - Scaled up size constraints */}
          <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-[440px] p-4">
            {/* Sweeping neon border rotating wrapper */}
            <div className="glow-spin-container rounded-3xl p-[1px] shadow-2xl w-full">
              <div className="glow-spin-border rounded-3xl" />

              {/* Terminal Card inner container */}
              <div className="overflow-hidden w-full flex flex-col bg-[#ffffff] dark:bg-[#160f38] border border-slate-200 dark:border-[#2d1e5a] rounded-[28px] relative z-10 hover:shadow-[0_20px_50px_rgba(99,102,241,0.06)] dark:hover:shadow-[0_20px_50px_rgba(167,92,255,0.22)] hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition-all duration-500">
                {/* Terminal Header */}
                <div className="terminal-header px-5 py-3.5 flex items-center justify-between select-none">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] opacity-75" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] opacity-75" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] opacity-75" />
                  </div>
                  <div className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500">
                    profile.jpg
                  </div>
                  <div className="w-[36px]" />
                </div>

                {/* Image Frame Wrapper - Increased internal spacing */}
                <div className="p-4 sm:p-5 lg:p-6 flex justify-center items-center w-full">
                  <div className="relative group overflow-hidden rounded-2xl w-full aspect-square shadow-inner">
                    {/* Glowing color background overlay on hover inside image frame */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/25 via-transparent to-pink-500/25 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />

                    {/* Profile Picture */}
                    <img
                      src="/images/profile/rtl2.png"
                      alt="Imtiaz Ali Profile"
                      className="w-full h-full object-cover rounded-2xl filter grayscale-[10%] contrast-[105%] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badges surrounding the Profile Card (outside the overflow-hidden wrapper, animated with hardware-accelerated CSS) */}
            {/* Top-Left: React */}
            <div className="floating-badge animate-float-1 -top-1 -left-4 sm:-left-6">
              <FiLayout className="text-cyan-500 w-3.5 h-3.5" />
              <span>React.js</span>
            </div>

            {/* Top-Right: Laravel */}
            <div className="floating-badge animate-float-2 -top-3 -right-4 sm:-right-6">
              <FiServer className="text-red-500 w-3.5 h-3.5" />
              <span>Laravel</span>
            </div>

            {/* Bottom-Left: Electron */}
            <div className="floating-badge animate-float-3 bottom-12 -left-6 sm:-left-8">
              <FiCpu className="text-violet-500 w-3.5 h-3.5" />
              <span>Electron.js</span>
            </div>

            {/* Bottom-Right: Tailwind */}
            <div className="floating-badge animate-float-4 bottom-0 -right-4 sm:-right-6">
              <FiTerminal className="text-indigo-500 w-3.5 h-3.5" />
              <span>Tailwind CSS</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;