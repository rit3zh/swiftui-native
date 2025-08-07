import { AccessibilityActionEvent, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import SwiftUI, {
  Color,
  ForEach,
  SwiftUIEvent,
  useSwiftUiEvent,
} from "swiftui-native";
import * as constants from "../../constants";

export const Settings: React.FC = (): React.ReactNode => {
  const [text, setText] = useState<string>("");
  useSwiftUiEvent<SwiftUIEvent.ChangeText, any>(
    SwiftUIEvent.ChangeText,
    (event) => {
      setText(event.text);
    }
  );

  const filteredSettings = constants.settings
    .map((item) => ({
      ...item,
      data: item.data.filter((setting) =>
        setting.name.toLowerCase().includes(text.toLowerCase())
      ),
    }))
    .filter((item) => item.data.length > 0);

  return (
    <SwiftUI.RootView>
      <SwiftUI.NavigationView
        title="Settings"
        searchable={{
          placeholder: "Search Settings",
          tint: Color.Red,
          initialText: text,
        }}
      >
        <SwiftUI.List listStyle="automatic">
          {text.length > 0 ? null : (
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
          )}

          {filteredSettings.length === 0 ? (
            <SwiftUI.ContentUnavailableView
              title="No results!"
              systemIconName="magnifyingglass"
              paddingTop={300}
              description="Maybe you made a error in the search input"
              backgroundHeight={200}
            />
          ) : (
            ForEach(filteredSettings, (item, index) => (
              <SwiftUI.Section
                key={index}
                sectionFooter={
                  <SwiftUI.Text>{item.section.footer}</SwiftUI.Text>
                }
                optionalSubviews={
                  <SwiftUI.Label
                    text={item.section.name}
                    systemIconName={item.section.icon}
                  />
                }
              >
                {ForEach(item.data, (setting, idx) => (
                  <SwiftUI.Button key={setting.name} foregroundColor="">
                    <SwiftUI.HStack key={idx}>
                      <SwiftUI.ActionSymbol
                        systemIconName={setting.image}
                        actionBackgroundColor={setting.color}
                        backgroundHeight={30}
                        backgroundWidth={30}
                        cornerRadius={6.5}
                        size={15}
                      />
                      <SwiftUI.Text paddingLeft={15}>
                        {setting.name}
                      </SwiftUI.Text>
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
            ))
          )}
        </SwiftUI.List>
      </SwiftUI.NavigationView>
    </SwiftUI.RootView>
  );
};
