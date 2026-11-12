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

## Part 3 — portrait-led opening

`src/components/home-hero.tsx` renders the approved copy, one oversized name heading, the original portrait and the work and contact links. `src/app/page.tsx` integrates it with the existing Selected work section and makes the work anchor a keyboard focus destination. `src/app/globals.css` defines the responsive composition using the existing palette and typography. The desktop portrait sits on the section baseline, and narrow layouts put both links before the portrait. The short landscape layout keeps the display size and fits the two names on one line when space permits.

Visual review corrected single-word line endings and tightened the short landscape layout. The enlarged-text check also exposed two inherited shell constraints. The mobile toggle now gets its own row when the header container is under 16 rem, and the two footer actions can contract with their column. The navigation and footer keep their existing semantics, links and ordinary-width layout.

Neither `.agents/skills/portfolio-ui/SKILL.md` nor `.agents/skills/portfolio-verification/SKILL.md` existed in the repository. No skill content was used. This phase followed the complete workflow in the Part 3 prompt.

### Verification

- **PASS** — `npm run typecheck`, `npm run lint`, `npm test` (14 tests) and `git diff --check`.
- **PASS** — `PLAYWRIGHT_CHANNEL=chrome npm run test:export` in Chrome 157.0.8103.78. Both `npm run build` variants passed the file-only server suite at root and `/portfolio-preview`. Existing route, reload, 404, asset, navigation and font checks passed. New assertions cover the exported heading and approved copy, keyboard focus and both hash links, one eager high-priority portrait at the exact static URL, intrinsic dimensions and the absence of a responsive optimizer URL.
- **PASS** — At 320 CSS px with JavaScript disabled and reduced motion, a held portrait request left the work action operable and reserved a square box that kept the same dimensions after decode. A second run blocked both the portrait and font. With doubled root text, the name grew and the page reflowed without horizontal scrolling. The native menu and contact action remained operable.
- **PASS** — Native Chrome 200% page zoom on the root export. The 1280 × 813 CSS viewport at 100% became 640 × 406 at 200%, with DPR increasing from 1 to 2. The displayed name increased from about 131 to 160 device px and the role from 22 to about 40 device px. The mobile menu opened, Escape restored focus, and the work link reached Selected work without horizontal overflow.
- **PASS** — Portrait and CV SHA-256 hashes match Parts 1 and 2. The lockfile, dependency versions, font, content model and static-export configuration are preserved.
- **NOT RUN** — Firefox and Playwright WebKit binaries were absent. Safari 27.0.1 WebDriver declined the session because Allow remote automation is off. No browser settings were changed to enable it. Screen-reader validation and a fresh tooling audit were not run. The seven moderate lint-tooling findings remain inherited and unresolved.

### Reviewed screenshots

All paths are inside the ignored `.artifacts/part-3/` directory. Baselines were captured and inspected before editing. The images listed below were opened and reviewed after the final build, including the transition to Selected work, the portrait baseline, the name and copy, and menu and fallback focus states.

| Screenshot | Viewport and conditions |
| --- | --- |
| `baseline-home-390.png`, `baseline-home-1440.png` | 390 × 844 and 1440 × 1000, DPR 1 |
| `home-390.png`, `home-390-full.png` | 390 × 844, DPR 1, initial and full page |
| `home-1440.png`, `home-1440-full.png` | 1440 × 1000, DPR 1, initial and full page |
| `home-320.png`, `home-360.png`, `home-768.png` | 320 × 640, 360 × 800 and 768 × 900, DPR 1 |
| `home-1024.png`, `home-1920.png` | 1024 × 768 and 1920 × 1080, DPR 1 |
| `home-short-1366.png`, `home-landscape-667.png` | 1366 × 520 and 667 × 375, DPR 1 |
| `menu-open-390.png`, `about-390.png` | 390 × 844, DPR 1, open homepage menu and shared-shell smoke check |
| `fallback-390-no-js.png` | 390 × 844, DPR 1, JavaScript off, reduced motion, font and portrait blocked, work link focused |
| `home-zoom-200.png` | Native Chrome 200%, 640 × 406 CSS px, DPR 2, focus returned to menu |
| `home-1440-dpr2.png` | 1440 × 1000 CSS px, DPR 2, original portrait reviewed at its maximum 560 CSS px display size |

### Part 4 handover

The opening and Selected work anchor are ready for the project-presentation phase. The existing project layouts and verified access labels remain in place. The 800 px portrait limits fine detail on high-density desktop displays. A higher-resolution portrait is optional and would require an approved source.
