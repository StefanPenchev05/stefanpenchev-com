import { useEffect, useRef, useState, type RefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MathUtils } from "three";
import { ArchitectureModel } from "../ArchitectureModel/ArchitectureModel";
import { StaticArchitecture } from "./StaticArchitecture";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import type { SceneMotion } from "./types";
function CameraRig({
  motion,
  reduced,
  mobile,
}: {
  motion: RefObject<SceneMotion>;
  reduced: boolean;
  mobile: boolean;
}) {
  useFrame(({ camera }, delta) => {
    const p = reduced || mobile ? 0 : motion.current.progress;
    const x = reduced || mobile ? 0 : motion.current.pointerX * 0.35;
    const y = reduced || mobile ? 0 : motion.current.pointerY * 0.2;
    camera.position.x = MathUtils.damp(
      camera.position.x,
      4.3 - p * 0.7 + x,
      3,
      delta,
    );
    camera.position.y = MathUtils.damp(
      camera.position.y,
      4.1 + p * 0.3 - y,
      3,
      delta,
    );
    camera.position.z = MathUtils.damp(
      camera.position.z,
      7.5 + p * 0.25,
      3,
      delta,
    );
    camera.lookAt(0, -0.05, 0);
  });
  return null;
}
export default function Scene({ motion }: { motion: RefObject<SceneMotion> }) {
  const contextCleanup = useRef<(() => void) | null>(null);
  useEffect(
    () => () => {
      contextCleanup.current?.();
    },
    [],
  );
  const root = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [lost, setLost] = useState(false);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const mobile = useMediaQuery("(max-width: 899px)");
  useEffect(() => {
    let intersecting = true;
    const update = () => setVisible(intersecting && !document.hidden);
    const observer = new IntersectionObserver(
      ([entry]) => {
        intersecting = entry.isIntersecting;
        update();
      },
      { rootMargin: "100px" },
    );
    if (root.current) observer.observe(root.current);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, [reduced, lost]);
  // Reduced-motion users get the static SVG, with identical architecture information.
  if (reduced || lost) return <StaticArchitecture />;
  return (
    <div ref={root} className="webgl-scene" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        frameloop={visible ? "always" : "never"}
        camera={{
          position: [4.3, 4.1, 7.5],
          fov: mobile ? 39 : 36,
          near: 0.1,
          far: 35,
        }}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        fallback={<StaticArchitecture />}
        onCreated={({ gl }) => {
          contextCleanup.current?.();
          const onLost = () => setLost(true);
          gl.domElement.addEventListener("webglcontextlost", onLost, {
            once: true,
          });
          contextCleanup.current = () =>
            gl.domElement.removeEventListener("webglcontextlost", onLost);
        }}
      >
        <ambientLight intensity={1.15} />
        <directionalLight
          position={[2, 6, 4]}
          intensity={2.6}
          color="#fff2dd"
        />
        <directionalLight
          position={[-4, 2, -3]}
          intensity={1.2}
          color="#b9c2c6"
        />
        <CameraRig motion={motion} reduced={reduced} mobile={mobile} />
        <ArchitectureModel motion={motion} reduced={reduced} mobile={mobile} />
      </Canvas>
    </div>
  );
}
