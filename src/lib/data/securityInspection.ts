import {
  cybersecurityEvidence,
  type ArchitectureGroupRole,
  type PortfolioProject,
  type ProjectArchitecture,
  type SecurityInspectionConfig,
  type SecurityInspectionStep,
  type SecurityState,
  type TrustZoneType
} from "@/lib/data/portfolio";
import { buildSystemArchitecture } from "@/lib/data/systemArchitecture";

const roleToTrustZone: Record<ArchitectureGroupRole, TrustZoneType> = {
  public: "public",
  security: "application",
  application: "application",
  internal: "internal",
  data: "data",
  ai: "internal",
  external: "external"
};

const roleToBoundaryType: Record<
  ArchitectureGroupRole,
  SecurityInspectionConfig["trustZones"][number]["boundaryType"]
> = {
  public: "entry",
  security: "trust",
  application: "trust",
  internal: "internal",
  data: "data",
  ai: "internal",
  external: "external"
};

const trustZoneLabels: Record<TrustZoneType, string> = {
  external: "External system",
  public: "Public edge",
  application: "Application trust zone",
  internal: "Internal component zone",
  data: "Data boundary",
  privileged: "Privileged boundary"
};

export function buildSecurityInspection(project: PortfolioProject): {
  architecture: ProjectArchitecture;
  config: SecurityInspectionConfig;
  sourceMode: "configured" | "generated";
} {
  const architecture = buildSystemArchitecture(project);

  if (architecture.security) {
    return {
      architecture,
      config: architecture.security,
      sourceMode: "configured"
    };
  }

  const trustZones = (architecture.groups ?? [])
    .map((group) => ({
      id: group.id,
      label: group.label,
      type: roleToTrustZone[group.role],
      boundaryType: roleToBoundaryType[group.role]
    }))
    .filter((zone, index, all) => all.findIndex((item) => item.id === zone.id) === index);
  const pathSource = architecture.requestPath && architecture.requestPath.length > 0
    ? architecture.requestPath
    : architecture.nodes.slice(0, 5).map((node) => ({
        nodeId: node.id,
        state: "processing" as const,
        label: node.label,
        description: node.semanticRole
      }));
  const inspectionPath = pathSource
    .map((step): SecurityInspectionStep | null => {
      const node = architecture.nodes.find((item) => item.id === step.nodeId);

      if (!node) {
        return null;
      }

      const group = architecture.groups?.find((item) => item.id === node.group);
      const trustZone = group ? roleToTrustZone[group.role] : trustZoneFromNode(node.type);
      const protocol = inferProtocol(project, node.label, step.label);

      return {
        nodeId: node.id,
        label: step.label ?? node.label,
        concept: conceptFromNode(node.type, trustZone),
        trustZone,
        securityState: stateFromTrustZone(trustZone, step.state),
        protocol,
        source: sourceFromEdges(architecture, node.id),
        destination: destinationFromEdges(architecture, node.id),
        description:
          step.description ??
          node.semanticRole ??
          `${trustZoneLabels[trustZone]} inspection derived from architecture configuration.`
      };
    })
    .filter((step): step is SecurityInspectionStep => Boolean(step));

  return {
    architecture,
    config: {
      note:
        "Generated inspection view from project architecture and supported security evidence. It represents security-aware engineering concepts, not offensive-security work.",
      trustZones:
        trustZones.length > 0
          ? trustZones
          : [
              {
                id: "generated-application-zone",
                label: "Application trust zone",
                type: "application",
                boundaryType: "trust"
              }
            ],
      inspectionPath,
    },
    sourceMode: "generated"
  };
}

function trustZoneFromNode(type: ProjectArchitecture["nodes"][number]["type"]): TrustZoneType {
  if (type === "client") return "public";
  if (type === "database" || type === "cache") return "data";
  if (type === "external") return "external";
  if (type === "auth" || type === "network" || type === "network-protocol") return "application";
  return "internal";
}

function stateFromTrustZone(trustZone: TrustZoneType, requestState: string): SecurityState {
  if (requestState === "authentication") return "authenticated";
  if (trustZone === "data") return "data-protected";
  if (trustZone === "internal") return "internal";
  if (trustZone === "application") return "validated";
  return "observed";
}

function conceptFromNode(type: ProjectArchitecture["nodes"][number]["type"], trustZone: TrustZoneType) {
  if (type === "auth") return "Authentication boundary";
  if (type === "database" || type === "cache") return "Data access boundary";
  if (type === "network" || type === "network-protocol") return "Protocol path";
  if (trustZone === "public") return "Entry point";
  if (trustZone === "application") return "Request validation";
  if (trustZone === "external") return "External dependency boundary";
  return "Service dependency boundary";
}

function inferProtocol(project: PortfolioProject, nodeLabel: string, stepLabel?: string) {
  const haystack = `${project.title} ${project.stack.join(" ")} ${nodeLabel} ${stepLabel ?? ""}`.toLowerCase();

  if (haystack.includes("dns")) {
    return "DNS query / response";
  }

  if (haystack.includes("api") || haystack.includes("rest")) {
    return "API request";
  }

  if (haystack.includes("database") || haystack.includes("mongo") || haystack.includes("sql")) {
    return "database operation";
  }

  if (cybersecurityEvidence.supportedThemes.includes("protocol understanding")) {
    return "application protocol";
  }

  return undefined;
}

function sourceFromEdges(architecture: ProjectArchitecture, nodeId: string) {
  const incoming = architecture.edges.find((edge) => edge.to === nodeId);
  const node = incoming ? architecture.nodes.find((item) => item.id === incoming.from) : undefined;

  return node?.label;
}

function destinationFromEdges(architecture: ProjectArchitecture, nodeId: string) {
  const outgoing = architecture.edges.find((edge) => edge.from === nodeId);
  const node = outgoing ? architecture.nodes.find((item) => item.id === outgoing.to) : undefined;

  return node?.label;
}
