import { act } from "react";
import { createRoot } from "react-dom/client";
import { renderToStaticMarkup } from "react-dom/server";
import { expect, it } from "vitest";
import { Skills } from "../src/sections/Skills/Skills";
import { skills } from "../src/data/skills";
import { architectureNodes } from "../src/data/architecture";
it("renders every skills group and technology from the typed source of truth", () => {
  const document = new DOMParser().parseFromString(
    renderToStaticMarkup(<Skills />),
    "text/html",
  );
  expect(document.querySelectorAll("article")).toHaveLength(skills.length);
  skills.forEach((group, index) => {
    const article = document.querySelectorAll("article")[index];
    expect(article.querySelector("h3")?.textContent).toContain(group.title);
    expect(
      [...article.querySelectorAll("li")].map((item) => item.textContent),
    ).toEqual(group.technologies);
    expect(article.textContent).toContain(group.description);
    for (const id of group.relatedArchitectureNodes ?? [])
      expect(architectureNodes.some((node) => node.id === id)).toBe(true);
  });
});
it("category buttons reveal one description while keeping all technologies available", async () => {
  const host = document.createElement("div");
  document.body.append(host);
  const root = createRoot(host);
  try {
    await act(async () => root.render(<Skills />));
    const button = host.querySelectorAll<HTMLButtonElement>("button")[1];
    await act(async () => button.click());
    expect(button.getAttribute("aria-expanded")).toBe("true");
    expect(
      host.querySelector<HTMLElement>("#skill-description-backend")?.hidden,
    ).toBe(false);
    expect(host.querySelectorAll("li")).toHaveLength(
      skills.reduce((count, group) => count + group.technologies.length, 0),
    );
    await act(async () => button.click());
    expect(
      host.querySelector<HTMLElement>("#skill-description-backend")?.hidden,
    ).toBe(true);
  } finally {
    await act(async () => root.unmount());
    host.remove();
  }
});
