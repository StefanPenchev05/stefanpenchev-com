import {
  backendVisualizationConfig,
  orderedProjects,
  type ArchitectureGroup,
  type ArchitectureGroupRole,
  type ArchitectureNodeStatus,
  type ArchitectureNodeType,
  type PortfolioProject,
  type ProjectArchitecture,
  type RequestPathStep
} from "@/lib/data/portfolio";
import { buildArchitecturePreview } from "@/lib/data/projectWall";

const typeToGroupRole: Partial<Record<ArchitectureNodeType, ArchitectureGroupRole>> = {
  client: "public",
  api: "application",
  service: "application",
  auth: "security",
  database: "data",
  cache: "data",
  queue: "internal",
  worker: "internal",
  external: "external",
  ai: "ai",
  "ai-component": "ai",
  network: "security",
  "network-protocol": "security",
  runtime: "internal"
};

const typeToStatus: Partial<Record<ArchitectureNodeType, ArchitectureNodeStatus>> = {
  auth: "secure",
  database: "data",
  cache: "data",
  external: "external",
  network: "secure",
  "network-protocol": "secure"
};

const roleLabels: Record<ArchitectureGroupRole, string> = {
  public: "Public entry",
  application: "Application services",
  data: "Data layer",
  internal: "Internal runtime",
  external: "External systems",
  security: "Security boundary",
  ai: "AI services"
};

const requestStates: RequestPathStep["state"][] = [
  "request sent",
  "processing",
  "cache hit",
  "database query",
  "ai processing",
  "response"
];

export function getBackendVisualizationProject(selectedProjectId?: string) {
  return (
    orderedProjects.find((project) => project.id === selectedProjectId) ??
    orderedProjects.find((project) => project.id === backendVisualizationConfig.defaultProjectId) ??
    orderedProjects[0]
  );
}

export function buildSystemArchitecture(project: PortfolioProject): ProjectArchitecture {
  if (project.architecture) {
    return project.architecture;
  }

  const preview = buildArchitecturePreview(project);
  const groupsByRole = new Map<ArchitectureGroupRole, ArchitectureGroup>();
  const nodes = preview.nodes.map((node) => {
    const role = typeToGroupRole[node.type] ?? inferRoleFromLabel(node.label);
    const groupId = `${role}-generated`;

    if (!groupsByRole.has(role)) {
      groupsByRole.set(role, {
        id: groupId,
        label: roleLabels[role],
        role
      });
    }

    return {
      ...node,
      group: groupId,
      semanticRole: node.technology
        ? `${node.technology} component`
        : `${roleLabels[role]} component`,
      status: typeToStatus[node.type] ?? statusFromRole(role)
    };
  });

  return {
    ...preview,
    groups: Array.from(groupsByRole.values()),
    nodes,
    edges: preview.edges.map((edge) => ({
      ...edge,
      direction: "forward" as const,
      semanticRole: edge.meaning
    })),
    requestPath: buildFallbackRequestPath(nodes)
  };
}

function inferRoleFromLabel(label: string): ArchitectureGroupRole {
  const normalized = label.toLowerCase();

  if (normalized.includes("client") || normalized.includes("interface") || normalized.includes("mobile")) {
    return "public";
  }

  if (normalized.includes("data") || normalized.includes("database") || normalized.includes("cache")) {
    return "data";
  }

  if (normalized.includes("protocol") || normalized.includes("validation") || normalized.includes("boundary")) {
    return "security";
  }

  if (normalized.includes("model") || normalized.includes("ai")) {
    return "ai";
  }

  if (normalized.includes("runtime") || normalized.includes("process") || normalized.includes("deploy")) {
    return "internal";
  }

  return "application";
}

function statusFromRole(role: ArchitectureGroupRole): ArchitectureNodeStatus {
  if (role === "data") {
    return "data";
  }

  if (role === "security") {
    return "secure";
  }

  if (role === "external") {
    return "external";
  }

  return "normal";
}

function buildFallbackRequestPath(nodes: ProjectArchitecture["nodes"]): RequestPathStep[] {
  const preferred = [...nodes].sort((a, b) => {
    const rankA = roleRank(typeToGroupRole[a.type] ?? inferRoleFromLabel(a.label));
    const rankB = roleRank(typeToGroupRole[b.type] ?? inferRoleFromLabel(b.label));
    return rankA - rankB;
  });

  return preferred.slice(0, 6).map((node, index) => ({
    nodeId: node.id,
    state: requestStates[Math.min(index, requestStates.length - 1)],
    label: node.label,
    description: node.semanticRole ?? "Conceptual request traversal through this component."
  }));
}

function roleRank(role: ArchitectureGroupRole) {
  const ranks: Record<ArchitectureGroupRole, number> = {
    public: 0,
    security: 1,
    application: 2,
    internal: 3,
    data: 4,
    ai: 5,
    external: 6
  };

  return ranks[role];
}
