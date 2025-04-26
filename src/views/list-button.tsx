import * as React from "react";
import { SwiftUIViewProperties } from "../ReactNativeRenderSwiftUi.types";
import { SFSymbol } from "../types/sf-symbols";

export interface ButtonProps extends SwiftUIViewProperties {
  key?: string;
  text: string;
  systemIconName: SFSymbol;
  role: "cancel" | "destructive";
  labelStyle?: string;
  tint?: string;
}

/**
 * Displays a Swift UI button
 *
 * @remarks
 * This Compoent must be used as a child of SwiftUI.RootView.
 *
 * @param key - The key under which the event is sent
 * @param children - The SwiftUI view that should be displayed as a button
 * @extends SwiftUIViewProperties
 *
 *
 *
 */
export const ListButton = (props: ButtonProps) => {
  return null;
};

export default ListButton;
