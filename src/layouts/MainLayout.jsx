import { useEffect } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import ScrollToTopButton from "../components/common/ScrollToTopButton";
import { useTheme } from "../context/ThemeContext";
import projects from "../data/projects";
import CodeWorldBackground from "../components/ui/CodeWorldBackground";
import LightCodeWorldBackground from "../components/ui/LightCodeWorldBackground";

const MainLayout = () => {
  const { theme } = useTheme();
  const location = useLocation();
  const params = useParams();

  // Dynamic SEO Page Resolution
  useEffect(() => {
    let title = "Imtiaz Ali | Full Stack Developer";
    let desc = "Professional developer portfolio of Imtiaz Ali. Full Stack Developer at Softleed Company, showcasing a comprehensive collection of 30+ personal applications.";
    let keywords = "Imtiaz Ali, Full Stack Developer, Software Engineer, Portfolio, Softleed, React, Vue, Laravel, Electron.js, Pakistan, Tailwind CSS, 30 Projects";
    let image = "/images/about/portfolio.png";

    const path = location.pathname;

    if (path === "/projects") {
      title = "Projects Showcase | Imtiaz Ali";
      desc = "Browse through all 30+ web development and desktop projects built by Imtiaz Ali. Filter by React, Vue, Laravel, and Electron.";
      keywords = "Projects Showcase, Web Apps, Developer Portfolio, Laravel Projects, React Apps, Electron Desktop Apps, Vue Components, Imtiaz Ali";
    } else if (path === "/resume") {
      title = "Resume & Technical Skills | Imtiaz Ali";
      desc = "Download the official software engineering resume of Imtiaz Ali. Review full-stack development achievements and core qualifications.";
      keywords = "Resume, Technical Skills, Career Timeline, Qualifications, Softleed Company, Imtiaz Ali resume, PDF Resume, Software Engineer CV";
    } else if (path.startsWith("/projects/")) {
      const projId = Number(params.id || path.split("/").pop());
      const project = projects.find((p) => p.id === projId);
      if (project) {
        title = `${project.title} | Imtiaz Ali`;
        desc = project.description || desc;
        if (project.image) {
          image = project.image;
        }
        const stackKeywords = project.stack ? project.stack.join(", ") : "";
        keywords = `${project.title}, ${project.category}, ${stackKeywords}, Imtiaz Ali Portfolio`;
      } else {
        title = "Project Details | Imtiaz Ali";
      }
    } else if (path !== "/") {
      title = "404 Not Found | Imtiaz.dev";
    }

    // Update document title
    document.title = title;

    // Helper function to set or create meta elements
    const setMetaTag = (attrName, attrValue, contentValue) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute("content", contentValue);
    };

    // Construct absolute URLs
    const origin = window.location.origin || "https://imtiazali.dev";
    const absoluteImage = image.startsWith("http") ? image : `${origin}${image}`;
    const absoluteUrl = `${origin}${path}`;

    // Update Meta Tags
    setMetaTag("name", "description", desc.slice(0, 160));
    setMetaTag("name", "keywords", keywords);

    // OpenGraph
    setMetaTag("property", "og:title", title);
    setMetaTag("property", "og:description", desc);
    setMetaTag("property", "og:image", absoluteImage);
    setMetaTag("property", "og:url", absoluteUrl);

    // Twitter
    setMetaTag("property", "twitter:title", title);
    setMetaTag("property", "twitter:description", desc);
    setMetaTag("property", "twitter:image", absoluteImage);
    setMetaTag("property", "twitter:url", absoluteUrl);

    // Update Canonical URL Link tag
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", absoluteUrl);
  }, [location.pathname, params]);

  return (
    <div
      className={`
        min-h-screen transition-colors duration-500
        ${theme === "dark" ? "bg-[#080416] text-slate-100" : "bg-[#fcfaff] text-slate-900"}
      `}
    >
      {/* 3D background based on active theme */}
      {theme === "dark" ? <CodeWorldBackground /> : <LightCodeWorldBackground />}

      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default MainLayout;