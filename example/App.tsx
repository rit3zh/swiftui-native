import React from "react";
import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Contacts, Playlist, Settings } from "./src/screens";
const { Navigator, Screen } = createNativeStackNavigator();

const App: React.FunctionComponent = (): React.ReactNode => {
  return <Playlist />;
};

export default App;
