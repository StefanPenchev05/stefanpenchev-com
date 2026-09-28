import type { ArchitectureNodeId } from "./architecture";
export type SkillGroup = {
  id: string;
  number: string;
  title: string;
  description: string;
  technologies: string[];
  relatedArchitectureNodes?: ArchitectureNodeId[];
};
// Owner-verified interests. No proficiency levels or unverified technology claims.
export const skills: SkillGroup[] = [
  {
    id: "frontend",
    number: "01",
    title: "FRONTEND",
    description: "Interests in full-stack interfaces and the web platform.",
    technologies: ["React", "TypeScript", "JavaScript"],
    relatedArchitectureNodes: ["client"],
  },
  {
    id: "backend",
    number: "02",
    title: "BACKEND",
    description: "Interests in backend systems and server-side development.",
    technologies: ["Go", "Node.js", "Python", "C++"],
    relatedArchitectureNodes: ["api", "service"],
  },
  {
    id: "data",
    number: "03",
    title: "DATA",
    description:
      "An interest in databases and how applications store information.",
    technologies: ["Databases"],
    relatedArchitectureNodes: ["database"],
  },
  {
    id: "infrastructure",
    number: "04",
    title: "INFRASTRUCTURE",
    description: "Exploring how networked systems communicate.",
    technologies: ["Networking"],
    relatedArchitectureNodes: ["service"],
  },
  {
    id: "engineering",
    number: "05",
    title: "ENGINEERING",
    description:
      "Interests in the security and mathematical foundations of software.",
    technologies: ["Cybersecurity", "Mathematics"],
  },
  {
    id: "ai",
    number: "06",
    title: "AI / EXPERIMENTAL",
    description:
      "An interest in machine learning and experimentation with local language models.",
    technologies: ["Machine learning", "Local LLM experimentation", "Python"],
  },
];
