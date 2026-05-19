import { useState } from 'react';
import { useInView } from '../hooks/useInView';
import './Projects.css';

interface Project {
  id: number;
  title: string;
  category: string;
  desc: string;
  tags: string[];
  image: string;
  logo?: string;
  link?: string;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'NABIL Bank — Web Platform',
    category: 'Web Development',
    desc: 'Developed a modern web platform for NABIL Bank, implementing responsive UI components and dynamic data visualization dashboards.',
    tags: ['React', 'TypeScript', 'CSS3'],
    image: '/nabilogo.png',
    logo: '/nabilogo.png',
  },
  {
    id: 2,
    title: 'Pay — Payment App',
    category: 'UI / UX Design',
    desc: 'Designed a seamless digital payment application with intuitive user flows, focusing on security UX and frictionless transactions.',
    tags: ['Figma', 'UI Design', 'Prototyping'],
    image: '/Pay.png',
  },
  {
    id: 3,
    title: 'Create — Design Studio',
    category: 'Web Development',
    desc: 'Built a creative studio landing page with rich animations, custom typography layout, and a portfolio showcase system.',
    tags: ['React', 'CSS', 'Animation'],
    image: '/Create.png',
  },
  {
    id: 4,
    title: 'Innovative Solutions',
    category: 'Brand & Web',
    desc: 'Full brand identity and website for a tech startup — logo design, color system, component library, and marketing pages.',
    tags: ['Figma', 'React', 'Branding'],
    image: '/InnovativeLogo.png',
    logo: '/InnovativeLogo.png',
  },
];

function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className="proj-card fade-up"
      style={{ transitionDelay: `${delay}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="proj-img-wrap">
        <img src={project.image} alt={project.title} className="proj-img" />
        <div className={`proj-overlay${hovered ? ' visible' : ''}`}>
          <div className="proj-overlay-content">
            <p>{project.desc}</p>
            <div className="proj-tags">
              {project.tags.map(t => <span key={t} className="proj-tag">{t}</span>)}
            </div>
          </div>
        </div>
      </div>
      <div className="proj-body">
        <span className="proj-category">{project.category}</span>
        <h3 className="proj-title">{project.title}</h3>
        <div className="proj-tags proj-tags-visible">
          {project.tags.map(t => <span key={t} className="proj-tag">{t}</span>)}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const [ref, inView] = useInView<HTMLElement>();

  return (
    <section className="projects-section" id="projects" ref={ref}>
      <div className="container">
        <span className="section-tag">Portfolio</span>
        <h2 className="section-title">Featured Projects</h2>
        <div className="section-divider" />
        <p className="proj-subtitle">
          A selection of work spanning web development, UI/UX design, and brand identity.
        </p>

        <div className={`proj-grid${inView ? ' in-view' : ''}`}>
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}
