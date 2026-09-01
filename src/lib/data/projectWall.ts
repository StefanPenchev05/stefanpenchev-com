import type { EngineeringDomain, PortfolioProject, ProjectArchitecture } from "@/lib/data/portfolio";

export type ProjectWallLayoutItem = {
  project: PortfolioProject;
  position: [number, number, number];
  scale: [number, number, number];
  rail: "featured" | "secondary";
};

const domainFallbackNodes: Record<EngineeringDomain, string[]> = {
  frontend: ["Interface", "State", "API"],
  mobile: ["Mobile Client", "Sync", "API"],
  backend: ["Client", "API", "Service", "Data"],
  data: ["Service", "Cache", "Database"],
  systems: ["Runtime", "Process", "Control"],
  networking: ["Client", "Protocol", "Resolver"],
  security: ["Request", "Boundary", "Validation"],
  "ai-ml": ["Application", "Model", "Data"],
  infrastructure: ["Service", "Runtime", "Deploy"],
  education: ["Concept", "Practice", "System"],
  product: ["User", "Workflow", "System"]
};

export function buildProjectWallLayout(projects: PortfolioProject[]): ProjectWallLayoutItem[] {
  const ordered = [...projects].sort((a, b) => a.hierarchyRank - b.hierarchyRank);
  const featured = ordered.filter((project) => project.featured);
  const secondary = ordered.filter((project) => !project.featured);
  const featuredSpacing = featured.length > 1 ? 4.6 / (featured.length - 1) : 0;
  const secondarySpacing = secondary.length > 1 ? 3.9 / (secondary.length - 1) : 0;

  return [
    ...featured.map((project, index) => ({
      project,
      position: [
        -2.3 + featuredSpacing * index,
        index % 2 === 0 ? 2.35 : 2.58,
        -9.1 - index * 0.08
      ] as [number, number, number],
      scale: [1.2, 0.82, 0.065] as [number, number, number],
      rail: "featured" as const
    })),
    ...secondary.map((project, index) => ({
      project,
      position: [
        -1.95 + secondarySpacing * index,
        index % 2 === 0 ? 1.22 : 1.08,
        -8.88 - index * 0.04
      ] as [number, number, number],
      scale: [0.82, 0.52, 0.05] as [number, number, number],
      rail: "secondary" as const
    }))
  ];
}

export function buildArchitecturePreview(project: PortfolioProject): ProjectArchitecture {
  if (project.architecture) {
    return project.architecture;
  }

  const labels = project.domains
    .flatMap((domain) => domainFallbackNodes[domain] ?? [])
    .filter((label, index, all) => all.indexOf(label) === index)
    .slice(0, project.featured ? 5 : 4);
  const safeLabels = labels.length >= 3 ? labels : ["Project", "System", "Output"];

  return {
    note:
      "Conceptual preview generated from project domains. It should not be read as exact production topology.",
    nodes: safeLabels.map((label, index) => ({
      id: `concept-${index}`,
      label,
      type: "unknown",
      confidence: "conceptual"
    })),
    edges: safeLabels.slice(1).map((label, index) => ({
      from: `concept-${index}`,
      to: `concept-${index + 1}`,
      meaning: `Conceptual relationship toward ${label}`,
      confidence: "conceptual"
    }))
  };
}
