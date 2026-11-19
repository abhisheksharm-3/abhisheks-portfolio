import type { PhotoType } from "@/lib/types/components";

/**
 * Photographs and short silent clips for the about page strip, from Abhishek's own library,
 * re-encoded with all metadata stripped and every audio track removed. Files live in
 * public/images/photos/. Captions state only the place and month the original file records.
 * Shown in rows of three on wide screens, in this order. Empty hides the strip.
 */
export const PHOTOS: PhotoType[] = [
  {
    src: "/images/photos/kedarnath-before-dawn.webp",
    alt: "snow peaks under a deep blue night sky, above the lit camp at kedarnath",
    width: 1600,
    height: 1200,
    caption: "kedarnath, before dawn · oct 2024",
  },
  {
    src: "/images/photos/kinnaur-cafe-window.webp",
    alt: "momos and a tea pot on a café table, snow peaks through the window behind",
    width: 1200,
    height: 1600,
    caption: "a café window in saryo, kinnaur · nov 2025",
  },
  {
    src: "/images/photos/kinnaur-monastery.webp",
    alt: "a monastery roof below a long ridge of snow peaks catching warm light at kalpa",
    width: 1600,
    height: 984,
    caption: "kalpa, kinnaur · nov 2025",
  },
  {
    src: "/images/photos/dhauladhar-clouds.webp",
    video: "/images/photos/dhauladhar-clouds.mp4",
    alt: "a band of cloud drifting between the dhauladhar peaks above forested ridges",
    width: 1280,
    height: 720,
    caption: "clouds on the dhauladhar, mcleodganj · nov 2026",
  },
  {
    src: "/images/photos/mcleodganj-buddha.webp",
    alt: "a golden buddha with a blue crown before a jewelled halo, a red lotus lamp in front",
    width: 1300,
    height: 830,
    caption: "the main temple, mcleodganj · nov 2026",
  },
  {
    src: "/images/photos/dharamshala-stadium.webp",
    alt: "the dharamshala cricket ground with its red pavilion roofs, mountains and big clouds behind",
    width: 1600,
    height: 1200,
    caption: "the cricket ground, dharamshala · nov 2026",
  },
  {
    src: "/images/photos/mumbai-taj-night.webp",
    alt: "the taj hotel's red dome lit white against a black sky",
    width: 1600,
    height: 1200,
    caption: "the taj at night, mumbai · oct 2026",
  },
  {
    src: "/images/photos/mumbai-bmc.webp",
    alt: "the stone domes and towers of the bmc building against a blue sky",
    width: 1200,
    height: 1600,
    caption: "the bmc building, mumbai · oct 2026",
  },
  {
    src: "/images/photos/marine-drive-sea.webp",
    video: "/images/photos/marine-drive-sea.mp4",
    alt: "evening sun glittering across the sea",
    width: 1280,
    height: 720,
    caption: "the sea off marine drive · oct 2026",
  },
  {
    src: "/images/photos/kinnaur-coffee.webp",
    alt: "black coffee steaming on a wooden railing, the sun cresting a misty ridge behind",
    width: 1600,
    height: 1200,
    caption: "black coffee, kinnaur · nov 2025",
  },
  {
    src: "/images/photos/shimla-christ-church.webp",
    alt: "the clock tower of christ church lit pale yellow against the night",
    width: 1200,
    height: 1600,
    caption: "christ church, shimla · nov 2025",
  },
  {
    src: "/images/photos/shimla-night.webp",
    alt: "shimla's lit houses stepping down the ridge under a cloudy night sky, a deodar branch across the top",
    width: 1600,
    height: 1200,
    caption: "shimla at night · nov 2025",
  },
  {
    src: "/images/photos/mumbai-flora-fountain.webp",
    alt: "the carved stone of flora fountain lit white at night, a lit tower behind",
    width: 1600,
    height: 1200,
    caption: "flora fountain at night, mumbai · oct 2026",
  },
  {
    src: "/images/photos/sea-chairs.webp",
    video: "/images/photos/sea-chairs.mp4",
    alt: "two empty chairs on a deck facing a calm grey sea",
    width: 1280,
    height: 720,
    caption: "two chairs facing the sea · oct 2026",
  },
  {
    src: "/images/photos/mumbai-asiatic-society.webp",
    alt: "the columned front of the asiatic society library lit at night",
    width: 1600,
    height: 1200,
    caption: "the asiatic society at night, mumbai · oct 2026",
  },
  {
    src: "/images/photos/flight-before-dawn.webp",
    alt: "a plane wing's light flaring over a grid of city lights at night",
    width: 1600,
    height: 1200,
    caption: "a flight before dawn · nov 2026",
  },
  {
    src: "/images/photos/marine-drive-wide.webp",
    alt: "abhishek standing at the right edge of the frame by the sea at marine drive, the mumbai skyline faint behind him",
    width: 1600,
    height: 1200,
    caption: "marine drive, mumbai · oct 2026",
  },
  {
    src: "/images/photos/pune-storm-sunset.webp",
    alt: "the sun low under dark storm clouds above a city skyline",
    width: 1600,
    height: 1200,
    caption: "sunset · mar 2026",
  },
];
