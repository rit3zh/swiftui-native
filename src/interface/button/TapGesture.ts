// interface/button/TapGesture.ts

/**
 * Represents an empty or basic payload when a tappable element is triggered.
 */
export interface TapGesturePayload {
  // You can extend this if needed in the future
}

/**
 * Event props for components that respond to tap gestures, like Pressable or ListButton.
 *
 * @template T - The payload structure sent with the tap event.
 */
export interface TapGestureEventProps<
  T extends TapGesturePayload = TapGesturePayload,
> {
  /**
   * Handler called when the element is tapped.
   */
  onTapGesture?: (payload: T) => void;
}
