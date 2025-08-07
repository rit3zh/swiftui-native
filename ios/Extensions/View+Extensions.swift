import SwiftUI

extension View {
    func embedInAnyView() -> AnyView {
        AnyView(self)
    }
    
    @ViewBuilder
    func applyIf<Content: View>(_ condition: Bool, transform: (Self) -> Content) -> some View {
        if condition {
            transform(self)
        } else {
            self
        }
    }
    
    @available(iOS 16.0, *)
    @ViewBuilder
     func conditionalScrollContentBackground(_ visibility: String?) -> some View {
         if visibility == "hidden" {
             self.scrollContentBackground(.hidden)
         } else {
             self.scrollContentBackground(.visible)
         }
     }
    
    
    
    @ViewBuilder
    func applyPickerStyle(_ style: String?) -> some View {
        if #available(iOS 14.0, *) {
            switch style?.lowercased() {
            case "segmented":
                self.pickerStyle(SegmentedPickerStyle())
            case "menu":
                self.pickerStyle(MenuPickerStyle())
            case "wheel":
                self.pickerStyle(WheelPickerStyle())
            case "inline":
                self.pickerStyle(InlinePickerStyle())
            default:
                self.pickerStyle(DefaultPickerStyle())
            }
        } else {
            self
        }
    }
    
    
    @available(iOS 16.0, *)
    @ViewBuilder
    func applyFormStyle(_ style: String?) -> some View {
        switch style?.lowercased() {
        case "columns":
            self.formStyle(.columns)
        case "grouped":
            self.formStyle(.grouped)
        case "automatic":
            self.formStyle(.automatic)
        default:
            self.formStyle(.grouped)
        }
    }
    
    
    @available(iOS 16.0, *)
    @ViewBuilder
    func applyListScrollStyle(_ style: String?) -> some View {
        switch style?.lowercased() {
        case "hidden":
            self.scrollContentBackground(.hidden)
        case "visible":
            self.scrollContentBackground(.visible)
        default:
            self.scrollContentBackground(.automatic)
        }
    }
    
    @ViewBuilder
    func applyToggleStyle(_ style: String?) -> some View {
        switch style?.lowercased() {
        case "button":
            if #available(iOS 15.0, *) {
                self.toggleStyle(.button)
            } else {
                self.toggleStyle(.automatic)
            }
        case "switch":
            self.toggleStyle(.switch)
        case "automatic":
            self.toggleStyle(.automatic)
        default:
            self.toggleStyle(.automatic)
        }
    }
    
    
    @available(iOS 17.0, *)
    @ViewBuilder
    func applyTextEdtorStyle(_ style: String?) -> some View {
        switch style?.lowercased() {
        case "automatic":
            self.textEditorStyle(.automatic)
        case "plain":
            self.textEditorStyle(.plain)
        default:
            self.textEditorStyle(.automatic)
        }
    }
    
    
    //    @available(iOS 17.0, *)
    @ViewBuilder
    func applyTextFieldStyle(_ style: String?) -> some View {
        switch style {
        case "automatic":
            self.textFieldStyle(.automatic)
        case "plain":
            self.textFieldStyle(.plain)
        case "roundedBorder":
            self.textFieldStyle(.roundedBorder)
        default:
            self.textFieldStyle(.automatic)
        }
    }
    
    
    @ViewBuilder
    func applyDatePickerStyle(_ style: String?) -> some View {
        switch style?.lowercased() {
        case "compact":
            self.datePickerStyle(CompactDatePickerStyle())
        case "wheel":
            self.datePickerStyle(WheelDatePickerStyle())
        case "graphical":
            self.datePickerStyle(GraphicalDatePickerStyle())
        default:
            self.datePickerStyle(DefaultDatePickerStyle())
        }
    }
    
    
    @ViewBuilder
    @available(iOS 16.0, *)
    func applyGaugeStyle(_ style: String?) -> some View {
        
        switch style {
        case "accessoryCircular":
            self.gaugeStyle(.accessoryCircular)
        case "accessoryLinear":
            self.gaugeStyle(.accessoryLinear)
        case "linearCapacity":
            self.gaugeStyle(.linearCapacity)
        case "accessoryLinearCapacity":
            self.gaugeStyle(.accessoryLinearCapacity)
        case "accessoryCircularCapacity":
            self.gaugeStyle(.accessoryCircularCapacity)
        default:
            self.gaugeStyle(.automatic)
        }
    }
    
    
    
    
    @available(iOS 17.0, *)
    
    @ViewBuilder
    func applySymbolEffectStyle(_ style: String?, value: EquatableAnyValue) -> some View {
        switch style {
        case "pulse":
            self.symbolEffect(.pulse, value: value)
        case "bounce":
            self.symbolEffect(.bounce, value: value)
        case "bounceInDown":
            self.symbolEffect(.bounce.down, value: value)
        case "bounceInUp":
            self.symbolEffect(.bounce.up.down, value: value)
        case "bounceByLayer":
            self.symbolEffect(.bounce.byLayer, value: value)
        case "appear":
            self.symbolEffect(.appear)
        case "appearInUp":
            self.symbolEffect(.appear.up)
        case "appearInDown":
            self.symbolEffect(.appear.down)
        case "appearByLayer":
            self.symbolEffect(.appear.byLayer)
        case "disappear":
            self.symbolEffect(.disappear)
        case "disappearInUp":
            self.symbolEffect(.disappear.up)
        case "disappearInDown":
            self.symbolEffect(.disappear.down)
        case "disappearByLayer":
            self.symbolEffect(.disappear.byLayer)
        case "variablecolor":
            self.symbolEffect(.variableColor)
        case "variablecolorCumulative":
            self.symbolEffect(.variableColor.cumulative)
        case "variablecolorDimInactiveLayers":
            self.symbolEffect(.variableColor.dimInactiveLayers)
        case "variablecolorHideInactiveLayers":
            self.symbolEffect(.variableColor.hideInactiveLayers)
        case "variablecolorReversing":
            self.symbolEffect(.variableColor.reversing)
        case "variablecolorNonReversing":
            self.symbolEffect(.variableColor.nonReversing)
        case "variablecolorIterative":
            self.symbolEffect(.variableColor.iterative)
        case "rotate":
            if #available(iOS 18.0, *) {
                self.symbolEffect(.rotate)
            } else {
                self.symbolEffect(.pulse, value: value)
            }
        case "rotateByLayer":
            if #available(iOS 18.0, *) {
                self.symbolEffect(.rotate.byLayer)
            } else {
                self.symbolEffect(.pulse, value: value)
            }
        case "rotateClockwise":
            if #available(iOS 18.0, *) {
                self.symbolEffect(.rotate.clockwise)
            } else {
                self.symbolEffect(.pulse, value: value)
            }
        case "rotateCounterClockwise":
            if #available(iOS 18.0, *) {
                self.symbolEffect(.rotate.counterClockwise)
            } else {
                self.symbolEffect(.pulse, value: value)
            }
        default:
            self.symbolEffect(.pulse, value: value)
        }
    }
}
    


struct EquatableAnyValue: Equatable {
    let base: Any?

    static func == (lhs: EquatableAnyValue, rhs: EquatableAnyValue) -> Bool {
        String(describing: lhs.base) == String(describing: rhs.base)
    }
}


enum AnyValue: Codable {
    case string(String)
    case int(Int)
    case double(Double)
    case bool(Bool)
    case dictionary([String: AnyValue])
    case array([AnyValue])
    case null

    init(from decoder: Decoder) throws {
        let container = try decoder.singleValueContainer()

        if container.decodeNil() {
            self = .null
        } else if let v = try? container.decode(Bool.self) {
            self = .bool(v)
        } else if let v = try? container.decode(Int.self) {
            self = .int(v)
        } else if let v = try? container.decode(Double.self) {
            self = .double(v)
        } else if let v = try? container.decode(String.self) {
            self = .string(v)
        } else if let v = try? container.decode([String: AnyValue].self) {
            self = .dictionary(v)
        } else if let v = try? container.decode([AnyValue].self) {
            self = .array(v)
        } else {
            throw DecodingError.dataCorruptedError(in: container, debugDescription: "Unsupported value")
        }
    }

    func encode(to encoder: Encoder) throws {
        var container = encoder.singleValueContainer()

        switch self {
        case .string(let v): try container.encode(v)
        case .int(let v): try container.encode(v)
        case .double(let v): try container.encode(v)
        case .bool(let v): try container.encode(v)
        case .dictionary(let v): try container.encode(v)
        case .array(let v): try container.encode(v)
        case .null: try container.encodeNil()
        }
    }

    var value: Any {
        switch self {
        case .string(let v): return v
        case .int(let v): return v
        case .double(let v): return v
        case .bool(let v): return v
        case .dictionary(let v): return v.mapValues { $0.value }
        case .array(let v): return v.map { $0.value }
        case .null: return NSNull()
        }
    }
}
