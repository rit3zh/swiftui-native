// interface/button/ListButton.ts

/**
 * Describes the basic payload returned when a ListButton is pressed.
 */
export interface TouchablePressPayload {
  /**
   * Index of the item in the list.
   */
  index: number;

  /**
   * Title or label of the list item.
   */
  menuIndex: string | string;

  /**
   * (Optional) Context object — attach anything else related to the item.
   */
  context?: Record<string, any>;

  /**
   * (Optional) Initial index for the item, useful for tracking the first item.
   */
  initialIndex?: number;
}

/**
 * Props interface for handling ListButton events.
 *
 * @template T - Optional payload shape extension for strong typing.
 */
export interface TouchableEventProps<
  T extends TouchablePressPayload = TouchablePressPayload
> {
  /**
   * Callback triggered when a ListButton is pressed.
   */
  onPress: TouchablePressPayload;
}
