import React from "react";
import { SwiftUIViewProperties } from "../ReactNativeRenderSwiftUi.types";

export interface ButtonProps extends SwiftUIViewProperties {
  /** Unique identifier for the button component */
  key: string;
  /** Content to be displayed inside the button */
  children: React.ReactNode;
}

/**
 * A SwiftUI button component that can be used to trigger actions.
 *
 * @remarks
 * This component must be used as a child of SwiftUI.RootView.
 * The button can contain any valid React node as its content.
 *
 * @example
 * ```tsx
 * <Button key="myButton">
 *   <Text>Click me</Text>
 * </Button>
 * ```
 *
 * @param props - The button properties
 * @param props.key - Unique identifier for the button component
 * @param props.children - Content to be displayed inside the button
 *
 * @extends SwiftUIViewProperties
 */
export const Button = (props: ButtonProps) => {
  return null;
};

export default Button;
