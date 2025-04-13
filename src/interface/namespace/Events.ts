export namespace EventTypes {
  export interface PickerPayloadType {
    selection: number;
  }

  /**
   * 🎯 Event Names Enum
   *
   * These are the **default event names** emitted by components.
   *
   * 👉 You can **override any event name** by providing a custom `key` prop to the component.
   *
   * ---
   *
   * @example Override Example
   * ```jsx
   * <Picker key="customPickerKey" />
   * <Pressable key="customTapKey" />
   *
   * // Now these events will emit:
   * // { customPickerKey: { selection: 2 } }
   * // { customTapKey: {} }
   * ```
   *
   * This allows for:
   * - Scoped event handling per view
   * - Dynamic listener registration
   * - Reusability of components with unique identities
   */
  export enum Events {
    /**
     * 📌 Default Picker event
     * @default "onSelectionChange"
     */
    PickerSelectionChange = "onSelectionChange",

    /**
     * 📌 Default Tap Gesture event
     * @default "onTapGesture"
     */
    TapGesture = "onTapGesture",
  }

  export interface PickerEventType {
    onSelectionChange: PickerPayloadType;
  }

  export interface TapGestureEventType {
    onTapGesture: Record<string, never>;
  }
}
