import { useInView } from '../hooks/useInView';
import './Projects.css';

export default function Projects() {
  const [ref, inView] = useInView<HTMLElement>();

  return (
    <section className="projects-section" id="projects" ref={ref}>
      <div className="container">
        <span className="section-tag">Portfolio</span>
        <h2 className="section-title">Featured Projects</h2>
        <div className="section-divider" />
        <p className="proj-subtitle">
          A selection of work spanning web development, immersive experiences, and real estate technology.
        </p>

        <div className={`proj-featured${inView ? ' in-view' : ''}`}>
          <div className="proj-feat-card fade-up">

            {/* Thumbnail */}
            <div className="proj-feat-thumb">
              <div className="proj-feat-bg">
                <svg className="proj-feat-sphere" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Globe rings */}
                  <ellipse cx="200" cy="150" rx="130" ry="130" stroke="rgba(99,179,237,0.25)" strokeWidth="1"/>
                  <ellipse cx="200" cy="150" rx="130" ry="55"  stroke="rgba(99,179,237,0.2)"  strokeWidth="1"/>
                  <ellipse cx="200" cy="150" rx="130" ry="22"  stroke="rgba(99,179,237,0.15)" strokeWidth="1"/>
                  <ellipse cx="200" cy="150" rx="55"  ry="130" stroke="rgba(99,179,237,0.2)"  strokeWidth="1"/>
                  <ellipse cx="200" cy="150" rx="22"  ry="130" stroke="rgba(99,179,237,0.15)" strokeWidth="1"/>
                  {/* Horizontal cross lines */}
                  <line x1="70" y1="150" x2="330" y2="150" stroke="rgba(99,179,237,0.2)" strokeWidth="1"/>
                  <line x1="200" y1="20"  x2="200" y2="280" stroke="rgba(99,179,237,0.2)" strokeWidth="1"/>
                  {/* 360 label */}
                  <text x="200" y="158" textAnchor="middle" dominantBaseline="middle"
                        fontSize="38" fontWeight="800" fontFamily="Arial, sans-serif"
                        fill="rgba(147,210,255,0.9)" letterSpacing="-2">360°</text>
                </svg>
              </div>
              <div className="proj-feat-thumb-overlay" />
            </div>

            {/* Content */}
            <div className="proj-feat-body">
              <span className="proj-category">Virtual Tours &amp; Real Estate</span>
              <h3 className="proj-feat-title">360 Virtual Tour Nepal</h3>
              <p className="proj-feat-desc">
                An immersive platform for exploring properties and locations across Nepal through
                professional 360-degree virtual tours. Built for real estate agents, property buyers,
                and tourism — letting anyone visit a space from anywhere in the world.
              </p>
              <div className="proj-tags proj-tags-visible">
                {['360° Photography', 'Virtual Tours', 'Real Estate', 'React', 'Vercel'].map(t => (
                  <span key={t} className="proj-tag">{t}</span>
                ))}
              </div>
              <a
                href="https://360virtualtournepal.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary proj-feat-btn"
              >
                Visit Site
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
