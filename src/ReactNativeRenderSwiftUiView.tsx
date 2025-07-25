import * as React from "react";
import { requireNativeViewManager } from "expo-modules-core";
import { ReactNativeRenderSwiftUiViewProps } from "./ReactNativeRenderSwiftUi.types";

const NativeView: React.ComponentType<ReactNativeRenderSwiftUiViewProps> =
  requireNativeViewManager("ReactNativeRenderSwiftUi");

export function RNSwiftUIJsonView({
  data,
  ...props
}: ReactNativeRenderSwiftUiViewProps) {
  return <NativeView data={JSON.stringify(data)} {...props} />;
}
