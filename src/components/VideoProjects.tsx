import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import {
  FaPlay,
  FaSliders,
  FaWaveSquare,
  FaFilm,
  FaFolder,
  FaFolderOpen,
  FaChevronLeft,
  FaChevronRight,
  FaGoogleDrive,
} from 'react-icons/fa6';
import {
  VIDEO_PROJECTS,
  VIDEO_CATEGORIES,
  type VideoProject,
  type VideoCategoryFilter,
} from '../data/videoProjects';
import './VideoProjects.css';

gsap.registerPlugin(ScrollTrigger);

export default function VideoProjects() {
  const [activeFilter, setActiveFilter] = useState<VideoCategoryFilter>('All');
  const [selected, setSelected] = useState<VideoProject | null>(null);
  const [activeFolderIndex, setActiveFolderIndex] = useState<number>(0);

  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const tickerTrackRef = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  const activeFolderItem =
    selected?.isFolder && selected.folderItems && selected.folderItems.length > 0
      ? selected.folderItems[activeFolderIndex]
      : null;

  const currentModalVideoSrc = activeFolderItem
    ? activeFolderItem.videoSrc
    : selected?.videoSrc;

  const handlePrevFolderItem = () => {
    if (!selected?.folderItems) return;
    setActiveFolderIndex((prev) => (prev > 0 ? prev - 1 : selected.folderItems!.length - 1));
  };

  const handleNextFolderItem = () => {
    if (!selected?.folderItems) return;
    setActiveFolderIndex((prev) => (prev < selected.folderItems!.length - 1 ? prev + 1 : 0));
  };

  const filteredProjects = activeFilter === 'All'
    ? VIDEO_PROJECTS
    : VIDEO_PROJECTS.filter(p => p.category === activeFilter);

  // Reset folder index when opening a project
  useEffect(() => {
    setActiveFolderIndex(0);
  }, [selected]);

  // Autoplay current video when switched inside modal
  useEffect(() => {
    if (modalVideoRef.current && currentModalVideoSrc) {
      modalVideoRef.current.currentTime = 0;
      modalVideoRef.current.play().catch(() => {});
    }
  }, [currentModalVideoSrc]);

  // Modal scroll lock and lifecycle
  useEffect(() => {
    if (!selected || !dialog.current) return;
    const node = dialog.current;
    const oldOverflow = document.body.style.overflow;
    const smoother = ScrollSmoother.get();
    smoother?.paused(true);
    document.body.style.overflow = 'hidden';
    node.showModal();

    if (modalVideoRef.current && currentModalVideoSrc) {
      modalVideoRef.current.currentTime = 0;
      modalVideoRef.current.play().catch(() => { /* Browser autoplay policies */ });
    }

    return () => {
      if (modalVideoRef.current) {
        modalVideoRef.current.pause();
      }
      node.close();
      document.body.style.overflow = oldOverflow;
      smoother?.paused(false);
      opener.current?.focus({ preventScroll: true });
    };
  }, [selected]);

  // Section Entrance & ScrollTrigger Animations
  useLayoutEffect(() => {
    if (!sectionRef.current) return;
    const isReduced = document.documentElement.dataset.motion === 'reduced';
    if (isReduced) return;

    const ctx = gsap.context(() => {
      // 1. Timecode Ticker scrub across the section
      if (tickerTrackRef.current) {
        gsap.to(tickerTrackRef.current, {
          xPercent: -22,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }

      // 2. Filter buttons stagger in
      gsap.from('.video-filter-btn', {
        y: 18,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.video-filters',
          start: 'top 90%',
          once: true,
        },
      });

      // 3. Initial Video Cards Staggered 3D Entrance
      gsap.from('.video-card', {
        y: 60,
        opacity: 0,
        scale: 0.94,
        rotateX: 8,
        transformPerspective: 950,
        duration: 0.85,
        stagger: 0.12,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.video-grid',
          start: 'top 86%',
          once: true,
        },
      });

      // 4. Production gear note reveal
      gsap.from('.video-gear-note', {
        y: 35,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: '.video-gear-note',
          start: 'top 92%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Category filter switch animation
  useLayoutEffect(() => {
    if (!gridRef.current) return;
    const isReduced = document.documentElement.dataset.motion === 'reduced';
    if (isReduced) return;

    const cards = gridRef.current.querySelectorAll('.video-card');
    if (cards.length > 0) {
      gsap.killTweensOf(cards);
      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 28,
          scale: 0.96,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
          stagger: 0.08,
          ease: 'power3.out',
          clearProps: 'opacity,transform',
        }
      );
    }
  }, [activeFilter]);

  // Interactive 3D Perspective Tilt on Pointer Move
  const handleStagePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const isReduced = document.documentElement.dataset.motion === 'reduced';
    if (isReduced) return;

    const stage = e.currentTarget;
    const rect = stage.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Subtle 3D perspective rotation
    const rotX = (0.5 - y) * 12;
    const rotY = (x - 0.5) * 14;

    gsap.to(stage, {
      rotateX: rotX,
      rotateY: rotY,
      duration: 0.35,
      ease: 'power2.out',
      transformPerspective: 950,
      transformOrigin: 'center center',
    });

    stage.style.setProperty('--pointer-x', `${x * 100}%`);
    stage.style.setProperty('--pointer-y', `${y * 100}%`);

    // Magnetic play button parallax: tracks towards cursor
    const playIndicator = stage.querySelector<HTMLElement>('.video-play-indicator');
    if (playIndicator) {
      const playX = (x - 0.5) * 26;
      const playY = (y - 0.5) * 26;
      gsap.to(playIndicator, {
        x: playX,
        y: playY,
        scale: 1.15,
        duration: 0.25,
        ease: 'power2.out',
      });
    }
  };

  const handleStagePointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    const isReduced = document.documentElement.dataset.motion === 'reduced';
    if (isReduced) return;

    const stage = e.currentTarget;
    gsap.to(stage, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: 'power3.out',
    });

    const playIndicator = stage.querySelector<HTMLElement>('.video-play-indicator');
    if (playIndicator) {
      gsap.to(playIndicator, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: 'elastic.out(1, 0.45)',
      });
    }
  };

  // Card hover handling: live video preview or dynamic audio waveform excitation
  const handleCardMouseEnter = (e: React.MouseEvent<HTMLDivElement>, project: VideoProject) => {
    if (project.videoSrc) {
      const vid = e.currentTarget.querySelector<HTMLVideoElement>('video');
      if (vid) vid.play().catch(() => {});
    } else {
      // Excite waveform bars with GSAP
      const bars = e.currentTarget.querySelectorAll<HTMLElement>('.placeholder-waveform .bar');
      if (bars.length) {
        gsap.to(bars, {
          scaleY: () => gsap.utils.random(0.6, 1.9),
          opacity: () => gsap.utils.random(0.7, 1),
          duration: 0.16,
          repeat: -1,
          yoyo: true,
          stagger: 0.02,
          ease: 'power1.inOut',
        });
      }
    }
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>, project: VideoProject) => {
    if (project.videoSrc) {
      const vid = e.currentTarget.querySelector<HTMLVideoElement>('video');
      if (vid) {
        vid.pause();
        vid.currentTime = 0;
      }
    } else {
      const bars = e.currentTarget.querySelectorAll<HTMLElement>('.placeholder-waveform .bar');
      if (bars.length) {
        gsap.killTweensOf(bars);
        gsap.to(bars, { scaleY: 1, opacity: 0.6, duration: 0.35 });
      }
    }
  };

  return (
    <section ref={sectionRef} className="video-section" id="videos" aria-labelledby="videos-title">
      <div className="container">
        {/* Section Heading */}
        <div className="video-heading">
          <div>
            <span className="section-tag">02 / Video Editing</span>
            <h2 className="section-title" id="videos-title">
              Stories in motion<span className="accent-text">.</span>
            </h2>
            <div className="section-divider" />
          </div>
          <p>
            Commercial reels, moto-vlogs, and dynamic visual storytelling.<br />
            Crafted in DaVinci Resolve &amp; Adobe Premiere Pro with meticulous pacing and sound design.
          </p>
        </div>

        {/* Dynamic Film Timecode Scrubber Ribbon */}
        <div className="video-timecode-ribbon" aria-hidden="true">
          <div ref={tickerTrackRef} className="video-timecode-track">
            <span>[TC 01:24:18:00]</span>
            <span className="dot">•</span>
            <span>COLOR GRADE: S-LOG3 TO REC.709</span>
            <span className="dot">•</span>
            <span>4K UHD 60FPS</span>
            <span className="dot">•</span>
            <span>DAVINCI RESOLVE STUDIO</span>
            <span className="dot">•</span>
            <span>ADOBE PREMIERE PRO</span>
            <span className="dot">•</span>
            <span>DYNAMIC PACING &amp; MATCH CUTS</span>
            <span className="dot">•</span>
            <span>FOLEY &amp; SOUND DESIGN</span>
            <span className="dot">•</span>
            <span>[TC 01:24:18:00]</span>
            <span className="dot">•</span>
            <span>COLOR GRADE: S-LOG3 TO REC.709</span>
            <span className="dot">•</span>
            <span>4K UHD 60FPS</span>
            <span className="dot">•</span>
            <span>DAVINCI RESOLVE STUDIO</span>
            <span className="dot">•</span>
            <span>ADOBE PREMIERE PRO</span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="video-filters" role="tablist" aria-label="Filter video projects by category">
          {VIDEO_CATEGORIES.map(cat => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeFilter === cat}
              className={`video-filter-btn${activeFilter === cat ? ' active' : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat === 'All' ? 'All Edits' : cat}
            </button>
          ))}
        </div>

        {/* Video Grid */}
        <div ref={gridRef} className="video-grid">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className={`video-card fade-up${project.isFolder ? ' video-card-folder' : ''}`}
              id={`video-${project.id}`}
            >
              <button
                className="video-card-btn"
                onClick={(e) => {
                  opener.current = e.currentTarget;
                  setSelected(project);
                }}
                aria-label={`View edit breakdown for ${project.title}`}
                aria-haspopup="dialog"
              >
                {/* 3D Interactive Stage */}
                <div
                  className={`video-thumb-stage${project.isPlaceholder || !project.videoSrc ? ' is-placeholder' : ''}`}
                  onPointerMove={handleStagePointerMove}
                  onPointerLeave={handleStagePointerLeave}
                  onMouseEnter={(e) => handleCardMouseEnter(e, project)}
                  onMouseLeave={(e) => handleCardMouseLeave(e, project)}
                >
                  {project.videoSrc ? (
                    <video
                      src={project.videoSrc}
                      poster={project.poster}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      className="video-preview"
                    />
                  ) : (
                    <div className="video-placeholder-canvas" aria-hidden="true">
                      <div className="placeholder-pattern-grid" />
                      <div className="placeholder-film-strip">
                        <span /><span /><span /><span /><span /><span />
                      </div>
                      <div className="placeholder-center-art">
                        <div className="placeholder-waveform">
                          <span className="bar b1" /><span className="bar b2" /><span className="bar b3" />
                          <span className="bar b4" /><span className="bar b5" /><span className="bar b6" />
                          <span className="bar b7" /><span className="bar b8" /><span className="bar b9" />
                        </div>
                        <span className="placeholder-status-pill">
                          <span className="rec-dot" /> Slot Reserved • Video Coming Soon
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="video-thumb-overlay" />

                  {/* Overlays & Badges */}
                  <div className="video-top-badges">
                    {project.isFolder ? (
                      <span className="video-badge-folder">
                        <FaFolder /> FOLDER • {project.folderItems?.length || 5} EDITS
                      </span>
                    ) : (
                      <span className="video-badge-category">{project.categoryLabel}</span>
                    )}
                    <span className="video-badge-rec">
                      <span className="rec-dot" /> {project.isPlaceholder ? 'PENDING' : 'REC ●'}
                    </span>
                  </div>

                  <div className="video-bottom-badges">
                    <span className="video-badge-spec">
                      {project.isFolder
                        ? 'MULTI-EDIT SUITE'
                        : (project.isPlaceholder ? 'STORYBOARD & SPECS' : '4K UHD')}
                    </span>
                    <span className="video-badge-duration">{project.duration}</span>
                  </div>

                  {/* Magnetic Centered Play / View Specs Button */}
                  <div className="video-play-indicator" aria-hidden="true">
                    {project.isFolder ? <FaFolderOpen /> : <FaPlay />}
                  </div>
                </div>

                {/* Card Meta */}
                <div className="video-card-meta">
                  <div className="video-meta-top">
                    <div>
                      {project.clientOrSeries && (
                        <span className="video-client-tag">{project.clientOrSeries}</span>
                      )}
                      <h3>{project.title}</h3>
                    </div>
                    <span className="video-action-link">
                      {project.isFolder ? 'Open Folder' : (project.isPlaceholder ? 'View Specs' : 'Watch')} <span aria-hidden="true">↗</span>
                    </span>
                  </div>

                  <p className="video-card-desc">{project.description}</p>

                  <div className="video-tools-list">
                    {project.tools.map((tool) => (
                      <span key={tool} className="video-tool-pill">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            </article>
          ))}
        </div>

        {/* Workflow & Equipment Banner */}
        <div className="video-gear-note">
          <div className="video-gear-left">
            <span className="section-tag">Production Pipeline</span>
            <strong>Shot on Sony Alpha 6700 &amp; DJI Osmo 360</strong>
            <p>From camera capture to pacing, velocity ramps, color grading, and dynamic audio mastering.</p>
          </div>
          <a href="#equipment" className="video-gear-link">
            <span>View Equipment &amp; Rig</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      {/* Interactive Video & Spec Breakdown Modal */}
      {createPortal(
        <dialog
          ref={dialog}
          className="video-dialog"
          aria-labelledby="video-dialog-title"
          onCancel={() => setSelected(null)}
          onClick={(event) => {
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
            <div className="video-dialog-content">
              <button
                className="dialog-close"
                onClick={() => setSelected(null)}
                aria-label="Close video player"
              >
                ×
              </button>

              {/* Media Viewport */}
              <div className="video-player-wrap">
                {currentModalVideoSrc ? (
                  <>
                    <video
                      ref={modalVideoRef}
                      key={currentModalVideoSrc}
                      src={currentModalVideoSrc}
                      poster={selected.poster}
                      controls
                      playsInline
                      className="dialog-video-player"
                    />
                    {selected.isFolder && selected.folderItems && selected.folderItems.length > 1 && (
                      <div className="folder-player-bar">
                        <div className="folder-player-status">
                          <span className="folder-player-tag">{activeFolderItem?.tag}</span>
                          <span className="folder-player-title">{activeFolderItem?.title}</span>
                        </div>
                        <div className="folder-player-nav">
                          <button
                            type="button"
                            className="folder-nav-arrow"
                            onClick={handlePrevFolderItem}
                            aria-label="Previous edit"
                            title="Previous edit"
                          >
                            <FaChevronLeft />
                          </button>
                          <span className="folder-nav-counter">
                            {activeFolderIndex + 1} / {selected.folderItems.length}
                          </span>
                          <button
                            type="button"
                            className="folder-nav-arrow"
                            onClick={handleNextFolderItem}
                            aria-label="Next edit"
                            title="Next edit"
                          >
                            <FaChevronRight />
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="dialog-placeholder-stage">
                    <div className="dialog-stage-backdrop" />
                    <div className="dialog-stage-inner">
                      <div className="stage-icon-circle">
                        <FaFilm />
                      </div>
                      <h3>Reel in Production</h3>
                      <p>
                        This video project showcase slot is reserved. The cut, sound design, and color grade are being prepped for upload.
                      </p>
                      <div className="dialog-stage-guide">
                        <span>💡 <strong>Quick Note:</strong> Provide your video file in <code>public/videos/</code> and update <code>src/data/videoProjects.ts</code></span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Folder Playlist Tray */}
              {selected.isFolder && selected.folderItems && (
                <div className="folder-playlist-tray">
                  <div className="folder-playlist-header">
                    <div className="folder-playlist-title-wrap">
                      <FaFolderOpen className="folder-open-icon" />
                      <div>
                        <strong>{selected.title}</strong>
                        <span className="folder-playlist-sub">
                          Folder Playlist ({selected.folderItems.length} Videos) — click to play
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="folder-playlist-grid" role="tablist" aria-label="Folder video edits">
                    {selected.folderItems.map((item, idx) => (
                      <button
                        key={item.id}
                        type="button"
                        role="tab"
                        aria-selected={activeFolderIndex === idx}
                        className={`folder-item-card${activeFolderIndex === idx ? ' is-active' : ''}`}
                        onClick={() => setActiveFolderIndex(idx)}
                      >
                        <span className="folder-item-num">0{idx + 1}</span>
                        <div className="folder-item-text">
                          <span className="folder-item-title">{item.title}</span>
                          <span className="folder-item-tag">{item.tag}</span>
                        </div>
                        <span className="folder-item-icon">
                          {activeFolderIndex === idx ? <span className="rec-dot" /> : <FaPlay />}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Information & Edit Specs */}
              <div className="video-dialog-info">
                <div className="video-dialog-header">
                  <div>
                    <span className="section-tag">{selected.categoryLabel}</span>
                    <h2 id="video-dialog-title">
                      {activeFolderItem ? `${selected.title}: ${activeFolderItem.title}` : selected.title}
                    </h2>
                    {activeFolderItem ? (
                      <span className="dialog-client-sub">
                        {activeFolderItem.tag} • Playing Edit 0{activeFolderIndex + 1} of 0{selected.folderItems?.length}
                      </span>
                    ) : selected.clientOrSeries ? (
                      <span className="dialog-client-sub">{selected.clientOrSeries}</span>
                    ) : null}
                  </div>
                  <span className="video-dialog-duration">
                    {activeFolderItem ? activeFolderItem.duration : selected.duration}
                  </span>
                </div>

                <p className="video-dialog-desc">
                  {activeFolderItem && (
                    <strong className="folder-active-desc-prefix">{activeFolderItem.description} </strong>
                  )}
                  {selected.description}
                </p>

                {/* Detailed 4-Box Edit Breakdown */}
                <div className="video-spec-grid">
                  <div className="spec-card">
                    <div className="spec-header">
                      <FaSliders className="spec-icon" />
                      <span className="spec-label">Pacing &amp; Editorial</span>
                    </div>
                    <p>{selected.editBreakdown.pacing}</p>
                  </div>

                  <div className="spec-card">
                    <div className="spec-header">
                      <FaFilm className="spec-icon" />
                      <span className="spec-label">Color Science</span>
                    </div>
                    <p>{selected.editBreakdown.colorGrading}</p>
                  </div>

                  <div className="spec-card">
                    <div className="spec-header">
                      <FaWaveSquare className="spec-icon" />
                      <span className="spec-label">Audio &amp; Foley</span>
                    </div>
                    <p>{selected.editBreakdown.soundDesign}</p>
                  </div>

                  <div className="spec-card">
                    <div className="spec-header">
                      <span className="spec-badge">FORMAT</span>
                      <span className="spec-label">Master Resolution</span>
                    </div>
                    <p>{selected.editBreakdown.resolution}</p>
                  </div>
                </div>

                {/* Highlights & Metadata */}
                <div className="video-dialog-meta-grid">
                  <div>
                    <span className="meta-label">Role</span>
                    <strong>{selected.role}</strong>
                  </div>
                  <div>
                    <span className="meta-label">Key Highlight</span>
                    <strong>{selected.highlight}</strong>
                  </div>
                  <div>
                    <span className="meta-label">Software &amp; Tools</span>
                    <div className="video-tools-list">
                      {selected.tools.map((t) => (
                        <span key={t} className="video-tool-pill">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Modal Footer Actions */}
                <div className="dialog-actions">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setSelected(null)}
                  >
                    Done Viewing
                  </button>
                  {selected.driveUrl && (
                    <a
                      className="btn btn-ghost drive-link-btn"
                      href={selected.driveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaGoogleDrive /> Open Drive Folder ↗
                    </a>
                  )}
                  <a
                    className="btn btn-ghost"
                    href={`mailto:info.sarthakshakya@gmail.com?subject=${encodeURIComponent(
                      `Video Project Inquiry: ${selected.title}`
                    )}`}
                  >
                    Discuss Video Editing ↗
                  </a>
                </div>
              </div>
            </div>
          )}
        </dialog>,
        document.body
      )}
    </section>
  );
}
