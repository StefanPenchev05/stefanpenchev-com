# Stefan Penchev — Portfolio

Personal portfolio built with React, TanStack Start, Vite, Tailwind CSS, GSAP and Lenis.

## Local development

Use Node.js 24 (the pinned version is in `.nvmrc`) and npm with the checked-in lockfile.

```sh
npm ci
npm run dev
```

On this Mac, the project is inside cloud-synced Documents. Its `node_modules` is linked to `~/.local/share/portfolio_4/dependencies/node_modules` so dependencies remain local instead of becoming cloud placeholders. Run `npm run dev` from this project as usual.

To reinstall locked dependencies in this linked setup, keep the installation outside Documents:

```sh
cp package.json package-lock.json "$HOME/.local/share/portfolio_4/dependencies/"
(cd "$HOME/.local/share/portfolio_4/dependencies" && npm ci)
```

A direct `npm ci` in the project replaces the dependency symlink, so use the commands above while this workspace remains in the synced folder. Ordinary checkouts outside cloud storage can use the standard installation command.

## Checks and build

```sh
npm run typecheck
npm run lint
npm test
npm run build
npm run start
```

`npm run build` produces `.output/`; `npm run start` runs the production Node server locally. This implementation uses server rendering and is not a static Next.js export. Hosting and publication are a separate task.

## Content

Edit `src/data/` for profile, project, experience, education and skill information. Public claims follow `docs/content-facts.md` and the unchanged approved CV. Keep status, visitor access and source visibility separate. The portfolio domain remains unset.

- Portrait: `public/images/stefan-penchev.png`
- CV: `public/files/stefan-penchev-cv.pdf`
- Review: `docs/content-review.md`

Contact uses direct email links for employment and freelance enquiries, plus the approved LinkedIn and GitHub profiles. There is no contact processing service.
