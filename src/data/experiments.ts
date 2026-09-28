export type ExperimentCategory =
  | "web"
  | "backend"
  | "networking"
  | "security"
  | "ai"
  | "graphics"
  | "algorithms";
export type Experiment = {
  id: string;
  number: string;
  title: string;
  category: ExperimentCategory;
  description: string;
  technologies: string[];
  status: "prototype" | "experiment" | "complete";
  interactionType?: "visual" | "simulation" | "terminal" | "diagram";
  link?: string;
  repository?: string;
  concept: boolean;
};
export const experiments: Experiment[] = [
  {
    id: "http",
    number: "01",
    title: "HTTP REQUEST VISUALIZER",
    category: "web",
    description:
      "Concept: follow DNS resolution, TCP/TLS, an HTTP request, server processing and the response.",
    technologies: ["TypeScript", "SVG", "Browser APIs"],
    status: "experiment",
    interactionType: "diagram",
    concept: true,
  },
  {
    id: "load-balancer",
    number: "02",
    title: "LOAD BALANCER SIMULATION",
    category: "backend",
    description:
      "Distribute simulated requests and compare routing decisions under changing load.",
    technologies: ["React", "TypeScript"],
    status: "prototype",
    interactionType: "simulation",
    concept: false,
  },
  {
    id: "llm",
    number: "03",
    title: "LOCAL LLM PIPELINE",
    category: "ai",
    description:
      "Concept: a prompt is tokenized; tokens and context enter a model; generated tokens become a response. An explanatory study, with no model connected.",
    technologies: ["Python", "Llama", "Local inference"],
    status: "experiment",
    interactionType: "diagram",
    concept: true,
  },
  {
    id: "cache",
    number: "04",
    title: "CACHE VISUALIZER",
    category: "backend",
    description:
      "Concept: trace cache hits, misses and database reads, then explore how TTL changes the next request.",
    technologies: ["Redis concepts", "TypeScript"],
    status: "experiment",
    interactionType: "visual",
    concept: true,
  },
  {
    id: "network",
    number: "05",
    title: "NETWORK PACKET JOURNEY",
    category: "networking",
    description:
      "Concept: follow client → router → internet → server. Future studies could explore latency, packet loss and routing.",
    technologies: ["Networking concepts", "SVG"],
    status: "experiment",
    interactionType: "diagram",
    concept: true,
  },
  {
    id: "algorithms",
    number: "06",
    title: "ALGORITHM VISUALIZER",
    category: "algorithms",
    description:
      "Concept: compare the traversal order of BFS and DFS with shortest-path exploration using Dijkstra’s algorithm.",
    technologies: ["TypeScript", "Graph algorithms"],
    status: "experiment",
    interactionType: "visual",
    concept: true,
  },
];
