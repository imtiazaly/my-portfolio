import { useState } from "react";
import emailjs from "@emailjs/browser";
import { FiSend, FiMail, FiUser, FiMessageSquare, FiAlertTriangle, FiCheckCircle, FiMapPin, FiGithub, FiLinkedin } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");

    // Read keys from env or fallback to defaults
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_oan2pr1";
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_ptz4kuf";
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "2Imi5Zz77zKZcQds5";

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        publicKey
      );

      setSuccess(true);
      setFormData({ name: "", email: "", message: "" });

      // Auto-hide success banner after 5 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (err) {
      console.error("Email send failed:", err);
      setError("Failed to send message. Please contact me directly at imtiazali80102@gmail.com.");

      // Auto-hide error banner after 6 seconds
      setTimeout(() => {
        setError("");
      }, 6000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden bg-transparent">
      {/* Background ambient space glow highlights */}
      <div className="glow-node w-[500px] h-[500px] bg-pink-500/5 right-[-200px] top-[10%] rounded-full blur-[120px] pointer-events-none" />
      <div className="glow-node w-[400px] h-[400px] bg-indigo-500/5 left-[-150px] bottom-[15%] rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Title Block */}
        <div className="text-center mb-20 animate-fade-in">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-indigo-500 dark:text-indigo-400 mb-3 select-none">
            Get In Touch
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Let's Collaborate
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-indigo-500 to-pink-500 mx-auto mt-4 rounded-full shadow-sm" />
        </div>

        {/* Staggered Grid Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch text-left"
        >
          
          {/* Left Column: Stack of Premium Contact Info Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between">
            
            {/* Card 1: Email Address */}
            <motion.div
              variants={itemVariants}
              className="group bg-[#ffffff] dark:bg-[#160f38] border border-slate-200 dark:border-[#2d1e5a] rounded-3xl p-6 relative overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(99,102,241,0.04)] dark:hover:shadow-[0_15px_30px_rgba(167,92,255,0.15)] hover:border-indigo-500/40 dark:hover:border-indigo-500/40"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(circle_at_10%_15%,rgba(99,102,241,0.1)_0%,transparent_60%)]" />
              <div className="flex items-center gap-4 relative z-10">
                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border border-indigo-500/20 shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-300">
                  <FiMail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-1.5 select-none">Direct Email</p>
                  <span className="font-mono text-sm sm:text-base font-extrabold text-slate-900 dark:text-[#f0ebff] select-all">
                    imtiazali80102@gmail.com
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Location & Availability */}
            <motion.div
              variants={itemVariants}
              className="group bg-[#ffffff] dark:bg-[#160f38] border border-slate-200 dark:border-[#2d1e5a] rounded-3xl p-6 relative overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(16,185,129,0.04)] dark:hover:shadow-[0_15px_30px_rgba(16,185,129,0.15)] hover:border-emerald-500/40 dark:hover:border-emerald-500/40"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(circle_at_10%_15%,rgba(16,185,129,0.1)_0%,transparent_60%)]" />
              <div className="flex items-center gap-4 relative z-10">
                <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border border-emerald-500/20 shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-300">
                  <FiMapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-1.5 select-none">Location &amp; Status</p>
                  <span className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-[#f0ebff]">
                    Karachi, Pakistan — Online
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Card 3: Social Channels */}
            <motion.div
              variants={itemVariants}
              className="group bg-[#ffffff] dark:bg-[#160f38] border border-slate-200 dark:border-[#2d1e5a] rounded-3xl p-6 relative overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(244,63,94,0.04)] dark:hover:shadow-[0_15px_30px_rgba(244,63,94,0.15)] hover:border-pink-500/40 dark:hover:border-pink-500/40"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(circle_at_10%_15%,rgba(244,63,94,0.1)_0%,transparent_60%)]" />
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-pink-500/10 text-pink-500 dark:text-pink-400 border border-pink-500/20 shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-300">
                    <FiSend className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-1.5 select-none">Quick Links</p>
                    <span className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-[#f0ebff]">
                      Developer Socials
                    </span>
                  </div>
                </div>

                <div className="flex gap-2.5 w-full sm:w-auto">
                  <a
                    href="https://github.com/imtiazaly"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-grow sm:flex-grow-0 inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-100 dark:bg-slate-900 text-slate-650 dark:text-[#beafdc] border border-slate-200 dark:border-[#2d1e5a] hover:border-indigo-500/50 hover:bg-slate-200 dark:hover:bg-slate-800 dark:hover:text-white rounded-xl text-xs font-bold transition-all"
                  >
                    <FiGithub />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/imtiaz-ali-79476a385/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-grow sm:flex-grow-0 inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-100 dark:bg-slate-900 text-slate-650 dark:text-[#beafdc] border border-slate-200 dark:border-[#2d1e5a] hover:border-indigo-500/50 hover:bg-slate-200 dark:hover:bg-slate-800 dark:hover:text-white rounded-xl text-xs font-bold transition-all"
                  >
                    <FiLinkedin />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Premium Glassmorphic Form Card */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-7 flex flex-col"
          >
            <form
              onSubmit={handleSubmit}
              className="bg-[#ffffff] dark:bg-[#160f38] border border-slate-200 dark:border-[#2d1e5a] rounded-[28px] p-6 md:p-8 flex flex-col justify-between h-full hover:shadow-[0_20px_50px_rgba(99,102,241,0.06)] dark:hover:shadow-[0_20px_50px_rgba(167,92,255,0.22)] hover:border-indigo-500/40 dark:hover:border-indigo-500/40 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] relative overflow-hidden"
            >
              {/* Category-themed glowing backdrop on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl bg-[radial-gradient(circle_at_90%_10%,rgba(167,92,255,0.12)_0%,transparent_60%)]" />

              <div className="space-y-6 relative z-10">
                
                {/* Form Field Name */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-[#beafdc]/60">
                    Your Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                      <FiUser className="w-4.5 h-4.5" />
                    </div>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Imtiaz Ali"
                      className="w-full pl-11 pr-4 py-3.5 bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200 dark:border-[#2d1e5a] hover:border-indigo-500/40 dark:hover:border-indigo-500/40 text-slate-900 dark:text-[#f0ebff] rounded-2xl outline-none transition-all focus:bg-white dark:focus:bg-slate-950/80 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium"
                      required
                    />
                  </div>
                </div>

                {/* Form Field Email */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-[#beafdc]/60">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                      <FiMail className="w-4.5 h-4.5" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      className="w-full pl-11 pr-4 py-3.5 bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200 dark:border-[#2d1e5a] hover:border-indigo-500/40 dark:hover:border-indigo-500/40 text-slate-900 dark:text-[#f0ebff] rounded-2xl outline-none transition-all focus:bg-white dark:focus:bg-slate-950/80 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium"
                      required
                    />
                  </div>
                </div>

                {/* Form Field Message */}
                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-[#beafdc]/60">
                    Inquiry Details
                  </label>
                  <div className="relative">
                    <div className="absolute top-4 left-0 pl-4 pointer-events-none text-slate-400 dark:text-slate-500">
                      <FiMessageSquare className="w-4.5 h-4.5" />
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe what we are building or project parameters..."
                      rows="4"
                      className="w-full pl-11 pr-4 py-3.5 bg-slate-50/50 dark:bg-slate-950/40 border border-slate-200 dark:border-[#2d1e5a] hover:border-indigo-500/40 dark:hover:border-indigo-500/40 text-slate-900 dark:text-[#f0ebff] rounded-2xl outline-none transition-all focus:bg-white dark:focus:bg-slate-950/80 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 text-sm font-medium resize-none leading-relaxed"
                      required
                    />
                  </div>
                </div>

              </div>

              {/* Feedback Alert Feedbacks & Send Action */}
              <div className="mt-8 pt-4 border-t border-slate-150 dark:border-[#2d1e5a]/40 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 relative z-10 shrink-0">
                <div className="flex-grow text-xs font-bold">
                  <AnimatePresence mode="wait">
                    {success && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 px-4 py-2.5 rounded-xl flex items-center gap-2.5 shadow-sm inline-flex"
                      >
                        <FiCheckCircle className="shrink-0 text-base text-emerald-500" />
                        <span>Message sent successfully!</span>
                      </motion.div>
                    )}
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="bg-rose-500/10 dark:bg-rose-500/20 border border-rose-500/30 text-rose-600 dark:text-rose-400 px-4 py-2.5 rounded-xl flex items-center gap-2.5 shadow-sm inline-flex"
                      >
                        <FiAlertTriangle className="shrink-0 text-base text-rose-500" />
                        <span>{error}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Send Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="glow-btn inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/25 active:scale-98 rounded-2xl text-xs font-extrabold tracking-wider uppercase transition-all duration-350 cursor-pointer disabled:opacity-50 shrink-0"
                >
                  {loading ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <FiSend className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>

            </form>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
