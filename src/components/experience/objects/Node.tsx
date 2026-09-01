type NodeProps = {
  color?: string;
  position: [number, number, number];
  scale?: number;
};

export function Node({ color = "#5cc8d7", position, scale = 0.16 }: NodeProps) {
  return (
    <mesh position={position} scale={scale}>
      <sphereGeometry args={[1, 16, 8]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}
