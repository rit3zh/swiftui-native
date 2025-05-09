import React from "react";
import { Contacts, GoalScreen, Playlist, Settings } from "./src/screens";
import SwiftUI, { useSwiftUiEvent } from "swiftui-native";

const App: React.FunctionComponent = (): React.ReactNode => {
  useSwiftUiEvent("onEditToggle", (e) => {
    console.log(e);
  });
  return (
    <SwiftUI.RootView>
      <SwiftUI.NavigationView title="Example">
        <SwiftUI.List
          listStyle="sidebar"
          leadingSwipeActionFullSwipeEnable
          trailingSwipeActionFullSwipeEnable
          trailingSwipeActions={[
            <SwiftUI.ListButton
              role="cancel"
              systemIconName="0.circle"
              text="red"
            />,
          ]}
          enableEditing={false}
        >
          <SwiftUI.CollapsibleSection
            isExpandable={true}
            optionalSubviews={[<SwiftUI.Text>Optional Subview</SwiftUI.Text>]}
          >
            <SwiftUI.Text>Hello</SwiftUI.Text>
            <SwiftUI.Text>Hello</SwiftUI.Text>
            <SwiftUI.Text>Hello</SwiftUI.Text>
            <SwiftUI.Text>Hello</SwiftUI.Text>
            <SwiftUI.Text>Hello</SwiftUI.Text>
            <SwiftUI.Text>Hello</SwiftUI.Text>
          </SwiftUI.CollapsibleSection>
        </SwiftUI.List>
      </SwiftUI.NavigationView>
    </SwiftUI.RootView>
  );
};

export default App;
