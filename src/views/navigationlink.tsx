import React from "react";
import { SwiftUIViewProperties } from "../ReactNativeRenderSwiftUi.types";

export interface NavigationLinkProps extends SwiftUIViewProperties {
  children: React.ReactNode;
  optionalSubviews: React.ReactNode;
  title?: string;
}

/**
 * Displays a Swift UI NavigationLink
 *
 * @remarks
 * This Compoent must be used as a child of SwiftUI.RootView.
 *
 * @param optionalSubviews - The label for the NavigationLink
 * @param children - The view that should displayed after click on the NavigationLink
 * @param title - The navbar title
 * @extends SwiftUIViewProperties
 *
 *
 *
 */

export const NavigationLink = (props: NavigationLinkProps) => {
  return null;
};

export default NavigationLink;
