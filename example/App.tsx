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
  ForEach,
  toSwiftDate,
} from "react-native-render-swift-ui";

export default function App() {
  const [selection, setSelection] = useState<number>();

  const [age, setAge] = useState<number>(10);
  const [isOn, setIsOn] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const items = [
    { id: 1, text: "Item 1" },
    { id: 2, text: "Item 2" },
  ];

  useSwiftUiEvent("onStepperChange", (data: any) => {
    setAge(data.value);
    console.log(data);
  });
  useSwiftUiEvent("onSelectionChange", (data: any) => {
    setSelection(data.selection);
    console.log(data);
  });

  useSwiftUiEvent("onToggleChange", (data: any) => {
    setIsOn(data.isOn);
  });
  const textValue: string = `je`;
  return (
    <>
      <RNSwiftUI.RootView>
        <RNSwiftUI.NavigationView toolbarPlacement="navigation" title="Form">
          <RNSwiftUI.Form>
            <RNSwiftUI.Section
              optionalSubviews={
                <RNSwiftUI.Text font="subheadline">
                  Basic Information
                </RNSwiftUI.Text>
              }
            >
              <RNSwiftUI.TextField text={text} placeholder="First Name" />

              <RNSwiftUI.TextField text={text} placeholder="Last Name" />
            </RNSwiftUI.Section>

            <RNSwiftUI.Section
              optionalSubviews={
                <RNSwiftUI.Text font="subheadline">
                  Additional Details
                </RNSwiftUI.Text>
              }
            >
              <RNSwiftUI.HStack>
                <RNSwiftUI.Text>{`Age ${age}`}</RNSwiftUI.Text>
                <RNSwiftUI.Stepper
                  step={0}
                  value={age}
                  key={"onStepperChange"}
                  minValue={10}
                  maxValue={50}
                />
              </RNSwiftUI.HStack>
              <RNSwiftUI.HStack>
                <RNSwiftUI.Text>{`Favorite Color`}</RNSwiftUI.Text>
                <RNSwiftUI.Picker
                  selection={selection!}
                  key={"onSelectionChange"}
                >
                  <RNSwiftUI.Text>Blue</RNSwiftUI.Text>
                  <RNSwiftUI.Text>Red</RNSwiftUI.Text>
                  <RNSwiftUI.Text>Yellow</RNSwiftUI.Text>
                </RNSwiftUI.Picker>
              </RNSwiftUI.HStack>

              <RNSwiftUI.HStack>
                <RNSwiftUI.Text>{`Display Full Information`}</RNSwiftUI.Text>
                <RNSwiftUI.Toggle key={"onToggleChange"} isOn={isOn} />
              </RNSwiftUI.HStack>
            </RNSwiftUI.Section>

            <RNSwiftUI.Section
              optionalSubviews={
                <RNSwiftUI.Text>TERMS AND CONDITION</RNSwiftUI.Text>
              }
            >
              <RNSwiftUI.Text foregroundColor="#22A7F0">
                Read Terms & Conditions
              </RNSwiftUI.Text>
            </RNSwiftUI.Section>

            <RNSwiftUI.Button key="onSubmit">
              <RNSwiftUI.HStack>
                <RNSwiftUI.Spacer />
                <RNSwiftUI.Text foregroundColor="#ff3b30">
                  Submit
                </RNSwiftUI.Text>
                <RNSwiftUI.Spacer />
              </RNSwiftUI.HStack>
            </RNSwiftUI.Button>
          </RNSwiftUI.Form>
        </RNSwiftUI.NavigationView>
      </RNSwiftUI.RootView>
    </>
  );
}
