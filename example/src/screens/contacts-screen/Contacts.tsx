import {
  View,
  Text,
  SafeAreaView,
  useColorScheme,
  Alert,
  Image,
} from "react-native";
import React from "react";
import SwiftUI, {
  useSwiftUiEvent,
  ForEach,
  SwiftUIEvent,
} from "swiftui-native";
import * as constants from "../../constants";
import { groupContactsAlphabetically } from "../../utils/index";
export const Contacts: React.FC = (): React.ReactNode & React.JSX.Element => {
  const groupedContacts = groupContactsAlphabetically(constants.contacts);

  useSwiftUiEvent(SwiftUIEvent.SwipeAction, (data: any) => {
    console.log(data);
  });

  return (
    <SwiftUI.RootView>
      <SwiftUI.NavigationView title="Contacts">
        <SwiftUI.List
          listStyle="inset"
          trailingSwipeActionFullSwipeEnable
          trailingSwipeActions={[
            <SwiftUI.ListButton
              systemIconName="trash"
              key={SwiftUIEvent.SwipeAction}
              role="destructive"
              text=""
            />,
          ]}
        >
          {ForEach(Object.keys(groupedContacts), (group, index) => {
            const groupItems = groupedContacts[group];
            return (
              <SwiftUI.Section
                key={index}
                optionalSubviews={<SwiftUI.Text>{group}</SwiftUI.Text>}
              >
                {ForEach(groupItems, (contact, idx) => (
                  <SwiftUI.HStack key={idx}>
                    <SwiftUI.Image
                      imageUrl={contact.image}
                      width={50}
                      height={50}
                    />
                    <SwiftUI.Text paddingLeft={10}>{contact.name}</SwiftUI.Text>
                  </SwiftUI.HStack>
                ))}
              </SwiftUI.Section>
            );
          })}
        </SwiftUI.List>
      </SwiftUI.NavigationView>
    </SwiftUI.RootView>
  );
};
