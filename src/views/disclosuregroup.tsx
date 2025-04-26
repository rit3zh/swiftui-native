import React from "react";
import { SwiftUIViewProperties } from "../ReactNativeRenderSwiftUi.types";

export interface DisclosureGroupProps extends SwiftUIViewProperties {
  children: React.ReactNode;
  title: string;
}

/**
 * Displays a Swift UI ContextMenu
 *
 * @remarks
 * This Compoent must be used as a child of SwiftUI.RootView.
 *
 * @param title - The title that should be displayed for the DisclosureGroup
 * @param children - The views to display in the DisclosureGroup
 * @extends SwiftUIViewProperties
 *
 *
 *
 */

export const DisclosureGroup = (props: DisclosureGroupProps) => {
  return null;
};

export default DisclosureGroup;
