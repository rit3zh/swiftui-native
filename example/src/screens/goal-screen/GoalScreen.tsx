import { View, Text, useWindowDimensions } from "react-native";
import React from "react";
import SwiftUI, {
  Color,
  ForEach,
  SystemColor,
  useSwiftUiEvent,
  SwiftUIEvent,
} from "swiftui-native";
import * as constants from "../../constants";

export function GoalScreen<T>() {
  const IMAGE_URL: string = `https://i.pinimg.com/1200x/45/17/41/4517418ab0905a04e1c9bd3dd45b694b.jpg`;
  const { width, height } = useWindowDimensions();
  const [isExpanded, setIsExpanded] = React.useState(false);

  const IMAGE_WIDTH = width * 0.9;
  const IMAGE_HEIGHT = 250;

  useSwiftUiEvent("onExapand", (data: any) => {
    console.log(data);
    setIsExpanded(!isExpanded);
  });

  return (
    <SwiftUI.RootView>
      <SwiftUI.NavigationView title="Goals">
        <SwiftUI.ScrollView>
          <SwiftUI.ToolbarItemGroup toolbarPlacement="navigation">
            <SwiftUI.ActionSymbol
              systemIconName="star"
              foregroundColor={Color.Yellow}
              backgroundHeight={30}
              backgroundWidth={30}
              actionBackgroundColor={SystemColor.SecondarySystemFill}
              cornerRadius={100}
              size={10}
            />
          </SwiftUI.ToolbarItemGroup>
          <SwiftUI.CollapsibleSection
            isExpandable={isExpanded}
            optionalSubviews={
              <SwiftUI.HStack>
                <SwiftUI.Spacer />
                <SwiftUI.Button key="onExapand">
                  <SwiftUI.Image
                    foregroundColor={Color.Blue}
                    paddingRight={10}
                    systemIconName={isExpanded ? "chevron.up" : "chevron.down"}
                    height={20}
                    width={20}
                  />
                </SwiftUI.Button>
              </SwiftUI.HStack>
            }
          >
            <SwiftUI.Image
              imageUrl={IMAGE_URL}
              width={IMAGE_WIDTH}
              height={IMAGE_HEIGHT}
            />
          </SwiftUI.CollapsibleSection>

          <SwiftUI.List
            height={Math.min(constants.goals.length * 200, height - 200)}
          >
            <SwiftUI.Section
              optionalSubviews={
                <SwiftUI.Text
                  fontWeight="bold"
                  paddingLeft={10}
                  paddingTop={10}
                  paddingBottom={10}
                >
                  Your Goals
                </SwiftUI.Text>
              }
            >
              {ForEach(constants.goals, (goal, index) => {
                return (
                  <SwiftUI.HStack
                    key={index.toString()}
                    paddingTop={10}
                    paddingBottom={10}
                  >
                    <SwiftUI.Gauge
                      minValue={0}
                      tint={goal.color}
                      currentValueLabel={[
                        <SwiftUI.Text fontWeight="bold">{`${goal.currentValue}`}</SwiftUI.Text>,
                      ]}
                      minimumValueLabel={[
                        <SwiftUI.Text font="caption">{`0`}</SwiftUI.Text>,
                      ]}
                      maximumValueLabel={[
                        <SwiftUI.Text
                          font="caption"
                          fontWeight="heavy"
                        >{`${goal.maxValue}`}</SwiftUI.Text>,
                      ]}
                      maxValue={goal.maxValue}
                      value={goal.currentValue}
                      gaugeStyle="accessoryCircular"
                    >
                      <SwiftUI.Text>2</SwiftUI.Text>
                    </SwiftUI.Gauge>
                    <SwiftUI.VStack horizontalAlignment="leading">
                      <SwiftUI.Text paddingLeft={10} fontWeight="bold">
                        {goal.title}
                      </SwiftUI.Text>
                      <SwiftUI.Text
                        paddingTop={5}
                        paddingLeft={10}
                        font="footnote"
                      >
                        {goal.description}
                      </SwiftUI.Text>
                    </SwiftUI.VStack>
                  </SwiftUI.HStack>
                );
              })}
            </SwiftUI.Section>
          </SwiftUI.List>
        </SwiftUI.ScrollView>
      </SwiftUI.NavigationView>
    </SwiftUI.RootView>
  );
}
