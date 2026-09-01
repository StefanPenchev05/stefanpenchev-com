"use client";

import { useFrame } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { LinePath } from "@/components/experience/objects/LinePath";
import { Node } from "@/components/experience/objects/Node";
import { useExperienceStore } from "@/lib/scroll/useExperienceStore";
import { materialPresets } from "@/lib/three/materials";

const monitorDiagram: [number, number, number][] = [
  [-1.04, 1.92, -2.08],
  [-0.42, 2.22, -2.08],
  [0.36, 1.92, -2.08],
  [0.94, 2.24, -2.08]
];

type WorkstationBoxProps = {
  material: keyof typeof materialPresets;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale: [number, number, number];
};

function WorkstationBox({
  material,
  position,
  rotation = [0, 0, 0],
  scale
}: WorkstationBoxProps) {
  return (
    <mesh castShadow receiveShadow position={position} rotation={rotation} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial {...materialPresets[material]} />
    </mesh>
  );
}

function DisplayPanel({
  position,
  rotation = [0, 0, 0],
  scale
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale: [number, number, number];
}) {
  return (
    <group position={position} rotation={rotation}>
      <WorkstationBox
        material="graphiteMetal"
        position={[0, 0, -0.035]}
        scale={[scale[0] + 0.1, scale[1] + 0.1, 0.06]}
      />
      <mesh position={[0, 0, 0]} scale={scale}>
        <boxGeometry args={[1, 1, 0.035]} />
        <meshStandardMaterial {...materialPresets.monitorSurface} />
      </mesh>
    </group>
  );
}

function Keyboard() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useLayoutEffect(() => {
    if (!meshRef.current) {
      return;
    }

    let index = 0;
    for (let row = 0; row < 4; row += 1) {
      for (let col = 0; col < 11; col += 1) {
        dummy.position.set(-0.74 + col * 0.145 + row * 0.035, 0.735, 0.44 - row * 0.12);
        dummy.scale.set(col === 5 && row === 3 ? 0.19 : 0.105, 0.025, 0.075);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(index, dummy.matrix);
        index += 1;
      }
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [dummy]);

  return (
    <instancedMesh
      args={[undefined, undefined, 44]}
      castShadow
      receiveShadow
      ref={meshRef}
      rotation={[0, -0.08, 0]}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial {...materialPresets.charcoalPlastic} />
    </instancedMesh>
  );
}

function TerminalActivity() {
  return (
    <group rotation={[0, -0.32, 0]}>
      <LinePath
        color="#5CC8D7"
        opacity={0.72}
        points={[
          [1.05, 1.71, -1.92],
          [1.32, 1.71, -1.92],
          [1.72, 1.71, -1.92]
        ]}
      />
      <LinePath
        color="#8A98A8"
        opacity={0.48}
        points={[
          [1.05, 1.54, -1.92],
          [1.58, 1.54, -1.92]
        ]}
      />
      <LinePath
        color="#77C98D"
        opacity={0.66}
        points={[
          [1.05, 1.37, -1.92],
          [1.28, 1.37, -1.92],
          [1.5, 1.37, -1.92]
        ]}
      />
      <Node color="#77C98D" position={[1.78, 1.37, -1.92]} scale={0.035} />
      <Node color="#D6A75C" position={[1.82, 1.54, -1.92]} scale={0.035} />
    </group>
  );
}

export function OperationsWorkstation() {
  const groupRef = useRef<THREE.Group>(null);
  const reducedMotion = useExperienceStore((state) => state.reducedMotion);

  useFrame(({ pointer }, delta) => {
    if (!groupRef.current || reducedMotion) {
      return;
    }

    const targetX = pointer.y * 0.018;
    const targetY = -0.1 + pointer.x * 0.024;
    const easing = 1 - Math.exp(-delta * 2.8);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, easing);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, easing);
  });

  return (
    <group ref={groupRef} position={[-0.55, -0.08, 0]} rotation={[0, -0.1, 0]}>
      <mesh receiveShadow position={[0, 0.18, -0.35]} scale={[8.4, 0.05, 5.2]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial {...materialPresets.graphiteMetal} />
      </mesh>

      <WorkstationBox material="panelComposite" position={[0.05, 0.56, -0.05]} scale={[5.8, 0.22, 2.15]} />
      <WorkstationBox material="brushedAccent" position={[-2.05, 0.7, -0.05]} scale={[0.045, 0.24, 2.05]} />
      <WorkstationBox material="brushedAccent" position={[2.28, 0.7, -0.05]} scale={[0.045, 0.24, 2.05]} />
      <WorkstationBox material="charcoalPlastic" position={[-0.32, 0.78, 0.12]} rotation={[0, -0.08, 0]} scale={[2.35, 0.08, 0.78]} />
      <Keyboard />
      <WorkstationBox material="charcoalPlastic" position={[1.42, 0.74, 0.34]} rotation={[0, -0.22, 0]} scale={[0.76, 0.045, 0.52]} />

      <DisplayPanel position={[-0.32, 1.72, -2.1]} rotation={[0, 0.02, 0]} scale={[2.95, 1.55, 1]} />
      <DisplayPanel position={[-2.02, 1.61, -1.76]} rotation={[0, 0.28, 0]} scale={[1.08, 0.84, 1]} />
      <DisplayPanel position={[1.45, 1.53, -1.93]} rotation={[0, -0.32, 0]} scale={[1.18, 0.9, 1]} />

      <WorkstationBox material="brushedAccent" position={[-0.32, 1, -2.05]} scale={[0.18, 0.82, 0.12]} />
      <WorkstationBox material="graphiteMetal" position={[-0.32, 0.66, -1.98]} scale={[1.18, 0.1, 0.48]} />

      <WorkstationBox material="panelComposite" position={[-3.25, 1.85, -2.55]} rotation={[0, 0.42, 0]} scale={[0.1, 2.8, 2.2]} />
      <WorkstationBox material="panelComposite" position={[2.85, 1.95, -2.78]} rotation={[0, -0.34, 0]} scale={[0.12, 3, 2.35]} />
      <WorkstationBox material="charcoalPlastic" position={[-1.65, 2.98, -2.88]} scale={[1.9, 0.08, 0.08]} />
      <WorkstationBox material="charcoalPlastic" position={[1.25, 3.08, -3.05]} scale={[2.3, 0.08, 0.08]} />

      <LinePath color="#5cc8d7" opacity={0.86} points={monitorDiagram} />
      {monitorDiagram.map((point, index) => (
        <Node color={index === 1 ? "#77c98d" : "#5cc8d7"} key={index} position={point} scale={0.055} />
      ))}
      <LinePath
        color="#8A98A8"
        opacity={0.38}
        points={[
          [-2.32, 1.88, -1.63],
          [-2.02, 1.42, -1.63],
          [-1.62, 1.72, -1.63],
          [-1.36, 1.32, -1.63]
        ]}
      />
      <TerminalActivity />
      <LinePath
        color="#5cc8d7"
        opacity={0.38}
        points={[
          [0.94, 2.24, -2.08],
          [1.4, 2.3, -4.2],
          [0.9, 2.25, -6.6],
          [0.35, 2.1, -8.7]
        ]}
      />
    </group>
  );
}
