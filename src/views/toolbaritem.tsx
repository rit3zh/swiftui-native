import React from "react";
import {
  SwiftUIViewProperties,
  ToolbarPlacement,
} from "../ReactNativeRenderSwiftUi.types";

export interface ToolbarItemProps extends SwiftUIViewProperties {
  placement?: ToolbarPlacement;
  children: React.ReactNode;
}

/**
 * Displays a Swift UI ToolbarItem
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

export const ToolBarItem = (props: ToolbarItemProps) => {
  return null;
};

export default ToolBarItem;
