import { useId } from 'react';
import useHorizontalRail from './useHorizontalRail';
import { photoSrcSet } from './responsiveImages';

type Photo = { src: string; alt: string; caption: string; width: number; height: number };
type Props = { title: string; photos: Photo[]; className: string; motion: boolean; onOpen: (index: number) => void };

export default function PhotoGallery({ title, photos, className, motion, onOpen }: Props) {
  const id = useId();
  const { track, position, move } = useHorizontalRail(photos.length, motion);

  return <div className="j-gallery" role="region" aria-label={`${title} photo gallery`}>
    <div className="j-gallery-controls">
      <span aria-live="polite">{position.index + 1} / {photos.length} <span className="j-swipe-hint">Swipe to explore</span></span>
      <div><button aria-label={`Previous ${title} photo`} aria-controls={id} disabled={position.atStart} onClick={() => move(-1)}>←</button><button aria-label={`Next ${title} photo`} aria-controls={id} disabled={position.atEnd} onClick={() => move(1)}>→</button></div>
    </div>
    <div ref={track} id={id} className={`j-contact-sheet ${className}`} tabIndex={0} aria-label={`${title} photographs`} onKeyDown={event => {
      if (event.target !== event.currentTarget || !window.matchMedia('(max-width: 650px)').matches || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      move(event.key === 'ArrowRight' ? 1 : -1);
    }}>
      {photos.map((photo, index) => <figure className="j-still" key={photo.src}><button onClick={() => onOpen(index)} aria-label={`Enlarge ${title} photograph ${index + 1}: ${photo.caption}`}><img src={photo.src} srcSet={photoSrcSet(photo)} sizes="(max-width: 650px) 80vw, 22vw" alt={photo.alt} loading="lazy" decoding="async" width={photo.width} height={photo.height} /><span className="j-enlarge" aria-hidden="true">↗</span></button><figcaption><span>0{index + 1} / PHOTOGRAPH</span>{photo.caption}</figcaption></figure>)}
    </div>
  </div>;
}
