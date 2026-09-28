# Content audit

Audited 28 September 2026. Owner-supplied facts in the phase-five reply take precedence over prior drafts. Nothing here asserts that a concept is completed. Remaining project drafts are intentionally public and labelled, as authorized. Unverified personal biography and employment placeholders were removed from public content.

## Hero

Verified in `src/data/profile.ts`: Stefan Penchev; Luxembourg; availability for internships, software engineering opportunities, freelance projects and collaborations; email and both social URLs. Location and availability now render from this source. The owner-requested full-stack headline is retained. The year is an editorial date, not employment or project evidence. No unresolved contact or location value remains.

| File | Data property / location | Current value | Real information required |
| --- | --- | --- | --- |
| `src/sections/Hero/Hero.tsx` | `statement` | I build web applications from interface to infrastructure. | Optional real examples to substantiate this direction; no client, employment or delivery claim has been added. |
| `src/sections/Intro/Intro.tsx` | `steps[0..3].text/detail` | I build interfaces. / after the request leaves the browser / APIs. Databases. Authentication. Infrastructure. / Full-stack means understanding the whole system. | Personal approach copy from the brief; no missing metrics required. Replace only with owner-approved refinements. Removed the unsupported “Fast” claim. |

## Projects

All four records remain concepts. Removed the unverified 2026 project years from data and the year-qualified index heading. No real repository or deployed URL is supplied. Concept architecture/technologies describe proposals, not verified implementations.

| File | Data property / location | Current value | Real information required |
| --- | --- | --- | --- |
| `src/data/projects.ts` | `personal-organizer.title` | Personal Organizer | Confirm this is a real project title before presenting it as implemented. |
| `src/data/projects.ts` | `personal-organizer.shortDescription` | A little less friction. A little more focus. | Real project-specific scope/content; current wording describes only a concept. |
| `src/data/projects.ts` | `personal-organizer.status` | concept | Owner confirmation and actual implementation evidence before changing concept to in-progress/completed. |
| `src/data/projects.ts` | `personal-organizer.year` | Absent / omitted | Actual project year, if relevant; omit until supplied. |
| `src/data/projects.ts` | `personal-organizer.role` | Full-stack development | Real project-specific scope/content; current wording describes only a concept. |
| `src/data/projects.ts` | `personal-organizer.technologies` | Go / React / PostgreSQL / Docker | Real project-specific scope/content; current wording describes only a concept. |
| `src/data/projects.ts` | `personal-organizer.preview` | /previews/organizer.svg — Illustrative organizer interface with a focused task list and weekly planning | Real screenshot/illustration approved for this project, descriptive alt and true dimensions. Existing SVG is explicitly a concept illustration. |
| `src/data/projects.ts` | `request-atlas.title` | Request Atlas | Confirm this is a real project title before presenting it as implemented. |
| `src/data/projects.ts` | `request-atlas.shortDescription` | Following the request, beyond the browser. | Real project-specific scope/content; current wording describes only a concept. |
| `src/data/projects.ts` | `request-atlas.status` | concept | Owner confirmation and actual implementation evidence before changing concept to in-progress/completed. |
| `src/data/projects.ts` | `request-atlas.year` | Absent / omitted | Actual project year, if relevant; omit until supplied. |
| `src/data/projects.ts` | `request-atlas.role` | Backend & API design | Real project-specific scope/content; current wording describes only a concept. |
| `src/data/projects.ts` | `request-atlas.technologies` | Node.js / TypeScript / Redis | Real project-specific scope/content; current wording describes only a concept. |
| `src/data/projects.ts` | `request-atlas.preview` | /previews/atlas.svg — Illustrative request trace showing client, gateway, application and database | Real screenshot/illustration approved for this project, descriptive alt and true dimensions. Existing SVG is explicitly a concept illustration. |
| `src/data/projects.ts` | `local-context.title` | Local Context | Confirm this is a real project title before presenting it as implemented. |
| `src/data/projects.ts` | `local-context.shortDescription` | Your documents. A smaller, local intelligence. | Real project-specific scope/content; current wording describes only a concept. |
| `src/data/projects.ts` | `local-context.status` | concept | Owner confirmation and actual implementation evidence before changing concept to in-progress/completed. |
| `src/data/projects.ts` | `local-context.year` | Absent / omitted | Actual project year, if relevant; omit until supplied. |
| `src/data/projects.ts` | `local-context.role` | AI & backend engineering | Real project-specific scope/content; current wording describes only a concept. |
| `src/data/projects.ts` | `local-context.technologies` | Python / Llama / PostgreSQL | Real project-specific scope/content; current wording describes only a concept. |
| `src/data/projects.ts` | `local-context.preview` | /previews/context.svg — Illustrative document retrieval flow from local files to embeddings and a grounded answer | Real screenshot/illustration approved for this project, descriptive alt and true dimensions. Existing SVG is explicitly a concept illustration. |
| `src/data/projects.ts` | `dispatch.title` | Dispatch | Confirm this is a real project title before presenting it as implemented. |
| `src/data/projects.ts` | `dispatch.shortDescription` | Background work, brought into the foreground. | Real project-specific scope/content; current wording describes only a concept. |
| `src/data/projects.ts` | `dispatch.status` | concept | Owner confirmation and actual implementation evidence before changing concept to in-progress/completed. |
| `src/data/projects.ts` | `dispatch.year` | Absent / omitted | Actual project year, if relevant; omit until supplied. |
| `src/data/projects.ts` | `dispatch.role` | Systems & infrastructure | Real project-specific scope/content; current wording describes only a concept. |
| `src/data/projects.ts` | `dispatch.technologies` | Go / Redis / Docker / React | Real project-specific scope/content; current wording describes only a concept. |
| `src/data/projects.ts` | `dispatch.preview` | /previews/dispatch.svg — Illustrative job queue interface showing queued, processing and completed jobs | Real screenshot/illustration approved for this project, descriptive alt and true dimensions. Existing SVG is explicitly a concept illustration. |

## Architecture

| File | Data property / location | Current value | Real information required |
| --- | --- | --- | --- |
| `src/data/architecture.ts` | `architectureNodes / architectureConnections / requestSteps` | Educational React → REST/HTTP → identity → service → Redis/PostgreSQL, optional worker; cache-miss example. | No missing personal fact: this is explicitly a conceptual request architecture. Do not attach it to a real project without verification. |
| `src/components/layout/Story.tsx` | `sceneHeading` | SYSTEM STUDY — 001 / [ CONCEPT ] | Retain disclosure. Sculpture is a conceptual diagram, not a deployed system. |

## Skills

| File | Data property / location | Current value | Real information required |
| --- | --- | --- | --- |
| `src/data/skills.ts` | `skills[].technologies / description` | React, TypeScript, JavaScript; Go, Node.js, Python, C++; Databases; Networking; Cybersecurity, Mathematics; Machine learning, Local LLM experimentation, Python. | All listed interests are now owner-verified. Proficiency, years of experience and production use are intentionally absent; evidence would be required to add them. |

Removed unsupported personal inventory entries such as Express, MongoDB, Redis, Docker, Linux, GitHub Actions, Nginx, cloud deployment and specific authentication/indexing claims. These can still appear as proposed tools in clearly labelled concepts or as actual implementation dependencies, not personal employment evidence.

## Experience

| File | Data property / location | Current value | Real information required |
| --- | --- | --- | --- |
| `src/data/experience.ts` | `university-of-luxembourg.title / organization / location / summary` | Bachelor student / University of Luxembourg / Luxembourg / Bachelor studies at the University of Luxembourg. | Verified; no extra responsibilities or qualification completion is asserted. |
| `src/data/experience.ts` | `period` | Absent / omitted | Verified enrollment/start date and expected completion date, only if the owner wants these public. |
| `src/data/experience.ts` | `programmeTitle` | Absent / omitted | Exact official degree/programme title. “Computer Science or Software Engineering-related studies” was not precise enough to invent one. |
| `src/data/experience.ts` | `details / technologies / link` | Absent / omitted | Verified coursework/projects and an optional authentic programme link. |
| `src/data/experience.ts` | `work / internships / clients` | Absent / omitted | No verified employment supplied. All three previous development placeholders were removed; omit new jobs until facts are supplied. |

## Lab

The load-balancer prototype is implemented locally. Counters represent simulation jobs, not traffic or performance claims. Other entries remain educational concepts.

| File | Data property / location | Current value | Real information required |
| --- | --- | --- | --- |
| `src/data/experiments.ts` | `http.description` | Concept: follow DNS resolution, TCP/TLS, an HTTP request, server processing and the response. | An actual implementation and owner-approved explanation before removing the concept / not implemented disclosure. |
| `src/data/experiments.ts` | `http.technologies / status / link / repository` | TypeScript / SVG / Browser APIs; experiment; no links | Potential tools only. Real tool choices, actual status and verified URLs when implemented. |
| `src/data/experiments.ts` | `llm.description` | Concept: a prompt is tokenized; tokens and context enter a model; generated tokens become a response. An explanatory study, with no model connected. | An actual implementation and owner-approved explanation before removing the concept / not implemented disclosure. |
| `src/data/experiments.ts` | `llm.technologies / status / link / repository` | Python / Llama / Local inference; experiment; no links | Potential tools only. Real tool choices, actual status and verified URLs when implemented. |
| `src/data/experiments.ts` | `cache.description` | Concept: trace cache hits, misses and database reads, then explore how TTL changes the next request. | An actual implementation and owner-approved explanation before removing the concept / not implemented disclosure. |
| `src/data/experiments.ts` | `cache.technologies / status / link / repository` | Redis concepts / TypeScript; experiment; no links | Potential tools only. Real tool choices, actual status and verified URLs when implemented. |
| `src/data/experiments.ts` | `network.description` | Concept: follow client → router → internet → server. Future studies could explore latency, packet loss and routing. | An actual implementation and owner-approved explanation before removing the concept / not implemented disclosure. |
| `src/data/experiments.ts` | `network.technologies / status / link / repository` | Networking concepts / SVG; experiment; no links | Potential tools only. Real tool choices, actual status and verified URLs when implemented. |
| `src/data/experiments.ts` | `algorithms.description` | Concept: compare the traversal order of BFS and DFS with shortest-path exploration using Dijkstra’s algorithm. | An actual implementation and owner-approved explanation before removing the concept / not implemented disclosure. |
| `src/data/experiments.ts` | `algorithms.technologies / status / link / repository` | TypeScript / Graph algorithms; experiment; no links | Potential tools only. Real tool choices, actual status and verified URLs when implemented. |

## About

| File | Data property / location | Current value | Real information required |
| --- | --- | --- | --- |
| `src/data/about.ts` | `statement` | I like understanding what happens beneath the abstraction. | Owner-requested statement; retained. |
| `src/data/about.ts` | `entries[].text` | Concise interests in full-stack development, backend systems, the verified language/tool list, mathematics, networking, cybersecurity, machine learning, databases and local LLM experiments. | Verified interests replace all three generic development-copy drafts. No personal story added. |
| `src/data/about.ts` | `portrait` | Absent; layout works without it. | Optional owner-supplied photo, permission to publish, descriptive alt and dimensions. Not a release requirement. |

## Contact

All three items are enabled from owner-verified `src/data/profile.ts` values. No placeholder destination remains.

| File | Data property / location | Current value | Real information required |
| --- | --- | --- | --- |
| `src/data/profile.ts` | `email` | penchev.stefan@icloud.com | Verified; perform final mail-client launch check in browser. |
| `src/data/profile.ts` | `github` | https://github.com/StefanPenchev05 | Verified; final destination check in browser. |
| `src/data/profile.ts` | `linkedin` | https://www.linkedin.com/in/stefan-penchev-31b94a318/ | Verified; final destination check in browser. |

## Project pages

Each field below remains concept content or absent. Do not auto-generate results, user numbers, revenue, client names or performance claims.

| File | Data property / location | Current value | Real information required |
| --- | --- | --- | --- |
| `src/data/projects.ts` | `personal-organizer.caseStudy.overview` | A proposed productivity platform built around a Go backend and PostgreSQL. This is a placeholder for a future, documented case study. | Verified project-specific implementation/content, or omit this optional section. |
| `src/data/projects.ts` | `personal-organizer.caseStudy.problem` | Explore how tasks, notes and schedules can share a coherent data model. | Verified project-specific implementation/content, or omit this optional section. |
| `src/data/projects.ts` | `personal-organizer.caseStudy.solution` | A focused interface backed by a typed API and relational storage. | Verified project-specific implementation/content, or omit this optional section. |
| `src/data/projects.ts` | `personal-organizer.caseStudy.myRole` | Planned full-stack implementation. | Verified project-specific implementation/content, or omit this optional section. |
| `src/data/projects.ts` | `personal-organizer.caseStudy.architecture` | {"nodes":["React client","Go API","PostgreSQL","Docker"],"description":"A React client talks to a Go REST API. PostgreSQL stores projects and tasks; Docker provides reproducible local services."} | Verified project-specific implementation/content, or omit this optional section. |
| `src/data/projects.ts` | `personal-organizer.caseStudy.technicalChallenges` | Designing recurring tasks without duplicating state. / Keeping authentication and data ownership explicit. | Verified project-specific implementation/content, or omit this optional section. |
| `src/data/projects.ts` | `personal-organizer.caseStudy.result` | Absent / omitted | Factual implemented capabilities or evidence-backed measured results; no vague efficiency/performance claims. |
| `src/data/projects.ts` | `personal-organizer.caseStudy.screenshots` | Absent / omitted | Real compressed media, type, dimensions/aspect ratio, alt, caption, and video poster/captions as applicable. |
| `src/data/projects.ts` | `personal-organizer.caseStudy.media` | Absent / omitted | Real compressed media, type, dimensions/aspect ratio, alt, caption, and video poster/captions as applicable. |
| `src/data/projects.ts` | `personal-organizer.links.github` | Absent / omitted | Owner-verified project URL. Profile GitHub is not evidence of a project repository. |
| `src/data/projects.ts` | `personal-organizer.links.live` | Absent / omitted | Owner-verified project URL. Profile GitHub is not evidence of a project repository. |
| `src/data/projects.ts` | `request-atlas.caseStudy.overview` | A proposed request-inspection tool for understanding how services communicate. Concept content, ready to be replaced with real implementation details. | Verified project-specific implementation/content, or omit this optional section. |
| `src/data/projects.ts` | `request-atlas.caseStudy.problem` | Make the path of a request readable across service boundaries. | Verified project-specific implementation/content, or omit this optional section. |
| `src/data/projects.ts` | `request-atlas.caseStudy.solution` | Absent / omitted | Verified project-specific implementation/content, or omit this optional section. |
| `src/data/projects.ts` | `request-atlas.caseStudy.myRole` | Absent / omitted | Verified project-specific implementation/content, or omit this optional section. |
| `src/data/projects.ts` | `request-atlas.caseStudy.architecture` | {"nodes":["Client","API gateway","Application","Redis"],"description":"Trace IDs connect gateway logs, service calls and cache operations in a single request view."} | Verified project-specific implementation/content, or omit this optional section. |
| `src/data/projects.ts` | `request-atlas.caseStudy.technicalChallenges` | Propagating trace context consistently. / Presenting failures without hiding the original response. | Verified project-specific implementation/content, or omit this optional section. |
| `src/data/projects.ts` | `request-atlas.caseStudy.result` | Absent / omitted | Factual implemented capabilities or evidence-backed measured results; no vague efficiency/performance claims. |
| `src/data/projects.ts` | `request-atlas.caseStudy.screenshots` | Absent / omitted | Real compressed media, type, dimensions/aspect ratio, alt, caption, and video poster/captions as applicable. |
| `src/data/projects.ts` | `request-atlas.caseStudy.media` | Absent / omitted | Real compressed media, type, dimensions/aspect ratio, alt, caption, and video poster/captions as applicable. |
| `src/data/projects.ts` | `request-atlas.links.github` | Absent / omitted | Owner-verified project URL. Profile GitHub is not evidence of a project repository. |
| `src/data/projects.ts` | `request-atlas.links.live` | Absent / omitted | Owner-verified project URL. Profile GitHub is not evidence of a project repository. |
| `src/data/projects.ts` | `local-context.caseStudy.overview` | An exploration of retrieval-augmented generation with local models. This entry is a concept, not a claim of a deployed product. | Verified project-specific implementation/content, or omit this optional section. |
| `src/data/projects.ts` | `local-context.caseStudy.problem` | Explore useful question answering without losing sight of source material. | Verified project-specific implementation/content, or omit this optional section. |
| `src/data/projects.ts` | `local-context.caseStudy.solution` | Absent / omitted | Verified project-specific implementation/content, or omit this optional section. |
| `src/data/projects.ts` | `local-context.caseStudy.myRole` | Absent / omitted | Verified project-specific implementation/content, or omit this optional section. |
| `src/data/projects.ts` | `local-context.caseStudy.architecture` | {"nodes":["Local documents","Embedding worker","Vector search","Llama"],"description":"Documents are chunked and embedded locally. Retrieved passages are supplied to a local model with explicit source references."} | Verified project-specific implementation/content, or omit this optional section. |
| `src/data/projects.ts` | `local-context.caseStudy.technicalChallenges` | Measuring retrieval quality. / Making uncertainty and sources visible. | Verified project-specific implementation/content, or omit this optional section. |
| `src/data/projects.ts` | `local-context.caseStudy.result` | Absent / omitted | Factual implemented capabilities or evidence-backed measured results; no vague efficiency/performance claims. |
| `src/data/projects.ts` | `local-context.caseStudy.screenshots` | Absent / omitted | Real compressed media, type, dimensions/aspect ratio, alt, caption, and video poster/captions as applicable. |
| `src/data/projects.ts` | `local-context.caseStudy.media` | Absent / omitted | Real compressed media, type, dimensions/aspect ratio, alt, caption, and video poster/captions as applicable. |
| `src/data/projects.ts` | `local-context.links.github` | Absent / omitted | Owner-verified project URL. Profile GitHub is not evidence of a project repository. |
| `src/data/projects.ts` | `local-context.links.live` | Absent / omitted | Owner-verified project URL. Profile GitHub is not evidence of a project repository. |
| `src/data/projects.ts` | `dispatch.caseStudy.overview` | A proposed background-job system with a deliberately simple operations interface. Placeholder content for future engineering documentation. | Verified project-specific implementation/content, or omit this optional section. |
| `src/data/projects.ts` | `dispatch.caseStudy.problem` | Make asynchronous work inspectable and recoverable. | Verified project-specific implementation/content, or omit this optional section. |
| `src/data/projects.ts` | `dispatch.caseStudy.solution` | Absent / omitted | Verified project-specific implementation/content, or omit this optional section. |
| `src/data/projects.ts` | `dispatch.caseStudy.myRole` | Absent / omitted | Verified project-specific implementation/content, or omit this optional section. |
| `src/data/projects.ts` | `dispatch.caseStudy.architecture` | {"nodes":["Producer API","Redis queue","Go workers","Dashboard"],"description":"An API accepts jobs, Redis coordinates the queue, and Go workers process them with bounded retries."} | Verified project-specific implementation/content, or omit this optional section. |
| `src/data/projects.ts` | `dispatch.caseStudy.technicalChallenges` | Idempotent processing. / Backpressure and safe retry policies. | Verified project-specific implementation/content, or omit this optional section. |
| `src/data/projects.ts` | `dispatch.caseStudy.result` | Absent / omitted | Factual implemented capabilities or evidence-backed measured results; no vague efficiency/performance claims. |
| `src/data/projects.ts` | `dispatch.caseStudy.screenshots` | Absent / omitted | Real compressed media, type, dimensions/aspect ratio, alt, caption, and video poster/captions as applicable. |
| `src/data/projects.ts` | `dispatch.caseStudy.media` | Absent / omitted | Real compressed media, type, dimensions/aspect ratio, alt, caption, and video poster/captions as applicable. |
| `src/data/projects.ts` | `dispatch.links.github` | Absent / omitted | Owner-verified project URL. Profile GitHub is not evidence of a project repository. |
| `src/data/projects.ts` | `dispatch.links.live` | Absent / omitted | Owner-verified project URL. Profile GitHub is not evidence of a project repository. |

## SEO

| File | Data property / location | Current value | Real information required |
| --- | --- | --- | --- |
| `src/data/profile.ts` | `site.title / site.description` | Stefan Penchev — Full-Stack Developer / A developer portfolio exploring interfaces, backend architecture and engineering experiments. | Accurate neutral defaults; build HTML and route metadata share these values. |
| `src/components/layout/RouteEffects.tsx` | `project titles` | <project title> — Concept \| Stefan Penchev | Unique client-rendered metadata implemented. Social crawlers without JavaScript see static defaults; prerendering can be considered after verified content exists. |
| `index.html` | `canonical / og:url / og:image / sitemap` | Absent | Verified production origin and approved social preview asset. Do not invent a domain; configure after a host is chosen. |

## Cleanup classification

- Intentional content TODO: production URL/social image in HTML, exact education data in this audit, optional portrait/media.
- Intentional concept labels: four projects, five Lab notebook concepts and conceptual architecture. Retain until evidence changes.
- Removed public drafts: three invented-slot experience entries, generic About copy, unsupported skill inventory and project years.
- No production console.log/debugger/FIXME, fake example.com destinations or localhost links found in src/index HTML. Test-only fixture domains and simulated-error messages are not bundled.
- No .env/.env.local files found. A source pattern scan found no likely private keys/access tokens/embedded secrets; this is not a comprehensive security certification. Existing .env ignore rules are retained.
- Development script localhost ports are intentional; old unused ProjectDialog/store files are retained compatibility code and are not mounted or imported by production routes.
