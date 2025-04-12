import * as React from "react";
import serializeReactElement from "../serialize";
import { SwiftUiEvent, SwiftUiJson } from "../ReactNativeRenderSwiftUi.types";
import { useState } from "react";
import { ViewStyle } from "react-native";
import { RNSwiftUIJsonView } from "../ReactNativeRenderSwiftUiView";
import { handleSwiftUiEvent } from "../utils/swiftUiEventManager";

export interface RootViewProps {
  children: React.ReactElement;
  reactViews?: React.ReactNode[];
  style?: ViewStyle;
  onSwiftUIEvent?: (event: { nativeEvent: SwiftUiEvent }) => void;
}

/**
 * Creates an RNSwiftUIView in which RNSwiftUI elements can be rednered
 *
 * @remarks
 * This component must be in a parent view with the ViewProp *flex:1*
 *
 * @param children - The RNSwiftUI Elements to display
 * @param reactViews - An array of React Components that can be used in Swift UI
 * @param onSwiftUIEvent - Is triggered on Swift UI Event
 * @extends SwiftUIViewProperties
 *
 *
 *
 */

export const RootView = (props: RootViewProps) => {
  const [data, setData] = useState<SwiftUiJson>({
    type: "ContentUnavailableView",
    values: {
      text: "please Add a subview",
      systemIconName: "x.squareroot",
      title: "Error",
      description: "Test",
      role: "cancel",
    },
  });
  const handleParseJSX = () => {
    const serializedTree = serializeReactElement(props.children);
    setData(serializedTree as SwiftUiJson);
  };

  React.useEffect(() => {
    handleParseJSX();
  }, [props.children]);
  return (
    <RNSwiftUIJsonView
      onEvent={({ nativeEvent }) => handleSwiftUiEvent(nativeEvent)}
      //   onEvent={props.onSwiftUIEvent}
      style={{ ...props.style, flex: 1 }}
      data={data}
    >
      {props.reactViews}
    </RNSwiftUIJsonView>
  );
};
