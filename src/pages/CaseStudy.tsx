import { NotFound } from "./NotFound";
import { ProjectMedia, validMedia } from "../components/ui/ProjectMedia";
import { Link, useParams } from "react-router-dom";
import { projects, projectStatusLabels, type Project } from "../data/projects";
import styles from "./CaseStudy.module.css";
export function CaseStudyContent({ project }: { project: Project }) {
  const study = project.caseStudy;
  const media = study.media?.filter(validMedia) || [];
  const concept = project.status === "concept";
  return (
    <>
      <header className={styles.hero}>
        <p className="eyebrow accent">
          {project.number} /{" "}
          {concept
            ? "CONCEPT CASE STUDY / NOT COMPLETED WORK"
            : projectStatusLabels[project.status]}
        </p>
        <h1 tabIndex={-1} data-route-focus>
          {project.title}
        </h1>
        <p className={styles.description}>{project.shortDescription}</p>
        {concept && (
          <p className={styles.notice}>
            Exploratory draft. The approach and illustrations below describe a
            proposed system, not a delivered product or verified results.
          </p>
        )}
        <dl className={styles.metadata}>
          {!concept && project.year && (
            <div>
              <dt>YEAR</dt>
              <dd>{project.year}</dd>
            </div>
          )}
          {project.role && (
            <div>
              <dt>{concept ? "PROPOSED ROLE" : "ROLE"}</dt>
              <dd>{project.role}</dd>
            </div>
          )}
          {project.technologies.length > 0 && (
            <div>
              <dt>{concept ? "PROPOSED TECHNOLOGIES" : "TECHNOLOGIES"}</dt>
              <dd>{project.technologies.join(" / ")}</dd>
            </div>
          )}
        </dl>
      </header>
      <div className={styles.preview}>
        <ProjectMedia
          key={project.preview.src}
          priority
          media={{
            type: "image",
            ...project.preview,
            width: 960,
            height: 680,
            caption: concept
              ? "CONCEPT ILLUSTRATION / NOT A PRODUCT SCREENSHOT"
              : project.preview.alt,
          }}
        />
      </div>
      <div className={styles.prose}>
        {study.overview && (
          <section>
            <h2>Overview</h2>
            <p>{study.overview}</p>
          </section>
        )}
        {study.problem && (
          <section>
            <h2>Problem</h2>
            <p>{study.problem}</p>
          </section>
        )}
        {study.solution && (
          <section>
            <h2>{concept ? "Proposed solution" : "Solution"}</h2>
            <p>{study.solution}</p>
          </section>
        )}
        {study.myRole && (
          <section>
            <h2>{concept ? "Planned contribution" : "My contribution"}</h2>
            <p>{study.myRole}</p>
          </section>
        )}
      </div>
      {study.architecture && (
        <section className={styles.architecture}>
          <h2>{concept ? "Proposed architecture" : "Architecture"}</h2>
          <ul>
            {study.architecture.nodes.map((node) => (
              <li key={node}>{node}</li>
            ))}
          </ul>
          <p>{study.architecture.description}</p>
        </section>
      )}
      <div className={styles.prose}>
        {!!study.technicalChallenges?.length && (
          <section>
            <h2>{concept ? "Questions to explore" : "Technical challenges"}</h2>
            <ul>
              {study.technicalChallenges.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
      {!!study.screenshots?.length && (
        <section className={styles.media}>
          <h2>Screenshots</h2>
          {study.screenshots.map((item) => (
            <ProjectMedia key={item.src} media={{ type: "image", ...item }} />
          ))}
        </section>
      )}
      {media.length > 0 && (
        <section className={styles.media}>
          <h2>Project media</h2>
          {media.map((item) => (
            <ProjectMedia key={item.src} media={item} />
          ))}
        </section>
      )}
      <div className={styles.prose}>
        {study.result && (
          <section>
            <h2>{concept ? "Proposed outcome" : "Result"}</h2>
            <p>{study.result}</p>
          </section>
        )}
      </div>
      {(project.links?.github || project.links?.live) && (
        <nav className={styles.links} aria-label="Project links">
          {project.links.github && <a href={project.links.github}>GITHUB ↗</a>}
          {project.links.live && (
            <a href={project.links.live}>LIVE WEBSITE ↗</a>
          )}
        </nav>
      )}
    </>
  );
}
export { NotFound } from "./NotFound";
export default function CaseStudy() {
  const { slug } = useParams();
  const index = projects.findIndex((project) => project.slug === slug);
  const project = projects[index];
  if (!project) return <NotFound />;
  return (
    <article className={`page-width ${styles.page}`}>
      <Link className={styles.back} to="/#work">
        ← BACK TO WORK
      </Link>
      <CaseStudyContent project={project} />
      <nav className={styles.pagination} aria-label="Case study navigation">
        {index > 0 && (
          <Link to={`/work/${projects[index - 1].slug}`}>
            ← PREVIOUS PROJECT<span>{projects[index - 1].title}</span>
          </Link>
        )}
        {index < projects.length - 1 && (
          <Link to={`/work/${projects[index + 1].slug}`}>
            NEXT PROJECT →<span>{projects[index + 1].title}</span>
          </Link>
        )}
      </nav>
    </article>
  );
}
