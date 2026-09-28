import type { Algorithm, Rate } from "./simulation/types";
import styles from "../Playground.module.css";
type Props = {
  algorithm: Algorithm;
  onAlgorithm: (value: Algorithm) => void;
  rate: Rate;
  onRate: (value: Rate) => void;
  count: number;
  onCount: (value: number) => void;
  running: boolean;
  onToggle: () => void;
  onReset: () => void;
};
export function LoadBalancerControls(p: Props) {
  return (
    <div className={styles.controls}>
      <label>
        ALGORITHM
        <select
          value={p.algorithm}
          onChange={(e) => p.onAlgorithm(e.target.value as Algorithm)}
        >
          <option value="round-robin">Round Robin</option>
          <option value="random">Random</option>
          <option value="least-connections">Least Connections</option>
        </select>
      </label>
      <label>
        SERVER COUNT
        <select
          value={p.count}
          onChange={(e) => p.onCount(Number(e.target.value))}
        >
          {[2, 3, 4, 5].map((count) => (
            <option key={count} value={count}>
              {count} servers
            </option>
          ))}
        </select>
      </label>
      <label>
        REQUEST RATE
        <select
          value={p.rate}
          onChange={(e) => p.onRate(e.target.value as Rate)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>
      <div className={styles.actions}>
        <button type="button" onClick={p.onToggle}>
          {p.running ? "Pause" : "Start"}
          <span aria-hidden="true">{p.running ? "Ⅱ" : "↗"}</span>
        </button>
        <button type="button" onClick={p.onReset}>
          Reset
        </button>
      </div>
    </div>
  );
}
