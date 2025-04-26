import React from "react";
import { SwiftUIViewProperties } from "../ReactNativeRenderSwiftUi.types";

export interface ScrollViewProps extends SwiftUIViewProperties {
  children: React.ReactNode;
}

/**
 * Displays a Swift UI ScrollVIew
 *
 * @remarks
 * This Compoent must be used as a child of SwiftUI.RootView.
 *
 * @param children - The view to display in the ScrollView
 * @extends SwiftUIViewProperties
 *
 *
 *
 */

export const ScrollView = (props: ScrollViewProps) => {
  return null;
};

export default ScrollView;
