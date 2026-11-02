export const TRAVEL_VIDEOS = [
  {
    id: 'sailung-vs-kalinchowk',
    title: 'Sailung vs Kalinchowk',
    href: 'https://vt.tiktok.com/ZSp17BmN4/',
    thumbnail: { src: '/content/covers/destinations.webp', alt: 'Sailung vs Kalinchok video thumbnail', width: 670, height: 1200 },
  },
  {
    id: 'minus-one-camping',
    title: '−1° Camping',
    href: 'https://vt.tiktok.com/ZSp17HKsX/',
    thumbnail: { src: '/content/covers/camping.webp', alt: '−1° Camping video thumbnail', width: 670, height: 1200 },
  },
  {
    id: 'trip-cost-breakdown',
    title: 'Trip Cost Breakdown',
    href: 'https://vt.tiktok.com/ZSp17U7Df/',
    thumbnail: { src: '/content/covers/trip-cost.webp', alt: 'Sailung x Kalinchok trip cost breakdown video thumbnail', width: 675, height: 1200 },
  },
];

export type TravelVideo = typeof TRAVEL_VIDEOS[number];
