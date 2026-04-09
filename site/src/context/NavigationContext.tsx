import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import gsap from 'gsap';
import { SECTIONS, TRANSITION_DURATION, TRANSITION_EASE, PARALLAX_RATES } from '../config/sections';
import { NavigationContext, getRegisteredLayer } from './navigation';

function getInitialSectionIndex() {
  if (typeof window === 'undefined') return 0;

  const hash = window.location.hash;
  if (hash === '#hero' || hash === '#about') return 0;

  const idx = SECTIONS.findIndex((section) => section.hash === hash);
  return idx >= 0 ? idx : 0;
}

function getOffset(sectionIndex: number, imgHeight: number, viewportHeight: number): number {
  const maxScroll = Math.max(0, imgHeight - viewportHeight);
  return SECTIONS[sectionIndex].bgPosition * maxScroll;
}

export function NavigationProvider({ children }: { children: ReactNode }) {
  const initialSectionIndex = getInitialSectionIndex();
  const [currentSection, setCurrentSection] = useState(initialSectionIndex);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [imageHeight, setImageHeight] = useState(0);
  const currentSectionRef = useRef(initialSectionIndex);
  const isTransitioningRef = useRef(false);

  const navigateTo = useCallback((index: number, instant = false) => {
    if (index < 0 || index >= SECTIONS.length) return;
    if (isTransitioningRef.current && !instant) return;
    if (index === currentSectionRef.current && !instant) return;
    if (imageHeight <= 0) return;

    const viewportHeight = window.innerHeight;
    const toOffset = getOffset(index, imageHeight, viewportHeight);

    currentSectionRef.current = index;
    setCurrentSection(index);

    if (instant) {
      Object.entries(PARALLAX_RATES).forEach(([layer, rate]) => {
        const el = getRegisteredLayer(layer as keyof typeof PARALLAX_RATES);
        if (el) {
          gsap.set(el, { y: -toOffset * rate });
        }
      });
      return;
    }

    isTransitioningRef.current = true;
    setIsTransitioning(true);

    const tl = gsap.timeline({
      onComplete: () => {
        isTransitioningRef.current = false;
        setIsTransitioning(false);
      },
    });

    Object.entries(PARALLAX_RATES).forEach(([layer, rate]) => {
      const el = getRegisteredLayer(layer as keyof typeof PARALLAX_RATES);
      if (el) {
        tl.to(el, {
          y: -toOffset * rate,
          duration: TRANSITION_DURATION,
          ease: TRANSITION_EASE,
        }, 0);
      }
    });

    const backgroundEl = getRegisteredLayer('background');
    if (backgroundEl) {
      tl.to(backgroundEl, {
        scale: 1.02,
        duration: TRANSITION_DURATION * 0.4,
        ease: 'power1.out',
      }, 0);
      tl.to(backgroundEl, {
        scale: 1,
        duration: TRANSITION_DURATION * 0.6,
        ease: 'power1.in',
      }, TRANSITION_DURATION * 0.4);
    }
  }, [imageHeight]);

  const navigateBy = useCallback((delta: number) => {
    const next = currentSectionRef.current + delta;
    navigateTo(next);
  }, [navigateTo]);

  useEffect(() => {
    if (imageHeight <= 0) return;

    const viewportHeight = window.innerHeight;
    const initialOffset = getOffset(currentSectionRef.current, imageHeight, viewportHeight);

    Object.entries(PARALLAX_RATES).forEach(([layer, rate]) => {
      const el = getRegisteredLayer(layer as keyof typeof PARALLAX_RATES);
      if (el) {
        gsap.set(el, { y: -initialOffset * rate });
      }
    });
  }, [imageHeight]);

  return (
    <NavigationContext.Provider value={{
      currentSection,
      isTransitioning,
      navigateTo,
      navigateBy,
      imageHeight,
      setImageHeight,
    }}>
      {children}
    </NavigationContext.Provider>
  );
}
