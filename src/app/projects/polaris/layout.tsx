import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Polaris | Abhishek Sharma",
  description:
    "A project operating system for Claude Code: eighteen flows, thirty-one commands, and the gates that keep an agent honest.",
};

/**
 * Layout for the dedicated Polaris project page. Exists to attach static
 * metadata, since the page itself is a client component.
 */
const PolarisPageLayout = ({ children }: { children: ReactNode }): ReactNode => {
  return children;
};

export default PolarisPageLayout;
