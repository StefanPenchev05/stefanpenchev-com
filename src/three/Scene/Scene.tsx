import {
  Component,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MathUtils } from "three";
import { ArchitectureModel } from "../ArchitectureModel/ArchitectureModel";
import { StaticArchitecture } from "./StaticArchitecture";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import type { SceneMotion } from "./types";
class WebGLBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <StaticArchitecture /> : this.props.children;
  }
}
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
      4.6 - p * 1.2 + x,
      3,
      delta,
    );
    camera.position.y = MathUtils.damp(
      camera.position.y,
      4.4 + p * 0.4 - y,
      3,
      delta,
    );
    camera.position.z = MathUtils.damp(
      camera.position.z,
      7.7 + p * 0.5,
      3,
      delta,
    );
    camera.lookAt(0, -0.1, 0);
  });
  return null;
}
export default function Scene({ motion }: { motion: RefObject<SceneMotion> }) {
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
      <WebGLBoundary>
        <Canvas
          dpr={[1, 1.5]}
          frameloop={visible ? "always" : "never"}
          camera={{ position: [4.6, 4.4, 7.7], fov: 39, near: 0.1, far: 35 }}
          gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
          fallback={<StaticArchitecture />}
          onCreated={({ gl }) => {
            gl.domElement.addEventListener(
              "webglcontextlost",
              () => setLost(true),
              { once: true },
            );
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
          <ArchitectureModel
            motion={motion}
            reduced={reduced}
            mobile={mobile}
          />
        </Canvas>
      </WebGLBoundary>
    </div>
  );
}
