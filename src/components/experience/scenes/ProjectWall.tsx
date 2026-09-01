import { Block } from "@/components/experience/objects/Block";
import { LinePath } from "@/components/experience/objects/LinePath";
import { Node } from "@/components/experience/objects/Node";

const projectNodes: [number, number, number][] = [
  [-1.7, 2.5, -8.9],
  [-0.4, 1.8, -8.9],
  [0.55, 2.35, -8.9],
  [1.65, 1.85, -8.9],
  [0.1, 3.05, -8.9]
];

export function ProjectWall() {
  return (
    <group>
      <Block color="#13191f" position={[0, 2.1, -9.15]} scale={[5.8, 3.1, 0.08]} />
      <Block color="#1d252d" position={[-1.85, 2.35, -9]} scale={[1.2, 0.72, 0.06]} />
      <Block color="#1d252d" position={[0, 2.55, -9]} scale={[1.45, 0.86, 0.06]} />
      <Block color="#1d252d" position={[1.7, 1.75, -9]} scale={[1.3, 0.76, 0.06]} />
      <Block color="#182129" position={[0, 0.62, -8.75]} scale={[6.8, 0.08, 2]} />
      <LinePath color="#77c98d" opacity={0.7} points={projectNodes} />
      {projectNodes.map((point, index) => (
        <Node color={index === 1 ? "#d6a75c" : "#5cc8d7"} key={index} position={point} scale={0.09} />
      ))}
      <LinePath
        color="#77c98d"
        opacity={0.48}
        points={[
          [1.65, 1.85, -8.9],
          [2.25, 1.9, -11.2],
          [1.2, 1.8, -14.7],
          [0.6, 1.85, -18.6]
        ]}
      />
    </group>
  );
}
