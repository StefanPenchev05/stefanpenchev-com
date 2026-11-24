import { createServer } from "node:http";
import { access, readFile, stat } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { SITE_BASE_PATH } from "../src/lib/site.ts";

const root = fileURLToPath(new URL("../dist/client/", import.meta.url));
const port = Number(process.env.PORT ?? 4173);
const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".pdf": "application/pdf",
  ".woff2": "font/woff2",
};

try {
  await access(resolve(root, "index.html"));
} catch {
  console.error("Static build not found. Run npm run build first.");
  process.exit(1);
}

// Serve only exported files, with directory indexes and real 404s (no SSR/SPA fallback).
const server = createServer(async (request, response) => {
  try {
    if (request.method !== "GET" && request.method !== "HEAD") {
      response.writeHead(405, { Allow: "GET, HEAD" }).end();
      return;
    }
    const url = new URL(request.url, "http://localhost");
    const pathname = decodeURIComponent(url.pathname);
    if (pathname === "/" || pathname === SITE_BASE_PATH.slice(0, -1)) {
      response.writeHead(302, { Location: `${SITE_BASE_PATH}${url.search}` }).end();
      return;
    }
    if (!pathname.startsWith(SITE_BASE_PATH)) {
      response.writeHead(404).end("Not found");
      return;
    }
    let filename = resolve(root, pathname.slice(SITE_BASE_PATH.length));
    const directory = resolve(root);
    if (filename !== directory && !filename.startsWith(directory + sep)) {
      response.writeHead(404).end("Not found");
      return;
    }
    if ((await stat(filename)).isDirectory()) {
      if (!url.pathname.endsWith("/")) {
        response.writeHead(301, { Location: `${url.pathname}/${url.search}` }).end();
        return;
      }
      filename = resolve(filename, "index.html");
    }
    const body = await readFile(filename);
    response.writeHead(200, {
      "Content-Type": contentTypes[extname(filename)] ?? "application/octet-stream",
      "Content-Length": body.length,
      "Cache-Control": "no-cache",
    });
    response.end(request.method === "HEAD" ? undefined : body);
  } catch (error) {
    if (error instanceof URIError) response.writeHead(400).end("Bad request");
    else if (error.code === "ENOENT" || error.code === "ENOTDIR") {
      response.writeHead(404).end("Not found");
    } else {
      console.error(error);
      response.writeHead(500).end("Unable to read the static file");
    }
  }
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Static preview: http://127.0.0.1:${port}${SITE_BASE_PATH}`);
});
