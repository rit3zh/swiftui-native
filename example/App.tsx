import React from "react";
import SwiftUI, {
  Color,
  SwiftUIEvent,
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
  return (
    <SwiftUI.RootView>
      <SwiftUI.PopoverView
        optionalSubviews={[
          <SwiftUI.List
            trailingSwipeActions={[
              <SwiftUI.ListButton
                role="cancel"
                tint="#000000"
                systemIconName="sparkle"
                text=""
                backgroundColor="#000000"
              />,
              <SwiftUI.ListButton
                role="cancel"
                tint="#000000"
                systemIconName="sparkle.magnifyingglass"
                text=""
                backgroundColor="#000000"
              />,
              <SwiftUI.ListButton
                role="cancel"
                tint="#000000"
                systemIconName="sparkles"
                text=""
                backgroundColor="#000000"
              />,
            ]}
            width={420}
            height={230}
            listStyle="plain"
            paddingTop={15}
          >
            <SwiftUI.HStack>
              <SwiftUI.Image
                systemIconName="applelogo"
                width={45}
                height={45}
                foregroundColor={Color.White}
              />
              <SwiftUI.VStack horizontalAlignment="leading">
                <SwiftUI.Text
                  paddingLeft={20}
                  foregroundColor="#ffffff"
                  fontWeight="bold"
                  font="title"
                  paddingBottom={5}
                >
                  SwiftUI Popover
                </SwiftUI.Text>
                <SwiftUI.Text
                  paddingLeft={20}
                  foregroundColor="#ffffff"
                  font="subheadline"
                >
                  A longer message with potentially more text to display
                </SwiftUI.Text>
              </SwiftUI.VStack>
            </SwiftUI.HStack>
            <SwiftUI.HStack>
              <SwiftUI.Button
                key="red"
                paddingLeft={60}
                foregroundColor={Color.Blue}
              >
                <SwiftUI.Text>Do something</SwiftUI.Text>
              </SwiftUI.Button>
            </SwiftUI.HStack>
            <SwiftUI.HStack>
              <SwiftUI.Button
                key="red"
                paddingLeft={60}
                foregroundColor={Color.Blue}
              >
                <SwiftUI.Text>Do something</SwiftUI.Text>
              </SwiftUI.Button>
            </SwiftUI.HStack>
          </SwiftUI.List>,
        ]}
      >
        <SwiftUI.Label
          text="SUGGEST ME A TIP"
          systemIconName="questionmark"
          foregroundColor={Color.Blue}
        />
      </SwiftUI.PopoverView>
    </SwiftUI.RootView>
  );
};

export default App;
