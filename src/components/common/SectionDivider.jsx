import React from "react";
import { motion } from "framer-motion";

const SectionDivider = ({ className = "" }) => {
  return (
    <div
      className={`relative w-full max-w-7xl mx-auto px-6 select-none overflow-hidden ${className}`}
    >
      {/* 1. Base Subtle 1px Track Line (Edges fade to transparent) */}
      <div className="relative w-full h-[2px] bg-gradient-to-r from-transparent via-slate-300/60 dark:via-[#2d1e5a]/80 to-transparent flex items-center justify-center">
        {/* 2. Moving Glowing Laser Beam (Left to Right to Left Ping-Pong) */}
        <motion.div
          className="absolute h-[2px] w-36 sm:w-56 bg-gradient-to-r from-transparent via-indigo-500 to-pink-500 rounded-full"
          style={{
            boxShadow:
              "0 0 12px rgba(168, 85, 247, 0.6), 0 0 24px rgba(99, 102, 241, 0.4)",
          }}
          animate={{
            x: ["-250%", "250%"],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />

        {/* 3. Center Tech Accent Diamond with Subtle Glow */}
        <div className="relative z-10 flex items-center justify-center">
          <span className="w-2 h-2 rotate-45 rounded-[1px] bg-gradient-to-tr from-indigo-500 to-pink-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
          <span className="absolute w-3.5 h-3.5 rotate-45 rounded-[1px] border border-indigo-400/40 animate-ping opacity-30" />
        </div>
      </div>
    </div>
  );
};

export default SectionDivider;
