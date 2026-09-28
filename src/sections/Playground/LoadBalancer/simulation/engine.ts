import {
  selectLeastConnectionsServer,
  selectRandomServer,
  selectRoundRobinServer,
} from "./algorithms";
import { intervals, type Algorithm, type Rate, type Simulation } from "./types";
export const MAX_EVENTS = 8;
export function createSimulation(count: number): Simulation {
  return {
    servers: Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      active: 0,
      processed: 0,
    })),
    jobs: [],
    events: [],
    clock: 0,
    nextArrival: 0,
    cursor: 0,
    total: 0,
  };
}
// Logical time freezes while paused: returning to the tab never creates a catch-up burst.
export function advanceSimulation(
  state: Simulation,
  milliseconds: number,
  algorithm: Algorithm,
  rate: Rate,
  random = Math.random,
): boolean {
  state.clock += milliseconds;
  let changed = false;
  state.jobs = state.jobs.filter((job) => {
    if (job.completesAt > state.clock) return true;
    const server = state.servers.find((server) => server.id === job.serverId);
    if (server) {
      server.active--;
      server.processed++;
    }
    changed = true;
    return false;
  });
  if (state.clock >= state.nextArrival) {
    const id =
      algorithm === "round-robin"
        ? selectRoundRobinServer(state.servers, state.cursor++)
        : algorithm === "random"
          ? selectRandomServer(state.servers, random)
          : selectLeastConnectionsServer(state.servers);
    const server = state.servers.find((server) => server.id === id);
    if (server) {
      server.active++;
      state.total++;
      state.jobs.push({
        id: state.total,
        serverId: server.id,
        completesAt: state.clock + 1200 + random() * 2400,
      });
      state.events = [
        ...state.events,
        { id: state.total, serverId: server.id, createdAt: state.clock },
      ].slice(-MAX_EVENTS);
      changed = true;
    }
    state.nextArrival = state.clock + intervals[rate];
  }
  return changed;
}
export function snapshot(state: Simulation): Simulation {
  return {
    ...state,
    servers: state.servers.map((server) => ({ ...server })),
    jobs: [...state.jobs],
    events: [...state.events],
  };
}
