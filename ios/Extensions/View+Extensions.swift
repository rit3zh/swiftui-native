import SwiftUI

extension View {
    func embedInAnyView() -> AnyView {
        AnyView(self)
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


}
