"use client";

/** Carries the newest post from the server-rendered root layout to the client-rendered footer. */
import { createContext, useContext } from "react";
import type { LatestPostProviderPropsType, LatestPostType } from "@/lib/types/layout";

const LatestPostContext = createContext<LatestPostType>(null);

export const LatestPostProvider = ({ post, children }: LatestPostProviderPropsType) => (
  <LatestPostContext value={post}>{children}</LatestPostContext>
);

export const useLatestPost = () => useContext(LatestPostContext);
