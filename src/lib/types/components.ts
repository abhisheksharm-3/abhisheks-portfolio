import type { ReactNode } from "react";
import type z from "zod";
import type { CONTACT_FORM_SCHEMA } from "@/data/contact-schema";

/** Props for components that animate based on scroll-into-view state */
export interface InViewPropsType {
  isInView: boolean;
}

export interface MobileNavLinkPropsType {
  item: NavigationItemType;
  isActive: boolean;
  transitionTypes?: string[];
  onClick: () => void;
}

export type ProjectCategory = "ai" | "web" | "mobile";

/** One row of a project's case file: what i did on it, and the figure that came from it. */
export interface ProjectCaseRowType {
  did: string;
  detail: string;
  figure: string;
  figureLabel: string;
}

/** Something the client's side said to me, attributed by role only, never by name. */
export interface ProjectQuoteType {
  text: string;
  who: string;
  when: string;
}

/** The case file the about page's work reading tells for one client project. */
export interface ProjectCaseFileType {
  /** The scale line beside the title, e.g. customers and revenue. */
  scale: string;
  /** The home page's receipt: what i own on the project and what runs through it, as short label/value lines. */
  receipt: { label: string; value: string }[];
  rows: ProjectCaseRowType[];
  quotes?: ProjectQuoteType[];
}

export interface ProjectType {
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  /** A real screenshot of the project, shown on its detail page. Absent for projects without one. */
  imageSrc?: string;
  /** Real app screens for phone projects. Shown in place of imageSrc on the detail page when present. */
  screens?: ProjectScreenType[];
  tags: string[];
  year: string;
  url?: string;
  github?: string;
  /** A notebook that shows the model training, for ML projects. */
  notebook?: string;
  /** Asides shown in the page margin: true things that happened while building it, newest insight first. */
  notes?: ProjectNoteType[];
  isFeatured: boolean;
  /** Early learning work: listed as a text row, not a card. */
  isArchived?: boolean;
  /** Primary discipline, used for the filter. Archived work has none. */
  category?: ProjectCategory;
  /** Shown on the card for projects you install rather than visit. */
  installCommand?: string;
  role?: string;
  client?: string;
  duration?: string;
  isBuilding?: boolean;
  /** Told as the case file on the about page's work reading. One project carries it. */
  caseFile?: ProjectCaseFileType;
}

/** One area of work: a single sentence of proof, the page that shows it, and its tools as plain text. */
export interface ExpertiseType {
  title: string;
  proof: string;
  link: { href: string; label: string };
  skills: readonly string[];
}

export interface AnimatedPathPropsType {
  className?: string;
  pathD?: string;
  delay?: number;
}

export interface ContactEmailPropsType {
  name: string;
  email: string;
  message: string;
  submittedAt: string;
  userAgent: string;
  referer: string;
}

export interface NavigationItemType {
  name: string;
  href: string;
}

export interface MobileMenuPropsType {
  onClose: () => void;
  navigationItems: readonly NavigationItemType[];
  activeItem: string | null;
}

export interface SectionHeaderPropsType {
  subtitle: string;
  children: React.ReactNode;
  className?: string;
}

export interface AppShellPropsType {
  className?: string;
  children: ReactNode;
  showBackground?: boolean;
}

export type ContactFormDataType = z.infer<typeof CONTACT_FORM_SCHEMA>;

/** One row of the footer's "lately" list: a verb, what it was done to, and when. */
export interface FooterLatelyRowPropsType {
  verb: string;
  children: ReactNode;
  when?: string;
}

/** Props for TextMorph: the current string, which morphs from the previous one when it changes. */
export interface TextMorphPropsType {
  children: string;
  className?: string;
}

/** Props for SharedElement: a page-unique name shared by both ends of the move, and the element itself. */
export interface SharedElementPropsType {
  name: string;
  children: ReactNode;
}

/** One margin note on a project page, optionally linking to the post that tells the whole story. */
export interface ProjectNoteType {
  text: string;
  href?: string;
}

/** Props for MarginNotes. */
export interface MarginNotesPropsType {
  notes: ProjectNoteType[];
}

/** One app screen on a project page: the file, its pixel size, and a caption naming what it shows. */
export interface ProjectScreenType {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

/** Props for ProjectDetailScreens. */
export interface ProjectDetailScreensPropsType {
  screens: ProjectScreenType[];
}

/** One question and its answer, from a post's frontmatter. */
export interface PostFaqType {
  question: string;
  answer: string;
}

/** Props for PostFaq. */
export interface PostFaqPropsType {
  faqs: PostFaqType[];
}

/** One photo in the about page strip. The size sets the aspect ratio, so the layout is fixed before the file loads. */
export interface PhotoType {
  /** The still image; for a video entry it is the poster shown before playback and under reduced motion. */
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  /** A short silent loop. The file carries no audio track. */
  video?: string;
}

/** Props for LoopVideo: the loop, its poster, and the label read in place of the moving image. */
export interface LoopVideoPropsType {
  video: string;
  poster: string;
  alt: string;
}
