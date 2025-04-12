import SwiftUI
import ExpoModulesCore



//key: colorPicker
struct ColorView: View {
   @State private var bgColor = Color.red
   var material: ViewMaterial
    var body: some View {
        VStack {
            ColorPicker("Set the background color", selection: $bgColor)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(bgColor)
    }
}

//key: textHello
struct TextView: View {
   var body: some View {
       VStack{
           Image(systemName: "pencil")
           Text("Hallo from Swift UI")
       }
    }
}
