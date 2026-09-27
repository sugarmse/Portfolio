import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function scrollToSection(hash: string, smooth = true) {
  const target = document.getElementById(hash.slice(1));
  if (!target) return;
  const smoother = ScrollSmoother.get();
  if (smoother) {
    const pin = hash === '#projects' ? ScrollTrigger.getById('project-travel') : undefined;
    smoother.scrollTo(pin ? pin.start : target, smooth, pin ? 'top top' : 'top 90px');
  } else {
    target.scrollIntoView({ behavior: smooth && document.documentElement.dataset.motion !== 'reduced' ? 'smooth' : 'instant', block: 'start' });
  }
}

export function scrollToProject(index: number, smooth = true) {
  const trigger = ScrollTrigger.getById('project-travel');
  const cards = document.querySelectorAll<HTMLElement>('.project-card');
  const card = cards[index];
  if (!card || index < 0 || index >= cards.length) return;
  if (trigger) {
    const distance = Math.max(1, (card.parentElement?.scrollWidth ?? 0) - (card.parentElement?.parentElement?.clientWidth ?? 0));
    const progress = Math.min(1, card.offsetLeft / distance);
    const position = trigger.start + (trigger.end - trigger.start) * progress;
    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTo(position, smooth);
    } else {
      window.scrollTo({ top: position, behavior: smooth ? 'smooth' : 'instant' });
    }
    if (!smooth) trigger.animation?.progress(progress);
  } else {
    card.scrollIntoView({ behavior: smooth && document.documentElement.dataset.motion !== 'reduced' ? 'smooth' : 'instant', block: 'center' });
  }
}
