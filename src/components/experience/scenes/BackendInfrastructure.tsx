"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { LinePath } from "@/components/experience/objects/LinePath";
import { Block } from "@/components/experience/objects/Block";

const services: [number, number, number][] = [
  [-1.7, 2.2, -19.2],
  [-0.2, 2.75, -20.1],
  [1.35, 2.05, -19.8],
  [-1.1, 1.2, -21.2],
  [1.1, 1.18, -21.4],
  [0, 1.8, -22.4]
];

export function BackendInfrastructure() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const instancedNodes = useMemo(() => services, []);

  useLayoutEffect(() => {
    if (!meshRef.current) {
      return;
    }

    const dummy = new THREE.Object3D();
    instancedNodes.forEach((position, index) => {
      dummy.position.set(...position);
      dummy.updateMatrix();
      meshRef.current?.setMatrixAt(index, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [instancedNodes]);

  return (
    <group>
      <Block color="#111820" opacity={0.16} position={[0, 1.8, -20.6]} scale={[5.2, 3, 4.2]} />
      <LinePath color="#5cc8d7" opacity={0.72} points={[services[0], services[1], services[2], services[5], services[3], services[0]]} />
      <LinePath color="#d6a75c" opacity={0.62} points={[services[1], services[4], services[5]]} />
      <instancedMesh args={[undefined, undefined, instancedNodes.length]} ref={meshRef}>
        <sphereGeometry args={[0.16, 16, 8]} />
        <meshBasicMaterial color="#5cc8d7" />
      </instancedMesh>
      <LinePath
        color="#77c98d"
        opacity={0.42}
        points={[
          [0, 1.8, -22.4],
          [0.5, 1.75, -25.3],
          [1.5, 1.65, -28.1],
          [0.5, 1.5, -31.2]
        ]}
      />
    </group>
  );
}
