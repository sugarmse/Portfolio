import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function scrollToSection(hash: string, smooth = true) {
  const target = document.getElementById(hash.slice(1));
  if (!target) return;
  const smoother = ScrollSmoother.get();
  if (smoother) {
    const pin = hash === '#projects'
      ? ScrollTrigger.getById('project-travel')
      : hash === '#videos'
      ? ScrollTrigger.getById('video-travel')
      : hash === '#experience'
      ? ScrollTrigger.getById('timeline-travel')
      : hash === '#equipment'
      ? ScrollTrigger.getById('equipment-travel')
      : undefined;
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
    const viewport = document.querySelector<HTMLElement>('.project-viewport');
    if (viewport && viewport.scrollWidth > viewport.clientWidth) {
      const left = card.offsetLeft - (viewport.clientWidth - card.clientWidth) / 2;
      viewport.scrollTo({ left: Math.max(0, left), behavior: smooth ? 'smooth' : 'instant' });
    } else {
      card.scrollIntoView({ behavior: smooth && document.documentElement.dataset.motion !== 'reduced' ? 'smooth' : 'instant', block: 'center' });
    }
  }
}

export function scrollToVideo(index: number, smooth = true) {
  const trigger = ScrollTrigger.getById('video-travel');
  const cards = document.querySelectorAll<HTMLElement>('.video-card');
  const card = cards[index];
  if (!card || index < 0 || index >= cards.length) return;
  if (trigger) {
    const rail = card.parentElement;
    const viewport = rail?.parentElement;
    const distance = Math.max(1, (rail?.scrollWidth ?? 0) - (viewport?.clientWidth ?? 0));
    const progress = Math.min(1, Math.max(0, card.offsetLeft / distance));
    const position = trigger.start + (trigger.end - trigger.start) * progress;
    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTo(position, smooth);
    } else {
      window.scrollTo({ top: position, behavior: smooth ? 'smooth' : 'instant' });
    }
    if (!smooth) trigger.animation?.progress(progress);
  } else {
    const viewport = document.querySelector<HTMLElement>('.video-viewport');
    if (viewport && viewport.scrollWidth > viewport.clientWidth) {
      const left = card.offsetLeft - (viewport.clientWidth - card.clientWidth) / 2;
      viewport.scrollTo({ left: Math.max(0, left), behavior: smooth ? 'smooth' : 'instant' });
    } else {
      card.scrollIntoView({ behavior: smooth && document.documentElement.dataset.motion !== 'reduced' ? 'smooth' : 'instant', block: 'center' });
    }
  }
}

export function scrollToTimeline(index: number, smooth = true) {
  const trigger = ScrollTrigger.getById('timeline-travel');
  const cards = document.querySelectorAll<HTMLElement>('.tl-item');
  const card = cards[index];
  if (!card || index < 0 || index >= cards.length) return;
  if (trigger) {
    const rail = card.parentElement;
    const viewport = rail?.parentElement;
    const distance = Math.max(1, (rail?.scrollWidth ?? 0) - (viewport?.clientWidth ?? 0));
    const progress = Math.min(1, Math.max(0, card.offsetLeft / distance));
    const position = trigger.start + (trigger.end - trigger.start) * progress;
    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTo(position, smooth);
    } else {
      window.scrollTo({ top: position, behavior: smooth ? 'smooth' : 'instant' });
    }
    if (!smooth) trigger.animation?.progress(progress);
  } else {
    const viewport = document.querySelector<HTMLElement>('.tl-viewport');
    if (viewport && viewport.scrollWidth > viewport.clientWidth) {
      const left = card.offsetLeft - (viewport.clientWidth - card.clientWidth) / 2;
      viewport.scrollTo({ left: Math.max(0, left), behavior: smooth ? 'smooth' : 'instant' });
    } else {
      card.scrollIntoView({ behavior: smooth && document.documentElement.dataset.motion !== 'reduced' ? 'smooth' : 'instant', block: 'center' });
    }
  }
}

export function scrollToEquipment(index: number, smooth = true) {
  const trigger = ScrollTrigger.getById('equipment-travel');
  const cards = document.querySelectorAll<HTMLElement>('.eq-card');
  const card = cards[index];
  if (!card || index < 0 || index >= cards.length) return;
  if (trigger) {
    const rail = card.parentElement;
    const viewport = rail?.parentElement;
    const distance = Math.max(1, (rail?.scrollWidth ?? 0) - (viewport?.clientWidth ?? 0));
    const progress = Math.min(1, Math.max(0, card.offsetLeft / distance));
    const position = trigger.start + (trigger.end - trigger.start) * progress;
    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTo(position, smooth);
    } else {
      window.scrollTo({ top: position, behavior: smooth ? 'smooth' : 'instant' });
    }
    if (!smooth) trigger.animation?.progress(progress);
  } else {
    const viewport = document.querySelector<HTMLElement>('.eq-viewport');
    if (viewport && viewport.scrollWidth > viewport.clientWidth) {
      const left = card.offsetLeft - (viewport.clientWidth - card.clientWidth) / 2;
      viewport.scrollTo({ left: Math.max(0, left), behavior: smooth ? 'smooth' : 'instant' });
    } else {
      card.scrollIntoView({ behavior: smooth && document.documentElement.dataset.motion !== 'reduced' ? 'smooth' : 'instant', block: 'center' });
    }
  }
}


