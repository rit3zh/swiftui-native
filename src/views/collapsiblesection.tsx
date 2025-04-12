import React from "react";
import { SwiftUIViewProperties } from "../ReactNativeRenderSwiftUi.types";

export interface SectionProps extends SwiftUIViewProperties {
  children: React.ReactNode;
  optionalSubviews?: React.ReactNode;
  isExpandable?: boolean;
}

/**
 * Displays a Swift UI List Section
 *
 * @remarks
 * This Compoent must be used as a child of RNSwiftUI.RootView.
 *
 * @param optionalSubviews - The view to display as the section header
 * @param children - The views that should be displayed under this section
 * @extends SwiftUIViewProperties
 *
 *
 *
 */

export const CollapsibleSection = (props: SectionProps) => {
  return null;
};

export default CollapsibleSection;
