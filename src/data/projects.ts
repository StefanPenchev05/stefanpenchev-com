export type ProjectMedia = {
  type: "image" | "video";
  src: string;
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
  poster?: string;
  captions?: string;
};
export const projectStatusLabels = {
  completed: "COMPLETED",
  "in-progress": "IN PROGRESS",
  concept: "CONCEPT",
} as const;
export type CaseStudy = {
  overview?: string;
  problem?: string;
  solution?: string;
  myRole?: string;
  architecture?: { nodes: string[]; description: string };
  technicalChallenges?: string[];
  screenshots?: { src: string; alt: string; caption?: string }[];
  media?: ProjectMedia[];
  result?: string;
};
export type Project = {
  number: string;
  slug: string;
  title: string;
  shortDescription: string;
  year?: string;
  role?: string;
  technologies: string[];
  category: string;
  preview: { src: string; alt: string };
  status: "concept" | "in-progress" | "completed";
  caseStudy: CaseStudy;
  links?: { github?: string; live?: string };
};
// Editorial placeholders, not claims of completed work. Replace with verified project details.
export const projects: Project[] = [
  {
    number: "01",
    slug: "personal-organizer",
    title: "Personal Organizer",
    shortDescription: "A little less friction. A little more focus.",
    role: "Full-stack development",
    technologies: ["Go", "React", "PostgreSQL", "Docker"],
    category: "PRODUCTIVITY / WEB APPLICATION",
    preview: {
      src: "/previews/organizer.svg",
      alt: "Illustrative organizer interface with a focused task list and weekly planning",
    },
    status: "concept",
    caseStudy: {
      overview:
        "A proposed productivity platform built around a Go backend and PostgreSQL. This is a placeholder for a future, documented case study.",
      problem:
        "Explore how tasks, notes and schedules can share a coherent data model.",
      solution:
        "A focused interface backed by a typed API and relational storage.",
      myRole: "Planned full-stack implementation.",
      architecture: {
        nodes: ["React client", "Go API", "PostgreSQL", "Docker"],
        description:
          "A React client talks to a Go REST API. PostgreSQL stores projects and tasks; Docker provides reproducible local services.",
      },
      technicalChallenges: [
        "Designing recurring tasks without duplicating state.",
        "Keeping authentication and data ownership explicit.",
      ],
    },
  },
  {
    number: "02",
    slug: "request-atlas",
    title: "Request Atlas",
    shortDescription: "Following the request, beyond the browser.",
    role: "Backend & API design",
    technologies: ["Node.js", "TypeScript", "Redis"],
    category: "DEVELOPER TOOLS / OBSERVABILITY",
    preview: {
      src: "/previews/atlas.svg",
      alt: "Illustrative request trace showing client, gateway, application and database",
    },
    status: "concept",
    caseStudy: {
      overview:
        "A proposed request-inspection tool for understanding how services communicate. Concept content, ready to be replaced with real implementation details.",
      problem: "Make the path of a request readable across service boundaries.",
      architecture: {
        nodes: ["Client", "API gateway", "Application", "Redis"],
        description:
          "Trace IDs connect gateway logs, service calls and cache operations in a single request view.",
      },
      technicalChallenges: [
        "Propagating trace context consistently.",
        "Presenting failures without hiding the original response.",
      ],
    },
  },
  {
    number: "03",
    slug: "local-context",
    title: "Local Context",
    shortDescription: "Your documents. A smaller, local intelligence.",
    role: "AI & backend engineering",
    technologies: ["Python", "Llama", "PostgreSQL"],
    category: "AI / LOCAL-FIRST RESEARCH",
    preview: {
      src: "/previews/context.svg",
      alt: "Illustrative document retrieval flow from local files to embeddings and a grounded answer",
    },
    status: "concept",
    caseStudy: {
      overview:
        "An exploration of retrieval-augmented generation with local models. This entry is a concept, not a claim of a deployed product.",
      problem:
        "Explore useful question answering without losing sight of source material.",
      architecture: {
        nodes: [
          "Local documents",
          "Embedding worker",
          "Vector search",
          "Llama",
        ],
        description:
          "Documents are chunked and embedded locally. Retrieved passages are supplied to a local model with explicit source references.",
      },
      technicalChallenges: [
        "Measuring retrieval quality.",
        "Making uncertainty and sources visible.",
      ],
    },
  },
  {
    number: "04",
    slug: "dispatch",
    title: "Dispatch",
    shortDescription: "Background work, brought into the foreground.",
    role: "Systems & infrastructure",
    technologies: ["Go", "Redis", "Docker", "React"],
    category: "INFRASTRUCTURE / JOB PROCESSING",
    preview: {
      src: "/previews/dispatch.svg",
      alt: "Illustrative job queue interface showing queued, processing and completed jobs",
    },
    status: "concept",
    caseStudy: {
      overview:
        "A proposed background-job system with a deliberately simple operations interface. Placeholder content for future engineering documentation.",
      problem: "Make asynchronous work inspectable and recoverable.",
      architecture: {
        nodes: ["Producer API", "Redis queue", "Go workers", "Dashboard"],
        description:
          "An API accepts jobs, Redis coordinates the queue, and Go workers process them with bounded retries.",
      },
      technicalChallenges: [
        "Idempotent processing.",
        "Backpressure and safe retry policies.",
      ],
    },
  },
];
