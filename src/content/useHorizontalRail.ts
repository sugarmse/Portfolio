import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

function moveRail(element: HTMLDivElement, direction: number, motion: boolean) {
  const card = element.children[0];
  if (!card) return;
  const step = card.getBoundingClientRect().width + (parseFloat(getComputedStyle(element).columnGap) || 0);
  const target = Math.max(0, Math.min(element.scrollWidth - element.clientWidth, (Math.round(element.scrollLeft / step) + direction) * step));
  gsap.killTweensOf(element);
  if (!motion) { element.scrollLeft = target; return; }
  element.style.scrollSnapType = 'none';
  gsap.to(element, { scrollLeft: target, duration: .4, ease: 'power2.out', overwrite: true, onComplete: () => { element.style.scrollSnapType = ''; } });
}

export default function useHorizontalRail(count: number, motion: boolean) {
  const track = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ index: 0, atStart: true, atEnd: false });

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    let lastWheelMove = -Infinity;
    const stop = () => { gsap.killTweensOf(element); element.style.scrollSnapType = ''; };
    const update = () => {
      const card = element.children[0];
      if (!card) return;
      const step = card.getBoundingClientRect().width + (parseFloat(getComputedStyle(element).columnGap) || 0);
      const max = element.scrollWidth - element.clientWidth;
      const atEnd = element.scrollLeft >= max - 2;
      setPosition({ index: max > 2 ? atEnd ? count - 1 : Math.round(element.scrollLeft / step) : 0, atStart: element.scrollLeft <= 2, atEnd });
    };
    const wheel = (event: WheelEvent) => {
      // Leave zoom gestures and horizontal trackpad gestures native.
      if (event.ctrlKey || Math.abs(event.deltaX) >= Math.abs(event.deltaY) || event.deltaY === 0) return;
      const max = element.scrollWidth - element.clientWidth;
      const direction = Math.sign(event.deltaY);
      // Release vertical page scrolling at either end instead of trapping it.
      if (max <= 2 || (direction < 0 && element.scrollLeft <= 2) || (direction > 0 && element.scrollLeft >= max - 2)) return;
      event.preventDefault();
      const now = performance.now();
      if (now - lastWheelMove < 420) return;
      lastWheelMove = now;
      moveRail(element, direction, motion);
    };
    const resize = new ResizeObserver(() => {
      stop();
      if (element.scrollWidth <= element.clientWidth + 2) element.scrollLeft = 0;
      update();
    });
    element.addEventListener('scroll', update, { passive: true });
    element.addEventListener('wheel', wheel, { passive: false });
    element.addEventListener('pointerdown', stop, { passive: true });
    element.addEventListener('touchstart', stop, { passive: true });
    resize.observe(element);
    update();
    return () => {
      stop();
      resize.disconnect();
      element.removeEventListener('scroll', update);
      element.removeEventListener('wheel', wheel);
      element.removeEventListener('pointerdown', stop);
      element.removeEventListener('touchstart', stop);
    };
  }, [count, motion]);

  const move = (direction: number) => { if (track.current) moveRail(track.current, direction, motion); };
  return { track, position, move };
}
