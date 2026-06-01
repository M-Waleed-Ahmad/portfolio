export const sectionOrder = ["hero", "about", "skills", "projects", "experience", "contact"];

export const sectionMeta = {
  hero: {
    label: "Hero",
    camera: [0, 1.2, 12],
    target: [0, 1.2, 0],
  },
  about: {
    label: "About",
    camera: [12, 2.2, -2],
    target: [12, 1.2, -10],
  },
  skills: {
    label: "Skills",
    camera: [-14, 3.2, -28],
    target: [-10, 1.4, -36],
  },
  projects: {
    label: "Projects",
    camera: [0, 2.3, -50],
    target: [0, 1.3, -60],
  },
  experience: {
    label: "Experience",
    camera: [18, 2.7, -72],
    target: [8, 1.1, -83],
  },
  contact: {
    label: "Contact",
    camera: [0, 1.5, -102],
    target: [0, 1.2, -114],
  },
};

export const heroRoles = [
  "Full-Stack Developer",
  "Automation Engineer",
  "React & Flutter",
  "I ship things that work.",
];

export const aboutStats = [
  { label: "Years Building", value: 3, suffix: "+" },
  { label: "Projects Shipped", value: 5, suffix: "+" },
  { label: "Lighthouse", value: 90, suffix: "+" },
  { label: "Admin Overhead Cut", value: 30, suffix: "%" },
];

export const skills = {
  frontend: ["React", "React Native", "Flutter", "TypeScript", "JavaScript", "Tailwind CSS"],
  backend: ["FastAPI", "Node.js", "Python", "Laravel", "Supabase", "SQL"],
  automation: ["Playwright", "Cypress", "GitHub Actions", "CI/CD", "PyTorch", "Git"],
};

export const projects = [
  {
    name: "DeepShield",
    description:
      "AI deepfake detection backend with UCF dual-encoder + Xception CNN and Grad-CAM++ explainability.",
    tags: ["FastAPI", "PyTorch", "Xception", "Grad-CAM++"],
    github: "https://github.com/M-Waleed-Ahmad/Deepshield-AI-Forgery-Detector-FYP",
  },
  {
    name: "Arabia Hills",
    description:
      "Real estate platform with 20+ listings and sub-second retrieval for property discovery workflows.",
    tags: ["React", "Supabase", "Listings", "Performance"],
    github: "https://github.com/TechVerto-Admin/dubai-dreams-frontend",
  },
  {
    name: "WePsych",
    description:
      "Flutter app for an Austrian psychiatric healthcare firm that reduced admin overhead by around 30%.",
    tags: ["Flutter", "Healthcare", "Product Delivery"],
    github: null,
  },
  {
    name: "ALFA CLUB",
    description:
      "React ecommerce storefront tuned for UX and speed, scoring 90+ in Lighthouse audits.",
    tags: ["React", "Ecommerce", "Lighthouse"],
    github: "https://github.com/TechVerto-Admin/alfa-club-zenith",
  },
  {
    name: "Zillabyte & CCHROME",
    description:
      "Agency websites in React + Cloudinary with media delivery optimization for 40% faster asset load.",
    tags: ["React", "Cloudinary", "Media Optimization"],
    github: "https://github.com/ArsalanAhmed03/cyber-node-studio",
  },
];

export const experience = [
  {
    company: "Axelliant",
    role: "Automation & CI/CD Engineer",
    dates: "04/2025 - 02/2026",
    bullets: [
      "Built CI/CD infrastructure with GitHub Actions and parallelized pipelines.",
      "Developed Playwright and Cypress frameworks that reduced testing from 2-3 days to 2 hours.",
    ],
  },
  {
    company: "Ashtex Solutions",
    role: "Software Engineer & Asst. Project Manager",
    dates: "06/2024 - 10/2024",
    bullets: [
      "Shipped React features for client-facing products across active sprint cycles.",
      "Managed sprints and cross-team delivery using Agile/Scrum practices.",
    ],
  },
  {
    company: "Arrivy",
    role: "QA Engineer Intern",
    dates: "06/2023 - 08/2023",
    bullets: [
      "Handled QA for an employee management system and automation tool.",
      "Collaborated within a 7-member intern team to ship both products to production.",
    ],
  },
];

export const contact = {
  email: "waleed.ahmadmunir@gmail.com",
  linkedIn: "https://linkedin.com/in/waleed-ahmad-0bb087260",
  github: "https://github.com/M-Waleed-Ahmad",
  phone: "+92 334-5619443",
};
