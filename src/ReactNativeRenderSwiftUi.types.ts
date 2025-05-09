import { ViewProps } from "react-native";
import type { SFSymbol } from "./types/sf-symbols/index";
export type SwiftUiEvent = any;
export interface ReactNativeRenderSwiftUiViewProps extends ViewProps {
  data: SwiftUiJson | string;
  onEvent?: (event: { nativeEvent: SwiftUiEvent }) => void;
}

type SwiftUIViewType =
  | "Image"
  | "Text"
  | "LazyHStack"
  | "LazyVStack"
  | "HStack"
  | "VStack"
  | "ZStack"
  | "Rectangle"
  | "Circle"
  | "Spacer"
  | "Divider"
  | "ScrollView"
  | "ContentUnavailableView"
  | "NavigationLink"
  | "ContextMenu"
  | "DisclosureGroup"
  | "TextInput"
  | "NaviagtionSplitView"
  | "Label"
  | "ReactChildView"
  | "List"
  | "PopoverView"
  | "SheetView"
  | "MaksView"
  | "Section"
  | "ToolbarItemGroup"
  | "NavigationView"
  | "MeshGradient"
  | "ActionSymbol"
  | "Stepper"
  | "ColorPicker"
  | "DatePicker";

type FontStyle =
  | "largeTitle"
  | "title"
  | "headline"
  | "subheadline"
  | "body"
  | "callout"
  | "footnote"
  | "caption";

type ListStyle =
  | "automatic"
  | "inset"
  | "insetGrouped"
  | "grouped"
  | "sidebar"
  | "plain";

type HoverEffect = "automatic" | "highlight" | "lift";

type FontWeight =
  | "ultraLight"
  | "thin"
  | "light"
  | "regular"
  | "medium"
  | "semibold"
  | "bold"
  | "heavy"
  | "black";

export type ToolbarPlacement =
  | "automatic"
  | "bottomBar"
  | "topBarLeading"
  | "topBarTrailing"
  | "status"
  | "cancellationAction"
  | "confirmationAction"
  | "destructiveAction"
  | "navigation"
  | "principal"
  | "primary";

type TitleDisplayMode = "automatic" | "large" | "inline";

type ScrollViewAxis = "vertical" | "horizontal";

type VerticalAlignment =
  | "top"
  | "bottom"
  | "center"
  | "firstTextBaseline"
  | "lastTextBaseline";

type HorizontalAlignment = "leading" | "center" | "trailing";

type MultilineTextAlignment = "leading" | "center" | "trailing";
export interface SwiftUIViewValues {
  text?: string;
  imageUrl?: string;
  systemIconName?: SFSymbol;
  localImageName?: string;
  title?: string;
  placeholder?: string;
  description?: string;
  role?: string;
  index?: number;
  key?: string;
  json?: string;

  date?: string;
  minDate?: string;
  maxDate?: string;
  datePickerStyle?: string;
  labelHidden?: boolean;
  formStyle?: string;
  lineSpacing?: number;
  lineLimit?: number;
  textEditorStyle?: string;
  toggleStyle?: string;
  isOn?: boolean;
  textFieldStyle?: string;
}

export interface SwiftUIViewProperties {
  font?: FontStyle;
  fontWeight?: FontWeight;
  foregroundColor?: string;
  borderColor?: string;
  borderType?: string;
  borderWidth?: number;
  padding?: number;
  spacing?: number;
  width?: number;
  height?: number;
  minLength?: number;
  backgroundColor?: string;
  tint?: string;
  multilineTextAlignment?: MultilineTextAlignment;
  overlayColor?: string;
  horizontalAlignment?: HorizontalAlignment;
  verticalAlignment?: VerticalAlignment;
  axis?: ScrollViewAxis;
  showsIndicators?: boolean;
  titleDisplayMode?: TitleDisplayMode;
  navigationBarHidden?: boolean;
  ignoreSafeArea?: boolean;
  listStyle?: ListStyle;
  hoverEffect?: HoverEffect;
  toolbarPlacement?: ToolbarPlacement;
  accessibilityHint?: string;
  accessibilityValue?: string;
  accessibilityLabel?: string;
  accessibilityIdentifier?: string;
  enableMarkdown?: boolean;
  colors?: string[];
  points?: number[][];
  rows?: number;
  columns?: number;
  smoothsColors?: boolean;
  ignoresSafeArea?: boolean;
  size?: number;
  cornerRadius?: number;
  backgroundWidth?: number;
  backgroundHeight?: number;
  actionBackgroundColor?: string;
  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
}
export type SwiftUiJson = {
  type: SwiftUIViewType;
  properties?: SwiftUIViewProperties;
  values?: SwiftUIViewValues;
  subviews?: Array<SwiftUiJson>;
  optionalSubviews?: Array<SwiftUiJson>;
};
