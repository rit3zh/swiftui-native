import React from "react";
import { SwiftUIViewProperties } from "../ReactNativeRenderSwiftUi.types";

export interface LazyVStackProps extends SwiftUIViewProperties {
  /** Content to be displayed in the lazy vertical stack */
  children: React.ReactNode;
}

/**
 * A SwiftUI lazy vertical stack component for efficiently arranging views vertically.
 *
 * @remarks
 * This component must be used as a child of SwiftUI.RootView.
 * Similar to VStack but only creates views as they become visible,
 * improving performance for large lists of items.
 *
 * @example
 * ```tsx
 * <LazyVStack>
 *   {items.map(item => (
 *     <Text key={item.id}>{item.name}</Text>
 *   ))}
 * </LazyVStack>
 * ```
 *
 * @param props - The lazy vertical stack properties
 * @param props.children - Content to be displayed in the lazy vertical stack
 *
 * @extends SwiftUIViewProperties
 */
export const LazyVStack = (props: LazyVStackProps) => {
  return null;
};

export default LazyVStack;
