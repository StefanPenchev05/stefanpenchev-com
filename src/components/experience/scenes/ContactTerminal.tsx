"use client";

import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { LinePath } from "@/components/experience/objects/LinePath";
import { profile } from "@/lib/data/portfolio";
import { useExperienceStore } from "@/lib/scroll/useExperienceStore";
import { palette } from "@/lib/three/materials";
import { smoothstep } from "@/lib/three/math";

declare global {
  interface Window {
    __contactTerminalProbe?: {
      arrivalProgress: number;
      contactActions: Array<"email" | "linkedin" | "portfolio" | "github">;
      finalState: boolean;
    };
  }
}

function ContactDisplay({ arrivalT }: { arrivalT: number }) {
  return (
    <group position={[0.15, 1.58, -58.08]} rotation={[0, -0.08, 0]}>
      <mesh castShadow receiveShadow scale={[3.35, 1.45, 0.08]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#070d11"
          emissive={palette.systemCyan}
          emissiveIntensity={0.12 + arrivalT * 0.1}
          metalness={0.12}
          roughness={0.48}
        />
      </mesh>
      <mesh position={[-1.0, 0.28, 0.06]} scale={[0.84, 0.035, 0.02]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={palette.systemCyan} opacity={0.56 * arrivalT} transparent />
      </mesh>
      <mesh position={[-0.35, 0.05, 0.06]} scale={[1.42, 0.035, 0.02]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={palette.primaryText} opacity={0.34 * arrivalT} transparent />
      </mesh>
      <mesh position={[-0.58, -0.2, 0.06]} scale={[0.94, 0.035, 0.02]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={palette.securityGreen} opacity={0.4 * arrivalT} transparent />
      </mesh>
      <Text
        anchorX="center"
        anchorY="middle"
        color={palette.mutedSteel}
        fontSize={0.075}
        maxWidth={2.6}
        position={[0.22, -0.55, 0.08]}
      >
        Open to building thoughtful software systems.
      </Text>
    </group>
  );
}

function CommunicationPath({ arrivalT }: { arrivalT: number }) {
  return (
    <>
      <LinePath
        color={palette.dataAmber}
        opacity={0.34 * arrivalT}
        points={[
          [-1.8, 3.1, -43.2],
          [-1.1, 2.6, -48.5],
          [-0.35, 1.92, -53.25],
          [0.02, 1.58, -58.0]
        ]}
      />
      <LinePath
        color={palette.systemCyan}
        opacity={0.38 * arrivalT}
        points={[
          [-0.6, 1.78, -54.2],
          [-0.24, 1.66, -56.0],
          [0.12, 1.58, -58.02]
        ]}
      />
    </>
  );
}

export function ContactTerminal() {
  const groupRef = useRef<THREE.Group>(null);
  const indicatorRef = useRef<THREE.Mesh>(null);
  const progress = useExperienceStore((state) => state.progress);
  const reducedMotion = useExperienceStore((state) => state.reducedMotion);
  const arrivalT = smoothstep(0.82, 1, progress);

  useFrame(({ clock }) => {
    if (!groupRef.current) {
      return;
    }

    groupRef.current.visible = progress > 0.78;
    groupRef.current.position.y = THREE.MathUtils.lerp(-0.12, 0, arrivalT);

    if (indicatorRef.current) {
      const pulse = reducedMotion ? 0 : Math.sin(clock.elapsedTime * 1.25) * 0.04;
      indicatorRef.current.scale.set(0.32 + pulse, 0.035, 0.035);
    }

    if (process.env.NODE_ENV === "development") {
      window.__contactTerminalProbe = {
        arrivalProgress: Number(arrivalT.toFixed(3)),
        contactActions: [
          "email",
          "linkedin",
          "portfolio",
          ...(profile.githubUrl ? (["github"] as const) : [])
        ],
        finalState: progress > 0.96
      };
    }
  });

  return (
    <group ref={groupRef} visible={false}>
      <CommunicationPath arrivalT={arrivalT} />
      <mesh receiveShadow position={[0.1, 0.55, -57.82]} scale={[4.45, 0.12, 2.05]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={palette.panelGray} metalness={0.18} roughness={0.72} />
      </mesh>
      <mesh castShadow receiveShadow position={[0.15, 0.98, -57.95]} scale={[2.9, 0.16, 0.5]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={palette.charcoal} metalness={0.24} roughness={0.62} />
      </mesh>
      <mesh castShadow position={[-1.62, 1.32, -58.08]} scale={[0.08, 1.28, 0.08]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={palette.mutedSteel} metalness={0.52} roughness={0.44} />
      </mesh>
      <mesh castShadow position={[1.88, 1.32, -58.16]} scale={[0.08, 1.28, 0.08]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={palette.mutedSteel} metalness={0.52} roughness={0.44} />
      </mesh>
      <ContactDisplay arrivalT={arrivalT} />
      <mesh ref={indicatorRef} position={[-0.95, 0.75, -56.9]} scale={[0.32, 0.035, 0.035]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={palette.dataAmber} opacity={0.5 * arrivalT} transparent />
      </mesh>
      <rectAreaLight
        color="#d8cbb8"
        height={1.2}
        intensity={1.1 * arrivalT}
        position={[0.2, 2.3, -56.8]}
        rotation={[-Math.PI / 2.8, 0, 0]}
        width={3}
      />
    </group>
  );
}
