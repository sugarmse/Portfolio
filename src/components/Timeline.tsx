import { useInView } from '../hooks/useInView';
import './Timeline.css';

const EXPERIENCE = [
  {
    role: 'Software Developer',
    company: 'Kathmandu Codes',
    period: 'Aug 2025 – Jan 2026',
    desc: 'Developed and maintained software applications, collaborating with cross-functional teams to deliver high-quality solutions.',
  },
  {
    role: 'Web Developer',
    company: 'Techmind Solutions',
    period: 'Jan 2024 – Jul 2025',
    desc: 'Building dynamic, responsive web applications using React and TypeScript. Developing scalable front-end solutions that make a lasting impact.',
  },
  {
    role: 'UI / UX Developer',
    company: 'AwakeTech Solutions',
    period: 'Jan 2024 – Dec 2024',
    desc: 'Designed and implemented intuitive user interfaces, focusing on seamless user experience and modern design principles.',
  },
];

const EDUCATION = [
  {
    degree: 'BSc. CSIT',
    school: 'NCIT',
    period: '2019 – 2024',
    desc: 'Bachelor of Science in Computer Science & Information Technology. Focus on software development, algorithms, and system design.',
  },
  {
    degree: '+2 Science',
    school: 'KMC',
    period: '2017 – 2019',
    desc: 'Higher secondary education in science stream, building a strong foundation in mathematics and physics.',
  },
  {
    degree: 'SEE',
    school: 'IMS',
    period: 'Completed 2017',
    desc: 'Secondary Education Examination — foundational academic achievement.',
  },
];

function TimelineItem({
  title, sub, period, desc, delay,
}: {
  title: string; sub: string; period: string; desc: string; delay: number;
}) {
  return (
    <div className="tl-item fade-up" style={{ transitionDelay: `${delay}ms` }}>
      <div className="tl-dot" />
      <div className="tl-card">
        <div className="tl-meta">
          <span className="tl-period">{period}</span>
        </div>
        <h4 className="tl-title">{title}</h4>
        <p className="tl-sub">{sub}</p>
        <p className="tl-desc">{desc}</p>
      </div>
    </div>
  );
}

export default function Timeline() {
  const [ref, inView] = useInView<HTMLElement>();

  return (
    <section className="timeline-section" id="experience" ref={ref}>
      <div className="container">
        <div className="tl-header">
          <span className="section-tag">Background</span>
          <h2 className="section-title">Experience &amp; Education</h2>
          <div className="section-divider" />
        </div>

        <div className={`tl-columns${inView ? ' in-view' : ''}`}>
          {/* Experience */}
          <div className="tl-col">
            <div className="tl-col-header">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
              </svg>
              Experience
            </div>
            <div className="tl-track">
              {EXPERIENCE.map((e, i) => (
                <TimelineItem key={e.company} title={e.role} sub={e.company} period={e.period} desc={e.desc} delay={i * 100} />
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="tl-col">
            <div className="tl-col-header">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
              Education
            </div>
            <div className="tl-track">
              {EDUCATION.map((e, i) => (
                <TimelineItem key={e.degree} title={e.degree} sub={e.school} period={e.period} desc={e.desc} delay={i * 100 + 50} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
