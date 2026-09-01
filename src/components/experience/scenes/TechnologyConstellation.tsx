"use client";

import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { LinePath } from "@/components/experience/objects/LinePath";
import {
  buildTechnologyMap,
  type TechnologyMapCluster,
  type TechnologyMapNode
} from "@/lib/data/technologyMap";
import { useExperienceStore } from "@/lib/scroll/useExperienceStore";
import { palette } from "@/lib/three/materials";
import { smoothstep } from "@/lib/three/math";

type VectorTuple = [number, number, number];

type TechnologyNodeLayout = {
  cluster: TechnologyMapCluster;
  node: TechnologyMapNode;
  position: VectorTuple;
  securityPosition: VectorTuple;
  contactPosition: VectorTuple;
};

type TechnologyLayout = {
  clusters: Array<TechnologyMapCluster & { anchor: VectorTuple; labelPosition: VectorTuple }>;
  nodes: TechnologyNodeLayout[];
};

declare global {
  interface Window {
    __technologyConstellationProbe?: {
      activeGroupId: string | null;
      activeTechnologyId: string | null;
      clusterCount: number;
      nodeCount: number;
      relatedProjectCount: number;
      usesInstancedMesh: boolean;
    };
  }
}

const clusterAnchors: VectorTuple[] = [
  [-1.0, 2.35, -45.25],
  [-2.35, 1.65, -44.65],
  [0.2, 2.0, -44.55],
  [1.65, 1.6, -45.15],
  [-1.55, 3.15, -46.1],
  [1.2, 3.18, -46.2],
  [-0.1, 1.05, -46.55]
];

const groupColors = [
  palette.systemCyan,
  palette.mutedSteel,
  palette.securityGreen,
  palette.dataAmber,
  palette.mutedSteel,
  palette.systemCyan,
  palette.mutedSteel
];

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

function buildLayout(): TechnologyLayout {
  const map = buildTechnologyMap();
  const clusters = map.clusters.map((cluster, index) => {
    const anchor = clusterAnchors[index % clusterAnchors.length];

    return {
      ...cluster,
      anchor,
      labelPosition: [anchor[0], anchor[1] + 0.56, anchor[2] + 0.05] as VectorTuple
    };
  });
  const nodes = clusters.flatMap((cluster, clusterIndex) =>
    cluster.technologies.map((node, nodeIndex) => {
      const radius = 0.34 + Math.min(0.26, node.weight * 0.035);
      const angle = (Math.PI * 2 * nodeIndex) / Math.max(1, cluster.technologies.length);
      const depthOffset = (nodeIndex % 3) * 0.11;
      const position: VectorTuple = [
        cluster.anchor[0] + Math.cos(angle) * radius,
        cluster.anchor[1] + Math.sin(angle) * radius * 0.58,
        cluster.anchor[2] - depthOffset
      ];
      const securityPosition: VectorTuple = [
        -2.4 + clusterIndex * 0.8,
        1.55 + (nodeIndex % 2) * 0.28,
        -36.4 - clusterIndex * 0.34 - nodeIndex * 0.02
      ];

      return {
        cluster,
        node,
        position,
        securityPosition,
        contactPosition: [0, 1.35, -56.8] as VectorTuple
      };
    })
  );

  return { clusters, nodes };
}

function activeNodeIndex(progress: number, nodeCount: number, reducedMotion: boolean) {
  if (nodeCount === 0 || progress < 0.62 || progress > 0.88) {
    return -1;
  }

  const local = rangeProgress(progress, 0.66, 0.84);

  if (reducedMotion) {
    return Math.floor(nodeCount * 0.34) % nodeCount;
  }

  return Math.min(nodeCount - 1, Math.floor(local * nodeCount));
}

function ClusterLabel({
  cluster,
  color
}: {
  cluster: TechnologyLayout["clusters"][number];
  color: string;
}) {
  return (
    <Text
      anchorX="center"
      anchorY="middle"
      color={color}
      fontSize={0.09}
      maxWidth={1.4}
      position={cluster.labelPosition}
    >
      {cluster.title}
    </Text>
  );
}

function TechnologyConnections({
  active,
  layout,
  transitionT
}: {
  active: TechnologyNodeLayout | undefined;
  layout: TechnologyLayout;
  transitionT: number;
}) {
  const clusterPaths = useMemo(
    () =>
      layout.clusters
        .map((cluster) => {
          const nodes = layout.nodes.filter((item) => item.cluster.id === cluster.id);
          return nodes.map((item) => ({
            id: `${cluster.id}-${item.node.id}`,
            color: groupColors[layout.clusters.findIndex((candidate) => candidate.id === cluster.id) % groupColors.length],
            points: [cluster.anchor, item.position] as VectorTuple[]
          }));
        })
        .flat(),
    [layout]
  );
  const relationPaths = useMemo(() => {
    if (!active) {
      return [];
    }

    return active.node.relatedProjects.slice(0, 4).map((project, index) => {
      const offset = (index - 1.5) * 0.24;
      return {
        id: `${active.node.id}-${project.id}`,
        points: [
          active.position,
          [active.position[0] + 0.34, active.position[1] + offset, active.position[2] - 0.18],
          [active.position[0] + 0.74, active.position[1] + offset, active.position[2] - 0.36]
        ] as VectorTuple[]
      };
    });
  }, [active]);

  return (
    <>
      {clusterPaths.map((path) => (
        <LinePath color={path.color} key={path.id} opacity={0.18 * transitionT} points={path.points} />
      ))}
      {relationPaths.map((path) => (
        <LinePath color={palette.securityGreen} key={path.id} opacity={0.52 * transitionT} points={path.points} />
      ))}
    </>
  );
}

function ProjectRelationIndicator({
  active,
  transitionT
}: {
  active: TechnologyNodeLayout | undefined;
  transitionT: number;
}) {
  if (!active || active.node.relatedProjects.length === 0) {
    return null;
  }

  return (
    <group>
      {active.node.relatedProjects.slice(0, 4).map((project, index) => {
        const y = active.position[1] + (index - 1.5) * 0.24;
        const x = active.position[0] + 0.82;
        const z = active.position[2] - 0.38;

        return (
          <group key={project.id} position={[x, y, z]} scale={[transitionT, transitionT, transitionT]}>
            <mesh scale={[0.22, 0.035, 0.035]}>
              <boxGeometry args={[1, 1, 1]} />
              <meshBasicMaterial color={palette.securityGreen} opacity={0.62} transparent />
            </mesh>
            <Text
              anchorX="left"
              anchorY="middle"
              color={palette.mutedSteel}
              fontSize={0.055}
              maxWidth={0.85}
              position={[0.18, 0.005, 0]}
            >
              {project.title}
            </Text>
          </group>
        );
      })}
    </group>
  );
}

export function TechnologyConstellation() {
  const progress = useExperienceStore((state) => state.progress);
  const reducedMotion = useExperienceStore((state) => state.reducedMotion);
  const setTechnologySelectionStage = useExperienceStore((state) => state.setTechnologySelectionStage);
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const layout = useMemo(() => buildLayout(), []);
  const activeIndex = activeNodeIndex(progress, layout.nodes.length, reducedMotion);
  const active = activeIndex >= 0 ? layout.nodes[activeIndex] : undefined;
  const transitionT = smoothstep(0.58, 0.72, progress);
  const contactT = smoothstep(0.83, 1, progress);

  useLayoutEffect(() => {
    if (!meshRef.current) {
      return;
    }

    layout.nodes.forEach((item, index) => {
      dummy.position.set(...item.securityPosition);
      const scale = 0.11 + Math.min(0.08, item.node.weight * 0.012);
      dummy.scale.set(scale, scale * 0.55, scale * 0.42);
      dummy.updateMatrix();
      meshRef.current?.setMatrixAt(index, dummy.matrix);
      meshRef.current?.setColorAt(
        index,
        new THREE.Color(groupColors[layout.clusters.findIndex((cluster) => cluster.id === item.cluster.id) % groupColors.length])
      );
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [dummy, layout]);

  useLayoutEffect(() => {
    if (!active) {
      setTechnologySelectionStage(null);
      if (process.env.NODE_ENV === "development") {
        window.__technologyConstellationProbe = {
          activeGroupId: null,
          activeTechnologyId: null,
          clusterCount: layout.clusters.length,
          nodeCount: layout.nodes.length,
          relatedProjectCount: 0,
          usesInstancedMesh: true
        };
      }
      return;
    }

    setTechnologySelectionStage({
      groupId: active.cluster.id,
      groupTitle: active.cluster.title,
      technologyId: active.node.id,
      technologyName: active.node.name,
      relatedProjectTitles: active.node.relatedProjects.map((project) => project.title),
      domains: active.node.domains
    });

    if (process.env.NODE_ENV === "development") {
      window.__technologyConstellationProbe = {
        activeGroupId: active.cluster.id,
        activeTechnologyId: active.node.id,
        clusterCount: layout.clusters.length,
        nodeCount: layout.nodes.length,
        relatedProjectCount: active.node.relatedProjects.length,
        usesInstancedMesh: true
      };
    }
  }, [active, layout.clusters.length, layout.nodes.length, setTechnologySelectionStage]);

  useFrame(({ clock }) => {
    if (!groupRef.current || !meshRef.current) {
      return;
    }

    groupRef.current.visible = progress > 0.54;
    groupRef.current.position.y = THREE.MathUtils.lerp(-0.15, 0, transitionT);

    layout.nodes.forEach((item, index) => {
      const phase = index * 0.61;
      const target = lerpTuple(item.securityPosition, item.position, transitionT);
      const contactPosition = lerpTuple(target, item.contactPosition, contactT);
      const driftX = reducedMotion ? 0 : Math.sin(clock.elapsedTime * 0.32 + phase) * 0.018;
      const driftY = reducedMotion ? 0 : Math.cos(clock.elapsedTime * 0.27 + phase) * 0.018;
      const isActive = index === activeIndex && progress > 0.62 && progress < 0.88;
      const baseScale = 0.11 + Math.min(0.08, item.node.weight * 0.012);

      dummy.position.set(contactPosition[0] + driftX, contactPosition[1] + driftY, contactPosition[2]);
      dummy.scale.setScalar(isActive ? baseScale * 1.45 : baseScale);
      dummy.scale.y *= 0.55;
      dummy.scale.z *= 0.42;
      dummy.updateMatrix();
      meshRef.current?.setMatrixAt(index, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group ref={groupRef} visible={false}>
      <LinePath
        color={palette.mutedSteel}
        opacity={0.2 * transitionT}
        points={[
          [-1.8, 3.1, -43.2],
          [-1.2, 2.8, -44.0],
          [-0.4, 2.35, -44.55],
          [0.2, 2.0, -44.55]
        ]}
      />
      {layout.clusters.map((cluster, index) => (
        <group key={cluster.id}>
          <mesh position={cluster.anchor} scale={[0.22 + cluster.technologies.length * 0.035, 0.035, 0.035]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color={groupColors[index % groupColors.length]} opacity={0.48 * transitionT} transparent />
          </mesh>
          <ClusterLabel cluster={cluster} color={groupColors[index % groupColors.length]} />
        </group>
      ))}
      <TechnologyConnections active={active} layout={layout} transitionT={transitionT} />
      <ProjectRelationIndicator active={active} transitionT={transitionT} />
      <LinePath
        color={palette.dataAmber}
        opacity={0.28 * contactT}
        points={[
          [0.2, 2.0, -44.55],
          [-0.7, 2.4, -48.3],
          [-0.35, 1.85, -53.5],
          [0, 1.35, -56.8]
        ]}
      />
      <instancedMesh args={[undefined, undefined, layout.nodes.length]} ref={meshRef}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={palette.systemCyan}
          emissive={palette.systemCyan}
          emissiveIntensity={0.22}
          metalness={0.12}
          roughness={0.62}
          vertexColors
        />
      </instancedMesh>
    </group>
  );
}
