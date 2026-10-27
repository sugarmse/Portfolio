import { scrollToSection } from '../scroll';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero" id="hero" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-content container">
        <div className="hero-copy">
          <p className="hero-greeting"><span className="status-dot" /> Software Developer &amp; Video Editor</p>
          <h1 className="hero-name" id="hero-title">Sarthak<span className="hero-name-accent"> Shakya.</span></h1>
          <p className="hero-statement">From an idea.<br />To something you can use.</p>
          <p className="hero-bio">I build websites, software, and dynamic video edits. Currently developing and editing for Gigways, GoPanora, and Bobalicious.</p>
          <div className="hero-actions">
            <a
              href="#projects"
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#projects');
              }}
            >
              Explore my work <span aria-hidden="true">↗</span>
            </a>
            <a
              href="#contact"
              className="btn btn-ghost"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#contact');
              }}
            >
              Let's talk <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="hero-links">
            <a href="https://github.com/sugarmse" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            <a href="/Sarthak_Shakya_CV.pdf" download="Sarthak_Shakya_CV.pdf">Download CV ↓</a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="portrait-frame">
            <img src="/pfp.jpeg" alt="Sarthak Shakya" className="hero-portrait" fetchPriority="high" />
            <div className="portrait-caption"><span>Behind the work</span><span>Code. Create. Build.</span></div>
          </div>
          <a
            href="#projects"
            className="hero-work-note"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#projects');
            }}
            aria-label="In the works: Gigways, GoPanora, Bobalicious. Jump to projects."
          >
            <span className="status-dot" />
            <span>
              In the works
              <strong>Gigways · GoPanora · Bobalicious</strong>
            </span>
            <span className="hero-note-arrow" aria-hidden="true">↗</span>
          </a>
          <span className="portrait-index" aria-hidden="true">SS / PORTFOLIO</span>
        </div>
      </div>
      <div className="hero-bottom container">
        <span>Websites · Software · Video Editing</span>
        <a
          href="#projects"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('#projects');
          }}
        >
          Scroll to explore <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
