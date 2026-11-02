import { useEffect, useRef, useState, type MouseEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { chapters, film, mobileOpeningPhoto, roadPhoto, stills, kalinchowkPhotos, covers, reelPoster } from './contentData';
import './journey.css';
import PhotoGallery from './PhotoGallery';
import TikTokVideos from './TikTokVideos';
import { photoSrcSet } from './responsiveImages';
import CoverDesigns from './CoverDesigns';
import { pageMetadata } from './pageMetadata';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
const imageCollections = { photos: stills, kalinchowk: kalinchowkPhotos, covers };

export default function ContentJourney() {
  const root = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const player = useRef<HTMLVideoElement>(null);
  const chapterScroll = useRef<gsap.core.Tween | null>(null);
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

  const navigateChapter = (event: MouseEvent<HTMLDivElement>) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const anchor = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!anchor) return;
    const target = document.getElementById(anchor.hash.slice(1));
    if (!target || !root.current?.contains(target)) return;
    event.preventDefault();
    if (location.hash !== anchor.hash) history.pushState(null, '', anchor.hash);
    if (!target.hasAttribute('tabindex')) target.tabIndex = -1;
    target.focus({ preventScroll: true });
    chapterScroll.current?.kill();
    if (motion) {
      chapterScroll.current = gsap.to(window, {
        scrollTo: { y: target, offsetY: parseFloat(getComputedStyle(target).scrollMarginTop) || 0, autoKill: true },
        duration: 1,
        ease: 'power2.inOut',
      });
    } else target.scrollIntoView({ behavior: 'instant', block: 'start' });
  };

  useEffect(() => {
    const previousTitle = document.title;
    document.title = pageMetadata.title;
    const values: [string, string, string][] = [
      ['name', 'description', pageMetadata.description],
      ['property', 'og:title', pageMetadata.title],
      ['property', 'og:description', pageMetadata.description],
      ['property', 'og:image', pageMetadata.image],
      ['property', 'og:url', 'https://shakyasarthak.com.np/content'],
      ['name', 'twitter:title', pageMetadata.title],
      ['name', 'twitter:description', pageMetadata.description],
      ['name', 'twitter:image', pageMetadata.image],
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
    const previousMotion = document.documentElement.dataset.motion;
    // The page's explicit Motion switch also controls shared portfolio styles.
    document.documentElement.dataset.motion = motion ? 'full' : 'reduced';
    if (!motion) document.documentElement.style.scrollBehavior = 'auto';
    return () => {
      chapterScroll.current?.kill();
      document.documentElement.style.scrollBehavior = previous;
      if (previousMotion === undefined) delete document.documentElement.dataset.motion;
      else document.documentElement.dataset.motion = previousMotion;
    };
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
    const body = document.body;
    const html = document.documentElement;
    chapterScroll.current?.kill();
    const position = { left: window.scrollX, top: window.scrollY };
    const bodyProperties = ['overflow', 'position', 'top', 'left', 'width'] as const;
    const previousBody = bodyProperties.map(property => [property, body.style[property]] as const);
    const previousOverflow = html.style.overflow;
    const previousOverscroll = html.style.overscrollBehavior;
    // Lock the root scroller too; body overflow alone still lets the page move.
    html.style.overflow = 'hidden';
    html.style.overscrollBehavior = 'none';
    Object.assign(body.style, {
      overflow: 'hidden', position: 'fixed',
      top: `${-position.top}px`, left: `${-position.left}px`, width: '100%',
    });
    element?.showModal();
    return () => {
      video?.pause();
      element?.close();
      previousBody.forEach(([property, value]) => { body.style[property] = value; });
      html.style.overflow = previousOverflow;
      html.style.overscrollBehavior = previousOverscroll;
      window.scrollTo({ ...position, behavior: 'instant' });
      ScrollTrigger.update();
    };
  }, [isViewerOpen]);

  useEffect(() => {
    const pause = () => { if (document.hidden) player.current?.pause(); };
    document.addEventListener('visibilitychange', pause);
    return () => document.removeEventListener('visibilitychange', pause);
  }, []);

  return <div className="journey" ref={root} data-motion={motion} onClick={navigateChapter}>
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
        <div className="j-opening-frame"><img src={mobileOpeningPhoto.src} srcSet={photoSrcSet(mobileOpeningPhoto)} sizes="(max-width: 650px) 800px, 100vw" alt={mobileOpeningPhoto.alt} fetchPriority="high" width={mobileOpeningPhoto.width} height={mobileOpeningPhoto.height} /></div>
        <div className="j-departure-copy"><p className="j-eyebrow">A JOURNEY THROUGH NEPAL</p><h1>The long<br />way <em>home.</em></h1>
          <p className="j-opening-statement">Exploring Nepal,<br />with a camera along for the ride.</p>
          <p className="j-byline">By Sarthak Shakya · Lalitpur, Nepal</p>
          <p className="j-application-note">Featuring a recent journey through Sailung and Kalinchowk. Prepared for my Nepal Tourism Board creator application.</p>
          <div className="j-hero-socials" aria-label="Follow my travel content">
            <a className="j-hero-social" href="https://www.tiktok.com/@who.chinii" target="_blank" rel="noopener noreferrer" aria-label="TikTok, opens in a new tab">TikTok <span aria-hidden="true">↗</span></a>
            <a className="j-hero-social j-hero-social-secondary" href="https://www.instagram.com/who.chini/" target="_blank" rel="noopener noreferrer" aria-label="Instagram, opens in a new tab">Instagram <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div className="j-departure-bottom"><a href="#road">EXPLORE THE JOURNEY <span>↓</span></a><span>SAILUNG / KALINCHOWK</span></div>
      </section>
      <section className="j-mobile-context" aria-label="About this showcase">
        <p className="j-eyebrow">FEATURED JOURNEY / SAILUNG & KALINCHOWK</p>
        <p>Travel photography and videos by Sarthak Shakya, Lalitpur.</p>
        <p>Prepared for my Nepal Tourism Board creator application.</p>
      </section>
      <section id="road" data-chapter className="j-road">
        <div className="j-road-visual"><img className="j-road-image" src={roadPhoto.src} srcSet={photoSrcSet(roadPhoto)} sizes="(max-width: 650px) 100vw, 50vw" alt={roadPhoto.alt} loading="lazy" decoding="async" width={roadPhoto.width} height={roadPhoto.height} /></div>
        <div className="j-road-copy"><p className="j-eyebrow">01 / THE ROAD</p><h2>The ride.<br />The camp.<br /><em>The camera.</em></h2><p>Mountain mornings, time around camp, and the small details along the way. My photographs and videos bring together moments from Sailung and Kalinchowk.</p><a href="#stories" className="j-text-link">Explore the videos <span>↗</span></a></div>
        <span className="j-margin-note">SAILUNG / ON THE RIDGELINE</span>
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
        <CoverDesigns motion={motion} onOpen={index => setView({ collection: 'covers', index })} />
      </section>
      <section id="person" data-chapter className="j-person">
        <div className="j-person-photo"><img src="/content/portrait/pfp-640.webp" srcSet="/content/portrait/pfp-640.webp 640w, /content/portrait/pfp-1000.webp 1000w" sizes="(max-width: 650px) 55vw, 35vw" alt="Sarthak Shakya" loading="lazy" decoding="async" width={1000} height={701} /><span>THE PERSON BEHIND THE CAMERA</span></div><div className="j-person-copy"><p className="j-eyebrow">04 / A LITTLE CLOSER</p><h2>I’m <em>Sarthak.</em></h2><p>I enjoy travelling around Nepal by motorcycle, with a camera along for the journey.</p><p>My background is in photography, videography, professional video editing, and digital production. I’m newer to publishing my own travel stories.</p><p>The photographs and videos here are from my recent travels. I want to spend more time documenting lesser-known places and the people who live there.</p><a href="/#videos" className="j-text-link">More of my editing work <span>↗</span></a><details><summary>My production kit <span>+</span></summary><p>Sony A6700 · Sigma 18–50mm f/2.8<br />DJI Osmo 360 · DJI Mic Mini</p><p>My editing tool: DaVinci Resolve.</p></details></div>
      </section>
      <section id="next" data-chapter className="j-next">
        <p className="j-eyebrow">05 / WHAT COMES NEXT</p><h2>Where I want<br />to take<br /><em>the camera next.</em></h2>
        <div className="j-next-notes"><p className="j-next-intro">What I’d like to contribute if selected.</p><article><span>01</span><div><h3>Lesser-known destinations</h3><p>Document the landscapes, local communities, and traditions of places that receive less attention, including how to reach them.</p></div></article><article><span>02</span><div><h3>Visual travel stories</h3><p>Create original short-form videos, reels, and photography that give travellers a closer look at a destination.</p></div></article><article><span>03</span><div><h3>Practical travel content</h3><p>Share routes, expenses, and first-hand travel details to help people plan their own journeys.</p></div></article></div>
        <div className="j-closing"><p>I’m applying to bring my production experience to more stories from Nepal—from the journey there to the people and everyday details that make a place worth knowing.</p><a href="mailto:info.sarthakshakya@gmail.com">Let’s tell the next story. ↗</a><span>Independent showcase prepared for my Nepal Tourism Board application. Proposed projects are future ideas, not commissioned work.</span></div>
      </section>
    </main>
    <footer className="j-footer"><a href="/">Sarthak Shakya ↗</a><a href="mailto:info.sarthakshakya@gmail.com">Email ↗</a><a href="/">Full portfolio ↗</a><a href="#departure">Back to the beginning ↑</a></footer>
    <dialog ref={dialog} className="j-dialog" aria-label={view === 'film' ? 'Sailung and Kalinchowk reel' : imageView?.collection === 'covers' ? 'Video cover artwork viewer' : imageView?.collection === 'kalinchowk' ? 'Kalinchowk photography viewer' : 'Sailung photography viewer'} onKeyDown={event => {
      if (!imageView || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      moveViewer(event.key === 'ArrowRight' ? 1 : -1);
    }} onCancel={event => { event.preventDefault(); setView(null); }} onClick={event => { if (event.target === event.currentTarget) setView(null); }}>
      <button autoFocus className="j-dialog-close" onClick={() => setView(null)} aria-label="Close viewer">CLOSE ×</button>
      {view === 'film' ? <div className="j-player-wrap"><video ref={player} poster={reelPoster.src} controls playsInline preload="metadata"><source src={film.webSrc} type="video/webm" /><source src={film.mp4Src} type="video/mp4" /><source src={film.src} type="video/mp4" /><a href={film.src}>Open the reel</a></video><p>{film.title} / Complete travel reel</p><p>Filmed, edited, and narrated by me.</p><a className="j-original" href={film.src} target="_blank" rel="noopener noreferrer">Open original quality · 82 MB ↗</a></div> : imageView && currentItem ? <figure><img src={currentItem.src} alt={currentItem.alt} /><figcaption>{currentItem.caption} / {currentItem.kind}</figcaption><div className="j-viewer-controls"><button onClick={() => moveViewer(-1)}>← Previous</button><span>{imageView.index + 1} / {viewerItems.length}</span><button onClick={() => moveViewer(1)}>Next →</button></div></figure> : null}
    </dialog>
  </div>;
}
