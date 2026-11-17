# Stefan Penchev — Portfolio

Personal portfolio built with React, TanStack Start, Vite, Tailwind CSS, GSAP and Lenis.

## Local development

Use Node.js 24 (the pinned version is in `.nvmrc`) and npm with the checked-in lockfile.

```sh
npm ci
npm run dev
```

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
