import { act, StrictMode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter, Routes, Route, Link } from "react-router-dom";
import { afterEach, expect, it, vi } from "vitest";
import { About } from "../src/sections/About/About";
import { Contact } from "../src/sections/Contact/Contact";
import { Footer } from "../src/components/layout/Footer";
import { Navigation } from "../src/components/navigation/Navigation";
import { RouteEffects } from "../src/components/layout/RouteEffects";
import CaseStudy, { CaseStudyContent } from "../src/pages/CaseStudy";
import { Projects } from "../src/sections/Projects/Projects";
import { Experience } from "../src/sections/Experience/Experience";
import { projects } from "../src/data/projects";
import { contacts } from "../src/data/contact";
import { about } from "../src/data/about";
import { ScrollTrigger } from "../src/animations/scroll/gsap";
let root: Root | undefined;
let host: HTMLDivElement;
afterEach(async () => {
  if (root) await act(async () => root!.unmount());
  root = undefined;
  host?.remove();
  ScrollTrigger.killAll();
  vi.restoreAllMocks();
});
const html = (node: React.ReactNode) =>
  new DOMParser().parseFromString(
    renderToStaticMarkup(<MemoryRouter>{node}</MemoryRouter>),
    "text/html",
  );
async function mount(node: React.ReactNode, path = "/") {
  host = document.createElement("div");
  document.body.append(host);
  root = createRoot(host);
  await act(async () =>
    root!.render(
      <StrictMode>
        <MemoryRouter initialEntries={[path]}>{node}</MemoryRouter>
      </StrictMode>,
    ),
  );
}
const routes = (
  <>
    <Routes>
      <Route path="/work/:slug" element={<CaseStudy />} />
    </Routes>
    <RouteEffects />
  </>
);
it("About renders complete content without a portrait", () => {
  const doc = html(<About />);
  expect(doc.querySelector("img")).toBeNull();
  expect(doc.querySelectorAll("article")).toHaveLength(3);
  expect(doc.querySelector("h2")?.textContent).toBe(about.statement);
});
it("About uses verified interests without unverified personal claims", () => {
  const doc = html(<About />);
  expect(doc.body.textContent).not.toContain("PERSONAL DETAILS TO VERIFY");
  expect(doc.body.textContent).toContain("cybersecurity");
  expect(doc.body.textContent).not.toContain("Luxembourg");
});
it("disabled contact placeholders remain noninteractive", () => {
  const items = contacts.map((item) => ({ ...item, enabled: false }));
  const doc = html(<Contact items={items} />);
  expect(doc.querySelectorAll("a,button,input")).toHaveLength(0);
  expect(doc.querySelectorAll("[aria-disabled=true]")).toHaveLength(
    items.length,
  );
});
it("enabled contact items use the supplied verified href exactly", () => {
  const doc = html(
    <Contact
      items={[
        {
          id: "test",
          label: "EMAIL",
          value: "test fixture",
          href: "mailto:fixture@example.test",
          enabled: true,
        },
      ]}
    />,
  );
  expect(doc.querySelector("a")?.getAttribute("href")).toBe(
    "mailto:fixture@example.test",
  );
});
it("a valid stable slug loads the matching project", async () => {
  await mount(routes, "/work/request-atlas");
  expect(host.querySelector("h1")?.textContent).toBe("Request Atlas");
});
it("an unknown slug safely offers a link back to work", async () => {
  await mount(routes, "/work/missing");
  expect(host.querySelector("h1")?.textContent).toBe("That page isn’t here.");
  expect(host.querySelector("a")?.getAttribute("href")).toBe("/#work");
});
it("concepts are labelled and do not publish years as completed work", () => {
  const doc = html(<CaseStudyContent project={projects[0]} />);
  expect(doc.body.textContent).toContain(
    "CONCEPT CASE STUDY / NOT COMPLETED WORK",
  );
  expect(doc.body.textContent).toContain("CONCEPT ILLUSTRATION");
  expect(
    [...doc.querySelectorAll("dt")].map((n) => n.textContent),
  ).not.toContain("YEAR");
  expect(doc.body.textContent).not.toContain("2026");
});
it("missing case study fields do not create empty headings or fake links", () => {
  const project = {
    ...projects[0],
    caseStudy: { overview: "Only verified overview" },
  };
  const doc = html(<CaseStudyContent project={project} />);
  expect([...doc.querySelectorAll("h2")].map((n) => n.textContent)).toEqual([
    "Overview",
  ]);
  expect(doc.querySelector("a")).toBeNull();
});
it("About nav links to the existing About section", async () => {
  await mount(
    <>
      <Navigation />
      <About />
    </>,
  );
  expect(
    host.querySelector("a[data-section=about]")?.getAttribute("href"),
  ).toBe("/#about");
  expect(host.querySelector("#about")).not.toBeNull();
});
it("Contact nav links to the existing Contact section", async () => {
  await mount(
    <>
      <Navigation />
      <Contact />
    </>,
  );
  expect(
    host.querySelector("a[data-section=contact]")?.getAttribute("href"),
  ).toBe("/#contact");
  expect(host.querySelector("#contact")).not.toBeNull();
});
it("back-to-top is a focusable native link", async () => {
  await mount(<Footer />);
  const link = host.querySelector("a")!;
  link.focus();
  expect(document.activeElement).toBe(link);
  expect(link.tabIndex).toBe(0);
  expect(link.getAttribute("href")).toBe("/#index");
});
it("each case-study page has exactly one H1", () => {
  for (const project of projects)
    expect(
      html(<CaseStudyContent project={project} />).querySelectorAll("h1"),
    ).toHaveLength(1);
});
it("new sections maintain a valid heading hierarchy", () => {
  const doc = html(
    <>
      <h1>Portfolio</h1>
      <About />
      <Contact />
    </>,
  );
  const levels = [...doc.querySelectorAll("h1,h2,h3,h4")].map((n) =>
    Number(n.tagName.slice(1)),
  );
  for (let i = 1; i < levels.length; i++)
    expect(levels[i] - levels[i - 1]).toBeLessThanOrEqual(1);
  const study = html(<CaseStudyContent project={projects[0]} />);
  expect([...study.querySelectorAll("h1,h2,h3")].map((n) => n.tagName)).toEqual(
    ["H1", ...Array(study.querySelectorAll("h2").length).fill("H2")],
  );
});
it("route navigation moves focus to the destination H1 and updates title", async () => {
  await mount(
    <>
      <Link to="/work/dispatch">Open Dispatch</Link>
      {routes}
    </>,
    "/work/request-atlas",
  );
  await act(async () => host.querySelector<HTMLAnchorElement>("a")!.click());
  expect(document.activeElement).toBe(host.querySelector("h1"));
  expect(document.activeElement?.textContent).toBe("Dispatch");
  expect(document.title).toContain("Dispatch — Concept");
});
it("route changes remove timeline triggers, preview tweens and navigation triggers on unmount", async () => {
  await mount(
    <>
      <Navigation />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Projects />
              <Experience />
            </>
          }
        />
        <Route path="/work/:slug" element={<CaseStudy />} />
      </Routes>
      <RouteEffects />
    </>,
  );
  expect(ScrollTrigger.getAll()).toHaveLength(2);
  await act(async () =>
    host
      .querySelector<HTMLAnchorElement>('a[href="/work/personal-organizer"]')!
      .click(),
  );
  expect(ScrollTrigger.getAll()).toHaveLength(1);
  expect(host.querySelector("[data-experience-entry]")).toBeNull();
  await act(async () => root!.unmount());
  root = undefined;
  expect(ScrollTrigger.getAll()).toHaveLength(0);
});
it("additional screenshots are lazy and absent screenshots are not requested", () => {
  const project = {
    ...projects[0],
    caseStudy: {
      overview: "Overview",
      screenshots: [{ src: "/fixture.png", alt: "Fixture" }],
    },
  };
  const doc = html(<CaseStudyContent project={project} />);
  expect(
    doc.querySelector('img[src="/fixture.png"]')?.getAttribute("loading"),
  ).toBe("lazy");
  expect(
    html(<CaseStudyContent project={projects[0]} />).querySelectorAll("img"),
  ).toHaveLength(1);
});
