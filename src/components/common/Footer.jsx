import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const footerLinks = [
  { name: "Home", href: "#home", type: "scroll" },
  { name: "About", href: "#about", type: "scroll" },
  { name: "Skills", href: "#skills", type: "scroll" },
  { name: "Experience", href: "#experience", type: "scroll" },
  { name: "Projects", href: "#projects", type: "scroll" },
  { name: "Contact", href: "#contact", type: "scroll" },
  { name: "Resume", href: "/resume", type: "route" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLinkClick = (e, link) => {
    e.preventDefault();

    if (link.type === "route") {
      navigate(link.href);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      if (location.pathname === "/") {
        const element = document.querySelector(link.href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        navigate("/", { state: { scrollTo: link.href } });
      }
    }
  };

  return (
    <footer className="relative z-10 w-full border-t border-slate-250 dark:border-[#2d1e5a] bg-white dark:bg-[#160f38] text-slate-700 dark:text-[#beafdc] transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold tracking-wide text-slate-900 dark:text-white flex items-center gap-1">
              <span className="bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
                Imtiaz
              </span>
              <span className="text-slate-700 dark:text-slate-300 font-extrabold font-mono text-base">&lt;dev/&gt;</span>
            </h2>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Full Stack Web Developer dedicated to writing clean, scalable code
              and crafting digital products that combine beautiful UX with high performance.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-base font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Explore
            </h3>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link)}
                    className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-base font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Connect
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Feel free to reach out via email or connect with me on social platforms.
            </p>

            <div className="flex gap-4 text-2xl pt-2">
              <a
                href="https://github.com/imtiazaly"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Profile"
                className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors duration-200"
              >
                <FaGithub />
              </a>

              <a
                href="https://www.linkedin.com/in/imtiaz-ali-79476a385/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Profile"
                className="text-slate-500 hover:text-blue-600 dark:hover:text-indigo-400 transition-colors duration-200"
              >
                <FaLinkedin />
              </a>

              <a
                href="mailto:imtiazali80102@gmail.com"
                aria-label="Email Me"
                className="text-slate-500 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-slate-200 dark:border-[#262630]/50 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-500">
          <p>© {currentYear} Imtiaz Ali. All rights reserved.</p>
          <p className="mt-4 sm:mt-0 flex items-center gap-1">
            Built with React &amp; Tailwind CSS 🚀
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;