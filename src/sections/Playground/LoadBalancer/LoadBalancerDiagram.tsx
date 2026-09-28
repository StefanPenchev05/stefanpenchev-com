import type { CSSProperties } from "react";
import type { Simulation } from "./simulation/types";
import { ServerNode } from "./ServerNode";
import styles from "../Playground.module.css";
export function LoadBalancerDiagram({
  state,
  active,
  reduced,
}: {
  state: Simulation;
  active: boolean;
  reduced: boolean;
}) {
  const count = state.servers.length;
  const path = (index: number) =>
    `M 500 14 L 500 100 L ${((index + 0.5) * 1000) / count} 170 L ${((index + 0.5) * 1000) / count} 215`;
  return (
    <div className={styles.diagram} data-running={active}>
      <div className={styles.incoming}>
        REQUESTS <span>{String(state.total).padStart(3, "0")}</span>
      </div>
      <div className={styles.balancer}>
        LOAD BALANCER <span aria-hidden="true">↓</span>
      </div>
      <svg
        className={styles.wires}
        viewBox="0 0 1000 220"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {state.servers.map((server, index) => (
          <path key={server.id} d={path(index)} />
        ))}
        {!reduced &&
          state.events.map((event) => (
            <circle
              key={event.id}
              className={styles.packet}
              r="3"
              style={{ offsetPath: `path('${path(event.serverId - 1)}')` }}
            />
          ))}
      </svg>
      <div
        className={styles.servers}
        style={{ "--server-count": count } as CSSProperties}
      >
        {state.servers.map((server) => (
          <ServerNode
            key={server.id}
            server={server}
            destination={state.events.at(-1)?.serverId === server.id}
          />
        ))}
      </div>
    </div>
  );
}
