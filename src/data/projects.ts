export type Scene = "care" | "book" | "dto" | "skald";
export type Visual = "care" | "book" | "dto" | "skald" | "dns" | "flow";

export type Project = {
  slug: string;
  name: string;
  fullName: string;
  index: string;
  featured: boolean;
  category: string;
  role: string;
  status?: string;
  access?: string;
  source?: string;
  period?: string;
  summary: string;
  stack: string[];
  scene: Scene;
  visual: Visual;
  /** Conceptual layers used for the data-flow illustration (not a literal production diagram). */
  flow: string[];
  links: { label: string; href: string }[];
  context: string;
  sections: { title: string; body: string[] }[];
  learnings: string[];
};

export const themes: Record<
  Scene,
  { bg: string; fg: string; accent: string; accentText: string; soft: string; border: string }
> = {
  care: {
    bg: "bg-care-bg",
    fg: "text-care-fg",
    accent: "bg-care-accent",
    accentText: "text-care-accent",
    soft: "bg-care-soft",
    border: "border-care-accent",
  },
  book: {
    bg: "bg-book-bg",
    fg: "text-book-fg",
    accent: "bg-book-accent",
    accentText: "text-book-accent",
    soft: "bg-book-soft",
    border: "border-book-accent",
  },
  dto: {
    bg: "bg-dto-bg",
    fg: "text-dto-fg",
    accent: "bg-dto-accent",
    accentText: "text-dto-accent",
    soft: "bg-dto-soft",
    border: "border-dto-accent",
  },
  skald: {
    bg: "bg-skald-bg",
    fg: "text-skald-fg",
    accent: "bg-skald-accent",
    accentText: "text-skald-accent",
    soft: "bg-skald-soft",
    border: "border-skald-accent",
  },
};

export const projects: Project[] = [
  {
    slug: "artaicare",
    name: "ArtAICare",
    fullName: "ArtAICare — AI-Assisted Therapy Platform",
    index: "01",
    featured: true,
    category: "Full-Stack Engineering / AI Integration / Research Software",
    role: "Software developer responsible for the web platform, within a multidisciplinary team",
    summary:
      "Developed the full-stack web platform for an AI-assisted art therapy project, integrating backend APIs, Python-based recommendation functionality, research tooling, and production deployment infrastructure.",
    stack: [
      "MongoDB",
      "Express.js",
      "React",
      "Node.js",
      "Python",
      "Sentence-BERT",
      "Ubuntu",
      "Nginx",
      "SSH",
    ],
    scene: "care",
    visual: "care",
    flow: [
      "React client",
      "Express / Node API",
      "MongoDB",
      "Python ML scripts",
      "Ubuntu VPS + Nginx",
    ],
    status: "Deployed web platform",
    access: "Sign-in required; no public demo access established",
    source: "Source visibility not confirmed",
    period: "Jan–Sep 2025 · Contribution ended 20 September 2025",
    links: [{ label: "Platform sign-in", href: "https://therapy.artaicare.com/auth/signin" }],
    context:
      "ArtAICare is a project in the field of AI-assisted art therapy, built by a team spanning several disciplines. Within that team I owned the web platform — the part that therapists and participants actually sign into — while other members worked on areas such as the VR application. This overview covers my contribution through 20 September 2025; the live platform may have changed since then.",
    sections: [
      {
        title: "The web platform",
        body: [
          "I designed and implemented the platform on the MERN stack: a React frontend talking to an Express and Node.js backend, with MongoDB for persistence.",
          "That meant designing the API surface, implementing the endpoints, modelling the data in MongoDB, and connecting each screen of the frontend to the services behind it.",
        ],
      },
      {
        title: "Python & machine learning integration",
        body: [
          "The platform integrates Python-based ML functionality for art-therapy-related features, including image and content suggestions.",
          "Recommendation features use sentence-embedding approaches with SBERT, so text can be compared by meaning rather than by exact keywords. My contribution was integration of the recommendation functionality.",
        ],
      },
      {
        title: "VR collaboration",
        body: [
          "I worked with the project's VR developer to connect the VR application to the web platform. The VR application itself was built by that teammate; my side was making the platform a dependable counterpart for it.",
        ],
      },
      {
        title: "Research variation with EEG",
        body: [
          "For a university study I built a research-oriented variation of the platform that works with EEG data, using Python scripts to examine brain activity alongside the platform's activities. Research data stays private and is not shown here.",
        ],
      },
      {
        title: "Deployment & infrastructure",
        body: [
          "I configured and worked with the server infrastructure: an Ubuntu VPS reached over SSH, with Nginx in front of the application. Specific infrastructure details are intentionally left out.",
        ],
      },
    ],
    learnings: [
      "Owning a platform end to end — from data model to deployed server — inside a larger team.",
      "Bridging JavaScript services and Python ML code cleanly.",
      "Collaborating across disciplines: therapy, research, VR and software.",
    ],
  },
  {
    slug: "the-book-next-door",
    name: "The Book Next Door",
    fullName: "The Book Next Door",
    index: "02",
    featured: true,
    category: "Mobile Application / Backend Engineering / Entrepreneurship",
    role: "Co-founder · primary responsibility for the technology",
    summary:
      "A community-driven platform for discovering and exchanging pre-owned books, built with a cross-platform mobile client and a backend powered by Go, C++, and PostgreSQL.",
    stack: ["React Native", "TypeScript", "Go", "C++", "PostgreSQL", "Redis"],
    scene: "book",
    visual: "book",
    flow: ["React Native app", "Go API", "C++ services", "PostgreSQL", "Redis"],
    links: [
      {
        label: "Visit the landing page",
        href: "https://the-book-next-door.github.io/landing-page/",
      },
    ],
    context:
      "The Book Next Door helps people discover, exchange, sell and share pre-owned books within their local community, with an initial focus on Luxembourg. I co-founded the project and take primary responsibility for its technology.",
    sections: [
      {
        title: "The idea",
        body: [
          "Plenty of good books sit unread on shelves a few streets away from someone who wants them. The product makes those books visible locally and gives neighbours a simple way to pass them on.",
        ],
      },
      {
        title: "Mobile experience",
        body: [
          "The client is a cross-platform React Native app in TypeScript, so a single codebase serves both iOS and Android while staying close to native behaviour.",
        ],
      },
      {
        title: "Backend & data",
        body: [
          "Backend services are written in Go, with C++ used where it fits, and PostgreSQL holding the relational core of the product — users, books and the exchanges between them. Redis supports the backend alongside the main database.",
          "Working across TypeScript, Go and C++ in one product means being deliberate about API contracts between the pieces.",
        ],
      },
    ],
    learnings: [
      "Shaping product architecture while also building it.",
      "Designing database-driven application logic for a community marketplace.",
      "Keeping a multi-language system coherent.",
    ],
  },
  {
    slug: "dto-recruitment-platform",
    name: "DTO Recruitment",
    fullName: "DTO Recruitment Platform",
    index: "03",
    featured: true,
    category: "Full-Stack Engineering / Recruitment Product",
    role: "Software Engineer · remote, part-time, project-based",
    status: "In development",
    access: "Not yet publicly available",
    source: "Private source",
    period: "Jan 2025–present",
    summary:
      "Designing and implementing a recruitment platform with candidate onboarding and discovery, recruiter workflows, and candidate, company and administrator workspaces.",
    stack: ["Angular", "TypeScript", "Rust", "PostgreSQL", "Redis", "Docker", "Makefile"],
    scene: "dto",
    visual: "dto",
    flow: [
      "Candidate onboarding",
      "Candidate discovery",
      "Saved profiles",
      "Expressions of interest",
    ],
    links: [],
    context:
      "The recruitment platform is one of two separate products I work on at DTO Partners. My responsibility includes architecture, code organisation and implementation. The product is still in development and its source is private.",
    sections: [
      {
        title: "Recruitment workflows",
        body: [
          "I implement candidate onboarding and discovery, saved profiles and recruiter expressions of interest, alongside candidate, company and administrator workspaces.",
        ],
      },
      {
        title: "Access and privacy",
        body: [
          "The work includes authentication, role-based access and privacy controls, plus dashboards presenting recruitment activity and user engagement.",
        ],
      },
      {
        title: "Current status",
        body: [
          "The platform is not yet publicly available. No public launch date or demo link is confirmed. DTO's public company website is a separate project.",
        ],
      },
    ],
    learnings: [
      "Designing recruitment workflows across different user roles.",
      "Taking responsibility for architecture, code organisation and implementation.",
    ],
  },
  {
    slug: "skald-lab-ops",
    name: "Skald Lab Ops",
    fullName: "Skald Lab Ops",
    index: "04",
    featured: true,
    category: "Backend Development / Internal Operations Platform",
    role: "Backend developer · paid internship at Skald Solutions",
    status: "Online",
    access: "Public workshop website; internal operations access is not established",
    source: "Source visibility not confirmed",
    period: "Jul–Oct 2026",
    summary:
      "Implemented the Django backend for a youth workshop’s operations platform, covering member records, session bookings, attendance and project progress.",
    stack: ["Django"],
    scene: "skald",
    visual: "skald",
    flow: ["Member records", "Session bookings", "Attendance", "Project progress"],
    links: [{ label: "Visit Skald Lab", href: "https://skaldlab.com/" }],
    context:
      "Skald Lab is a workshop environment for children and teenagers, roughly 8–18 years old. Skald Lab Ops is the internal system the team uses to run it, whose backend I implemented during my paid internship at Skald Solutions. My contribution does not include the public marketing interface.",
    sections: [
      {
        title: "The operational problem",
        body: [
          "A busy workshop juggles members, recurring sessions, who actually showed up, and what each young maker is building. The backend supports those administrative workflows.",
        ],
      },
      {
        title: "Workflows",
        body: [
          "Member records hold the people involved. Session booking connects members to scheduled workshops. Attendance tracking records each session, and project tracking follows each student's progress over time.",
          "These records relate to each other, so the system is designed around those relationships rather than as separate lists.",
        ],
      },
    ],
    learnings: [
      "Turning day-to-day operations into clear data models and workflows.",
      "Building internal software for real staff in a professional internship.",
    ],
  },
  {
    slug: "dns-server-cpp",
    name: "DNS Server",
    fullName: "DNS Server in C++",
    index: "05",
    featured: false,
    category: "Low-level Networking / Systems Programming",
    role: "Personal project",
    summary:
      "Implemented a DNS server in C++ to explore networking fundamentals, DNS message structures, query handling, and protocol-level communication.",
    stack: ["C++", "Sockets", "UDP", "DNS protocol", "Binary parsing"],
    scene: "dto",
    visual: "dns",
    flow: ["UDP socket", "Header parser", "Question section", "Answer builder"],
    links: [{ label: "View on GitHub", href: "https://github.com/StefanPenchev05/DNS-Server-Cpp" }],
    context:
      "A project built to understand DNS from the bytes up instead of treating it as a black box.",
    sections: [
      {
        title: "From packets to answers",
        body: [
          "The server listens on a socket, receives raw DNS messages and parses them byte by byte: the 12-byte header, flags, question sections and domain-name labels.",
          "It then assembles a response in the same binary format — a good exercise in endianness, bit fields and careful buffer handling.",
        ],
      },
    ],
    learnings: [
      "How DNS messages are structured on the wire.",
      "Socket programming and binary protocols in C++.",
    ],
  },
  {
    slug: "budget-buddy",
    name: "Budget Buddy",
    fullName: "Budget Buddy",
    index: "06",
    featured: false,
    category: "Mobile Application / Backend",
    role: "Personal project",
    summary:
      "Built a personal budgeting application with a Go backend and React Native mobile interface for tracking income, expenses, and financial activity.",
    stack: ["Go", "React Native", "TypeScript", "REST APIs"],
    scene: "book",
    visual: "flow",
    flow: ["React Native app", "REST API", "Go backend"],
    links: [{ label: "View on GitHub", href: "https://github.com/StefanPenchev05/budget-buddy" }],
    context: "A personal finance app for keeping an honest view of income and spending.",
    sections: [
      {
        title: "How it fits together",
        body: [
          "A React Native client records income and expenses and talks to a Go backend over a REST API, which owns the data and the logic around it. There are no bank or payment integrations — entries are tracked by the user.",
        ],
      },
    ],
    learnings: ["Designing a REST API in Go for a mobile client."],
  },
  {
    slug: "lets-talk",
    name: "Let's Talk",
    fullName: "Let's Talk",
    index: "07",
    featured: false,
    category: "Full-Stack Web / Community Platform",
    role: "Full-stack project",
    summary:
      "Developed a full-stack communication platform combining a React frontend with an ASP.NET backend, including account management and community-oriented functionality.",
    stack: ["React", "TypeScript", "C#", "ASP.NET", "MySQL"],
    scene: "care",
    visual: "flow",
    flow: ["React frontend", "ASP.NET backend", "MySQL"],
    links: [{ label: "View on GitHub", href: "https://github.com/StefanPenchev05/Lets-Talk" }],
    context: "A communication platform for community conversations.",
    sections: [
      {
        title: "Architecture",
        body: [
          "A React and TypeScript frontend sits on an ASP.NET backend written in C#, with MySQL storing accounts and community data. Account management covers registration and sign-in flows.",
        ],
      },
    ],
    learnings: ["Building a full-stack app on the .NET ecosystem."],
  },
  {
    slug: "autonomous-racing-cars",
    name: "Autonomous Racing",
    fullName: "Autonomous Racing Cars",
    index: "08",
    featured: false,
    category: "Robotics / Autonomous Systems · TU Wien",
    role: "Academic coursework project",
    summary:
      "Worked on autonomous driving software using ROS2 and C++ in a simulated racing environment, exploring perception, planning, and vehicle control.",
    stack: ["C++", "ROS2", "Docker", "Autonomous systems"],
    scene: "skald",
    visual: "flow",
    flow: ["Perception", "Planning", "Control", "Simulated vehicle"],
    links: [],
    context: "Coursework during my Erasmus semester at TU Wien.",
    sections: [
      {
        title: "The loop",
        body: [
          "Autonomous driving software built as ROS2 nodes in C++, running in a simulated racing environment inside Docker — sensing the track, planning a path and controlling the vehicle.",
        ],
      },
    ],
    learnings: [
      "ROS2's node-based architecture.",
      "How perception, planning and control interact in a real-time loop.",
    ],
  },
  {
    slug: "dto-company-website",
    name: "DTO Company Website",
    fullName: "DTO Partners Company Website",
    index: "09",
    featured: false,
    category: "Responsive Website / Localisation",
    role: "Software Engineer · remote, part-time, project-based",
    status: "Public company website",
    access: "Public website",
    source: "Source visibility not confirmed",
    summary:
      "Built and continue developing DTO Partners' responsive informational website with English and Polish localisation. The initial delivery had no backend.",
    stack: [],
    scene: "dto",
    visual: "dto",
    flow: ["Company information", "English", "Polish"],
    links: [{ label: "Visit website", href: "https://dtopartners.com/" }],
    context:
      "DTO Partners' company website is separate from the recruitment platform. Its purpose is to present the company through a responsive, multilingual public site.",
    sections: [
      {
        title: "Scope",
        body: [
          "I built the initial informational website without a backend and continue developing its responsive pages and English and Polish localisation.",
        ],
      },
    ],
    learnings: ["Developing a responsive company website across two languages."],
  },
  {
    slug: "egil",
    name: "Egil",
    fullName: "Egil — Local RAG Assistant",
    index: "10",
    featured: false,
    category: "AI Integration / Internal Tool",
    role: "Software Developer · paid internship at Skald Solutions",
    status: "Private internal tool",
    access: "No public demo",
    source: "Private source",
    period: "Jul–Oct 2026",
    summary:
      "Built a local retrieval-augmented generation assistant that searches a curated business-audit knowledge base and uses Ollama for local model execution.",
    stack: ["Ollama", "Retrieval-augmented generation"],
    scene: "skald",
    visual: "flow",
    flow: ["Business-audit questions", "Knowledge retrieval", "Local model execution"],
    links: [],
    context:
      "Egil supports methodology-focused business-audit questions using a curated knowledge base. I built the assistant during my internship at Skald Solutions.",
    sections: [
      {
        title: "Scope",
        body: [
          "The assistant combines retrieval from the business-audit knowledge base with local model execution through Ollama. The tool and its source remain private.",
        ],
      },
    ],
    learnings: ["Connecting knowledge retrieval with local model execution."],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const moreProjects = projects.filter((p) => !p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function nextProject(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length]!;
}
