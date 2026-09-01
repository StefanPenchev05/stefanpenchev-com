"use client";

import { useFrame } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { LinePath } from "@/components/experience/objects/LinePath";
import { useExperienceStore } from "@/lib/scroll/useExperienceStore";
import { smoothstep } from "@/lib/three/math";

const techPoints: [number, number, number][] = [
  [-2.4, 3.1, -44.1],
  [-1.4, 2.1, -45.2],
  [-0.2, 3.3, -45.9],
  [1.2, 2.55, -44.8],
  [2.2, 3.55, -45.7],
  [-2.0, 1.25, -46.6],
  [-0.45, 1.55, -47.2],
  [1.75, 1.35, -46.4],
  [0.35, 4.25, -47.1]
];

export function TechnologyConstellation() {
  const progress = useExperienceStore((state) => state.progress);
  const reducedMotion = useExperienceStore((state) => state.reducedMotion);
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useLayoutEffect(() => {
    if (!meshRef.current) {
      return;
    }

    techPoints.forEach((position, index) => {
      dummy.position.set(...position);
      dummy.updateMatrix();
      meshRef.current?.setMatrixAt(index, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [dummy]);

  useFrame(({ clock }) => {
    if (!meshRef.current || reducedMotion) {
      return;
    }

    const converge = smoothstep(0.83, 1, progress);
    techPoints.forEach((position, index) => {
      const phase = index * 0.7;
      const rest = new THREE.Vector3(...position);
      const destination = new THREE.Vector3(0, 1.35, -56.8);
      rest.x += Math.sin(clock.elapsedTime * 0.45 + phase) * 0.035;
      rest.y += Math.cos(clock.elapsedTime * 0.38 + phase) * 0.035;
      dummy.position.lerpVectors(rest, destination, converge);
      dummy.updateMatrix();
      meshRef.current?.setMatrixAt(index, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <LinePath color="#5cc8d7" opacity={0.42} points={[techPoints[0], techPoints[1], techPoints[2], techPoints[3], techPoints[4]]} />
      <LinePath color="#77c98d" opacity={0.4} points={[techPoints[5], techPoints[6], techPoints[7], techPoints[3]]} />
      <LinePath color="#d6a75c" opacity={0.34} points={[techPoints[2], techPoints[8], techPoints[4]]} />
      <instancedMesh args={[undefined, undefined, techPoints.length]} ref={meshRef}>
        <sphereGeometry args={[0.14, 16, 8]} />
        <meshBasicMaterial color="#d6a75c" />
      </instancedMesh>
    </group>
  );
}
