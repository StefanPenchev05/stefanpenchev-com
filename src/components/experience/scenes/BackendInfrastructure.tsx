"use client";

import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { LinePath } from "@/components/experience/objects/LinePath";
import {
  backendVisualizationConfig,
  type ArchitectureGroup,
  type ArchitectureGroupRole,
  type ArchitectureNode,
  type ArchitectureNodeStatus,
  type ProjectArchitecture
} from "@/lib/data/portfolio";
import {
  buildSystemArchitecture,
  getBackendVisualizationProject
} from "@/lib/data/systemArchitecture";
import { useExperienceStore } from "@/lib/scroll/useExperienceStore";
import { palette } from "@/lib/three/materials";
import { interpolatePath } from "@/lib/three/math";

type VectorTuple = [number, number, number];

type LayoutNode = {
  node: ArchitectureNode;
  position: VectorTuple;
  previewPosition: VectorTuple;
};

type GraphLayout = {
  nodes: LayoutNode[];
  positions: Map<string, VectorTuple>;
  previewPositions: Map<string, VectorTuple>;
  groups: Array<ArchitectureGroup & { center: VectorTuple; scale: VectorTuple }>;
};

declare global {
  interface Window {
    __backendArchitectureProbe?: {
      activeNodeId: string | null;
      edgeCount: number;
      groupCount: number;
      nodeCount: number;
      nodeIds: string[];
      projectId: string;
      projectTitle: string;
      requestPathLength: number;
      sourceMode: "configured" | "generated";
    };
  }
}

const groupRoleOrder: Record<ArchitectureGroupRole, number> = {
  public: 0,
  security: 1,
  application: 2,
  internal: 3,
  data: 4,
  ai: 5,
  external: 6
};

const roleX: Record<ArchitectureGroupRole, number> = {
  public: -2.45,
  security: -1.35,
  application: -0.2,
  internal: 1.05,
  data: 2.15,
  ai: 1.1,
  external: 2.85
};

const roleColors: Record<ArchitectureGroupRole, string> = {
  public: palette.mutedSteel,
  security: palette.securityGreen,
  application: palette.systemCyan,
  internal: palette.mutedSteel,
  data: palette.dataAmber,
  ai: palette.systemCyan,
  external: palette.mutedSteel
};

const statusColors: Record<ArchitectureNodeStatus, string> = {
  normal: palette.systemCyan,
  secure: palette.securityGreen,
  data: palette.dataAmber,
  external: palette.mutedSteel,
  warning: palette.alertRed
};

const baseMaterial = {
  color: palette.panelGray,
  roughness: 0.72,
  metalness: 0.14
};

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function rangeProgress(value: number, start: number, end: number) {
  return clamp01((value - start) / (end - start));
}

function lerpTuple(a: VectorTuple, b: VectorTuple, t: number): VectorTuple {
  return [
    THREE.MathUtils.lerp(a[0], b[0], t),
    THREE.MathUtils.lerp(a[1], b[1], t),
    THREE.MathUtils.lerp(a[2], b[2], t)
  ];
}

function roleForNode(node: ArchitectureNode, groups: ArchitectureGroup[]) {
  return groups.find((group) => group.id === node.group)?.role ?? roleFromType(node.type);
}

function roleFromType(type: ArchitectureNode["type"]): ArchitectureGroupRole {
  if (type === "client") return "public";
  if (type === "auth" || type === "network" || type === "network-protocol") return "security";
  if (type === "database" || type === "cache") return "data";
  if (type === "queue" || type === "worker" || type === "runtime") return "internal";
  if (type === "external") return "external";
  if (type === "ai" || type === "ai-component") return "ai";
  return "application";
}

function buildImplicitGroups(nodes: ArchitectureNode[]): ArchitectureGroup[] {
  const roles = new Map<ArchitectureGroupRole, ArchitectureGroup>();

  nodes.forEach((node) => {
    const role = roleFromType(node.type);

    if (!roles.has(role)) {
      roles.set(role, {
        id: `${role}-implicit`,
        label: role === "public" ? "Public entry" : `${role[0].toUpperCase()}${role.slice(1)} layer`,
        role
      });
    }
  });

  return Array.from(roles.values());
}

function layoutArchitecture(architecture: ProjectArchitecture): GraphLayout {
  const groups =
    architecture.groups && architecture.groups.length > 0
      ? architecture.groups
      : buildImplicitGroups(architecture.nodes);
  const nodesByGroup = new Map<string, ArchitectureNode[]>();

  architecture.nodes.forEach((node) => {
    const role = roleForNode(node, groups);
    const groupId = node.group ?? `${role}-implicit`;
    const nodes = nodesByGroup.get(groupId) ?? [];
    nodes.push(node);
    nodesByGroup.set(groupId, nodes);
  });

  const sortedGroups = [...groups].sort(
    (a, b) => groupRoleOrder[a.role] - groupRoleOrder[b.role]
  );
  const layoutNodes: LayoutNode[] = [];
  const positions = new Map<string, VectorTuple>();
  const previewPositions = new Map<string, VectorTuple>();

  sortedGroups.forEach((group, groupIndex) => {
    const groupNodes = nodesByGroup.get(group.id) ?? [];
    const x = roleX[group.role] ?? -2.3 + groupIndex * 1.1;
    const yBase = group.role === "data" || group.role === "ai" ? 1.55 : 2.08;

    groupNodes.forEach((node, index) => {
      const offset = (index - (groupNodes.length - 1) / 2) * 0.72;
      const position: VectorTuple = [
        x,
        yBase + offset * 0.28,
        -20.3 - groupIndex * 0.48 - Math.abs(offset) * 0.22
      ];
      const previewPosition: VectorTuple = [
        -0.7 + layoutNodes.length * 0.35,
        2.08 - (layoutNodes.length % 2) * 0.34,
        -9.28 - layoutNodes.length * 0.05
      ];

      layoutNodes.push({ node, position, previewPosition });
      positions.set(node.id, position);
      previewPositions.set(node.id, previewPosition);
    });
  });

  const groupBounds = sortedGroups.map((group) => {
    const groupNodes = layoutNodes.filter((layoutNode) => {
      const nodeGroup = layoutNode.node.group ?? `${roleForNode(layoutNode.node, groups)}-implicit`;
      return nodeGroup === group.id;
    });
    const center = groupNodes.length
      ? ([
          groupNodes.reduce((sum, item) => sum + item.position[0], 0) / groupNodes.length,
          groupNodes.reduce((sum, item) => sum + item.position[1], 0) / groupNodes.length,
          groupNodes.reduce((sum, item) => sum + item.position[2], 0) / groupNodes.length
        ] as VectorTuple)
      : ([roleX[group.role] ?? 0, 1.8, -20.5] as VectorTuple);

    return {
      ...group,
      center: [center[0], center[1] - 0.03, center[2]] as VectorTuple,
      scale: [
        Math.max(0.95, 0.82 + groupNodes.length * 0.18),
        Math.max(0.7, 0.54 + groupNodes.length * 0.1),
        0.04
      ] as VectorTuple
    };
  });

  return { nodes: layoutNodes, positions, previewPositions, groups: groupBounds };
}

function nodeDimensions(node: ArchitectureNode): VectorTuple {
  if (node.type === "database" || node.type === "cache") {
    return [0.58, 0.36, 0.58];
  }

  if (node.type === "client") {
    return [0.88, 0.52, 0.08];
  }

  return [0.78, 0.44, 0.36];
}

function getRequestPath(architecture: ProjectArchitecture, layout: GraphLayout) {
  const configured = architecture.requestPath?.filter((step) => layout.positions.has(step.nodeId));

  if (configured && configured.length >= 2) {
    return configured;
  }

  return architecture.edges
    .flatMap((edge, index) =>
      index === 0
        ? [
            {
              nodeId: edge.from,
              state: "request sent" as const,
              label: "Request start",
              description: "Generated request entry from architecture edges."
            },
            {
              nodeId: edge.to,
              state: "processing" as const,
              label: edge.meaning,
              description: edge.semanticRole ?? edge.meaning
            }
          ]
        : [
            {
              nodeId: edge.to,
              state: "processing" as const,
              label: edge.meaning,
              description: edge.semanticRole ?? edge.meaning
            }
          ]
    )
    .filter((step, index, all) => layout.positions.has(step.nodeId) && all.findIndex((item) => item.nodeId === step.nodeId) === index);
}

function ArchitectureLabel({ color, text, position }: { color: string; text: string; position: VectorTuple }) {
  return (
    <Text
      anchorX="center"
      anchorY="middle"
      color={color}
      fontSize={0.08}
      maxWidth={1.2}
      position={position}
    >
      {text}
    </Text>
  );
}

function SystemBoundary({
  group,
  transitionT
}: {
  group: GraphLayout["groups"][number];
  transitionT: number;
}) {
  const visibleT = clamp01((transitionT - 0.35) / 0.45);
  const color = roleColors[group.role];

  return (
    <group position={group.center} scale={[visibleT, visibleT, visibleT]}>
      <mesh>
        <boxGeometry args={group.scale} />
        <meshStandardMaterial
          color={palette.charcoal}
          emissive={color}
          emissiveIntensity={0.04}
          opacity={0.18 * visibleT}
          roughness={0.86}
          transparent
        />
      </mesh>
      <ArchitectureLabel
        color={color}
        position={[0, group.scale[1] * 0.62, 0.04]}
        text={group.label}
      />
    </group>
  );
}

function InfrastructurePlatform({ transitionT }: { transitionT: number }) {
  return (
    <group position={[0.25, 0.86, -20.9]}>
      <mesh receiveShadow scale={[5.95, 0.08, 3.35]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial {...baseMaterial} color={palette.charcoal} opacity={0.55 * transitionT} transparent />
      </mesh>
      <LinePath
        color={palette.mutedSteel}
        opacity={0.22 * transitionT}
        points={[
          [-2.95, 0.92, -19.25],
          [3.2, 0.92, -19.25],
          [3.2, 0.92, -22.55],
          [-2.95, 0.92, -22.55],
          [-2.95, 0.92, -19.25]
        ]}
      />
    </group>
  );
}

function ArchitectureNodeMesh({
  active,
  layoutNode,
  transitionT
}: {
  active: boolean;
  layoutNode: LayoutNode;
  transitionT: number;
}) {
  const { node } = layoutNode;
  const position = lerpTuple(layoutNode.previewPosition, layoutNode.position, transitionT);
  const scale = active ? 1.08 : 1;
  const dimensions = nodeDimensions(node);
  const statusColor = statusColors[node.status ?? "normal"];
  const isDataStore = node.type === "database" || node.type === "cache";

  return (
    <group position={position} scale={[scale, scale, scale]}>
      {isDataStore ? (
        <mesh castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[dimensions[0] * 0.42, dimensions[0] * 0.42, dimensions[1], 24, 1]} />
          <meshStandardMaterial
            {...baseMaterial}
            color={palette.panelGray}
            emissive={active ? statusColor : palette.graphite}
            emissiveIntensity={active ? 0.18 : 0.02}
          />
        </mesh>
      ) : (
        <mesh castShadow receiveShadow scale={dimensions}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            {...baseMaterial}
            color={node.type === "client" ? "#161d24" : palette.panelGray}
            emissive={active ? statusColor : palette.graphite}
            emissiveIntensity={active ? 0.18 : 0.02}
          />
        </mesh>
      )}
      <mesh position={[0, -dimensions[1] * 0.66, dimensions[2] * 0.52]} scale={[dimensions[0] * 0.84, 0.025, 0.025]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={statusColor} opacity={active ? 0.92 : 0.48} transparent />
      </mesh>
      <ArchitectureLabel
        color={active ? palette.primaryText : palette.mutedSteel}
        position={[0, dimensions[1] * 0.82, dimensions[2] * 0.56]}
        text={node.technology ?? node.label}
      />
    </group>
  );
}

function ArchitectureEdges({
  architecture,
  layout,
  transitionT
}: {
  architecture: ProjectArchitecture;
  layout: GraphLayout;
  transitionT: number;
}) {
  const edgePaths = useMemo(
    () =>
      architecture.edges
        .map((edge) => {
          const start = layout.positions.get(edge.from);
          const end = layout.positions.get(edge.to);
          const previewStart = layout.previewPositions.get(edge.from);
          const previewEnd = layout.previewPositions.get(edge.to);

          if (!start || !end || !previewStart || !previewEnd) {
            return null;
          }

          const startPoint = lerpTuple(previewStart, start, transitionT);
          const endPoint = lerpTuple(previewEnd, end, transitionT);
          const midPoint: VectorTuple = [
            (startPoint[0] + endPoint[0]) / 2,
            Math.max(startPoint[1], endPoint[1]) + 0.18,
            (startPoint[2] + endPoint[2]) / 2
          ];

          return {
            id: `${edge.from}-${edge.to}`,
            points: [startPoint, midPoint, endPoint] as VectorTuple[],
            opacity: edge.confidence === "unconfirmed" ? 0.3 : 0.5
          };
        })
        .filter((edge): edge is { id: string; points: VectorTuple[]; opacity: number } => Boolean(edge)),
    [architecture.edges, layout.positions, layout.previewPositions, transitionT]
  );

  return (
    <>
      {edgePaths.map((edge) => (
        <LinePath color={palette.systemCyan} key={edge.id} opacity={edge.opacity} points={edge.points} />
      ))}
    </>
  );
}

function RequestFlow({
  architecture,
  layout,
  onActiveNodeChange,
  transitionT
}: {
  architecture: ProjectArchitecture;
  layout: GraphLayout;
  onActiveNodeChange: (nodeId: string | null) => void;
  transitionT: number;
}) {
  const progress = useExperienceStore((state) => state.progress);
  const reducedMotion = useExperienceStore((state) => state.reducedMotion);
  const setRequestStage = useExperienceStore((state) => state.setRequestStage);
  const packetRef = useRef<THREE.Mesh>(null);
  const lastStepRef = useRef(-1);
  const requestPath = useMemo(() => getRequestPath(architecture, layout), [architecture, layout]);
  const pathPoints = useMemo(
    () =>
      requestPath
        .map((step) => layout.positions.get(step.nodeId))
        .filter((point): point is VectorTuple => Boolean(point))
        .map((point) => new THREE.Vector3(...point)),
    [layout.positions, requestPath]
  );

  useFrame(({ clock }) => {
    const activeT = rangeProgress(progress, backendVisualizationConfig.activeRange[0], backendVisualizationConfig.activeRange[1]);
    const visible = transitionT > 0.72 && pathPoints.length >= 2 && activeT > 0.08 && activeT < 0.98;

    if (packetRef.current) {
      packetRef.current.visible = visible;
    }

    if (!visible) {
      if (lastStepRef.current !== -1) {
        lastStepRef.current = -1;
        onActiveNodeChange(null);
        setRequestStage(null);
      }
      return;
    }

    const cycle = reducedMotion ? activeT : (activeT * 0.82 + (clock.elapsedTime * 0.035) % 0.18) % 1;
    const pathIndex = Math.min(requestPath.length - 1, Math.floor(cycle * requestPath.length));
    const step = requestPath[pathIndex];
    const node = architecture.nodes.find((item) => item.id === step.nodeId);

    packetRef.current?.position.copy(interpolatePath(pathPoints, cycle));

    if (pathIndex !== lastStepRef.current) {
      lastStepRef.current = pathIndex;
      onActiveNodeChange(step.nodeId);
      setRequestStage({
        state: step.state,
        label: step.label ?? step.state,
        description: step.description ?? node?.semanticRole ?? architecture.note,
        nodeLabel: node?.label ?? step.nodeId
      });
    }
  });

  return (
    <mesh ref={packetRef} visible={false}>
      <sphereGeometry args={[0.075, 18, 9]} />
      <meshBasicMaterial color={palette.systemCyan} />
    </mesh>
  );
}

function SystemArchitectureGraph({
  architecture,
  projectId,
  projectTitle,
  sourceMode,
  transitionT
}: {
  architecture: ProjectArchitecture;
  projectId: string;
  projectTitle: string;
  sourceMode: "configured" | "generated";
  transitionT: number;
}) {
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const layout = useMemo(() => layoutArchitecture(architecture), [architecture]);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      return;
    }

    window.__backendArchitectureProbe = {
      activeNodeId,
      edgeCount: architecture.edges.length,
      groupCount: layout.groups.length,
      nodeCount: architecture.nodes.length,
      nodeIds: architecture.nodes.map((node) => node.id),
      projectId,
      projectTitle,
      requestPathLength: architecture.requestPath?.length ?? 0,
      sourceMode
    };
  }, [activeNodeId, architecture, layout.groups.length, projectId, projectTitle, sourceMode]);

  return (
    <group>
      <InfrastructurePlatform transitionT={transitionT} />
      {layout.groups.map((group) => (
        <SystemBoundary group={group} key={group.id} transitionT={transitionT} />
      ))}
      <ArchitectureEdges architecture={architecture} layout={layout} transitionT={transitionT} />
      {layout.nodes.map((layoutNode) => (
        <ArchitectureNodeMesh
          active={layoutNode.node.id === activeNodeId}
          key={layoutNode.node.id}
          layoutNode={layoutNode}
          transitionT={transitionT}
        />
      ))}
      <RequestFlow
        architecture={architecture}
        layout={layout}
        onActiveNodeChange={setActiveNodeId}
        transitionT={transitionT}
      />
      <LinePath
        color={palette.securityGreen}
        opacity={0.28 * transitionT}
        points={[
          [1.55, 1.55, -22.25],
          [1.78, 1.48, -25.1],
          [1.2, 1.5, -28.0],
          [0.5, 1.5, -31.2]
        ]}
      />
    </group>
  );
}

export function BackendInfrastructure() {
  const groupRef = useRef<THREE.Group>(null);
  const progress = useExperienceStore((state) => state.progress);
  const selectedProjectId = useExperienceStore((state) => state.selectedProjectId);
  const project = getBackendVisualizationProject(selectedProjectId);
  const architecture = useMemo(() => buildSystemArchitecture(project), [project]);
  const sourceMode = project.architecture ? "configured" : "generated";
  const transitionT = rangeProgress(
    progress,
    backendVisualizationConfig.transitionRange[0],
    backendVisualizationConfig.transitionRange[1]
  );

  useFrame(() => {
    if (!groupRef.current) {
      return;
    }

    const visible =
      progress >= backendVisualizationConfig.transitionRange[0] - 0.04 &&
      progress <= backendVisualizationConfig.activeRange[1] + 0.08;

    groupRef.current.visible = visible;
    groupRef.current.position.y = THREE.MathUtils.lerp(-0.12, 0, transitionT);
    groupRef.current.scale.setScalar(THREE.MathUtils.lerp(0.92, 1, transitionT));
  });

  return (
    <group ref={groupRef} visible={false}>
      <SystemArchitectureGraph
        architecture={architecture}
        projectId={project.id}
        projectTitle={project.title}
        sourceMode={sourceMode}
        transitionT={transitionT}
      />
    </group>
  );
}
