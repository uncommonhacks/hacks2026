// Parallax decorations — positioned as % of background image, move with parallax layers.
// These are "traveling" decorations visible during transitions between sections.
// Scene-framing decorations (rocks, corals at screen bottom) are in sceneDecorations.ts.

export interface DecorationConfig {
  id: string;
  src: string;
  top: number;
  left: number;
  width: number;
  layer: 'midground' | 'foreground';
  darkenAfter?: number;
  animation?: string;
  flipX?: boolean;
  opacity?: number;
  visibleFromSection?: number;
  visibleThroughSection?: number;
}

export const DECORATIONS: DecorationConfig[] = [
  // Bubble PNGs intentionally removed (per-section bubbles live in sceneDecorations.ts)
];
