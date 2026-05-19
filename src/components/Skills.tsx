import React from 'react';
import {
  SiReact, SiHtml5, SiCss, SiJavascript, SiTypescript,
  SiFigma, SiCanva, SiDavinciresolve,
} from 'react-icons/si';
import type { IconType } from 'react-icons';
import { useInView } from '../hooks/useInView';
import './Skills.css';

const PremiereProIcon = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    <defs>
      <mask id="pr-text-mask">
        <rect width="24" height="24" rx="3.5" fill="white"/>
        <text x="12" y="13.8" textAnchor="middle" dominantBaseline="middle"
              fontSize="9" fontWeight="900" fontFamily="'Arial Black', Arial, sans-serif"
              letterSpacing="-0.5" fill="black">Pr</text>
      </mask>
    </defs>
    <rect width="24" height="24" rx="3.5" fill="currentColor" mask="url(#pr-text-mask)"/>
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
