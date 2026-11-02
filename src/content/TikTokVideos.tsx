import { useId } from 'react';
import { tiktokReels } from './contentData';
import useHorizontalRail from './useHorizontalRail';

export default function TikTokVideos({ motion }: { motion: boolean }) {
  const id = useId();
  const { track, position, move } = useHorizontalRail(tiktokReels.length, motion);
  return <div role="region" aria-label="TikTok videos">
    <div className="j-gallery-controls j-video-controls">
      <span aria-live="polite">{position.index + 1} / {tiktokReels.length} <span className="j-swipe-hint">Swipe or scroll sideways</span></span>
      <div><button aria-label="Previous TikTok video" aria-controls={id} disabled={position.atStart} onClick={() => move(-1)}>←</button><button aria-label="Next TikTok video" aria-controls={id} disabled={position.atEnd} onClick={() => move(1)}>→</button></div>
    </div>
    <div ref={track} id={id} className="j-tiktok-reels" tabIndex={0} aria-label="TikTok video cards" onKeyDown={event => {
      if (!window.matchMedia('(max-width: 650px)').matches || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      move(event.key === 'ArrowRight' ? 1 : -1);
    }}>
      {tiktokReels.map((reel, index) => <a className="j-tiktok-reel" key={reel.href} href={reel.href} target="_blank" rel="noopener noreferrer" aria-label={`${reel.title}: watch on TikTok, opens in a new tab`}><div className="j-tiktok-thumbnail"><img src={reel.cover.src} alt={reel.cover.alt} width={reel.cover.width} height={reel.cover.height} loading="lazy" /></div><div className="j-tiktok-caption"><span className="j-eyebrow">0{index + 1} / TIKTOK</span><h3>{reel.title}</h3><span className="j-tiktok-action">Watch on TikTok <span aria-hidden="true">↗</span></span></div></a>)}
    </div>
  </div>;
}
