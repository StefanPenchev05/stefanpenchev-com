import { Block } from "@/components/experience/objects/Block";
import { LinePath } from "@/components/experience/objects/LinePath";
import { Node } from "@/components/experience/objects/Node";

const monitorDiagram: [number, number, number][] = [
  [-0.9, 1.85, -2.08],
  [-0.25, 2.2, -2.08],
  [0.55, 1.9, -2.08],
  [0.95, 2.25, -2.08]
];

export function OperationsWorkstation() {
  return (
    <group>
      <Block color="#151b20" position={[0, 0.42, 0]} scale={[5.6, 0.18, 2.4]} />
      <Block color="#202932" position={[0, 1.65, -2.12]} scale={[2.7, 1.45, 0.08]} />
      <Block color="#11161b" position={[0, 0.95, -2.05]} scale={[0.25, 0.9, 0.12]} />
      <Block color="#121820" position={[0, 0.54, -2.05]} scale={[1.4, 0.09, 0.45]} />
      <Block color="#1f2930" position={[-1.6, 0.62, 0.22]} scale={[1.3, 0.06, 0.52]} />
      <Block color="#1a2229" position={[1.25, 0.63, 0.05]} scale={[1.1, 0.05, 0.68]} />
      <LinePath color="#5cc8d7" opacity={0.86} points={monitorDiagram} />
      {monitorDiagram.map((point, index) => (
        <Node color={index === 1 ? "#77c98d" : "#5cc8d7"} key={index} position={point} scale={0.055} />
      ))}
      <LinePath
        color="#5cc8d7"
        opacity={0.38}
        points={[
          [0.95, 2.25, -2.08],
          [1.4, 2.3, -4.2],
          [0.9, 2.25, -6.6],
          [0.35, 2.1, -8.7]
        ]}
      />
    </group>
  );
}
