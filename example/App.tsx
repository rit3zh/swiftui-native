import * as React from "react";
import { Appearance, ColorSchemeName } from "react-native";
import SwiftUI, { Color, SwiftUIEvent, useSwiftUiEvent } from "swiftui-native";
import { Settings } from "./src/screens";

const THEME: ColorSchemeName = "dark";
Appearance.setColorScheme(THEME);

const App: React.FunctionComponent = (): React.ReactNode => {
  return <Settings />;
};

export default App;
