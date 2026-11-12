# Portfolio progress

## Part 1 — static foundation

The App Router renders the homepage, work index, five project overviews, About and a custom 404 at build time. The shared layout provides keyboard navigation, a skip link, focus styles, CV access and contact navigation. The homepage features the approved portrait, three projects, story, services, experience and equally weighted employment and freelance enquiries. Availability and project claims live in `src/content/`.

The export uses trailing slashes and writes to `out/`. Set `NEXT_PUBLIC_BASE_PATH` at build time for subpath hosting. Leave it empty for the domain root. Next Link handles internal navigation. `src/lib/assets.ts` handles the portrait and CV. At a subpath, mount the export at the configured prefix. Serve directory index files directly and use the exported `404.html` for missing paths with a 404 status.

The starter directory contained Git metadata by the time implementation began. The `main` branch had no commits, and `origin` was present by the final check. The approved files matched their original SHA-256 checksums after implementation.

## Runtime and checks

Tested with Node.js 24.15.0 and npm 11.12.1. The lockfile pins Next.js 16.4.6, React and React DOM 19.3.1, TypeScript 6.0.3, Tailwind CSS 4.3.5, ESLint 9.39.5, Vitest 5.1.0 and Playwright 1.65.0. The Next ESLint configuration includes plugins that currently declare compatibility through ESLint 9.

- `npm ci`, `npm run typecheck` and `npm run lint` passed. `npm test` passed 14 content and path checks. The local `npm run dev` homepage returned HTTP 200.
- `npm audit --omit=dev` reported zero findings. The full audit reported seven moderate findings in the TypeScript ESLint dependency chain, tracing to one minimatch advisory. The standard audit fix dry run proposed zero changes.
- `PLAYWRIGHT_CHANNEL=chrome npm run test:export` passed for the root and `/portfolio-preview`. Both `npm run build` runs were served by a file-only HTTP test server and checked in Google Chrome 157.0.8103.78. The checks covered direct routes, reload, 404, links, script and stylesheet delivery, byte-identical portrait and PDF, no-JavaScript keyboard navigation and homepage overflow from 360 to 1920 pixels. The suite leaves a root build in `out/`.

Reference setup follows the official [Next.js installation](https://nextjs.org/docs/app/getting-started/installation), [static exports](https://nextjs.org/docs/app/guides/static-exports), [base path](https://nextjs.org/docs/app/api-reference/config/next-config-js/basePath), [ESLint](https://nextjs.org/docs/app/api-reference/config/eslint) and [Tailwind CSS](https://tailwindcss.com/docs/installation/framework-guides/nextjs) guides.

## Part 2 handover

Start with the existing routes and shared layout to refine typography, navigation and responsive spacing. Typographic covers currently stand in for project media. Approved screenshots, permissions for private interfaces, deeper case-study evidence, the DTO company-site framework, the final domain and the public GitHub profile remain pending. A concrete Go or personal project is optional. Review availability and project status before eventual publication.

External destinations are asserted against the supplied URLs. This stage does not establish live access to third-party products. Broader accessibility, zoom and cross-browser testing remain later-stage work. Publication and remotes were untouched.
