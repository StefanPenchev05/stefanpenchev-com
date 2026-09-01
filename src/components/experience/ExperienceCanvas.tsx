"use client";

import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { SceneRoot } from "@/components/experience/SceneRoot";

export function ExperienceCanvas() {
  return (
    <div className="canvas-shell" aria-hidden="true">
      <Canvas
        camera={{ fov: 50, near: 0.1, far: 120, position: [0, 2.4, 7] }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          outputColorSpace: THREE.SRGBColorSpace,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.95
        }}
        shadows={false}
      >
        <SceneRoot />
      </Canvas>
    </div>
  );
}
