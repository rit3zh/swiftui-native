import React from "react";
import {
  SwiftUIViewProperties,
  ToolbarPlacement,
} from "../ReactNativeRenderSwiftUi.types";

export interface ToolbarItemGroupProps extends SwiftUIViewProperties {
  placement?: ToolbarPlacement;
  children: React.ReactNode;
}

/**
 * Displays a Swift UI ToolbarItemGroup
 *
 * @remarks
 * This Compoent must be used as a child of SwiftUI.RootView.
 *
 * @param placement - The placement of the toolbar
 * @param children - The views that should be displayed in the toolbar
 * @extends SwiftUIViewProperties
 *
 *
 *
 */

export const ToolbarItemGroup = (props: ToolbarItemGroupProps) => {
  return null;
};

export default ToolbarItemGroup;
