import React from "react";
import { SwiftUIViewProperties } from "../ReactNativeRenderSwiftUi.types";

export interface ListProps extends SwiftUIViewProperties {
  /** Content to be displayed in the list */
  children: React.ReactNode;
  /** Whether to enable full swipe for leading swipe actions */
  leadingSwipeActionFullSwipeEnable?: boolean;
  /** Array of components to display as leading swipe actions */
  leadingSwipeActions?: React.ReactNode[];
  /** Array of components to display as trailing swipe actions */
  trailingSwipeActions?: React.ReactNode[];
  /** Whether to enable full swipe for trailing swipe actions */
  trailingSwipeActionFullSwipeEnable?: boolean;
  /** Whether to enable editing mode for the list */
  enableEditing?: boolean;
  /** Whether to disable scrolling for the list */
  scrollDisable?: boolean;

  /**
   * Array of components to display as a toolbar in the list.
   */
  renderListToolBar?: React.ReactNode[];
}

/**
 * A SwiftUI list component for displaying a scrollable list of items.
 *
 * @remarks
 * This component must be used as a child of SwiftUI.RootView.
 * Supports various features including:
 * - Swipe actions (leading and trailing)
 * - Full swipe gestures
 * - Editing mode
 * - Scroll control
 *
 * @example
 * ```tsx
 * <List
 *   leadingSwipeActions={[
 *     <Button key="delete">Delete</Button>
 *   ]}
 *   trailingSwipeActions={[
 *     <Button key="edit">Edit</Button>
 *   ]}
 * >
 *   <Text>Item 1</Text>
 *   <Text>Item 2</Text>
 * </List>
 * ```
 *
 * @param props - The list properties
 * @param props.children - Content to be displayed in the list
 * @param props.leadingSwipeActionFullSwipeEnable - Whether to enable full swipe for leading swipe actions
 * @param props.leadingSwipeActions - Array of components to display as leading swipe actions
 * @param props.trailingSwipeActions - Array of components to display as trailing swipe actions
 * @param props.trailingSwipeActionFullSwipeEnable - Whether to enable full swipe for trailing swipe actions
 * @param props.enableEditing - Whether to enable editing mode for the list
 * @param props.scrollDisable - Whether to disable scrolling for the list
 * @param props.renderListToolBar - Array of components to display as a toolbar in the list
 *
 * @extends SwiftUIViewProperties
 */
export const List: React.FC<ListProps> = (props: ListProps) => {
  return null;
};

export default List;
