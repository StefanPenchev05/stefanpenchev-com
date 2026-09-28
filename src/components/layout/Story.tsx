import { lazy, Suspense, useRef } from "react";
import { Hero } from "../../sections/Hero/Hero";
import { Intro } from "../../sections/Intro/Intro";
import { useStoryScroll } from "../../animations/scroll/useStoryScroll";
import type { SceneMotion } from "../../three/Scene/types";
import { StaticArchitecture } from "../../three/Scene/StaticArchitecture";
import styles from "./Story.module.css";
const Scene = lazy(() => import("../../three/Scene/Scene"));
export function Story() {
  const root = useRef<HTMLDivElement>(null);
  const motion = useRef<SceneMotion>({ progress: 0, pointerX: 0, pointerY: 0 });
  useStoryScroll(root, motion);
  return (
    <div id="index" ref={root} className={`page-width ${styles.story}`}>
      <div className={styles.copy}>
        <Hero />
        <Intro />
      </div>
      <div className={styles.visualColumn}>
        <div
          className={styles.visual}
          onPointerMove={(event) => {
            if (event.pointerType !== "mouse") return;
            const rect = event.currentTarget.getBoundingClientRect();
            motion.current.pointerX =
              (event.clientX - rect.left) / rect.width - 0.5;
            motion.current.pointerY =
              (event.clientY - rect.top) / rect.height - 0.5;
          }}
          onPointerLeave={() => {
            motion.current.pointerX = 0;
            motion.current.pointerY = 0;
          }}
        >
          <div className={`eyebrow ${styles.sceneHeading}`}>
            <span>SYSTEM STUDY — 001</span>
            <span className="accent">[ CONCEPT ]</span>
          </div>
          <div className={styles.scene}>
            <Suspense fallback={<StaticArchitecture />}>
              <Scene motion={motion} />
            </Suspense>
          </div>
          <div className={styles.sceneFooter}>
            <span className="eyebrow">A REQUEST. FIVE LAYERS.</span>
            <span>Interface → Infrastructure</span>
          </div>
          <div className={styles.legend}>
            <span>CLIENT</span>
            <i />
            <span>API</span>
            <i />
            <span>SERVICE</span>
            <i />
            <span>DATA</span>
          </div>
        </div>
      </div>
    </div>
  );
}
