import type { ArchitectureNodeId } from './architecture';
export type SkillGroup = {
  id: string;
  number: string;
  title: string;
  description: string;
  technologies: string[];
  relatedArchitectureNodes?: ArchitectureNodeId[];
};
// User-supplied technology inventory. No ratings or invented proficiency levels.
export const skills: SkillGroup[] = [
  {id:'frontend',number:'01',title:'FRONTEND',description:'Building accessible interfaces that make state, interaction and network boundaries clear.',technologies:['React','TypeScript','JavaScript','HTML','CSS','React Three Fiber','Three.js','GSAP'],relatedArchitectureNodes:['client']},
  {id:'backend',number:'02',title:'BACKEND',description:'Designing APIs and services where validation, authentication, application logic and data access remain clearly separated.',technologies:['Node.js','Express','Go','Python','REST APIs','WebSockets','Authentication','Authorization'],relatedArchitectureNodes:['api','auth','service']},
  {id:'data',number:'03',title:'DATA',description:'Modelling persistent data and choosing indexes, relationships and caching strategies around actual access patterns.',technologies:['PostgreSQL','MongoDB','Redis','SQL','Database modelling','Indexes','Caching'],relatedArchitectureNodes:['database','cache']},
  {id:'infrastructure',number:'04',title:'INFRASTRUCTURE',description:'Making local development, delivery and deployment repeatable, observable and easier to maintain.',technologies:['Docker','Linux','GitHub Actions','CI/CD','Nginx','Cloud deployment'],relatedArchitectureNodes:['service','worker']},
  {id:'engineering',number:'05',title:'ENGINEERING',description:'Treating tests, security and performance as part of the design, with clear contracts between system boundaries.',technologies:['Git','Testing','System design','Security','Performance','API design']},
  {id:'ai',number:'06',title:'AI / EXPERIMENTAL',description:'Exploring local models and retrieval systems while keeping sources, evaluation and uncertainty in view.',technologies:['Python','Local LLMs','Llama','RAG','Embeddings','LLM APIs']},
];
