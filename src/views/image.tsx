import React from "react";
import { SwiftUIViewProperties } from "../ReactNativeRenderSwiftUi.types";
import { SFSymbol } from "../types/sf-symbols";

export interface ImageProps extends SwiftUIViewProperties {
  /** SF Symbol name to display as an icon */
  systemIconName?: SFSymbol;
  /** Name of the local image asset to display */
  localImageName?: string;
  /** URL of the remote image to display */
  imageUrl?: string;
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
 * ```
 *
 * @param props - The image properties
 * @param props.systemIconName - SF Symbol name to display as an icon
 * @param props.localImageName - Name of the local image asset to display
 * @param props.imageUrl - URL of the remote image to display
 *
 * @extends SwiftUIViewProperties
 */
export const Image = (props: ImageProps) => {
  return null;
};

export default Image;
