import React from "react";
import { SwiftUIViewProperties } from "../ReactNativeRenderSwiftUi.types";

export interface ContextMenuProps extends SwiftUIViewProperties {
  children: React.ReactNode;
  optionalSubviews: React.ReactNode;
  menuPreview?: React.ReactNode;
}

/**
 * Displays a Swift UI ContextMenu
 *
 * @remarks
 * This Compoent must be used as a child of SwiftUI.RootView.
 *
 * @param optionalSubviews - The views to display in the menu
 * @param children - The view that should trigger the menu
 * @extends SwiftUIViewProperties
 *
 *
 *
 */

export const ContextMenu = (props: ContextMenuProps) => {
  return null;
};

export default ContextMenu;
