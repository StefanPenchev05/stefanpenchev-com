import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { projects } from "../src/data/projects.ts";
import { profile } from "../src/data/profile.ts";
import { SITE_BASE_PATH, SITE_URL, sitePath } from "../src/lib/site.ts";

const root = fileURLToPath(new URL("../dist/client/", import.meta.url));
const routes = ["/", ...projects.map(({ slug }) => `/work/${slug}/`)];

test("every configured page has its own HTML, content and resolvable prefixed links", async () => {
  const linkedFiles = new Set();
  for (const route of routes) {
    const html = await readFile(resolve(root, `.${route}index.html`), "utf8");
    assert.match(html, /<html[^>]*lang="en"/);
    assert.match(html, /<h1[\s>]/);
    assert.match(html, /Stefan Penchev/);
    if (route !== "/") {
      const project = projects.find(({ slug }) => route === `/work/${slug}/`);
      const escapedName = project.fullName.replaceAll("&", "&amp;").replaceAll("<", "&lt;");
      assert.ok(html.includes(escapedName), `${route} is missing its project content`);
    }
    for (const [, attribute] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      const url = new URL(attribute, SITE_URL + route.slice(1));
      if (url.origin !== new URL(SITE_URL).origin) continue;
      assert.ok(url.pathname.startsWith(SITE_BASE_PATH), `${route}: ${attribute} escapes the base`);
      linkedFiles.add(decodeURIComponent(url.pathname).slice(SITE_BASE_PATH.length));
    }
    assert.ok(html.includes(sitePath(profile.cv)), `${route}: CV URL is not prefixed`);
  }
  for (const relative of linkedFiles) {
    const file = resolve(root, relative);
    const info = await stat(file);
    if (info.isDirectory()) await accessPage(file);
    else assert.ok(info.isFile(), `${relative} is not a static file`);
  }
});

async function accessPage(directory) {
  assert.ok((await stat(resolve(directory, "index.html"))).isFile());
}

test("the sitemap contains exactly the homepage and every approved project", async () => {
  const xml = await readFile(resolve(root, "sitemap.xml"), "utf8");
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
  assert.deepEqual(urls.sort(), routes.map((route) => SITE_URL + route.slice(1)).sort());
  assert.ok(!xml.includes("localhost"));
});

test("the exported portrait and CV remain byte-identical to the approved assets", async () => {
  for (const file of [profile.portrait, profile.cv]) {
    const original = await readFile(new URL(`../public${file}`, import.meta.url));
    const exported = await readFile(resolve(root, file.slice(1)));
    assert.deepEqual(exported, original, file);
  }
});
