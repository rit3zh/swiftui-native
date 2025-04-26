import React from "react";
import { SwiftUIViewProperties } from "../ReactNativeRenderSwiftUi.types";

export interface ControlGroupProps extends SwiftUIViewProperties {
  children: React.ReactNode;
}

/**
 * Displays a Swift UI ControlGroup
 *
 * @remarks
 * This Compoent must be used as a child of SwiftUI.RootView.
 *
 * @param children - The views to display in the ControlGroup
 * @extends SwiftUIViewProperties
 *
 *
 *
 */

export const ControlGroup = (props: ControlGroupProps) => {
  return null;
};

export default ControlGroup;
