import { useInView } from '../hooks/useInView';
import './About.css';

const STATS = [
  { value: '3+',  label: 'Years Experience' },
  { value: '10+', label: 'Projects Delivered' },
  { value: '3',   label: 'Companies Worked' },
  { value: '5+',  label: 'Tech Stacks' },
];

export default function About() {
  const [ref, inView] = useInView<HTMLElement>();

  return (
    <section className="about" id="about" ref={ref}>
      <div className="container">
        <div className={`about-grid${inView ? ' in-view' : ''}`}>
          <div className="about-text">
            <span className="section-tag">Who I Am</span>
            <h2 className="section-title">Introduction</h2>
            <div className="section-divider" />
            <p>
              Hello! I'm a software developer and entrepreneur. I'm currently
              working on GoPanora, Bobalicious, and a POS system for Rudraman
              and Sashil Shakya.
            </p>
            <p>
              My work brings together software development and business. I use
              AI tools in my development workflow to support implementation,
              automation, and architecture, with a focus on building useful products.
            </p>
            <p>
              Outside of software and business, I enjoy motorcycles, photography,
              and visual storytelling through moto-vlogs and travel stories.
            </p>
            <a href="/Sarthak_Shakya_CV.pdf" download="Sarthak_Shakya_CV.pdf" className="btn btn-ghost about-cv-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download CV
            </a>
          </div>

          <div className="about-right">
            <div className="about-img-wrap">
              <img src="/pfp.jpeg" alt="Sarthak Shakya" className="about-img" />
              <div className="about-img-glow" />
            </div>
            <div className="about-stats">
              {STATS.map(s => (
                <div key={s.label} className="stat-card">
                  <span className="stat-value">{s.value}</span>
                  <span className="stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
