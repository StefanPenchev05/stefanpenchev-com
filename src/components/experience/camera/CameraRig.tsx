"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo } from "react";
import * as THREE from "three";
import { sampleCameraFrame } from "@/components/experience/camera/cameraPath";
import { useExperienceStore } from "@/lib/scroll/useExperienceStore";

export function CameraRig() {
  const { camera } = useThree();
  const progress = useExperienceStore((state) => state.progress);
  const activeChapter = useExperienceStore((state) => state.activeChapter);
  const reducedMotion = useExperienceStore((state) => state.reducedMotion);
  const lookTarget = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, delta) => {
    const targetProgress = reducedMotion ? activeChapter / 5 : progress;
    const frame = sampleCameraFrame(targetProgress);
    const easing = reducedMotion ? 1 : 1 - Math.exp(-delta * 4.5);

    camera.position.lerp(frame.position, easing);
    lookTarget.lerp(frame.target, easing);
    camera.lookAt(lookTarget);
  });

  return null;
}
