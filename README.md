# Stefan Penchev — Portfolio

Personal portfolio built with React, TanStack Start, Vite, Tailwind CSS, GSAP and Lenis.

## Local development

Use Node.js 24 (the pinned version is in `.nvmrc`) and npm with the checked-in lockfile.

```sh
npm ci
npm run dev
```

On this Mac, the active project is at `~/Projects/portfolio_4`, outside cloud-synced Documents. Both source files and `node_modules` stay local. The original `~/Documents/Projects/portfolio_4` path is a compatibility symlink to this directory.

```sh
cd ~/Projects/portfolio_4
nvm use
npm run dev
```

If a terminal was already inside the project before the move, run the `cd` command again. Standard `npm ci` now works directly in this project. The previous cloud copy is retained at `~/Documents/Projects/portfolio_4.icloud-backup-20261118`; it is a backup, not the active working directory.

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
