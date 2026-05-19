import './footer.css';

const LINKS = [
  { label: 'About',      href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills',     href: '#skills' },
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
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/sugarmse/',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
      </svg>
    ),
  },
  {
    label: 'Behance',
    href: 'https://www.behance.net/sarthakshakya',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029H23.726zm-7.726-3h3.578c-.105-1.547-1.136-2.219-1.984-2.219-1.005 0-1.57.857-1.594 2.219zM1 0h8.962c2.065 0 5.1.712 5.1 3.741 0 2.093-1.424 3.15-3.022 3.472 2.075.415 3.606 1.686 3.606 3.91C15.646 14.84 12.993 16 10.28 16H1V0zm7.34 6.438c1.505 0 2.57-.56 2.57-1.836 0-1.338-1.065-1.793-2.57-1.793H3.924v3.629h4.416zm.368 6.776c1.734 0 2.965-.628 2.965-2.187 0-1.558-1.231-2.084-2.965-2.084H3.924v4.271h4.784z"/>
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
