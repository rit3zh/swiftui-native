import React from "react";
import { SwiftUIViewProperties } from "../ReactNativeRenderSwiftUi.types";

export interface TextFieldProps extends SwiftUIViewProperties {
  text: string;
  textFieldStyle?: string;
  placeholder?: string;
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

export const TextField = (props: TextFieldProps) => {
  return null;
};

export default TextField;
