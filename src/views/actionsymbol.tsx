import React from "react";
import { SwiftUIViewProperties } from "../ReactNativeRenderSwiftUi.types";
import type { SFSymbol } from "sf-symbols-typescript";

export interface ActionSymbolProps extends SwiftUIViewProperties {
  systemIconName: SFSymbol;
}

/**
 * Displays a Swift UI ContextMenu
 *
 * @remarks
 * This Compoent must be used as a child of RNSwiftUI.RootView.
 *
 * @param optionalSubviews - The views to display in the menu
 * @param children - The view that should trigger the menu
 * @extends SwiftUIViewProperties
 *
 *
 *
 */

export const ActionSymbol = (props: ActionSymbolProps) => {
  return null;
};

export default ActionSymbol;
