import { useEffect, useMemo, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { Edges } from "@react-three/drei";
import {
  BufferAttribute,
  CylinderGeometry,
  Group,
  LineBasicMaterial,
  MathUtils,
  MeshStandardMaterial,
} from "three";
import type { SceneMotion } from "../Scene/types";
const initial: [number, number, number][] = [
  [-1.7, 1.05, 0.2],
  [0.1, 0.3, 0],
  [1.7, 0.05, -0.5],
  [-0.7, -1.1, 0.5],
  [1.55, -1.2, 0.6],
];
const expanded: [number, number, number][] = [
  [-2.05, 1.4, 0.25],
  [-0.1, 0.55, 0],
  [1.8, 0.15, -0.15],
  [-1.2, -1.2, 0.6],
  [1.35, -1.35, 0.75],
];
const edges = [
  [0, 1],
  [1, 2],
  [2, 3],
  [2, 4],
];
const names = ["CLIENT", "API", "SERVICE", "DATABASE", "CACHE"];
function Label({ name }: { name: string }) {
  const canvas = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 80;
    const ctx = canvas.getContext("2d")!;
    ctx.font = "26px monospace";
    ctx.textAlign = "center";
    ctx.fillStyle = "#b9b8af";
    ctx.fillText(name, 256, 48);
    return canvas;
  }, [name]);
  return (
    <sprite position={[0, 0.55, 0]} scale={[1.35, 0.21, 1]}>
      <spriteMaterial transparent depthTest={false}>
        <canvasTexture attach="map" args={[canvas]} />
      </spriteMaterial>
    </sprite>
  );
}
export function ArchitectureModel({
  motion,
  reduced,
  mobile,
}: {
  motion: RefObject<SceneMotion>;
  reduced: boolean;
  mobile: boolean;
}) {
  const groups = useRef<(Group | null)[]>([]);
  const api = useRef<MeshStandardMaterial>(null);
  const service = useRef<MeshStandardMaterial>(null);
  const database = useMemo(
    () => ({
      geometry: new CylinderGeometry(0.51, 0.51, 0.12, mobile ? 12 : 24),
      material: new MeshStandardMaterial({
        color: "#636664",
        metalness: 0.45,
        roughness: 0.55,
      }),
    }),
    [mobile],
  );
  useEffect(
    () => () => {
      database.geometry.dispose();
      database.material.dispose();
    },
    [database],
  );
  const connections = useRef<BufferAttribute>(null);
  const connectionMaterial = useRef<LineBasicMaterial>(null);
  const positions = useMemo(() => new Float32Array(edges.length * 18), []);
  useFrame(({ clock }, delta) => {
    const p = reduced || mobile ? 0.72 : motion.current.progress;
    groups.current.forEach((group, index) => {
      if (!group) return;
      const reveal = MathUtils.smoothstep(
        p,
        index > 2 ? 0.25 : 0.06,
        index > 2 ? 0.75 : 0.5,
      );
      const float = reduced
        ? 0
        : Math.sin(clock.elapsedTime * 0.45 + index * 1.4) * 0.035;
      for (let axis = 0; axis < 3; axis++)
        group.position.setComponent(
          axis,
          MathUtils.lerp(initial[index][axis], expanded[index][axis], p) +
            (axis === 1 ? float : 0),
        );
      group.scale.setScalar(
        index === 2 ? 0.72 + 0.28 * reveal : index > 2 ? 0.8 + 0.2 * reveal : 1,
      );
    });
    if (service.current)
      service.current.opacity =
        0.18 + 0.82 * MathUtils.smoothstep(p, 0.12, 0.48);
    if (api.current)
      api.current.emissiveIntensity = MathUtils.damp(
        api.current.emissiveIntensity,
        0.04 + Math.sin(p * Math.PI) * 0.14,
        5,
        delta,
      );
    // Four orthogonal connections, one draw call; reuse the buffer every frame.
    edges.forEach(([from, to], i) => {
      const a = groups.current[from]?.position,
        b = groups.current[to]?.position;
      if (!a || !b) return;
      const base = i * 18;
      const y = (a.y + b.y) / 2;
      positions[base] = a.x;
      positions[base + 1] = a.y;
      positions[base + 2] = a.z;
      positions[base + 3] = a.x;
      positions[base + 4] = y;
      positions[base + 5] = a.z;
      positions[base + 6] = a.x;
      positions[base + 7] = y;
      positions[base + 8] = a.z;
      positions[base + 9] = b.x;
      positions[base + 10] = y;
      positions[base + 11] = b.z;
      positions[base + 12] = b.x;
      positions[base + 13] = y;
      positions[base + 14] = b.z;
      positions[base + 15] = b.x;
      positions[base + 16] = b.y;
      positions[base + 17] = b.z;
      const reveal =
        mobile || reduced
          ? 1
          : MathUtils.clamp((p - i * 0.16 + 0.05) / 0.32, 0, 1);
      for (let segment = 0; segment < 3; segment++) {
        const fraction = MathUtils.clamp(reveal * 3 - segment, 0, 1);
        const start = base + segment * 6;
        for (let axis = 0; axis < 3; axis++)
          positions[start + 3 + axis] = MathUtils.lerp(
            positions[start + axis],
            positions[start + 3 + axis],
            fraction,
          );
      }
    });
    if (connections.current) connections.current.needsUpdate = true;
    if (connectionMaterial.current)
      connectionMaterial.current.opacity = 0.2 + p * 0.45;
  });
  return (
    <group rotation={[0, -0.1, 0]}>
      <lineSegments frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute
            ref={connections}
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          ref={connectionMaterial}
          color="#b59b79"
          transparent
          opacity={0.3}
        />
      </lineSegments>
      {names.map((name, index) => (
        <group
          key={name}
          ref={(group) => {
            groups.current[index] = group;
          }}
          position={initial[index]}
        >
          {index === 3 ? (
            <group>
              {[0, 0.15, 0.3].map((y) => (
                <mesh
                  key={y}
                  position={[0, y - 0.15, 0]}
                  geometry={database.geometry}
                  material={database.material}
                  dispose={null}
                >
                  {!mobile && <Edges color="#8b8f89" threshold={25} />}
                </mesh>
              ))}
            </group>
          ) : (
            <mesh>
              <boxGeometry
                args={
                  index === 0
                    ? [1.15, 0.13, 0.9]
                    : index === 1
                      ? [0.88, 0.34, 0.88]
                      : index === 2
                        ? [1, 0.38, 0.85]
                        : [0.78, 0.23, 0.78]
                }
              />
              {index === 1 ? (
                <meshStandardMaterial
                  ref={api}
                  color="#b49b77"
                  roughness={0.42}
                  metalness={0.5}
                  emissive="#b08b5d"
                  emissiveIntensity={0.04}
                />
              ) : (
                <meshStandardMaterial
                  ref={index === 2 ? service : undefined}
                  transparent={index === 2}
                  color={index === 0 ? "#727570" : "#505551"}
                  metalness={0.4}
                  roughness={0.48}
                />
              )}
              <Edges
                color={index === 1 ? "#dfc19b" : "#93968e"}
                threshold={20}
              />
            </mesh>
          )}
          {index !== 3 && (
            <mesh
              position={[
                0,
                index === 0
                  ? 0.072
                  : index === 1
                    ? 0.175
                    : index === 2
                      ? 0.195
                      : 0.12,
                0,
              ]}
              rotation={[-Math.PI / 2, 0, 0]}
            >
              <planeGeometry args={[index === 0 ? 0.85 : 0.58, 0.015]} />
              <meshBasicMaterial color={index === 1 ? "#f0d1a3" : "#aaada4"} />
            </mesh>
          )}
          <Label name={name} />
        </group>
      ))}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.9, 0]}>
        <ringGeometry args={[2.8, 2.806, 64]} />
        <meshBasicMaterial color="#41423b" transparent opacity={0.6} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.9, 0]}>
        <ringGeometry args={[2.3, 2.305, 64]} />
        <meshBasicMaterial color="#33352f" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}
