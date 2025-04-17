import { View, Text, SafeAreaView, useColorScheme, Alert } from "react-native";
import React, { useRef, useState } from "react";
import SwiftUI, { RNSwiftUI, useSwiftUiEvent, ForEach } from "swiftui-native";
import { EventNameKeys, EventTypes } from "../../keys/EventNameKeys";

interface TodoProps {
  name: string;
  isDone: boolean;
}

export const Todo: React.FC = (): React.ReactNode & React.JSX.Element => {
  const [name, setName] = useState<string>("Todo");
  const [todoListValue, setTodoListValue] = useState<number>(0);
  const previousValue = useRef(0);
  const [isSectionExpanded, setIsSectionExpanded] = useState<boolean>(false);
  const colorScheme = useColorScheme();
  const [todo, setTodo] = useState<TodoProps[]>([]);
  useSwiftUiEvent(EventNameKeys.onChangeText, (data: any) => {
    setName(data.text);
  });

  useSwiftUiEvent(EventNameKeys.onSectionExpand, (data: any) => {
    setIsSectionExpanded((prev) => !prev);
  });

  useSwiftUiEvent(EventNameKeys.OnStepperChange, (data: any) => {
    const current = data.value;
    const prev = previousValue.current;

    setTodoListValue(current);

    if (current > prev) {
      addTodo();
    } else if (current < prev) {
      updateLastTodo();
    }

    previousValue.current = current;
  });
  const updateLastTodo = () => {
    setTodo((prev) => prev.slice(0, -1));
  };
  const addTodo = () => {
    const newTodo = {
      name: name,
      isDone: false,
    };
    setTodo((prev) => [...prev, newTodo]);
  };

  useSwiftUiEvent(`markAsDone`, (data: any) => {
    const index = data?.index;
    const updatedTodo = [...todo];
    updatedTodo[index].isDone = !updatedTodo[index].isDone;
    setTodo(updatedTodo);
  });

  useSwiftUiEvent("deleteAllTodo", () => {
    Alert.alert(
      "Delete All Todos",
      "Are you sure you want to delete all your todos? This action cannot be undone.",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          isPreferred: false,
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteAllTodo();
          },
        },
      ]
    );
  });

  const deleteAllTodo = () => {
    setTodo([]);
  };

  return (
    <SwiftUI.RootView style={{ flex: 1 }}>
      <SwiftUI.NavigationView title="Todo">
        <SwiftUI.List listStyle="sidebar">
          <SwiftUI.Section
            optionalSubviews={
              <SwiftUI.Label
                systemIconName="note"
                text="Give your To-Do task a name"
              />
            }
          >
            <SwiftUI.TextField
              text={String()}
              placeholder="Name"
              key={EventNameKeys.onChangeText}
            />
          </SwiftUI.Section>

          <SwiftUI.CollapsibleSection
            isExpandable={isSectionExpanded}
            key={EventNameKeys.onSectionExpand}
            optionalSubviews={
              <SwiftUI.Label
                systemIconName="checkmark.circle"
                text="Todo List"
                font="subheadline"
              />
            }
          >
            <RNSwiftUI.ContextMenu
              optionalSubviews={
                <SwiftUI.Button key={`markAsDone`}>
                  <SwiftUI.Label
                    systemIconName="checkmark"
                    text={"Mark as Done"}
                    font="subheadline"
                    foregroundColor="#fff"
                  />
                </SwiftUI.Button>
              }
            >
              {ForEach(todo, (element, index) => {
                return (
                  <RNSwiftUI.Label
                    key={index.toString()}
                    systemIconName={element.isDone ? "checkmark" : "xmark"}
                    foregroundColor="#fff"
                    text={element.name}
                  />
                );
              })}
            </RNSwiftUI.ContextMenu>
          </SwiftUI.CollapsibleSection>

          <SwiftUI.Section>
            <SwiftUI.Stepper
              step={0}
              minValue={0}
              maxValue={10}
              value={todoListValue}
              key={EventNameKeys.OnStepperChange}
              title="Add a Todo"
            />
          </SwiftUI.Section>
          <SwiftUI.HStack foregroundColor="#eb4034">
            <SwiftUI.Spacer />
            <SwiftUI.Button key="deleteAllTodo">
              <SwiftUI.Text width={150}>Delete all todo</SwiftUI.Text>
            </SwiftUI.Button>
            <SwiftUI.Spacer />
          </SwiftUI.HStack>
        </SwiftUI.List>
      </SwiftUI.NavigationView>
    </SwiftUI.RootView>
  );
};
