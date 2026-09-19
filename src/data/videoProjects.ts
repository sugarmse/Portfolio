export interface EditBreakdown {
  pacing: string;
  colorGrading: string;
  soundDesign: string;
  resolution: string;
}

export interface VideoFolderItem {
  id: string;
  title: string;
  videoSrc: string;
  duration: string;
  tag: string;
  description: string;
}

export interface VideoProject {
  id: string;
  title: string;
  clientOrSeries?: string;
  category: 'Commercial' | 'Product Showcase';
  categoryLabel: string;
  duration: string;
  aspectRatio?: '16:9' | '9:16';
  videoSrc?: string;
  poster?: string;
  description: string;
  editBreakdown: EditBreakdown;
  tools: string[];
  role: string;
  highlight: string;
  isPlaceholder: boolean;
  isFolder?: boolean;
  folderItems?: VideoFolderItem[];
  driveUrl?: string;
}

export const VIDEO_CATEGORIES = [
  'All',
  'Commercial',
  'Product Showcase',
] as const;

export type VideoCategoryFilter = typeof VIDEO_CATEGORIES[number];

/**
 * Video Projects Data — Real Projects & Organized Folders
 */
export const VIDEO_PROJECTS: VideoProject[] = [
  {
    id: 'gigways-feature-edits',
    title: 'Gigways — Feature Video Edits',
    clientOrSeries: 'Gigways • 5 Video Edits',
    category: 'Product Showcase',
    categoryLabel: 'Client Edits / Showcase',
    duration: '5 Edits • Feature Suite',
    aspectRatio: '16:9',
    videoSrc: '/videos/Gigways/Gigways-Community3.mp4',
    poster: '',
    description: 'A curated collection of snappy motion cuts crafted for Gigways. Highlights mobile application features with dynamic zooms, tactile UI pacing, callout graphics, and synchronized sound design.',
    editBreakdown: {
      pacing: 'Dynamic feature walkthroughs with beat-timed screen transitions and kinetic zooms',
      colorGrading: 'High-contrast mobile UI palette with clean neutral tones and accent glow',
      soundDesign: 'Tactile interface clicks, dynamic whooshes, and subtle rhythmic ambient backing',
      resolution: '1080p Full HD • 60 FPS Masters',
    },
    tools: ['DaVinci Resolve', 'Adobe Premiere Pro', 'Motion Graphics', 'UI Sound Design'],
    role: 'Video Editing, Motion Graphics & Sound Design',
    highlight: 'Curated 5-part video series showcasing core Gigways features with custom motion pacing.',
    isPlaceholder: false,
    isFolder: true,
    driveUrl: '',
    folderItems: [
      {
        id: 'gigways-community',
        title: 'Community Feature',
        videoSrc: '/videos/Gigways/Gigways-Community3.mp4',
        duration: '0:35',
        tag: 'Social & Network',
        description: 'Highlighting community engagement, driver network collaboration, and live member interactions.',
      },
      {
        id: 'gigways-smart-rest',
        title: 'Smart Rest',
        videoSrc: '/videos/Gigways/Gigways-Smart-Rest1.mp4',
        duration: '0:32',
        tag: 'Safety & Wellness',
        description: 'Demonstrating intelligent rest recommendations, fatigue prevention, and wellness tracking.',
      },
      {
        id: 'gigways-mileage-tracking',
        title: 'Mileage Tracking',
        videoSrc: '/videos/Gigways/Gigways-Mileage-Tracking7.mp4',
        duration: '0:38',
        tag: 'GPS & Analytics',
        description: 'Visualizing automatic distance calculation, trip logs, route mapping, and deduction tracking.',
      },
      {
        id: 'gigways-private-trips',
        title: 'Private Trips',
        videoSrc: '/videos/Gigways/Gigways-Private-Trips.mp4',
        duration: '0:30',
        tag: 'Privacy & Control',
        description: 'Showcasing the private trip toggle, seamless personal/business switching, and discrete ride history.',
      },
      {
        id: 'gigways-driver-density',
        title: 'Driver Density',
        videoSrc: '/videos/Gigways/Gigways-Driver-Density3.mp4',
        duration: '0:30',
        tag: 'Heatmaps & Demand',
        description: 'Displaying real-time high-demand driver zones, heatmaps, and spatial density indicators.',
      },
    ],
  },
  {
    id: 'bobalicious-brand-edits',
    title: 'Bobalicious — Brand & Promo Cuts',
    clientOrSeries: 'Bobalicious • 2 Video Edits',
    category: 'Commercial',
    categoryLabel: 'Commercial / Brand Promo',
    duration: '2 Edits • Promo Suite',
    aspectRatio: '16:9',
    videoSrc: '/videos/Bobalicious/bobalicious-final-3.mp4',
    poster: '',
    description: 'High-energy commercial edits crafted for Bobalicious brand launch and social campaigns. Features beat-synchronized cuts, speed ramping, appetizing product closeups, and punchy sound design.',
    editBreakdown: {
      pacing: 'Dynamic rhythm-matched cuts with seamless velocity speed ramps',
      colorGrading: 'Vibrant, warm, appetizing tones with punchy contrast and color pop',
      soundDesign: 'Cinematic whooshes, beat-matched riser builds, and crisp audio hits',
      resolution: '1080p Full HD • 60 FPS Masters',
    },
    tools: ['Adobe Premiere Pro', 'DaVinci Resolve', 'Sound Design', 'Color Grading'],
    role: 'Video Editor & Sound Designer',
    highlight: 'Dynamic commercial cuts driving brand excitement and customer engagement.',
    isPlaceholder: false,
    isFolder: true,
    driveUrl: '',
    folderItems: [
      {
        id: 'bobalicious-final-cut',
        title: 'Brand Launch Cut',
        videoSrc: '/videos/Bobalicious/bobalicious-final-3.mp4',
        duration: '0:30',
        tag: 'Commercial Launch',
        description: 'Fast-paced energetic brand launch edit introducing Bobalicious menu and brand aesthetic.',
      },
      {
        id: 'boba-vid-3-cut',
        title: 'Promo & Campaign Reel',
        videoSrc: '/videos/Bobalicious/boba-vid-3-final.mp4',
        duration: '0:30',
        tag: 'Campaign Promo',
        description: 'Promotional campaign cut showcasing customer experience, drink prep, and store ambiance.',
      },
    ],
  },
  {
    id: 'gopanora-showcase-edits',
    title: 'GoPanora — Product Showcase & Walkthrough',
    clientOrSeries: 'GoPanora • 3 Video Edits',
    category: 'Product Showcase',
    categoryLabel: 'Product Showcase & Demo',
    duration: '3 Edits • Product Suite',
    aspectRatio: '16:9',
    videoSrc: '/videos/Gopanora/gopanora-intro-final.mp4',
    poster: '',
    description: 'Product showcase and walkthrough video edits for the GoPanora 360-degree virtual tour platform. Combines screen recording choreography, fluid camera pans, tactile UI highlights, and structured tutorial pacing.',
    editBreakdown: {
      pacing: 'Smooth ease curves, clean zoom callouts, and structured step-by-step tempo',
      colorGrading: 'Crisp digital UI balance with clear contrast and high readability',
      soundDesign: 'Subtle tactile clicks, modern digital transitions, and ambient backing',
      resolution: '1080p Full HD • 60 FPS Masters',
    },
    tools: ['DaVinci Resolve', 'Adobe Premiere Pro', 'Motion Graphics', 'Tutorial Direction'],
    role: 'Motion Editing & Product Demo',
    highlight: 'Comprehensive product demonstration balancing visual appeal with educational clarity.',
    isPlaceholder: false,
    isFolder: true,
    driveUrl: '',
    folderItems: [
      {
        id: 'gopanora-intro',
        title: 'Platform Introduction',
        videoSrc: '/videos/Gopanora/gopanora-intro-final.mp4',
        duration: '0:45',
        tag: 'Platform Intro',
        description: 'High-energy introduction highlighting core 360 virtual tour capabilities, user experience, and visual presentation.',
      },
      {
        id: 'what-gopanora-does',
        title: 'What GoPanora Does',
        videoSrc: '/videos/Gopanora/what-gopanora-does.mp4',
        duration: '0:35',
        tag: 'Core Features',
        description: 'Concise feature breakdown detailing how GoPanora transforms panoramic photography into interactive virtual tours.',
      },
      {
        id: 'gopanora-brookside-collab',
        title: 'Brookside Collaboration',
        videoSrc: '/videos/Gopanora/gopanora-brookside-collab.mp4',
        duration: '0:40',
        tag: 'Client Collaboration',
        description: 'Client case-study showcase demonstrating real-world deployment for Brookside property tour.',
      },
    ],
  },
];
