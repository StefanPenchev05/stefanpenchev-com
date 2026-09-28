import { Component, type ReactNode } from "react";
import { StaticArchitecture } from "./StaticArchitecture";
// Also catches failed lazy imports; the fallback itself has no WebGL dependencies.
export class SceneBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <StaticArchitecture /> : this.props.children;
  }
}
