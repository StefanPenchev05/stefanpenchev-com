import type { ArchitectureNodeId } from "../../data/architecture";
type Point = readonly [number, number];
type RequestLeg = {
  from: ArchitectureNodeId;
  to: ArchitectureNodeId;
  edge: string;
  points: readonly Point[];
  start: number;
  end: number;
};
// The service checks cache, receives a miss, queries persistent storage, and returns.
export const requestLegs: readonly RequestLeg[] = [
  {
    from: "client",
    to: "api",
    edge: "client-api",
    points: [
      [340, 85],
      [340, 175],
    ],
    start: 0,
    end: 0.13,
  },
  {
    from: "api",
    to: "auth",
    edge: "api-auth",
    points: [
      [340, 175],
      [340, 265],
    ],
    start: 0.13,
    end: 0.28,
  },
  {
    from: "auth",
    to: "service",
    edge: "auth-service",
    points: [
      [340, 265],
      [340, 355],
    ],
    start: 0.28,
    end: 0.43,
  },
  {
    from: "service",
    to: "cache",
    edge: "service-cache",
    points: [
      [340, 355],
      [340, 407],
      [145, 407],
      [145, 460],
    ],
    start: 0.43,
    end: 0.56,
  },
  {
    from: "cache",
    to: "service",
    edge: "service-cache",
    points: [
      [145, 460],
      [145, 407],
      [340, 407],
      [340, 355],
    ],
    start: 0.56,
    end: 0.63,
  },
  {
    from: "service",
    to: "database",
    edge: "service-database",
    points: [
      [340, 355],
      [340, 407],
      [535, 407],
      [535, 460],
    ],
    start: 0.63,
    end: 0.74,
  },
  {
    from: "database",
    to: "service",
    edge: "service-database",
    points: [
      [535, 460],
      [535, 407],
      [340, 407],
      [340, 355],
    ],
    start: 0.74,
    end: 0.81,
  },
  {
    from: "service",
    to: "auth",
    edge: "auth-service",
    points: [
      [340, 355],
      [340, 265],
    ],
    start: 0.81,
    end: 0.88,
  },
  {
    from: "auth",
    to: "api",
    edge: "api-auth",
    points: [
      [340, 265],
      [340, 175],
    ],
    start: 0.88,
    end: 0.94,
  },
  {
    from: "api",
    to: "client",
    edge: "client-api",
    points: [
      [340, 175],
      [340, 85],
    ],
    start: 0.94,
    end: 1,
  },
];
// Precompute lengths once. No SVG geometry API or layout reads during scrolling.
const lengths = requestLegs.map((leg) =>
  leg.points
    .slice(1)
    .map((point, index) =>
      Math.hypot(
        point[0] - leg.points[index][0],
        point[1] - leg.points[index][1],
      ),
    ),
);
export function requestAtProgress(progress: number) {
  const p = Math.max(0, Math.min(1, progress));
  const index = Math.max(
    0,
    requestLegs.findIndex((leg) => p <= leg.end),
  );
  const leg = requestLegs[index];
  const segments = lengths[index];
  const total = segments.reduce((sum, length) => sum + length, 0);
  let remaining = ((p - leg.start) / (leg.end - leg.start)) * total;
  let x = leg.points[0][0],
    y = leg.points[0][1];
  for (let i = 0; i < segments.length; i++) {
    const amount = Math.min(1, Math.max(0, remaining / segments[i]));
    x = leg.points[i][0] + (leg.points[i + 1][0] - leg.points[i][0]) * amount;
    y = leg.points[i][1] + (leg.points[i + 1][1] - leg.points[i][1]) * amount;
    if (remaining <= segments[i]) break;
    remaining -= segments[i];
  }
  return {
    x,
    y,
    from: leg.from,
    to: leg.to,
    edge: leg.edge,
    returning: p >= 0.74,
    step: p < 0.13 ? 0 : p < 0.28 ? 1 : p < 0.43 ? 2 : p < 0.74 ? 3 : 4,
  };
}
