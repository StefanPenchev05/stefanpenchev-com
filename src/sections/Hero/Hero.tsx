import { profile } from "../../data/profile";
import { Arrow } from "../../components/ui/Arrow";
import styles from "./Hero.module.css";
export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={`eyebrow ${styles.eyebrow}`}>
        <span className="accent">INDEPENDENT PORTFOLIO</span>
        <span>2026 —</span>
      </div>
      <div className={styles.identity}>{profile.name.toUpperCase()}</div>
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
      {(profile.location || profile.availability) && (
        <div className={styles.metadata}>
          {profile.location && (
            <span>BASED IN {profile.location.toUpperCase()}</span>
          )}
          {profile.availability && (
            <span className={styles.status}>
              <i />
              {profile.availability}
            </span>
          )}
        </div>
      )}
      <a className={styles.scroll} href="#intro">
        <span>SCROLL TO GO DEEPER</span>
        <span>↓</span>
      </a>
    </section>
  );
}
