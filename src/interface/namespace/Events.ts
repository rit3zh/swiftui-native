export namespace EventTypes {
  export interface PickerPayloadType {
    selection: number;
  }

  export enum Events {
    /**
     * 🎯 Picker Selection Event
     *
     * This is the default event name triggered when the Picker selection changes.
     *
     * 👉 You can **customize the event name** by changing the `key` prop on your Picker.
     *
     * @default "onSelectionChange"
     *
     * @example
     * ```jsx
     * <Picker key="coolEvent" />
     * // The event emitted will now be "coolEvent" instead of "onSelectionChange"
     * ```
     *
     * This gives you the flexibility to listen to specific events uniquely tied to your Picker instance.
     */
    PickerSelectionChange = "onSelectionChange",
  }

  export interface PickerEventType {
    onSelectionChange: PickerPayloadType;
  }
}
