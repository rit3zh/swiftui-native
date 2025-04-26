import React from "react";
import { SwiftUIViewProperties } from "../ReactNativeRenderSwiftUi.types";

export interface TextProps extends SwiftUIViewProperties {
  /** Content to be displayed as text */
  children: React.ReactNode;
  /** Whether to enable Markdown interpretation for the text content */
  enableMarkdown?: boolean;
}

/**
 * A SwiftUI text component for displaying text content.
 *
 * @remarks
 * This component must be used as a child of SwiftUI.RootView.
 * Supports both plain text and Markdown formatting when enabled.
 *
 * @example
 * ```tsx
 * // Plain text
 * <Text>Hello World</Text>
 *
 * // With Markdown
 * <Text enableMarkdown>
 *   # Heading
 *   This is **bold** text
 * </Text>
 * ```
 *
 * @param props - The text properties
 * @param props.children - Content to be displayed as text
 * @param props.enableMarkdown - Whether to enable Markdown interpretation
 *
 * @extends SwiftUIViewProperties
 */
export const Text = (props: TextProps) => {
  return null;
};

export default Text;
