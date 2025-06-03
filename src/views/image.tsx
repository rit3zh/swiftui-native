import * as React from "react";
import { SwiftUIViewProperties } from "../ReactNativeRenderSwiftUi.types";
import { SFSymbol } from "../types/sf-symbols";

export interface ImageProps<T = unknown> extends SwiftUIViewProperties {
  /** SF Symbol name to display as an icon */
  systemIconName?: SFSymbol;
  /** Name of the local image asset to display */
  localImageName?: string;
  /** URL of the remote image to display */
  imageUrl?: string;

  /** Dynamic value passed to symbolEffect for animation triggering */

  /** @requires iOS 17.0 or later
   *  Optional value to control symbol effects like rotation or scaling
   * */
  symbolEffectName?: string;
  symbolEffectValue?: T;
}

/**
 * A SwiftUI image component for displaying various types of images.
 *
 * @remarks
 * This component must be used as a child of SwiftUI.RootView.
 * Supports three types of images:
 * - SF Symbols (system icons)
 * - Local image assets
 * - Remote images from URLs
 *
 * @example
 * ```tsx
 * // Using SF Symbol
 * <Image systemIconName="star.fill" />
 *
 * // Using local image
 * <Image localImageName="profile" />
 *
 * // Using remote image
 * <Image imageUrl="https://example.com/image.jpg" />
 *
 * // With symbol effect value
 * <Image systemIconName="heart.fill" symbolEffectValue={someBoolean} />
 * ```
 *
 * @param props - The image properties
 * @prop {systemIconName} - The SF Symbol name to display as an icon
 * @param {localImageName} - The name of the local image asset to display
 * @param {imageUrl} - The URL of the remote image to display
 * @param {symbolEffectValue} - Optional value to control symbol effects like rotation or scaling
 *
 * @extends SwiftUIViewProperties
 */
export const Image = <T,>(props: ImageProps<T>): null => {
  return null;
};

export default Image;
