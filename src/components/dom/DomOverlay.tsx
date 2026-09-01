"use client";

import { chapters } from "@/lib/data/chapters";
import { cybersecurityEvidence, orderedProjects, profile } from "@/lib/data/portfolio";
import { buildSecurityInspection } from "@/lib/data/securityInspection";
import { buildTechnologyMap } from "@/lib/data/technologyMap";
import {
  buildSystemArchitecture,
  getBackendVisualizationProject
} from "@/lib/data/systemArchitecture";
import { useExperienceStore } from "@/lib/scroll/useExperienceStore";

export function DomOverlay() {
  const activeChapter = useExperienceStore((state) => state.activeChapter);
  const selectedProjectId = useExperienceStore((state) => state.selectedProjectId);
  const requestStage = useExperienceStore((state) => state.requestStage);
  const securityInspectionStage = useExperienceStore((state) => state.securityInspectionStage);
  const technologySelectionStage = useExperienceStore((state) => state.technologySelectionStage);
  const setSelectedProjectId = useExperienceStore((state) => state.setSelectedProjectId);
  const chapter = chapters[activeChapter] ?? chapters[0];
  const selectedProject =
    orderedProjects.find((project) => project.id === selectedProjectId) ?? orderedProjects[0];
  const backendProject = getBackendVisualizationProject(selectedProjectId);
  const selectedArchitecture = buildSystemArchitecture(backendProject);
  const securityInspection = buildSecurityInspection(backendProject);
  const technologyMap = buildTechnologyMap();
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
          } ${
            activeChapter === 3 ? "chapter-panel--security" : ""
          } ${
            activeChapter === 4 ? "chapter-panel--technology" : ""
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
          ) : activeChapter === 3 ? (
            <>
              <h2>{chapter.title}</h2>
              <p className="technical-meta">
                Security inspection / {securityInspection.config.trustZones.length} trust zones / {backendProject.title}
              </p>
              <p>{securityInspection.config.note}</p>
              <div className="request-state request-state--security" aria-label="Current security inspection">
                <span>{securityInspectionStage?.trustZone ?? "trust boundary"}</span>
                <strong>{securityInspectionStage?.label ?? "Inspection layer ready"}</strong>
                <p>
                  {securityInspectionStage
                    ? `${securityInspectionStage.concept}: ${securityInspectionStage.description}`
                    : "Scroll through the security chapter to inspect the same architecture through trust boundaries and protocol context."}
                </p>
              </div>
              <dl className="inspection-grid" aria-label="Security inspection metadata">
                <div>
                  <dt>Protocol</dt>
                  <dd>{securityInspectionStage?.protocol ?? "configured per path"}</dd>
                </div>
                <div>
                  <dt>State</dt>
                  <dd>{securityInspectionStage?.securityState ?? "observed"}</dd>
                </div>
                <div>
                  <dt>Source</dt>
                  <dd>{securityInspectionStage?.source ?? "architecture"}</dd>
                </div>
                <div>
                  <dt>Destination</dt>
                  <dd>{securityInspectionStage?.destination ?? "inspection target"}</dd>
                </div>
              </dl>
              <div className="signals" aria-label="Supported security evidence">
                {cybersecurityEvidence.supportedThemes.slice(0, 4).map((signal) => (
                  <span className="signal" key={signal}>
                    {signal}
                  </span>
                ))}
              </div>
            </>
          ) : activeChapter === 4 ? (
            <>
              <h2>{technologySelectionStage?.groupTitle ?? chapter.title}</h2>
              <p className="technical-meta">
                Technology map / {technologyMap.clusters.length} groups / {technologyMap.totalTechnologies} technologies
              </p>
              <p>
                {technologySelectionStage
                  ? `${technologySelectionStage.technologyName} sits in ${technologySelectionStage.groupTitle}, connected through ${technologySelectionStage.domains.join(", ")}.`
                  : chapter.description}
              </p>
              <div className="request-state request-state--technology" aria-label="Current technology selection">
                <span>{technologySelectionStage?.technologyName ?? "capability map"}</span>
                <strong>{technologySelectionStage?.groupTitle ?? "Technology constellation ready"}</strong>
                <p>
                  {technologySelectionStage?.relatedProjectTitles.length
                    ? `Used in: ${technologySelectionStage.relatedProjectTitles.slice(0, 3).join(", ")}.`
                    : "Project relationships are derived from the normalized project stacks."}
                </p>
              </div>
              <div className="signals" aria-label="Technology groups">
                {technologyMap.clusters.map((cluster) => (
                  <span className="signal" key={cluster.id}>
                    {cluster.title}
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
