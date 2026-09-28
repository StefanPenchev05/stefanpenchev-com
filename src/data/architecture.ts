export type ArchitectureNodeId =
  "client" | "api" | "auth" | "service" | "cache" | "database" | "worker";
export type ArchitectureNode = {
  id: ArchitectureNodeId;
  label: string;
  technology: string;
  description: string;
  responsibilities: string[];
  position: readonly [number, number];
};
export type ArchitectureConnection = {
  id: string;
  from: ArchitectureNodeId;
  to: ArchitectureNodeId;
  path: string;
  optional?: boolean;
};
// A conceptual request architecture, not a claim about any particular project.
export const architectureNodes: ArchitectureNode[] = [
  {
    id: "client",
    label: "CLIENT",
    technology: "React / TypeScript",
    description: "The interface turns an intention into an explicit request.",
    responsibilities: [
      "React",
      "TypeScript",
      "State management",
      "Accessibility",
      "Networking",
    ],
    position: [340, 85],
  },
  {
    id: "api",
    label: "API",
    technology: "REST / HTTP",
    description: "The boundary between clients and application logic.",
    responsibilities: [
      "REST APIs",
      "Validation",
      "Authentication",
      "Rate limiting",
      "Error handling",
      "Logging",
    ],
    position: [340, 175],
  },
  {
    id: "auth",
    label: "AUTHENTICATION",
    technology: "Identity / permissions",
    description:
      "Verify identity, then check what this identity is allowed to do.",
    responsibilities: [
      "Token validation",
      "Session handling",
      "Authorization",
      "Least privilege",
    ],
    position: [340, 265],
  },
  {
    id: "service",
    label: "APPLICATION SERVICE",
    technology: "Node.js / Go",
    description:
      "Application rules remain separate from transport and storage concerns.",
    responsibilities: [
      "Node.js",
      "Go",
      "Business logic",
      "Concurrency",
      "Background tasks",
    ],
    position: [340, 355],
  },
  {
    id: "cache",
    label: "CACHE",
    technology: "Redis",
    description:
      "Fast, temporary access with an explicit expiry and invalidation strategy.",
    responsibilities: ["Redis", "TTL", "Cache invalidation", "Session storage"],
    position: [145, 460],
  },
  {
    id: "database",
    label: "DATABASE",
    technology: "PostgreSQL",
    description:
      "Persistent, structured data with rules the application can depend on.",
    responsibilities: [
      "PostgreSQL",
      "Schema design",
      "Relations",
      "Indexes",
      "Transactions",
    ],
    position: [535, 460],
  },
  {
    id: "worker",
    label: "BACKGROUND WORKER",
    technology: "Optional / asynchronous",
    description:
      "Slow or retryable work can run outside the request-response cycle.",
    responsibilities: [
      "Job queues",
      "Idempotency",
      "Bounded retries",
      "Observability",
    ],
    position: [610, 355],
  },
];
export const architectureConnections: ArchitectureConnection[] = [
  { id: "client-api", from: "client", to: "api", path: "M340 117V143" },
  { id: "api-auth", from: "api", to: "auth", path: "M340 207V233" },
  { id: "auth-service", from: "auth", to: "service", path: "M340 297V323" },
  {
    id: "service-cache",
    from: "service",
    to: "cache",
    path: "M340 387V407H145V428",
  },
  {
    id: "service-database",
    from: "service",
    to: "database",
    path: "M340 387V407H535V428",
  },
  {
    id: "service-worker",
    from: "service",
    to: "worker",
    path: "M430 355H530",
    optional: true,
  },
];
export const requestSteps = [
  {
    number: "01",
    label: "THE REQUEST",
    statement: "An interaction becomes a network request.",
    detail:
      "The client sends GET /api/projects with the context the server needs.",
  },
  {
    number: "02",
    label: "THE BOUNDARY",
    statement: "The API validates what entered the system.",
    detail: "Input is checked. Identity is verified. Permissions are enforced.",
  },
  {
    number: "03",
    label: "THE LOGIC",
    statement: "Application services decide what needs to happen.",
    detail:
      "Business rules coordinate the work, independently of the HTTP layer.",
  },
  {
    number: "04",
    label: "THE DATA",
    statement: "Cache and persistent storage serve different responsibilities.",
    detail:
      "This example follows a cache miss: check Redis, then query PostgreSQL. A cache hit can skip that query.",
  },
  {
    number: "05",
    label: "THE RESPONSE",
    statement: "The result travels back to the interface.",
    detail:
      "A structured response crosses the same boundaries and updates the client.",
  },
] as const;
export function immediateDependencies(
  id: ArchitectureNodeId,
): ArchitectureNodeId[] {
  return architectureConnections.flatMap((edge) =>
    edge.from === id ? [edge.to] : edge.to === id ? [edge.from] : [],
  );
}
