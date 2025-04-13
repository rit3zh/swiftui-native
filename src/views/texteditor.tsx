import React from "react";
import { SwiftUIViewProperties } from "../ReactNativeRenderSwiftUi.types";

export interface TextEditorProps extends SwiftUIViewProperties {
  text: string;
  textEditorStyle?: string;
  lineLimit?: number;
  lineSpacing?: number;
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

export const TextEditor = (props: TextEditorProps) => {
  return null;
};

export default TextEditor;
