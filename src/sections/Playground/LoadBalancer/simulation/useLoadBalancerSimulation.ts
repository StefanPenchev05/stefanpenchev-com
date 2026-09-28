import { useEffect, useRef, useState, type RefObject } from "react";
import { advanceSimulation, createSimulation, snapshot } from "./engine";
import type { Algorithm, Rate } from "./types";
export function useLoadBalancerSimulation(
  container: RefObject<HTMLElement | null>,
) {
  const [algorithm, setAlgorithm] = useState<Algorithm>("round-robin");
  const [rate, setRate] = useState<Rate>("medium");
  const [running, setRunning] = useState(false);
  const [visible, setVisible] = useState(false);
  const [tabVisible, setTabVisible] = useState(!document.hidden);
  const engine = useRef(createSimulation(3));
  const [state, setState] = useState(() => snapshot(engine.current));
  const active = running && visible && tabVisible;
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => setVisible(entries.some((entry) => entry.isIntersecting)),
      { threshold: 0 },
    );
    if (container.current) observer.observe(container.current);
    const onVisibility = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [container]);
  useEffect(() => {
    if (!active) return;
    const timer = window.setInterval(() => {
      if (advanceSimulation(engine.current, 100, algorithm, rate))
        setState(snapshot(engine.current));
    }, 100);
    return () => window.clearInterval(timer);
  }, [active, algorithm, rate]);
  const reset = (count = engine.current.servers.length) => {
    setRunning(false);
    engine.current = createSimulation(count);
    setState(snapshot(engine.current));
  };
  return {
    state,
    algorithm,
    setAlgorithm,
    rate,
    setRate,
    running,
    active,
    setRunning,
    reset,
  };
}
