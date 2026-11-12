import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { mkdir, readFile, readdir } from "node:fs/promises";
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
  ".woff2": "font/woff2",
};

const linkedin = "https://www.linkedin.com/in/stefan-penchev-31b94a318/";

const projectLinks = {
  "dto-recruitment-platform": [],
  "dto-company-website": ["https://dtopartners.com/"],
  artaicare: ["https://therapy.artaicare.com/auth/signin"],
  "skald-lab-ops": ["https://skaldlab.com/"],
  egil: [],
};

const workEntries = [
  ["dto-recruitment-platform", "DTO Recruitment Platform", "In development", "No public access"],
  ["artaicare", "ArtAICare", "Deployed web platform", "Sign-in required"],
  ["skald-lab-ops", "Skald Lab Ops", "Online", "Workshop website only"],
  ["dto-company-website", "DTO Partners Company Website", "Public website", "Open website"],
  ["egil", "Egil", "Private internal tool", "Internal use only"],
];

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
      assert.equal(exportedFiles.some((file) => /(^|\/)(docs|prompts|tests|\.artifacts|\.agents)(\/|$)|\.md$/i.test(file)), false);
      const workPayloads = exportedFiles.filter((file) => /^work\/.*\.(html|txt)$/.test(file));
      for (const file of workPayloads) {
        assert.doesNotMatch(await readFile(resolve(outputDirectory, file), "utf8"),
          /Project content and access|portfolio-verification\/SKILL\.md|Details coming soon|Stack unconfirmed/i, file);
      }

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
        if (["stylesheet", "image", "font"].includes(request.resourceType())) {
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
          assert.deepEqual(links.filter((href) => href.startsWith("https://")), [...projectLinks[slug], linkedin], path);
          const mainLinks = await page.locator('main a[href^="https://"]').evaluateAll((anchors) =>
            anchors.map((anchor) => anchor.getAttribute("href")));
          assert.deepEqual(mainLinks, projectLinks[slug], path);
          assert.equal(await page.locator("main img").count(), 0, path);
        }
      }

      assert.equal((await page.reload()).status(), 200);
      await page.getByRole("navigation").getByRole("link", { name: "Contact" }).click();
      await page.waitForURL(`${site}/#contact`);
      assert.equal(await page.getByRole("heading", { name: "Roles starting January 2027" }).count(), 1);
      assert.equal(await page.locator("#contact a[href^='tel:']").count(), 0);
      assert.equal(await page.locator("#contact").count(), 1);
      assert.equal(await page.getByRole("contentinfo").getByRole("link", { name: "LinkedIn" }).getAttribute("href"), linkedin);

      await page.goto(site + "/");
      assert.equal(await page.locator("body").evaluate((body) => getComputedStyle(body).backgroundColor), "rgb(246, 245, 241)");
      await page.keyboard.press("Tab");
      assert.equal(await page.evaluate(() => document.activeElement.textContent), "Skip to content");
      await page.keyboard.press("Enter");
      assert.equal(await page.evaluate(() => document.activeElement.id), "main");
      const hero = page.getByRole("region", { name: "Stefan Penchev", exact: true });
      const workAction = hero.getByRole("link", { name: "View my work", exact: true });
      const contactAction = hero.getByRole("link", { name: "Get in touch", exact: true });
      assert.equal(await hero.getByRole("heading", { level: 1, name: "Stefan Penchev", exact: true }).count(), 1);
      assert.equal(await hero.getByText("Full-Stack & Backend Developer", { exact: true }).isVisible(), true);
      assert.equal(await hero.getByText("I build complete web applications and the systems behind them.", { exact: true }).isVisible(), true);
      assert.equal(await hero.getByText("Based in Luxembourg. On-site here, or remote across Europe.", { exact: true }).isVisible(), true);
      assert.equal(await hero.getByRole("link").count(), 2);
      assert.equal(await workAction.getAttribute("href"), "#selected-work");
      assert.equal(await contactAction.getAttribute("href"), "#contact");
      assert.equal(await page.locator("#selected-work").count(), 1);
      await page.keyboard.press("Tab");
      assert.equal(await workAction.evaluate((link) => {
        const style = getComputedStyle(link);
        return link === document.activeElement && link.matches(":focus-visible") &&
          style.outlineStyle === "solid" && style.outlineWidth === "2px" &&
          style.outlineColor === "rgb(37, 68, 199)" && style.outlineOffset === "4px";
      }), true);
      await page.keyboard.press("Enter");
      await page.waitForURL(`${site}/#selected-work`);
      assert.equal(await page.locator("#selected-work").evaluate((section) => section === document.activeElement), true);
      await contactAction.click();
      await page.waitForURL(`${site}/#contact`);

      const portrait = page.getByRole("img", { name: "Portrait of Stefan Penchev" });
      assert.equal(await portrait.getAttribute("src"), `${basePath}/images/stefan-penchev.png`);
      assert.equal(await portrait.evaluate((img) => img.naturalWidth), 800);
      assert.equal(await hero.locator("img").count(), 1);
      for (const [attribute, value] of [["width", "800"], ["height", "800"], ["loading", "eager"], ["fetchpriority", "high"], ["srcset", null]]) {
        assert.equal(await portrait.getAttribute(attribute), value, attribute);
      }
      for (const width of [360, 390, 768, 1024, 1440, 1920]) {
        await page.setViewportSize({ width, height: 900 });
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Homepage at ${width}px`);
        const { width: imageWidth, height: imageHeight } = await portrait.boundingBox();
        assert.equal(imageWidth, imageHeight);
        assert.ok(imageWidth <= 560);
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

      await checkNativeMenu(page, site, basePath);
      await checkFont(browser, site);
      await checkResponsiveShell(browser, site, basePath);
      await checkPortraitDelivery(browser, site);
      await checkWorkPresentation(page, site, basePath);
      assert.deepEqual(failures, []);
      if (!basePath && process.env.PORTFOLIO_SCREENSHOTS === "1") {
        await captureScreenshots(browser, site);
      }

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
        await enhancedPage.getByRole("link", { name: "Read project: ArtAICare", exact: true }).click();
        await enhancedPage.waitForURL(site + "/work/artaicare/");
        await enhancedPage.getByRole("heading", { name: "ArtAICare", exact: true }).waitFor();
        await enhancedPage.getByRole("link", { name: "Back to all projects" }).click();
        await enhancedPage.waitForURL(site + "/work/");
        await enhancedPage.getByRole("heading", { name: "Selected work", level: 1 }).waitFor();
        assert.deepEqual(scriptErrors, []);
      } finally {
        await enhancedPage.close();
      }
    });
  }
});

async function checkNativeMenu(page, site, basePath) {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(site + "/work/");
  const toggle = page.locator("summary");
  const menu = page.getByRole("navigation", { name: "Main navigation" });

  assert.equal(await menu.count(), 0);
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  assert.equal(await toggle.evaluate((element) => element === document.activeElement), true);
  await page.keyboard.press("Tab");
  const firstProject = page.getByRole("link", { name: "Read project: DTO Recruitment Platform", exact: true });
  assert.equal(await firstProject.evaluate((link) => link === document.activeElement), true);

  await toggle.focus();
  await page.keyboard.press("Space");
  assert.equal(await menu.count(), 1);
  assert.equal(await menu.getByRole("link", { name: "Work" }).getAttribute("aria-current"), "page");
  assert.equal(await menu.getByRole("link", { name: "CV" }).getAttribute("href"), `${basePath}/files/stefan-penchev-cv.pdf`);
  await page.keyboard.press("Enter");
  assert.equal(await menu.count(), 0);
  await page.keyboard.press("Enter");
  await menu.getByRole("link", { name: "Contact" }).click();
  await page.waitForURL(site + "/#contact");
  assert.equal(await menu.count(), 0);
  assert.equal(await page.locator("#contact").evaluate((element) => element === document.activeElement), true);
}

async function fontsUsedForHeading(page) {
  await page.evaluate(() => document.fonts.ready);
  const session = await page.context().newCDPSession(page);
  try {
    await session.send("DOM.enable");
    await session.send("CSS.enable");
    const { root } = await session.send("DOM.getDocument");
    const { nodeId } = await session.send("DOM.querySelector", { nodeId: root.nodeId, selector: "main h1" });
    return (await session.send("CSS.getPlatformFontsForNode", { nodeId })).fonts;
  } finally {
    await session.detach();
  }
}

async function checkFont(browser, site) {
  const page = await browser.newPage({ viewport: { width: 320, height: 800 } });
  const requests = [];
  page.on("request", (request) => {
    if (["font", "stylesheet"].includes(request.resourceType())) requests.push(request.url());
  });

  try {
    await page.goto(site + "/");
    const renderedFonts = await fontsUsedForHeading(page);
    assert.ok(renderedFonts.some(({ postScriptName, isCustomFont }) => isCustomFont && postScriptName.startsWith("Manrope-")));
    assert.ok(requests.every((url) => url.startsWith(site + "/")), requests.join(", "));
    const preload = page.locator('link[rel="preload"][as="font"]');
    assert.equal(await preload.count(), 1);
    const url = await preload.evaluate((link) => link.href);
    assert.ok(url.startsWith(site + "/_next/static/"), url);
    assert.ok(requests.includes(url), url);
    const response = await fetch(url);
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("content-type"), "font/woff2");
    assert.deepEqual(Buffer.from(await response.arrayBuffer()), await readFile("src/app/fonts/manrope-latin.woff2"));
    const license = await fetch(site + "/licenses/manrope-ofl.txt");
    assert.equal(license.status, 200);
    assert.equal(await license.text(), await readFile("public/licenses/manrope-ofl.txt", "utf8"));

    await page.route("**/*.woff2", (route) => route.abort());
    await page.reload();
    const fallbackFonts = await fontsUsedForHeading(page);
    assert.ok(fallbackFonts.length > 0 && fallbackFonts.every(({ isCustomFont }) => !isCustomFont));
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    assert.equal(await page.getByRole("heading", { name: "Stefan Penchev" }).isVisible(), true);
  } finally {
    await page.close();
  }
}

async function checkResponsiveShell(browser, site, basePath) {
  const page = await browser.newPage({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    reducedMotion: "reduce",
  });
  const menu = page.getByRole("navigation", { name: "Main navigation" });
  const toggle = page.locator("summary");
  const work = menu.getByRole("link", { name: "Work" });
  const about = menu.getByRole("link", { name: "About" });

  try {
    await page.goto(site + "/work/artaicare/");
    assert.ok(await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches));
    assert.equal(await menu.count(), 0);
    assert.ok((await toggle.boundingBox()).height >= 44);
    assert.equal(await toggle.innerText(), "Menu");
    await toggle.tap();
    assert.equal(await toggle.innerText(), "Close menu");
    assert.equal(await menu.count(), 1);
    await toggle.tap();
    assert.equal(await toggle.innerText(), "Menu");
    assert.equal(await menu.count(), 0);
    await toggle.tap();
    assert.equal(await work.getAttribute("aria-current"), null);
    assert.equal(await work.getAttribute("data-current-section"), "true");
    for (const link of await menu.getByRole("link").all()) {
      assert.ok((await link.boundingBox()).height >= 44);
    }
    await about.focus();
    await page.keyboard.press("Escape");
    assert.equal(await menu.count(), 0);
    assert.equal(await toggle.evaluate((element) => document.activeElement === element), true);
    assert.equal(await toggle.evaluate((element) => {
      const style = getComputedStyle(element);
      return element.matches(":focus-visible") &&
        style.outlineStyle === "solid" && style.outlineWidth === "2px" && style.outlineColor === "rgb(37, 68, 199)";
    }), true);

    await toggle.tap();
    await about.focus();
    await page.setViewportSize({ width: 768, height: 900 });
    await page.waitForFunction(() => document.activeElement?.matches(".desktop-nav a") &&
      !document.querySelector("details").open);
    assert.equal(await menu.count(), 1);
    assert.equal(await about.evaluate((link) => document.activeElement === link), true);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForFunction(() => document.activeElement?.matches("summary"));
    assert.equal(await menu.count(), 0);

    await toggle.tap();
    await about.tap();
    await page.waitForURL(site + "/about/");
    assert.equal(await menu.count(), 0);
    assert.equal(await toggle.evaluate((element) => document.activeElement === element), false);
    await toggle.tap();
    assert.equal(await about.getAttribute("aria-current"), "page");
    await page.goBack();
    await page.waitForURL(site + "/work/artaicare/");
    await page.waitForFunction(() => !document.querySelector("details").open);

    await toggle.tap();
    await menu.getByRole("link", { name: "Contact" }).tap();
    await page.waitForURL(site + "/#contact");
    assert.equal(await menu.count(), 0);
    assert.equal(await page.locator("#contact").count(), 1);
    await toggle.tap();
    assert.equal(await menu.getByRole("link", { name: "Contact" }).getAttribute("href"), `${basePath}/#contact`);
    await menu.getByRole("link", { name: "Contact" }).tap();
    assert.equal(await menu.count(), 0);

    const role = page.getByRole("link", { name: "Discuss a role" });
    const project = page.getByRole("link", { name: "Discuss a project" });
    assert.equal(await role.getAttribute("href"), "mailto:penchev.stefan@icloud.com?subject=Employment%20enquiry");
    assert.equal(await project.getAttribute("href"), "mailto:penchev.stefan@icloud.com?subject=Freelance%20project%20enquiry");
    assert.equal(await role.getAttribute("class"), await project.getAttribute("class"));
    assert.equal((await role.boundingBox()).height, (await project.boundingBox()).height);
    await role.focus();
    await page.keyboard.press("Tab");
    assert.equal(await project.evaluate((link) => link.matches(":focus-visible") &&
      getComputedStyle(link).outlineColor === "rgb(246, 245, 241)"), true);

    for (const [width, path] of [
      [320, "/"], [320, "/about/"], [320, "/work/dto-recruitment-platform/"], [360, "/work/"],
      [390, "/work/dto-company-website/"], [703, "/about/"], [704, "/about/"], [768, "/about/"], [1024, "/work/"],
      [1440, "/work/"], [1920, "/about/"],
    ]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(site + path);
      if (width < 704) await toggle.tap();
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${path} at ${width}px`);
      assert.equal(await menu.count(), 1);
    }
  } finally {
    await page.close();
  }
}

async function checkPortraitDelivery(browser, site) {
  const page = await browser.newPage({
    viewport: { width: 320, height: 640 },
    javaScriptEnabled: false,
    reducedMotion: "reduce",
  });
  const portraitUrl = site + "/images/stefan-penchev.png";
  const release = Promise.withResolvers();
  const imageRequests = [];
  page.on("request", (request) => {
    if (request.resourceType() === "image") imageRequests.push(request.url());
  });

  try {
    await page.route(portraitUrl, async (route) => {
      await release.promise;
      await route.continue();
    });
    await Promise.all([
      page.waitForRequest(portraitUrl),
      page.goto(site + "/", { waitUntil: "domcontentloaded" }),
    ]);
    const hero = page.getByRole("region", { name: "Stefan Penchev", exact: true });
    const portrait = hero.getByRole("img");
    const heading = hero.getByRole("heading", { level: 1 });
    const work = hero.getByRole("link", { name: "View my work" });
    const contact = hero.getByRole("link", { name: "Get in touch" });

    assert.equal(await portrait.evaluate((image) => image.complete), false);
    const reserved = await portrait.boundingBox();
    assert.ok(reserved.width > 0 && reserved.width === reserved.height);
    assert.ok((await contact.boundingBox()).y < reserved.y);
    assert.equal(await heading.isVisible(), true);
    assert.equal(await work.isVisible(), true);
    assert.equal(await contact.isVisible(), true);
    await work.click();
    await page.waitForURL(site + "/#selected-work", { waitUntil: "domcontentloaded" });

    release.resolve();
    await portrait.evaluate((image) => image.decode());
    const loaded = await portrait.boundingBox();
    assert.deepEqual([loaded.width, loaded.height], [reserved.width, reserved.height]);
    assert.deepEqual(imageRequests, [portraitUrl]);

    await page.unroute(portraitUrl);
    await page.route(portraitUrl, (route) => route.abort());
    await page.route("**/*.woff2", (route) => route.abort());
    await page.goto(site + "/");
    assert.equal(await portrait.evaluate((image) => image.naturalWidth), 0);
    const originalSize = await heading.evaluate((element) => parseFloat(getComputedStyle(element).fontSize));
    await page.evaluate(() => { document.documentElement.style.fontSize = "200%"; });
    assert.ok(await heading.evaluate((element, before) => parseFloat(getComputedStyle(element).fontSize) > before, originalSize));
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    const menuToggle = page.locator("summary");
    await menuToggle.click();
    const identityLink = page.getByRole("banner").getByRole("link", { name: "Stefan Penchev" });
    const identityBox = await identityLink.boundingBox();
    assert.ok((await menuToggle.boundingBox()).y >= identityBox.y + identityBox.height);
    await menuToggle.click();
    assert.equal(await heading.isVisible(), true);
    assert.equal(await work.isVisible(), true);
    await contact.click();
    await page.waitForURL(site + "/#contact");
  } finally {
    release.resolve();
    await page.close();
  }
}

async function checkWorkPresentation(page, site, basePath) {
  const tech = [
    "Angular, TypeScript, Rust, PostgreSQL, Redis, Docker, Makefile",
    "MongoDB, Express.js, React, Node.js, Python, Sentence-BERT, Nginx, Ubuntu, SSH",
    "Django",
    null,
    "Ollama, Retrieval-augmented generation",
  ];
  const accessActions = [null, "Platform sign-in", "Visit Skald Lab", "Visit website", null];

  for (const [path, level, entries] of [
    ["/", 3, workEntries.slice(0, 3)],
    ["/work/", 2, workEntries],
  ]) {
    await page.goto(site + path);
    const list = page.locator(".project-list");
    assert.deepEqual(await list.getByRole("heading", { level }).allTextContents(), entries.map(([, title]) => title));
    for (const [index, [slug, title, status, access]] of entries.entries()) {
      const row = list.getByRole("article").nth(index);
      assert.equal(await row.getByRole("link").count(), 1);
      const link = row.getByRole("link", { name: `Read project: ${title}`, exact: true });
      assert.equal(await link.getAttribute("href"), `${basePath}/work/${slug}/`);
      assert.equal(await row.getByText(status, { exact: true }).isVisible(), true);
      assert.equal(await row.getByText(access, { exact: true }).isVisible(), true);
      assert.ok((await link.boundingBox()).height >= 44);
    }
    assert.equal(await list.locator("img").count(), 0);
    if (path === "/") {
      await page.getByRole("link", { name: "View all projects" }).click();
      await page.waitForURL(site + "/work/");
    }
  }

  for (const [index, [slug, title, status, access]] of workEntries.entries()) {
    assert.equal((await page.goto(`${site}/work/${slug}/`)).status(), 200);
    assert.equal((await page.reload()).status(), 200);
    const main = page.getByRole("main");
    assert.equal(await main.getByRole("heading", { name: title, level: 1, exact: true }).count(), 1);
    assert.equal(await main.getByText(status, { exact: true }).isVisible(), true);
    assert.equal(await main.getByText(access, { exact: true }).isVisible(), true);
    assert.equal(await main.getByText("Source code", { exact: true }).count(), accessActions[index] ? 0 : 1);
    assert.deepEqual(await main.locator('a[href^="https://"]').allTextContents(), accessActions[index] ? [accessActions[index]] : []);
    assert.deepEqual(await main.getByRole("heading", { level: 2 }).allTextContents(), tech[index] ? ["My contribution", "Technologies"] : ["My contribution"]);
    if (tech[index]) assert.equal(await main.getByText(tech[index], { exact: true }).isVisible(), true);
    assert.equal(await main.getByRole("link", { name: "Back to work", exact: true }).getAttribute("href"), basePath + "/work/");
    assert.equal(await main.getByRole("link", { name: "Back to all projects", exact: true }).getAttribute("href"), basePath + "/work/");
    assert.equal(await main.locator("img, figure").count(), 0);
    assert.doesNotMatch(await main.innerText(), /TBD|Details coming soon|Stack unconfirmed/i);
    if (slug === "skald-lab-ops") {
      assert.equal(await main.getByText("The link opens the public workshop website. The operations system is internal.").isVisible(), true);
    }
    if (slug === "artaicare") {
      assert.equal(await main.getByText(/Collaborated with a separate developer/).isVisible(), true);
    }
  }

  for (const [width, height, path] of [
    [320, 640, "/work/"], [320, 640, "/work/artaicare/"],
    [390, 844, "/work/dto-company-website/"], [667, 375, "/work/"],
    [768, 900, "/work/"], [1920, 1080, "/work/skald-lab-ops/"],
  ]) {
    await page.setViewportSize({ width, height });
    await page.goto(site + path);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${path} at ${width}px`);
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(site + "/work/");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Enter");
  await page.keyboard.press("Tab");
  const firstProject = page.getByRole("link", { name: "Read project: DTO Recruitment Platform" });
  assert.ok(await firstProject.evaluate((link) => link === document.activeElement &&
    link.matches(":focus-visible") && getComputedStyle(link).outlineWidth === "2px"));
  await page.keyboard.press("Enter");
  await page.waitForURL(site + "/work/dto-recruitment-platform/");
  await page.getByRole("link", { name: "Back to work", exact: true }).click();
  await page.waitForURL(site + "/work/");
}

async function captureScreenshots(browser, site) {
  const dir = ".artifacts/part-2";
  await mkdir(dir, { recursive: true });
  const page = await browser.newPage();
  try {
    for (const [width, height] of [[390, 844], [1440, 1000]]) {
      await page.setViewportSize({ width, height });
      await page.goto(site + "/");
      await page.screenshot({ path: `${dir}/home-${width}.png` });
      await page.getByRole("contentinfo").screenshot({ path: `${dir}/footer-${width}.png` });
    }
    await page.goto(site + "/work/");
    await page.screenshot({ path: `${dir}/work-1440.png` });

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(site + "/about/");
    await page.screenshot({ path: `${dir}/about-390.png` });
    await page.locator("summary").click();
    await page.screenshot({ path: `${dir}/menu-open-390.png` });
  } finally {
    await page.close();
  }
}
