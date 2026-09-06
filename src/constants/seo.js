// src/constants/seo.js

export const SEO_CONFIG = {
  siteName: "Imtiaz Ali | Full Stack Developer",
  siteUrl: "https://your-domain.com", // replace after deploy

  defaultTitle: "Full Stack Developer Portfolio",
  defaultDescription:
    "Portfolio of a Full Stack Web Developer with 1 year experience building real-world applications using React, Vue, Laravel, and Electron.js.",

  keywords: [
    "Full Stack Developer",
    "React Developer",
    "Vue Developer",
    "Laravel Developer",
    "JavaScript Developer",
    "Frontend Developer Portfolio",
    "Backend Developer Portfolio",
    "Web Developer Pakistan",
  ],

  author: "Imtiaz Ali",

  social: {
    twitter: "@yourhandle",
    linkedin: "https://linkedin.com/in/yourprofile",
    github: "https://github.com/imtiazaly",
  },
};

export const generateMetaTags = ({
  title,
  description,
  image,
  url,
}) => {
  return {
    title: title || SEO_CONFIG.defaultTitle,
    description: description || SEO_CONFIG.defaultDescription,
    image: image || "/images/profile/profile.jpg",
    url: url || SEO_CONFIG.siteUrl,
  };
};