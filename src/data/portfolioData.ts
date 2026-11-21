export type ValuePropSegment = { text: string; bold?: boolean };

export type TechGroup = {
  title: string;
  description: string;
  tags: string[];
};

export type ProjectLink = { label: string; href: string };

export type Project = {
  id: string;
  title: string;
  summary: string;
  description: string;
  role: string;
  year: string;
  tags: string[];
  links: ProjectLink[];
  media: string;
};

export type ExperienceEntry = {
  range: string;
  current: boolean;
  badge?: string;
  title: string;
  org: string;
  description: string;
};

export type NavLink = { label: string; href: string; row: 1 | 2 };

export type SocialIconKey = "linkedin" | "github" | "instagram" | "peerlist";
export type SocialLink = { label: string; href: string; icon: SocialIconKey };

export const portfolioData = {
  // --------------------------------------------------------------- IDENTITY
  name: "Praneet Kashyap",
  brand: "Praneet.",
  role: "Full-Stack Software Engineer",
  bannerTitle: "SOFTWARE ENGINEER",
  bannerTag: "NEXT.JS · GO · TYPESCRIPT · AI",
  year: 2026,
  tagline: "Full-stack developer building scalable travel-tech & AI web apps.",
  email: "praneet.kashyap04@gmail.com",
  portrait: "/images/Potrait.png",
  meta: {
    company: "MyTravaly Worldwide",
    position: "Full-Stack Software Developer",
    location: "Bangalore, India",
  },
  valueProp: [
    { text: "I build ", bold: false },
    { text: "scalable, high-performance web products", bold: true },
    { text: " end to end — combining ", bold: false },
    { text: "Next.js, TypeScript, and Go", bold: true },
    { text: " with fast, SEO-driven architecture.", bold: false },
  ] as ValuePropSegment[],

  // ------------------------------------------------------------------- NAV
  navLinks: [
    { label: "Home", href: "#top", row: 1 },
    { label: "Skills", href: "#skills", row: 1 },
    { label: "Projects", href: "#projects", row: 1 },
    { label: "Experience", href: "#experience", row: 1 },
    { label: "Work at MyTravaly", href: "#experience", row: 2 },
    { label: "Contact", href: "#contact", row: 2 },
  ] as NavLink[],
  navBadge: { label: "AI", href: "#contact" },

  // --------------------------------------------------------------- SOCIALS
  socials: [
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/praneet-kashyap-2854a824b/",
      icon: "linkedin",
    },
    {
      label: "GitHub",
      href: "https://github.com/praneetog",
      icon: "github",
    },
  ] as SocialLink[],
  githubUrl: "https://github.com/praneetog",

  // ------------------------------------------------------------ TECH STACK
  techStackHeading: { title: "Tech Stack", aside: "The tools behind my work." },
  techStack: [
    {
      title: "Frontend & UI",
      description:
        "Fast, SEO-friendly web apps built with modern TypeScript and performance optimization.",
      tags: [
        "TypeScript",
        "JavaScript",
        "Next.js",
        "React.js",
        "Tailwind CSS",
        "HTML5",
        "CSS3",
        "Chrome DevTools",
        "Lighthouse",
      ],
    },
    {
      title: "Backend & Databases",
      description:
        "Scalable APIs, real-time rate aggregation workflows, and reliable data layers.",
      tags: [
        "Go",
        "Node.js",
        "Express.js",
        "Python",
        "Java",
        "SQL",
        "PostgreSQL",
        "MongoDB",
        "RESTful APIs",
        "Prisma",
        "Zod",
        "WebSockets",
      ],
    },
    {
      title: "Cloud, Tools & AI",
      description:
        "Edge deployments, developer tooling, and LLM-powered product workflows.",
      tags: [
        "Cloudflare Workers",
        "Firebase",
        "Git & GitHub",
        "Postman",
        "LangChain",
        "Ollama",
        "Selenium",
        "BeautifulSoup",
        "Streamlit",
        "Botpress",
      ],
    },
  ] as TechGroup[],

  // ------------------------------------------------------------- PROJECTS
  projectsHeading: {
    title: "Featured Projects",
    subtitle:
      "Production travel-tech platforms and independent full-stack & AI builds. Open a folder to explore.",
  },
  projects: [
    {
      id: "swoovo",
      title: "Swoovo",
      summary: "Real-time multi-OTA hotel price comparison platform.",
      description:
        "Built and scaled Swoovo, where multiple online travel agencies push hotel inventories for real-time rate comparison. Engineered full-stack features across Next.js and Go, optimizing backend APIs, multi-OTA price aggregation workflows, and fast SEO-friendly user flows.",
      role: "Full-Stack Software Developer",
      year: "2026",
      tags: [
        "Next.js",
        "TypeScript",
        "Go",
        "Tailwind CSS",
        "RESTful APIs",
        "SEO",
      ],
      links: [{ label: "Visit Website", href: "https://swoovo.com" }],
      media: "",
    },
    {
      id: "mytravaly",
      title: "MyTravaly",
      summary: "React-to-Next.js migration with up to 2x performance gain.",
      description:
        "Migrated the MyTravaly web application from React (JavaScript) to Next.js (TypeScript). Improved frontend performance by up to 2x through UI-level optimizations, and used Chrome DevTools and Lighthouse to enhance SEO and resolve layout and loading bottlenecks.",
      role: "Full-Stack Developer Intern",
      year: "2026",
      tags: [
        "Next.js",
        "TypeScript",
        "React.js",
        "Tailwind CSS",
        "Lighthouse",
        "SEO",
      ],
      links: [{ label: "Visit Website", href: "https://mytravaly.in" }],
      media: "",
    },
    {
      id: "parsey-ai",
      title: "Parsey AI",
      summary: "Prompt-driven AI web scraper with LangChain & Ollama.",
      description:
        "Built an AI-powered web scraper that extracts website content from a given URL and uses prompt-based instructions to retrieve specific information. Implemented DOM scraping with Selenium and BeautifulSoup, integrated LangChain with Ollama for intelligent processing, and shipped a Streamlit interface.",
      role: "Creator",
      year: "2025",
      tags: [
        "Python",
        "Streamlit",
        "BeautifulSoup",
        "LangChain",
        "Ollama",
        "Selenium",
      ],
      links: [
        {
          label: "GitHub Repository",
          href: "https://github.com/praneetog/AI-WebScraper",
        },
      ],
      media: "",
    },
    {
      id: "globetogether",
      title: "GlobeTogether",
      summary: "Travel companion platform with real-time chat & AI recs.",
      description:
        "Developed a travel companion platform that connects users traveling to the same destination and dates, enabling group creation and secure participation. Integrated AI-based destination recommendations via Botpress, real-time WebSocket chat for coordination, and safety-focused features.",
      role: "Full-Stack Developer",
      year: "2025",
      tags: [
        "React",
        "Tailwind CSS",
        "JavaScript",
        "MongoDB",
        "Express.js",
        "Node.js",
        "WebSockets",
        "Botpress",
      ],
      links: [
        {
          label: "GitHub Repository",
          href: "https://github.com/Jitendra-Devra/GlobeTogether",
        },
      ],
      media: "",
    },
  ] as Project[],

  // ------------------------------------------------------------ EXPERIENCE
  experienceHeading: {
    title: "Experience.",
    aside: ["Current work.", "Back to the foundations."],
  },
  experience: [
    {
      range: "Jul 2026 – Present",
      current: true,
      badge: "Full-Time",
      title: "Full-Stack Software Developer",
      org: "MyTravaly Worldwide, Bangalore",
      description:
        "Building and scaling Swoovo with Next.js and Go — designing multi-OTA hotel price aggregation APIs, data workflows, and fast SEO-friendly interfaces.",
    },
    {
      range: "Jan 2026 – Jun 2026",
      current: false,
      badge: "Internship",
      title: "Full-Stack Software Developer Intern",
      org: "MyTravaly Worldwide, Bangalore",
      description:
        "Migrated MyTravaly from React (JS) to Next.js (TS), delivering up to 2x frontend performance improvement and lifting SEO via Chrome DevTools and Lighthouse.",
    },
    {
      range: "2022 – 2026",
      current: false,
      badge: "CGPA 7.9/10",
      title: "B.Tech in Computer Science & Engineering",
      org: "Parul University",
      description:
        "Computer Science graduate focused on full-stack architecture, databases, and applied AI.",
    },
    {
      range: "Publication",
      current: false,
      badge: "IJSET",
      title: "Research Paper Publication",
      org: "International Journal of Science, Engineering and Technology",
      description:
        "Certified by IJSET for research paper acceptance and publishing.",
    },
    {
      range: "Certificates",
      current: false,
      title: "Generative AI & Web Development",
      org: "Coursera · Udemy",
      description:
        "Completed Generative AI for Everyone (Coursera) and Web Development Bootcamp (Udemy).",
    },
  ] as ExperienceEntry[],

  // --------------------------------------------------------------- CONTACT
  contact: {
    heading: "Let's talk.",
    copy: "Whether it's a full-time role or a freelance project, my inbox is open.",
    fields: {
      name: "What should I call you?",
      email: "you@example.com",
      message: "A little about your opportunity, project...",
    },
    submitLabel: "Send email",
  },

  // ---------------------------------------------------------------- FOOTER
  footer: {
    kicker: "See you around.",
    bigName: "PRANEET",
  },
  crowdArt: "/footer/cluster_back_1.png",
  footerFigure: "/footer/praneet-main.png",
  crowdCaption: "People who built my journey",

  // ------------------------------------------------------------ AI ASSISTANT
  ai: {
    title: "Praneet's AI Assistant",
    subtitle: "Powered by Gemini",
    heading: "Get to know Praneet's work.",
    placeholder: "Ask about Praneet...",
    greeting:
      "Hi! I'm Praneet's portfolio assistant. Ask me about Swoovo, MyTravaly, his tech stack, or how to get in touch.",
    suggestions: [
      "What did Praneet build at MyTravaly?",
      "Tell me about Swoovo",
      "What's his tech stack?",
      "Tell me about Parsey AI",
    ],
    persona:
      "Be warm, concise and professional. Speak about Praneet in the third person.",
    disclaimer: "AI can make mistakes. Confirm details with Praneet.",
  },
};

export type PortfolioData = typeof portfolioData;
