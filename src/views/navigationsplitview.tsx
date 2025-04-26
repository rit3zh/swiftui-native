import React from "react";
import { SwiftUIViewProperties } from "../ReactNativeRenderSwiftUi.types";

export interface NavigationSplitViewProps extends SwiftUIViewProperties {
  children: React.ReactNode;
  optionalSubviews: React.ReactNode;
  title?: string;
}

/**
 * Displays a Swift UI NavigationSplitView
 *
 * @remarks
 * This Compoent must be used as a child of SwiftUI.RootView.
 *
 * @param optionalSubviews - The view that should be displayed as a split pane
 * @param children - The detail View
 * @param title - The navbar title of the  split pane
 * @extends SwiftUIViewProperties
 *
 *
 *
 */

export const NavigationSplitView = (props: NavigationSplitViewProps) => {
  return null;
};

export default NavigationSplitView;
