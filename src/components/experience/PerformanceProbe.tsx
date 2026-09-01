"use client";

import { useFrame, useThree } from "@react-three/fiber";

declare global {
  interface Window {
    __experienceStats?: {
      calls: number;
      geometries: number;
      lines: number;
      points: number;
      textures: number;
      triangles: number;
    };
  }
}

export function PerformanceProbe() {
  const { gl } = useThree();

  useFrame(() => {
    if (process.env.NODE_ENV !== "development") {
      return;
    }

    window.__experienceStats = {
      calls: gl.info.render.calls,
      geometries: gl.info.memory.geometries,
      lines: gl.info.render.lines,
      points: gl.info.render.points,
      textures: gl.info.memory.textures,
      triangles: gl.info.render.triangles
    };
  });

  return null;
}
