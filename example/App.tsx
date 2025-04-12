import { useState } from "react";
import { ActivityIndicator, Text, Button, Share } from "react-native";
import {
  RNSwiftUI,
  useSwiftUiEvent,
  EventTypes,
  SwiftUIEvent,
  ListButtonPressPayload,
  ListButtonEventProps,
  GaugeStyle,
  ButtonRole,
} from "react-native-render-swift-ui";

export default function App() {
  useSwiftUiEvent<"onListButtonPress", ListButtonEventProps>(
    "onListButtonPress",
    (props) => {
      console.log(props);
    }
  );

  return (
    <>
      <RNSwiftUI.RootView>
        <RNSwiftUI.List
          leadingSwipeActionFullSwipeEnable={true}
          leadingSwipeActions={[
            <RNSwiftUI.ListButton
              role={ButtonRole.Cancel}
              systemIconName="trash"
              text="Delete"
            />,
            <RNSwiftUI.ListButton
              role={ButtonRole.Cancel}
              systemIconName="archivebox.circle"
              text="Archive"
              tint="#000000"
            />,
          ]}
        >
          <RNSwiftUI.Gauge
            gaugeStyle={GaugeStyle.AccessoryLinearCapacity}
            key={"we"}
            value={4}
            currentValueLabel={
              <RNSwiftUI.Label text="a" systemIconName="0.circle" />
            }
          >
            <RNSwiftUI.Text>hellow</RNSwiftUI.Text>
          </RNSwiftUI.Gauge>
        </RNSwiftUI.List>
      </RNSwiftUI.RootView>
    </>
  );
}
