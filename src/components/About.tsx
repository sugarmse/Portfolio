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
              Hello! I'm a full-stack developer turned entrepreneur with a
              passion for clean UI/UX and visual storytelling. After wrapping up
              my time as a developer at Kathmandu Codes in early 2026, I shifted
              gears to manage and scale my own business.
            </p>
            <p>
              I still write a lot of code, but my workflow looks a bit different
              now. I actively collaborate with AI tools to automate the heavy
              lifting and optimise my architecture, keeping me focused on
              execution and design rather than getting bogged down in syntax.
            </p>
            <p>
              Outside of tech and business, I'm a massive motorcycle enthusiast
              and visual creator. You'll usually find me shooting moto-vlogs and
              travel stories, or taking my photography into the professional realm
              through a new platform I built for real estate and 360-degree
              virtual tours. I thrive on creating immersive experiences — whether
              that's through a beautifully coded website or a perfectly framed lens.
            </p>
            <a href="/SS.pdf" download className="btn btn-ghost about-cv-btn">
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
              <img src="/mono.jpg" alt="Sarthak Shakya" className="about-img" />
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
