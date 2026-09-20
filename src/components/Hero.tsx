import './Hero.css';

export default function Hero() {
  return (
    <section className="hero" id="hero" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-content container">
        <div className="hero-copy">
          <p className="hero-greeting"><span className="status-dot" /> Software Developer &amp; Entrepreneur</p>
          <h1 className="hero-name" id="hero-title">Sarthak<span className="hero-name-accent"> Shakya.</span></h1>
          <p className="hero-statement">From an idea.<br />To something you can use.</p>
          <p className="hero-bio">I build software and businesses. Currently working on GoPanora, Bobalicious, and a POS system for Rudraman and Sashil Shakya.</p>
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">Explore my work <span aria-hidden="true">↗</span></a>
            <a href="#contact" className="btn btn-ghost">Let's talk <span aria-hidden="true">↗</span></a>
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
          <a href="#projects" className="hero-work-note"><span className="status-dot" /><span>In the works<strong>GoPanora + Bobalicious</strong></span><span aria-hidden="true">↗</span></a>
          <span className="portrait-index" aria-hidden="true">SS / PORTFOLIO</span>
        </div>
      </div>
      <div className="hero-bottom container"><span>Software · Business · Visual storytelling</span><a href="#projects">Scroll to explore <span aria-hidden="true">↓</span></a></div>
    </section>
  );
}
