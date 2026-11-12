# Portfolio progress

## Part 1 — static foundation

The App Router renders the homepage, work index, five project overviews, About and a custom 404 at build time. The shared layout provides keyboard navigation, a skip link, focus styles, CV access and contact navigation. The homepage features the approved portrait, three projects, story, services, experience and equally weighted employment and freelance enquiries. Availability and project claims live in `src/content/`.

The export uses trailing slashes and writes to `out/`. Set `NEXT_PUBLIC_BASE_PATH` at build time for subpath hosting. Leave it empty for the domain root. Next Link handles internal navigation. `src/lib/assets.ts` handles the portrait and CV. At a subpath, mount the export at the configured prefix. Serve directory index files directly and use the exported `404.html` for missing paths with a 404 status.

The starter directory contained Git metadata by the time implementation began. The `main` branch had no commits, and `origin` was present by the final check. The approved files matched their original SHA-256 checksums after implementation.

## Part 1 runtime and checks

Tested with Node.js 24.15.0 and npm 11.12.1. The lockfile pins Next.js 16.4.6, React and React DOM 19.3.1, TypeScript 6.0.3, Tailwind CSS 4.3.5, ESLint 9.39.5, Vitest 5.1.0 and Playwright 1.65.0. The Next ESLint configuration includes plugins that currently declare compatibility through ESLint 9.

- `npm ci`, `npm run typecheck` and `npm run lint` passed. `npm test` passed 14 content and path checks. The local `npm run dev` homepage returned HTTP 200.
- `npm audit --omit=dev` reported zero findings. The full audit reported seven moderate findings in the TypeScript ESLint dependency chain, tracing to one minimatch advisory. The standard audit fix dry run proposed zero changes.
- `PLAYWRIGHT_CHANNEL=chrome npm run test:export` passed for the root and `/portfolio-preview`. Both `npm run build` runs were served by a file-only HTTP test server and checked in Google Chrome 157.0.8103.78. The checks covered direct routes, reload, 404, links, script and stylesheet delivery, byte-identical portrait and PDF, no-JavaScript keyboard navigation and homepage overflow from 360 to 1920 pixels. The suite leaves a root build in `out/`.

Reference setup follows the official [Next.js installation](https://nextjs.org/docs/app/getting-started/installation), [static exports](https://nextjs.org/docs/app/guides/static-exports), [base path](https://nextjs.org/docs/app/api-reference/config/next-config-js/basePath), [ESLint](https://nextjs.org/docs/app/api-reference/config/eslint) and [Tailwind CSS](https://tailwindcss.com/docs/installation/framework-guides/nextjs) guides.

## Part 2 — visual system and responsive shell

The [design system](design-system.md) records the shared CSS tokens, self-hosted Manrope and its license, header and footer behavior, and measured contrast. The root layout now uses `SiteHeader` and `SiteFooter`. The homepage contact section became the shared footer, with one `#contact` target per page and equal actions for roles and projects. Shared typography and link styles apply to every route. The original hero composition and typographic project covers remain in use, with the existing portrait column bounded to prevent desktop text from being squeezed.

### Verification

- `npm run typecheck` and `npm run lint` passed. `npm test` passed all 14 existing content and path tests.
- `PORTFOLIO_SCREENSHOTS=1 PLAYWRIGHT_CHANNEL=chrome npm run test:export` built and passed both static exports at `/` and `/portfolio-preview` in Google Chrome 157.0.8103.78. It exercised every route and the custom 404, project links and reload, both contact routes, and byte-identical portrait and PDF delivery. The suite now checks native keyboard disclosure without JavaScript, touch open and close, Escape and resize focus, route and history dismissal, current-page semantics, reduced motion, target heights, dark and light focus styles, and same-origin font loading and fallback.
- Reflow checks covered 320, 360, 390, 703, 704, 768, 1024, 1440 and 1920 CSS px across representative pages. At 320 px they included the long project title and the open mobile menu. A separate root-export check used Chrome’s native 200% page zoom in a temporary profile. The homepage, About and DTO recruitment overview stayed within the viewport with the menu open. The 1280 px viewport at 100% reflowed to 640 CSS px at 200%, with device pixel ratio increasing from 1 to 2.
- `git diff --check` passed. The approved portrait and CV checksums match Part 1. Dependency versions, the lockfile and static export configuration are preserved.
- The seven moderate lint-tooling findings are inherited from Part 1 and remain unresolved. No fresh audit was run. Chrome was the only browser exercised. Firefox, WebKit, screen readers and live third-party access were not tested. Neither requested skill was available through discovery or at its local skill path. This phase followed the detailed Part 2 prompt directly.

### Reviewed screenshots

All paths are relative to the repository root. Screenshots are ignored by Git and excluded from `out/`.

| View | Local path |
| --- | --- |
| Baseline home, 390 × 844 and 1440 × 1000 | `.artifacts/part-2/baseline-home-390.png`, `.artifacts/part-2/baseline-home-1440.png` |
| Updated home, 390 × 844 and 1440 × 1000 | `.artifacts/part-2/home-390.png`, `.artifacts/part-2/home-1440.png` |
| About and open menu, 390 × 844 | `.artifacts/part-2/about-390.png`, `.artifacts/part-2/menu-open-390.png` |
| Work, 1440 × 1000 | `.artifacts/part-2/work-1440.png` |
| Footer at 390 px and 1440 px | `.artifacts/part-2/footer-390.png`, `.artifacts/part-2/footer-1440.png` |
| DTO recruitment overview with menu open at native 200% zoom | `.artifacts/part-2/project-zoom-200.png` |

### Part 3 handover

Reuse Manrope, the shared container and type roles, the responsive header and the contact footer when composing the portrait-led opening. The approved portrait remains at its original path and intrinsic size. Approved project screenshots, permissions for private interfaces, deeper case-study evidence, the DTO company-site framework, the final domain and the public GitHub profile remain pending. A concrete Go or personal project is optional. Review availability and project status before eventual publication.
