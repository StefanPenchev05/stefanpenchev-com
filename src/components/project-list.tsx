import Link from "next/link";
import type { Project } from "@/content/projects";

export function ProjectList({ projects }: { projects: readonly Project[] }) {
  return (
    <ul className="grid gap-x-6 gap-y-9 sm:grid-cols-2">
      {projects.map((project) => (
        <li key={project.slug}>
          <article>
            <h3>
              <Link
                href={`/work/${project.slug}/`}
                className="flex min-h-28 items-end bg-stone p-5 text-ink hover:text-accent"
              >
                {project.title}
              </Link>
            </h3>
            <p className="mt-3 metadata font-medium">{project.status} · {project.type}</p>
            <p className="mt-1">{project.summary}</p>
            <p className="mt-1 metadata">{project.role}</p>
          </article>
        </li>
      ))}
    </ul>
  );
}
