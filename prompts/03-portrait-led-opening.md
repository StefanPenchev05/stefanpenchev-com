# Part 3 — Portrait-led opening

Continue in the existing portfolio repository. Implement the homepage's portrait-and-name composition and its transition into the existing content. This is the static visual composition phase, not the motion phase.

## 1. Inspect the implemented foundation

Read the repository's `AGENTS.md`, the latest Part 2 entry in `docs/progress.md`, and `docs/design-system.md`. Consult the hero/layout sections of `docs/portfolio-spec.md` and the identity/contact facts in `docs/content-facts.md`. Follow applicable scoped instructions. Do not reread or rewrite the CV to obtain facts already established in those documents.

Inspect git status, the existing homepage, header, shared layout, portrait component, styles, package scripts, and relevant tests. Preserve unrelated changes. Capture and inspect baseline homepage screenshots at approximately 390px and 1440px using the existing browser setup before editing.

The Part 2 handover reports self-hosted Manrope, responsive tokens, an accessible no-JavaScript mobile menu, equal employment/freelance contact paths, 14 passing unit tests, and root/prefixed static-export checks in Chrome. These are reported regression baselines, not new results you may claim without rerunning checks. Firefox, WebKit, and screen-reader validation were not performed. Seven inherited lint-tooling audit findings remain documented.

Preserve installed dependency versions, lockfile, export configuration, existing routes, font assets/licensing, and approved content. Do not upgrade dependencies, force an audit fix, scaffold a replacement app, commit, push, deploy, change git remotes, or alter approval settings. This phase should not require a new dependency.

## 2. Resolve the skill ambiguity without blocking the work

The previous report said the requested skills were unavailable. Check these exact repository-relative paths:

- `.agents/skills/portfolio-ui/SKILL.md`
- `.agents/skills/portfolio-verification/SKILL.md`

If they exist, read them directly even when the skill selector does not expose them. Use registered skills if available. If discovery fails, distinguish that from a missing or unreadable file. Record paths and actual findings; do not claim an unverified cause.

If the files do not exist, do not invent their contents or install a third-party replacement. Continue with the complete workflow in this prompt: inspect the existing implementation, compose with the supplied assets and tokens, build a semantic responsive layout, review actual rendered screenshots, run the regression checks, and document limitations. Do not change global Codex configuration, install plugins/MCP servers, or spend this phase repairing unrelated tooling. Do not begin `portfolio-motion`.

## 3. Intended result and exact content

Create an expressive opening that feels composed around Stefan's portrait and name, rather than a small headshot beside a generic introduction. The existing warm-stone, paper, ink, and blue visual system remains in force. Use the actual measured tokens from Part 2; do not establish a competing palette or font family.

Use this content, sourced from the existing brief:

| Element | Copy |
| --- | --- |
| Main heading | Stefan Penchev |
| Role | Full-Stack & Backend Developer |
| Introduction | I build complete web applications and the systems behind them. |
| Location/work preference | Based in Luxembourg. On-site here, or remote across Europe. |
| Main action | View my work |
| Secondary action | Get in touch |

Use the existing typed content model where practical. Avoid separate hard-coded copies of identity and contact information. The name is the homepage's single `h1`; the role is a visible supporting statement, not a second `h1`.

“View my work” should reach the existing selected-work section using its actual unique anchor. If the current homepage has no such section, link to the existing `/work/` route instead of inventing a target. “Get in touch” should reach the established `#contact` section. Reuse the current route/base-path helpers and ordinary link behavior. The header already provides CV access; do not add a third large hero action merely to repeat it.

Keep employment availability and freelance capacity in the existing contact content. Do not add a new “available now” badge, countdown, invented GitHub link, technology-logo wall, or a list of every service. Preserve January 2027 employment wording where it already appears. A shared contact action in the hero does not replace the two equally prominent enquiry paths in the footer.

## 4. Wide-screen art direction

Treat the opening as one broad, flat warm-stone composition, not two framed cards. Keep the portrait in its original color with its transparent silhouette. No circular avatar, rounded image card, heavy shadow, artificial background, or stock illustration.

Starting composition at a typical 1440px-wide desktop:

- Make the name the dominant typographic element. Begin with two deliberately stacked words, “Stefan” and “Penchev,” rather than tiny name text above a generic slogan. Use the existing Manrope family, an expressive display scale, and a medium or semibold weight chosen through rendering rather than automatically using the heaviest weight.
- Position the name and concise professional information toward the left and the large portrait toward the centre/right. Use an asymmetric grid and shared alignment, not equal boxed columns. The unframed photograph and large lettering should feel like parts of the same surface.
- Start the desktop name around 7–10rem where the actual available width permits it. Treat that as a composition target, not a fixed size that may clip. Use rem-aware fluid sizing and the actual font metrics. The surname must fit at ordinary text settings without being horizontally compressed or truncated.
- Start the portrait around 480–600 CSS pixels wide, with a sensible maximum no greater than roughly 640px for this supplied source. Assess the rendered quality rather than scaling to fill every remaining pixel. At 1920px, expand surrounding space within the established content-width cap instead of continually enlarging the photograph.
- Preserve the face, hair, and glasses. Do not place type or controls across the face. Keep the entire name visually readable. Do not force text/photo overlap; a convincing static composition matters more than an overlap effect. If a small intersection below the face improves the design, all text and controls must remain readable on every background they cross. Prefer separation over elaborate masks or contrast tricks.
- Use existing paragraph and control styles for the role, introduction, location line, and two actions. They should be easy to find without competing with the name. Keep the copy brief and aligned to the composition.
- Align the photograph's existing lower crop intentionally to the hero's lower edge or an internal baseline, so the chest-up cutout does not appear to float inside a card. Do not invent missing torso or body parts.

Preserve the header's normal-flow behavior. A small homepage-only surface adjustment may join header and hero into a continuous stage, but do not redesign the navigation or alter internal-page header behavior. If an established header separator remains, keep the relationship deliberate. The mobile disclosure must still push content naturally rather than cover it.

Use content-driven height. Do not introduce fixed `100vh` height, pinned sections, blank viewport spacers, or a hard maximum height that clips content. Aim for a substantial opening on a normal laptop screen, not several empty screens before the work. Short desktop windows must scroll normally.

## 5. Tablet and mobile are separate compositions

Choose layout breakpoints from the actual name, copy, portrait, and menu fit. Do not wait for elements to collide merely to preserve the desktop arrangement.

On narrow screens:

- Use a single, coherent reading sequence: name, role, introduction, location, actions, then portrait. The visitor should reach a Work action before scrolling past a large photograph.
- Keep the name large, normally wrapping between first and last name. Start approximately in the 3.25–5.5rem range as available space permits, and adjust after actual screenshots. Do not hard-code line breaks into body sentences.
- Keep the portrait a substantial part of the opening, within the content width and at its original aspect ratio. Do not crop away the hair or face to force a one-screen hero.
- Let actions wrap or stack comfortably. Keep visible focus rings and existing touch-target treatment. Do not shrink body text or hide the location/role to make the layout fit.
- Permit natural document height. On a small phone the hero may exceed one viewport; that is preferable to clipped text or a distorted portrait.

At 320 CSS pixels and enlarged text, retain all content and functionality without horizontal page scrolling. Prefer breaks between names at normal sizes; permit an emergency text wrap at extreme text settings rather than truncation. Do not shrink the whole page with transforms, disable zoom, or hide page overflow to conceal layout defects. Check that responsive typography still enlarges meaningfully with browser/text zoom rather than cancelling the user's setting.

Use a logical DOM reading/focus order at every width. Do not duplicate desktop/mobile headings or images and toggle them to simulate responsive design. A single composition can change its layout with CSS.

## 6. Portrait, image delivery, and first render

The approved source is `public/images/stefan-penchev.png`: an 800 × 800 RGBA PNG with transparency. Keep it byte-identical, along with `public/files/stefan-penchev-cv.pdf`.

Use the supplied portrait only. Do not regenerate, retouch, crop the source file, upscale, recolor, blur skin, remove glasses, or use CSS stretching. No derivative-image pipeline is needed in this phase. Allow a future higher-resolution source to replace it without redesigning the component, but record any current high-density sharpness limitation honestly.

Reuse the existing static-compatible image abstraction. Preserve intrinsic dimensions/aspect-ratio space before loading; CSS should control the displayed size without distortion. Use a concise informative alternative such as “Portrait of Stefan Penchev.” Render one real image, not a CSS background or canvas-based duplicate.

The primary hero portrait must not be lazy-loaded or revealed only after hydration. With the installed Next.js API, prefer a deliberate eager/high-fetch-priority treatment for this single image rather than stacking manual preloads, deprecated properties, and multiple image instances. Verify emitted HTML and actual network behavior. Keep the existing unoptimized/static delivery path: no dependency on `/_next/image` or a running image-optimization server. Preserve the base-path helper.

The text and actions must be visible on first render, with JavaScript disabled, when the image is delayed/blocked, and when the font falls back. Do not set the hero to `opacity: 0` in anticipation of a future animation. Avoid unnecessary client code just to measure text or the viewport. No new `use client` boundary is required for a static hero unless a specific existing component genuinely needs it.

## 7. Integration and scope boundaries

Create or refine a focused homepage hero component using the existing conventions. Extend the display-type/hero layout tokens only where needed; do not alter all page headings to match the hero's scale. Preserve the work index, five project overviews, About page, 404, footer, and all confirmed content.

Create a clean boundary into the existing next section using spacing or the established paper surface. Do not leave a large duplicate introductory block saying the same thing twice. A local removal of redundant hero text is acceptable; rewriting the full story, restructuring projects, or removing genuine information is not.

Motion belongs to Part 6. Do not add GSAP, Lenis, ScrollTrigger, a marquee, parallax, scroll pinning, smooth-scroll interception, custom cursor, magnetic buttons, entrance animations, or a loading screen. Keep ordinary hover/focus transitions from Part 2 and their reduced-motion behavior. Do not preinstall an animation dependency or speculative animation scaffolding.

Do not publish the planning documents, skills, tests, screenshots, or prompts in the static export. Do not change project access labels, claim new achievements, or fabricate screenshots to make the page more visually complete.

## 8. Verification: layout evidence plus regression checks

Use actual scripts from `package.json`. Run type checking, linting, unit tests, and the root and `/portfolio-preview` export checks. Reuse `PLAYWRIGHT_CHANNEL=chrome npm run test:export` only if it remains the documented command. Preserve existing assertions and extend coverage where the new hero requires it; do not assert that there must always be exactly 14 tests.

Verify on the file-only static server, not only the development server:

- Direct entry/reload, homepage actions, contact anchors, navigation, CV, all project routes, and true 404 behavior still work under both base paths.
- The name has one accessible main heading; its text is readable in exported HTML. Hero actions are real links with correct destinations and visible keyboard focus.
- The portrait is delivered from the correct static path, has intrinsic dimensions, is not lazy-loaded, does not request a runtime optimizer, and is not duplicated into separately loaded desktop/mobile versions. Keep the original asset/PDF byte checks.
- The mobile menu's no-JavaScript path, Escape/focus handling, resize behavior, and unobstructed links survive the changed hero. Decorative layers cannot intercept its controls or the skip link.
- Existing fonts and fallback still work. Hero name/body/control contrast must meet the existing project's measured thresholds; check any new text/image intersection rather than assuming the old flat-background measurements cover it.

Visually inspect the affected homepage at 320, 360, 390, 768, 1024, 1440, and 1920 CSS-pixel widths. Use a normal laptop viewport, a short desktop window, and a small-phone landscape check. Avoid an exhaustive all-route/all-viewport screenshot matrix; smoke-check at least one other route for shared-style regressions.

Test actual 200% browser zoom, reduced motion, JavaScript disabled, and blocked/delayed portrait and font requests. A 320px viewport checks reflow but is not a substitute for browser zoom. Inspect normal and high device-pixel-ratio portrait rendering where tooling permits. Do not claim optical sharpness merely because the source request succeeded.

Capture and open actual screenshots, adjusting the layout to fix visible defects before handover. Use the existing ignored artifacts convention, preferably `.artifacts/part-3/`. Minimum evidence:

- `home-390.png`: initial mobile viewport.
- `home-390-full.png`: full page, including the portrait and next-section transition.
- `home-1440.png`: normal desktop initial viewport.
- `home-1440-full.png`: full page.
- `home-1024.png` and `home-1920.png`: composition at intermediate and wide sizes.
- `menu-open-390.png`: menu open with the new hero behind/below it.
- A named screenshot of the most revealing fallback or zoom case, with its conditions recorded.

Specify screenshot viewport height and device-pixel ratio in the handover. Screenshot generation alone is not visual review: inspect the name, face, crop baseline, balance, negative space, action placement, next-section spacing, and focus state. Do not substitute a generated mockup for a screenshot of the implementation.

Use available browsers without silently installing a new toolchain. Run targeted Firefox/WebKit checks only if those browsers are already usable; otherwise retain the NOT RUN status. DOM/keyboard checks are not proof of screen-reader validation. Record any browser/tool limitation explicitly. Do not invent Core Web Vitals or claim production performance from these local checks. Keep previous audit findings identified as inherited unless actually rechecked.

## 9. Completion and handover

Update the hero section of `docs/design-system.md` with implemented display sizes, portrait sizes, layout rules, breakpoints, image-loading choice, and known limitations. Update `docs/progress.md` with:

- Changed components/styles and any narrowly justified deviations from this brief.
- Actual skill paths found/read, discovery result if known, or fallback used.
- Commands and PASS/FAIL/NOT RUN results; distinguish inherited results.
- Screenshot paths, viewport sizes/DPR, and which images were actually inspected.
- Zoom, fallback, no-JavaScript, menu, path, and image-delivery findings.
- Any unresolved font/portrait/browser issues and inherited audit limitations.
- Readiness for Part 4: project presentation, without starting it.

Acceptance means a confident desktop and mobile portrait-led composition with readable identity/role/actions, intact static hosting and accessibility regressions, and evidence from the rendered result. Passing code checks alone does not establish visual quality. Do not call a required check complete when it was not run.

Stop after Part 3. Do not begin project redesign, full narrative writing, coordinated motion, or deployment.

## Official implementation references

Checked 12 November 2026. Use the reference appropriate to the installed version; do not upgrade merely to match a newer example.

- Codex local skills and discovery: https://learn.chatgpt.com/docs/build-skills
- Next.js image dimensions, loading, and unoptimized delivery: https://nextjs.org/docs/app/api-reference/components/image
- Next.js static-export constraints: https://nextjs.org/docs/app/guides/static-exports
- W3C reflow guidance: https://www.w3.org/WAI/WCAG22/Understanding/reflow.html

The composition and content requirements above are project design decisions, not prescriptions from those technical references.
