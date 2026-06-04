import { useInView } from '../hooks/useInView';
import './Projects.css';

export default function Projects() {
  const [ref, inView] = useInView<HTMLElement>();

  return (
    <section className="projects-section" id="projects" ref={ref}>
      <div className="container">
        <span className="section-tag">Portfolio</span>
        <h2 className="section-title">Featured Projects</h2>
        <div className="section-divider" />
        <p className="proj-subtitle">
          A selection of work spanning web development, immersive experiences, and real estate technology.
        </p>

        <div className={`proj-featured${inView ? ' in-view' : ''}`}>
          <div className="proj-feat-card fade-up">

            {/* Thumbnail */}
            <div className="proj-feat-thumb">
              <div className="proj-feat-bg">
                <svg className="proj-feat-sphere" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Globe rings */}
                  <ellipse cx="200" cy="150" rx="130" ry="130" stroke="rgba(99,179,237,0.25)" strokeWidth="1"/>
                  <ellipse cx="200" cy="150" rx="130" ry="55"  stroke="rgba(99,179,237,0.2)"  strokeWidth="1"/>
                  <ellipse cx="200" cy="150" rx="130" ry="22"  stroke="rgba(99,179,237,0.15)" strokeWidth="1"/>
                  <ellipse cx="200" cy="150" rx="55"  ry="130" stroke="rgba(99,179,237,0.2)"  strokeWidth="1"/>
                  <ellipse cx="200" cy="150" rx="22"  ry="130" stroke="rgba(99,179,237,0.15)" strokeWidth="1"/>
                  {/* Horizontal cross lines */}
                  <line x1="70" y1="150" x2="330" y2="150" stroke="rgba(99,179,237,0.2)" strokeWidth="1"/>
                  <line x1="200" y1="20"  x2="200" y2="280" stroke="rgba(99,179,237,0.2)" strokeWidth="1"/>
                  {/* 360 label */}
                  <text x="200" y="158" textAnchor="middle" dominantBaseline="middle"
                        fontSize="38" fontWeight="800" fontFamily="Arial, sans-serif"
                        fill="rgba(147,210,255,0.9)" letterSpacing="-2">360°</text>
                </svg>
              </div>
              <div className="proj-feat-thumb-overlay" />
            </div>

            {/* Content */}
            <div className="proj-feat-body">
              <span className="proj-category">Virtual Tours &amp; Real Estate</span>
              <h3 className="proj-feat-title">360 Virtual Tour Nepal</h3>
              <p className="proj-feat-desc">
                An immersive platform for exploring properties and locations across Nepal through
                professional 360-degree virtual tours. Built for real estate agents, property buyers,
                and tourism — letting anyone visit a space from anywhere in the world.
              </p>
              <div className="proj-tags proj-tags-visible">
                {['360° Photography', 'Virtual Tours', 'Real Estate', 'React', 'Vercel'].map(t => (
                  <span key={t} className="proj-tag">{t}</span>
                ))}
              </div>
              <a
                href="https://360virtualtournepal.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary proj-feat-btn"
              >
                Visit Site
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
            </div>

          </div>

          <div className="proj-feat-card proj-feat-card-alt fade-up">

            {/* Thumbnail */}
            <div className="proj-feat-thumb gopanora-thumb">
              <div className="proj-feat-bg">
                <svg className="proj-feat-sphere" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="gopanoraSky" x1="70" y1="74" x2="328" y2="210" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#7dd3fc" />
                      <stop offset="0.42" stopColor="#38bdf8" />
                      <stop offset="1" stopColor="#f97316" />
                    </linearGradient>
                    <linearGradient id="gopanoraRoom" x1="76" y1="108" x2="326" y2="220" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#12324a" />
                      <stop offset="0.52" stopColor="#152033" />
                      <stop offset="1" stopColor="#3f1d16" />
                    </linearGradient>
                    <filter id="gopanoraGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="6" result="blur" />
                      <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0.98 0 1 0 0 0.45 0 0 1 0 0.1 0 0 0 0.65 0" />
                      <feBlend in="SourceGraphic" mode="screen" />
                    </filter>
                  </defs>

                  <rect x="36" y="38" width="332" height="224" rx="24" fill="#080b14" stroke="rgba(249,115,22,0.4)" />
                  <rect x="54" y="58" width="292" height="184" rx="18" fill="rgba(255,255,255,0.045)" stroke="rgba(255,255,255,0.1)" />
                  <rect x="54" y="58" width="292" height="32" rx="18" fill="rgba(255,255,255,0.06)" />
                  <circle cx="76" cy="74" r="4" fill="#f97316" />
                  <circle cx="92" cy="74" r="4" fill="rgba(255,255,255,0.35)" />
                  <circle cx="108" cy="74" r="4" fill="rgba(255,255,255,0.22)" />
                  <text x="320" y="79" textAnchor="end" fontSize="12" fontWeight="800" fontFamily="Arial, sans-serif" fill="rgba(255,255,255,0.8)">GoPanora</text>

                  <rect x="70" y="106" width="178" height="106" rx="16" fill="url(#gopanoraRoom)" />
                  <path d="M70 132C98 110 131 118 159 135C189 153 214 146 248 120V106H70V132Z" fill="url(#gopanoraSky)" opacity="0.92" />
                  <path d="M70 178C111 152 146 158 183 176C205 187 226 190 248 178V212H70V178Z" fill="#0b1220" opacity="0.85" />
                  <path d="M86 196L132 154L176 196M152 196L198 138L238 196" stroke="rgba(255,255,255,0.26)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="132" cy="151" r="8" fill="#f97316" filter="url(#gopanoraGlow)" />
                  <circle cx="207" cy="143" r="8" fill="#38bdf8" />
                  <circle cx="207" cy="143" r="15" stroke="rgba(56,189,248,0.45)" />

                  <rect x="262" y="106" width="68" height="46" rx="12" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.12)" />
                  <path d="M278 139V120H313V139M278 129H313M291 120V139" stroke="rgba(255,255,255,0.55)" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="312" cy="121" r="5" fill="#f97316" />

                  <rect x="262" y="164" width="68" height="48" rx="12" fill="rgba(249,115,22,0.16)" stroke="rgba(249,115,22,0.35)" />
                  <path d="M283 183L296 170L309 183M296 170V205" stroke="rgba(255,255,255,0.8)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <text x="296" y="229" textAnchor="middle" fontSize="12" fontWeight="700" fontFamily="Arial, sans-serif" fill="rgba(255,255,255,0.65)">Share tour</text>
                </svg>
              </div>
              <div className="proj-feat-thumb-overlay" />
            </div>

            {/* Content */}
            <div className="proj-feat-body">
              <span className="proj-category">SaaS &amp; Virtual Tour Builder</span>
              <h3 className="proj-feat-title">GoPanora</h3>
              <p className="proj-feat-desc">
                GoPanora is a 360° virtual tour builder for real estate, hotels, rentals, and
                property photographers. It helps users turn panorama images into interactive
                virtual tours with hotspots, floor plans, share links, embeds, QR codes, and
                custom branding.
              </p>
              <div className="proj-tags proj-tags-visible">
                {['GoPanora', '360° Tours', 'Real Estate SaaS', 'React', 'Supabase'].map(t => (
                  <span key={t} className="proj-tag">{t}</span>
                ))}
              </div>
              <a
                href="https://www.gopanora.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary proj-feat-btn"
              >
                GoPanora virtual tour builder
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
