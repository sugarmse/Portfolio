import { TRAVEL_VIDEOS } from '../data/travelVideos';

export const chapters = [
  ['departure', 'Start'], ['road', 'Road'], ['places', 'Frames'],
  ['stories', 'Content'], ['person', 'About'], ['next', 'Next'],
] as const;

export const film = {
  title: 'Jugaad — Travel Reel',
  durationLabel: '0:48',
  src: '/videos/Sailung-Kalinchok/jugaad-final.mp4',
  webSrc: '/content/jugaad-travel.webm',
  mp4Src: '/content/jugaad-travel.mp4',
  description: 'A narrated camping story from Sailung and Kalinchowk. Mountain mornings, cold nights, and the little fixes that keep a journey going.',
};

// Original photographs supplied from D:/Sailung Kalinchok.
export const openingPhoto = { src: '/content/photos/dsc02413.webp', alt: 'Prayer flags and mountain ridges in warm morning light', width: 2200, height: 1467 };
export const mobileOpeningPhoto = { src: '/content/photos/dsc02408.webp', alt: 'A traveller watching the sunrise above the mountain ridges in Sailung', width: 2200, height: 1467 };
export const roadPhoto = { src: '/content/photos/dsc02427.webp', alt: 'A footpath across a grassy ridge', width: 1200, height: 1800 };
export const stills = [
  { src: '/content/photos/dsc02420.webp', caption: 'Warm light on the hilltop.', alt: 'A white stupa and hilltop buildings in warm sunlight', width: 2200, height: 1467, kind: 'Photograph' },
  { src: '/content/photos/dsc02391.webp', caption: 'Layers beneath an orange sky.', alt: 'Mountain silhouettes beneath a sky fading from orange to blue', width: 2200, height: 1467, kind: 'Photograph' },
  { src: '/content/photos/dsc02417.webp', caption: 'The first light on the flags.', alt: 'Prayer flags and stones lit by the rising sun', width: 2200, height: 1467, kind: 'Photograph' },
  { src: '/content/photos/dsc02440.webp', caption: 'A ridge beneath the peaks.', alt: 'A grassy ridgeline with distant snow-covered mountains', width: 2200, height: 1467, kind: 'Photograph' },
];
// Edited Kalinchowk photographs supplied from E:/Nagrkot/Kalinchok.
export const kalinchowkPhotos = [
  { src: '/content/photos/dsc02474.webp', caption: 'Camp above the ridges.', alt: 'A traveller beside a yellow tent with mountain ridges and snowy peaks behind', width: 2200, height: 1238, kind: 'Photograph' },
  { src: '/content/photos/dsc02480.webp', caption: 'Beyond the trees.', alt: 'Layered mountain ridges and distant snowy peaks framed by trees and a rocky hillside', width: 2200, height: 1467, kind: 'Photograph' },
  { src: '/content/photos/dsc02485.webp', caption: 'Blue ridges, a warm horizon.', alt: 'Blue mountain ridges beneath a sky fading from pink to blue', width: 2200, height: 1467, kind: 'Photograph' },
  { src: '/content/photos/dsc02522.webp', caption: 'Bells above the valley.', alt: 'A traveller on a bell-lined walkway overlooking snow-covered mountains', width: 2200, height: 1467, kind: 'Photograph' },
];
// User-supplied cover designs include AI elements. They are artwork, not photography.
export const covers = [
  { src: '/content/covers/trip-cost.webp', caption: 'Trip Cost Breakdown', alt: 'Sailung and Kalinchowk trip cost breakdown cover design', width: 675, height: 1200, kind: 'Video cover artwork' },
  { src: '/content/covers/camping.webp', caption: '−1° Camping', alt: 'Camping video cover design with a helmeted traveller and tent', width: 670, height: 1200, kind: 'Video cover artwork' },
  { src: '/content/covers/destinations.webp', caption: 'Sailung vs Kalinchowk', alt: 'Split landscape video cover design with a rider and motorcycle', width: 670, height: 1200, kind: 'Video cover artwork' },
  { src: '/content/covers/sailung-peak.webp', caption: 'Sailung Peak', alt: 'Sailung Peak video cover design with a traveller facing the mountains', width: 670, height: 1200, kind: 'Video cover artwork' },
];
export const reelPoster = covers[1];
export const tiktokReels = TRAVEL_VIDEOS.map(video => ({ ...video, cover: video.thumbnail }));
