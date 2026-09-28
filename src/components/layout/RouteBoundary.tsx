import { Component, type ReactNode } from "react";
export class RouteBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <div className="page-width route-loading" role="alert">
        <h1>Unable to load this page.</h1>
        <p>Please reload to try again.</p>
        <a href={window.location.href}>Reload page ↻</a>
      </div>
    ) : (
      this.props.children
    );
  }
}
