import React from "react";
import { SwiftUIViewProperties } from "../ReactNativeRenderSwiftUi.types";

export interface StepperProps extends SwiftUIViewProperties {
  step?: number;
  minValue?: number;
  maxValue?: number;
  value?: number;
  title?: string;
}

/**
 * Displays a Swift UI Spacer
 *
 * @remarks
 * This Compoent must be used as a child of RNSwiftUI.RootView.
 *
 * @extends SwiftUIViewProperties
 *
 *
 *
 *
 */

export const Stepper = (props: StepperProps) => {
  return null;
};

export default Stepper;
