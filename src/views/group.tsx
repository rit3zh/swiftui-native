import React from "react";
import { SwiftUIViewProperties } from "../ReactNativeRenderSwiftUi.types";

export interface GroupProps extends SwiftUIViewProperties {
  children: React.ReactNode;
}
/**
 * Displays a Swift UI Group
 *
 * @remarks
 * This Compoent must be used as a child of SwiftUI.RootView.
 *
 * @param children - The views to display in the Group
 * @extends SwiftUIViewProperties
 *
 *
 *
 */

export const Group = (props: GroupProps) => {
  return null;
};

export default Group;
