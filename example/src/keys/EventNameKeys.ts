export enum EventNameKeys {
  onChangeText = "onChangeText",
  onSectionExpand = "onSectionExpand",
  OnStepperChange = "OnStepperChange",
}
export interface EventTypes {
  [EventNameKeys.onChangeText]: {
    text: string;
  };
}
export type EventName = keyof EventTypes;
