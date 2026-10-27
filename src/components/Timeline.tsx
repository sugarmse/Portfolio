import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollToTimeline } from '../scroll';
import './Timeline.css';

export type TimelineType = 'all' | 'experience' | 'education';

export interface TimelineEntry {
  id: string;
  type: 'experience' | 'education';
  title: string;
  org: string;
  period: string;
  desc: string;
  highlight?: string;
  icon: 'work' | 'education';
}

const TIMELINE_ITEMS: TimelineEntry[] = [
  {
    id: 'exp-current',
    type: 'experience',
    title: 'Software Developer & Video Editor',
    org: 'Current Work',
    period: 'Present',
    desc: 'Building websites, software applications, and dynamic video edits for Gigways, GoPanora, and Bobalicious, alongside a POS system for Rudraman and Sashil Shakya.',
    highlight: 'Full-stack development, mobile UI optimization, and high-energy video production',
    icon: 'work',
  },
  {
    id: 'exp-kathmandu-codes',
    type: 'experience',
    title: 'Software Developer',
    org: 'Kathmandu Codes',
    period: 'Feb 2025 – Jan 2026',
    desc: 'Developed and maintained software applications, collaborating with cross-functional teams to deliver high-quality solutions.',
    highlight: 'Agile sprints, architecture refinement, scalable feature shipping',
    icon: 'work',
  },
  {
    id: 'exp-techmind',
    type: 'experience',
    title: 'Web Developer',
    org: 'Techmind Solutions',
    period: 'Aug 2024 – Jan 2025',
    desc: 'Building dynamic, responsive web applications using React and TypeScript. Developing scalable front-end solutions that make a lasting impact.',
    highlight: 'Modern React & TypeScript component ecosystems with crisp UX',
    icon: 'work',
  },
  {
    id: 'exp-awaketech',
    type: 'experience',
    title: 'UI / UX Developer',
    org: 'AwakeTech Solutions',
    period: 'Mar 2024 – Jul 2024',
    desc: 'Designed and implemented intuitive user interfaces, focusing on seamless user experience and modern design principles.',
    highlight: 'Wireframing, rapid prototyping, and polished micro-interactions',
    icon: 'work',
  },
  {
    id: 'edu-bsc-csit',
    type: 'education',
    title: 'BSc. CSIT',
    org: 'NCIT (Nepal College of Information Technology)',
    period: '2019 – 2024',
    desc: 'Bachelor of Science in Computer Science & Information Technology. Deep study in software engineering, algorithms, networks, and system design.',
    highlight: 'Graduate degree with strong theoretical and applied CS grounding',
    icon: 'education',
  },
  {
    id: 'edu-kcm',
    type: 'education',
    title: '+2 Science',
    org: 'KMC (Kathmandu Model College)',
    period: '2017 – 2019',
    desc: 'Higher secondary education in science stream, building a strong analytical foundation in mathematics, physics, and computer science.',
    highlight: 'Mathematical rigor & scientific foundations',
    icon: 'education',
  },
  {
    id: 'edu-see',
    type: 'education',
    title: 'SEE',
    org: 'IMS',
    period: 'Completed 2017',
    desc: 'Secondary Education Examination — foundational academic achievement with distinction.',
    highlight: 'Foundational honors & graduation',
    icon: 'education',
  },
];

export default function Timeline() {
  const [activeTab, setActiveTab] = useState<TimelineType>('all');
  const [activeItemIndex, setActiveItemIndex] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const touchStartPos = useRef<{ x: number; y: number; time: number } | null>(null);

  const filteredItems = activeTab === 'all'
    ? TIMELINE_ITEMS
    : TIMELINE_ITEMS.filter(item => item.type === activeTab);

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

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40 && deltaTime < 600) {
      if (deltaX < 0 && activeItemIndex < filteredItems.length - 1) {
        handleTimelineJump(activeItemIndex + 1);
      } else if (deltaX > 0 && activeItemIndex > 0) {
        handleTimelineJump(activeItemIndex - 1);
      }
    }
  };

  const handleTimelineJump = (index: number) => {
    setActiveItemIndex(index);
    scrollToTimeline(index);
  };

  useEffect(() => {
    setActiveItemIndex(0);
    const trigger = ScrollTrigger.getById('timeline-travel');
    if (trigger) {
      if (gridRef.current) gsap.set(gridRef.current, { x: 0 });
      ScrollTrigger.refresh();
    }
  }, [filteredItems, activeTab]);

  return (
    <section ref={sectionRef} className="timeline-section" id="experience" aria-labelledby="experience-title">
      <div className="tl-pin-stage">
        <div className="tl-stage-inner">
          {/* Header Bar with Filter Tabs */}
          <div className="tl-heading-bar">
            <div className="tl-heading-left">
              <span className="section-tag">04 / Journey</span>
              <h2 className="section-title" id="experience-title">
                Experience &amp; Education<span className="accent-text">.</span>
              </h2>
            </div>

            <div className="tl-filter-tabs" role="tablist" aria-label="Filter timeline milestones">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'all'}
                className={`tl-tab-btn${activeTab === 'all' ? ' active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                All Milestones ({TIMELINE_ITEMS.length})
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'experience'}
                className={`tl-tab-btn${activeTab === 'experience' ? ' active' : ''}`}
                onClick={() => setActiveTab('experience')}
              >
                💼 Experience (4)
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'education'}
                className={`tl-tab-btn${activeTab === 'education' ? ' active' : ''}`}
                onClick={() => setActiveTab('education')}
              >
                🎓 Education (3)
              </button>
            </div>
          </div>

          {/* Fullscreen Horizontal Timeline Viewport */}
          <div
            ref={viewportRef}
            className="tl-viewport"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Horizontal Timeline Track Line */}
            <div className="tl-axis-line" aria-hidden="true" />

            <div ref={gridRef} className="tl-grid">
              {filteredItems.map((item, index) => (
                <article
                  key={item.id}
                  className={`tl-item fade-up${activeItemIndex === index ? ' is-active' : ''}`}
                  id={`timeline-${item.id}`}
                >
                  <div className="tl-marker" aria-hidden="true">
                    <span className="tl-node-dot" />
                    <span className="tl-node-pulse" />
                  </div>

                  <div className="tl-card">
                    <div className="tl-card-header">
                      <span className="tl-category-pill">
                        {item.type === 'experience' ? '💼 Work Experience' : '🎓 Academic Degree'}
                      </span>
                      <span className="tl-period-badge">{item.period}</span>
                    </div>

                    <h3 className="tl-title">{item.title}</h3>
                    <p className="tl-sub">{item.org}</p>

                    <p className="tl-desc">{item.desc}</p>

                    {item.highlight && (
                      <div className="tl-highlight-chip">
                        <span className="chip-spark" aria-hidden="true">✦</span>
                        <span>{item.highlight}</span>
                      </div>
                    )}

                    <div className="tl-card-watermark" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Mobile Dot Indicators & Swipe Hint */}
          <div className="mobile-tl-indicators" aria-label="Timeline navigation">
            <div className="tl-dot-group">
              {filteredItems.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className={`tl-dot-indicator${activeItemIndex === index ? ' is-active' : ''}`}
                  onClick={() => handleTimelineJump(index)}
                  aria-label={`Go to ${item.title}`}
                >
                  <span className="dot-fill" />
                </button>
              ))}
            </div>
            <div className="mobile-tl-swipe-hint" aria-hidden="true">
              <span>Swipe to explore timeline</span>
              <span className="swipe-arrow">→</span>
            </div>
          </div>

          {/* Travel Progress Bar */}
          <div className="tl-travel-progress" aria-hidden="true">
            <span />
          </div>
        </div>
      </div>
    </section>
  );
}
