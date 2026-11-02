# The Long Way Home — media inventory

The `/content` experience combines the existing travel reel, original photographs supplied by the user from `D:/Sailung Kalinchok`, and user-supplied reel cover designs. The user confirmed that the cover designs include AI elements; these are displayed separately and labelled as artwork. No new generated imagery or application dependencies were added. A local imageio-ffmpeg tool was used only for preparing the compact MP4.

## Current page imagery

- `public/content/photos/`: selected original photographs from `D:/Sailung Kalinchok`, resized without enlargement and encoded as WebP at quality 90. Active source IDs: DSC02413 (earlier opening/social preview), DSC02427 (road), DSC02420, DSC02391, DSC02417, DSC02440 (Sailung gallery). DSC02391 replaces the gallery sunrise portrait so DSC02408 appears only in the hero; DSC02420 replaces the first gallery photograph. The user confirmed that the current photography gallery is from Sailung. Only Nagarkot is shown in the In the works section, with editing in progress, with no preview images or release date. Kalinchowk now has its own completed gallery and independent viewer, using DSC02474, DSC02480, DSC02485, and DSC02522 from `E:/Nagrkot/Kalinchok`. All four are optimized WebP copies with 16:9 previews and full compositions in the viewer. The other three supplied photos are similar campsite portraits and were not added to avoid repetition. Mobile photography galleries use compact horizontally swipeable rows with GSAP-animated previous/next controls, keyboard arrows, and per-destination position counters. Reduced motion uses instant control navigation and native touch scrolling. No vertical pinning is introduced; desktop previews remain four equal 16:9 cards. Photography and cover artwork have separate viewer loops.
- `public/content/covers/`: the four user-supplied PNG thumbnails, converted to WebP with their full compositions preserved. Sources: `Sailung x Kalinchok (2).png`, `-1° Camping_20261027_194247_0000.png`, `Sailung_20261027_194546_0000.png`, `Sailung Peak_20261027_203131_0000.png`. These are AI-assisted cover designs, not documentary photographs or evidence of four separately playable videos. The camping design is used as the reel poster. The compact preview contains the full cover at 300px tall on mobile and 340px on desktop.
- The user identified the tent scene in `frame-7.webp` as AI-generated. It is excluded from all page images, gallery entries, and video posters. Legacy extracted frame assets are no longer used by this route.
- The existing reel itself still includes that scene. The source videos have not been edited; the user requested that AI labels be omitted from the public page. Provenance remains documented here.

## Existing reel and legacy assets

- `public/videos/Sailung-Kalinchok/jugaad-final.mp4`: 47.53 seconds, 1080 × 1920, approximately 82 MB. This is a narrated camping reel with landscape and campsite moments, not a motorcycle POV film. The original remains available through a direct link and as a format fallback. Its original audio includes speech; separate captions/transcript were not available.
- `public/content/jugaad-travel.mp4`: 11,408,273 bytes (approximately 11.4 MB), 720 × 1280, H.264/AAC with fast-start metadata. Encoded from the original 47.53-second reel, preserving the narration and edit. It is the compact MP4 fallback after WebM and before the original, and loads only when the viewer opens. Playback, audio decoding, duration, and seeking were verified in Chromium. Reproduce with `node scripts/encode-content-mp4.cjs <absolute-ffmpeg-path>`.
- `public/content/jugaad-travel.webm`: approximately 7.3 MB, 540 × 960, VP9 with the original stereo audio encoded as Opus. Created locally through browser MediaRecorder, then remuxed for duration metadata and seeking. Mounted only when the viewer opens, with native controls and no autoplay. The original remains available for higher quality. The encode script takes local Playwright and Chromium paths; after recording, remux with `ffmpeg -i public/content/jugaad-web.webm -c copy -fflags -autobsf public/content/jugaad-travel.webm`.
- `public/content/frame-*.webp`: browser-extracted stills from the original film at its native 1080 × 1920 resolution, encoded as WebP at quality 0.96. Selected files total approximately 959 KB (frames 2, 7, 19, 32). They retain the original edit and burned-in captions. The viewer presents them as film stills, not original photographs. `scripts/content-frames.cjs` documents reproducible extraction. No per-frame location is invented; Sailung is visible in the first frame's original caption. Fine detail remains limited by the original video, especially when cropped into wide panels.
- `public/content/fonts/`: locally bundled Poppins at weights 400, 500, and 600, used throughout the content page. Only the opening title's word “home” uses a Georgia italic accent. Poppins is distributed under the included SIL Open Font License.
- `public/pfp.jpeg`: existing portfolio portrait.
- Email and full-portfolio destinations come from the existing project. The hero links to the user-supplied TikTok profile `https://www.tiktok.com/@who.chinii` first, then Instagram `https://www.instagram.com/who.chini/`. No YouTube profile was supplied.

## Still needed to fulfil the full media direction

- An authentic motorcycle POV clip and clean still for the opening/road chapter. Current chapters use available landscape/camping frames without a moving background.
- Per-photo location confirmation and additional original camping/road photography would broaden the current selection. Original ridge photographs now replace extracted reel frames on the page.
- A verified narration transcript or subtitles is still needed for a complete caption track. No transcript has been fabricated or incomplete captions presented as complete. A compact MP4 fallback is now included, and no video is fetched on entry.
- Genuine paired source and graded frames or timeline captures before adding any before/after comparison.
- Verified creator profile URLs before displaying social links.

## Mobile opening

Both screen sizes now use DSC02408 as a full-bleed photographic opening. Mobile keeps its approved crop toward the traveller and contrast gradient. Desktop shows the broader sunrise composition, with text to the right of the traveller and a gentle scale animation instead of the previous inset reveal. The approved mobile screenshot was compared pixel for pixel and remained identical. Only one opening image is requested. The mobile header is simplified, the TikTok and Instagram buttons remain inside the first screen, and application details sit immediately below the opening. No mobile hero scroll animation is added.

## Production credit

The user confirmed responsibility for shooting, editing, and narration. The local camping reel viewer states: “Filmed, edited, and narrated by me.”

## Local checks

`node node_modules/typescript/bin/tsc -b`

`node node_modules/vite/bin/vite.js build`

`node node_modules/eslint/bin/eslint.js src/content src/main.tsx vite.config.ts`

Browser check (with a Vite server at localhost:5173):

`node scripts/check-content.cjs <absolute-playwright-core-path> <absolute-chromium-path>`

Screenshots are written to ignored `artifacts/content/`. The Vite build emits dedicated `dist/content/index.html` metadata for crawlers. Vercel rewrites serve it for both `/content` and `/content/`. This configuration has not been deployed or verified against the live domain.

## TikTok links

The featured content block links directly to the three short URLs supplied by the user: `https://vt.tiktok.com/ZSp17BmN4/`, `https://vt.tiktok.com/ZSp17HKsX/`, `https://vt.tiktok.com/ZSp17U7Df/`. The user confirmed the mapping: first link = Sailung vs Kalinchowk (destinations cover); second = −1° Camping (camping cover); third = Trip Cost Breakdown (trip-cost cover). The corresponding supplied thumbnails and topic titles are used on the link cards. No TikTok embed or remote media is loaded on entry. The existing camping reel remains available through an explicit on-page alternative beneath the TikTok cards.

## Horizontal controls

Photo galleries and TikTok cards share horizontal navigation: native touch swiping, keyboard arrows, position counters, and GSAP-powered previous/next controls. When the row overflows, vertical mouse-wheel gestures over the row advance horizontally; at either boundary outward gestures resume ordinary page scrolling. Zoom gestures and horizontal trackpad gestures remain native. Reduced motion makes arrow/wheel navigation instant. Desktop rows that fit do not intercept wheel scrolling. TikTok cards use portrait thumbnails with no side bars.

## Responsive images and chapter navigation

Preview photographs use 640px and 1200px WebP derivatives at quality 84; the hero also has a 1600px option. Browser `srcset` selection accounts for screen width and pixel density, with a larger mobile hero size hint to retain detail in the tall crop. Full-size gallery images remain unchanged and load when the viewer opens. The About portrait now uses 640px/1000px WebP copies (55/134 KB), replacing the 2.2 MB JPEG request on this route. Reproduce these assets with `python scripts/optimize-content-images.py` (Pillow required). Layout, crop positions, and source photographs are preserved. Existing lazy loading remains enabled below the hero, with asynchronous decoding on the photo previews.

Chapter links animate with GSAP ScrollToPlugin and move keyboard focus to the destination. As requested, the page defaults to Motion on. This explicit page preference overrides system reduced motion consistently across chapter navigation, cover reveals, and CSS transitions; Motion off disables all of these animations. The root motion attribute is restored when leaving the page. Starting a new chapter transition cancels the previous one, and manual scrolling can interrupt the animation.

## Copy consistency

The mobile introduction, Road and About copy, and shared browser/social metadata describe the photography and video collection rather than a single reel. Video covers use consistent labels and Kalinchowk spelling; original source artwork text remains unchanged. The Road image is identified as a Sailung photograph. Nagarkot remains editing in progress. “Reel” refers specifically to the existing local camping video or proposed Instagram work.
