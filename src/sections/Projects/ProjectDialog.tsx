import { useEffect, useRef } from "react";
import { projects } from "../../data/projects";
import { usePortfolioStore } from "../../store/usePortfolioStore";
import { Arrow } from "../../components/ui/Arrow";
import styles from "./Projects.module.css";
export function ProjectDialog() {
  const ref = useRef<HTMLDialogElement>(null);
  const slug = usePortfolioStore((state) => state.activeProject);
  const close = usePortfolioStore((state) => state.closeProject);
  const project = projects.find((item) => item.slug === slug);
  useEffect(() => {
    if (!project) return;
    const dialog = ref.current;
    dialog?.showModal();
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      dialog?.close();
      document.documentElement.style.overflow = previous;
    };
  }, [project]);
  if (!project) return null;
  const study = project.caseStudy;
  return (
    <dialog
      ref={ref}
      className={styles.dialog}
      aria-labelledby="case-study-title"
      onCancel={close}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          const r = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < r.left ||
            event.clientX > r.right ||
            event.clientY < r.top ||
            event.clientY > r.bottom
          )
            close();
        }
      }}
      data-lenis-prevent
    >
      <div className={styles.dialogTop}>
        <span className="eyebrow">
          PROJECT {project.number} / CONCEPT STUDY
        </span>
        <button onClick={close} aria-label="Close case study" autoFocus>
          ✕
        </button>
      </div>
      <h2 id="case-study-title">{project.title}</h2>
      <p className={styles.draftNotice}>
        Illustrative project · implementation and results to be documented.
      </p>
      <img
        src={project.preview.src}
        alt={project.preview.alt}
        width="960"
        height="680"
      />
      <div className={styles.studySection}>
        <h3>OVERVIEW</h3>
        <p>{study.overview}</p>
      </div>
      {study.problem && (
        <div className={styles.studySection}>
          <h3>PROBLEM</h3>
          <p>{study.problem}</p>
        </div>
      )}
      {study.solution && (
        <div className={styles.studySection}>
          <h3>SOLUTION</h3>
          <p>{study.solution}</p>
        </div>
      )}
      {study.myRole && (
        <div className={styles.studySection}>
          <h3>MY ROLE</h3>
          <p>{study.myRole}</p>
        </div>
      )}
      {study.architecture && (
        <div className={styles.studySection}>
          <h3>ARCHITECTURE</h3>
          <div className={styles.architectureNodes}>
            {study.architecture.nodes.map((node, index) => (
              <span key={node}>
                {index > 0 && <Arrow />}
                {node}
              </span>
            ))}
          </div>
          <p>{study.architecture.description}</p>
        </div>
      )}
      <div className={styles.studySection}>
        <h3>TECH STACK</h3>
        <p>{project.technologies.join(" / ")}</p>
      </div>
      {study.technicalChallenges && (
        <div className={styles.studySection}>
          <h3>TECHNICAL CHALLENGES</h3>
          <ul>
            {study.technicalChallenges.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}
      {study.screenshots?.map((screenshot) => (
        <figure key={screenshot.src}>
          <img src={screenshot.src} alt={screenshot.alt} />
          {screenshot.caption && <figcaption>{screenshot.caption}</figcaption>}
        </figure>
      ))}
      {study.result && (
        <div className={styles.studySection}>
          <h3>RESULT</h3>
          <p>{study.result}</p>
        </div>
      )}
      <div className={styles.studySection}>
        <h3>LINKS</h3>
        {project.links?.github && (
          <a href={project.links.github} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
        )}
        {project.links?.live && (
          <a href={project.links.live} target="_blank" rel="noreferrer">
            Live website ↗
          </a>
        )}
        {!project.links?.github && !project.links?.live && (
          <p>
            Repository and live website will be added with the actual project.
          </p>
        )}
      </div>
    </dialog>
  );
}
