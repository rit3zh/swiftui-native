import * as React from "react";
import { SwiftUIViewProperties } from "../ReactNativeRenderSwiftUi.types";
import { SFSymbol } from "sf-symbols-typescript";

export interface ButtonProps extends SwiftUIViewProperties {
  key?: string;
  text: string;
  systemIconName: SFSymbol;
  role: "cancel" | "destructive";
  labelStyle?: string;
}

/**
 * Displays a Swift UI button
 *
 * @remarks
 * This Compoent must be used as a child of RNSwiftUI.RootView.
 *
 * @param key - The key under which the event is sent
 * @param children - The RNSwiftUI view that should be displayed as a button
 * @extends SwiftUIViewProperties
 *
 *
 *
 */
export const ListButton = (props: ButtonProps) => {
  return null;
};

export default ListButton;
