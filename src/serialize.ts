import React from "react";
import { SwiftUIViewPropertieKeys, SwiftUIViewValueKeys } from "./CONSTS";

interface Searchable {
  prompt?: string;
}
interface SerializedElement {
  type: string;
  properties: {
    [key: string]: any;
  };
  subviews: SerializedElement[];
  sectionFooter?: SerializedElement[];
  optionalSubviews: SerializedElement[];
  leadingSwipeActions?: SerializedElement[];
  trailingSwipeActions?: SerializedElement[];
  scopes?: SerializedElement[];
  trailingSwipeActionFullSwipeEnable?: boolean;
  leadingSwipeActionFullSwipeEnable?: boolean;
  values: {
    [key: string]: any;
  };
  role?: string;
  selection?: number;
  pickerStyle?: string;
  isExpandable?: string;
  enableEditing?: boolean;
  value?: number;
  minValue?: number;
  maxValue?: number;

  gaugeStyle?: string;
  currentValueLabel?: SerializedElement[];
  searchSuggestions?: SerializedElement[];
  minimumValueLabel?: SerializedElement[];
  maximumValueLabel?: SerializedElement[];
  items?: any[];
  step?: number;
  tint?: string;
  searchable?: Searchable;
}

const filterObjByKeysArray = (
  dictionary: { [key: string]: any },
  keysToKeep: string[]
): { [key: string]: any } => {
  return Object.fromEntries(
    Object.entries(dictionary).filter(([key]) => keysToKeep.includes(key))
  );
};

const serializeReactElement = (
  element: React.ReactNode
): SerializedElement | null => {
  if (!React.isValidElement(element)) {
    return null;
  }

  const { type, props, key } = element;

  const regexPattern = /\b\w+\b/g;
  const typeMatch = type.toString().match(regexPattern);
  const filteredProperties = filterObjByKeysArray(
    props,
    SwiftUIViewPropertieKeys
  );
  const filteredValues = filterObjByKeysArray(props, SwiftUIViewValueKeys);
  const serializedOptionalSubViews =
    (props.optionalSubviews &&
      React.Children.toArray(props.optionalSubviews).map((child) =>
        serializeReactElement(child)
      )) ||
    [];

  const serializedSectionFooter =
    (props.sectionFooter &&
      React.Children.toArray(props.sectionFooter).map((child) =>
        serializeReactElement(child)
      )) ||
    [];
  const serializeScopes =
    (props.scopes &&
      React.Children.toArray(props.scopes).map((child) =>
        serializeReactElement(child)
      )) ||
    [];

  const currentValueLabel =
    (props.currentValueLabel &&
      React.Children.toArray(props.currentValueLabel).map((child) =>
        serializeReactElement(child)
      )) ||
    [];
  const minimumValueLabel =
    (props.minimumValueLabel &&
      React.Children.toArray(props.minimumValueLabel).map((child) =>
        serializeReactElement(child)
      )) ||
    [];
  const maximumValueLabel =
    (props.minimumValueLabel &&
      React.Children.toArray(props.maximumValueLabel).map((child) =>
        serializeReactElement(child)
      )) ||
    [];

  const serializedOLeadingSwipeActions =
    (props.leadingSwipeActions &&
      React.Children.toArray(props.leadingSwipeActions).map((child) =>
        serializeReactElement(child)
      )) ||
    [];

  const serializedOtrailingSwipeActions =
    (props.trailingSwipeActions &&
      React.Children.toArray(props.trailingSwipeActions).map((child) =>
        serializeReactElement(child)
      )) ||
    [];
  const serializedSubViews =
    (props.children &&
      React.Children.toArray(props.children).map((child) =>
        serializeReactElement(child)
      )) ||
    [];
  const serializedSearchSuggestions =
    (props.searchSuggestions &&
      React.Children.toArray(props.searchSuggestions).map((child) =>
        serializeReactElement(child)
      )) ||
    [];
  if (
    typeof element.props.children === "string" ||
    typeof element.props.children === "number"
  ) {
    return {
      type: typeMatch?.[1] || "",
      properties: filteredProperties || {},
      values: {
        ...filteredValues,
        text: element.props.children,
        role: element.props.role,
      },
      subviews: [],
      optionalSubviews: [],
      sectionFooter: serializedSectionFooter,
      scopes: serializeScopes,
      leadingSwipeActions: serializedOLeadingSwipeActions,
      trailingSwipeActions: serializedOtrailingSwipeActions,
      role: props.role,
      selection: props.selection,
      leadingSwipeActionFullSwipeEnable:
        props.leadingSwipeActionFullSwipeEnable,
      trailingSwipeActionFullSwipeEnable:
        props.trailingSwipeActionFullSwipeEnable,
      pickerStyle: props.pickerStyle,
      isExpandable: props.isExpandable,
      enableEditing: props.enableEditing,
      minValue: props.minValue,
      maxValue: props.maxValue,
      value: props.value,
      currentValueLabel,
      maximumValueLabel,
      minimumValueLabel,
      gaugeStyle: props.gaugeStyle,
      step: props.step,
      tint: props.tint,
      searchable: props.searchable,
      searchSuggestions: serializedSearchSuggestions,
    };
  } else {
    return {
      type: typeMatch?.[1] || "",
      properties: filteredProperties,
      values: { ...filteredValues, key: key },
      subviews: serializedSubViews || [],
      optionalSubviews: serializedOptionalSubViews || [],
      leadingSwipeActions: serializedOLeadingSwipeActions || [],
      trailingSwipeActions: serializedOtrailingSwipeActions || [],
      leadingSwipeActionFullSwipeEnable:
        props.leadingSwipeActionFullSwipeEnable,
      trailingSwipeActionFullSwipeEnable:
        props.trailingSwipeActionFullSwipeEnable,
      role: props.role,
      selection: props.selection,
      pickerStyle: props.pickerStyle,
      sectionFooter: serializedSectionFooter,
      isExpandable: props.isExpandable,
      enableEditing: props.enableEditing,
      gaugeStyle: props.gaugeStyle,
      searchSuggestions: serializedSearchSuggestions,

      minValue: props.minValue,
      maxValue: props.maxValue,
      value: props.value,
      step: props.step,
      currentValueLabel,
      maximumValueLabel,
      scopes: serializeScopes,
      minimumValueLabel,
      tint: props.tint,
      searchable: props.searchable,
    };
  }
};

export default serializeReactElement;
