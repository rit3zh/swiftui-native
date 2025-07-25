import QuickLook
import SwiftUI

struct ColorPickerHelperView: View {
    var title: String
    var defaultColor: String
    @State private var selectedColor =
        Color(.sRGB, red: 0.98, green: 0.9, blue: 0.2)
    var body: some View {
        ColorPicker(title, selection: $selectedColor)
    }
}

struct PopoverHelperView<Content: View, Trigger: View>: View {
    @State private var showingPopover = false
    @ViewBuilder let content: Content
    @ViewBuilder let trigger: Trigger
    let anchorPoint: UnitPoint

    var body: some View {
        if #available(iOS 16.4, *) {
            trigger
                .onTapGesture {
                    showingPopover = true
                }
                .popover(isPresented: $showingPopover, attachmentAnchor: .point(anchorPoint)) {
                    content.presentationCompactAdaptation(.none)
                }
        } else {
            trigger
                .onTapGesture {
                    showingPopover = true
                }
                .popover(isPresented: $showingPopover, attachmentAnchor: .point(anchorPoint)) {
                    content
                }
        }
    }
}


struct SheetHelperView<Content: View, Trigger: View>: View {
    @State private var showingSheet = false
    @ViewBuilder let content: Content
    @ViewBuilder let trigger: Trigger
    let text: String = "Open"
    var body: some View {
        trigger
            .onTapGesture {
                showingSheet = true
            }
            .sheet(isPresented: $showingSheet) {
                content
            }
    }
}

// Will be available in a future version
struct QuickLookHelperView<Trigger: View>: View {
    @ViewBuilder let trigger: Trigger
    @State var url: URL?
    var inputUri: String

    var body: some View {
        trigger
            .onTapGesture {
                url = URL(string: inputUri)
            }
            .quickLookPreview($url)
    }
}
