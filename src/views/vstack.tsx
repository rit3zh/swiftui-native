import React from "react";
import { SwiftUIViewProperties } from "../ReactNativeRenderSwiftUi.types";

export interface VStackProps extends SwiftUIViewProperties {
  /** Content to be displayed in the vertical stack */
  children: React.ReactNode;
}

/**
 * A SwiftUI vertical stack component for arranging views vertically.
 *
 * @remarks
 * This component must be used as a child of SwiftUI.RootView.
 * Arranges its children in a vertical line from top to bottom.
 *
 * @example
 * ```tsx
 * <VStack>
 *   <Text>Top</Text>
 *   <Text>Middle</Text>
 *   <Text>Bottom</Text>
 * </VStack>
 * ```
 *
 * @param props - The vertical stack properties
 * @param props.children - Content to be displayed in the vertical stack
 *
 * @extends SwiftUIViewProperties
 */
export const VStack = (props: VStackProps) => {
  return null;
};

export default VStack;
