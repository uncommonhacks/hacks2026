import { useEffect, useRef } from 'react';
import { useNavigation } from '../context/navigation';

const WHEEL_THRESHOLD = 50;
const SWIPE_THRESHOLD = 50;

export function useInputNavigation() {
  const { navigateBy, isTransitioning } = useNavigation();
  const wheelAccumulator = useRef(0);
  const touchStartY = useRef<number | null>(null);
  const isTransitioningRef = useRef(isTransitioning);

  useEffect(() => {
    isTransitioningRef.current = isTransitioning;
    wheelAccumulator.current = 0;
  }, [isTransitioning]);

  useEffect(() => {
    function handleWheel(e: WheelEvent) {
      e.preventDefault();
      if (isTransitioningRef.current) return;

      wheelAccumulator.current += e.deltaY;

      if (Math.abs(wheelAccumulator.current) >= WHEEL_THRESHOLD) {
        const direction = wheelAccumulator.current > 0 ? 1 : -1;
        wheelAccumulator.current = 0;
        navigateBy(direction);
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (isTransitioningRef.current) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        navigateBy(1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        navigateBy(-1);
      }
    }

    function handleTouchStart(e: TouchEvent) {
      touchStartY.current = e.touches[0].clientY;
    }

    function handleTouchMove(e: TouchEvent) {
      e.preventDefault();
    }

    function handleTouchEnd(e: TouchEvent) {
      if (isTransitioningRef.current) return;
      if (touchStartY.current === null) return;

      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      touchStartY.current = null;

      if (Math.abs(deltaY) >= SWIPE_THRESHOLD) {
        navigateBy(deltaY > 0 ? 1 : -1);
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [navigateBy]);
}
