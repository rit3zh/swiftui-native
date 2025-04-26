import React from "react";
import { SwiftUIViewProperties } from "../ReactNativeRenderSwiftUi.types";

export interface SectionProps extends SwiftUIViewProperties {
  children: React.ReactNode;
  optionalSubviews?: React.ReactNode;
  isExpandable?: boolean;
}

/**
 * Displays a Swift UI Collapsable List Section
 *
 * @remarks
 * This Compoent must be used as a child of SwiftUI.RootView.
 *
 * @param optionalSubviews - The view to display as the section header
 * @param children - The views that should be displayed under this section
 * @param isExpandable - If true, the section can be expanded and collapsed
 * @extends SwiftUIViewProperties
 *
 *
 *
 */

export const CollapsibleSection = (props: SectionProps) => {
  return null;
};

export default CollapsibleSection;
