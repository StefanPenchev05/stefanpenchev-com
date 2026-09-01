export type ChapterId =
  | "workstation"
  | "projects"
  | "backend"
  | "security"
  | "technology"
  | "contact";

export type Chapter = {
  id: ChapterId;
  eyebrow: string;
  title: string;
  description: string;
  signals: string[];
};

export const chapters: Chapter[] = [
  {
    id: "workstation",
    eyebrow: "01 / Operations Workstation",
    title: "Stefan Penchev",
    description:
      "Full-stack web developer and cybersecurity engineer working across application logic, secure systems, infrastructure, and network-aware software.",
    signals: ["TypeScript", "Backend APIs", "Security mindset"]
  },
  {
    id: "projects",
    eyebrow: "02 / Project Wall",
    title: "Projects as systems",
    description:
      "Work is presented as architecture: user surfaces, service boundaries, data flows, security assumptions, and deployment concerns.",
    signals: ["Frontend", "System design", "Product delivery"]
  },
  {
    id: "backend",
    eyebrow: "03 / Backend Infrastructure",
    title: "Services, data, and reliability",
    description:
      "API requests move through authentication, business services, cache paths, database queries, workers, and observability loops.",
    signals: ["APIs", "Databases", "Queues", "Caching"]
  },
  {
    id: "security",
    eyebrow: "04 / Cybersecurity Network",
    title: "Security boundaries made visible",
    description:
      "Network segments, trust boundaries, packet inspection, access checks, and alert paths show how engineering choices affect risk.",
    signals: ["Networking", "Firewall rules", "Threat modeling"]
  },
  {
    id: "technology",
    eyebrow: "05 / Technology Constellation",
    title: "A connected engineering toolkit",
    description:
      "The network abstracts into grouped technology clusters spanning frontend, backend, security, databases, infrastructure, and tooling.",
    signals: ["React", "Node.js", "Linux", "PostgreSQL", "Cloud"]
  },
  {
    id: "contact",
    eyebrow: "06 / Contact Terminal",
    title: "Start a conversation",
    description:
      "The technical map converges into a focused terminal endpoint for contact, collaboration, and professional links.",
    signals: ["Email", "GitHub", "LinkedIn"]
  }
];
