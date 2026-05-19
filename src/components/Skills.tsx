import React from 'react';
import {
  SiReact, SiHtml5, SiCss, SiJavascript, SiTypescript,
  SiFigma, SiCanva, SiDavinciresolve,
} from 'react-icons/si';
import type { IconType } from 'react-icons';
import { useInView } from '../hooks/useInView';
import './Skills.css';

const PremiereProIcon = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M4.444 0h15.112C21.996 0 24 2.004 24 4.444v15.112C24 21.996 21.996 24 19.556 24H4.444C1.999 24 0 21.996 0 19.556V4.444C0 1.999 2.004 0 4.444 0zM6.31 17.65V8.09h3.49c.79 0 1.44.1 1.96.3.52.2.95.47 1.28.82.33.35.57.76.72 1.23.15.47.22.98.22 1.53 0 .59-.09 1.13-.26 1.61-.17.48-.43.9-.77 1.24-.34.34-.76.6-1.27.79-.51.19-1.09.28-1.74.28H7.97v3.75H6.31zm1.66-5.17h1.62c.92 0 1.6-.19 2.02-.56.43-.38.64-.92.64-1.63 0-.73-.21-1.27-.63-1.62-.42-.35-1.08-.52-1.99-.52H7.97v4.33zm5.94 5.17V9.9h1.64v.92h.04c.27-.35.62-.63 1.04-.84.42-.21.87-.32 1.37-.32.95 0 1.67.28 2.17.83.5.55.75 1.38.75 2.48v4.63h-1.66v-4.35c0-.65-.13-1.14-.39-1.47-.26-.33-.66-.49-1.2-.49-.56 0-1.01.18-1.34.54-.33.36-.5.87-.5 1.52v4.25h-1.66V17.65z"/>
  </svg>
);

type SkillEntry = {
  name: string;
  color: string;
  Icon: IconType | React.ComponentType<{ size?: number }>;
};

const DEV_SKILLS: SkillEntry[] = [
  { name: 'React',      color: '#61dafb', Icon: SiReact },
  { name: 'HTML5',      color: '#e34f26', Icon: SiHtml5 },
  { name: 'CSS3',       color: '#1572b6', Icon: SiCss },
  { name: 'JavaScript', color: '#f7df1e', Icon: SiJavascript },
  { name: 'TypeScript', color: '#3178c6', Icon: SiTypescript },
];

const DESIGN_TOOLS: SkillEntry[] = [
  { name: 'Figma',          color: '#a259ff', Icon: SiFigma },
  { name: 'Canva',          color: '#7d2ae8', Icon: SiCanva },
  { name: 'Premiere Pro',   color: '#9999ff', Icon: PremiereProIcon },
  { name: 'DaVinci Resolve',color: '#f2465c', Icon: SiDavinciresolve },
];

function SkillCard({ name, color, Icon }: SkillEntry) {
  return (
    <div className="skill-card" style={{ '--skill-color': color } as React.CSSProperties}>
      <div className="skill-icon">
        <Icon size={40} />
      </div>
      <span className="skill-name">{name}</span>
    </div>
  );
}

export default function Skills() {
  const [ref, inView] = useInView<HTMLElement>();

  return (
    <section className="skills" id="skills" ref={ref}>
      <div className="container">
        <span className="section-tag">What I Use</span>
        <h2 className="section-title">Skills &amp; Tools</h2>
        <div className="section-divider" style={{ marginBottom: '3.5rem' }} />

        <div className={`skills-body${inView ? ' in-view' : ''}`}>
          <div className="skills-group fade-up">
            <h3 className="skills-group-label">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
              </svg>
              Development
            </h3>
            <div className="skill-grid">
              {DEV_SKILLS.map(s => <SkillCard key={s.name} {...s} />)}
            </div>
          </div>

          <div className="skills-group fade-up" style={{ transitionDelay: '0.15s' }}>
            <h3 className="skills-group-label">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" />
              </svg>
              Design Tools
            </h3>
            <div className="skill-grid">
              {DESIGN_TOOLS.map(s => <SkillCard key={s.name} {...s} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
