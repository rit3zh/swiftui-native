import React from "react";
import { SwiftUIViewProperties } from "../ReactNativeRenderSwiftUi.types";

export interface GaugeProps extends SwiftUIViewProperties {
  children: React.ReactNode;
  gaugeStyle: string;
  value?: number;
  minValue?: number;
  maxValue?: number;
  currentValueLabel?: React.ReactNode;
  minimumValueLabel?: React.ReactNode;
  maximumValueLabel?: React.ReactNode;
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

export const Gauge = (props: GaugeProps) => {
  return null;
};

export default Gauge;
