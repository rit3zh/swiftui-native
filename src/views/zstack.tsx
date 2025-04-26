import React from "react";
import { SwiftUIViewProperties } from "../ReactNativeRenderSwiftUi.types";

export interface ZStackProps extends SwiftUIViewProperties {
  /** Content to be displayed in the z-axis stack */
  children: React.ReactNode;
}

/**
 * A SwiftUI z-axis stack component for overlaying views.
 *
 * @remarks
 * This component must be used as a child of SwiftUI.RootView.
 * Arranges its children in a z-axis stack, with later children appearing on top of earlier ones.
 *
 * @example
 * ```tsx
 * <ZStack>
 *   <Rectangle color="gray" />
 *   <Text>Overlay Text</Text>
 * </ZStack>
 * ```
 *
 * @param props - The z-axis stack properties
 * @param props.children - Content to be displayed in the z-axis stack
 *
 * @extends SwiftUIViewProperties
 */
export const ZStack = (props: ZStackProps) => {
  return null;
};

export default ZStack;
