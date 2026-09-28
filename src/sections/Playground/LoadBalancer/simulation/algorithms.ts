import type { Server } from "./types";
export function selectRoundRobinServer(
  servers: readonly Server[],
  cursor: number,
) {
  return servers.length ? servers[cursor % servers.length].id : undefined;
}
export function selectRandomServer(
  servers: readonly Server[],
  random = Math.random,
) {
  return servers.length
    ? servers[
        Math.min(
          servers.length - 1,
          Math.max(0, Math.floor(random() * servers.length)),
        )
      ].id
    : undefined;
}
export function selectLeastConnectionsServer(servers: readonly Server[]) {
  return servers.reduce<Server | undefined>(
    (best, server) => (!best || server.active < best.active ? server : best),
    undefined,
  )?.id;
}
