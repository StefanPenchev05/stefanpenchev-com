import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { projects } from "../../data/projects";
import { profile, site } from "../../data/profile";
const defaultTitle = site.title;
const defaultDescription = site.description;
export function RouteEffects() {
  const location = useLocation();
  useLayoutEffect(() => {
    const project = projects.find(
      (item) => location.pathname === `/work/${item.slug}`,
    );
    const title = project
      ? `${project.title}${project.status === "concept" ? " — Concept" : ""} | ${profile.name}`
      : location.pathname === "/"
        ? defaultTitle
        : `Page not found | ${profile.name}`;
    const description = project
      ? `${project.status === "concept" ? "Concept study: " : ""}${project.shortDescription}`
      : defaultDescription;
    document.title = title;
    for (const [selector, value] of [
      ['meta[name="description"]', description],
      ['meta[property="og:title"]', title],
      ['meta[property="og:description"]', description],
    ])
      document.querySelector(selector)?.setAttribute("content", value);
    const target = location.hash
      ? document.getElementById(location.hash.slice(1))
      : document.querySelector<HTMLElement>("[data-route-focus]");
    if (location.hash && target) {
      target.scrollIntoView();
      if (!target.hasAttribute("tabindex"))
        target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    } else {
      window.scrollTo(0, 0);
      target?.focus({ preventScroll: true });
    }
  }, [location.key, location.pathname, location.hash]);
  return null;
}
