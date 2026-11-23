import type { PhotoType } from "@/lib/types/components";

/**
 * Photographs and silent clips for every page except /about, from Abhishek's own library, re-encoded
 * with all metadata stripped and every audio track removed. Files live in public/images/site/. None
 * of them repeats a photo from the about page, and each is used on one page only.
 */
const media = <T extends Record<string, PhotoType>>(entries: T) => entries;

export const SITE_MEDIA = media({
  hackathon: {
    src: "/images/site/google-wall-me.webp",
    alt: "abhishek in a white polo in front of the coloured google letters on a slatted wood wall",
    width: 1280,
    height: 1600,
    caption: "google, gurugram, the day credify won its gen ai exchange track · oct 2024",
  },
  narkandaSnow: {
    src: "/images/site/narkanda-snow.webp",
    alt: "a snowfield under deodars, ridges and cloud banks stretching to the horizon",
    width: 1600,
    height: 904,
    caption: "narkanda in snow · mar 2023",
  },
  narkandaMorning: {
    src: "/images/site/narkanda-morning.webp",
    alt: "a tall timber guesthouse above blue ridges under streaked morning cloud",
    width: 1600,
    height: 1200,
    caption: "narkanda, early morning · mar 2023",
  },
  kalpaRoad: {
    src: "/images/site/kalpa-cliff-road.webp",
    alt: "a narrow road cut into a rock face, a lone deodar leaning over the barrier",
    width: 1600,
    height: 1200,
    caption: "the road to kalpa · nov 2025",
  },
  sunaliSky: {
    src: "/images/site/sunali-pink-sky.webp",
    alt: "a pink and violet evening sky over the silhouettes of pines",
    width: 1600,
    height: 1200,
    caption: "evening over sunali · nov 2026",
  },
  gurugramNight: {
    src: "/images/site/google-gurugram-night.webp",
    alt: "google's gurugram office lit at night, framed by palm fronds",
    width: 1600,
    height: 1205,
    caption: "google, gurugram, the night credify won · oct 2024",
  },
  contact: {
    src: "/images/site/marine-drive-sunset-me.webp",
    alt: "abhishek sitting on the sea wall at marine drive at sunset, looking out over the water",
    width: 1600,
    height: 1200,
    caption: "marine drive at sunset, mumbai · oct 2026",
  },
  byline: {
    src: "/images/site/byline.webp",
    alt: "abhishek",
    width: 320,
    height: 320,
  },
  notFound: {
    src: "/images/site/exhibit-glass.webp",
    video: "/images/site/exhibit-glass.mp4",
    alt: "glass shapes glowing and shifting colour in a mirrored room",
    width: 1280,
    height: 500,
    caption: "a room of glass at an exhibit, mumbai · oct 2026",
  },
  error: {
    src: "/images/site/sea-boat.webp",
    video: "/images/site/sea-boat.mp4",
    alt: "one small boat on a flat gold sea under a hazy sun",
    width: 960,
    height: 540,
    caption: "a boat off nariman point · oct 2026",
  },
  loading: {
    src: "/images/site/dharamshala-lights.webp",
    video: "/images/site/dharamshala-lights.mp4",
    alt: "the lights of dharamshala spread across the hills at night",
    width: 1920,
    height: 620,
    caption: "dharamshala after dark · nov 2026",
  },
});

/**
 * The home hero's clips, each cropped to 4:5 and 8 seconds long. A visit plays the one after the
 * clip the same browser saw last, so returning visitors cycle through all of them.
 */
export const HERO_CLIPS = [
  {
    src: "/images/site/deccan-queen-window.webp",
    video: "/images/site/deccan-queen-window.mp4",
    alt: "the ghats sliding past the window of the deccan queen's dining car, a ketchup bottle on the table",
    width: 720,
    height: 1280,
    caption: "the deccan queen, through the ghats · oct 2026",
  },
  {
    src: "/images/site/exhibit-flowers.webp",
    video: "/images/site/exhibit-flowers.mp4",
    alt: "white and pale blue flowers drawing themselves on a dark wall, projected at an exhibit",
    width: 720,
    height: 900,
    caption: "projected flowers at an exhibit, mumbai · oct 2026",
  },
  {
    src: "/images/site/exhibit-white-tree.webp",
    video: "/images/site/exhibit-white-tree.mp4",
    alt: "a white installation of branching arcs under tall windows, seen from a balcony above",
    width: 720,
    height: 900,
    caption: "a white tree of arcs at the nmacc, mumbai · oct 2026",
  },
  {
    src: "/images/site/sea-sun-marine-drive.webp",
    video: "/images/site/sea-sun-marine-drive.mp4",
    alt: "the sun low in a hazy sky, its path glittering across the sea",
    width: 720,
    height: 900,
    caption: "the sun on the sea off marine drive · oct 2026",
  },
  {
    src: "/images/site/diwali-sunali.webp",
    video: "/images/site/diwali-sunali.mp4",
    alt: "a firework bursting in gold sparks against a dark night sky",
    width: 720,
    height: 900,
    caption: "diwali in sunali · nov 2026",
  },
] as const satisfies readonly PhotoType[];

/** The four photos under "off the clock" on the home page, each leading to the about page. */
export const HOME_PHOTOS = [
  SITE_MEDIA.narkandaSnow,
  SITE_MEDIA.narkandaMorning,
  SITE_MEDIA.kalpaRoad,
  SITE_MEDIA.sunaliSky,
] as const;
