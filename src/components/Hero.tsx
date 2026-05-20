import { useEffect, useState } from 'react';
import './Hero.css';

const ROLES = ['UI / UX Designer', 'Web Developer', 'Creative Coder', 'Motorcycle Enthusiast'];

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
          Full-stack developer turned entrepreneur — building products, shooting
          moto-vlogs, and crafting immersive digital experiences.
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
