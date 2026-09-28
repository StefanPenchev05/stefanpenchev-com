import { experiments } from "../../data/experiments";
import { ExperimentIndex } from "./ExperimentIndex";
import { LoadBalancerDemo } from "./LoadBalancer/LoadBalancerDemo";
import styles from "./Playground.module.css";
export function Playground() {
  const experiment = experiments.find((item) => item.id === "load-balancer")!;
  return (
    <section
      id="lab"
      className={`page-width ${styles.section}`}
      aria-labelledby="lab-title"
    >
      <p className="eyebrow">
        <span className="accent">06 /</span> LAB / EXPERIMENTS
      </p>
      <header className={styles.heading}>
        <h2 id="lab-title">
          LAB<span className="accent">.</span>
        </h2>
        <p>I build things to understand how they work.</p>
      </header>
      <div className={styles.demoHeading}>
        <div>
          <p className="eyebrow accent">
            {experiment.number} / {experiment.status.toUpperCase()} /
            INTERACTIVE
          </p>
          <h3>{experiment.title}</h3>
          <p>{experiment.description}</p>
        </div>
        <span className="eyebrow muted">
          {experiment.technologies.join(" / ")}
          <br />
          CLIENT-SIDE SIMULATION
        </span>
      </div>
      <LoadBalancerDemo />
      <ExperimentIndex />
    </section>
  );
}
