# Project content and access

Use [content-facts.md](content-facts.md) as the factual source and `src/content/projects.ts` as the public presentation registry. The first three entries are featured on the homepage. All five retain their existing slugs.

| Project | Approved scope | Status, visitor access and source |
| --- | --- | --- |
| DTO Recruitment Platform | Full-stack recruitment work covering candidate and recruiter workflows, role-based access, privacy controls and activity dashboards. The confirmed stack includes Angular, TypeScript, Rust, PostgreSQL, Redis, Docker and Makefile. | In development. Private source and no public product, demo or repository link. The DTO company website is a separate product. |
| ArtAICare | Web-platform engineering through 20 September 2025, including MERN services and APIs, Python/Sentence-BERT recommendations, collaboration with a separate VR developer, study-specific application work and Ubuntu/Nginx deployment. | Deployed web platform. **Platform sign-in** leads to the approved sign-in page. Source visibility is unconfirmed. |
| Skald Lab Ops | Django backend for workshop records, bookings, attendance and project progress. | Reported online. **Visit Skald Lab** leads to the public workshop website. The operations system is internal. Source visibility is unconfirmed. |
| DTO Partners Company Website | Responsive informational site with English and Polish localisation. Initial delivery had no backend. | Public website. **Visit website** leads to the company site. Its framework and source visibility are unconfirmed. |
| Egil | Local audit assistant using retrieval-augmented generation and Ollama. | Private internal tool with private source and no public product, demo or repository link. |

Keep project dates separate from employment and internship dates. ArtAICare has an approved contribution period. DTO and Skald engagement dates belong with experience unless individual project periods are confirmed. The public registry stores product status, visitor access, source visibility, external destinations and media separately. An unknown source state has no public label or action.

## Pending evidence

Approved screenshots and permission to share them are pending across all five projects. Confirm specific engineering decisions, product-specific infrastructure and any results before expanding an overview into a case study. The DTO company website framework and repository visibility for that site, ArtAICare and Skald Lab Ops remain unconfirmed. Keep these editorial gaps in documentation.

## Adding approved media

After permission and sanitisation review, add a local file under `public/images/` and set the corresponding project's optional `media` entry with its `/images/…` path, intrinsic width and height, meaningful alt text and an optional caption. The overview renders a figure in the reading column using the existing asset helper and static Next Image configuration. Omit `media` until a real asset is approved. Exclude patient, child, candidate and other private records, including those visible in background UI.
