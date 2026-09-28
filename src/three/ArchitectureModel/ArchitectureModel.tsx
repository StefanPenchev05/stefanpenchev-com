import { useEffect, useMemo, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import { Edges } from "@react-three/drei";
import {
  BufferAttribute,
  CylinderGeometry,
  Group,
  MathUtils,
  MeshStandardMaterial,
  SpriteMaterial,
} from "three";
import type { SceneMotion } from "../Scene/types";
import { connectionEmphasis, nodeEmphasis } from "./storyEmphasis";
const initial: [number, number, number][] = [
  [-1.15, 1.45, 0],
  [-0.3, 0.55, 0],
  [0.55, -0.25, 0],
  [-0.8, -1.35, 0.45],
  [1.65, -1.25, 0.2],
];
const expanded: [number, number, number][] = [
  [-1.65, 1.7, 0.1],
  [-0.45, 0.6, 0],
  [0.75, -0.2, 0],
  [-0.9, -1.65, 0.25],
  [1.65, -1.45, 0.45],
];
const edges = [
  [0, 1],
  [1, 2],
  [2, 3],
  [2, 4],
];
const names = ["CLIENT", "API", "SERVICE", "DATABASE", "CACHE"];
type ModelProps = {
  motion: RefObject<SceneMotion>;
  reduced: boolean;
  mobile: boolean;
};
function Label({
  name,
  index,
  motion,
  reduced,
  mobile,
}: ModelProps & { name: string; index: number }) {
  const material = useRef<SpriteMaterial>(null);
  const canvas = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 96;
    const ctx = canvas.getContext("2d")!;
    ctx.font = "40px monospace";
    ctx.textAlign = "center";
    ctx.fillStyle = "#e8e6df";
    ctx.fillText(name, 256, 58);
    return canvas;
  }, [name]);
  useFrame((_, delta) => {
    if (material.current)
      material.current.opacity = MathUtils.damp(
        material.current.opacity,
        reduced || mobile
          ? 1
          : 0.65 + 0.35 * nodeEmphasis(index, motion.current.progress),
        6,
        delta,
      );
  });
  return (
    <sprite
      position={[index === 3 ? -0.1 : 0, 0.58, 0.02]}
      scale={[1.65, 0.31, 1]}
    >
      <spriteMaterial ref={material} transparent depthTest={false}>
        <canvasTexture attach="map" args={[canvas]} />
      </spriteMaterial>
    </sprite>
  );
}
export function ArchitectureModel({ motion, reduced, mobile }: ModelProps) {
  const groups = useRef<(Group | null)[]>([]);
  const materials = useRef<(MeshStandardMaterial | null)[]>([]);
  const database = useMemo(
    () => ({
      geometry: new CylinderGeometry(0.51, 0.51, 0.12, mobile ? 12 : 24),
      material: new MeshStandardMaterial({
        color: "#636664",
        metalness: 0.45,
        roughness: 0.55,
        emissive: "#c7a77d",
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
  const colorAttribute = useRef<BufferAttribute>(null);
  const positions = useMemo(() => new Float32Array(edges.length * 18), []);
  const colors = useMemo(
    () => new Float32Array(edges.length * 18).fill(0.2),
    [],
  );
  useFrame(({ clock }, delta) => {
    const p = reduced || mobile ? 0.72 : motion.current.progress;
    groups.current.forEach((group, index) => {
      if (!group) return;
      const float = reduced
        ? 0
        : Math.sin(clock.elapsedTime * 0.45 + index * 1.4) * 0.027;
      for (let axis = 0; axis < 3; axis++)
        group.position.setComponent(
          axis,
          MathUtils.lerp(initial[index][axis], expanded[index][axis], p) +
            (axis === 1 ? float : 0),
        );
      const emphasis = reduced || mobile ? 0.7 : nodeEmphasis(index, p);
      const mat = index === 3 ? database.material : materials.current[index];
      if (mat)
        mat.emissiveIntensity = MathUtils.damp(
          mat.emissiveIntensity,
          0.025 + emphasis * 0.17,
          6,
          delta,
        );
    });
    edges.forEach(([from, to], i) => {
      const a = groups.current[from]?.position,
        b = groups.current[to]?.position;
      if (!a || !b) return;
      const base = i * 18,
        y = (a.y + b.y) / 2;
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
      const intensity = reduced || mobile ? 0.48 : connectionEmphasis(i, p);
      for (let vertex = 0; vertex < 6; vertex++)
        for (let channel = 0; channel < 3; channel++) {
          const slot = base + vertex * 3 + channel;
          // Warm neutral at rest, muted amber for the current narrative connection.
          const target =
            intensity * (channel === 0 ? 0.68 : channel === 1 ? 0.53 : 0.34);
          colors[slot] = MathUtils.damp(colors[slot], target, 6, delta);
        }
    });
    if (connections.current) connections.current.needsUpdate = true;
    if (colorAttribute.current) colorAttribute.current.needsUpdate = true;
  });
  return (
    <group rotation={[0, -0.06, 0]} scale={mobile ? 1 : 1.12}>
      <lineSegments frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute
            ref={connections}
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            ref={colorAttribute}
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.8} />
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
              <meshStandardMaterial
                ref={(material) => {
                  materials.current[index] = material;
                }}
                color={
                  index === 1 ? "#b49b77" : index === 0 ? "#727570" : "#505551"
                }
                roughness={0.48}
                metalness={0.4}
                emissive="#c7a77d"
                emissiveIntensity={0.04}
              />
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
          <Label
            name={name}
            index={index}
            motion={motion}
            reduced={reduced}
            mobile={mobile}
          />
        </group>
      ))}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.1, 0]}>
        <ringGeometry args={[2.5, 2.505, 64]} />
        <meshBasicMaterial color="#41423b" transparent opacity={0.45} />
      </mesh>
    </group>
  );
}
