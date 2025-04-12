import React from "react";
import { SwiftUIViewProperties } from "../ReactNativeRenderSwiftUi.types";

export interface ListProps extends SwiftUIViewProperties {
  children: React.ReactNode;
  leadingSwipeActionFullSwipeEnable?: boolean;
  leadingSwipeActions?: React.ReactNode[];
  trailingSwipeActions?: React.ReactNode[];
  trailingSwipeActionFullSwipeEnable?: boolean;
  enableEditing?: boolean;
}

/**
 * Displays a Swift UI List
 *
 * @remarks
 * This Compoent must be used as a child of RNSwiftUI.RootView.
 *
 * @param children - The views to display in the List
 * @extends SwiftUIViewProperties
 *
 *
 *
 */

export const List: React.FC<ListProps> = (props: ListProps) => {
  return null;
};

export default List;
