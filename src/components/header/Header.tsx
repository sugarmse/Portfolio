import { useState, useEffect } from 'react';
import './header.css';

const NAV_LINKS = [
  { label: 'About',      href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Equipment',  href: '#equipment' },
  { label: 'Projects',   href: '#projects' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
      <div className="hdr-inner container">
        <a href="#hero" onClick={e => { e.preventDefault(); go('#hero'); }} className="hdr-logo">
          <img src="/sslogo.png" alt="SS" />
        </a>

        <nav className="hdr-nav">
          {NAV_LINKS.map(l => (
            <a key={l.label} href={l.href} className="hdr-link"
               onClick={e => { e.preventDefault(); go(l.href); }}>
              {l.label}
            </a>
          ))}
          <a href="#contact" className="hdr-cta"
             onClick={e => { e.preventDefault(); go('#contact'); }}>
            Contact
          </a>
        </nav>

        <button className={`hamburger${open ? ' open' : ''}`}
                onClick={() => setOpen(v => !v)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
      </div>

      <div className={`mobile-nav${open ? ' open' : ''}`}>
        {NAV_LINKS.map(l => (
          <a key={l.label} href={l.href} className="mob-link"
             onClick={e => { e.preventDefault(); go(l.href); }}>
            {l.label}
          </a>
        ))}
        <a href="#contact" className="mob-link mob-cta"
           onClick={e => { e.preventDefault(); go('#contact'); }}>
          Contact
        </a>
      </div>
    </header>
  );
}
