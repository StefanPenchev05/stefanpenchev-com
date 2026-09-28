import { build } from "vite";
import { gzipSync } from "node:zlib";
const groups = (id) =>
  id.includes("/node_modules/three/")
    ? "Three.js"
    : /\/(?:@react-three|three-stdlib|troika[^/]*|meshline|camera-controls)\//.test(
          id,
        )
      ? "3D ecosystem"
      : /\/node_modules\/react(?:-dom|-reconciler)?\//.test(id) ||
          id.includes("/scheduler/")
        ? "React / renderers"
        : /\/react-router(?:-dom)?\//.test(id)
          ? "React Router"
          : id.includes("/gsap/")
            ? "GSAP"
            : id.includes("/node_modules/")
              ? "Other dependencies"
              : "Application";
await build({
  logLevel: "error",
  build: { write: false },
  plugins: [
    {
      name: "portfolio-bundle-report",
      generateBundle(_, bundle) {
        const report = Object.values(bundle)
          .filter((item) => item.type === "chunk")
          .map((chunk) => {
            const modules = {};
            for (const [id, info] of Object.entries(chunk.modules)) {
              const group = groups(id);
              modules[group] = (modules[group] || 0) + info.renderedLength;
            }
            return {
              file: chunk.fileName,
              entry: chunk.isEntry,
              imports: chunk.imports,
              dynamicImports: chunk.dynamicImports,
              bytes: Buffer.byteLength(chunk.code),
              gzipBytes: gzipSync(chunk.code).length,
              moduleRenderedBytes: modules,
            };
          });
        process.stdout.write(JSON.stringify(report, null, 2) + "\n");
      },
    },
  ],
});
