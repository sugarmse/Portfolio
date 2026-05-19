import { useInView } from '../hooks/useInView';
import './About.css';

const STATS = [
  { value: '3+',  label: 'Years Experience' },
  { value: '10+', label: 'Projects Delivered' },
  { value: '2',   label: 'Companies Worked' },
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
              Hello! I'm a passionate Web Developer with a knack for creating
              visually appealing and user-friendly websites. With a strong
              foundation in HTML, CSS, and JavaScript, along with hands-on
              experience in frameworks like React, I thrive on developing
              responsive and engaging digital experiences.
            </p>
            <p>
              My journey in web development began with internships in UI/UX and
              web design, where I honed my skills in crafting intuitive
              interfaces and seamless user experiences. Currently, I work at
              Techmind Solutions, building dynamic web solutions that make a
              lasting impact.
            </p>
            <p>
              When I'm not coding, you'll find me exploring new creative outlets
              or hitting the open road on my motorcycle. This passion for
              storytelling and attention to detail inspires my approach to
              design — whether it's a polished website or the smallest UI detail.
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
