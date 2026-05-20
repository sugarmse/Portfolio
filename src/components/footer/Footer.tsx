import './footer.css';

const LINKS = [
  { label: 'About',      href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Equipment',  href: '#equipment' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Contact',    href: '#contact' },
];

const SOCIALS = [
  {
    label: 'GitHub',
    href: 'https://github.com/sugarmse',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.167 6.839 9.49.5.09.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.254-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.547 1.376.203 2.394.1 2.646.64.698 1.026 1.591 1.026 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  const go = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="footer-inner container">
        <div className="footer-top">
          <a href="#hero" onClick={e => { e.preventDefault(); go('#hero'); }} className="footer-brand">
            <img src="/sslogo.png" alt="SS" className="footer-logo" />
            <span className="footer-name">Sarthak Shakya</span>
          </a>
          <p className="footer-tagline">
            UI/UX Designer &amp; Web Developer — crafting experiences that matter.
          </p>
          <div className="footer-socials">
            {SOCIALS.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                 className="footer-social" aria-label={s.label}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <p className="footer-copy">© 2024 Sarthak Shakya. All rights reserved.</p>
          <nav className="footer-nav">
            {LINKS.map(l => (
              <a key={l.label} href={l.href} className="footer-link"
                 onClick={e => { e.preventDefault(); go(l.href); }}>
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
