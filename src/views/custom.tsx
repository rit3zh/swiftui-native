import {
  SwiftUIViewProperties,
  SwiftUIViewValues,
} from "../ReactNativeRenderSwiftUi.types";

export interface CustomViewProps
  extends SwiftUIViewProperties,
    SwiftUIViewValues {}

/**
   * Integrates a custom SwiftUI View into react native
   *
   * @remarks
   * This Compoent must be used as a child of SwiftUI.RootView.

   * @param key - The native views key
   * @param json - Cusotm properties as json
   * @extends SwiftUIViewProperties
   *
   *
   *
   */

export const CustomView = (props: CustomViewProps) => {
  return null;
};

export default CustomView;
