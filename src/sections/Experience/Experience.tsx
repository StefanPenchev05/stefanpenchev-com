import { useRef } from "react";
import { experience } from "../../data/experience";
import { ExperienceEntry } from "./ExperienceEntry";
import { useExperienceTimeline } from "./useExperienceTimeline";
import styles from "./Experience.module.css";
export function Experience() {
  const timeline = useRef<HTMLDivElement>(null);
  useExperienceTimeline(timeline);
  return (
    <section
      id="experience"
      className={`page-width ${styles.section}`}
      aria-labelledby="experience-title"
    >
      <p className="eyebrow">
        <span className="accent">05 /</span> JOURNEY / WORK / EDUCATION
      </p>
      <header className={styles.heading}>
        <h2 id="experience-title">
          EXPERIENCE<span className="accent">.</span>
        </h2>
        <p>
          The systems I build are shaped by the things I study, experiment with
          and work on.
        </p>
      </header>
      <div ref={timeline} className={styles.timeline}>
        <div className={styles.track} aria-hidden="true">
          <span data-timeline-progress />
        </div>
        {experience.map((entry) => (
          <ExperienceEntry key={entry.id} entry={entry} />
        ))}
      </div>
    </section>
  );
}
