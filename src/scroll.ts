import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function scrollToSection(hash: string, smooth = true) {
  const target = document.getElementById(hash.slice(1));
  if (!target) return;
  const smoother = ScrollSmoother.get();
  if (smoother) {
    const pin = hash === '#projects' ? ScrollTrigger.getById('project-travel') : undefined;
    smoother.scrollTo(pin ? pin.start : target, smooth, 'top 90px');
  } else {
    target.scrollIntoView({ behavior: smooth && document.documentElement.dataset.motion !== 'reduced' ? 'smooth' : 'instant', block: 'start' });
  }
}

export function scrollToProject(index: number, smooth = true) {
  const trigger = ScrollTrigger.getById('project-travel');
  const cards = document.querySelectorAll<HTMLElement>('.project-card');
  const card = cards[index];
  if (!card) return;
  if (trigger) {
    const distance = Math.max(1, (card.parentElement?.scrollWidth ?? 0) - (card.parentElement?.parentElement?.clientWidth ?? 0));
    const progress = Math.min(1, card.offsetLeft / distance);
    const position = trigger.start + (trigger.end - trigger.start) * progress;
    ScrollSmoother.get()?.scrollTo(position, smooth);
    if (!smooth) trigger.animation?.progress(progress);
  } else {
    card.scrollIntoView({ behavior: smooth && document.documentElement.dataset.motion !== 'reduced' ? 'smooth' : 'instant', block: 'center' });
  }
}
