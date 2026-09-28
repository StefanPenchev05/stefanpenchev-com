import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { site } from "./src/data/profile.ts";
const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
export default defineConfig({
  plugins: [
    react(),
    {
      name: "portfolio-metadata",
      transformIndexHtml(html) {
        return html
          .replaceAll("__PORTFOLIO_TITLE__", escapeHtml(site.title))
          .replaceAll(
            "__PORTFOLIO_DESCRIPTION__",
            escapeHtml(site.description),
          );
      },
    },
  ],
});
