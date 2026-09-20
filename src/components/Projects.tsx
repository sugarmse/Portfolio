import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { scrollToProject } from '../scroll';
import './Projects.css';

const PROJECTS = [
  {
    id: 'gopanora',
    name: 'GoPanora',
    category: 'Virtual tour builder',
    note: 'Spaces worth exploring.',
    detail: 'A 360-degree virtual tour builder for real estate, hotels, rentals, and property photographers. Turn panorama images into interactive tours with hotspots, floor plans, share links, embeds, QR codes, and custom branding.',
    url: 'https://www.gopanora.com/',
    image: '/projects/gopanora-og.jpg',
    current: true,
  },
  {
    id: 'ss-construction',
    name: 'SS Construction',
    category: 'Commercial & Civil Infrastructure',
    note: 'Built on trust, delivered with precision.',
    detail: 'Modern web platform built for a premier commercial construction and civil infrastructure firm in Nepal. Features responsive architectural aesthetics, interactive service explorations, trust metrics, team showcases, and an interactive cost & scope estimator.',
    url: 'https://construction-design-one.vercel.app/ss_construction_website.html',
    image: '/projects/construction-og.jpg',
    current: false,
  },
  {
    id: 'ss-travels',
    name: 'SS Travels',
    category: 'Travel & Tourism Platform',
    note: 'Explore Nepal and the world.',
    detail: 'A luxury, adventure-focused travel and tour agency platform crafted for seamless trip discovery across Nepal and international destinations. Features fluid interactive polaroids, dynamic search & filtering, curated destination showcases, and custom booking inquiry flows.',
    url: 'https://travel-agency-design-two.vercel.app/ss_travels_website_nepal.html',
    image: '/projects/travels-og.jpg',
    current: false,
  },
  {
    id: 'ss-bakery',
    name: 'SS Bakery',
    category: 'Artisan Bakery & Confectionery',
    note: 'Good things are baked daily in Nepal.',
    detail: 'Artisan bakery and pastry shop digital storefront created for handcrafted baked goods in Kathmandu Valley. Features warm editorial visual identity, categorized menu showcases, daily fresh special spotlights, and custom online cake ordering.',
    url: 'https://bakery-design-template.vercel.app/',
    image: '/projects/bakery-og.jpg',
    current: false,
  },
  {
    id: 'bobalicious',
    name: 'Bobalicious',
    category: 'Current work',
    note: 'One of my current ventures.',
    detail: 'Bobalicious is one of the projects I am currently working on alongside GoPanora and a POS system for Rudraman and Sashil Shakya.',
    url: '',
    image: '/projects/bobalicious-og.jpg',
    current: true,
  },
  {
    id: 'ss-construction',
    name: 'SS Construction',
    category: 'Commercial & Civil Infrastructure',
    note: 'Built on trust, delivered with precision.',
    detail: 'Modern web platform built for a premier commercial construction and civil infrastructure firm in Nepal. Features responsive architectural aesthetics, interactive service explorations, trust metrics, team showcases, and an interactive cost & scope estimator.',
    url: 'https://construction-design-one.vercel.app/ss_construction_website.html',
    image: '/projects/construction-og.jpg',
    current: false,
  },
];
type Project = typeof PROJECTS[number];

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!selected || !dialog.current) return;
    const node = dialog.current;
    const oldOverflow = document.body.style.overflow;
    const smoother = ScrollSmoother.get();
    smoother?.paused(true);
    document.body.style.overflow = 'hidden';
    node.showModal();
    return () => {
      node.close();
      document.body.style.overflow = oldOverflow;
      smoother?.paused(false);
      opener.current?.focus({ preventScroll: true });
    };
  }, [selected]);

  return (
    <section className="projects-section" id="projects" aria-labelledby="projects-title">
      <div className="container">
        <div className="project-pin-stage">
        <div className="project-heading">
          <div><span className="section-tag">01 / Selected work</span><h2 className="section-title" id="projects-title">Ideas in the real world<span className="accent-text">.</span></h2><div className="section-divider" /></div>
          <p>Software and ventures I'm building.<br />Select a project to take a closer look.</p>
        </div>
        <div className="project-rail-controls" aria-label="Choose a project">
          <span className="project-scroll-hint">Scroll to explore <span aria-hidden="true">→</span></span>
          <div>{PROJECTS.map((project, index) => <button key={project.id} onClick={() => scrollToProject(index)} aria-label={`Show ${project.name}`}><span>0{index + 1}</span> {project.name}</button>)}</div>
        </div>
        <div className="project-viewport"><div className="project-grid">
          {PROJECTS.map((project, index) => (
            <article key={project.id} className="project-card fade-up" id={`project-${project.id}`}>
              <button className="project-open" onClick={event => { opener.current = event.currentTarget; setSelected(project); }} aria-label={`Explore ${project.name}`} aria-haspopup="dialog">
                <div className={`project-art project-art-${project.id}`} aria-hidden="true">
                  <img src={project.image} alt={project.name} className="project-image" loading="lazy" />
                  <div className="project-art-overlay" />
                  <span className="project-number">0{index + 1}</span>
                  <span className="project-arrow">↗</span>
                </div>
                <div className="project-meta"><div><span className="proj-category">{project.category}</span><h3>{project.name}</h3></div><span className="project-action">Explore <span aria-hidden="true">↗</span></span></div>
              </button>
              <div className="project-card-footer"><p>{project.note}</p>{project.current && <span className="project-current"><span className="status-dot" />Current work</span>}</div>
            </article>
          ))}
        </div>
        </div>
        <div className="project-travel-progress" aria-hidden="true"><span /></div>
        </div>
        <a className="project-pos-note" href="#contact"><span><span className="section-tag">Also building</span><strong>A POS system for Rudraman and Sashil Shakya.</strong></span><span aria-hidden="true">↗</span></a>
      </div>
      {createPortal(<dialog ref={dialog} className="project-dialog" aria-labelledby="project-dialog-title" onCancel={() => setSelected(null)} onClick={event => { if (event.target === event.currentTarget) { const rect = event.currentTarget.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) setSelected(null); } }}>
        {selected && <>
          <button className="dialog-close" onClick={() => setSelected(null)} aria-label="Close project">×</button>
          {selected.image && (
            <div className="dialog-image-wrap">
              <img src={selected.image} alt={selected.name} className="dialog-image" />
            </div>
          )}
          <span className="section-tag">{selected.category}</span>
          <h2 id="project-dialog-title">{selected.name}</h2>
          <p>{selected.detail}</p>
          <div className="dialog-actions">
            {selected.url && <a className="btn btn-primary" href={selected.url} target="_blank" rel="noopener noreferrer">Visit website ↗</a>}
            <a className="btn btn-ghost" href={`mailto:info.sarthakshakya@gmail.com?subject=${encodeURIComponent(`Let's talk about ${selected.name}`)}`}>Ask about {selected.name} ↗</a>
          </div>
        </>}
      </dialog>, document.body)}
    </section>
  );
}
