import { useEffect, useRef } from "react";
import { ScrollTrigger } from "../../animations/scroll/gsap";
import styles from "./Navigation.module.css";
export function Navigation() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      start: 48,
      onUpdate: (self) =>
        ref.current?.classList.toggle(styles.compact, self.scroll() > 48),
    });
    return () => trigger.kill();
  }, []);
  return (
    <header className={styles.header} ref={ref}>
      <a
        className={styles.name}
        href="#index"
        aria-label="Stefan Penchev — index"
      >
        STEFAN PENCHEV
        <span className={styles.dot} />
      </a>
      <nav aria-label="Main navigation">
        <a href="#index">
          INDEX<span>01</span>
        </a>
        <a href="#work">
          WORK<span>02</span>
        </a>
        {/* TODO: activate anchors when About and Contact ship. Do not create dead links. */}
        <span
          className={styles.pending}
          aria-disabled="true"
          title="About — planned for the next phase"
        >
          ABOUT
        </span>
        <span
          className={styles.pending}
          aria-disabled="true"
          title="Contact — planned for the next phase"
        >
          CONTACT
        </span>
      </nav>
    </header>
  );
}
