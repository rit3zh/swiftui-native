// interface/button/ListButton.ts

/**
 * Describes the basic payload returned when a ListButton is pressed.
 */
export interface ListButtonPressPayload {
  /**
   * Index of the item in the list.
   */
  index: number;

  /**
   * Title or label of the list item.
   */
  title: string;

  /**
   * (Optional) Context object — attach anything else related to the item.
   */
  context?: Record<string, any>;
}

/**
 * Props interface for handling ListButton events.
 *
 * @template T - Optional payload shape extension for strong typing.
 */
export interface ListButtonEventProps<
  T extends ListButtonPressPayload = ListButtonPressPayload,
> {
  /**
   * Callback triggered when a ListButton is pressed.
   */
  onListButtonPress: ListButtonPressPayload;
}
