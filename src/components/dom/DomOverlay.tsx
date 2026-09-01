"use client";

import { chapters } from "@/lib/data/chapters";
import { orderedProjects, profile } from "@/lib/data/portfolio";
import {
  buildSystemArchitecture,
  getBackendVisualizationProject
} from "@/lib/data/systemArchitecture";
import { useExperienceStore } from "@/lib/scroll/useExperienceStore";

export function DomOverlay() {
  const activeChapter = useExperienceStore((state) => state.activeChapter);
  const selectedProjectId = useExperienceStore((state) => state.selectedProjectId);
  const requestStage = useExperienceStore((state) => state.requestStage);
  const setSelectedProjectId = useExperienceStore((state) => state.setSelectedProjectId);
  const chapter = chapters[activeChapter] ?? chapters[0];
  const selectedProject =
    orderedProjects.find((project) => project.id === selectedProjectId) ?? orderedProjects[0];
  const backendProject = getBackendVisualizationProject(selectedProjectId);
  const selectedArchitecture = buildSystemArchitecture(backendProject);
  const scrollToChapter = (index: number) => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const target = maxScroll * (index / (chapters.length - 1));
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <>
      <a className="skip-link" href="#portfolio-content">
        Skip to portfolio content
      </a>
      <nav className="chapter-nav" aria-label="Portfolio scenes">
        {chapters.map((item, index) => (
          <button
            className={`chapter-nav__item ${index === activeChapter ? "is-active" : ""}`}
            key={item.id}
            onClick={() => scrollToChapter(index)}
            type="button"
          >
            <span className="chapter-nav__index">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="chapter-nav__label">{item.title}</span>
          </button>
        ))}
      </nav>
      <section className="dom-overlay" aria-live="polite">
        <article
          className={`chapter-panel ${activeChapter === 0 ? "chapter-panel--identity" : ""} ${
            activeChapter === 1 ? "chapter-panel--project" : ""
          } ${
            activeChapter === 2 ? "chapter-panel--backend" : ""
          }`}
        >
          <p className="chapter-panel__eyebrow">{chapter.eyebrow}</p>
          {activeChapter === 0 ? (
            <>
              <h1>{profile.name}</h1>
              <div className="role-stack" aria-label="Professional roles">
                <span>{profile.title}</span>
              </div>
              <p>{profile.positioning}</p>
              <div className="hero-actions">
                <button type="button" onClick={() => scrollToChapter(1)}>
                  Explore Projects
                </button>
                <button type="button" onClick={() => scrollToChapter(5)}>
                  Contact
                </button>
              </div>
            </>
          ) : activeChapter === 1 ? (
            <>
              <h2>{selectedProject.title}</h2>
              <p className="technical-meta">
                {selectedProject.featured ? "Featured" : "Secondary"} / {selectedProject.category} / {selectedProject.context}
              </p>
              <p>{selectedProject.description}</p>
              <p className="project-impact">{selectedProject.impact}</p>
              <div className="signals" aria-label="Project stack">
                {selectedProject.stack.slice(0, 5).map((technology) => (
                  <span className="signal" key={technology}>
                    {technology}
                  </span>
                ))}
              </div>
              <div className="project-selector" aria-label="Select project">
                {orderedProjects.map((project) => (
                  <button
                    className={project.id === selectedProject.id ? "is-selected" : ""}
                    key={project.id}
                    onClick={() => setSelectedProjectId(project.id)}
                    type="button"
                  >
                    <span>{String(project.hierarchyRank).padStart(2, "0")}</span>
                    {project.title}
                  </button>
                ))}
              </div>
              {selectedProject.link ? (
                <a className="project-link" href={selectedProject.link} rel="noreferrer" target="_blank">
                  Open project link
                </a>
              ) : null}
            </>
          ) : activeChapter === 2 ? (
            <>
              <h2>{backendProject.title}</h2>
              <p className="technical-meta">
                Running architecture / {selectedArchitecture.nodes.length} nodes / {selectedArchitecture.edges.length} links
              </p>
              <p>{selectedArchitecture.note}</p>
              <div className="request-state" aria-label="Current request state">
                <span>{requestStage?.state ?? "request path"}</span>
                <strong>{requestStage?.label ?? "Architecture model ready"}</strong>
                <p>
                  {requestStage
                    ? `${requestStage.nodeLabel}: ${requestStage.description}`
                    : "Scroll through the backend core to follow the configured request path."}
                </p>
              </div>
              <div className="signals" aria-label="Architecture components">
                {selectedArchitecture.nodes.slice(0, 5).map((node) => (
                  <span className="signal" key={node.id}>
                    {node.technology ?? node.label}
                  </span>
                ))}
              </div>
            </>
          ) : (
            <>
              <h2>{chapter.title}</h2>
              <p>{chapter.description}</p>
              <div className="signals" aria-label="Scene signals">
                {chapter.signals.map((signal) => (
                  <span className="signal" key={signal}>
                    {signal}
                  </span>
                ))}
              </div>
            </>
          )}
        </article>
      </section>
    </>
  );
}
