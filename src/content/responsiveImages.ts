// Full-size originals stay available in the viewer; previews select a smaller copy.
export function photoSrcSet(photo: { src: string; width: number }) {
  const base = photo.src.replace('/photos/', '/photos/responsive/').replace(/\.webp$/, '');
  const widths = photo.src.endsWith('/dsc02408.webp') ? [640, 1200, 1600] : [640, 1200];
  return [
    ...widths.filter(width => width <= photo.width).map(width => `${base}-${width}.webp ${width}w`),
    ...(!widths.includes(photo.width) ? [`${photo.src} ${photo.width}w`] : []),
  ].join(', ');
}
