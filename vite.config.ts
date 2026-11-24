import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { projects } from "./src/data/projects";
import { SITE_BASE_PATH, SITE_URL } from "./src/lib/site";

export default defineConfig({
  base: SITE_BASE_PATH,
  plugins: [
    tsconfigPaths(),
    tailwindcss(),
    tanstackStart({
      server: { entry: "server" },
      router: { basepath: SITE_BASE_PATH },
      // Enumerate from the approved content, including projects outside the featured gallery.
      pages: [{ path: "/" }, ...projects.map(({ slug }) => ({ path: `/work/${slug}/` }))],
      prerender: {
        enabled: true,
        autoSubfolderIndex: true,
        autoStaticPathsDiscovery: false,
        // Only render pages; do not crawl downloads such as the approved CV.
        crawlLinks: false,
        failOnError: true,
      },
      sitemap: { enabled: true, host: SITE_URL },
    }),
    react(),
  ],
});
