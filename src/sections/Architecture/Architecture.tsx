import { useRef } from "react";
import { requestSteps } from "../../data/architecture";
import { useArchitectureScroll } from "../../animations/scroll/useArchitectureScroll";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import styles from "./Architecture.module.css";
export function Architecture() {
  const root = useRef<HTMLElement>(null);
  useArchitectureScroll(root);
  return (
    <section
      id="architecture"
      ref={root}
      className={`page-width ${styles.section}`}
      aria-labelledby="architecture-title"
    >
      <div className={styles.sectionMeta}>
        <span className="eyebrow">
          <span className="accent">03 /</span> BEYOND THE INTERFACE
        </span>
        <span className="eyebrow muted">ANATOMY OF A REQUEST</span>
      </div>
      <div className={styles.heading}>
        <h2 id="architecture-title">
          A UI is only the beginning
          <br />
          of a <span>request.</span>
        </h2>
        <p>
          I like understanding what happens after an interaction leaves the
          browser — authentication, application logic, caching, data access and
          infrastructure.
        </p>
      </div>
      <p className={styles.conceptNote}>
        A conceptual system, not the architecture of a specific project.
      </p>
      <div className={styles.layout}>
        <ArchitectureDiagram />
        <div className={styles.narrative} data-architecture-narrative>
          <p className={styles.readingGuide}>
            SCROLL THROUGH THE REQUEST
            <br />
            <span>Hover, focus or select a layer to inspect it.</span>
          </p>
          {requestSteps.map((step) => (
            <article
              className={styles.step}
              key={step.number}
              data-architecture-step
            >
              <div className="eyebrow">
                <span>STEP {step.number}</span>
                {step.label}
              </div>
              <h3>{step.statement}</h3>
              <p>{step.detail}</p>
            </article>
          ))}
        </div>
      </div>
      <a className={styles.nextLink} href="#skills">
        THE TOOLS BEHIND THE SYSTEM <span>↓</span>
      </a>
    </section>
  );
}
