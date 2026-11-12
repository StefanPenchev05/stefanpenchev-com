# Stefan Penchev — portfolio starter brief

Prepared 12 November 2026. This is a specification and first Codex task, **not an implemented website**.

## Use this package

1. Copy the contents of this folder into the root of the existing portfolio repository. Keep the repository's `.git` directory and any existing work. Do not create a second repository.
2. The supplied assets have already been placed at their intended paths:
   - `public/images/stefan-penchev.png`
   - `public/files/stefan-penchev-cv.pdf`
3. Give Codex the complete contents of `prompts/01-foundation.md`.
4. Review the task report and working foundation before advancing to the visual implementation. Part 1 deliberately does not attempt the complete design or animation system.

The portrait and CV are unchanged copies of the supplied files. No font files are included.

## Read order

- `docs/portfolio-spec.md`: audience, scope, proposed visual system, interaction requirements and technical decisions.
- `docs/content-facts.md`: confirmed content and explicit limits on what may be claimed.
- `docs/implementation-plan.md`: the ordered implementation stages and their completion checks.
- `docs/source-notes.md`: sources, verification limits, unresolved release items.

## Confirmed versus proposed

The name, audience, English language, freelance scope, contact details, portrait, experience and project information are supplied by Stefan. The specific page structure, visual tokens and implementation stack are design/engineering proposals selected for this first build, not statements that Stefan explicitly approved each technical choice.

Employment after “this December” has been interpreted as **January 2027**, given the conversation date of 12 November 2026. The public wording should say “Roles starting January 2027,” not claim immediate employment availability.

The DTO platform's estimate of public availability “in two months” is not a committed release date. Its public status remains “In development” until Stefan updates it.

## Not blockers for Part 1

Project screenshots will arrive later. Use intentional typographic covers instead of fake screenshots or broken image boxes. The custom domain and public GitHub profile are not confirmed; do not invent them. No personal-project or Go case study has been supplied yet; do not generate one.

Do not infer screenshot permissions from a working website URL. The public project summaries may use the supplied high-level descriptions, but code, architecture details, private interfaces and user data require explicit approval.

## Distribution and privacy

Only publish the intended static export. The approved CV includes a phone number; the website's main contact section should use only the supplied email and LinkedIn. The PDF is deliberately preserved as supplied.

Anything shipped in static HTML, JavaScript, JSON or public assets is downloadable. Hiding a link or setting a UI flag does not make client-side data confidential. Never include secrets or private implementation material in the output.
