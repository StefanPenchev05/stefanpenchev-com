import type { MeshStandardMaterialParameters } from "three";

export const palette = {
  graphite: "#090B0E",
  charcoal: "#12161B",
  panelGray: "#1D242B",
  primaryText: "#E6EDF3",
  mutedSteel: "#8A98A8",
  systemCyan: "#5CC8D7",
  securityGreen: "#77C98D",
  dataAmber: "#D6A75C",
  alertRed: "#D96C6C"
} as const;

export const materialPresets = {
  graphiteMetal: {
    color: palette.graphite,
    roughness: 0.58,
    metalness: 0.38,
    envMapIntensity: 0.35
  },
  charcoalPlastic: {
    color: palette.charcoal,
    roughness: 0.82,
    metalness: 0.04,
    envMapIntensity: 0.18
  },
  panelComposite: {
    color: palette.panelGray,
    roughness: 0.7,
    metalness: 0.16,
    envMapIntensity: 0.24
  },
  brushedAccent: {
    color: palette.mutedSteel,
    roughness: 0.46,
    metalness: 0.62,
    envMapIntensity: 0.42
  },
  displayGlass: {
    color: "#071015",
    roughness: 0.34,
    metalness: 0.12,
    envMapIntensity: 0.55,
    emissive: "#081a20",
    emissiveIntensity: 0.18
  },
  monitorSurface: {
    color: "#081218",
    roughness: 0.42,
    metalness: 0.06,
    emissive: "#0b2830",
    emissiveIntensity: 0.58
  },
  cyanSignal: {
    color: palette.systemCyan,
    roughness: 0.45,
    metalness: 0.18,
    emissive: palette.systemCyan,
    emissiveIntensity: 0.55
  },
  greenSignal: {
    color: palette.securityGreen,
    roughness: 0.45,
    metalness: 0.12,
    emissive: palette.securityGreen,
    emissiveIntensity: 0.42
  },
  amberSignal: {
    color: palette.dataAmber,
    roughness: 0.5,
    metalness: 0.16,
    emissive: palette.dataAmber,
    emissiveIntensity: 0.35
  }
} satisfies Record<string, MeshStandardMaterialParameters>;

export type MaterialPresetName = keyof typeof materialPresets;
