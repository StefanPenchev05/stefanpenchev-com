import * as THREE from "three";

export function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

export function smoothstep(edge0: number, edge1: number, value: number) {
  const x = clamp01((value - edge0) / (edge1 - edge0));
  return x * x * (3 - 2 * x);
}

export function lineGeometry(points: THREE.Vector3[]) {
  return new THREE.BufferGeometry().setFromPoints(points);
}

export function interpolatePath(points: THREE.Vector3[], progress: number) {
  const safeProgress = clamp01(progress);
  const segmentCount = points.length - 1;
  const scaled = safeProgress * segmentCount;
  const index = Math.min(segmentCount - 1, Math.floor(scaled));
  const local = scaled - index;
  return new THREE.Vector3().lerpVectors(points[index], points[index + 1], local);
}
