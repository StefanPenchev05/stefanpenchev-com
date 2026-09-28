import { useState } from "react";
import { projects } from "../../data/projects";
import { Arrow } from "../../components/ui/Arrow";
import { Link } from "react-router-dom";
import { useProjectPreview } from "../../animations/transitions/useProjectPreview";

import styles from "./Projects.module.css";
export function Projects() {
  const [hovered, setHovered] = useState<string | null>(null);

  const preview = useProjectPreview();
  const active = projects.find((project) => project.slug === hovered);
  return (
    <section
      id="work"
      className={`page-width ${styles.section}`}
      aria-labelledby="work-title"
    >
      <div className={styles.sectionMeta}>
        <span className="eyebrow">
          <span className="accent">02 /</span> THE WORK
        </span>
        <span className="eyebrow muted">SELECTED PROJECT CONCEPTS · 2026</span>
      </div>
      <div className={styles.heading}>
        <h2 id="work-title">
          Selected work<span className="accent">.</span>
        </h2>
        <span className={styles.count}>(04)</span>
        <p>
          Thoughtful on the surface.
          <br />
          Considered at every layer.
        </p>
      </div>
      <div className={styles.tableHead}>
        <span>PROJECT / DISCIPLINE</span>
        <span>STACK</span>
        <span>YEAR</span>
      </div>
      <div
        className={styles.list}
        data-preview-active={!!active}
        onPointerLeave={() => setHovered(null)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget))
            setHovered(null);
        }}
      >
        {projects.map((project) => (
          <article
            key={project.slug}
            className={styles.project}
            data-active={hovered === project.slug}
          >
            <Link
              to={`/work/${project.slug}`}
              className={styles.row}
              onClick={() => {
                setHovered(null);
              }}
              onPointerEnter={(event) => {
                if (event.pointerType === "mouse") {
                  setHovered(project.slug);
                  preview.onPointerMove(event);
                }
              }}
              onPointerMove={preview.onPointerMove}
              onFocus={(event) => {
                if (event.target.matches(":focus-visible")) {
                  setHovered(project.slug);
                  const bounds = event.currentTarget.getBoundingClientRect();
                  preview.position.current(
                    window.innerWidth * 0.48,
                    bounds.top + 60,
                  );
                }
              }}
              aria-label={`View case study: ${project.title}`}
            >
              <span className={styles.number}>{project.number}</span>
              <span className={styles.main}>
                <span className={styles.category}>{project.category}</span>
                <span className={styles.title}>{project.title}</span>
                <span className={styles.description}>
                  {project.shortDescription}
                </span>
                <span className={styles.role}>
                  {project.role} <span> / CONCEPT</span>
                </span>
              </span>
              <span className={styles.stack}>
                {project.technologies.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </span>
              <span className={styles.year}>{project.year}</span>
              <Arrow diagonal className={styles.arrow} />
              <span className={styles.mobilePreview}>
                <img
                  src={project.preview.src}
                  alt={project.preview.alt}
                  width="960"
                  height="680"
                  loading="lazy"
                />
                <span>
                  VIEW CASE STUDY <Arrow />
                </span>
              </span>
            </Link>
          </article>
        ))}
      </div>
      <div className={styles.sectionEnd}>
        <span className="eyebrow muted">
          FOUR DIFFERENT PROBLEMS. ONE SYSTEMS MINDSET.
        </span>
        <a href="#index">BACK TO INDEX ↑</a>
      </div>
      <div
        ref={preview.ref}
        className={`${styles.floatingPreview} ${active ? styles.visible : ""}`}
        aria-hidden="true"
      >
        {active && (
          <>
            <img src={active.preview.src} alt="" width="960" height="680" />
            <div>
              <span>
                {active.number} / {active.title}
              </span>
              <span>VIEW STUDY ↗</span>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
