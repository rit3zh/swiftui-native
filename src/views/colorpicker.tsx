import React from "react";
import { SwiftUIViewProperties } from "../ReactNativeRenderSwiftUi.types";

export interface ColorProps extends SwiftUIViewProperties {
  hexColor: string;
  title?: string;
}
/**a
 * Displays a Swift UI Group
 *
 * @remarks
 * This Compoent must be used as a child of RNSwiftUI.RootView.
 *
 * @param children - The views to display in the Group
 * @extends SwiftUIViewProperties
 *
 *
 *
 */

export const ColorPicker = (props: ColorProps) => {
  return null;
};

export default ColorPicker;
