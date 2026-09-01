type BlockProps = {
  color?: string;
  opacity?: number;
  position: [number, number, number];
  scale: [number, number, number];
};

export function Block({
  color = "#2a343d",
  opacity = 1,
  position,
  scale
}: BlockProps) {
  return (
    <mesh position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial
        color={color}
        opacity={opacity}
        transparent={opacity < 1}
        wireframe={opacity < 0.22}
      />
    </mesh>
  );
}
