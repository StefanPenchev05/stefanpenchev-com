export type EngineeringDomain =
  | "frontend"
  | "mobile"
  | "backend"
  | "data"
  | "systems"
  | "networking"
  | "security"
  | "ai-ml"
  | "infrastructure"
  | "education"
  | "product";

export type ProjectContext = "professional" | "founder" | "personal" | "academic";

export type ProjectCategory =
  | "Full-stack web application"
  | "Mobile product"
  | "Backend system"
  | "Commercial platform"
  | "Realtime application"
  | "Networking / systems project"
  | "Autonomous systems project";

export type VisualizationType =
  | "ai-product-platform"
  | "mobile-marketplace-system"
  | "finance-rest-system"
  | "commercial-platform"
  | "realtime-community"
  | "protocol-server"
  | "autonomous-systems";

export type ArchitectureNodeType =
  | "client"
  | "api"
  | "service"
  | "auth"
  | "database"
  | "cache"
  | "queue"
  | "worker"
  | "external"
  | "ai"
  | "ai-component"
  | "network"
  | "network-protocol"
  | "runtime"
  | "unknown";

export type ArchitectureGroupRole =
  | "public"
  | "application"
  | "data"
  | "internal"
  | "external"
  | "security"
  | "ai";

export type ArchitectureNodeStatus =
  | "normal"
  | "secure"
  | "data"
  | "external"
  | "warning";

export type ArchitectureNode = {
  id: string;
  label: string;
  type: ArchitectureNodeType;
  technology?: string;
  group?: string;
  semanticRole?: string;
  status?: ArchitectureNodeStatus;
  confidence: "documented" | "conceptual" | "unconfirmed";
};

export type ArchitectureEdge = {
  from: string;
  to: string;
  meaning: string;
  direction?: "forward" | "bidirectional";
  semanticRole?: string;
  confidence: "documented" | "conceptual" | "unconfirmed";
};

export type ArchitectureGroup = {
  id: string;
  label: string;
  role: ArchitectureGroupRole;
};

export type RequestPathStep = {
  nodeId: string;
  state:
    | "request sent"
    | "authentication"
    | "processing"
    | "cache hit"
    | "database query"
    | "ai processing"
    | "response";
  label?: string;
  description?: string;
};

export type ProjectArchitecture = {
  note: string;
  groups?: ArchitectureGroup[];
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
  requestPath?: RequestPathStep[];
};

export type PortfolioProject = {
  id: string;
  title: string;
  category: ProjectCategory;
  description: string;
  impact: string;
  stack: string[];
  domains: EngineeringDomain[];
  featured: boolean;
  hierarchyRank: number;
  context: ProjectContext;
  link?: string;
  visualizationType: VisualizationType;
  architecture?: ProjectArchitecture;
};

export type Experience = {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  summary: string;
  highlights: string[];
  relatedProjectIds?: string[];
  domains: EngineeringDomain[];
};

export type EducationEntry = {
  id: string;
  institution: string;
  program: string;
  location: string;
  period: string;
  summary: string;
  highlights: string[];
  focus: string;
  domains: EngineeringDomain[];
  relatedProjectIds?: string[];
};

export type TechnologyGroupId =
  | "languages"
  | "frontend-mobile"
  | "backend-apis"
  | "data"
  | "systems-networking"
  | "ai-ml"
  | "tooling-delivery";

export type Technology = {
  name: string;
  group: TechnologyGroupId;
  url?: string;
  iconUrl?: string;
  domains: EngineeringDomain[];
};

export type SkillGroup = {
  id: string;
  title: string;
  skills: string[];
  domains: EngineeringDomain[];
};

export const profile = {
  name: "Stefan Penchev",
  title: "Software Engineer",
  location: "Vienna, Austria",
  email: "penchev.stefan@icloud.com",
  phone: "+352 661 295 370",
  linkedinUrl: "https://linkedin.com/in/stefan-penchev-31b94a318/",
  portfolioUrl: "https://stefanpenchev05.github.io/Portfolio/",
  githubUrl: undefined,
  positioning:
    "Full-stack systems, backend architecture, AI-integrated products, and security-aware engineering.",
  intro:
    "Computer Science student and software engineer focused on full-stack development, scalable backend systems, and AI-integrated products."
} as const;

export const projects: PortfolioProject[] = [
  {
    id: "artaicare-therapy-platform",
    title: "ArtAICare Therapy Platform",
    category: "Full-stack web application",
    description:
      "Platform for art therapists and patients with AI-generated image suggestions, mood tracking, and EEG brain activity monitoring. Built the full backend, frontend, and Python AI models from architecture to deployment.",
    impact:
      "In production - therapy.artaicare.com. Owned the complete technical stack across a multi-disciplinary product team.",
    stack: ["TypeScript", "React", "Node.js", "Python", "MongoDB", "Redis", "TailwindCSS"],
    domains: ["frontend", "backend", "data", "ai-ml", "product"],
    featured: true,
    hierarchyRank: 1,
    context: "professional",
    link: "https://therapy.artaicare.com/auth/signin",
    visualizationType: "ai-product-platform",
    architecture: {
      note:
        "Conservative conceptual model based only on documented technologies. Exact runtime relationships need confirmation.",
      groups: [
        {
          id: "client-facing",
          label: "Client-facing layer",
          role: "public"
        },
        {
          id: "application",
          label: "Application layer",
          role: "application"
        },
        {
          id: "data-services",
          label: "Data services",
          role: "data"
        },
        {
          id: "ai-services",
          label: "AI integration",
          role: "ai"
        }
      ],
      nodes: [
        {
          id: "react-client",
          label: "React Client",
          type: "client",
          technology: "React",
          group: "client-facing",
          semanticRole: "Therapist and patient interface",
          status: "normal",
          confidence: "documented"
        },
        {
          id: "node-api",
          label: "Node.js Application/API",
          type: "api",
          technology: "Node.js",
          group: "application",
          semanticRole: "Application request handling",
          status: "secure",
          confidence: "documented"
        },
        {
          id: "mongodb",
          label: "MongoDB",
          type: "database",
          technology: "MongoDB",
          group: "data-services",
          semanticRole: "Persistent application data",
          status: "data",
          confidence: "documented"
        },
        {
          id: "redis",
          label: "Redis",
          type: "cache",
          technology: "Redis",
          group: "data-services",
          semanticRole: "Cache / fast data component",
          status: "data",
          confidence: "documented"
        },
        {
          id: "python-ai",
          label: "Python AI Component",
          type: "ai",
          technology: "Python",
          group: "ai-services",
          semanticRole: "AI-generated image suggestion component",
          status: "normal",
          confidence: "documented"
        }
      ],
      edges: [
        {
          from: "react-client",
          to: "node-api",
          meaning: "Application request path",
          direction: "forward",
          semanticRole: "request",
          confidence: "conceptual"
        },
        {
          from: "node-api",
          to: "mongodb",
          meaning: "Documented data component",
          direction: "forward",
          semanticRole: "database query",
          confidence: "conceptual"
        },
        {
          from: "node-api",
          to: "redis",
          meaning: "Documented cache/data component",
          direction: "forward",
          semanticRole: "cache lookup",
          confidence: "conceptual"
        },
        {
          from: "node-api",
          to: "python-ai",
          meaning: "Documented AI integration component; exact connection unconfirmed",
          direction: "forward",
          semanticRole: "ai processing",
          confidence: "unconfirmed"
        }
      ],
      requestPath: [
        {
          nodeId: "react-client",
          state: "request sent",
          label: "Client request",
          description: "The interface initiates a product workflow request."
        },
        {
          nodeId: "node-api",
          state: "processing",
          label: "API handling",
          description: "The application layer validates and routes the request."
        },
        {
          nodeId: "redis",
          state: "cache hit",
          label: "Fast data lookup",
          description: "Cache/data access is represented from documented Redis usage."
        },
        {
          nodeId: "mongodb",
          state: "database query",
          label: "Persistent read/write",
          description: "The request reaches the documented database component."
        },
        {
          nodeId: "python-ai",
          state: "ai processing",
          label: "AI component",
          description: "The documented Python AI component participates conceptually."
        },
        {
          nodeId: "node-api",
          state: "response",
          label: "Response assembly",
          description: "The API returns the workflow result to the client."
        },
        {
          nodeId: "react-client",
          state: "response",
          label: "Client update",
          description: "The interface receives the final application response."
        }
      ]
    }
  },
  {
    id: "the-book-next-door",
    title: "The Book Next Door",
    category: "Mobile product",
    description:
      "Neighborhood platform for swapping, selling, and discovering pre-loved books from nearby readers. Built for Luxembourg - designed and built the entire system from scratch as co-founder.",
    impact:
      "Live product. Mobile app, Go + C++ backend, PostgreSQL and Redis. Co-CEO and sole technical founder.",
    stack: ["React Native", "TypeScript", "Go", "C++", "PostgreSQL", "Redis"],
    domains: ["mobile", "backend", "data", "systems", "product"],
    featured: true,
    hierarchyRank: 2,
    context: "founder",
    link: "https://the-book-next-door.github.io/landing-page/",
    visualizationType: "mobile-marketplace-system"
  },
  {
    id: "dto-partners",
    title: "DTO Partners",
    category: "Commercial platform",
    description:
      "Company website and platform for DTO Partners. Full technology ownership as a part-time Software Engineer - backend architecture, frontend, and infrastructure decisions.",
    impact:
      "Live at dtopartners.com. Sole technical owner of an active commercial product.",
    stack: ["Go", "React", "TypeScript"],
    domains: ["frontend", "backend", "infrastructure", "product"],
    featured: true,
    hierarchyRank: 3,
    context: "professional",
    link: "https://dtopartners.com",
    visualizationType: "commercial-platform"
  },
  {
    id: "dns-server-cpp",
    title: "DNS Server in C++",
    category: "Networking / systems project",
    description:
      "Lightweight DNS server built from scratch in C++. Implements full query parsing and response generation at the byte level - raw socket I/O, DNS wire format, and record resolution.",
    impact:
      "Built to understand networking fundamentals at the protocol layer. No libraries, no shortcuts.",
    stack: ["C++", "Networking", "DNS"],
    domains: ["systems", "networking", "security"],
    featured: true,
    hierarchyRank: 4,
    context: "personal",
    link: "https://github.com/StefanPenchev05/DNS-Server-Cpp",
    visualizationType: "protocol-server"
  },
  {
    id: "budget-buddy",
    title: "Budget Buddy",
    category: "Backend system",
    description:
      "Personal finance management tool to track income, expenses, and savings. Designed and built the complete app solo - Go REST backend and React Native mobile client.",
    impact:
      "End-to-end personal project: full budget tracking flow, REST API, and cross-platform mobile frontend.",
    stack: ["Go", "React Native", "TypeScript"],
    domains: ["mobile", "backend", "product"],
    featured: false,
    hierarchyRank: 5,
    context: "personal",
    link: "https://github.com/StefanPenchev05/budget-buddy",
    visualizationType: "finance-rest-system"
  },
  {
    id: "lets-talk",
    title: "Lets Talk",
    category: "Realtime application",
    description:
      "Real-time virtual communities platform combining React and ASP.NET. Covers user authentication, real-time communication, and community management. Built end-to-end as a graduation project.",
    impact: "Solo-built full-stack social platform shipped as a diploma project.",
    stack: ["React", "TypeScript", "ASP.NET", "C#", "MySQL"],
    domains: ["frontend", "backend", "data", "security", "product"],
    featured: false,
    hierarchyRank: 6,
    context: "academic",
    link: "https://github.com/StefanPenchev05/Lets-Talk",
    visualizationType: "realtime-community"
  },
  {
    id: "autonomous-racing-cars",
    title: "Autonomous Racing Cars",
    category: "Autonomous systems project",
    description:
      "ROS2-based autonomous driving nodes for the F1Tenth racing simulator. Developed in C++ inside Docker as part of TU Wien's autonomous systems course.",
    impact:
      "Implemented perception, planning, and control nodes for competitive F1Tenth simulation.",
    stack: ["C++", "ROS2", "Docker"],
    domains: ["systems", "ai-ml", "infrastructure", "education"],
    featured: false,
    hierarchyRank: 7,
    context: "academic",
    visualizationType: "autonomous-systems"
  }
];

export const experiences: Experience[] = [
  {
    id: "dto-partners-experience",
    role: "Software Engineer",
    company: "DTO Partners",
    location: "Remote / Europe",
    period: "Jan 2025 - Present",
    summary:
      "Designing and implementing backend services with a focus on reliability, performance, and integration quality.",
    highlights: [
      "Implemented backend services in Go for reliable, performant systems.",
      "Developed REST APIs for efficient data processing and service integration.",
      "Optimized request handling and backend application performance."
    ],
    relatedProjectIds: ["dto-partners"],
    domains: ["backend", "infrastructure", "product"]
  },
  {
    id: "artaicare-experience",
    role: "Software Engineer",
    company: "ArtAICare",
    location: "Esch-sur-Alzette, Luxembourg",
    period: "Feb 2025 - Sep 2025",
    summary:
      "Worked across full-stack architecture, backend systems, and machine learning integration for a production-ready platform.",
    highlights: [
      "Designed full-stack architecture using MERN and Go.",
      "Built scalable backend services and APIs.",
      "Integrated Python machine learning components to enhance product experience."
    ],
    relatedProjectIds: ["artaicare-therapy-platform"],
    domains: ["frontend", "backend", "ai-ml", "product"]
  },
  {
    id: "mindhub-coding-school",
    role: "Teacher",
    company: "MindHub Coding School",
    location: "Pazardjik, Bulgaria",
    period: "Sep 2023 - Sep 2024",
    summary:
      "Introduced students to programming fundamentals through practical, approachable learning paths.",
    highlights: [
      "Taught Scratch, HTML, CSS, JavaScript, and Python to children.",
      "Built communication skills by adapting technical concepts for beginner audiences."
    ],
    domains: ["education", "frontend"]
  },
  {
    id: "i-can-here-and-now",
    role: "Alumni Member",
    company: "I Can Here and Now",
    location: "Sofia, Bulgaria",
    period: "Jun 2025 - Present",
    summary:
      "Supporting programming competitions through challenge design, server setup, and architecture improvements.",
    highlights: [
      "Created complex programming challenges for competitions.",
      "Set up servers and improved software architecture for event operations."
    ],
    domains: ["education", "backend", "infrastructure"]
  }
];

export const education: EducationEntry[] = [
  {
    id: "university-of-luxembourg",
    institution: "University of Luxembourg",
    program: "BSc Computer Science",
    location: "Luxembourg",
    period: "Current",
    summary:
      "Current degree path centered on the technical and theoretical foundations behind software engineering.",
    highlights: [
      "Focused on software engineering, machine learning, and security.",
      "Keeps the practice grounded in core CS concepts and problem solving."
    ],
    focus: "Current degree path",
    domains: ["education", "ai-ml", "security", "systems"]
  },
  {
    id: "tu-wien",
    institution: "TU Wien",
    program: "Erasmus exchange in Informatics",
    location: "Vienna, Austria",
    period: "Exchange",
    summary:
      "Academic exchange that broadened my view of informatics and the way I approach systems and collaboration.",
    highlights: [
      "Learned in a different academic environment and adapted quickly.",
      "Expanded the range of technical perspectives I bring into projects."
    ],
    focus: "International perspective",
    domains: ["education", "systems"],
    relatedProjectIds: ["autonomous-racing-cars"]
  },
  {
    id: "it-kariera",
    institution: "IT Kariera / Ministry of Education Bulgaria",
    program: "Certificate in Software Development",
    location: "Bulgaria",
    period: "Completed",
    summary:
      "Practical training program that connected programming fundamentals with applied software development.",
    highlights: [
      "Worked with C#, MySQL, C++, Arduino, and Haskell.",
      "Built a stronger bridge between theory, practice, and delivery."
    ],
    focus: "Professional certificate",
    domains: ["education", "backend", "data", "systems"]
  }
];

export const technologies: Technology[] = [
  {
    name: "TypeScript",
    group: "languages",
    url: "https://www.typescriptlang.org",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    domains: ["frontend", "backend"]
  },
  {
    name: "JavaScript",
    group: "languages",
    url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    domains: ["frontend", "backend"]
  },
  {
    name: "Go",
    group: "languages",
    url: "https://go.dev",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
    domains: ["backend", "systems"]
  },
  {
    name: "C#",
    group: "languages",
    url: "https://learn.microsoft.com/en-us/dotnet/csharp/",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
    domains: ["backend"]
  },
  {
    name: "Python",
    group: "languages",
    url: "https://www.python.org",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    domains: ["ai-ml", "backend"]
  },
  {
    name: "C++",
    group: "languages",
    url: "https://isocpp.org",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
    domains: ["systems", "networking"]
  },
  {
    name: "React",
    group: "frontend-mobile",
    url: "https://react.dev",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    domains: ["frontend"]
  },
  {
    name: "React Native",
    group: "frontend-mobile",
    domains: ["mobile", "frontend"]
  },
  {
    name: "Tailwind CSS",
    group: "frontend-mobile",
    url: "https://tailwindcss.com",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    domains: ["frontend"]
  },
  {
    name: "CSS",
    group: "frontend-mobile",
    domains: ["frontend"]
  },
  {
    name: "Node.js",
    group: "backend-apis",
    url: "https://nodejs.org",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    domains: ["backend"]
  },
  {
    name: "Express.js",
    group: "backend-apis",
    url: "https://expressjs.com",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    domains: ["backend"]
  },
  {
    name: "ASP.NET",
    group: "backend-apis",
    url: "https://dotnet.microsoft.com",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg",
    domains: ["backend"]
  },
  {
    name: "REST APIs",
    group: "backend-apis",
    domains: ["backend"]
  },
  {
    name: "MongoDB",
    group: "data",
    url: "https://www.mongodb.com",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    domains: ["data"]
  },
  {
    name: "MySQL",
    group: "data",
    url: "https://www.mysql.com",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    domains: ["data"]
  },
  {
    name: "PostgreSQL",
    group: "data",
    domains: ["data"]
  },
  {
    name: "Redis",
    group: "data",
    domains: ["data", "backend"]
  },
  {
    name: "Networking",
    group: "systems-networking",
    domains: ["networking", "security"]
  },
  {
    name: "DNS",
    group: "systems-networking",
    domains: ["networking", "security"]
  },
  {
    name: "ROS2",
    group: "systems-networking",
    domains: ["systems"]
  },
  {
    name: "Machine Learning",
    group: "ai-ml",
    domains: ["ai-ml"]
  },
  {
    name: "AI Integration",
    group: "ai-ml",
    domains: ["ai-ml", "product"]
  },
  {
    name: "Git",
    group: "tooling-delivery",
    url: "https://git-scm.com",
    iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    domains: ["infrastructure"]
  },
  {
    name: "Docker",
    group: "tooling-delivery",
    domains: ["infrastructure", "systems"]
  },
  {
    name: "System Design",
    group: "tooling-delivery",
    domains: ["backend", "systems"]
  },
  {
    name: "Performance Optimization",
    group: "tooling-delivery",
    domains: ["backend", "frontend"]
  }
];

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    title: "Languages",
    skills: technologies.filter((tech) => tech.group === "languages").map((tech) => tech.name),
    domains: ["frontend", "backend", "systems"]
  },
  {
    id: "frontend-mobile",
    title: "Frontend / Mobile",
    skills: technologies.filter((tech) => tech.group === "frontend-mobile").map((tech) => tech.name),
    domains: ["frontend", "mobile"]
  },
  {
    id: "backend-apis",
    title: "Backend / APIs",
    skills: technologies.filter((tech) => tech.group === "backend-apis").map((tech) => tech.name),
    domains: ["backend"]
  },
  {
    id: "data",
    title: "Data",
    skills: technologies.filter((tech) => tech.group === "data").map((tech) => tech.name),
    domains: ["data"]
  },
  {
    id: "systems-networking",
    title: "Systems / Networking",
    skills: technologies.filter((tech) => tech.group === "systems-networking").map((tech) => tech.name),
    domains: ["systems", "networking", "security"]
  },
  {
    id: "ai-ml",
    title: "AI / ML",
    skills: technologies.filter((tech) => tech.group === "ai-ml").map((tech) => tech.name),
    domains: ["ai-ml"]
  },
  {
    id: "tooling-delivery",
    title: "Tooling / Delivery",
    skills: technologies.filter((tech) => tech.group === "tooling-delivery").map((tech) => tech.name),
    domains: ["infrastructure", "backend", "systems"]
  }
];

export const orderedProjects = [...projects].sort(
  (a, b) => a.hierarchyRank - b.hierarchyRank
);
export const featuredProjects = orderedProjects.filter((project) => project.featured);
export const secondaryProjects = orderedProjects.filter((project) => !project.featured);
export const backendInfrastructureProject = projects.find(
  (project) => project.id === "artaicare-therapy-platform"
);

export const backendVisualizationConfig = {
  defaultProjectId: backendInfrastructureProject?.id ?? featuredProjects[0]?.id ?? orderedProjects[0]?.id ?? "",
  transitionRange: [0.2, 0.42],
  activeRange: [0.28, 0.62]
} as const;

export const cybersecurityEvidence = {
  supportedThemes: [
    "secure backend thinking",
    "authentication",
    "networking fundamentals",
    "DNS",
    "protocol understanding",
    "system boundaries",
    "security-aware architecture",
    "university security study"
  ],
  unsupportedClaims: [
    "penetration testing expertise",
    "SOC work",
    "malware analysis",
    "incident response",
    "professional red-team experience",
    "security certifications"
  ],
  supportingSources: [
    "DNS Server in C++ project",
    "Lets Talk authentication scope",
    "University of Luxembourg security focus",
    "Security listed as a focus area"
  ]
} as const;

export const factualAmbiguities = [
  "The ArtAICare experience mentions MERN and Go, but the ArtAICare project stack lists Node.js, Python, MongoDB, Redis, and TailwindCSS. Architecture-specific Go usage is unconfirmed.",
  "githubUrl is currently unknown. The previous githubPortfolio field pointed to the portfolio URL, so it is now represented as portfolioUrl with githubUrl left undefined.",
  "Exact ArtAICare runtime topology is not documented: React, Node.js, MongoDB, Redis, and Python AI are known components, but their production communication paths need confirmation.",
  "Deployment platforms are not specified for projects.",
  "Education periods are broad: Current, Exchange, Completed.",
  "Project links do not distinguish source repositories from live demos in a normalized way yet; each is preserved as a single link until clarified."
];
