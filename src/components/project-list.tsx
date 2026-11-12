import Link from "next/link";
import { visitorAccessLabels, type Project } from "@/content/projects";

export function ProjectList({
  projects,
  heading: Heading,
}: {
  projects: readonly Project[];
  heading: "h2" | "h3";
}) {
  return (
    <ul className="project-list" role="list">
      {projects.map((project) => (
        <li key={project.slug}>
          <article className="project-row">
            <div className="project-row-intro">
              <Heading className="project-row-title">{project.title}</Heading>
              <p>{project.summary}</p>
            </div>
            <dl className="project-row-facts">
              <div><dt>Contribution</dt><dd>{project.role}</dd></div>
              <div><dt>Status</dt><dd>{project.status}</dd></div>
              <div><dt>Visitor access</dt><dd>{visitorAccessLabels[project.visitorAccess]}</dd></div>
              {!!project.technologies?.length && (
                <div><dt>Selected tools</dt><dd>{project.technologies.slice(0, 4).join(", ")}</dd></div>
              )}
            </dl>
            <Link
              href={`/work/${project.slug}/`}
              aria-label={`Read project: ${project.title}`}
              className="standalone-link project-row-link"
            >
              <span className="project-row-link-label">Read project</span>
              <span aria-hidden="true">→</span>
            </Link>
          </article>
        </li>
      ))}
    </ul>
  );
}
