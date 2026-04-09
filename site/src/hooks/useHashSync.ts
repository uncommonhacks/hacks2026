import { useEffect, useRef } from 'react';
import { SECTIONS } from '../config/sections';
import { useNavigation } from '../context/navigation';

export function useHashSync() {
  const { currentSection } = useNavigation();
  const isInitial = useRef(true);

  useEffect(() => {
    // Skip hash update on initial mount (hash-based navigation handled in context)
    if (isInitial.current) {
      isInitial.current = false;
      return;
    }

    const hash = SECTIONS[currentSection]?.hash;
    if (hash) {
      window.history.replaceState(null, '', hash);
    }
  }, [currentSection]);
}
