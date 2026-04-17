// Scene decorations are viewport-fixed and section-aware.
// They create the "ocean floor" framing at the bottom of each scene
// and position creatures in the open water above.
//
// Units: bottom/left/width use viewport-relative values (vw/vh).
// depth: 'far' | 'mid' | 'near' controls visual layering.

export interface SceneDecorationConfig {
  id: string;
  src: string;
  // Position relative to viewport
  bottom: number;  // vh from bottom (negative = partially off-screen)
  left: number;    // vw from left
  width: number;   // vw
  depth: 'far' | 'mid' | 'near';
  animation?: string;
  flipX?: boolean;
  opacity?: number;
  isRock?: boolean;
}

export interface SectionScene {
  sectionIndex: number;
  decorations: SceneDecorationConfig[];
}

const R1 = '/assets/decorations/rock1.png';
const R2 = '/assets/decorations/rock2.png';
const R3 = '/assets/decorations/rock3.png';
const R4 = '/assets/decorations/rock4.png';
const YELLOW_CORAL = '/assets/decorations/yellow_coral.png';
const SEAWEED1 = '/assets/decorations/green_seaweed1.png';
const SEAWEED2 = '/assets/decorations/green_seaweed2.png';
const CLAM = '/assets/decorations/clam.png';
const SHARK = '/assets/decorations/shark.png';
const OCTOPUS = '/assets/decorations/octopus.png';
const SQUID = '/assets/decorations/squid.png';
const P_SQUID = '/assets/decorations/purple_squid.png';
const BIRD1 = '/assets/decorations/bird1.png';
const BIRD2 = '/assets/decorations/bird2.png';
const BIRD3 = '/assets/decorations/bird3.png';
const BIRD4 = '/assets/decorations/bird4.png';
const SEAGULL = '/assets/decorations/seagull.png';
const BUBBLES2 = '/assets/decorations/2_bubbles.png';
const BUBBLES3 = '/assets/decorations/3_bubbles.png';
const FISH_SCHOOL = '/assets/decorations/SchoolOfFish.png';
const ORANGE_CORAL = '/assets/decorations/orange_coral.png';
const BLUE_CORAL = '/assets/decorations/blue_coral.png';
const PURPLE_CORAL_1 = '/assets/decorations/purple_coral_1.png';
const PURPLE_CORAL_2 = '/assets/decorations/purple_coral_2.png';
const ORANGE_STAR = '/assets/decorations/orange_star.png';

function rock(config: Omit<SceneDecorationConfig, 'isRock'>): SceneDecorationConfig {
  return { ...config, isRock: true };
}

export const SECTION_SCENES: SectionScene[] = [
  // === HOME (index 0) — Beach/surface ===
  {
    sectionIndex: 0,
    decorations: [
      // Birds in the sky
      { id: 'h-bird1',   src: BIRD1,   bottom: 75, left: 8,  width: 8,  depth: 'far', animation: 'anim-drift-slow' },
      { id: 'h-bird2',   src: BIRD2,   bottom: 82, left: 65, width: 6,  depth: 'far', animation: 'anim-drift-slow', flipX: true },
      { id: 'h-bird3',   src: BIRD3,   bottom: 70, left: 40, width: 5,  depth: 'far', animation: 'anim-drift-slow' },
      { id: 'h-bird4',   src: BIRD4,   bottom: 88, left: 80, width: 4,  depth: 'far', animation: 'anim-drift-slow' },
      { id: 'h-seagull', src: SEAGULL, bottom: 78, left: 85, width: 10, depth: 'mid', animation: 'anim-float' },
    ],
  },

  // === TRACKS (index 1) — Mid water ===
  {
    sectionIndex: 1,
    decorations: [
      // Shark swimming across
      { id: 't-shark', src: SHARK, bottom: 52, left: 52, width: 30, depth: 'mid', animation: 'anim-swim' },
      // School of fish drifting in the upper mid-water
      { id: 't-school', src: FISH_SCHOOL, bottom: 62, left: 6, width: 26, depth: 'far', animation: 'anim-drift-slow', opacity: 0.65 },
      // Bubbles
      { id: 't-bub', src: BUBBLES3, bottom: 42, left: 26, width: 5, depth: 'far', animation: 'anim-rise' },
      { id: 't-bub2', src: BUBBLES2, bottom: 30, left: 60, width: 4, depth: 'far', animation: 'anim-rise', opacity: 0.7 },
      // Far rocks — spread across the frame to strengthen depth separation
      rock({ id: 't-rock-far1', src: R4, bottom: 6, left: 4, width: 18, depth: 'far', opacity: 0.28 }),
      rock({ id: 't-rock-far2', src: R3, bottom: 8, left: 40, width: 13, depth: 'far', opacity: 0.24 }),
      rock({ id: 't-rock-far3', src: R1, bottom: 5, left: 74, width: 17, depth: 'far', opacity: 0.3, flipX: true }),
      // Mid rocks + seaweed
      rock({ id: 't-rock-mid1', src: R3, bottom: -4, left: -10, width: 31, depth: 'mid', opacity: 0.72 }),
      rock({ id: 't-rock-mid2', src: R2, bottom: -2, left: 59, width: 29, depth: 'mid', flipX: true, opacity: 0.72 }),
      { id: 't-seaweed1', src: SEAWEED1, bottom: 11, left: 4,  width: 8, depth: 'mid', animation: 'anim-sway' },
      { id: 't-seaweed2', src: SEAWEED2, bottom: 14, left: 77, width: 8, depth: 'mid', animation: 'anim-sway' },
      { id: 't-seaweed-extra1', src: SEAWEED2, bottom: 9, left: 18, width: 7, depth: 'mid', animation: 'anim-sway', flipX: true },
      { id: 't-seaweed-extra2', src: SEAWEED1, bottom: 10, left: 68, width: 6, depth: 'mid', animation: 'anim-sway' },
      { id: 't-yellow-coral', src: YELLOW_CORAL, bottom: 9, left: 86, width: 7, depth: 'mid' },
      { id: 't-orange-coral', src: ORANGE_CORAL, bottom: 8, left: 12, width: 6, depth: 'mid' },
      { id: 't-orange-star', src: ORANGE_STAR, bottom: 4, left: 46, width: 4, depth: 'mid' },
      // Near rocks
      rock({ id: 't-rock-near1', src: R1, bottom: -12, left: -16, width: 37, depth: 'near', opacity: 0.88 }),
      rock({ id: 't-rock-near2', src: R4, bottom: -13, left: 69, width: 41, depth: 'near', flipX: true, opacity: 0.88 }),
      { id: 't-seaweed3', src: SEAWEED1, bottom: 7, left: 90, width: 10, depth: 'near', animation: 'anim-sway', flipX: true },
      { id: 't-seaweed-near2', src: SEAWEED2, bottom: 5, left: -2, width: 11, depth: 'near', animation: 'anim-sway' },
    ],
  },

  // === SPONSORS (index 2) — Deep water ===
  {
    sectionIndex: 2,
    decorations: [
      // Deep creatures — bigger squid, prominent clam
      { id: 's-squid',   src: SQUID,   bottom: 58, left: 72, width: 22, depth: 'mid', animation: 'anim-float' },
      // School of fish drifting in the background
      { id: 's-school', src: FISH_SCHOOL, bottom: 50, left: 3, width: 28, depth: 'far', animation: 'anim-drift-slow', opacity: 0.55 },
      // Bubbles
      { id: 's-bub', src: BUBBLES2, bottom: 42, left: 50, width: 4, depth: 'far', animation: 'anim-rise' },
      { id: 's-bub2', src: BUBBLES3, bottom: 30, left: 80, width: 4, depth: 'far', animation: 'anim-rise', opacity: 0.7 },
      // Far rocks (darker feel)
      rock({ id: 's-rock-far1', src: R2, bottom: 3,  left: 40, width: 18, depth: 'far', opacity: 0.35 }),
      // Mid rocks
      rock({ id: 's-rock-mid1', src: R1, bottom: -2, left: -3, width: 28, depth: 'mid' }),
      rock({ id: 's-rock-mid2', src: R3, bottom: -1, left: 65, width: 25, depth: 'mid', flipX: true }),
      { id: 's-clam', src: CLAM, bottom: 9, left: 72, width: 14, depth: 'mid' },
      { id: 's-clam-2', src: CLAM, bottom: 8, left: 18, width: 10, depth: 'mid' },
      { id: 's-blue-coral', src: BLUE_CORAL, bottom: 8, left: 42, width: 8, depth: 'mid' },
      { id: 's-seaweed1', src: SEAWEED1, bottom: 10, left: 3, width: 8, depth: 'mid', animation: 'anim-sway' },
      { id: 's-seaweed2', src: SEAWEED2, bottom: 12, left: 86, width: 8, depth: 'mid', animation: 'anim-sway', flipX: true },
      // Near rocks
      rock({ id: 's-rock-near1', src: R4, bottom: -9,  left: -12, width: 44, depth: 'near' }),
      rock({ id: 's-rock-near2', src: R1, bottom: -11, left: 58,  width: 48, depth: 'near', flipX: true }),
      { id: 's-seaweed-near', src: SEAWEED2, bottom: 6, left: 88, width: 10, depth: 'near', animation: 'anim-sway' },
    ],
  },

  // === FAQ (index 3) — Abyss ===
  {
    sectionIndex: 3,
    decorations: [
      // Purple squid drifting (bigger)
      { id: 'f-psquid', src: P_SQUID, bottom: 55, left: 70, width: 20, depth: 'mid', animation: 'anim-float' },
      // Faint school of fish in distance
      { id: 'f-school', src: FISH_SCHOOL, bottom: 48, left: 8, width: 24, depth: 'far', animation: 'anim-drift-slow', opacity: 0.35 },
      // Sparse bubbles
      { id: 'f-bub', src: BUBBLES2, bottom: 35, left: 20, width: 4, depth: 'far', animation: 'anim-rise', opacity: 0.5 },
      { id: 'f-bub2', src: BUBBLES3, bottom: 25, left: 82, width: 3, depth: 'far', animation: 'anim-rise', opacity: 0.4 },
      // Dark rock silhouettes
      rock({ id: 'f-rock-far1', src: R3, bottom: 4,  left: 30, width: 16, depth: 'far', opacity: 0.3 }),
      rock({ id: 'f-rock-mid1', src: R2, bottom: -2, left: -5, width: 30, depth: 'mid', opacity: 0.7 }),
      rock({ id: 'f-rock-mid2', src: R4, bottom: -1, left: 60, width: 28, depth: 'mid', opacity: 0.7, flipX: true }),
      // Deep-sea seaweed silhouettes
      { id: 'f-seaweed1', src: SEAWEED1, bottom: 8, left: 6, width: 8, depth: 'mid', animation: 'anim-sway', opacity: 0.65 },
      { id: 'f-seaweed2', src: SEAWEED2, bottom: 10, left: 84, width: 9, depth: 'mid', animation: 'anim-sway', opacity: 0.65, flipX: true },
      { id: 'f-purple-coral', src: PURPLE_CORAL_1, bottom: 6, left: 40, width: 8, depth: 'mid', opacity: 0.75 },
      rock({ id: 'f-rock-near1', src: R1, bottom: -10, left: -10, width: 42, depth: 'near' }),
      rock({ id: 'f-rock-near2', src: R2, bottom: -12, left: 60,  width: 48, depth: 'near', flipX: true }),
    ],
  },

  // === CONTACT (index 4) — Deep abyss ===
  {
    sectionIndex: 4,
    decorations: [
      // Octopus — deep cave creature, shifted right to clear the centered CTA
      { id: 'c-octopus', src: OCTOPUS, bottom: 6, left: 58, width: 38, depth: 'mid', animation: 'anim-float', opacity: 0.8 },
      // Faint silhouette of a fish school passing far behind (top-left so it clears the octopus)
      { id: 'c-school', src: FISH_SCHOOL, bottom: 62, left: 8, width: 22, depth: 'far', animation: 'anim-drift-slow', opacity: 0.25 },
      // Minimal — deepest point
      { id: 'c-bub1', src: BUBBLES2, bottom: 30, left: 15, width: 4, depth: 'far', animation: 'anim-rise', opacity: 0.35 },
      { id: 'c-bub2', src: BUBBLES3, bottom: 45, left: 70, width: 3, depth: 'far', animation: 'anim-rise', opacity: 0.3 },
      // Sparse dark rocks
      rock({ id: 'c-rock-mid1', src: R3, bottom: -3, left: -8, width: 32, depth: 'mid', opacity: 0.5 }),
      rock({ id: 'c-rock-mid2', src: R1, bottom: -2, left: 65, width: 30, depth: 'mid', opacity: 0.5, flipX: true }),
      // Dark silhouette seaweed
      { id: 'c-seaweed1', src: SEAWEED2, bottom: 5, left: 2, width: 8, depth: 'mid', animation: 'anim-sway', opacity: 0.5 },
      { id: 'c-seaweed2', src: SEAWEED1, bottom: 7, left: 86, width: 8, depth: 'mid', animation: 'anim-sway', opacity: 0.5, flipX: true },
      { id: 'c-purple-coral', src: PURPLE_CORAL_2, bottom: 4, left: 72, width: 7, depth: 'mid', opacity: 0.6 },
      rock({ id: 'c-rock-near1', src: R4, bottom: -12, left: -15, width: 48, depth: 'near', opacity: 0.8 }),
      rock({ id: 'c-rock-near2', src: R2, bottom: -14, left: 55,  width: 50, depth: 'near', opacity: 0.8, flipX: true }),
    ],
  },
];
