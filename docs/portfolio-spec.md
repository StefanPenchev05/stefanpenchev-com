# Portfolio specification — version 0.1

Prepared 12 November 2026. Source labels are defined in `source-notes.md`.

## 1. Goal and audience

Create a distinctive, portrait-led portfolio for **Stefan Penchev**, a full-stack and backend developer based in Luxembourg. Give equal weight to junior startup employment and freelance enquiries, and equal weight to full-stack and backend capabilities. Internships are an alternative when a company has no junior position. [U1–U2]

Freelance scope: complete applications and backend/API development. Do not position Stefan as an agency, sell unspecified services, or advertise website-only commissions as a primary service. Employment: on-site in Luxembourg or remote across Europe, starting January 2027 (interpretation of “after this December”). This is a work preference, not a claim of work authorisation in every country. [U1]

The page must support both a short visit to work/CV/contact and deeper reading of the personal story. Do not require finishing a scroll sequence to find professional information.

## 2. Reference and originality

Dennis Snellenberg is the primary visual reference: large personal portrait, confident typography, generous spacing and coordinated interactions. Use these design principles, not his logo, words, source code, photographs, precise composition or signature widgets. [U2, W1]

The result must look like a considered personal portfolio, not a SaaS dashboard, terminal simulation, generic bento grid or clone of the reference.

## 3. Design direction (proposed)

### Color and material

Start with a warm stone hero, off-white reading sections, near-black type and a deep blue accent compatible with the navy shirt in the supplied portrait. Suggested tokens:

- hero: `#D9D7D2`
- paper: `#F6F5F1`
- ink: `#191B1F`
- muted ink: `#50545B`
- accent: `#2544C7`
- dark footer: `#191B1F`

These are starting tokens, not an exemption from contrast checks. Validate every text/background combination and keyboard focus indicator. Do not use color alone for status.

Use broad flat surfaces, fine separators and restrained corners. Avoid glass effects, excessive gradients, decorative code rain, excessive pill badges, oversized shadows or a card around every paragraph.

### Typography and spacing

Use one readable neutral sans family with expressive scale and weight; reserve monospace for technical labels only where useful. Part 1 may use a system stack. Font selection and licensed self-hosting are Phase 2 tasks; no font asset is supplied in this package.

Suggested body: 17–19px desktop, at least 16px mobile; line height about 1.5–1.65. Reading copy should generally stay around 60–72 characters per line. Display headings are large but must wrap deliberately and remain readable at zoom.

Use a 4/8px spacing rhythm, generous section spacing (roughly 88–144px desktop; 56–88px mobile), and fluid horizontal gutters (24–72px). A desktop content width around 1360–1440px is a starting point, not a fixed canvas.

### Portrait-led hero

The source is an **800 × 800 RGBA PNG with transparency**. It is a chest-up composition, not a full-body photograph. Preserve it; do not generate missing body parts or apply beautification. [A1]

On wide screens, give the portrait a bottom-aligned position near the center/right; use a large name composition and a separate clear role/intro block. Preserve the face, glasses and hair. Keep any type/image overlap below the face and ensure the whole name remains visually legible.

Do not stretch the portrait into a 1500px-wide background. Start around 480–640 CSS pixels wide on desktop, assessing sharpness at the actual target device pixel ratio. An 800px source is limited for large high-density displays. A higher-resolution replacement can be supplied later without restructuring the component.

On mobile, deliberately recompose: readable name and role first, portrait below/alongside in a single column as space allows. Keep a visible path to selected work. Do not shrink the desktop composition or crop the face to maintain a fixed viewport height. Use natural document height; a hero may exceed one mobile viewport.

Image derivatives may be optimized later with alpha preserved and no upscaling beyond the original. Set explicit image dimensions and avoid initial layout shift. Do not lazy-load the primary hero portrait.

### Initial copy draft (editable proposal)

Hero name: Stefan Penchev
Role: Full-Stack & Backend Developer
Intro: “I build complete web applications and the systems behind them.”
Location/work line: “Based in Luxembourg. On-site here, or remote across Europe.”
Primary route: “View my work”
Secondary route: “Get in touch”
Résumé link: “View CV”

Do not make the entire hero a language list. Go and Rust appear naturally in skills and relevant project descriptions, without inventing commercial Go evidence.

## 4. Information architecture

- `/`: portrait-led opening; concise introduction; three featured projects; condensed personal story; two services; compact experience; contact.
- `/work/`: all five known projects, with honest status, role and available links.
- `/work/[slug]/`: static project overviews, upgraded to case studies when enough verified material exists.
- `/about/`: fuller story, experience, education and grouped skills. Avoid copying every CV bullet.
- A real static 404 page.

Navigation: Work, About, CV, Contact. Contact can be an anchor on the homepage. On internal pages its link must resolve to the homepage contact section.

Suggested featured projects: DTO recruitment platform, ArtAICare, Skald Lab Ops. The DTO company website and Egil remain separate projects in the full work index. Final selection can change when screenshots arrive.

Never use a fake demo URL or an inactive button pretending to be functional. A private repository produces a text label or omitted source link, not a disabled “GitHub” button.

## 5. Story structure

The homepage story is brief; the fuller story belongs on About. Draft chapter headings:

1. **It started with a pyramid.** Programming at age ten, C++ shape challenges, memory/pointers and Arduino/electronics.
2. **From exercises to applications.** C#, databases and asynchronous programming; web development; competitions and teaching.
3. **Building it was only the beginning.** Real web-platform responsibility, cross-disciplinary work, and a growing interest in architecture and runtime behaviour.
4. **Still exploring what is underneath.** University in Luxembourg, completed Vienna exchange, current Go/Rust interests and full-stack work.

These are narrative choices, not permission to invent milestones, awards or dates. Do not turn childhood learning into a professional-experience total. Do not disparage Node.js or claim a language change solved unmeasured performance or memory problems.

A small pyramid-inspired typographic/geometric motif may be explored in Phase 5, but it must not turn the website into a game or a technical diagram. The portrait and typography remain the dominant visual identity.

## 6. Projects, ownership and evidence

Use `content-facts.md` for all project facts and technology mapping. Distinguish job titles from case-study role descriptions. Stefan's reported architecture and coding responsibility does not automatically imply people management or sole ownership of every team's output.

Stefan reports DDD across most projects, explicitly excluding ArtAICare and Skald Lab Ops. Do not apply a DDD badge indiscriminately, including to the informational website. Specific domain boundaries, aggregates, repository patterns and architecture diagrams require an example supplied by Stefan; they must not be invented from the acronym. DDD is not synonymous with microservices. For now, describe architecture and code organisation only at the supplied level. [U1]

Skald contribution is the backend, as established by the final CV. Do not claim design or development of its public marketing interface. ArtAICare contribution is the web platform, within a broader team with a separate VR developer. Do not take credit for the VR application. [F1]

Project schema should separate product status, source access and visitor access. A live login page is not an open product demo; a public website says nothing about source-code access. Permit missing media, missing repository links, and project-overview content without invented results.

Suggested fields: slug, title, organisation, type, summary, role, timePeriod (optional), status, technologies, contribution bullets, public URL (optional), external-link label, repository URL (optional), repository visibility (private/unknown/public), media array, evidence state, featured rank, and overview sections. Keep unknown values nullable; do not publish “TBD.”

### Case-study structure when supported

Purpose → my role → delivered capabilities → selected decisions → evidence/current status → limitations or reflection. Only render sections with supported content. Do not label a short overview as a fully documented case study.

Use approved screenshots later. Until then, intentionally designed typographic covers are acceptable. Covers are not product screenshots. Do not create fake dashboards, synthetic users, testimonials, metrics or confidential diagrams to fill visual space.

## 7. Contact, availability and privacy

English only. Public contact: `penchev.stefan@icloud.com` and the supplied LinkedIn URL. No contact form, backend submission service, blog, analytics or CMS for launch unless a later user request changes scope. [U1]

Contact paths should carry equal visual weight: “Discuss a role” and “Discuss a project.” Both may be mailto links with distinct subjects, with the address and LinkedIn also available as ordinary links. Do not rely on a copy-to-clipboard control as the only contact method.

Employment wording: “Roles starting January 2027.” Do not auto-switch to “available now” merely when that date arrives. Keep availability in a single editable content file. Freelance wording: “Available for selected application and backend projects, depending on scope.” The two-project maximum is internal capacity guidance, not permission to advertise two guaranteed openings.

Do not add the phone number to the main contact section. The downloadable approved PDF remains unchanged and includes its existing contact details. No inferred GitHub profile link.

## 8. Motion system (proposed)

Use CSS for simple state changes and GSAP/ScrollTrigger for coordinated sequences. Use native scrolling: no scroll hijacking, inertia library or forced horizontal experience. [W6]

- Arrival: brief finite entrance for decorative composition elements. Essential text and navigation are visible without JavaScript; no greeting preloader.
- Hero departure: restrained scroll-linked movement of decorative/name layers, roughly 24–64px as a starting range; do not move the face excessively or obscure reading text.
- Project rows: optional preview on fine-pointer hover, with visible keyboard focus and equivalent always-visible context for touch. Never replace the system cursor or require hover to reveal a project's meaning.
- Section motion: small grouped transitions, not word-by-word paragraph unlocking.
- Route changes: ordinary links remain functional. No full-screen transition blocking navigation in the first release.
- No endless marquee or automatic looping name motion in the first release.

Respect `prefers-reduced-motion` at first load and when the preference changes. Reduced-motion presentation is complete and static, not a broken or empty version. Clean up animation contexts and ScrollTriggers on unmount; resize and navigation must not accumulate listeners. GSAP's React integration and matchMedia are relevant implementation references. [W6]

## 9. Technical foundation (proposed default)

Next.js App Router + React + TypeScript + Tailwind CSS. Static export for GitHub Pages. Use current compatible stable releases at implementation time, check official documentation, and commit a reproducible lockfile. Do not use outdated command recipes or experimental features just for transitions. [W2]

Build-time settings include `output: 'export'` and `trailingSlash: true`. Enumerate work slugs at build time with `generateStaticParams`. No Server Actions, runtime database, server-side image optimizer or request-dependent rendering. Server Components can render at build time; “static” does not mean client-render everything. [W2–W4]

Prepare responsive local images. Disable the default runtime image optimizer or use a verified export-compatible approach; do not introduce an external image service solely for this small site. Do not generate derivatives bigger than the 800px source.

Use one explicit build-time base-path setting for project-path hosting versus domain-root hosting. Next routing and public-asset URLs need different handling: avoid double-prefixing Next links, and correctly prefix image/PDF paths. Test both root and a nonempty test prefix. Do not use SPA rewrites to mask missing exported pages. [W3]

Final domain and GitHub profile are not confirmed. Omit unconfirmed public links and absolute canonical/site metadata rather than invent them. Deployment should later use real repository/Pages settings. Git remotes identify the repository, not automatically the public profile Stefan wants linked.

The website itself does not need DDD layers, Go/Rust services, authentication or a database. Use a small content-first structure with typed local data, reusable presentational components and isolated animation code.

### Suggested structure

`src/app/`, `src/components/`, `src/content/`, `src/lib/`, `public/images/`, `public/files/`, `tests/`, `docs/`, `prompts/`.

Keep source documents and internal notes out of the exported public folder. Do not store confidential materials in client imports, even when a display flag hides them.

## 10. Validation and release requirements

Validate at 360px, 390px, 768px, 1024px and 1440px, plus a wider desktop and browser zoom. No horizontal page overflow, clipped names, inaccessible controls or unreadable project status labels.

Check keyboard navigation, focus order, skip link, semantic landmarks, heading order, usable mobile menu, reduced motion and content with JavaScript disabled. Standard links and essential content must survive enhancement failures.

Use relevant Vitest checks for content/path logic and Playwright browser tests for meaningful interactions and exported-site routes. Test the actual static export with a static HTTP server, not only the Next development server. Check direct project-page requests, refreshes, 404, PDF, portrait, relative assets and non-root base paths.

Performance numbers are test results, not promises. Record actual environment and checks, avoid oversized media, and avoid loading all project images on first paint. Do not claim perfect scores or universal accessibility from a single automated scan.

Add GitHub Actions checks and deployment only in the release stage, with the real repository/domain settings and least required permissions. A CNAME file alone does not configure a custom domain. [W5]

GitHub Pages has restrictions on using it for online businesses, commercial transactions and SaaS. This plan does not add checkout, payment collection or service delivery. Its contact-and-freelance positioning is not a blanket guarantee of policy eligibility; review the actual content and terms before publication and reassess hosting if the site becomes a commercial storefront. [W8]
