"use client";

import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { LinePath } from "@/components/experience/objects/LinePath";
import type {
  ArchitectureNode,
  SecurityInspectionConfig,
  SecurityInspectionStep,
  SecurityState,
  TrustZoneType
} from "@/lib/data/portfolio";
import { buildSecurityInspection } from "@/lib/data/securityInspection";
import { getBackendVisualizationProject } from "@/lib/data/systemArchitecture";
import { useExperienceStore } from "@/lib/scroll/useExperienceStore";
import { palette } from "@/lib/three/materials";
import { interpolatePath } from "@/lib/three/math";

type VectorTuple = [number, number, number];

type SecurityNodeLayout = {
  node: ArchitectureNode;
  position: VectorTuple;
  backendPosition: VectorTuple;
};

declare global {
  interface Window {
    __securityInspectionProbe?: {
      activeNodeId: string | null;
      inspectionPathLength: number;
      projectId: string;
      projectTitle: string;
      protocol?: string;
      sourceMode: "configured" | "generated";
      trustZoneCount: number;
      trustZones: string[];
    };
  }
}

const trustZoneColor: Record<TrustZoneType, string> = {
  external: palette.mutedSteel,
  public: palette.systemCyan,
  application: palette.securityGreen,
  internal: palette.mutedSteel,
  data: palette.dataAmber,
  privileged: palette.alertRed
};

const securityStateColor: Record<SecurityState, string> = {
  observed: palette.systemCyan,
  authenticated: palette.securityGreen,
  validated: palette.securityGreen,
  internal: palette.mutedSteel,
  "data-protected": palette.dataAmber
};

const zoneX: Record<TrustZoneType, number> = {
  external: -3.1,
  public: -2.05,
  application: -0.35,
  internal: 1.05,
  data: 2.25,
  privileged: 2.85
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

function nodeTrustZone(node: ArchitectureNode, config: SecurityInspectionConfig): TrustZoneType {
  const configured = config.inspectionPath.find((step) => step.nodeId === node.id);

  if (configured) {
    return configured.trustZone;
  }

  const zone = config.trustZones.find((item) => item.id === node.group);

  return zone?.type ?? "internal";
}

function layoutSecurityNodes(
  nodes: ArchitectureNode[],
  config: SecurityInspectionConfig
): {
  nodes: SecurityNodeLayout[];
  positions: Map<string, VectorTuple>;
  backendPositions: Map<string, VectorTuple>;
} {
  const zoneCounts = new Map<TrustZoneType, number>();
  const zoneIndex = new Map<TrustZoneType, number>();
  const positions = new Map<string, VectorTuple>();
  const backendPositions = new Map<string, VectorTuple>();
  const layoutNodes = nodes.map((node, index) => {
    const trustZone = nodeTrustZone(node, config);
    zoneCounts.set(trustZone, (zoneCounts.get(trustZone) ?? 0) + 1);

    const currentIndex = zoneIndex.get(trustZone) ?? 0;
    zoneIndex.set(trustZone, currentIndex + 1);

    const count = zoneCounts.get(trustZone) ?? 1;
    const position: VectorTuple = [
      zoneX[trustZone],
      1.62 + (currentIndex - (count - 1) / 2) * 0.58,
      -32.1 - currentIndex * 0.44 - index * 0.14
    ];
    const backendPosition: VectorTuple = [
      -2.2 + index * 0.85,
      1.55 + (index % 2) * 0.42,
      -25.8 - index * 0.3
    ];

    positions.set(node.id, position);
    backendPositions.set(node.id, backendPosition);

    return { node, position, backendPosition };
  });

  return { nodes: layoutNodes, positions, backendPositions };
}

function inspectionPath(
  config: SecurityInspectionConfig,
  layout: ReturnType<typeof layoutSecurityNodes>
) {
  return config.inspectionPath.filter((step) => layout.positions.has(step.nodeId));
}

function SecurityLabel({ color, position, text }: { color: string; position: VectorTuple; text: string }) {
  return (
    <Text
      anchorX="center"
      anchorY="middle"
      color={color}
      fontSize={0.075}
      maxWidth={1.18}
      position={position}
    >
      {text}
    </Text>
  );
}

function TrustBoundary({
  active,
  transitionT,
  zone
}: {
  active: boolean;
  transitionT: number;
  zone: SecurityInspectionConfig["trustZones"][number];
}) {
  const color = trustZoneColor[zone.type];
  const visibleT = clamp01((transitionT - 0.18) / 0.55);
  const x = zoneX[zone.type];
  const scale: VectorTuple = zone.boundaryType === "data" ? [1.25, 1.55, 0.045] : [1.55, 1.82, 0.045];

  return (
    <group position={[x, 1.58, -32.65]} scale={[visibleT, visibleT, visibleT]}>
      <mesh scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={palette.charcoal}
          emissive={color}
          emissiveIntensity={active ? 0.1 : 0.035}
          opacity={active ? 0.18 : 0.105}
          roughness={0.88}
          transparent
        />
      </mesh>
      <LinePath
        color={color}
        opacity={(active ? 0.58 : 0.3) * visibleT}
        points={[
          [-scale[0] / 2, -scale[1] / 2, 0.04],
          [scale[0] / 2, -scale[1] / 2, 0.04],
          [scale[0] / 2, scale[1] / 2, 0.04],
          [-scale[0] / 2, scale[1] / 2, 0.04],
          [-scale[0] / 2, -scale[1] / 2, 0.04]
        ]}
      />
      <SecurityLabel color={color} position={[0, scale[1] * 0.58, 0.08]} text={zone.label} />
    </group>
  );
}

function SecurityNodeState({
  active,
  layoutNode,
  step,
  transitionT
}: {
  active: boolean;
  layoutNode: SecurityNodeLayout;
  step?: SecurityInspectionStep;
  transitionT: number;
}) {
  const position = lerpTuple(layoutNode.backendPosition, layoutNode.position, transitionT);
  const color = step ? securityStateColor[step.securityState] : palette.mutedSteel;
  const isEntryPoint = step?.trustZone === "public";
  const isData = step?.trustZone === "data";

  return (
    <group position={position} scale={[active ? 1.08 : 1, active ? 1.08 : 1, active ? 1.08 : 1]}>
      <mesh castShadow receiveShadow scale={isEntryPoint ? [0.72, 0.42, 0.12] : [0.55, 0.42, isData ? 0.55 : 0.32]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={palette.panelGray}
          emissive={active ? color : palette.graphite}
          emissiveIntensity={active ? 0.18 : 0.025}
          metalness={0.14}
          roughness={0.74}
        />
      </mesh>
      <mesh position={[0, -0.31, 0.18]} scale={[0.42, 0.025, 0.025]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={color} opacity={active ? 0.9 : 0.45} transparent />
      </mesh>
      <SecurityLabel
        color={active ? palette.primaryText : palette.mutedSteel}
        position={[0, 0.38, 0.24]}
        text={layoutNode.node.technology ?? layoutNode.node.label}
      />
    </group>
  );
}

function NetworkPath({
  activeStep,
  layout,
  path,
  transitionT
}: {
  activeStep: number;
  layout: ReturnType<typeof layoutSecurityNodes>;
  path: SecurityInspectionStep[];
  transitionT: number;
}) {
  const points = useMemo(
    () =>
      path
        .map((step) => {
          const securityPosition = layout.positions.get(step.nodeId);
          const backendPosition = layout.backendPositions.get(step.nodeId);

          if (!securityPosition || !backendPosition) {
            return null;
          }

          return lerpTuple(backendPosition, securityPosition, transitionT);
        })
        .filter((point): point is VectorTuple => Boolean(point)),
    [layout, path, transitionT]
  );

  const activeSegment = useMemo(() => {
    if (points.length < 2) {
      return [];
    }

    const start = points[Math.max(0, Math.min(activeStep, points.length - 2))];
    const end = points[Math.max(1, Math.min(activeStep + 1, points.length - 1))];
    const mid: VectorTuple = [(start[0] + end[0]) / 2, Math.max(start[1], end[1]) + 0.16, (start[2] + end[2]) / 2];

    return [start, mid, end] as VectorTuple[];
  }, [activeStep, points]);

  return (
    <>
      <LinePath color={palette.systemCyan} opacity={0.38 * transitionT} points={points} />
      {activeSegment.length > 0 ? (
        <LinePath color={palette.securityGreen} opacity={0.78 * transitionT} points={activeSegment} />
      ) : null}
    </>
  );
}

function ProtocolFlow({
  config,
  layout,
  onActiveStep,
  path,
  transitionT
}: {
  config: SecurityInspectionConfig;
  layout: ReturnType<typeof layoutSecurityNodes>;
  onActiveStep: (index: number) => void;
  path: SecurityInspectionStep[];
  transitionT: number;
}) {
  const packetRef = useRef<THREE.Mesh>(null);
  const progress = useExperienceStore((state) => state.progress);
  const reducedMotion = useExperienceStore((state) => state.reducedMotion);
  const setSecurityInspectionStage = useExperienceStore((state) => state.setSecurityInspectionStage);
  const lastIndexRef = useRef(-1);
  const pathPoints = useMemo(
    () =>
      path
        .map((step) => layout.positions.get(step.nodeId))
        .filter((point): point is VectorTuple => Boolean(point))
        .map((point) => new THREE.Vector3(...point)),
    [layout.positions, path]
  );

  useFrame(({ clock }) => {
    const activeT = rangeProgress(progress, 0.5, 0.78);
    const visible = transitionT > 0.68 && activeT > 0.06 && activeT < 1 && pathPoints.length >= 2;

    if (packetRef.current) {
      packetRef.current.visible = visible;
    }

    if (!visible) {
      if (lastIndexRef.current !== -1) {
        lastIndexRef.current = -1;
        onActiveStep(-1);
        setSecurityInspectionStage(null);
      }
      return;
    }

    const flowT = reducedMotion ? activeT : (activeT * 0.84 + (clock.elapsedTime * 0.028) % 0.16) % 1;
    const index = Math.min(path.length - 1, Math.floor(flowT * path.length));
    const step = path[index];

    packetRef.current?.position.copy(interpolatePath(pathPoints, flowT));

    if (index !== lastIndexRef.current) {
      lastIndexRef.current = index;
      onActiveStep(index);
      setSecurityInspectionStage({
        label: step.label,
        concept: step.concept,
        trustZone: step.trustZone,
        securityState: step.securityState,
        protocol: step.protocol,
        source: step.source,
        destination: step.destination,
        description: step.description
      });
    }
  });

  return (
    <group>
      <mesh ref={packetRef} visible={false}>
        <sphereGeometry args={[0.072, 18, 9]} />
        <meshBasicMaterial color={palette.securityGreen} />
      </mesh>
      <SecurityLabel
        color={palette.mutedSteel}
        position={[0.1, 0.85, -35.55]}
        text={config.note}
      />
    </group>
  );
}

export function CybersecurityNetwork() {
  const groupRef = useRef<THREE.Group>(null);
  const progress = useExperienceStore((state) => state.progress);
  const selectedProjectId = useExperienceStore((state) => state.selectedProjectId);
  const project = getBackendVisualizationProject(selectedProjectId);
  const { architecture, config, sourceMode } = useMemo(() => buildSecurityInspection(project), [project]);
  const layout = useMemo(() => layoutSecurityNodes(architecture.nodes, config), [architecture.nodes, config]);
  const path = useMemo(() => inspectionPath(config, layout), [config, layout]);
  const [activeStep, setActiveStep] = useState(-1);
  const activeZone = activeStep >= 0 ? path[activeStep]?.trustZone : undefined;
  const transitionT = rangeProgress(progress, 0.46, 0.64);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      return;
    }

    window.__securityInspectionProbe = {
      activeNodeId: activeStep >= 0 ? path[activeStep]?.nodeId ?? null : null,
      inspectionPathLength: path.length,
      projectId: project.id,
      projectTitle: project.title,
      protocol: activeStep >= 0 ? path[activeStep]?.protocol : undefined,
      sourceMode,
      trustZoneCount: config.trustZones.length,
      trustZones: config.trustZones.map((zone) => zone.type)
    };
  }, [activeStep, config.trustZones, path, project.id, project.title, sourceMode]);

  useFrame(() => {
    if (!groupRef.current) {
      return;
    }

    groupRef.current.visible = progress > 0.42 && progress < 0.86;
    groupRef.current.position.x = THREE.MathUtils.lerp(0.16, 0, transitionT);
    groupRef.current.position.y = THREE.MathUtils.lerp(-0.1, 0, transitionT);
  });

  return (
    <group ref={groupRef} visible={false}>
      <mesh receiveShadow position={[0.05, 0.76, -32.8]} scale={[6.25, 0.055, 4.45]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={palette.charcoal}
          emissive={palette.securityGreen}
          emissiveIntensity={0.025}
          opacity={0.5 * transitionT}
          roughness={0.9}
          transparent
        />
      </mesh>
      {config.trustZones.map((zone) => (
        <TrustBoundary
          active={activeZone === zone.type}
          key={zone.id}
          transitionT={transitionT}
          zone={zone}
        />
      ))}
      <NetworkPath activeStep={activeStep} layout={layout} path={path} transitionT={transitionT} />
      {layout.nodes.map((layoutNode) => (
        <SecurityNodeState
          active={path[activeStep]?.nodeId === layoutNode.node.id}
          key={layoutNode.node.id}
          layoutNode={layoutNode}
          step={path.find((item) => item.nodeId === layoutNode.node.id)}
          transitionT={transitionT}
        />
      ))}
      <ProtocolFlow
        config={config}
        layout={layout}
        onActiveStep={setActiveStep}
        path={path}
        transitionT={transitionT}
      />
      <LinePath
        color={palette.mutedSteel}
        opacity={0.24 * transitionT}
        points={[
          [1.4, 1.3, -35.0],
          [1.2, 1.65, -37.8],
          [-0.7, 2.4, -40.5],
          [-1.8, 3.1, -43.2]
        ]}
      />
    </group>
  );
}
