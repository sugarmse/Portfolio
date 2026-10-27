import { useLayoutEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { scrollToEquipment, scrollToProject, scrollToSection, scrollToTimeline, scrollToVideo } from '../scroll';
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
            return target.closest('.project-card, .video-card, .tl-card, .eq-card, dialog') || target.matches('section, #main-content') ? false : undefined;
          },
        }) : null;
        document.documentElement.classList.toggle('smooth-enabled', !!smoother);
        const pinned = motion;
        root.current?.classList.toggle('projects-horizontal', !!pinned);
        root.current?.classList.toggle('videos-horizontal', !!pinned);
        root.current?.classList.toggle('timeline-horizontal', !!pinned);
        root.current?.classList.toggle('equipment-horizontal', !!pinned);

        if (pinned) {
          const rail = root.current!.querySelector<HTMLElement>('.project-grid')!;
          const viewport = rail.parentElement!;
          const distance = () => Math.max(0, rail.scrollWidth - viewport.clientWidth);
          const cards = Array.from(rail.children) as HTMLElement[];
          gsap.to(rail, {
            x: () => -distance(), ease: 'none',
            scrollTrigger: {
              id: 'project-travel', trigger: '#projects', pin: true,
              start: () => 'top top', end: () => `+=${distance() + (desktop ? 500 : 250)}`,
              scrub: .8,
              anticipatePin: 1, invalidateOnRefresh: true,
              onUpdate: self => {
                const bar = root.current?.querySelector<HTMLElement>('.project-travel-progress span');
                if (bar) bar.style.transform = `scaleX(${self.progress})`;
                const center = self.progress * distance() + viewport.clientWidth / 2;
                const current = cards.reduce((best, card, index) => Math.abs(card.offsetLeft + card.clientWidth / 2 - center) < Math.abs(cards[best].offsetLeft + cards[best].clientWidth / 2 - center) ? index : best, 0);
                root.current?.querySelectorAll('.project-rail-controls button').forEach((button, index) => {
                  button.classList.toggle('is-current', index === current);
                  if (index === current) button.setAttribute('aria-current', 'true');
                  else button.removeAttribute('aria-current');
                });
                root.current?.querySelectorAll('.mobile-dot-indicator').forEach((dot, index) => {
                  dot.classList.toggle('is-active', index === current);
                });
              },
            },
          });
          rail.querySelectorAll<HTMLElement>('.project-card a, .project-card button').forEach(el => {
            const onFocus = () => {
              const card = el.closest<HTMLElement>('.project-card');
              if (!card) return;
              const index = Array.from(rail.children).indexOf(card);
              if (index >= 0) {
                const bounds = viewport.getBoundingClientRect();
                const rect = card.getBoundingClientRect();
                if (rect.left < bounds.left - 2 || rect.right > bounds.right + 2) scrollToProject(index, false);
              }
            };
            el.addEventListener('focus', onFocus);
            cleanup.push(() => el.removeEventListener('focus', onFocus));
          });
        }

        if (pinned) {
          const videoRail = root.current?.querySelector<HTMLElement>('.video-grid');
          const videoSection = root.current?.querySelector<HTMLElement>('#videos');
          if (videoRail && videoSection) {
            const videoViewport = videoRail.parentElement!;
            const videoDistance = () => Math.max(0, videoRail.scrollWidth - videoViewport.clientWidth);
            gsap.to(videoRail, {
              x: () => -videoDistance(),
              ease: 'none',
              scrollTrigger: {
                id: 'video-travel',
                trigger: '#videos',
                pin: true,
                start: () => 'top top',
                end: () => `+=${videoDistance() + (desktop ? 600 : 350)}`,
                scrub: 0.8,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onUpdate: self => {
                  const bar = root.current?.querySelector<HTMLElement>('.video-travel-progress span');
                  if (bar) bar.style.transform = `scaleX(${self.progress})`;

                  const cards = Array.from(videoRail.children) as HTMLElement[];
                  if (!cards.length) return;
                  const currentDistance = videoDistance();
                  const center = self.progress * currentDistance + videoViewport.clientWidth / 2;
                  const current = cards.reduce((best, card, index) =>
                    Math.abs(card.offsetLeft + card.clientWidth / 2 - center) <
                    Math.abs(cards[best].offsetLeft + cards[best].clientWidth / 2 - center)
                      ? index
                      : best,
                    0
                  );

                  // Update dot indicators
                  root.current?.querySelectorAll('.video-dot-indicator').forEach((dot, index) => {
                    dot.classList.toggle('is-active', index === current);
                  });

                  // Trigger live preview on active card on mobile/touch
                  cards.forEach((card, idx) => {
                    const isCurrent = idx === current;
                    card.classList.toggle('is-current-slide', isCurrent);
                    const stage = card.querySelector<HTMLElement>('.video-thumb-stage');
                    const vids = card.querySelectorAll<HTMLVideoElement>('video');
                    const badge = card.querySelector<HTMLElement>('.video-badge-rec');
                    if (isCurrent) {
                      stage?.classList.add('is-mobile-previewing');
                      if (badge && !badge.textContent?.includes('PENDING')) {
                        badge.classList.add('is-live-preview');
                      }
                      vids.forEach(v => {
                        v.muted = true;
                        v.playsInline = true;
                        v.play().catch(() => {});
                      });
                    } else {
                      stage?.classList.remove('is-mobile-previewing');
                      badge?.classList.remove('is-live-preview');
                      vids.forEach(v => {
                        v.pause();
                        v.currentTime = 0;
                      });
                    }
                  });
                },
              },
            });

            videoRail.querySelectorAll<HTMLElement>('.video-card a, .video-card button').forEach(el => {
              const onFocus = () => {
                const card = el.closest<HTMLElement>('.video-card');
                if (!card) return;
                const index = Array.from(videoRail.children).indexOf(card);
                if (index >= 0) {
                  const bounds = videoViewport.getBoundingClientRect();
                  const rect = card.getBoundingClientRect();
                  if (rect.left < bounds.left - 2 || rect.right > bounds.right + 2) {
                    scrollToVideo(index, false);
                  }
                }
              };
              el.addEventListener('focus', onFocus);
              cleanup.push(() => el.removeEventListener('focus', onFocus));
            });
          }
        }

        if (pinned) {
          const tlRail = root.current?.querySelector<HTMLElement>('.tl-grid');
          const tlSection = root.current?.querySelector<HTMLElement>('#experience');
          if (tlRail && tlSection) {
            const tlViewport = tlRail.parentElement!;
            const tlDistance = () => Math.max(0, tlRail.scrollWidth - tlViewport.clientWidth);
            gsap.to(tlRail, {
              x: () => -tlDistance(),
              ease: 'none',
              scrollTrigger: {
                id: 'timeline-travel',
                trigger: '#experience',
                pin: true,
                start: () => 'top top',
                end: () => `+=${tlDistance() + (desktop ? 550 : 300)}`,
                scrub: 0.8,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onUpdate: self => {
                  const bar = root.current?.querySelector<HTMLElement>('.tl-travel-progress span');
                  if (bar) bar.style.transform = `scaleX(${self.progress})`;

                  const cards = Array.from(tlRail.children) as HTMLElement[];
                  if (!cards.length) return;
                  const currentDistance = tlDistance();
                  const center = self.progress * currentDistance + tlViewport.clientWidth / 2;
                  const current = cards.reduce((best, card, index) =>
                    Math.abs(card.offsetLeft + card.clientWidth / 2 - center) <
                    Math.abs(cards[best].offsetLeft + cards[best].clientWidth / 2 - center)
                      ? index
                      : best,
                    0
                  );

                  root.current?.querySelectorAll('.tl-dot-indicator').forEach((dot, index) => {
                    dot.classList.toggle('is-active', index === current);
                  });
                },
              },
            });

            tlRail.querySelectorAll<HTMLElement>('.tl-card a, .tl-card button').forEach(el => {
              const onFocus = () => {
                const card = el.closest<HTMLElement>('.tl-item');
                if (!card) return;
                const index = Array.from(tlRail.children).indexOf(card);
                if (index >= 0) {
                  const bounds = tlViewport.getBoundingClientRect();
                  const rect = card.getBoundingClientRect();
                  if (rect.left < bounds.left - 2 || rect.right > bounds.right + 2) {
                    scrollToTimeline(index, false);
                  }
                }
              };
              el.addEventListener('focus', onFocus);
              cleanup.push(() => el.removeEventListener('focus', onFocus));
            });
          }
        }

        if (pinned) {
          const eqRail = root.current?.querySelector<HTMLElement>('.eq-grid');
          const eqSection = root.current?.querySelector<HTMLElement>('#equipment');
          if (eqRail && eqSection) {
            const eqViewport = eqRail.parentElement!;
            const eqDistance = () => Math.max(0, eqRail.scrollWidth - eqViewport.clientWidth);
            gsap.to(eqRail, {
              x: () => -eqDistance(),
              ease: 'none',
              scrollTrigger: {
                id: 'equipment-travel',
                trigger: '#equipment',
                pin: true,
                start: () => 'top top',
                end: () => `+=${eqDistance() + (desktop ? 450 : 250)}`,
                scrub: 0.8,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onUpdate: self => {
                  const bar = root.current?.querySelector<HTMLElement>('.eq-travel-progress span');
                  if (bar) bar.style.transform = `scaleX(${self.progress})`;

                  const cards = Array.from(eqRail.children) as HTMLElement[];
                  if (!cards.length) return;
                  const currentDistance = eqDistance();
                  const center = self.progress * currentDistance + eqViewport.clientWidth / 2;
                  const current = cards.reduce((best, card, index) =>
                    Math.abs(card.offsetLeft + card.clientWidth / 2 - center) <
                    Math.abs(cards[best].offsetLeft + cards[best].clientWidth / 2 - center)
                      ? index
                      : best,
                    0
                  );

                  root.current?.querySelectorAll('.eq-dot-indicator').forEach((dot, index) => {
                    dot.classList.toggle('is-active', index === current);
                  });
                },
              },
            });

            eqRail.querySelectorAll<HTMLElement>('.eq-card a, .eq-card button').forEach(el => {
              const onFocus = () => {
                const card = el.closest<HTMLElement>('.eq-card');
                if (!card) return;
                const index = Array.from(eqRail.children).indexOf(card);
                if (index >= 0) {
                  const bounds = eqViewport.getBoundingClientRect();
                  const rect = card.getBoundingClientRect();
                  if (rect.left < bounds.left - 2 || rect.right > bounds.right + 2) {
                    scrollToEquipment(index, false);
                  }
                }
              };
              el.addEventListener('focus', onFocus);
              cleanup.push(() => el.removeEventListener('focus', onFocus));
            });
          }
        }

        gsap.to('.scroll-progress', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: true } });
        if (motion) {
          gsap.from('.hero-copy > *', { y: 45, opacity: 0, duration: 1, stagger: .1, ease: 'power3.out', clearProps: 'all' });
          const reveal = '.fade-up:not(.project-card):not(.video-card):not(.tl-item):not(.eq-card):not(.skills-group), .about-text, .about-right, .section-title';
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
        if (motion) {
          const hero = { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1 };
          if (desktop) {
            gsap.to('.hero-visual', { y: 180, rotation: 5, scale: 1.12, ease: 'none', scrollTrigger: hero });
            gsap.to('.hero-copy', { x: -70, y: -55, opacity: .35, ease: 'none', scrollTrigger: hero });
            gsap.to('.hero-work-note', { y: -130, rotation: -8, ease: 'none', scrollTrigger: hero });
          } else {
            gsap.to('.hero-visual', { y: 65, scale: 1.05, ease: 'none', scrollTrigger: hero });
            gsap.to('.hero-copy', { y: -30, opacity: .5, ease: 'none', scrollTrigger: hero });
            gsap.to('.hero-work-note', { y: -65, rotation: -5, ease: 'none', scrollTrigger: hero });
          }
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
