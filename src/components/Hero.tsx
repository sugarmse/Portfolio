import { useEffect, useState } from 'react';
import './Hero.css';

const ROLES = ['UI / UX Designer', 'Web Developer', 'Creative Coder'];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const current = ROLES[roleIdx];
    let t: ReturnType<typeof setTimeout>;

    if (typing) {
      if (displayed.length < current.length) {
        t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 65);
      } else {
        t = setTimeout(() => setTyping(false), 2200);
      }
    } else {
      if (displayed.length > 0) {
        t = setTimeout(() => setDisplayed(d => d.slice(0, -1)), 35);
      } else {
        setRoleIdx(i => (i + 1) % ROLES.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(t);
  }, [displayed, typing, roleIdx]);

  return (
    <section className="hero" id="hero">
      {/* Animated background orbs */}
      <div className="hero-orbs" aria-hidden="true">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      {/* Grid overlay */}
      <div className="hero-grid" aria-hidden="true" />

      <div className="hero-content container">
        <p className="hero-greeting">Hello, I&apos;m</p>
        <h1 className="hero-name">
          <span>Sarthak</span>
          <span className="hero-name-accent"> Shakya</span>
        </h1>

        <div className="hero-role-wrap">
          <span className="hero-role">{displayed}</span>
          <span className="hero-cursor" aria-hidden="true">|</span>
        </div>

        <p className="hero-bio">
          A passionate Web Developer &amp; UI/UX Designer crafting responsive,
          visually compelling digital experiences — currently building at
          Techmind Solutions.
        </p>

        <div className="hero-actions">
          <a href="#projects" className="btn btn-primary"
             onClick={e => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}>
            View My Work
          </a>
          <a href="/SS.pdf" download className="btn btn-ghost">
            Download CV
          </a>
        </div>

        <div className="hero-socials">
          <a href="https://github.com/sugarmse" target="_blank" rel="noopener noreferrer" className="hero-social-link" aria-label="GitHub">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.167 6.839 9.49.5.09.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.254-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.547 1.376.203 2.394.1 2.646.64.698 1.026 1.591 1.026 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/sugarmse/" target="_blank" rel="noopener noreferrer" className="hero-social-link" aria-label="LinkedIn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
            </svg>
          </a>
          <a href="https://www.behance.net/sarthakshakya" target="_blank" rel="noopener noreferrer" className="hero-social-link" aria-label="Behance">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7.443 5.35c.639 0 1.23.05 1.77.198.54.099.981.297 1.37.544.39.247.69.594.91 1.04.22.396.33.891.33 1.437 0 .594-.14 1.09-.42 1.486-.28.396-.7.742-1.26.99.76.198 1.32.594 1.68 1.139.36.495.54 1.139.54 1.882 0 .594-.12 1.139-.36 1.584-.24.446-.57.842-.99 1.139-.42.297-.9.544-1.44.693-.54.148-1.1.198-1.68.198H2V5.35h5.443zm-.24 4.606c.48 0 .87-.099 1.17-.346.3-.247.45-.643.45-1.139 0-.297-.06-.544-.18-.742a1.28 1.28 0 0 0-.48-.445 2.07 2.07 0 0 0-.66-.198 3.76 3.76 0 0 0-.75-.05H4.8v2.92h2.403zm.12 4.85c.3 0 .57-.05.84-.099.27-.05.51-.149.72-.297.21-.149.36-.347.48-.594.12-.248.18-.545.18-.891 0-.693-.21-1.189-.63-1.486-.42-.297-.96-.446-1.62-.446H4.8v3.813h2.523zM16.34 15.57c.39.396.96.594 1.71.594.54 0 1.01-.148 1.38-.395.39-.297.63-.594.72-.941h2.16c-.36 1.09-.9 1.882-1.65 2.376-.75.495-1.65.743-2.67.743-.72 0-1.38-.099-1.95-.347a4.27 4.27 0 0 1-1.47-.99 4.278 4.278 0 0 1-.93-1.535c-.21-.594-.33-1.238-.33-1.932 0-.693.12-1.337.33-1.931.21-.595.51-1.09.9-1.535.39-.396.87-.743 1.44-.99a4.47 4.47 0 0 1 1.98-.347c.81 0 1.52.148 2.13.495.6.347 1.08.792 1.44 1.387.36.545.63 1.189.78 1.882.09.347.12.693.12 1.09H15.8c0 .743.21 1.387.54 1.832zm2.97-4.358c-.3-.346-.81-.544-1.44-.544-.42 0-.78.099-1.05.247-.27.149-.48.297-.63.495a1.747 1.747 0 0 0-.33.594 3.43 3.43 0 0 0-.12.594h4.11c-.09-.644-.33-1.09-.54-1.386zM14.8 7.27h4.86V8.26H14.8V7.27z"/>
            </svg>
          </a>
        </div>
      </div>

      <a href="#about" className="hero-scroll"
         onClick={e => { e.preventDefault(); document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' }); }}
         aria-label="Scroll down">
        <div className="scroll-mouse">
          <div className="scroll-dot" />
        </div>
        <span>Scroll</span>
      </a>
    </section>
  );
}
