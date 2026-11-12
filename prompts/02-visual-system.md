# Part 2 — Visual system, navigation, and responsive shell

Implement Part 2 only in the existing portfolio repository. Build on the completed foundation; do not scaffold a replacement application.

## 1. Read, inspect, and preserve

Read `AGENTS.md`, `docs/progress.md`, `docs/portfolio-spec.md`, `docs/content-facts.md`, `docs/implementation-plan.md`, and applicable scoped instructions. Use `$portfolio-ui` and `$portfolio-verification`; if skill discovery is unavailable, read their local `.agents/skills/.../SKILL.md` files directly. Do not begin the portfolio-motion workflow.

Inspect git status, existing components/styles, package scripts, the lockfile, and the tests before editing. Reuse the structure and conventions that already work. Capture baseline homepage screenshots at 390px and 1440px if browser tools are available.

The previous handover reports successful type/lint/unit checks, static export tests at root and `/portfolio-preview`, no-JavaScript keyboard navigation, and byte-identical portrait/PDF delivery. These are the regression baseline, not results you may claim without running the relevant checks yourself.

Preserve the installed dependency versions and lockfile. Do not run an upgrade, forced audit fix, or framework migration as part of this visual task. Keep the seven previously reported moderate lint-tooling findings documented as unresolved unless a fresh report establishes otherwise; do not dismiss them or label the whole application secure. Distinguish inherited audit results from checks you run now.

Do not commit, push, deploy, alter git remotes, install external services or tooling bundles, or change approval settings. Read current official documentation when an API detail depends on the installed version.

## 2. Outcome and boundaries

Make the existing site feel like one deliberately designed personal portfolio through typography, spacing, navigation, reusable controls, and a shared footer.

The visual direction is confident, spacious, and editorial: warm stone, off-white, near-black, restrained deep blue, expressive type, fine separators, and broad flat surfaces. Do not copy the reference site's assets, exact composition, branded widgets, or wording. Avoid a SaaS dashboard, bento-grid template, terminal theme, glass cards, rainbow gradients, excessive pills, or a border/shadow around every paragraph.

Deliver the shared visual system, desktop/mobile navigation, responsive shell, accessible link/control states, and footer/contact paths. Apply shared styles to every existing route so the site is coherent.

Do NOT create the final oversized portrait hero, redesign the project showcase, expand project overviews into unsupported case studies, rewrite the personal story, add a blog, or implement scroll animation. Those belong to later phases. Keep the current portrait and hero content functional; inherited typography/spacing changes are expected, a new hero composition is not.

## 3. Centralised design tokens

Extend the existing token system rather than creating a competing stylesheet or parallel configuration. Use semantic CSS variables and the project's installed Tailwind conventions. Keep component-specific exceptions deliberate and minimal.

Use these starting colors from the specification:

| Purpose | Color |
| --- | --- |
| Warm stone surface | `#D9D7D2` |
| Paper/reading surface | `#F6F5F1` |
| Primary ink | `#191B1F` |
| Muted text on light surfaces | `#50545B` |
| Accent on suitable light surfaces | `#2544C7` |
| Dark footer surface | `#191B1F` |
| Primary text on dark | `#F6F5F1` |
| Secondary text on dark, subject to measurement | `#D9D7D2` |

Define additional semantic tokens for separators, focus rings, hover states, spacing, widths, type, and control dimensions where needed. Do not reuse the light-surface muted color or blue accent for small text on the dark footer without checking contrast. Decorative separators and essential control boundaries may need different colors.

Use a 4/8px spacing rhythm, fluid gutters approximately 24–72px, content width capped around 1440px, and reading copy around 60–70 characters. Typical section spacing should be about 56–88px on narrow screens and 88–144px on wider screens, adjusted to content. Do not insert empty viewport-height sections just to create whitespace.

Avoid fixed page widths, forced mobile viewport heights, and hiding horizontal overflow globally to conceal layout defects. Use grid/flex intrinsic sizing correctly; allow long links and labels to wrap.

## 4. Typography

Use **Manrope** as the first visual-system font choice: one family for headings, body, and navigation. This is our design choice, not a claim about the reference site's typeface. Retain a readable system sans fallback; use the existing system monospace only for occasional technical labels.

Obtain the font from a legitimate upstream or Google Fonts source, retain its supplied license/copyright notices, and record the source in `docs/design-system.md`. Do not fetch a proprietary reference font or pretend a local font file exists. Preserve necessary licensing notices in the distributed site assets without exposing internal project documents.

Prefer a minimal locally stored variable web-font asset loaded through `next/font/local`, using supported options for the installed Next.js version. Once acquired, the ordinary build must not need to redownload the font. No third-party font stylesheet or browser-time font request. Avoid downloading a large font bundle or adding a dependency solely for this family.

If the environment cannot obtain the legitimate asset, keep the system fallback, finish the other work, and report typography as pending. Do not silently select a different display font or claim Manrope is installed.

Establish reusable text roles: display/page heading, section heading, lead, body, caption/metadata, and navigation/control. Use rem-based fluid sizes with reasonable minimums. Starting targets: body 16px on narrow screens and 18px on desktop, line-height about 1.55–1.65; page headings roughly 40–80px depending on space. Reserve the much larger name treatment for Part 3. Do not make every heading huge, excessively tight, or all-capitals. Avoid synthetic weights outside the loaded font's support.

Check actual font loading, wrapping, fallback behavior, and export paths, not just the declared CSS font-family.

## 5. Shared layout and controls

Refine existing components where practical. Introduce only reusable primitives needed by actual pages: a container, section spacing, page/section heading treatment, text link, action link, and shared navigation/footer are sufficient. Do not add a component framework, Storybook, a public style-guide route, or speculative abstraction layers.

Preserve semantic headings and landmarks. Keep content rendered in the exported HTML; isolate client code to behavior that needs it. Do not put `use client` on the entire root layout.

Use links for navigation/download/contact and buttons only for actions. Do not turn every link into a pill. Give text links a visible non-color-only affordance where needed, and all interactive controls clear hover/focus/active states. Make touch targets comfortably sized, aiming for 44px where practical without distorting inline prose.

Use only brief CSS state transitions if useful. No GSAP, scroll library, custom cursor, magnetic behavior, marquee, page-transition gate, initial opacity-zero content, or hover-only essential information. Honor reduced motion for any transitions introduced.

## 6. Header and navigation

Desktop: a restrained identity link labelled “Stefan Penchev” on the left, and Work, About, CV, and Contact on the right. Use the shared content width and gutters. Keep the header in normal document flow in this phase; no auto-hiding, scroll-reactive, or fixed overlay navigation.

Preserve the existing correct destinations and path helper behavior. Contact on internal pages must reach the homepage contact anchor under both deployment configurations. CV opens the supplied PDF. Reflect the current page accurately; the Work parent may receive section styling on a project page, but do not falsely label it as the exact current page.

Mobile: implement a deliberate in-flow disclosure navigation, not a full-screen animated modal. Prefer native `details`/`summary`, or retain an already-tested equivalent that provides a genuine no-JavaScript navigation path. Use a visible “Menu”/“Close menu” affordance, spacious readable links, and clear open/closed states.

Requirements:
- Keyboard and touch can open and close it; hidden links are not tabbable.
- With enhancement available, Escape closes it and restores focus to its toggle.
- Navigation activation closes it without blocking ordinary link behavior or stealing focus after navigating.
- Do not trap focus, mark the rest of the page inert, or lock body scrolling for this non-modal pattern.
- Do not apply ARIA `menu`/`menuitem` roles to ordinary site links.
- Desktop and mobile variants must not create duplicate exposed navigation or duplicate IDs.
- Resize and route changes must not leave an invisible focused control or stranded open state.
- Essential links remain operable without JavaScript. Add only ARIA that the chosen semantics require.

Use a breakpoint determined by the real label widths, not by hiding links until they happen to fit. Preserve the skip link and its actual focus destination.

## 7. Shared footer and equal contact paths

Create a near-black footer with warm light text, generous spacing, and a clear contact hierarchy. Suggested nonfactual heading: “Let's build something useful.” It can be refined for fit without rewriting career claims.

Keep two equally prominent actions: **Discuss a role** and **Discuss a project**. Use the same visual treatment and comparable space, stacked on narrow screens. Both can use the existing email with different encoded subject lines. Keep the email address and LinkedIn available as ordinary links; no clipboard-only or form-only contact.

Reuse the typed content for availability and working preferences. Preserve “Roles starting January 2027” and scope-dependent freelance wording; do not auto-update availability or advertise two guaranteed slots. Preserve Luxembourg/on-site and Europe/remote preferences without claiming work authorisation.

No phone number in the website contact section, no inferred GitHub/profile/domain, and no blog links, newsletter, contact form, or decorative live clock.

Integrate with the current homepage contact section rather than rendering two large duplicate contact blocks. Keep the existing `#contact` target unique and valid. Internal pages should have a useful footer while preserving the specified homepage Contact destination. Let long email/link text wrap without shrinking it to unreadable sizes.

## 8. Preserve the content and static-hosting contract

Keep all routes, typed content, project statuses, and approved links intact. No invented screenshots, architecture diagrams, metrics, source links, or skills claims. Do not render private project links as disabled demo buttons.

Preserve static export, trailing-slash routing, root and `/portfolio-preview` builds, the custom 404, centralised public asset handling, and absent domain/profile metadata. Do not change the tested routing architecture just to style navigation.

Keep `public/images/stefan-penchev.png` and `public/files/stefan-penchev-cv.pdf` byte-identical. Do not upscale or retouch the portrait, or edit the PDF. Do not publish planning documents, screenshots of internal tooling, tests, prompts, or skills in `out/`.

## 9. Verification and visual evidence

Use the commands actually present in `package.json`. Run type checking, linting, unit tests, and the existing export checks. The previous report used `PLAYWRIGHT_CHANNEL=chrome npm run test:export`; inspect and reuse it if it remains applicable. Do not weaken assertions or remove tests to make styling pass.

Serve the actual export on the existing file-only server without an SPA fallback. Recheck root and prefixed routes, direct project entry/reload, 404 behavior, CV/portrait bytes, contact anchors, and navigation. Extend tests to cover the added font assets, mobile menu states, Escape/focus behavior, and lack of third-party font requests.

Inspect shared layout at widths 360, 390, 768, 1024, 1440, and 1920px, with representative pages rather than every page at every size. Also check 200% browser zoom and reflow at 320 CSS pixels. Test keyboard, touch-sized controls, JavaScript-disabled navigation, reduced motion, long text, and an open mobile menu. Preserve all-route smoke tests.

Measure actual text/background combinations: at least 4.5:1 for normal text, 3:1 for qualifying large text, and 3:1 for required non-text control/state cues. Use visible focus treatments on both light and dark surfaces. Record the tested pairs and results rather than assuming the palette passes. Do not describe these checks as a complete accessibility certification.

Capture and inspect actual screenshots outside the public export. Suggested evidence: homepage at 1440px and 390px, mobile menu open at 390px, work index at 1440px, About or a project overview at 390px, and the footer at desktop/mobile widths. Use a local ignored artifacts directory consistent with the repository. Fix visible problems before the handover. Never use a mockup in place of an application screenshot.

Use available browsers; report browser names and versions when possible. Do not claim Firefox/WebKit coverage from Chrome alone or silently install a new toolchain. If browser/network access blocks a required check, record NOT RUN with the reason and leave that acceptance item pending.

## 10. Documentation and stopping point

Create/update `docs/design-system.md` with the real tokens, font provenance/license handling, spacing/type roles, mobile-menu behavior, measured contrast pairs, and any departures from the starting values. Link it from existing instructions/specification as appropriate without replacing approved source documents.

Update `docs/progress.md` with changed components, actual commands/results, screenshot paths and viewports, remaining audit/browser/font limitations, and what Part 3 can reuse. Keep the distinction between previous reported results and new verification.

End with a concise handover: changes made; checks passed/failed/not run; screenshots reviewed; unresolved issues; readiness for the portrait-led opening. Do not call Part 2 fully verified if required checks were not run.

Stop after Part 2. Do not start the final hero, project redesign, coordinated motion, or deployment automatically.

## Official references for implementation details

Checked 12 November 2026; use documentation appropriate to installed versions.

- Next.js local/self-hosted fonts: https://nextjs.org/docs/app/getting-started/fonts
- Manrope source and supplied license: https://github.com/google/fonts/tree/main/ofl/manrope
- Native disclosure element: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details
- WAI disclosure-navigation guidance (illustrative, not a drop-in production component): https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/
- Text contrast: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
- Non-text contrast: https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html
