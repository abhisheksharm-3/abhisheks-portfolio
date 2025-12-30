import type { ReactNode } from "react";

/** Props for components that accept children */
export interface ChildrenPropsType {
    children: ReactNode;
}

/** Props for the Providers component */
export interface ProvidersPropsType extends ChildrenPropsType { }

/** Props for the RootLayout component */
export interface RootLayoutPropsType extends ChildrenPropsType { }
