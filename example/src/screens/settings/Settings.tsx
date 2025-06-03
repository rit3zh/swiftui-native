import { AccessibilityActionEvent } from "react-native";
import React from "react";
import SwiftUI, { Color, ForEach } from "swiftui-native";
import * as constants from "../../constants";

export const Settings: React.FC = (): React.ReactNode => {
  return (
    <SwiftUI.RootView>
      <SwiftUI.NavigationView title="Settings">
        <SwiftUI.List listStyle="insetGrouped">
          <SwiftUI.Section
            optionalSubviews={<SwiftUI.Text>Profile</SwiftUI.Text>}
          >
            <SwiftUI.HStack>
              <SwiftUI.Image
                imageUrl="https://cdn.pfps.gg/pfps/2296-bocchi-gotoh-hitori.png"
                cornerRadius={90}
                width={65}
                height={65}
              />

              <SwiftUI.VStack paddingLeft={10} horizontalAlignment="leading">
                <SwiftUI.Text fontWeight="bold">{"rit3zh"}</SwiftUI.Text>
                <SwiftUI.Text font="caption" foregroundColor={Color.Gray}>
                  {"Mange your Apple ID"}
                </SwiftUI.Text>
              </SwiftUI.VStack>

              <SwiftUI.Spacer />
              <SwiftUI.Image
                systemIconName="chevron.right"
                width={15}
                height={15}
                foregroundColor="#cfcfcf"
                paddingRight={10}
              />
            </SwiftUI.HStack>
          </SwiftUI.Section>

          {ForEach(constants.settings, (item, index) => (
            <SwiftUI.Section
              key={index}
              sectionFooter={<SwiftUI.Text>{item.section.footer}</SwiftUI.Text>}
              optionalSubviews={
                <SwiftUI.Label
                  text={item.section.name}
                  systemIconName={item.section.icon}
                />
              }
            >
              {ForEach(item.data, (setting, idx) => (
                <SwiftUI.Button key="" foregroundColor="">
                  <SwiftUI.HStack key={idx}>
                    <SwiftUI.ActionSymbol
                      systemIconName={setting.image}
                      actionBackgroundColor={setting.color}
                      backgroundHeight={30}
                      backgroundWidth={30}
                      cornerRadius={6.5}
                      size={15}
                    />
                    <SwiftUI.Text paddingLeft={15}>{setting.name}</SwiftUI.Text>
                    <SwiftUI.Spacer />
                    <SwiftUI.Image
                      systemIconName="chevron.right"
                      width={15}
                      height={15}
                      foregroundColor="#cfcfcf"
                      paddingRight={10}
                    />
                  </SwiftUI.HStack>
                </SwiftUI.Button>
              ))}
            </SwiftUI.Section>
          ))}
        </SwiftUI.List>
      </SwiftUI.NavigationView>
    </SwiftUI.RootView>
  );
};
