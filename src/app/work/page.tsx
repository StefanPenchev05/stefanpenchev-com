import type { Metadata } from "next";
import { ProjectList } from "@/components/project-list";
import { projects } from "@/content/projects";

export const metadata: Metadata = { title: "Selected work" };

export default function WorkPage() {
  return (
    <section className="site-container section work-index" aria-labelledby="work-index-heading">
      <header className="space-y-3">
        <h1 id="work-index-heading">Selected work</h1>
        <p className="lead">Web applications, backend systems, and internal tools I have worked on.</p>
      </header>
      <ProjectList projects={projects} heading="h2" />
    </section>
  );
}
