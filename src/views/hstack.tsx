import React from "react";
import { SwiftUIViewProperties } from "../ReactNativeRenderSwiftUi.types";

export interface HStackProps extends SwiftUIViewProperties {
  /** Content to be displayed in the horizontal stack */
  children: React.ReactNode;
}

/**
 * A SwiftUI horizontal stack component for arranging views horizontally.
 *
 * @remarks
 * This component must be used as a child of SwiftUI.RootView.
 * Arranges its children in a horizontal line from leading to trailing edge.
 *
 * @example
 * ```tsx
 * <HStack>
 *   <Text>Left</Text>
 *   <Text>Center</Text>
 *   <Text>Right</Text>
 * </HStack>
 * ```
 *
 * @param props - The horizontal stack properties
 * @param props.children - Content to be displayed in the horizontal stack
 *
 * @extends SwiftUIViewProperties
 */
export const HStack = (props: HStackProps) => {
  return null;
};

export default HStack;
