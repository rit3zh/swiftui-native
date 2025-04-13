import React from "react";
import { SwiftUIViewProperties } from "../ReactNativeRenderSwiftUi.types";

export interface DatePickerProps extends SwiftUIViewProperties {
  date: string;
  title?: string;
  labelHidden?: boolean;
  datePickerStyle?: string;
  minDate?: Date;
  maxDate?: Date;
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

export const DatePicker = (props: DatePickerProps) => {
  return null;
};

export default DatePicker;
