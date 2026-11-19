/** Marks an element that persists across a navigation, so it moves to its new place instead of being redrawn. */
import { ViewTransition } from "react";
import type { SharedElementPropsType } from "@/lib/types/components";

/**
 * Both ends of a move must render a SharedElement with the same `name`, unique on each page.
 * `default="none"` keeps it out of unrelated transitions; `share="morph"` applies the morph timing.
 */
export const SharedElement = ({ name, children }: SharedElementPropsType) => (
  <ViewTransition name={name} share="morph" default="none">
    {children}
  </ViewTransition>
);
