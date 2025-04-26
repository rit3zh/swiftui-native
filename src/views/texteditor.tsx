import React from "react";
import { SwiftUIViewProperties } from "../ReactNativeRenderSwiftUi.types";

export interface TextEditorProps extends SwiftUIViewProperties {
  /** The current text content of the editor */
  text: string;
  /** The style of the text editor (e.g., 'plain', 'rich') */
  textEditorStyle?: string;
  /** Maximum number of lines to display */
  lineLimit?: number;
  /** Spacing between lines in points */
  lineSpacing?: number;
}

/**
 * A SwiftUI text editor component for multi-line text input.
 *
 * @remarks
 * This component must be used as a child of SwiftUI.RootView.
 * Provides a multi-line text input area with support for:
 * - Line limits
 * - Line spacing
 * - Different text styles
 *
 * @example
 * ```tsx
 * <TextEditor
 *   text="Initial content"
 *   textEditorStyle="rich"
 *   lineLimit={10}
 *   lineSpacing={1.5}
 * />
 * ```
 *
 * @param props - The text editor properties
 * @param props.text - The current text content of the editor
 * @param props.textEditorStyle - The style of the text editor
 * @param props.lineLimit - Maximum number of lines to display
 * @param props.lineSpacing - Spacing between lines in points
 *
 * @extends SwiftUIViewProperties
 */
export const TextEditor = (props: TextEditorProps) => {
  return null;
};

export default TextEditor;
