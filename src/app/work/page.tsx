import type { Metadata } from "next";
import { ProjectList } from "@/components/project-list";
import { projects } from "@/content/projects";

export const metadata: Metadata = { title: "Work" };

export default function WorkPage() {
  return (
    <section className="site-container section space-y-8">
      <h1>Work</h1>
      <ProjectList projects={projects} />
    </section>
  );
}
