import type { ReactNode } from "react";

/** Props for components that accept children */
export interface ChildrenPropsType {
  children: ReactNode;
}

/** Props for the Providers component */
export type ProvidersPropsType = ChildrenPropsType;

/** Props for the RootLayout component */
export type RootLayoutPropsType = ChildrenPropsType;

/** The newest published post, shown in the footer's "lately" list. Null when nothing is published. */
export type LatestPostType = { slug: string; title: string; date: string } | null;

/** Props for the LatestPostProvider component */
export interface LatestPostProviderPropsType extends ChildrenPropsType {
  post: LatestPostType;
}
