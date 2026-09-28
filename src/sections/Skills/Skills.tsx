import { useState } from "react";
import { skills } from "../../data/skills";
import styles from "./Skills.module.css";
export function Skills() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <section
      id="skills"
      className={`page-width ${styles.section}`}
      aria-labelledby="skills-title"
    >
      <div className={styles.meta}>
        <span className="eyebrow">
          <span className="accent">04 /</span> TECHNOLOGIES / INTERESTS /
          SYSTEMS
        </span>
        <span className="eyebrow muted">AN INDEX, NOT A SCORECARD</span>
      </div>
      <div className={styles.heading}>
        <h2 id="skills-title">
          Engineering index<span className="accent">.</span>
        </h2>
        <p>
          Tools change.
          <br />
          The responsibilities remain.
        </p>
      </div>
      <div
        className={styles.index}
        data-has-active={active !== null}
        onPointerLeave={(event) => {
          if (!event.currentTarget.contains(document.activeElement))
            setActive(null);
        }}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget))
            setActive(null);
        }}
      >
        {skills.map((group) => (
          <article
            key={group.id}
            className={styles.group}
            data-active={active === group.id}
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse") setActive(group.id);
            }}
          >
            <span className={styles.number}>{group.number}</span>
            <h3>
              <button
                type="button"
                aria-expanded={active === group.id}
                aria-controls={`skill-description-${group.id}`}
                onFocus={(event) => {
                  if (event.currentTarget.matches(":focus-visible"))
                    setActive(group.id);
                }}
                onClick={() =>
                  setActive((current) =>
                    current === group.id ? null : group.id,
                  )
                }
              >
                {group.title}
                <span aria-hidden="true">
                  {active === group.id ? "−" : "+"}
                </span>
              </button>
            </h3>
            <div className={styles.content}>
              <ul aria-label={`${group.title} technologies`}>
                {group.technologies.map((technology) => (
                  <li key={technology}>{technology}</li>
                ))}
              </ul>
              <p
                id={`skill-description-${group.id}`}
                className={styles.description}
                hidden={active !== group.id}
              >
                {group.description}
              </p>
            </div>
          </article>
        ))}
      </div>
      <p className={styles.note}>
        An index of interests and technologies, not a claim of proficiency in
        every area.
      </p>
    </section>
  );
}
