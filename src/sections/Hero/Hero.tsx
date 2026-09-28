import { Arrow } from "../../components/ui/Arrow";
import styles from "./Hero.module.css";
export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={`eyebrow ${styles.eyebrow}`}>
        <span className="accent">INDEPENDENT PORTFOLIO</span>
        <span>2026 —</span>
      </div>
      <div className={styles.identity}>STEFAN PENCHEV</div>
      <h1 id="hero-title">
        Full-stack
        <br />
        <span>developer.</span>
      </h1>
      <p className={styles.disciplines}>
        Backend <i /> Systems <i /> Web
      </p>
      <p className={styles.statement}>
        I build web applications
        <br />
        from interface to infrastructure.
      </p>
      <a href="#work" className={styles.workLink}>
        EXPLORE SELECTED WORK
        <Arrow diagonal />
      </a>
      <div className={styles.metadata}>
        <span>
          BASED IN LUXEMBOURG
          <br />
          <span className="muted">BACKEND / SYSTEMS / WEB</span>
        </span>
        <span className={styles.status}>
          <i />
          AVAILABLE FOR
          <br />
          INTERNSHIPS / PROJECTS
        </span>
      </div>
      <a className={styles.scroll} href="#intro">
        <span>SCROLL TO GO DEEPER</span>
        <span>↓</span>
      </a>
    </section>
  );
}
