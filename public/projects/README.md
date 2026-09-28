# Project media

Put verified media under `public/projects/<stable-project-slug>/`, for example:

- `hero.webp`
- `dashboard.webp`
- `architecture.webp`
- `demo.mp4`
- `demo-poster.webp`
- `demo.en.vtt` (captions when speech/audio conveys information)

These are naming examples, not existing assets. Reference root-relative URLs in `caseStudy.media` or `preview`. Supply true pixel width/height and descriptive alt text; prefer WebP/AVIF for screenshots when readable. Compress videos and set a poster. No autoplay is enabled. Actual image and video bytes must be inspected after delivery; there are no real screenshots or videos yet. Existing SVG concept previews stay in `public/previews` and are labelled illustrations.
