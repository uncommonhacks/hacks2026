import { createContext, useContext } from 'react';

export interface NavigationContextValue {
  currentSection: number;
  isTransitioning: boolean;
  navigateTo: (index: number, instant?: boolean) => void;
  navigateBy: (delta: number) => void;
  imageHeight: number;
  setImageHeight: (h: number) => void;
}

export const NavigationContext = createContext<NavigationContextValue | null>(null);

export function useNavigation() {
  const ctx = useContext(NavigationContext);
  if (!ctx) throw new Error('useNavigation must be used within NavigationProvider');
  return ctx;
}

type LayerName = 'background' | 'midground' | 'foreground';

const layerRefs: Record<LayerName, HTMLElement | null> = {
  background: null,
  midground: null,
  foreground: null,
};

export function registerLayer(name: LayerName, el: HTMLElement | null) {
  layerRefs[name] = el;
}

export function getRegisteredLayer(name: LayerName) {
  return layerRefs[name];
}
