import React from "react";
import { Contacts, GoalScreen, Playlist, Settings } from "./src/screens";
import SwiftUI from "swiftui-native";

const App: React.FunctionComponent = (): React.ReactNode => {
  return (
    <SwiftUI.RootView>
      <SwiftUI.List>
        <SwiftUI.CollapsibleSection
          optionalSubviews={<SwiftUI.Text>Section 1</SwiftUI.Text>}
          isExpandable={true}
        >
          <SwiftUI.Text>Section 1 Content</SwiftUI.Text>
        </SwiftUI.CollapsibleSection>
      </SwiftUI.List>
    </SwiftUI.RootView>
  );
};

export default App;
