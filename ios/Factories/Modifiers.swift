
import SwiftUI

enum ModifierFactory {
    /// Applies Frame in case `width` & `height` is not nil.
    struct FrameModifier: ViewModifier {
        var width: CGFloat? = nil
        var height: CGFloat? = nil

        @ViewBuilder func body(content: Content) -> some View {
            content.frame(width: width, height: height)
        }
    }

    /// Applies ForegroundColor in case `foregroundColor` is not nil.
    struct ForegroundModifier: ViewModifier {
        var foregroundColor: Color?

        @ViewBuilder func body(content: Content) -> some View {
            if let foregroundColor {
                content.foregroundColor(foregroundColor)
            } else {
                content
            }
        }
    }

    struct TintColorModifier: ViewModifier {
        var tint: Color?

        @ViewBuilder func body(content: Content) -> some View {
            if let tint {
                if #available(iOS 16.0, *) {
                    content.tint(tint)
                } else {
                    content.accentColor(tint)
                }
            } else {
                content
            }
        }
    }

    /// Applies Padding for all edges in case `padding` is not nil.
    struct PaddingModifier: ViewModifier {
        var padding: CGFloat?

        @ViewBuilder func body(content: Content) -> some View {
            if let padding {
                content.padding(padding)
            } else {
                content
            }
        }
    }

    /// Applies Border in case `borderColor` & `borderWidth` is not nil.
    struct BorderModifier: ViewModifier {
        var borderColor: Color?
        var borderWidth: CGFloat?

        @ViewBuilder func body(content: Content) -> some View {
            if let borderWidth, let borderColor {
                content.border(borderColor, width: borderWidth)
            } else {
                content
            }
        }
    }

    struct BackgroundColorModifer: ViewModifier {
        var backgroundColor: Color?

        @ViewBuilder func body(content: Content) -> some View {
            if let backgroundColor {
                content.background(backgroundColor)
            } else {
                content
            }
        }
    }

    struct ColorOverlayModifer: ViewModifier {
        var color: Color?
        @ViewBuilder func body(content: Content) -> some View {
            if let color {
                content.overlay(color)
            } else {
                content
            }
        }
    }

    struct FontWeightModifer: ViewModifier {
        var fontWeightHashValue: String?
        @ViewBuilder func body(content: Content) -> some View {
            if let fontWeightHashValue, #available(iOS 17.0, *) {
                let fontWeight = Font.Weight.pick[fontWeightHashValue]
                content.fontWeight(fontWeight)
            } else {
                content
            }
        }
    }

    struct TitleDisplayModeModifer: ViewModifier {
        var titleDisplayModeHashValue: String?
        @ViewBuilder func body(content: Content) -> some View {
            if let titleDisplayModeHashValue {
                let displayMode = NavigationBarItem.TitleDisplayMode.pick[titleDisplayModeHashValue]
                content.navigationBarTitleDisplayMode(displayMode ?? .automatic)
            } else {
                content
            }
        }
    }

    struct NavigationBarHiddenModifer: ViewModifier {
        var hidden: Bool
        @ViewBuilder func body(content: Content) -> some View {
            if hidden {
                if #available(iOS 16.0, *) {
                    content.toolbar(.hidden, for: .navigationBar)
                } else {
                    content.navigationBarHidden(true)
                }
            } else {
                content
            }
        }
    }

    struct IgnoreSafeAreaModifer: ViewModifier {
        var ignore: Bool
        @ViewBuilder func body(content: Content) -> some View {
            if ignore {
                content.ignoresSafeArea(.all)
            } else {
                content
            }
        }
    }

    struct TextSelectionModifer: ViewModifier {
        var selectable: Bool
        @ViewBuilder func body(content: Content) -> some View {
            if #available(iOS 15.0, *), selectable {
                content.textSelection(.enabled)

            } else {
                content
            }
        }
    }

    struct HoverEffectModifer: ViewModifier {
        var effect: String
        @ViewBuilder func body(content: Content) -> some View {
            switch effect {
            case "highlight": content.hoverEffect(.highlight)
            case "automatic": content.hoverEffect(.automatic)
            case "lift": content.hoverEffect(.lift)
            default: content
            }
        }
    }

    struct ListStyleModifer: ViewModifier {
        var style: String
        @ViewBuilder func body(content: Content) -> some View {
            switch style {
            case "grouped": content.listStyle(.grouped)
            case "insetGrouped": content.listStyle(.insetGrouped)
            case "inset": content.listStyle(.inset)
            case "plain": content.listStyle(.plain)
            case "sidebar": content.listStyle(.sidebar)
            case "automatic": content.listStyle(.automatic)
            default: content
            }
        }
    }

    struct AccessibilityModifer: ViewModifier {
        var hint: String?
        var value: String?
        var label: String?
        var identifer: String?
        @ViewBuilder func body(content: Content) -> some View {
            content
                .accessibilityHint(hint ?? "")
                .accessibilityLabel(label ?? "")
                .accessibilityValue(value ?? "")
                .accessibilityIdentifier(identifer ?? "")
        }
    }
}


