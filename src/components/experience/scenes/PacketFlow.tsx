"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { useExperienceStore } from "@/lib/scroll/useExperienceStore";
import { interpolatePath } from "@/lib/three/math";

const packetPath = [
  new THREE.Vector3(0.95, 2.25, -2.08),
  new THREE.Vector3(0.35, 2.1, -8.7),
  new THREE.Vector3(0.6, 1.85, -18.6),
  new THREE.Vector3(0, 1.8, -22.4),
  new THREE.Vector3(0.5, 1.5, -31.2),
  new THREE.Vector3(1.35, 0.95, -34.8),
  new THREE.Vector3(-1.8, 3.1, -43.2),
  new THREE.Vector3(0, 1.35, -56.8)
];

export function PacketFlow() {
  const meshRef = useRef<THREE.Mesh>(null);
  const progress = useExperienceStore((state) => state.progress);
  const reducedMotion = useExperienceStore((state) => state.reducedMotion);

  useFrame(({ clock }) => {
    if (!meshRef.current) {
      return;
    }

    const flowProgress = reducedMotion
      ? progress
      : Math.min(1, Math.max(0, progress + Math.sin(clock.elapsedTime * 1.4) * 0.005));
    meshRef.current.position.copy(interpolatePath(packetPath, flowProgress));
    meshRef.current.visible = progress > 0.035;
  });

  return (
    <mesh ref={meshRef} visible={false}>
      <sphereGeometry args={[0.07, 16, 8]} />
      <meshBasicMaterial color="#5CC8D7" />
    </mesh>
  );
}
