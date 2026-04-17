export interface SectionConfig {
  id: string;
  label: string;
  hash: string;
  // 0–1 position within the background artwork
  bgPosition: number;
  // Depth zone for visual effects (0 = surface, 1 = abyss)
  depthZone: number;
}

export const SECTIONS: SectionConfig[] = [
  { id: 'home',     label: 'Home',     hash: '#home',     bgPosition: 0,    depthZone: 0 },
  { id: 'tracks',   label: 'Tracks',   hash: '#tracks',   bgPosition: 0.37, depthZone: 0.4 },
  { id: 'sponsors', label: 'Sponsors', hash: '#sponsors', bgPosition: 0.57, depthZone: 0.6 },
  { id: 'faq',      label: 'FAQ',      hash: '#faq',      bgPosition: 0.77, depthZone: 0.8 },
  { id: 'contact',  label: 'Contact',  hash: '#contact',  bgPosition: 0.92, depthZone: 1 },
];

export const TRANSITION_DURATION = 1.0;
export const TRANSITION_EASE = 'power2.inOut';

// Parallax rates per layer during transitions
export const PARALLAX_RATES = {
  background: 0.85,
  midground: 1.0,
  foreground: 1.2,
} as const;
