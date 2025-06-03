import React from "react";
import { Contacts, GoalScreen, Playlist, Settings } from "./src/screens";
import SwiftUI, {
  HStack,
  Image,
  List,
  SwiftUIEvent,
  Text,
  TouchableEventProps,
  useSwiftUiEvent,
} from "swiftui-native";
import { Appearance } from "react-native";

Appearance.setColorScheme("dark");

const App: React.FunctionComponent = (): React.ReactNode => {
  useSwiftUiEvent<SwiftUIEvent.OnPress, TouchableEventProps>(
    SwiftUIEvent.OnPress,
    (e) => {
      console.log(e);
    }
  );
  return <Settings />;
};

export default App;
