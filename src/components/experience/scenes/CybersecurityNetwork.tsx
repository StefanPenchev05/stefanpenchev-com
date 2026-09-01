import { Block } from "@/components/experience/objects/Block";
import { LinePath } from "@/components/experience/objects/LinePath";
import { Node } from "@/components/experience/objects/Node";

const networkNodes: [number, number, number][] = [
  [-2.1, 1.6, -31.2],
  [-0.8, 2.35, -32.1],
  [0.8, 1.5, -32.6],
  [2.1, 2.25, -33.4],
  [-1.5, 0.9, -34.4],
  [1.35, 0.95, -34.8]
];

export function CybersecurityNetwork() {
  return (
    <group>
      <Block color="#162027" opacity={0.14} position={[-1.25, 1.55, -32.2]} scale={[2.8, 2.1, 2.2]} />
      <Block color="#241b1d" opacity={0.18} position={[1.45, 1.65, -33.8]} scale={[2.8, 2.2, 2.5]} />
      <LinePath color="#d96c6c" opacity={0.5} points={[[-2.7, 0.55, -30.7], [-2.7, 3.05, -30.7], [2.75, 3.05, -35.2], [2.75, 0.55, -35.2], [-2.7, 0.55, -30.7]]} />
      <LinePath color="#77c98d" opacity={0.74} points={[networkNodes[0], networkNodes[1], networkNodes[3], networkNodes[5], networkNodes[4], networkNodes[2], networkNodes[0]]} />
      {networkNodes.map((point, index) => (
        <Node color={index === 3 ? "#d96c6c" : "#77c98d"} key={index} position={point} scale={0.12} />
      ))}
      <LinePath
        color="#5cc8d7"
        opacity={0.38}
        points={[
          [1.35, 0.95, -34.8],
          [1.2, 1.5, -37.8],
          [-0.7, 2.4, -40.5],
          [-1.8, 3.1, -43.2]
        ]}
      />
    </group>
  );
}
