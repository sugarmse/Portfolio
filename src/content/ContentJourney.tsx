import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { chapters, film, mobileOpeningPhoto, roadPhoto, stills, kalinchowkPhotos, covers, reelPoster } from './contentData';
import './journey.css';
import PhotoGallery from './PhotoGallery';
import TikTokVideos from './TikTokVideos';

gsap.registerPlugin(ScrollTrigger);
const imageCollections = { photos: stills, kalinchowk: kalinchowkPhotos, covers };

export default function ContentJourney() {
  const root = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const player = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(0);
  const [view, setView] = useState<'film' | { collection: keyof typeof imageCollections; index: number } | null>(null);
  const isViewerOpen = view !== null;
  const imageView = view !== null && view !== 'film' ? view : null;
  const viewerItems = imageCollections[imageView?.collection ?? 'photos'];
  const currentItem = imageView ? viewerItems[imageView.index] : null;
  const moveViewer = (step: number) => setView(current => {
    if (current === null || current === 'film') return current;
    const count = imageCollections[current.collection].length;
    return { ...current, index: (current.index + step + count) % count };
  });
  const [motion, setMotion] = useState(true);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'The Long Way Home — Sarthak Shakya';
    const values: [string, string, string][] = [
      ['name', 'description', 'A motorcycle, a camera, and the long way through Nepal. An interactive travel story by Sarthak Shakya.'],
      ['property', 'og:title', 'The Long Way Home — Sarthak Shakya'],
      ['property', 'og:description', 'A visual journey through Nepal. Watch the reel and discover the frames behind the story.'],
      ['property', 'og:image', 'https://shakyasarthak.com.np/content/photos/dsc02413.webp'],
      ['property', 'og:url', 'https://shakyasarthak.com.np/content'],
      ['name', 'twitter:title', 'The Long Way Home — Sarthak Shakya'],
      ['name', 'twitter:description', 'A visual journey through Nepal by Sarthak Shakya.'],
      ['name', 'twitter:image', 'https://shakyasarthak.com.np/content/photos/dsc02413.webp'],
      ['name', 'theme-color', '#10120f'],
    ];
    const restore = values.map(([attribute, key, value]) => {
      const existing = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
      const meta = existing || document.createElement('meta');
      const old = meta.content;
      meta.setAttribute(attribute, key); meta.content = value;
      if (!existing) document.head.append(meta);
      return () => { if (existing) meta.content = old; else meta.remove(); };
    });
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        setActive(chapters.findIndex(([id]) => id === entry.target.id));
      }
    }, { rootMargin: '-20% 0px -55% 0px' });
    root.current?.querySelectorAll<HTMLElement>('[data-chapter]').forEach(section => observer.observe(section));
    return () => { document.title = previousTitle; restore.forEach(fn => fn()); observer.disconnect(); };
  }, []);

  useEffect(() => {
    const previous = document.documentElement.style.scrollBehavior;
    if (!motion) document.documentElement.style.scrollBehavior = 'auto';
    return () => { document.documentElement.style.scrollBehavior = previous; };
  }, [motion]);

  useEffect(() => {
    if (!motion) return;
    const context = gsap.context(() => {
      const media = gsap.matchMedia();
      media.add('(min-width: 651px)', () => {
        gsap.fromTo('.j-opening-frame', { scale: 1.025 }, {
          scale: 1, ease: 'none',
          scrollTrigger: { trigger: '#departure', start: 'top top', end: 'bottom top', scrub: .7 },
        });
      });
      gsap.to('.j-road-image', { yPercent: 12, scale: 1.08, ease: 'none', scrollTrigger: { trigger: '#road', start: 'top bottom', end: 'bottom top', scrub: .7 } });
      media.add('(min-width: 651px)', () => {
        gsap.fromTo('.j-still:nth-child(even)', { y: 70 }, { y: -30, ease: 'none', scrollTrigger: { trigger: '.j-contact-sheet', start: 'top bottom', end: 'bottom top', scrub: .7 } });
      });
    }, root);
    return () => context.revert();
  }, [motion]);

  useEffect(() => {
    if (!isViewerOpen) return;
    const element = dialog.current;
    const video = player.current;
    const previousOverflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = 'hidden';
    return () => { video?.pause(); element?.close(); document.body.style.overflow = previousOverflow; };
  }, [isViewerOpen]);

  useEffect(() => {
    const pause = () => { if (document.hidden) player.current?.pause(); };
    document.addEventListener('visibilitychange', pause);
    return () => document.removeEventListener('visibilitychange', pause);
  }, []);

  return <div className="journey" ref={root} data-motion={motion}>
    <a className="j-skip" href="#stories">Skip to the content</a>
    <header className="j-header">
      <a className="j-wordmark" href="/" aria-label="Sarthak Shakya, full portfolio">Sarthak Shakya<span>Travel creator application</span></a>
      <span className="j-header-note">INDEPENDENT SHOWCASE / NEPAL TOURISM BOARD</span>
      <button className="j-motion" onClick={() => setMotion(value => !value)} aria-pressed={!motion}>Motion {motion ? 'on' : 'off'}</button>
    </header>
    <nav className="j-navigation" aria-label="Journey chapters">
      {chapters.map(([id, label], index) => <a key={id} href={`#${id}`} aria-current={active === index ? 'location' : undefined}><span className="j-nav-number">0{index}</span><span className="j-nav-label">{label}</span></a>)}
    </nav>
    <main>
      <section id="departure" data-chapter className="j-departure">
        <div className="j-opening-frame"><picture><source media="(max-width: 650px)" srcSet={mobileOpeningPhoto.src} width={mobileOpeningPhoto.width} height={mobileOpeningPhoto.height} /><img src={mobileOpeningPhoto.src} alt={mobileOpeningPhoto.alt} fetchPriority="high" width={mobileOpeningPhoto.width} height={mobileOpeningPhoto.height} /></picture></div>
        <div className="j-departure-copy"><p className="j-eyebrow">A JOURNEY THROUGH NEPAL</p><h1>The long<br />way <em>home.</em></h1>
          <p className="j-opening-statement">Exploring Nepal,<br />with a camera along for the ride.</p>
          <p className="j-byline">By Sarthak Shakya · Lalitpur, Nepal</p>
          <p className="j-application-note">Featuring a recent journey through Sailung and Kalinchowk. Prepared for my Nepal Tourism Board creator application.</p>
          <button className="j-hero-watch" onClick={() => setView('film')}>Watch the reel · {film.durationLabel} <span>↗</span></button>
        </div>
        <div className="j-departure-bottom"><a href="#road">EXPLORE THE JOURNEY <span>↓</span></a><span>SAILUNG / KALINCHOWK</span></div>
      </section>
      <section className="j-mobile-context" aria-label="About this showcase">
        <p className="j-eyebrow">FEATURED JOURNEY / SAILUNG & KALINCHOWK</p>
        <p>Travel photographs and a reel by Sarthak Shakya, Lalitpur.</p>
        <p>Prepared for my Nepal Tourism Board creator application.</p>
      </section>
      <section id="road" data-chapter className="j-road">
        <div className="j-road-visual"><img className="j-road-image" src={roadPhoto.src} alt={roadPhoto.alt} loading="lazy" width={roadPhoto.width} height={roadPhoto.height} /></div>
        <div className="j-road-copy"><p className="j-eyebrow">01 / THE ROAD</p><h2>The ride.<br />The camp.<br /><em>The camera.</em></h2><p>For this reel, I followed the mountain views, the routines around camp, and the small fixes that keep a trip going.</p><a href="#stories" className="j-text-link">Watch Sailung & Kalinchowk <span>↗</span></a></div>
        <span className="j-margin-note">FROM MY SAILUNG & KALINCHOWK REEL</span>
      </section>
      <section id="places" data-chapter className="j-places">
        <div className="j-places-intro"><p className="j-eyebrow">02 / THE FRAMES</p><h2>Out along<br /><em>the ridgeline.</em></h2><p>Selected photographs from Sailung and Kalinchowk.<br />Open a frame to see it in full.</p></div>
        <div className="j-pending-gallery-heading j-sailung-heading"><h3>Sailung</h3><p>Morning light, prayer flags, and the ridgeline.</p></div>
        <PhotoGallery title="Sailung" photos={stills} className="j-sailung-gallery" motion={motion} onOpen={index => setView({ collection: 'photos', index })} />
        <p className="j-source-note">Original photographs from Sailung. Open an image to see the full composition.</p>
        <section className="j-pending-gallery" aria-labelledby="j-kalinchowk-title">
          <div className="j-pending-gallery-heading"><h3 id="j-kalinchowk-title">Kalinchowk</h3><p>The campsite, the ridges, and the view from above.</p></div>
          <PhotoGallery title="Kalinchowk" photos={kalinchowkPhotos} className="j-kalinchowk-gallery" motion={motion} onOpen={index => setView({ collection: 'kalinchowk', index })} />
          <p className="j-source-note">Original photographs from Kalinchowk. Open an image to see the full composition.</p>
        </section>
        <section className="j-in-works" aria-labelledby="j-in-works-title">
          <div className="j-in-works-heading"><p className="j-eyebrow">MORE FROM MY TRAVELS</p><h3 id="j-in-works-title">In the works.</h3><p>Photographs from Nagarkot, still on the editing desk.</p></div>
          <div className="j-destinations">
            <article><span className="j-destination-number">01</span><div><h4>Nagarkot</h4><p>A separate photo collection from my travels, to share once the edit is ready.</p><span className="j-edit-status">Editing in progress</span></div></article>
          </div>
        </section>
      </section>
      <section id="stories" data-chapter className="j-stories">
        <div className="j-story-heading"><p className="j-eyebrow">03 / FEATURED CONTENT</p><h2>Travel stories,<br /><em>in motion.</em></h2><p>A selection of my videos on TikTok.</p></div>
        <TikTokVideos motion={motion} />
        <div className="j-reel-alternative"><span>Watch without leaving this page</span><button className="j-text-link" onClick={() => setView('film')}>My camping reel · {film.durationLabel} <span>↗</span></button></div>
        <details className="j-cover-collection" onToggle={() => ScrollTrigger.refresh()}>
          <summary>Reel cover designs <span>4 covers</span></summary>
          <p>Cover designs for my travel content. Select a cover to view it.</p>
          <div className="j-cover-grid">{covers.map((cover, index) => <figure key={cover.src}><button onClick={() => setView({ collection: 'covers', index })} aria-label={`View reel cover: ${cover.caption}`}><img src={cover.src} alt={cover.alt} loading="lazy" width={cover.width} height={cover.height} /></button><figcaption>{cover.caption}<span>Reel cover artwork</span></figcaption></figure>)}</div>
        </details>
      </section>
      <section id="person" data-chapter className="j-person">
        <div className="j-person-photo"><img src="/pfp.jpeg" alt="Sarthak Shakya" loading="lazy" /><span>THE PERSON BEHIND THE CAMERA</span></div><div className="j-person-copy"><p className="j-eyebrow">04 / A LITTLE CLOSER</p><h2>I’m <em>Sarthak.</em></h2><p>I enjoy travelling around Nepal by motorcycle, with a camera along for the journey.</p><p>My background is in photography, videography, professional video editing, and digital production. I’m newer to publishing my own travel stories.</p><p>The reel featured here is one example of the travel stories I’ve recently started sharing. I want to spend more time documenting lesser-known places and the people who live there.</p><a href="/#videos" className="j-text-link">More of my editing work <span>↗</span></a><details><summary>My production kit <span>+</span></summary><p>Sony A6700 · Sigma 18–50mm f/2.8<br />DJI Osmo 360 · DJI Mic Mini</p><p>My editing tool: DaVinci Resolve.</p></details></div>
      </section>
      <section id="next" data-chapter className="j-next">
        <p className="j-eyebrow">05 / WHAT COMES NEXT</p><h2>Where I want<br />to take<br /><em>the camera next.</em></h2>
        <div className="j-next-notes"><p className="j-next-intro">What I’d like to contribute if selected.</p><article><span>01</span><div><h3>Lesser-known destinations</h3><p>Document the landscapes, local communities, and traditions of places that receive less attention, including how to reach them.</p></div></article><article><span>02</span><div><h3>Visual travel stories</h3><p>Create original short-form videos, reels, and photography that give travellers a closer look at a destination.</p></div></article><article><span>03</span><div><h3>Practical travel content</h3><p>Share routes, expenses, and first-hand travel details to help people plan their own journeys.</p></div></article></div>
        <div className="j-closing"><p>I’m applying to bring my production experience to more stories from Nepal—from the journey there to the people and everyday details that make a place worth knowing.</p><a href="mailto:info.sarthakshakya@gmail.com">Let’s tell the next story. ↗</a><span>Independent showcase prepared for my Nepal Tourism Board application. Proposed projects are future ideas, not commissioned work.</span></div>
      </section>
    </main>
    <footer className="j-footer"><a href="/">Sarthak Shakya ↗</a><a href="mailto:info.sarthakshakya@gmail.com">Email ↗</a><a href="/">Full portfolio ↗</a><a href="#departure">Back to the beginning ↑</a></footer>
    <dialog ref={dialog} className="j-dialog" aria-label={view === 'film' ? 'Sailung and Kalinchowk reel' : imageView?.collection === 'covers' ? 'Reel cover artwork viewer' : imageView?.collection === 'kalinchowk' ? 'Kalinchowk photography viewer' : 'Sailung photography viewer'} onKeyDown={event => {
      if (!imageView || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      moveViewer(event.key === 'ArrowRight' ? 1 : -1);
    }} onCancel={event => { event.preventDefault(); setView(null); }} onClick={event => { if (event.target === event.currentTarget) setView(null); }}>
      <button autoFocus className="j-dialog-close" onClick={() => setView(null)} aria-label="Close viewer">CLOSE ×</button>
      {view === 'film' ? <div className="j-player-wrap"><video ref={player} poster={reelPoster.src} controls playsInline preload="metadata"><source src={film.webSrc} type="video/webm" /><source src={film.mp4Src} type="video/mp4" /><source src={film.src} type="video/mp4" /><a href={film.src}>Open the reel</a></video><p>{film.title} / Complete travel reel</p><a className="j-original" href={film.src} target="_blank" rel="noopener noreferrer">Open original quality · 82 MB ↗</a></div> : imageView && currentItem ? <figure><img src={currentItem.src} alt={currentItem.alt} /><figcaption>{currentItem.caption} / {currentItem.kind}</figcaption><div className="j-viewer-controls"><button onClick={() => moveViewer(-1)}>← Previous</button><span>{imageView.index + 1} / {viewerItems.length}</span><button onClick={() => moveViewer(1)}>Next →</button></div></figure> : null}
    </dialog>
  </div>;
}
