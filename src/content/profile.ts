type Experience = {
  organization: string;
  title: string;
  period: string;
  location: string;
  arrangement?: string;
  summary: string;
};

type Education = {
  institution: string;
  programme: string;
  period: string;
  summary?: string;
};

type TextSection = { title: string; summary: string };

export const identity = {
  name: "Stefan Penchev",
  role: "Full-Stack & Backend Developer",
  location: "Luxembourg",
  intro: "I build complete web applications and the systems behind them.",
  email: "penchev.stefan@icloud.com",
  linkedin: "https://www.linkedin.com/in/stefan-penchev-31b94a318/",
} as const;

export const availability = {
  employment: {
    title: "Roles starting January 2027",
    summary: "Open to junior full-stack and backend roles at startups, with internships as an alternative. On-site in Luxembourg or remote across Europe.",
    action: "Discuss a role",
    subject: "Employment enquiry",
  },
  freelance: {
    title: "Freelance projects",
    summary: "Available for selected application and backend projects, depending on scope.",
    action: "Discuss a project",
    subject: "Freelance project enquiry",
  },
} as const;

export const services: readonly TextSection[] = [
  { title: "Complete applications", summary: "Full-stack development for web applications, from the interface to the backend." },
  { title: "Backend and API development", summary: "Backend services and APIs for new or existing applications." },
];

export const experience: readonly Experience[] = [
  {
    organization: "DTO Partners",
    title: "Software Engineer",
    period: "January 2025–present",
    location: "Remote",
    arrangement: "Part-time, project-based",
    summary: "Developing a recruitment platform and a separate company website. Work across the engagement includes automated testing, Docker and CI/CD.",
  },
  {
    organization: "Skald Solutions",
    title: "Software Developer",
    period: "July–October 2026",
    location: "Bulgaria",
    arrangement: "Paid internship",
    summary: "Implemented the Skald Lab Ops backend, built the Egil local RAG assistant and contributed to a Bulgarian-language educational catalogue.",
  },
  {
    organization: "ArtAICare",
    title: "Software Engineer",
    period: "January–September 2025",
    location: "Esch-sur-Alzette, Luxembourg",
    arrangement: "Internship",
    summary: "Built and deployed the MERN web platform, integrated Python recommendation features and collaborated with a separate VR developer.",
  },
  {
    organization: "MindHub Coding Schools",
    title: "Teacher",
    period: "September 2023–September 2024",
    location: "Pazardzhik, Bulgaria",
    summary: "Taught Scratch and algorithmic reasoning to children aged 8–12, Python and web development to teenagers, and led micro:bit activities.",
  },
];

export const education: readonly Education[] = [
  {
    institution: "University of Luxembourg",
    programme: "Bachelor in Computer Science",
    period: "September 2024–present",
  },
  {
    institution: "TU Wien",
    programme: "Erasmus exchange in Informatics",
    period: "February–July 2026",
    summary: "Focused on autonomous racing with C++ and Python.",
  },
  {
    institution: "IT Kariera",
    programme: "Certificate in Software Development",
    period: "Completed July 2024",
    summary: "Two-year programme in Plovdiv through Bulgaria’s Ministry of Education, covering C#, MySQL, Haskell, PHP and C++/Arduino projects.",
  },
];

export const skills: readonly { group: string; items: readonly string[] }[] = [
  { group: "Programming languages", items: ["Rust", "Go", "TypeScript", "JavaScript", "Python", "C++"] },
  { group: "Backend and APIs", items: ["Node.js", "Express.js", "Django", "Swagger", "Postman"] },
  { group: "Frontend", items: ["React", "Angular", "Next.js", "HTML5", "CSS3", "Tailwind CSS", "Sass", "MUI"] },
  { group: "Data and platforms", items: ["PostgreSQL", "MongoDB", "Redis", "Mongoose", "Prisma", "Firebase", "Supabase"] },
  { group: "Local AI and retrieval", items: ["Sentence-BERT", "Ollama", "RAG"] },
  { group: "Delivery and testing", items: ["Git/GitHub", "Docker", "Linux", "Nginx", "SSH", "CI/CD", "Jest", "Vitest", "Cypress", "Playwright"] },
];

export const spokenLanguages = ["Bulgarian (native)", "English (C1)"] as const;

export const story: { intro: string; chapters: readonly TextSection[] } = {
  intro: "I started with C++ shape challenges at ten. Teaching and building web platforms led me to explore how applications are organised and how they behave at runtime.",
  chapters: [
    {
      title: "It started with a pyramid",
      summary: "At ten, in fourth grade, I started writing C++ programs that drew shapes such as pyramids. I kept studying C++ through the start of seventh grade, learning about pointers and memory alongside Arduino and electronics in robotics classes.",
    },
    {
      title: "From exercises to applications",
      summary: "I studied C#, databases, desktop applications and asynchronous programming, and completed a two-year software development programme in Bulgaria. Around eleventh grade I started building with JavaScript, TypeScript, React, Node.js and MongoDB. I entered full-stack competitions and taught coding during my final school year.",
    },
    {
      title: "Building it was only the beginning",
      summary: "I moved to Luxembourg for university and worked on MERN products. Working on real web platforms made me curious about how their architecture and runtime behaviour change as they grow. That led me to explore Go and later Rust.",
    },
    {
      title: "Still exploring what is underneath",
      summary: "During my Erasmus semester in Vienna, I focused on autonomous racing with C++ and Python and explored interests in machine learning, deep learning and security. After my internship at Skald, I returned to Luxembourg, where I’m working on a full-stack application.",
    },
  ],
};
