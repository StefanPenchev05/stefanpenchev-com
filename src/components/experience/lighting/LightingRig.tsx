export function LightingRig() {
  return (
    <>
      <hemisphereLight args={["#8fb8c2", "#101316", 0.9]} />
      <directionalLight color="#dce8ef" intensity={2.2} position={[4, 8, 4]} />
      <directionalLight color="#5cc8d7" intensity={0.7} position={[-6, 4, -18]} />
    </>
  );
}
