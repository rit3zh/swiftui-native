import React from "react";
import { SwiftUIViewProperties } from "../ReactNativeRenderSwiftUi.types";

export interface PickerProps extends SwiftUIViewProperties {
  children: React.ReactNode;
  selection: number;
  pickerStyle?: string;
  text?: string;
}
/**
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

export const Picker = (props: PickerProps) => {
  return null;
};

export default Picker;
