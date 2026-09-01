"use client";

import { useEffect, useMemo } from "react";
import * as THREE from "three";

type LinePathProps = {
  color?: string;
  opacity?: number;
  points: [number, number, number][];
};

export function LinePath({ color = "#5cc8d7", opacity = 0.65, points }: LinePathProps) {
  const line = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints(
      points.map((point) => new THREE.Vector3(...point))
    );
    const material = new THREE.LineBasicMaterial({
      color,
      opacity,
      transparent: opacity < 1
    });

    return new THREE.Line(geometry, material);
  }, [color, opacity, points]);

  useEffect(() => {
    return () => {
      line.geometry.dispose();
      if (Array.isArray(line.material)) {
        line.material.forEach((material) => material.dispose());
      } else {
        line.material.dispose();
      }
    };
  }, [line]);

  return <primitive object={line} />;
}
