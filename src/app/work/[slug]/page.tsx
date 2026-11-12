import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, type Project } from "@/content/projects";
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
    <article className="site-container section space-y-8">
      <Link href="/work/">All projects</Link>
      <header className="space-y-3 bg-stone p-6 sm:p-8">
        <p className="text-muted">{project.organization} · {project.type}</p>
        <h1>{project.title}</h1>
        <p>{project.summary}</p>
      </header>
      <dl className="grid gap-4 sm:grid-cols-2">
        <div><dt className="font-semibold">Role</dt><dd>{project.role}</dd></div>
        {project.period && <div><dt className="font-semibold">Contribution period</dt><dd>{project.period}</dd></div>}
        <div><dt className="font-semibold">Status</dt><dd>{project.status}</dd></div>
        <div><dt className="font-semibold">Visitor access</dt><dd className="capitalize">{project.visitorAccess}</dd></div>
        {project.sourceVisibility !== "unknown" && (
          <div><dt className="font-semibold">Source code</dt><dd className="capitalize">{project.sourceVisibility}</dd></div>
        )}
      </dl>
      <section className="space-y-3">
        <h2>Contributions</h2>
        <ul className="max-w-[68ch] list-disc space-y-2 pl-6">
          {project.contributions.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>
      {!!project.technologies?.length && (
        <section className="space-y-2">
          <h2>Technologies</h2>
          <p>{project.technologies.join(", ")}</p>
        </section>
      )}
      {project.media?.map(({ path, alt, width, height }) => (
        <Image key={path} src={publicAssetUrl(path)} alt={alt} width={width} height={height} className="h-auto" />
      ))}
      <div className="flex flex-wrap gap-x-6 gap-y-2 empty:hidden">
        {project.externalLink && <a href={project.externalLink.href}>{project.externalLink.label}</a>}
        {project.sourceVisibility === "public" && project.sourceLink && (
          <a href={project.sourceLink.href}>{project.sourceLink.label}</a>
        )}
      </div>
    </article>
  );
}
