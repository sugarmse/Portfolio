import { useLayoutEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { scrollToProject, scrollToSection } from '../scroll';
import type { MotionPreference } from '../components/MotionControls';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export function useScrollMotion(root: RefObject<HTMLDivElement>, preference: MotionPreference) {
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    const context = gsap.context(() => {
      media.add({
        desktop: '(min-width: 901px)',
        pointer: '(any-pointer: fine)',
        motion: preference === 'full' ? 'all' : preference === 'reduced' ? 'not all' : '(prefers-reduced-motion: no-preference)',
        reduced: preference === 'reduced' ? 'all' : preference === 'full' ? 'not all' : '(prefers-reduced-motion: reduce)',
      }, ({ conditions }) => {
        const { desktop, pointer, motion } = conditions!;
        document.documentElement.dataset.motion = motion ? 'full' : 'reduced';
        const cleanup: (() => void)[] = [];
        const smoother = motion ? ScrollSmoother.create({
          wrapper: '#smooth-wrapper', content: '#smooth-content', smooth: desktop ? 1.35 : .8,
          smoothTouch: .15, effects: false,
          onFocusIn: (_self, event) => {
            const target = event.target as Element;
            return target.closest('.project-card, dialog') || target.matches('section, #main-content') ? false : undefined;
          },
        }) : null;
        document.documentElement.classList.toggle('smooth-enabled', !!smoother);
        const pinned = desktop && motion;
        root.current?.classList.toggle('projects-horizontal', !!pinned);

        if (pinned) {
          const rail = root.current!.querySelector<HTMLElement>('.project-grid')!;
          const viewport = rail.parentElement!;
          const distance = () => Math.max(0, rail.scrollWidth - viewport.clientWidth);
          gsap.to(rail, {
            x: () => -distance(), ease: 'none',
            scrollTrigger: {
              id: 'project-travel', trigger: '.project-pin-stage', pin: true,
              start: () => `top ${window.innerHeight <= 500 ? 82 : 100}px`, end: () => `+=${distance() + 250}`,
              scrub: .8, anticipatePin: 1, invalidateOnRefresh: true,
              onUpdate: self => {
                const bar = root.current?.querySelector<HTMLElement>('.project-travel-progress span');
                if (bar) bar.style.transform = `scaleX(${self.progress})`;
                const cards = Array.from(rail.children) as HTMLElement[];
                const center = self.progress * distance() + viewport.clientWidth / 2;
                const current = cards.reduce((best, card, index) => Math.abs(card.offsetLeft + card.clientWidth / 2 - center) < Math.abs(cards[best].offsetLeft + cards[best].clientWidth / 2 - center) ? index : best, 0);
                root.current?.querySelectorAll('.project-rail-controls button').forEach((button, index) => {
                  button.classList.toggle('is-current', index === current);
                  if (index === current) button.setAttribute('aria-current', 'true');
                  else button.removeAttribute('aria-current');
                });
              },
            },
          });
          rail.querySelectorAll<HTMLButtonElement>('.project-open').forEach((button, index) => {
            const onFocus = () => {
              const rect = button.getBoundingClientRect();
              const bounds = viewport.getBoundingClientRect();
              if (rect.left < bounds.left - 2 || rect.right > bounds.right + 2) scrollToProject(index, false);
            };
            button.addEventListener('focus', onFocus);
            cleanup.push(() => button.removeEventListener('focus', onFocus));
          });
        }
        gsap.to('.scroll-progress', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: true } });
        if (motion) {
          gsap.from('.hero-copy > *', { y: 45, opacity: 0, duration: 1, stagger: .1, ease: 'power3.out', clearProps: 'all' });
          const reveal = '.fade-up:not(.project-card):not(.video-card):not(.skills-group), .about-text, .about-right, .section-title' + (pinned ? '' : ', .project-card');
          const elements = gsap.utils.toArray<HTMLElement>(reveal).filter(el => {
            return !el.parentElement?.closest(reveal);
          });
          elements.forEach(el => {
            const isFastSection = !!el.closest('#skills, #equipment, #contact');
            gsap.fromTo(el, { y: isFastSection ? 20 : 28, opacity: isFastSection ? .4 : .25 }, {
              y: 0, opacity: 1, duration: isFastSection ? .42 : .55, ease: 'power2.out', clearProps: 'transform,opacity',
              scrollTrigger: { trigger: el, start: isFastSection ? 'top 98%' : 'top 95%', once: true },
            });
          });
          gsap.fromTo('.motion-ribbon-track', { xPercent: 5 }, { xPercent: -25, ease: 'none', scrollTrigger: { trigger: '.motion-ribbon', start: 'top bottom', end: 'bottom top', scrub: 1 } });
          gsap.utils.toArray<HTMLElement>('.section-divider').forEach(el => {
            gsap.from(el, { scaleX: 0, transformOrigin: 'left', duration: .8, scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
          });
        }
        if (desktop && motion) {
          const hero = { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1 };
          gsap.to('.hero-visual', { y: 180, rotation: 5, scale: 1.12, ease: 'none', scrollTrigger: hero });
          gsap.to('.hero-copy', { x: -70, y: -55, opacity: .35, ease: 'none', scrollTrigger: hero });
          gsap.to('.hero-work-note', { y: -130, rotation: -8, ease: 'none', scrollTrigger: hero });
        }
        if (pointer && motion) {
          gsap.utils.toArray<HTMLElement>('.project-art').forEach(art => {
            gsap.set(art, { transformPerspective: 950 });
            const rotateX = gsap.quickTo(art, 'rotationX', { duration: .5, ease: 'power3.out' });
            const rotateY = gsap.quickTo(art, 'rotationY', { duration: .5, ease: 'power3.out' });
            const move = (event: PointerEvent) => {
              const rect = art.getBoundingClientRect();
              const x = (event.clientX - rect.left) / rect.width;
              const y = (event.clientY - rect.top) / rect.height;
              rotateX((.5 - y) * 14); rotateY((x - .5) * 14);
              art.style.setProperty('--pointer-x', `${x * 100}%`);
              art.style.setProperty('--pointer-y', `${y * 100}%`);
            };
            const leave = () => { rotateX(0); rotateY(0); };
            art.addEventListener('pointermove', move); art.addEventListener('pointerleave', leave);
            cleanup.push(() => { art.removeEventListener('pointermove', move); art.removeEventListener('pointerleave', leave); art.style.removeProperty('--pointer-x'); art.style.removeProperty('--pointer-y'); });
          });
          gsap.utils.toArray<HTMLElement>('.hero-actions .btn, .hdr-cta').forEach(button => {
            const x = gsap.quickTo(button, 'x', { duration: .35 });
            const y = gsap.quickTo(button, 'y', { duration: .35 });
            const move = (event: PointerEvent) => {
              const rect = button.getBoundingClientRect();
              x((event.clientX - rect.left - rect.width / 2) * .16);
              y((event.clientY - rect.top - rect.height / 2) * .25);
            };
            const leave = () => { x(0); y(0); };
            button.addEventListener('pointermove', move); button.addEventListener('pointerleave', leave);
            cleanup.push(() => { button.removeEventListener('pointermove', move); button.removeEventListener('pointerleave', leave); });
          });
        }
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
        return () => {
          cleanup.forEach(dispose => dispose());
          smoother?.kill();
          document.documentElement.classList.remove('smooth-enabled');
          delete document.documentElement.dataset.motion;
          root.current?.classList.remove('projects-horizontal');
        };
      }, root);
    }, root);
    let mounted = true;
    document.fonts.ready.then(() => {
      if (!mounted) return;
      ScrollTrigger.refresh();
      if (location.hash) scrollToSection(location.hash, false);
    });
    const onHistory = () => { if (location.hash) scrollToSection(location.hash, false); };
    window.addEventListener('popstate', onHistory);
    return () => { mounted = false; window.removeEventListener('popstate', onHistory); media.revert(); context.revert(); };
  }, [root, preference]);
}
