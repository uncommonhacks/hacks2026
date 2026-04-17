import { useEffect, useRef } from 'react';
import { useNavigation } from '../context/navigation';

const WHEEL_THRESHOLD = 120;
const SWIPE_THRESHOLD = 50;
const NAVIGATION_COOLDOWN = 1000;

export function useInputNavigation() {
  const { navigateBy } = useNavigation();
  const wheelAccumulator = useRef(0);
  const touchStartY = useRef<number | null>(null);
  const lastNavigateTime = useRef(0);

  useEffect(() => {
    function handleWheel(e: WheelEvent) {
      e.preventDefault();

      const now = Date.now();
      if (now - lastNavigateTime.current < NAVIGATION_COOLDOWN) {
        wheelAccumulator.current = 0;
        return;
      }

      wheelAccumulator.current += e.deltaY;

      if (Math.abs(wheelAccumulator.current) >= WHEEL_THRESHOLD) {
        const direction = wheelAccumulator.current > 0 ? 1 : -1;
        wheelAccumulator.current = 0;
        lastNavigateTime.current = now;
        navigateBy(direction);
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
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
