import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { covers } from './contentData';

export default function CoverDesigns({ motion, onOpen }: { motion: boolean; onOpen: (index: number) => void }) {
  const details = useRef<HTMLDetailsElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const element = details.current;
    const content = body.current;
    if (!element || !content) return;
    if (!motion) {
      element.open = expanded;
      ScrollTrigger.refresh();
      return;
    }
    if (!expanded && !element.open) return;
    const startHeight = expanded ? 0 : content.getBoundingClientRect().height;
    element.open = true;
    const context = gsap.context(() => {
      gsap.fromTo(content, { height: startHeight, overflow: 'hidden' }, {
        height: expanded ? content.scrollHeight : 0,
        duration: expanded ? .45 : .3,
        ease: 'power2.inOut',
        onComplete: () => {
          element.open = expanded;
          gsap.set(content, { clearProps: 'height,overflow' });
          ScrollTrigger.refresh();
        },
      });
      if (expanded) gsap.fromTo('.j-cover-grid figure', { opacity: 0, y: 14 }, {
        opacity: 1, y: 0, stagger: .055, duration: .35, delay: .1,
        clearProps: 'opacity,transform',
      });
    }, element);
    return () => context.revert();
  }, [expanded, motion]);

  return <details ref={details} className="j-cover-collection" data-expanded={expanded}>
    <summary aria-expanded={expanded} onClick={event => { event.preventDefault(); setExpanded(value => !value); }}>
      Video cover designs <span>{covers.length} covers <i className="j-cover-toggle" aria-hidden="true" /></span>
    </summary>
    <div ref={body} className="j-cover-body">
      <p>Cover designs for my travel content. Select a cover to view it.</p>
      <div className="j-cover-grid">{covers.map((cover, index) => <figure key={cover.src}><button onClick={() => onOpen(index)} aria-label={`View video cover: ${cover.caption}`}><img src={cover.src} alt={cover.alt} loading="lazy" width={cover.width} height={cover.height} /></button><figcaption>{cover.caption}<span>{cover.kind}</span></figcaption></figure>)}</div>
    </div>
  </details>;
}
