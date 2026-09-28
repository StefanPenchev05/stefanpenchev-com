import { expect, it } from "vitest";
import {
  connectionEmphasis,
  nodeEmphasis,
} from "../src/three/ArchitectureModel/storyEmphasis";
it("follows the four intro passages rather than a timer", () => {
  expect(nodeEmphasis(0, 0)).toBeGreaterThan(nodeEmphasis(2, 0));
  expect(connectionEmphasis(0, 0.3)).toBeGreaterThan(
    connectionEmphasis(1, 0.3),
  );
  expect(connectionEmphasis(1, 0.6)).toBeGreaterThan(
    connectionEmphasis(0, 0.6),
  );
  expect(connectionEmphasis(2, 0.9)).toBeGreaterThan(
    connectionEmphasis(0, 0.9),
  );
  expect(connectionEmphasis(3, 0.9)).toEqual(connectionEmphasis(2, 0.9));
});
