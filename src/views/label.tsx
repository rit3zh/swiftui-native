import React from "react";
import { SwiftUIViewProperties } from "../ReactNativeRenderSwiftUi.types";
import { SFSymbol } from "../types/sf-symbols";

export interface LabelProps extends SwiftUIViewProperties {
  text: string;
  systemIconName: SFSymbol;
}

/**
   * Displays a Swift UI Label
   *
   * @remarks
   * This Compoent must be used as a child of SwiftUI.RootView.
   *
   * @param title - The text
   * @param systemIconName - The symbol to display (SF symbol) [optional]

   * @extends SwiftUIViewProperties
   *
   *
   *
   */

export const Label = (props: LabelProps) => {
  return null;
};

export default Label;
