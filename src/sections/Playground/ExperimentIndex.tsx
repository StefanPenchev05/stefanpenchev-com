import { experiments } from "../../data/experiments";
import styles from "./Playground.module.css";
export function ExperimentIndex() {
  return (
    <div className={styles.index}>
      <p className="eyebrow muted">RESEARCH NOTEBOOK / CONCEPT PLACEHOLDERS</p>
      {experiments
        .filter((item) => item.concept)
        .map((item) => (
          <details key={item.id} className={styles.concept}>
            <summary>
              <span>{item.number}</span>
              <h3>{item.title}</h3>
              <span className={styles.category}>
                {item.category.toUpperCase()}
              </span>
              <span aria-hidden="true">+</span>
            </summary>
            <div className={styles.conceptBody}>
              <p className="eyebrow accent">
                {item.status.toUpperCase()} / CONCEPT — NOT IMPLEMENTED
              </p>
              <p>{item.description}</p>
              <p className="eyebrow muted">
                POTENTIAL TOOLS / {item.technologies.join(" / ")}
              </p>
            </div>
          </details>
        ))}
    </div>
  );
}
