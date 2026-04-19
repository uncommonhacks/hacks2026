import { useEffect, useRef } from 'react';
import { useNavigation } from '../context/navigation';

const WHEEL_THRESHOLD = 120;
const SWIPE_THRESHOLD = 50;
const NAVIGATION_COOLDOWN = 1000;
const SCROLLABLE_GRACE = 500;

function findScrollable(start: EventTarget | null): HTMLElement | null {
  let el = start as HTMLElement | null;
  while (el && el !== document.body) {
    const style = getComputedStyle(el);
    const oy = style.overflowY;
    if ((oy === 'auto' || oy === 'scroll') && el.scrollHeight > el.clientHeight) return el;
    el = el.parentElement;
  }
  return null;
}

export function useInputNavigation() {
  const { navigateBy } = useNavigation();
  const wheelAccumulator = useRef(0);
  const touchStartY = useRef<number | null>(null);
  const touchScrollable = useRef<HTMLElement | null>(null);
  const lastNavigateTime = useRef(0);
  const lastScrollableTime = useRef(0);

  useEffect(() => {
    function handleWheel(e: WheelEvent) {
      const scrollable = findScrollable(e.target);
      if (scrollable) {
        const atTop = scrollable.scrollTop <= 0;
        const atBottom = scrollable.scrollTop + scrollable.clientHeight >= scrollable.scrollHeight - 1;
        const wantsBeyond = (e.deltaY > 0 && atBottom) || (e.deltaY < 0 && atTop);
        if (wantsBeyond) e.preventDefault();
        wheelAccumulator.current = 0;
        lastScrollableTime.current = Date.now();
        return;
      }

      e.preventDefault();

      const now = Date.now();
      if (now - lastScrollableTime.current < SCROLLABLE_GRACE) {
        wheelAccumulator.current = 0;
        return;
      }
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
      touchScrollable.current = findScrollableAncestor(e.target, 1) || findScrollableAncestor(e.target, -1);
    }

    function handleTouchMove(e: TouchEvent) {
      if (touchScrollable.current) return;
      e.preventDefault();
    }

    function handleTouchEnd(e: TouchEvent) {
      const wasScrollable = touchScrollable.current;
      touchScrollable.current = null;
      if (wasScrollable) {
        touchStartY.current = null;
        return;
      }
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
