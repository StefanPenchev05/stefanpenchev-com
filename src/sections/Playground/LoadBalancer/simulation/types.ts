export type Algorithm = "round-robin" | "random" | "least-connections";
export type Rate = "low" | "medium" | "high";
export type Server = { id: number; active: number; processed: number };
export type Job = { id: number; serverId: number; completesAt: number };
export type Event = { id: number; serverId: number; createdAt: number };
export type Simulation = {
  servers: Server[];
  jobs: Job[];
  events: Event[];
  clock: number;
  nextArrival: number;
  cursor: number;
  total: number;
};
export const intervals: Record<Rate, number> = {
  low: 1500,
  medium: 750,
  high: 300,
};
