import { useRef, useState } from 'react';
import MotionControls, { type MotionPreference } from './components/MotionControls';
import { useScrollMotion } from './hooks/useScrollMotion';
import { scrollToSection } from './scroll';
import Header    from './components/header/Header';
import Hero      from './components/Hero';
import About     from './components/About';
import Timeline  from './components/Timeline';
import Skills    from './components/Skills';
import Equipment from './components/Equipment';
import Projects  from './components/Projects';
import VideoProjects from './components/VideoProjects';
import Contact   from './components/Contact';
import Footer    from './components/footer/Footer';

function App() {
  const root = useRef<HTMLDivElement>(null);
  const [motion, setMotion] = useState<MotionPreference>(() => {
    try {
      const saved = localStorage.getItem('portfolio-motion');
      return saved === 'reduced' ? 'reduced' : 'full';
    } catch { return 'full'; }
  });
  useScrollMotion(root, motion);
  return (
    <div className="portfolio" ref={root} onClick={event => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor || !document.getElementById(anchor.hash.slice(1))) return;
      event.preventDefault();
      scrollToSection(anchor.hash);
      history.pushState(null, '', anchor.hash);
      const destination = document.getElementById(anchor.hash.slice(1))!;
      destination.setAttribute('tabindex', '-1');
      destination.focus({ preventScroll: true });
    }}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="scroll-progress" aria-hidden="true" />
      <Header />
      <MotionControls value={motion} onChange={value => {
        setMotion(value);
        try { localStorage.setItem('portfolio-motion', value); } catch { /* Keep the choice for this visit. */ }
      }} />
      <div id="smooth-wrapper"><div id="smooth-content">
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <div className="motion-ribbon" aria-hidden="true"><div className="motion-ribbon-track">SOFTWARE <span>↗</span> BUSINESS <span>↗</span> IDEAS INTO REALITY <span>↗</span> SOFTWARE <span>↗</span> BUSINESS</div></div>
        <Projects />
        <VideoProjects />
        <About />
        <Timeline />
        <Skills />
        <Equipment />
        <Contact />
      </main>
      <Footer />
      </div></div>
    </div>
  );
}

export default App;
