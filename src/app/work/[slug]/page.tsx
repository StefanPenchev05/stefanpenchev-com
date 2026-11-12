import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, visitorAccessLabels, type Project } from "@/content/projects";
import { publicAssetUrl } from "@/lib/assets";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

async function getProject(params: ProjectPageProps["params"]): Promise<Project> {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);
  if (!project) notFound();
  return project;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = await getProject(params);
  return { title: project.title, description: project.summary };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProject(params);

  return (
    <article>
      <header className="bg-stone">
        <div className="site-container project-cover">
          <Link href="/work/" className="standalone-link">Back to work</Link>
          <p className="metadata">{project.type}</p>
          <h1>{project.title}</h1>
          <p className="lead">{project.summary}</p>
        </div>
      </header>

      <div className="site-container project-overview">
        <dl className="project-overview-facts">
          {project.organization !== project.title && (
            <div><dt>Organisation</dt><dd>{project.organization}</dd></div>
          )}
          <div><dt>Role</dt><dd>{project.role}</dd></div>
          {project.period && <div><dt>Contribution period</dt><dd>{project.period}</dd></div>}
          <div><dt>Status</dt><dd>{project.status}</dd></div>
          {project.sourceVisibility !== "unknown" && (
            <div>
              <dt>Source code</dt>
              <dd>{project.sourceVisibility === "private" ? "Private" : "Public"}</dd>
              {project.sourceVisibility === "public" && project.sourceLink && (
                <dd><a className="standalone-link" href={project.sourceLink.href}>{project.sourceLink.label}</a></dd>
              )}
            </div>
          )}
          <div>
            <dt>Visitor access</dt>
            <dd>{visitorAccessLabels[project.visitorAccess]}</dd>
            {project.visitorAccess === "public homepage only" && (
              <dd className="metadata">The link opens the public workshop website. The operations system is internal.</dd>
            )}
            {project.externalLink && (
              <dd><a className="standalone-link" href={project.externalLink.href}>{project.externalLink.label}</a></dd>
            )}
          </div>
        </dl>

        <div className="project-reading">
          <section>
            <h2>My contribution</h2>
            {project.contributions.length === 1 ? (
              <p>{project.contributions[0]}</p>
            ) : (
              <ul className="list-disc space-y-2 pl-5">
                {project.contributions.map((item) => <li key={item}>{item}</li>)}
              </ul>
            )}
          </section>
          {!!project.technologies?.length && (
            <section>
              <h2>Technologies</h2>
              <p>{project.technologies.join(", ")}</p>
            </section>
          )}
          {project.media?.map(({ path, alt, width, height, caption }) => (
            <figure key={path} className="space-y-2">
              <Image src={publicAssetUrl(path)} alt={alt} width={width} height={height} className="h-auto max-w-full" />
              {caption && <figcaption className="metadata">{caption}</figcaption>}
            </figure>
          ))}
        </div>
        <div className="project-return">
          <Link href="/work/" className="standalone-link">Back to all projects</Link>
        </div>
      </div>
    </article>
  );
}
