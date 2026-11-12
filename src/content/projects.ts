type ProjectLink = {
  href: `https://${string}`;
  label: string;
};

export type Project = {
  slug: string;
  title: string;
  organization: string;
  type: string;
  summary: string;
  role: string;
  period?: string;
  status: "In development" | "Public website" | "Deployed web platform" | "Online" | "Private internal tool";
  visitorAccess: "unavailable" | "public website" | "sign-in" | "public homepage only" | "internal";
  sourceVisibility: "private" | "unknown" | "public";
  technologies?: readonly string[];
  contributions: readonly string[];
  externalLink?: ProjectLink;
  sourceLink?: ProjectLink;
  media?: readonly { path: `/images/${string}`; alt: string; width: number; height: number }[];
  featured?: boolean;
};

export const projects: readonly Project[] = [
  {
    slug: "dto-recruitment-platform",
    title: "DTO Recruitment Platform",
    organization: "DTO Partners",
    type: "Full-stack recruitment product",
    summary: "A recruitment platform for candidate onboarding and discovery, with dedicated workspaces for candidates, companies and administrators.",
    role: "Software engineering, architecture, code organisation and implementation",
    status: "In development",
    visitorAccess: "unavailable",
    sourceVisibility: "private",
    technologies: ["Angular", "TypeScript", "Rust", "PostgreSQL", "Redis", "Docker", "Makefile"],
    contributions: [
      "Implemented candidate onboarding and discovery, saved profiles and recruiter expressions of interest.",
      "Worked on authentication, role-based access, privacy controls and dashboards for recruitment activity and engagement.",
    ],
    featured: true,
  },
  {
    slug: "dto-company-website",
    title: "DTO Partners Company Website",
    organization: "DTO Partners",
    type: "Company website",
    summary: "A responsive informational website for DTO Partners in English and Polish.",
    role: "Software engineering",
    status: "Public website",
    visitorAccess: "public website",
    sourceVisibility: "unknown",
    contributions: ["Delivered the informational website with English and Polish localisation."],
    externalLink: { href: "https://dtopartners.com/", label: "Visit website" },
  },
  {
    slug: "artaicare",
    title: "ArtAICare",
    organization: "ArtAICare",
    type: "Web platform",
    summary: "A MERN web platform with Python recommendation features and Sentence-BERT integration, developed within a wider team that also built a separate VR application.",
    role: "Sole programmer for the web platform within the product team",
    period: "January 2025 to 20 September 2025",
    status: "Deployed web platform",
    visitorAccess: "sign-in",
    sourceVisibility: "unknown",
    technologies: ["MongoDB", "Express.js", "React", "Node.js", "Python", "Sentence-BERT", "Nginx", "Ubuntu", "SSH"],
    contributions: [
      "Built the web platform architecture, services and APIs and integrated Python recommendation features and Sentence-BERT.",
      "Collaborated with a separate VR developer and worked on a study-specific application involving EEG data and Python scripts.",
      "Deployed the web platform on an Ubuntu VPS with Nginx and administered it over SSH.",
    ],
    externalLink: { href: "https://therapy.artaicare.com/auth/signin", label: "Platform sign-in" },
    featured: true,
  },
  {
    slug: "skald-lab-ops",
    title: "Skald Lab Ops",
    organization: "Skald Solutions",
    type: "Workshop operations backend",
    summary: "A Django backend for the operations of a workshop serving ages 8–18.",
    role: "Backend implementation",
    period: "July–October 2026",
    status: "Online",
    visitorAccess: "public homepage only",
    sourceVisibility: "unknown",
    technologies: ["Django"],
    contributions: ["Implemented backend workflows for member records, session bookings, attendance and project-progress tracking."],
    externalLink: { href: "https://skaldlab.com/", label: "Visit Skald Lab" },
    featured: true,
  },
  {
    slug: "egil",
    title: "Egil",
    organization: "Skald Solutions",
    type: "Local retrieval-augmented generation assistant",
    summary: "A local assistant that searches a curated business-audit knowledge base to answer questions about audit methodology.",
    role: "Built the assistant",
    period: "July–October 2026",
    status: "Private internal tool",
    visitorAccess: "internal",
    sourceVisibility: "private",
    technologies: ["Ollama", "Retrieval-augmented generation"],
    contributions: ["Built the retrieval-augmented assistant with local model execution through Ollama."],
  },
];
