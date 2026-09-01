import * as THREE from "three";

export type CameraFrame = {
  position: THREE.Vector3;
  target: THREE.Vector3;
};

export const cameraFrames: CameraFrame[] = [
  {
    position: new THREE.Vector3(0, 2.45, 7),
    target: new THREE.Vector3(0, 1.35, -1.5)
  },
  {
    position: new THREE.Vector3(2.8, 2.8, -3.8),
    target: new THREE.Vector3(0, 2.1, -9)
  },
  {
    position: new THREE.Vector3(-4.5, 3.1, -15),
    target: new THREE.Vector3(0, 1.8, -20)
  },
  {
    position: new THREE.Vector3(4.8, 3.4, -28),
    target: new THREE.Vector3(0, 1.4, -32)
  },
  {
    position: new THREE.Vector3(-3.8, 4.5, -42),
    target: new THREE.Vector3(0, 2.1, -45)
  },
  {
    position: new THREE.Vector3(0.6, 2.35, -54),
    target: new THREE.Vector3(0, 1.3, -58)
  }
];

export function sampleCameraFrame(progress: number) {
  const safe = Math.min(1, Math.max(0, progress));
  const segmentCount = cameraFrames.length - 1;
  const scaled = safe * segmentCount;
  const index = Math.min(segmentCount - 1, Math.floor(scaled));
  const local = scaled - index;
  const start = cameraFrames[index];
  const end = cameraFrames[index + 1];

  return {
    position: new THREE.Vector3().lerpVectors(start.position, end.position, local),
    target: new THREE.Vector3().lerpVectors(start.target, end.target, local)
  };
}
