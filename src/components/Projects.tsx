import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { scrollToProject } from '../scroll';
import './Projects.css';

export interface SubDesignItem {
  id: string;
  name: string;
  badge: string;
  category: string;
  note: string;
  detail: string;
  url: string;
  image: string;
  accentColor: string;
}

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
  isDesignSuite?: boolean;
  designs?: SubDesignItem[];
}
export type Project = ProjectItem;

const PROJECTS: ProjectItem[] = [
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
    id: 'web-design-concepts',
    name: 'Web Design Concepts',
    category: 'Interactive UI/UX & Web Prototypes',
    note: 'Crafted design concepts and interactive templates.',
    detail: 'A curated collection of bespoke, production-ready website design concepts and interactive templates created for diverse industries — including civil infrastructure, luxury travel, and artisan bakery.',
    url: '',
    image: '/projects/construction-og.jpg',
    current: false,
    accentColor: '#38bdf8',
    isDesignSuite: true,
    designs: [
      {
        id: 'ss-construction',
        name: 'SS Construction',
        badge: '01 Construction',
        category: 'Commercial & Civil Infrastructure Concept',
        note: 'Built on trust, delivered with precision.',
        detail: 'Modern web platform concept created for a premier commercial construction and civil infrastructure firm in Nepal. Features responsive architectural aesthetics, interactive service explorations, trust metrics, team showcases, and an interactive cost & scope estimator.',
        url: 'https://construction-design-one.vercel.app/ss_construction_website.html',
        image: '/projects/construction-og.jpg',
        accentColor: '#38bdf8',
      },
      {
        id: 'ss-travels',
        name: 'SS Travels',
        badge: '02 Travels',
        category: 'Travel & Tourism Platform Concept',
        note: 'Explore Nepal and the world.',
        detail: 'A luxury, adventure-focused travel and tour agency design crafted for seamless trip discovery across Nepal and international destinations. Features fluid interactive polaroids, dynamic search & filtering, curated destination showcases, and custom booking inquiry flows.',
        url: 'https://travel-agency-design-two.vercel.app/ss_travels_website_nepal.html',
        image: '/projects/travels-og.jpg',
        accentColor: '#2dd4bf',
      },
      {
        id: 'ss-bakery',
        name: 'SS Bakery',
        badge: '03 Bakery',
        category: 'Artisan Bakery & Confectionery Concept',
        note: 'Good things are baked daily in Nepal.',
        detail: 'Artisan bakery and pastry shop digital storefront design created for handcrafted baked goods in Kathmandu Valley. Features warm editorial visual identity, categorized menu showcases, daily fresh special spotlights, and custom online cake ordering.',
        url: 'https://bakery-design-template.vercel.app/',
        image: '/projects/bakery-og.jpg',
        accentColor: '#fb923c',
      },
    ],
  },
];

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [activeDesignIndex, setActiveDesignIndex] = useState<number>(0);
  const [modalDesignIndex, setModalDesignIndex] = useState<number>(0);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

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

  // Track active slide on mobile horizontal scroll
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const cards = el.querySelectorAll<HTMLElement>('.project-card');
        if (!cards.length) return;
        const scrollCenter = el.scrollLeft + el.clientWidth / 2;
        let closest = 0;
        let minDiff = Infinity;
        cards.forEach((card, i) => {
          const cardCenter = card.offsetLeft + card.clientWidth / 2;
          const diff = Math.abs(cardCenter - scrollCenter);
          if (diff < minDiff) {
            minDiff = diff;
            closest = i;
          }
        });
        setActiveSlideIndex(closest);
      });
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  // Horizontal touch swipe gesture support to advance cards
  const touchStartPos = useRef<{ x: number; y: number; time: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartPos.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      time: Date.now(),
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartPos.current) return;
    const deltaX = e.changedTouches[0].clientX - touchStartPos.current.x;
    const deltaY = e.changedTouches[0].clientY - touchStartPos.current.y;
    const deltaTime = Date.now() - touchStartPos.current.time;
    touchStartPos.current = null;

    // Distinct horizontal swipe: > 40px, more horizontal than vertical, within 600ms
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40 && deltaTime < 600) {
      const activeBtn = document.querySelector('.project-rail-controls button.is-current');
      let currentIdx = activeSlideIndex;
      if (activeBtn) {
        const btns = Array.from(document.querySelectorAll('.project-rail-controls button'));
        const idx = btns.indexOf(activeBtn);
        if (idx >= 0) currentIdx = idx;
      }

      if (deltaX < 0 && currentIdx < PROJECTS.length - 1) {
        handleSlideJump(currentIdx + 1);
      } else if (deltaX > 0 && currentIdx > 0) {
        handleSlideJump(currentIdx - 1);
      }
    }
  };

  const handleSlideJump = (index: number) => {
    setActiveSlideIndex(index);
    scrollToProject(index);
  };

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
                    onClick={() => handleSlideJump(index)}
                    aria-label={`Show ${project.name}`}
                    className={activeSlideIndex === index ? 'is-current' : ''}
                    aria-current={activeSlideIndex === index ? 'true' : undefined}
                  >
                    <span>{String(index + 1).padStart(2, '0')}</span> {project.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Fullscreen Showcase Rail Viewport */}
            <div
              ref={viewportRef}
              className="project-viewport"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div className="project-grid">
                {PROJECTS.map((project, index) => {
                  const isSuite = Boolean(project.isDesignSuite && project.designs?.length);
                  const activeDesign = isSuite
                    ? project.designs![activeDesignIndex] || project.designs![0]
                    : null;
                  const displayAccent = activeDesign ? activeDesign.accentColor : project.accentColor;
                  const displayCategory = activeDesign ? activeDesign.category : project.category;
                  const displayName = activeDesign ? activeDesign.name : project.name;
                  const displayNote = activeDesign ? activeDesign.note : project.note;
                  const displayDetail = activeDesign ? activeDesign.detail : project.detail;
                  const displayUrl = activeDesign ? activeDesign.url : project.url;
                  const displayImage = activeDesign ? activeDesign.image : project.image;
                  const displayArtClass = activeDesign ? `project-art-${activeDesign.id}` : `project-art-${project.id}`;

                  return (
                    <article
                      key={project.id}
                      className="project-card fade-up"
                      id={`project-${project.id}`}
                      style={{ '--proj-accent': displayAccent, '--tab-accent': displayAccent } as React.CSSProperties}
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
                              <span className="proj-category">{displayCategory}</span>
                              {project.current && (
                                <span className="project-current-badge">
                                  <span className="status-dot" /> Current work
                                </span>
                              )}
                              {isSuite && (
                                <span className="design-suite-pill">
                                  3 Design Concepts
                                </span>
                              )}
                            </div>

                            {/* Design Switcher Tabs for Design Suite */}
                            {isSuite && project.designs && (
                              <div className="design-switcher-tabs" role="tablist" aria-label="Select design concept">
                                {project.designs.map((d, dIdx) => (
                                  <button
                                    key={d.id}
                                    type="button"
                                    role="tab"
                                    aria-selected={activeDesignIndex === dIdx}
                                    className={`design-tab-btn${activeDesignIndex === dIdx ? ' is-active' : ''}`}
                                    style={{ '--tab-accent': d.accentColor } as React.CSSProperties}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setActiveDesignIndex(dIdx);
                                    }}
                                  >
                                    <span className="design-tab-num">0{dIdx + 1}</span>
                                    <span className="design-tab-name">{d.name}</span>
                                  </button>
                                ))}
                              </div>
                            )}

                            <div className="project-title-wrap">
                              {isSuite && (
                                <span className="design-suite-prefix">
                                  Web Design Concept 0{activeDesignIndex + 1}
                                </span>
                              )}
                              <h3 className="project-title">{displayName}</h3>
                            </div>
                            <p className="project-tagline">{displayNote}</p>
                          </div>

                          <p className="project-description">{displayDetail}</p>

                          <div className="project-actions-row">
                            {displayUrl && (
                              <a
                                className="btn btn-primary project-visit-btn"
                                href={displayUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={isSuite ? `Preview ${displayName} design` : `Visit ${displayName} website`}
                              >
                                {isSuite ? 'Preview Design ↗' : 'Visit website ↗'}
                              </a>
                            )}
                            <button
                              type="button"
                              className="btn btn-ghost project-explore-btn"
                              onClick={event => {
                                opener.current = event.currentTarget;
                                setSelected(project);
                                if (isSuite) {
                                  setModalDesignIndex(activeDesignIndex);
                                }
                              }}
                              aria-label={`Explore details for ${displayName}`}
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
                              if (isSuite) {
                                setModalDesignIndex(activeDesignIndex);
                              }
                            }}
                            aria-label={`Explore ${displayName}`}
                          >
                            <div className={`project-art ${displayArtClass}`} aria-hidden="true">
                              <img
                                key={displayImage}
                                src={displayImage}
                                alt={displayName}
                                className="project-image"
                                loading="lazy"
                                decoding="async"
                              />
                              <div className="project-art-overlay" />

                              {/* Floating Category & Zoom Badges */}
                              <div className="project-art-floating-meta">
                                <span className="project-art-chip">{displayCategory}</span>
                                <span className="project-arrow-badge">↗</span>
                              </div>
                            </div>
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            {/* Mobile Project Navigation Indicators & Swipe Hint */}
            <div className="mobile-project-indicators" aria-label="Project slide navigation">
              <div className="mobile-dot-group">
                {PROJECTS.map((project, index) => (
                  <button
                    key={project.id}
                    type="button"
                    className={`mobile-dot-indicator${activeSlideIndex === index ? ' is-active' : ''}`}
                    onClick={() => handleSlideJump(index)}
                    aria-label={`Go to slide ${index + 1}: ${project.name}`}
                    style={{ '--dot-accent': project.accentColor } as React.CSSProperties}
                  >
                    <span className="dot-fill" />
                  </button>
                ))}
              </div>
              <div className="mobile-swipe-hint">
                <span>Swipe to explore</span>
                <span className="swipe-arrow" aria-hidden="true">→</span>
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
          {selected && (() => {
            const isSuite = Boolean(selected.isDesignSuite && selected.designs?.length);
            const activeModalDesign = isSuite
              ? selected.designs![modalDesignIndex] || selected.designs![0]
              : null;
            const displayCategory = activeModalDesign ? activeModalDesign.category : selected.category;
            const displayName = activeModalDesign ? activeModalDesign.name : selected.name;
            const displayDetail = activeModalDesign ? activeModalDesign.detail : selected.detail;
            const displayUrl = activeModalDesign ? activeModalDesign.url : selected.url;
            const displayImage = activeModalDesign ? activeModalDesign.image : selected.image;
            const displayAccent = activeModalDesign ? activeModalDesign.accentColor : selected.accentColor;

            return (
              <>
                <div className="sheet-drag-handle" aria-hidden="true" />
                <button className="dialog-close" onClick={() => setSelected(null)} aria-label="Close project">
                  ×
                </button>

                {isSuite && selected.designs && (
                  <div className="dialog-design-tabs" role="tablist" aria-label="Choose design concept">
                    {selected.designs.map((d, dIdx) => (
                      <button
                        key={d.id}
                        type="button"
                        role="tab"
                        aria-selected={modalDesignIndex === dIdx}
                        className={`dialog-design-tab${modalDesignIndex === dIdx ? ' is-active' : ''}`}
                        style={{ '--tab-accent': d.accentColor } as React.CSSProperties}
                        onClick={() => setModalDesignIndex(dIdx)}
                      >
                        <span>0{dIdx + 1}</span> {d.name}
                      </button>
                    ))}
                  </div>
                )}

                {displayImage && (
                  <div className="dialog-image-wrap">
                    <img key={displayImage} src={displayImage} alt={displayName} className="dialog-image" />
                  </div>
                )}
                <span className="section-tag" style={{ color: displayAccent }}>{displayCategory}</span>
                <h2 id="project-dialog-title">{displayName}</h2>
                <p>{displayDetail}</p>
                <div className="dialog-actions">
                  {displayUrl && (
                    <a className="btn btn-primary" href={displayUrl} target="_blank" rel="noopener noreferrer">
                      {isSuite ? 'Preview Design ↗' : 'Visit website ↗'}
                    </a>
                  )}
                  <a
                    className="btn btn-ghost"
                    href={`mailto:info.sarthakshakya@gmail.com?subject=${encodeURIComponent(`Let's talk about ${displayName}`)}`}
                  >
                    Ask about {displayName} ↗
                  </a>
                </div>
              </>
            );
          })()}
        </dialog>,
        document.body
      )}
    </>
  );
}
