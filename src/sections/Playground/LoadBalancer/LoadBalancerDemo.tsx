import { useRef } from "react";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import { useLoadBalancerSimulation } from "./simulation/useLoadBalancerSimulation";
import { LoadBalancerControls } from "./LoadBalancerControls";
import { LoadBalancerDiagram } from "./LoadBalancerDiagram";
import type { Algorithm } from "./simulation/types";
import styles from "../Playground.module.css";
const explanations: Record<Algorithm, string> = {
  "round-robin":
    "Requests are assigned sequentially across available servers. Simple and predictable, without considering current load.",
  random:
    "Each request chooses an available server at random. Distribution can be uneven over short runs.",
  "least-connections":
    "Each new request goes to the server handling the fewest active jobs. Ties go to the first matching server.",
};
export function LoadBalancerDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const sim = useLoadBalancerSimulation(ref);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  return (
    <div ref={ref} className={styles.demo}>
      <LoadBalancerControls
        algorithm={sim.algorithm}
        onAlgorithm={sim.setAlgorithm}
        rate={sim.rate}
        onRate={sim.setRate}
        count={sim.state.servers.length}
        onCount={sim.reset}
        running={sim.running}
        onToggle={() => sim.setRunning(!sim.running)}
        onReset={() => sim.reset()}
      />
      <div className={styles.readout}>
        <p role="status">
          {sim.active
            ? "RUNNING"
            : sim.running
              ? "AUTO-PAUSED / OUT OF VIEW OR TAB HIDDEN"
              : "PAUSED"}
        </p>
        <span>SIMULATED PROCESSING / 1.2–3.6 SEC</span>
      </div>
      <LoadBalancerDiagram
        state={sim.state}
        active={sim.active}
        reduced={reduced}
      />
      <div className={styles.notes}>
        <div>
          <p className="eyebrow accent">ROUTING NOTES</p>
          <p>{explanations[sim.algorithm]}</p>
          <p className={styles.small}>
            Active counts track unfinished jobs. Changing server count resets
            the run. Pausing freezes processing and incoming requests.
          </p>
        </div>
        <div className={styles.log}>
          <p className="eyebrow muted">RECENT ASSIGNMENTS / LAST 8</p>
          <ol aria-label="Recent request assignments">
            {sim.state.events.length ? (
              [...sim.state.events].reverse().map((event) => (
                <li key={event.id}>
                  request {String(event.id).padStart(3, "0")} <span>→</span>{" "}
                  server_{String(event.serverId).padStart(2, "0")}
                </li>
              ))
            ) : (
              <li className={styles.empty}>Start a run to observe routing.</li>
            )}
          </ol>
        </div>
      </div>
    </div>
  );
}
