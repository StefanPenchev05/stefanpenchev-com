// Narrative emphasis is shared by labels, materials and connections, never React state.
export function nodeEmphasis(index: number, progress: number): number {
  const stage = Math.min(3, Math.floor(Math.max(0, progress) * 4));
  const active =
    stage === 0
      ? index === 0
      : stage === 1
        ? index < 2
        : stage === 2
          ? index === 1 || index === 2
          : index >= 2;
  return active ? 1 : 0.38;
}
export function connectionEmphasis(index: number, progress: number): number {
  const stage = Math.min(3, Math.floor(Math.max(0, progress) * 4));
  return stage === 0
    ? 0.22
    : stage === 1
      ? index === 0
        ? 0.78
        : 0.2
      : stage === 2
        ? index === 1
          ? 0.78
          : 0.26
        : index >= 2
          ? 0.78
          : 0.3;
}
