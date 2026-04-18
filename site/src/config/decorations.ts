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
  // Bubbles scattered through the water column — visible during transitions
  // { id: 'bub-1', src: '/assets/decorations/2_bubbles.png', top: 12, left: 50, width: 5, layer: 'foreground', animation: 'anim-rise', opacity: 0.6, visibleFromSection: 1 },
  { id: 'bub-2', src: '/assets/decorations/3_bubbles.png', top: 30, left: 25, width: 4, layer: 'foreground', animation: 'anim-rise', opacity: 0.5, visibleFromSection: 1 },
  { id: 'bub-3', src: '/assets/decorations/2_bubbles.png', top: 50, left: 70, width: 4, layer: 'foreground', animation: 'anim-rise', opacity: 0.4, visibleFromSection: 1 },
  { id: 'bub-4', src: '/assets/decorations/3_bubbles.png', top: 70, left: 40, width: 3, layer: 'foreground', animation: 'anim-rise', opacity: 0.3, visibleFromSection: 1 },
  { id: 'bub-5', src: '/assets/decorations/2_bubbles.png', top: 88, left: 60, width: 3, layer: 'foreground', animation: 'anim-rise', opacity: 0.25, visibleFromSection: 1 },
];
