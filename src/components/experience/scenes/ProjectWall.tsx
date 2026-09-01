"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { LinePath } from "@/components/experience/objects/LinePath";
import { Node } from "@/components/experience/objects/Node";
import { buildArchitecturePreview, buildProjectWallLayout } from "@/lib/data/projectWall";
import { projects, type PortfolioProject } from "@/lib/data/portfolio";
import { useExperienceStore } from "@/lib/scroll/useExperienceStore";
import { materialPresets } from "@/lib/three/materials";
import { smoothstep } from "@/lib/three/math";

const bridgePath: [number, number, number][] = [
  [0.94, 2.24, -2.08],
  [1.35, 2.32, -4.15],
  [0.84, 2.44, -6.55],
  [0.18, 2.46, -8.45]
];

declare global {
  interface Window {
    __projectWallLayout?: Array<{
      featured: boolean;
      id: string;
      rank: number;
      rail: "featured" | "secondary";
    }>;
  }
}

function semanticColor(project: PortfolioProject) {
  if (project.domains.includes("security") || project.domains.includes("networking")) {
    return "#77C98D";
  }

  if (project.domains.includes("data") || project.domains.includes("ai-ml")) {
    return "#D6A75C";
  }

  return "#5CC8D7";
}

function ProjectArchitecturePreview({
  project,
  selected
}: {
  project: PortfolioProject;
  selected: boolean;
}) {
  const architecture = useMemo(() => buildArchitecturePreview(project), [project]);
  const width = selected ? 0.82 : 0.56;
  const points = useMemo(
    () =>
      architecture.nodes.map((_, index) => {
        const x = architecture.nodes.length === 1 ? 0 : -width / 2 + (width / (architecture.nodes.length - 1)) * index;
        const y = Math.sin(index * 1.4) * (selected ? 0.13 : 0.08);
        return [x, y, 0.1] as [number, number, number];
      }),
    [architecture.nodes, selected, width]
  );

  return (
    <group position={[0, selected ? -0.02 : -0.04, 0.06]}>
      <LinePath color={semanticColor(project)} opacity={selected ? 0.78 : 0.42} points={points} />
      {points.map((point, index) => (
        <Node
          color={index === 0 ? "#5CC8D7" : semanticColor(project)}
          key={`${project.id}-${architecture.nodes[index]?.id ?? index}`}
          position={point}
          scale={selected ? 0.035 : 0.025}
        />
      ))}
    </group>
  );
}

function ProjectDisplay({
  project,
  position,
  scale,
  rail
}: ReturnType<typeof buildProjectWallLayout>[number]) {
  const groupRef = useRef<THREE.Group>(null);
  const selectedProjectId = useExperienceStore((state) => state.selectedProjectId);
  const setSelectedProjectId = useExperienceStore((state) => state.setSelectedProjectId);
  const selected = selectedProjectId === project.id;
  const accent = semanticColor(project);

  useFrame((_, delta) => {
    if (!groupRef.current) {
      return;
    }

    const easing = 1 - Math.exp(-delta * 5);
    const targetDepth = selected ? 0.26 : rail === "featured" ? 0 : -0.2;
    const targetScale = selected ? 1.08 : rail === "featured" ? 1 : 0.93;
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, position[2] + targetDepth, easing);
    groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, easing));
  });

  return (
    <group
      onClick={() => setSelectedProjectId(project.id)}
      onPointerEnter={() => setSelectedProjectId(project.id)}
      position={position}
      ref={groupRef}
      userData={{ projectId: project.id, featured: project.featured, hierarchyRank: project.hierarchyRank }}
    >
      <mesh castShadow={rail === "featured"} receiveShadow scale={[scale[0] + 0.1, scale[1] + 0.1, scale[2]]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial {...materialPresets.graphiteMetal} />
      </mesh>
      <mesh position={[0, 0, 0.045]} scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial {...materialPresets.displayGlass} />
      </mesh>
      <mesh position={[-scale[0] * 0.22, scale[1] * 0.25, 0.09]} scale={[scale[0] * (selected ? 0.46 : 0.32), 0.018, 0.01]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial {...materialPresets.cyanSignal} />
      </mesh>
      <mesh position={[scale[0] * 0.29, scale[1] * 0.24, 0.09]} scale={[0.035, 0.035, 0.012]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial {...(project.featured ? materialPresets.cyanSignal : materialPresets.brushedAccent)} />
      </mesh>
      <ProjectArchitecturePreview project={project} selected={selected} />
      <mesh position={[-scale[0] * 0.32, -scale[1] * 0.32, 0.09]} scale={[scale[0] * 0.18, 0.015, 0.01]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={selected ? 0.36 : 0.12} roughness={0.5} metalness={0.1} />
      </mesh>
    </group>
  );
}

function ProjectRail() {
  const layout = useMemo(() => buildProjectWallLayout(projects), []);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      return;
    }

    window.__projectWallLayout = layout.map((item) => ({
      featured: item.project.featured,
      id: item.project.id,
      rank: item.project.hierarchyRank,
      rail: item.rail
    }));
  }, [layout]);

  return (
    <>
      {layout.map((item) => (
        <ProjectDisplay key={item.project.id} {...item} />
      ))}
    </>
  );
}

function TransitionBridge() {
  const progress = useExperienceStore((state) => state.progress);
  const bridgeGroup = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!bridgeGroup.current) {
      return;
    }

    const emerge = smoothstep(0.04, 0.2, progress);
    const easing = 1 - Math.exp(-delta * 5);
    bridgeGroup.current.scale.lerp(new THREE.Vector3(1, 1, 0.35 + emerge * 0.65), easing);
    bridgeGroup.current.position.z = THREE.MathUtils.lerp(bridgeGroup.current.position.z, -emerge * 0.22, easing);
  });

  return (
    <group ref={bridgeGroup}>
      <LinePath color="#5CC8D7" opacity={0.42} points={bridgePath} />
      {bridgePath.slice(1).map((point, index) => (
        <Node color={index === 1 ? "#77C98D" : "#5CC8D7"} key={index} position={point} scale={0.045} />
      ))}
    </group>
  );
}

export function ProjectWall() {
  const progress = useExperienceStore((state) => state.progress);
  const rootRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!rootRef.current) {
      return;
    }

    rootRef.current.visible = progress > 0.025 && progress < 0.55;
  });

  return (
    <group ref={rootRef} visible={false}>
      <TransitionBridge />
      <mesh castShadow receiveShadow position={[0, 2.12, -9.28]} scale={[6.4, 3.25, 0.12]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial {...materialPresets.panelComposite} />
      </mesh>
      <mesh receiveShadow position={[0, 0.54, -8.82]} scale={[7.2, 0.08, 2.25]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial {...materialPresets.graphiteMetal} />
      </mesh>
      <mesh position={[-2.7, 3.58, -9.08]} scale={[1.16, 0.035, 0.035]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial {...materialPresets.brushedAccent} />
      </mesh>
      <mesh position={[2.45, 0.85, -9.02]} scale={[1.42, 0.035, 0.035]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial {...materialPresets.brushedAccent} />
      </mesh>
      <ProjectRail />
      <LinePath
        color="#77C98D"
        opacity={0.4}
        points={[
          [1.9, 2.2, -9.05],
          [2.25, 1.9, -11.2],
          [1.2, 1.8, -14.7],
          [0.6, 1.85, -18.6]
        ]}
      />
    </group>
  );
}
