import type { ExperienceEntry as Entry } from "../../data/experience";
import styles from "./Experience.module.css";
export function ExperienceEntry({ entry }: { entry: Entry }) {
  return (
    <article className={styles.entry} data-experience-entry>
      <div className={styles.period}>{entry.period}</div>
      <div className={styles.content}>
        <p className={styles.classification}>
          {entry.type.toUpperCase()}
          {entry.placeholder && " / DEVELOPMENT PLACEHOLDER"}
        </p>
        <h3>{entry.title}</h3>
        {(entry.organization || entry.location) && (
          <p>
            {[entry.organization, entry.location].filter(Boolean).join(" / ")}
          </p>
        )}
        <p>{entry.summary}</p>
        {Boolean(
          entry.details?.length || entry.technologies?.length || entry.link,
        ) && (
          <details>
            <summary>
              {entry.placeholder ? "Entry notes" : "Explore details"}
            </summary>
            {entry.details && (
              <ul>
                {entry.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            )}
            {entry.technologies && (
              <p className={styles.classification}>
                {entry.technologies.join(" / ")}
              </p>
            )}
            {entry.link && <a href={entry.link}>View related work ↗</a>}
          </details>
        )}
      </div>
    </article>
  );
}
