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
  media?: readonly {
    path: `/images/${string}`;
    alt: string;
    width: number;
    height: number;
    caption?: string;
  }[];
  featured?: boolean;
};

export const visitorAccessLabels: Record<Project["visitorAccess"], string> = {
  unavailable: "No public access",
  "public website": "Open website",
  "sign-in": "Sign-in required",
  "public homepage only": "Workshop website only",
  internal: "Internal use only",
};

export const projects: readonly Project[] = [
  {
    slug: "dto-recruitment-platform",
    title: "DTO Recruitment Platform",
    organization: "DTO Partners",
    type: "Full-stack recruitment product",
    summary: "A recruitment platform with dedicated workspaces for candidates, companies and administrators.",
    role: "Full-stack engineering, architecture and code organisation",
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
    slug: "artaicare",
    title: "ArtAICare",
    organization: "ArtAICare",
    type: "Art-therapy web platform",
    summary: "An art-therapy web platform with Python recommendation features and support for a university study.",
    role: "Sole programmer for the web platform within the product team",
    period: "January 2025 to 20 September 2025",
    status: "Deployed web platform",
    visitorAccess: "sign-in",
    sourceVisibility: "unknown",
    technologies: ["MongoDB", "Express.js", "React", "Node.js", "Python", "Sentence-BERT", "Nginx", "Ubuntu", "SSH"],
    contributions: [
      "Designed the web platform architecture, built backend services and APIs, and integrated Python recommendation features and Sentence-BERT.",
      "Collaborated with a separate developer on the connection between the web platform and the VR application.",
      "Worked on a study-specific application involving EEG data and Python scripts.",
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
    summary: "Backend software for member records, bookings, attendance and project progress at a workshop for ages 8–18.",
    role: "Backend implementation",
    status: "Online",
    visitorAccess: "public homepage only",
    sourceVisibility: "unknown",
    technologies: ["Django"],
    contributions: ["Implemented backend workflows for member records, session bookings, attendance and project-progress tracking."],
    externalLink: { href: "https://skaldlab.com/", label: "Visit Skald Lab" },
    featured: true,
  },
  {
    slug: "dto-company-website",
    title: "DTO Partners Company Website",
    organization: "DTO Partners",
    type: "Company website",
    summary: "A responsive company website presenting DTO Partners in English and Polish.",
    role: "Software engineering",
    status: "Public website",
    visitorAccess: "public website",
    sourceVisibility: "unknown",
    contributions: ["Designed and built the responsive informational site with English and Polish localisation. The initial delivery had no backend."],
    externalLink: { href: "https://dtopartners.com/", label: "Visit website" },
  },
  {
    slug: "egil",
    title: "Egil",
    organization: "Skald Solutions",
    type: "Local audit assistant",
    summary: "A local assistant for querying a curated business-audit knowledge base about audit methodology and business failure modes.",
    role: "Built the assistant",
    status: "Private internal tool",
    visitorAccess: "internal",
    sourceVisibility: "private",
    technologies: ["Ollama", "Retrieval-augmented generation"],
    contributions: ["Built the assistant to retrieve relevant material from the knowledge base and use it to generate answers, with Ollama running the model locally."],
  },
];
