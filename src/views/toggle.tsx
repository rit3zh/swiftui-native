import React from "react";
import { SwiftUIViewProperties } from "../ReactNativeRenderSwiftUi.types";

export interface ToggleProps extends SwiftUIViewProperties {
  isOn: boolean;
  children?: React.ReactNode;
  toggleStyle?: string;
}
/**
 * Displays a Swift UI Text
 *
 * @remarks
 * This Compoent must be used as a child of RNSwiftUI.RootView.
 * @param enableMarkdown - Enables Markdown interpretation for the Text.
 * @param children - The Text as string
 * @extends SwiftUIViewProperties
 *
 *
 *
 */

export const Toggle = (props: ToggleProps) => {
  return null;
};

export default Toggle;
