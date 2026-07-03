import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";
import projects from "../data/projects";
import ProjectCard from "../components/ui/ProjectCard";
import FilterButton from "../components/ui/FilterButton";
import SearchBar from "../components/ui/SearchBar";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const Projects = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [projectTypeFilter, setProjectTypeFilter] = useState("all");

  const categories = [
    "all",
    "html",
    "css",
    "javascript",
    "typescript",
    "vue",
    "react",
    "laravel",
    "node",
    "tailwind",
    "bootstrap",
    "electron",
  ];

  const filteredProjects = projects
    .filter((project) => {
      const searchText = search.toLowerCase().trim();

      // SEARCH
      const matchSearch =
        project.title?.toLowerCase().includes(searchText) ||
        project.description?.toLowerCase().includes(searchText) ||
        project.stack?.some((tech) => tech.toLowerCase().includes(searchText));

      // CATEGORY
      const matchCategory =
        filter === "all" ||
        project.stack?.some((tech) =>
          tech.toLowerCase().includes(filter.toLowerCase())
        );

      // PROJECT TYPE
      const isCompany = project.type === "company";
      const matchProjectType =
        projectTypeFilter === "all" ||
        (projectTypeFilter === "company" && isCompany) ||
        (projectTypeFilter === "personal" && !isCompany);

      return matchSearch && matchCategory && matchProjectType;
    })
    .sort((a, b) => {
      const aIsCompany = a.type === "company" ? 1 : 0;
      const bIsCompany = b.type === "company" ? 1 : 0;
      return bIsCompany - aIsCompany;
    });

  return (
    <section className="py-24 px-6 relative overflow-hidden bg-transparent min-h-screen">
      {/* Background ambient space glow highlights */}
      <div className="glow-node w-[500px] h-[500px] bg-pink-500/5 left-[5%] top-[10%] rounded-full blur-[120px] pointer-events-none" />
      <div className="glow-node w-[400px] h-[400px] bg-indigo-500/5 right-[5%] bottom-[20%] rounded-full blur-[110px] pointer-events-none" />
      <div className="glow-node w-[350px] h-[350px] bg-cyan-400/5 left-[40%] bottom-[5%] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 pt-8">
        
        {/* Back to Home CTA Button */}
        <div className="flex justify-start mb-8 select-none">
          <button
            onClick={() => {
              navigate("/");
            }}
            className="group inline-flex items-center gap-2 px-4 py-2.5 bg-[#ffffff] dark:bg-[#160f38] text-slate-700 dark:text-[#beafdc] border border-slate-200 dark:border-[#2d1e5a] hover:border-indigo-500/50 dark:hover:border-indigo-500/50 hover:text-indigo-650 dark:hover:text-indigo-300 rounded-xl text-xs font-bold transition-all duration-300 hover:-translate-x-0.5 active:translate-x-0 shadow-sm cursor-pointer"
          >
            <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300 ease-out" />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-indigo-500 dark:text-indigo-400 mb-3 select-none">
            Complete Archives
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            All Built Projects
          </h1>
          <div className="h-1.5 w-28 bg-gradient-to-r from-indigo-500 to-pink-500 mx-auto mt-5 rounded-full shadow-sm" />
        </div>

        {/* Search Control */}
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />

        {/* Project Source Filter Toggles */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8 select-none">
          <button
            onClick={() => setProjectTypeFilter("all")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-305 border cursor-pointer ${
              projectTypeFilter === "all"
                ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20"
                : "bg-[#ffffff]/80 dark:bg-[#160f38]/80 text-slate-700 dark:text-[#beafdc] border-slate-200 dark:border-[#2d1e5a] hover:border-indigo-500/50 dark:hover:border-indigo-500/50"
            }`}
          >
            All Work ({projects.length})
          </button>
          <button
            onClick={() => setProjectTypeFilter("company")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-305 border cursor-pointer flex items-center gap-2 ${
              projectTypeFilter === "company"
                ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20"
                : "bg-[#ffffff]/80 dark:bg-[#160f38]/80 text-slate-700 dark:text-[#beafdc] border-slate-200 dark:border-[#2d1e5a] hover:border-indigo-500/50 dark:hover:border-indigo-500/50"
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${projectTypeFilter === "company" ? "bg-white animate-pulse" : "bg-indigo-500"}`} />
            Company Contributions ({projects.filter((p) => p.type === "company").length})
          </button>
          <button
            onClick={() => setProjectTypeFilter("personal")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-305 border cursor-pointer ${
              projectTypeFilter === "personal"
                ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20"
                : "bg-[#ffffff]/80 dark:bg-[#160f38]/80 text-slate-700 dark:text-[#beafdc] border-slate-200 dark:border-[#2d1e5a] hover:border-indigo-500/50 dark:hover:border-indigo-500/50"
            }`}
          >
            Personal Projects ({projects.filter((p) => p.type !== "company").length})
          </button>
        </div>

        {/* Filter Selection Chips (Scrollable horizontal row) */}
        <div className="w-full overflow-x-auto no-scrollbar pb-6 mb-12 select-none">
          <div className="flex items-center justify-start md:justify-center gap-3 min-w-max px-4">
            {categories.map((cat) => (
              <FilterButton
                key={cat}
                active={filter === cat}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </FilterButton>
            ))}
          </div>
        </div>

        {/* Staggered Grid Content */}
        <AnimatePresence mode="wait">
          {filteredProjects.length > 0 ? (
            <motion.div
              key={`${filter}-${search}`} // Force re-render of container variant animation when state shifts
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  variants={cardVariants}
                  key={project.id}
                  className="h-full"
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="text-center py-20 bg-slate-50/50 dark:bg-[#160f38] border border-slate-200 dark:border-[#2d1e5a] rounded-3xl p-8 max-w-lg mx-auto"
            >
              <p className="text-base text-slate-600 dark:text-[#beafdc] font-semibold mb-2">
                No matching projects found
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                Try refining your keywords or checking another category tab.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
