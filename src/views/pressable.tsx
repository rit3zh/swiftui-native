import React from "react";
import { SwiftUIViewProperties } from "../ReactNativeRenderSwiftUi.types";

export interface RectangleProps extends SwiftUIViewProperties {
  children: React.ReactNode;
  index?: number;
}

/**
 * Displays a Swift UI Rectangle View
 *
 * @remarks
 * This Compoent must be used as a child of SwiftUI.RootView.
 *
 * @extends SwiftUIViewProperties
 *
 *
 *
 *
 */

export const Pressable = (props: RectangleProps) => {
  return null;
};

export default Pressable;
