export function LightingRig() {
  return (
    <>
      <ambientLight color="#9fb2bb" intensity={0.12} />
      <hemisphereLight args={["#9fb8c0", "#090b0e", 0.92]} />
      <directionalLight
        castShadow
        color="#e6edf3"
        intensity={2.6}
        position={[-3.5, 7.5, 4.5]}
        shadow-bias={-0.0005}
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight color="#5cc8d7" intensity={0.5} position={[4, 3, -3]} />
      <rectAreaLight
        color="#5cc8d7"
        height={1.4}
        intensity={1.1}
        position={[0.2, 1.75, -1.9]}
        rotation={[0, 0, 0]}
        width={2.8}
      />
    </>
  );
}
