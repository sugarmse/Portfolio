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
              Hello! I'm a Software Developer &amp; Video Editor. I design and build
              responsive websites, develop production software, and create high-retention video
              edits. I'm currently working on Gigways, GoPanora, and Bobalicious, alongside
              a POS system for Rudraman and Sashil Shakya.
            </p>
            <p>
              My work connects technical engineering with visual media. Whether
              it’s architecting full-stack web platforms, shipping intuitive product features,
              or crafting cinematic product walkthroughs and commercial edits with synchronized
              motion and sound, I focus on delivering polished, practical results.
            </p>
            <p>
              Outside of coding and editing suites, you'll find me exploring new creative
              outlets, riding motorcycles, and storytelling through photography and travel filmmaking.
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
