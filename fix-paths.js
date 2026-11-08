// fix-paths.js
import fs from "fs";
import path from "path";

const jsonPath = "./src/data/projects.json";
const projects = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

function resolveImagePath(imgPath, projectType) {
  if (!imgPath || typeof imgPath !== "string") return imgPath;

  // Agar pehle se company/web/mobile laga hua hai toh chhor dein
  if (
    imgPath.includes("/images/projects/company/") ||
    imgPath.includes("/images/projects/web/") ||
    imgPath.includes("/images/projects/mobile/")
  ) {
    return imgPath;
  }

  const prefix = "/images/projects/";
  if (!imgPath.startsWith(prefix)) return imgPath;

  const rest = imgPath.slice(prefix.length); // e.g. "softleed-web/softleed1.png"
  const categories = ["company", "web", "mobile"];

  // 1. Check karein agar project.type wale folder mein file mojood hai
  const cleanType = (projectType || "").toLowerCase();
  if (categories.includes(cleanType)) {
    const candidate = path.join(
      "public",
      "images",
      "projects",
      cleanType,
      rest,
    );
    if (fs.existsSync(candidate)) {
      return `/images/projects/${cleanType}/${rest.replace(/\\/g, "/")}`;
    }
  }

  // 2. Agar nahi, toh baki folders mein check karein ke file kahan mojood hai
  for (const cat of categories) {
    const candidate = path.join("public", "images", "projects", cat, rest);
    if (fs.existsSync(candidate)) {
      return `/images/projects/${cat}/${rest.replace(/\\/g, "/")}`;
    }
  }

  // 3. Fallback: default to project.type or 'web'
  const fallbackCat = categories.includes(cleanType) ? cleanType : "web";
  return `/images/projects/${fallbackCat}/${rest.replace(/\\/g, "/")}`;
}

let updatedCount = 0;

const updatedProjects = projects.map((project) => {
  const updatedImage = resolveImagePath(project.image, project.type);
  const updatedImages = Array.isArray(project.images)
    ? project.images.map((img) => resolveImagePath(img, project.type))
    : [];

  if (updatedImage !== project.image) {
    updatedCount++;
  }

  return {
    ...project,
    image: updatedImage,
    images: updatedImages,
  };
});

fs.writeFileSync(jsonPath, JSON.stringify(updatedProjects, null, 2), "utf-8");
console.log(
  `✅ Success! Updated image paths for ${updatedCount} projects in projects.json.`,
);
