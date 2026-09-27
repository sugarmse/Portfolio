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
    accentColor: '#ff995e',
  },
  {
    id: 'bobalicious',
    name: 'Bobalicious',
    category: 'Current work',
    note: 'One of my current ventures.',
    detail: 'Bobalicious is an active venture alongside GoPanora and Gigways, combining digital development, brand presence, and visual storytelling.',
    url: '',
    image: '/projects/bobalicious-og.jpg',
    current: true,
    accentColor: '#f472b6',
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
    accentColor: '#38bdf8',
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
    accentColor: '#2dd4bf',
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
    accentColor: '#fb923c',
  },
];

export interface ProjectItem {
  id: string;
  name: string;
  category: string;
  note: string;
  detail: string;
  url: string;
  image: string;
  current: boolean;
  accentColor: string;
}
export type Project = ProjectItem;

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
    <>
      <section className="projects-section" id="projects" aria-labelledby="projects-title">
        <div className="project-pin-stage">
          <div className="project-stage-inner">
            {/* Top Section Header & Controls */}
            <div className="project-heading-bar">
              <div className="project-heading-left">
                <span className="section-tag">01 / Selected work</span>
                <h2 className="section-title" id="projects-title">
                  Ideas in the real world<span className="accent-text">.</span>
                </h2>
              </div>
              <div className="project-rail-controls" aria-label="Choose a project">
                {PROJECTS.map((project, index) => (
                  <button
                    key={project.id}
                    onClick={() => scrollToProject(index)}
                    aria-label={`Show ${project.name}`}
                    className={index === 0 ? 'is-current' : ''}
                  >
                    <span>{String(index + 1).padStart(2, '0')}</span> {project.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Fullscreen Showcase Rail Viewport */}
            <div className="project-viewport">
              <div className="project-grid">
                {PROJECTS.map((project, index) => (
                  <article
                    key={project.id}
                    className="project-card fade-up"
                    id={`project-${project.id}`}
                    style={{ '--proj-accent': project.accentColor } as React.CSSProperties}
                  >
                    <div className="project-card-inner">
                      {/* Subtle Background Watermark Numeral */}
                      <div className="project-watermark" aria-hidden="true">
                        {String(index + 1).padStart(2, '0')}
                      </div>

                      {/* Left: Project Details & Action Links */}
                      <div className="project-info-pane">
                        <div className="project-info-header">
                          <div className="project-badge-row">
                            <span className="project-slide-number">{String(index + 1).padStart(2, '0')}</span>
                            <span className="proj-category">{project.category}</span>
                            {project.current && (
                              <span className="project-current-badge">
                                <span className="status-dot" /> Current work
                              </span>
                            )}
                          </div>
                          <h3 className="project-title">{project.name}</h3>
                          <p className="project-tagline">{project.note}</p>
                        </div>

                        <p className="project-description">{project.detail}</p>

                        <div className="project-actions-row">
                          {project.url && (
                            <a
                              className="btn btn-primary project-visit-btn"
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`Visit ${project.name} website`}
                            >
                              Visit website ↗
                            </a>
                          )}
                          <button
                            type="button"
                            className="btn btn-ghost project-explore-btn"
                            onClick={event => {
                              opener.current = event.currentTarget;
                              setSelected(project);
                            }}
                            aria-label={`Explore details for ${project.name}`}
                            aria-haspopup="dialog"
                          >
                            Explore details ↗
                          </button>
                        </div>
                      </div>

                      {/* Right: Large Cinematic Media Viewport */}
                      <div className="project-media-pane">
                        <button
                          type="button"
                          className="project-media-btn"
                          onClick={event => {
                            opener.current = event.currentTarget;
                            setSelected(project);
                          }}
                          aria-label={`Explore ${project.name}`}
                        >
                          <div className={`project-art project-art-${project.id}`} aria-hidden="true">
                            <img
                              src={project.image}
                              alt={project.name}
                              className="project-image"
                              loading="lazy"
                              decoding="async"
                            />
                            <div className="project-art-overlay" />

                            {/* Prominent Branded Identification Badge */}
                            <div className="project-art-brand-badge">
                              <span className="brand-dot" />
                              <span>{String(index + 1).padStart(2, '0')} • {project.name}</span>
                            </div>

                            {/* Floating Category & Zoom Badges */}
                            <div className="project-art-floating-meta">
                              <span className="project-art-chip">{project.category}</span>
                              <span className="project-arrow-badge">↗</span>
                            </div>
                          </div>
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Travel Progress Bar */}
            <div className="project-travel-progress" aria-hidden="true">
              <span />
            </div>
          </div>
        </div>
      </section>

      {/* POS System Note below the full-screen pinned section */}
      <div className="container project-pos-container">
        <a className="project-pos-note" href="#contact">
          <span>
            <span className="section-tag">Also building</span>
            <strong>A POS system for Rudraman and Sashil Shakya.</strong>
          </span>
          <span aria-hidden="true">↗</span>
        </a>
      </div>

      {/* Dialog Modal */}
      {createPortal(
        <dialog
          ref={dialog}
          className="project-dialog"
          aria-labelledby="project-dialog-title"
          aria-modal="true"
          onCancel={() => setSelected(null)}
          onKeyDown={e => { if (e.key === 'Escape') setSelected(null); }}
          onClick={event => {
            if (event.target === event.currentTarget) {
              const rect = event.currentTarget.getBoundingClientRect();
              if (
                event.clientX < rect.left ||
                event.clientX > rect.right ||
                event.clientY < rect.top ||
                event.clientY > rect.bottom
              ) {
                setSelected(null);
              }
            }
          }}
        >
          {selected && (
            <>
              <button className="dialog-close" onClick={() => setSelected(null)} aria-label="Close project">
                ×
              </button>
              {selected.image && (
                <div className="dialog-image-wrap">
                  <img src={selected.image} alt={selected.name} className="dialog-image" />
                </div>
              )}
              <span className="section-tag">{selected.category}</span>
              <h2 id="project-dialog-title">{selected.name}</h2>
              <p>{selected.detail}</p>
              <div className="dialog-actions">
                {selected.url && (
                  <a className="btn btn-primary" href={selected.url} target="_blank" rel="noopener noreferrer">
                    Visit website ↗
                  </a>
                )}
                <a
                  className="btn btn-ghost"
                  href={`mailto:info.sarthakshakya@gmail.com?subject=${encodeURIComponent(`Let's talk about ${selected.name}`)}`}
                >
                  Ask about {selected.name} ↗
                </a>
              </div>
            </>
          )}
        </dialog>,
        document.body
      )}
    </>
  );
}
