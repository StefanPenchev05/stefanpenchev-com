# Portfolio design system

Part 2 uses the existing App Router pages and Tailwind 4 stylesheet. Shared colors, type roles, widths, spacing and interaction states live in `src/app/globals.css`. The root layout applies the font and renders the shared header, main landmark and footer.

## Type and layout

| Role | Size at the default root size | Use |
| --- | --- | --- |
| Page heading | 40–64 px, fluid | Interior page titles |
| Hero display | 52–80 px stacked on narrow screens, up to 152 px in the wide layout | Homepage name only |
| Section heading | 30–52 px, fluid | Section titles and the contact footer heading |
| Lead and subsection heading | 19–22 px, fluid | Introductory copy and smaller headings |
| Body | 16–18 px, fluid, 1.6 line height | Reading copy |
| Metadata | 14 px | Project status and type, experience dates, footer identity |
| Navigation and controls | 15 px, 44 px minimum height | Header links, menu toggle and standalone actions |

Manrope is an upright variable face with weights 200–800. The Latin WOFF2 is 24,436 bytes, served by Google Fonts as Manrope v23 and vendored unchanged as `src/app/fonts/manrope-latin.woff2`. The source SHA-256 is `8bd97e6bbbc1f602a8f791530eed1064c9a357d5731bbc76e3fc587fb068728f`. The original copyright and SIL Open Font License 1.1 ship in `public/licenses/manrope-ofl.txt`. [Google Fonts Manrope stylesheet](https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap) · [Manrope WOFF2](https://fonts.gstatic.com/s/manrope/v23/xn7gYHE41ni1AdIRggexSvfedN4.woff2) · [Upstream license](https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/OFL.txt)

`next/font/local` preloads the bundled face and uses `font-display: swap`. Tailwind's inline font token resolves to that face with `system-ui, sans-serif` fallback. Chrome confirmed that Manrope rendered, that a blocked WOFF2 used the system fallback and that the CSS, WOFF2 and license resolved under both export paths. The build uses the checked-in WOFF2 and the browser makes no third-party font or stylesheet requests. [Next.js font optimization](https://nextjs.org/docs/app/getting-started/fonts)

The container caps at 90 rem (1440 px), with 24–72 px fluid gutters, roughly 66 characters per line for reading copy and 56–112 px fluid section padding. These defaults use a 4/8 px spacing rhythm, with finer spacing for control padding and rules.

## Homepage opening

`HomeHero` uses one semantic `h1`, one portrait and one reading order. The name is set in Manrope 600 with a 0.91 line height and two deliberate lines. Below 48 rem, the role, introduction, work preferences and two links come before the portrait. At 48 rem and up, the copy sits left of a 46% portrait track with a fluid gutter and the image aligned to the bottom of the stone section. The paper Selected work section follows at the usual section spacing. A short landscape viewport from 35 rem to under 48 rem (at least 17:10 and at most 30 rem tall) allows the two name words to sit on one line when they fit, with tighter copy spacing and the same display size.

At the default root size Chrome measured the display at 56 px at 320, 61 px at 390, 86 px at 768, 109 px at 1024, 145 px at 1440 and 152 px at 1920. The square portrait uses the available width up to 27 rem in the stacked layout and 35 rem in the wide layout. It measured 342 CSS px at 390, 318 at 768, 424 at 1024 and 560 at both 1440 and 1920. Hair, glasses and the source’s lower crop remain visible in the full composition. The content-driven height allows scrolling on short displays.

The approved 800 × 800 transparent PNG has explicit intrinsic dimensions and a reserved square box. Next Image uses the existing unoptimized export configuration and public asset helper, with `loading="eager"` and `fetchPriority="high"`. The local check saw one direct portrait request and no optimizer URL, and the delayed image filled the same box after it decoded. At 560 CSS px and DPR 2 the source supplies 800 pixels for 1120 device pixels. Fine detail is limited at that density. A future approved higher-resolution source can retain the layout by updating the intrinsic dimensions. [Next.js Image](https://nextjs.org/docs/app/api-reference/components/image)

The name and role use ink on stone (11.99:1). The location line uses muted ink on stone (5.29:1). The work link uses paper on accent blue (7.05:1), hover blue (10.57:1) and ink when pressed (15.81:1). The Contact link and the blue keyboard ring on stone measure 5.35:1. Copy and controls sit clear of the portrait.

## Project presentation

The homepage and work index share ruled editorial rows. Below 48 rem, the title and purpose lead into compact labelled facts, followed by a single project link. At 48 rem and up, a 3:2 grid places the facts beside the title and summary. Project titles are 30–56 px at the default root size. There are no fixed-height image areas or decorative sequence markers. The visible “Read project” label and arrow share one focus target whose accessible name adds the project title. [W3C link purpose](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html)

The overview’s full-width stone cover carries the one project heading and purpose. The 40–80 px heading wraps naturally and stays within the shared container. On paper below, the labelled facts appear above the reading column on mobile and alongside it in a 2:1 grid from 48 rem. Product status, role, source visibility and visitor access have separate labels. The public action, when approved, appears beside the access description. Short contributions use prose. Longer contributions use bullets and the technology section appears only where the stack is confirmed.

Project styles reuse the established ink, muted text, accent and focus tokens on paper and stone. No new surface or color pairing is introduced. The cover is HTML typography and needs no image asset. Approved optional media will appear inline below the overview copy as a figure with intrinsic dimensions, alt text and an optional caption. See [project content](project-content.md) for the approval and asset workflow.

## Colors and contrast

Ratios use the WCAG relative-luminance calculation on the sRGB values from the stylesheet. Normal text meets 4.5:1 in the listed states. Required control outlines, fills and focus indicators meet 3:1 against their adjacent surface. The light rule (`#C6C4BF`) and dark rule (`#4B4E53`) are decorative separators. [WCAG text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) · [WCAG non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)

| Foreground / background | Ratio | Use |
| --- | ---: | --- |
| Ink `#191B1F` / paper `#F6F5F1` | 15.81:1 | Main text, navigation, menu label and icon |
| Ink / warm stone `#D9D7D2` | 11.99:1 | Hero and covers, hovered menu label, default footer action text |
| Muted `#50545B` / paper | 6.97:1 | Metadata and menu control border |
| Muted / warm stone | 5.29:1 | Metadata and menu control border on hover |
| Accent `#2544C7` / paper | 7.05:1 | Text links and light focus outline |
| Accent / warm stone | 5.35:1 | Links on stone and their focus outline |
| Hover blue `#172D91` / paper | 10.57:1 | Hovered text links |
| Hover blue / warm stone | 8.02:1 | Hovered text links on stone |
| Paper / ink | 15.81:1 | Footer text and focus, open menu label and icon, hovered action fill |
| Warm stone / ink | 11.99:1 | Footer secondary text, hovered footer links and default action fill |
| Pressed stone `#BFBDB7` / ink | 9.18:1 | Pressed footer action fill and inverse action text |

Inline links use an underline that thickens on hover. Navigation uses underlines for hover and current-route or section state, with a stone press state. The menu control changes its label, icon and fill when open. Keyboard focus has a 2 px outline with a 4 px offset, blue on light surfaces and paper on the dark footer. Controls change state without animation.

## Navigation and contact

The desktop row starts at 44 rem (704 px with the default browser font size). At that width Chrome measured 114 px for the identity and 286 px for the navigation, leaving 234 px of space between them after gutters. Below it, a native `details` disclosure places the expanded list in normal document flow. The inactive variant is hidden by CSS. A closed disclosure removes its links from the tab order and works without JavaScript. With JavaScript, Escape closes it and returns focus to the summary. Ordinary link activation and route changes close it without returning focus to the toggle. At the breakpoint, focused links move to their desktop equivalent when available, and a focused desktop navigation link moves to the summary when the mobile view takes over. Only exact pages receive `aria-current="page"`. Work has a visual section state on project pages. [Native details](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details) · [WAI disclosure navigation](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/)

If available header content width drops below 16 rem, the mobile toggle gets its own row. Footer actions retain their matching treatment and can contract below their usual 10 rem minimum to fit the available column. These constraints keep both controls usable at narrow widths with enlarged text.

Every page has one shared footer and one `#contact` target. Header Contact always points to the homepage target using Next Link. Role and project mailto links use identical styles and distinct subject lines. The equal columns stack below 40 rem. The footer also keeps the approved email and LinkedIn as ordinary links.

## Visual evidence and limits

See [Part 4 verification and screenshots](progress.md#part-4--selected-work-and-project-overviews), [Part 2 verification and screenshots](progress.md#part-2--visual-system-and-responsive-shell) and [Part 3 verification and screenshots](progress.md#part-3--portrait-led-opening). Review used Chrome 157.0.8103.78. Firefox, WebKit and screen-reader checks were not run. Both requested local skill files were missing and the Part 3 prompt supplied the workflow. The native disclosure is operable without JavaScript. Escape, breakpoint focus transfer and client-route dismissal are enhancements.
