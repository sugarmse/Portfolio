import { useState, useEffect, useRef } from 'react';
import './header.css';
import { scrollToSection } from '../../scroll';

const NAV_LINKS = [
  { label: 'Projects',   href: '#projects' },
  { label: 'Videos',     href: '#videos' },
  { label: 'About',      href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Equipment',  href: '#equipment' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const [active, setActive] = useState('');
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(`#${entry.target.id}`); });
    }, { rootMargin: '-15% 0px -65% 0px' });
    document.querySelectorAll('main > section').forEach(section => observer.observe(section));
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) { setOpen(false); toggle.current?.focus(); }
    };
    const breakpoint = window.matchMedia('(min-width: 821px)');
    const onResize = () => { if (breakpoint.matches) setOpen(false); };
    breakpoint.addEventListener('change', onResize);
    document.addEventListener('keydown', onKey);
    return () => { observer.disconnect(); document.removeEventListener('keydown', onKey); breakpoint.removeEventListener('change', onResize); };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) {
      scrollToSection(href);
      history.pushState(null, '', href);
      setActive(href);
      el.setAttribute('tabindex', '-1');
      (el as HTMLElement).focus({ preventScroll: true });
    }
  };

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
      <div className="hdr-inner container">
        <a href="#hero" onClick={e => { e.preventDefault(); go('#hero'); }} className="hdr-logo" aria-label="Sarthak Shakya, back to top">
          <span className="wordmark">sarthak<span>.</span></span>
        </a>

        <nav className="hdr-nav" aria-label="Main navigation">
          {NAV_LINKS.map(l => (
            <a key={l.label} href={l.href} className="hdr-link" aria-current={active === l.href ? 'location' : undefined}
               onClick={e => { e.preventDefault(); go(l.href); }}>
              {l.label}
            </a>
          ))}
          <a href="#contact" className="hdr-cta"
             onClick={e => { e.preventDefault(); go('#contact'); }}>
            Contact
          </a>
        </nav>

        <button ref={toggle} className={`hamburger${open ? ' open' : ''}`}
                onClick={() => setOpen(v => !v)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-navigation">
          <span /><span /><span />
        </button>
      </div>

      <nav id="mobile-navigation" aria-label="Mobile navigation" className={`mobile-nav${open ? ' open' : ''}`}>
        {NAV_LINKS.map(l => (
          <a key={l.label} href={l.href} className="mob-link" tabIndex={open ? 0 : -1} aria-current={active === l.href ? 'location' : undefined}
             onClick={e => { e.preventDefault(); go(l.href); }}>
            {l.label}
          </a>
        ))}
        <a href="#contact" className="mob-link mob-cta" tabIndex={open ? 0 : -1}
           onClick={e => { e.preventDefault(); go('#contact'); }}>
          Contact
        </a>
      </nav>
    </header>
  );
}
