import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { readFile, readdir } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, resolve, sep } from "node:path";
import { test } from "node:test";
import { promisify } from "node:util";
import { chromium } from "playwright";

const run = promisify(execFile);
const outputDirectory = resolve("out");
const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".txt": "text/plain",
  ".png": "image/png",
  ".pdf": "application/pdf",
};

const projectLinks = {
  "dto-recruitment-platform": [],
  "dto-company-website": ["https://dtopartners.com/"],
  artaicare: ["https://therapy.artaicare.com/auth/signin"],
  "skald-lab-ops": ["https://skaldlab.com/"],
  egil: [],
};

function createStaticServer(basePath) {
  return createServer(async (request, response) => {
    try {
      const pathname = new URL(request.url, "http://localhost").pathname;
      if (pathname.startsWith(`${basePath}/`)) {
        const relativePath = decodeURIComponent(pathname.slice(basePath.length + 1));
        const file = resolve(outputDirectory, relativePath, ...(pathname.endsWith("/") ? ["index.html"] : []));
        if (file.startsWith(outputDirectory + sep)) {
          const content = await readFile(file);
          response.writeHead(200, { "Content-Type": mimeTypes[extname(file)] ?? "application/octet-stream" });
          response.end(content);
          return;
        }
      }
    } catch (error) {
      if (!(error instanceof URIError) && !["ENOENT", "ENOTDIR", "EISDIR"].includes(error.code)) {
        response.writeHead(500).end();
        return;
      }
    }
    response.writeHead(404, { "Content-Type": mimeTypes[".html"] });
    response.end(await readFile(resolve(outputDirectory, "404.html")));
  });
}

test("root and prefixed production exports served as static files", async (suite) => {
  const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || undefined });
  suite.after(() => browser.close());

  // Keep the default root export in out/ when verification finishes.
  for (const basePath of ["/portfolio-preview", ""]) {
    await suite.test(basePath || "domain root", async (check) => {
      const { stdout } = await run("npm", ["run", "build"], {
        env: { ...process.env, NEXT_PUBLIC_BASE_PATH: basePath },
      });
      check.diagnostic(stdout.trim());

      const exportedFiles = await readdir(outputDirectory, { recursive: true });
      assert.equal(exportedFiles.some((file) => /(^|\/)(docs|prompts)(\/|$)|\.md$/i.test(file)), false);

      const server = createStaticServer(basePath);
      await new Promise((listen) => server.listen(0, "127.0.0.1", listen));
      check.after(() => new Promise((close, reject) => server.close((error) => error ? reject(error) : close())));
      const origin = `http://127.0.0.1:${server.address().port}`;
      const site = origin + basePath;

      const context = await browser.newContext({ javaScriptEnabled: false });
      check.after(() => context.close());
      const page = await context.newPage();
      const failures = [];
      page.on("response", (response) => {
        if (response.status() >= 400 && response.request().resourceType() !== "document") {
          failures.push(response.url());
        }
      });
      page.on("requestfailed", (request) => {
        if (["stylesheet", "image"].includes(request.resourceType())) {
          failures.push(`${request.failure()?.errorText} ${request.url()}`);
        }
      });

      for (const path of ["/", "/about/", "/work/", ...Object.keys(projectLinks).map((slug) => `/work/${slug}/`)]) {
        assert.equal((await page.goto(site + path)).status(), 200, path);
        assert.equal(await page.locator("main h1").count(), 1, path);
        assert.equal(await page.locator('link[rel="canonical"]').count(), 0, path);
        const links = await page.locator("a[href]").evaluateAll((anchors) =>
          anchors.map((anchor) => anchor.getAttribute("href")));
        for (const href of links.filter((href) => href.startsWith("/"))) {
          assert.ok(href.startsWith(`${basePath}/`), href);
          if (basePath) assert.ok(!href.startsWith(basePath + basePath), href);
        }
        assert.ok(links.includes(`${basePath}/#contact`), path);
        if (path.startsWith("/work/") && path !== "/work/") {
          const slug = path.split("/")[2];
          assert.deepEqual(links.filter((href) => href.startsWith("https://")), projectLinks[slug], path);
          assert.equal(await page.locator("main img").count(), 0, path);
        }
      }

      assert.equal((await page.reload()).status(), 200);
      await page.getByRole("navigation").getByRole("link", { name: "Contact" }).click();
      await page.waitForURL(`${site}/#contact`);
      assert.equal(await page.getByRole("heading", { name: "Roles starting January 2027" }).count(), 1);
      assert.equal(await page.locator("#contact a[href^='tel:']").count(), 0);

      await page.goto(site + "/");
      assert.equal(await page.locator("body").evaluate((body) => getComputedStyle(body).backgroundColor), "rgb(246, 245, 241)");
      await page.keyboard.press("Tab");
      assert.equal(await page.evaluate(() => document.activeElement.textContent), "Skip to content");
      await page.keyboard.press("Enter");
      assert.equal(await page.evaluate(() => document.activeElement.id), "main");
      await page.getByRole("link", { name: "View my work" }).click();
      await page.waitForURL(`${site}/#selected-work`);

      const portrait = page.getByRole("img", { name: "Portrait of Stefan Penchev" });
      assert.equal(await portrait.getAttribute("src"), `${basePath}/images/stefan-penchev.png`);
      assert.equal(await portrait.evaluate((img) => img.naturalWidth), 800);
      for (const width of [360, 390, 768, 1024, 1440, 1920]) {
        await page.setViewportSize({ width, height: 900 });
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Homepage at ${width}px`);
      }

      for (const [path, type] of [
        ["/images/stefan-penchev.png", "image/png"],
        ["/files/stefan-penchev-cv.pdf", "application/pdf"],
      ]) {
        const response = await fetch(site + path);
        assert.equal(response.status, 200);
        assert.equal(response.headers.get("content-type"), type);
        assert.deepEqual(Buffer.from(await response.arrayBuffer()), await readFile(`public${path}`));
      }

      assert.equal((await page.goto(site + "/work/missing-project/")).status(), 404);
      assert.equal(await page.getByRole("heading", { name: "Page not found" }).count(), 1);
      assert.equal((await page.goto(site + "/docs/content-facts.md")).status(), 404);
      assert.deepEqual(failures, []);

      const enhancedPage = await browser.newPage();
      try {
        const scriptErrors = [];
        enhancedPage.on("pageerror", (error) => scriptErrors.push(error.message));
        enhancedPage.on("response", (response) => {
          if (response.status() >= 400) scriptErrors.push(`${response.status()} ${response.url()}`);
        });
        await enhancedPage.goto(site + "/work/");
        const scripts = await enhancedPage.locator("script[src]").evaluateAll((tags) => tags.map((tag) => tag.src));
        assert.ok(scripts.length > 0);
        await Promise.all(scripts.map(async (url) => assert.equal((await fetch(url)).status, 200, url)));
        await enhancedPage.getByRole("link", { name: "ArtAICare" }).click();
        await enhancedPage.waitForURL(site + "/work/artaicare/");
        await enhancedPage.getByRole("heading", { name: "ArtAICare", exact: true }).waitFor();
        assert.deepEqual(scriptErrors, []);
      } finally {
        await enhancedPage.close();
      }
    });
  }
});
