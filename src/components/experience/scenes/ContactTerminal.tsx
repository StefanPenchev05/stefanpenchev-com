import { Block } from "@/components/experience/objects/Block";
import { LinePath } from "@/components/experience/objects/LinePath";

export function ContactTerminal() {
  return (
    <group>
      <LinePath
        color="#d6a75c"
        opacity={0.42}
        points={[
          [-1.8, 3.1, -43.2],
          [-1.2, 2.5, -48.5],
          [-0.4, 1.8, -53.5],
          [0, 1.35, -56.8]
        ]}
      />
      <Block color="#11161b" position={[0, 1.35, -58]} scale={[3.4, 1.6, 0.08]} />
      <Block color="#1d252d" position={[0, 0.45, -57.8]} scale={[4.4, 0.12, 2]} />
      <Block color="#5cc8d7" opacity={0.34} position={[-1.05, 1.7, -57.9]} scale={[0.95, 0.08, 0.04]} />
      <Block color="#77c98d" opacity={0.34} position={[-0.45, 1.35, -57.9]} scale={[1.35, 0.08, 0.04]} />
      <Block color="#d6a75c" opacity={0.34} position={[0.15, 1.0, -57.9]} scale={[1.1, 0.08, 0.04]} />
    </group>
  );
}
