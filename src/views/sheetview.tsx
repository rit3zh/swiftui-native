import React from "react";
import { SwiftUIViewProperties } from "../ReactNativeRenderSwiftUi.types";

export interface SheetViewProps extends SwiftUIViewProperties {
  /** Content to be displayed in the sheet */
  children: React.ReactNode;
  /** Content that triggers the sheet presentation */
  optionalSubviews: React.ReactNode;
}

/**
 * A SwiftUI sheet component for presenting content in a modal sheet.
 *
 * @remarks
 * This component must be used as a child of SwiftUI.RootView.
 * Provides a modal presentation style with:
 * - Main content in the sheet
 * - Trigger content for presentation
 *
 * @example
 * ```tsx
 * <SheetView
 *   optionalSubviews={
 *     <Button key="show">Show Sheet</Button>
 *   }
 * >
 *   <Text>Sheet Content</Text>
 * </SheetView>
 * ```
 *
 * @param props - The sheet view properties
 * @param props.children - Content to be displayed in the sheet
 * @param props.optionalSubviews - Content that triggers the sheet presentation
 *
 * @extends SwiftUIViewProperties
 */
export const SheetView = (props: SheetViewProps) => {
  return null;
};

export default SheetView;
