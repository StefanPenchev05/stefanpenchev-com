import { about } from "../../data/about";
import styles from "./About.module.css";
export function About() {
  return (
    <section
      id="about"
      className={`page-width ${styles.section}`}
      aria-labelledby="about-title"
    >
      <p className="eyebrow">
        <span className="accent">07 /</span> ABOUT
      </p>
      <div className={styles.layout}>
        <div>
          <h2 id="about-title">{about.statement}</h2>
          {about.portrait && (
            <img
              src={about.portrait.src}
              alt={about.portrait.alt}
              width={about.portrait.width || 800}
              height={about.portrait.height || 1000}
              loading="lazy"
            />
          )}
        </div>
        <div>
          {about.entries.map((entry) => (
            <article key={entry.number}>
              <h3 className="eyebrow">
                <span className="accent">{entry.number} /</span> {entry.title}
              </h3>
              <p>{entry.text}</p>
              {entry.placeholder && (
                <span className={styles.note}>
                  EDITABLE COPY / PERSONAL DETAILS TO VERIFY
                </span>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
