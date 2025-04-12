import ExpoModulesCore
import Kingfisher
import SwiftUI

struct ViewFactory: PresentableProtocol {
    private let material: ViewMaterial
    private let children: [UIView]?
    

    private let onEvent: EventDispatcher
    private var index: Int? = nil
    private var context: [String: Any]? = nil
    init(material: ViewMaterial, children: [UIView]? = nil, onEvent: EventDispatcher, index: Int? = nil, context: [String: Any]? = nil) {
        self.material = material
        self.children = children
        self.onEvent = onEvent
        self.index = index
        self.context = context
    }
    

    // MARK: - Guage
    @ViewBuilder
    func gauge() -> some View {
        if let subviews = material.subviews {
            if #available(iOS 16.0, *) {
                
                let value = Double(material.value ?? 0)
                let minValue = Double(material.minValue ?? 0)
                let maxValue = Double(material.maxValue ?? 100)

                Gauge(value: value, in: minValue...maxValue) {
                    ForEach(subviews) {
                        ViewFactory(material: $0, children: children, onEvent: onEvent).toPresentable()
                    }
                } currentValueLabel: {
                    if let current = material.currentValueLabel?.first {
                        ViewFactory(material: current, children: children, onEvent: onEvent).toPresentable()
                    }
                } minimumValueLabel: {
                    if let min = material.minimumValueLabel?.first {
                        ViewFactory(material: min, children: children, onEvent: onEvent).toPresentable()
                    }
                } maximumValueLabel: {
                    if let max = material.maximumValueLabel?.first {
                        ViewFactory(material: max, children: children, onEvent: onEvent).toPresentable()
                    }
                }.applyGaugeStyle(material.gaugeStyle)

            } else {
                ErrorMessage(message: "Gauge requires iOS 16.0 or higher")
            }
        } else {
            ErrorMessage(message: "Make sure you have defined a SubView for Gauge")
        }
    }

    
    
    // MARK: - ScrollView

    @ViewBuilder func scrollView() -> some View {
        if let subviews = material.subviews {
            let axisKey = material.properties?.axis ?? "vertical"
            let axis = Axis.Set.pick[axisKey] ?? .vertical
            let showsIndicators = material.properties?.showsIndicators ?? true

            ScrollView(axis, showsIndicators: showsIndicators) {
                AxisBasedStack(axis: axis) {
                    ForEach(subviews) { subview in
                        ViewFactory(material: subview, children: children, onEvent: onEvent).toPresentable()
                    }
                }
            }
        } else {
            ErrorMessage(message: "Make sure you have defined a SubView for ScrollView")
        }
    }

    
    // MARK: - ListButton

        
    @ViewBuilder
    func listbutton() -> some View {
        if #available(iOS 15.0, *) {
            if let title = material.values?.text {
                Button(role: checkButtonRole(material.role)) {
                    onEvent([".$onListButtonPress": ["index": index as Any, "title": title]])
                } label: {
                    Label(title, systemImage: material.values?.systemIconName ?? "")
                }
            }
        } else {
            Button(material.properties?.text ?? "") {
                onEvent(["onListButtonPress": ["index": index as Any, "title": material.values?.text as Any]])

            }
        }
    }


    
    
    
    // MARK: - List

    @ViewBuilder func list() -> some View {
        @State var editMode: EditMode = .inactive
        if let subviews = material.subviews {
            List {
                ForEach(Array(subviews.enumerated()), id: \.offset) { index, item in
                    if #available(iOS 15.0, *) {
                        ViewFactory(material: item, children: children, onEvent: onEvent)
                            .toPresentable()
                            .swipeActions(edge: .leading, allowsFullSwipe: material.leadingSwipeActionFullSwipeEnable ?? true ) {
                                if let leadingSwipeActions = material.leadingSwipeActions {
                                    ForEach(leadingSwipeActions) { swipeItem in
                                        ViewFactory(material: swipeItem, children: children, onEvent: onEvent, index: index)
                                            .toPresentable()
                                    }
                                }
                            }
                            .swipeActions(edge: .trailing, allowsFullSwipe: material.trailingSwipeActionFullSwipeEnable ?? false) {
                                if let trailingSwipeActions = material.trailingSwipeActions {
                                    ForEach(trailingSwipeActions) { swipeItem in
                                        ViewFactory(material: swipeItem, children: children, onEvent: onEvent, index: index)
                                            .toPresentable()
                                    }
                                }
                            }
                    }
                }.onMove(perform: material.enableEditing == true ? move : nil)
                .onDelete(perform: material.enableEditing == true ? delete : nil)
            }.environment(\.editMode, .constant(material.enableEditing == true ? .active : .inactive))
            .modifier(ModifierFactory.ListStyleModifer(style: material.properties?.listStyle ?? ""))
        } else {
            ErrorMessage(message: "Make sure you have defined a SubView for List")
        }
    }



    // MARK: - Section

    @ViewBuilder
    func section() -> some View {
        if let subviews = material.subviews {
            let header = material.optionalSubviews?.first.map {
                ViewFactory(material: $0, children: children, onEvent: onEvent).toPresentable()
            }

            let footer = material.sectionFooter?.first.map {
                ViewFactory(material: $0, children: children, onEvent: onEvent).toPresentable()
            }

            if let header = header, let footer = footer {
                Section(header: header, footer: footer) {
                    ForEach(subviews) {
                        ViewFactory(material: $0, children: children, onEvent: onEvent).toPresentable()
                    }
                }
            } else if let header = header {
                Section(header: header) {
                    ForEach(subviews) {
                        ViewFactory(material: $0, children: children, onEvent: onEvent).toPresentable()
                    }
                }
            } else if let footer = footer {
                Section(footer: footer) {
                    ForEach(subviews) {
                        ViewFactory(material: $0, children: children, onEvent: onEvent).toPresentable()
                    }
                }
            } else {
                Section {
                    ForEach(subviews) {
                        ViewFactory(material: $0, children: children, onEvent: onEvent).toPresentable()
                    }
                }
            }
        }
    }

    // MARK: - VStack

    @ViewBuilder func vstack() -> some View {
        
        if let subviews = material.subviews {
            let spacing = material.properties?.spacing.toCGFloat() ?? 0
            let horizontalAlignmentKey = material.properties?.horizontalAlignment ?? "center"
            let horizontalAlignment = HorizontalAlignment.pick[horizontalAlignmentKey] ?? .center
            VStack(alignment: horizontalAlignment, spacing: spacing) {
                ForEach(subviews) {
                    ViewFactory(material: $0, children: children, onEvent: onEvent).toPresentable()
                }
            }
        } else {
            ErrorMessage(message: "Make sure you have defined a SubView for VStack")
        }
    }

    // MARK: - LazyVStack

    @ViewBuilder func lazyVstack() -> some View {
        if let subviews = material.subviews {
            let spacing = material.properties?.spacing.toCGFloat() ?? 0
            let horizontalAlignmentKey = material.properties?.horizontalAlignment ?? "center"
            let horizontalAlignment = HorizontalAlignment.pick[horizontalAlignmentKey] ?? .center
            LazyVStack(alignment: horizontalAlignment, spacing: spacing) {
                ForEach(subviews) {
                    ViewFactory(material: $0, children: children, onEvent: onEvent).toPresentable()
                }
            }
        } else {
            ErrorMessage(message: "Make sure you have defined a SubView for LazyVStack")
        }
    }

    // MARK: - CollapsibleSection
    @ViewBuilder
    func collapsiblesection() -> some View {
        if let subviews = material.subviews {
            let headerView = material.optionalSubviews?.first.map {
                ViewFactory(material: $0, children: children, onEvent: onEvent).toPresentable()
            }


            if #available(iOS 17.0, *), let _ = material.isExpandable {
                let isExpanded: Binding<Bool> = Binding(
                    get: { material.isExpandable ?? true },
                    set: { newValue in
                        material.isExpandable = newValue
                        onEvent([material.values?.key ?? "expandable": ["isExpanded": newValue]])
                    }
                )

                Section(isExpanded: isExpanded) {
                    ForEach(subviews) { subview in
                        ViewFactory(material: subview, children: children, onEvent: onEvent).toPresentable()
                    }
                } header: {
                    if let headerView = headerView {
                        headerView
                    }
                }

            } else {
                Section {
                    ForEach(subviews) { subview in
                        ViewFactory(material: subview, children: children, onEvent: onEvent).toPresentable()
                    }
                } header: {
                    if let headerView = headerView {
                        headerView
                    }
                }
            }

        }

    }

    // MARK: - HStack

    @ViewBuilder func hstack() -> some View {
        if let subviews = material.subviews {
            let spacing = material.properties?.spacing.toCGFloat() ?? 0
            let verticalAlignmentKey = material.properties?.verticalAlignment ?? "center"
            let verticalAlignment = VerticalAlignment.pick[verticalAlignmentKey] ?? .center
            HStack(alignment: verticalAlignment, spacing: spacing) {
                ForEach(subviews) {
                    ViewFactory(material: $0, children: children, onEvent: onEvent).toPresentable()
                }
            }
        } else {
            ErrorMessage(message: "Make sure you have defined a SubView for LazyHStack")
        }
    }

    // MARK: - HStack

    @ViewBuilder func lazyHstack() -> some View {
        if let subviews = material.subviews {
            let spacing = material.properties?.spacing.toCGFloat() ?? 0
            let verticalAlignmentKey = material.properties?.verticalAlignment ?? "center"
            let verticalAlignment = VerticalAlignment.pick[verticalAlignmentKey] ?? .center
            LazyHStack(alignment: verticalAlignment, spacing: spacing) {
                ForEach(subviews) {
                    ViewFactory(material: $0, children: children, onEvent: onEvent).toPresentable()
                }
            }
        } else {
            ErrorMessage(message: "Make sure you have defined a HStack")
        }
    }

    // MARK: - ZStack

    @ViewBuilder func zstack() -> some View {
        if let subviews = material.subviews {
            ZStack {
                ForEach(subviews) {
                    ViewFactory(material: $0, children: children, onEvent: onEvent).toPresentable()
                }
            }
        } else {
            ErrorMessage(message: "Make sure you have defined a SubView for ZStack")
        }
    }

    // MARK: - NavigationView

    @ViewBuilder func navigationView() -> some View {
        if let subviews = material.subviews {
            NavigationView {
                ForEach(subviews) {
                    ViewFactory(material: $0, children: children, onEvent: onEvent).toPresentable()
                }
                .navigationTitle(material.values?.title ?? "")
                .navigationViewStyle(.stack)
            }

        } else {
            ErrorMessage(message: "Make sure you have defined a SubView for NavigationView")
        }
    }

    // MARK: - Text

    @ViewBuilder func text() -> some View {
        let fontHashValue = material.properties?.font ?? "body"
        let font = Font.pick[fontHashValue]
        let fontWeightHashValue = material.properties?.fontWeight ?? "regular"
        let fontWeight = Font.Weight.pick[fontWeightHashValue]
        let markdownEnabled = material.properties?.enableMarkdown ?? false
        if markdownEnabled {
            Text(LocalizedStringKey(material.values?.text ?? ""))
                .font(font)
                .fontWeight(fontWeight)
        }
        else {
            Text(material.values?.text ?? "")
                .font(font)
                .fontWeight(fontWeight)
        }
      
    }

    // MARK: - Label

    @ViewBuilder func label() -> some View {
        let fontHashValue = material.properties?.font ?? "body"
        let font = Font.pick[fontHashValue]
        let fontWeightHashValue = material.properties?.fontWeight ?? "regular"
        let fontWeight = Font.Weight.pick[fontWeightHashValue]
        Label(material.values?.text ?? "", systemImage: material.values?.systemIconName ?? "")
            .font(font)
    }

    // MARK: - Image

    @ViewBuilder func image() -> some View {
        if let systemIconName = material.values?.systemIconName {
            Image(systemName: systemIconName)
                .resizable()
                .scaledToFit()
        } else if let localIconName = material.values?.localImageName {
            Image(localIconName)
                .resizable()
                .scaledToFit()

        } else if let remoteUrl = material.values?.imageUrl {
            KFImage(URL(string: remoteUrl))
                .resizable()
                .scaledToFit()
        } else {
            ErrorMessage(message: "Image value could not be read")
        }
    }

    // MARK: - ContentUnavailableView

    @ViewBuilder func contentUnavailableView() -> some View {
        let fontHashValue = material.properties?.font ?? "body"
        let font = Font.pick[fontHashValue]
        let fontWeightHashValue = material.properties?.fontWeight ?? "regular"
        let fontWeight = Font.Weight.pick[fontWeightHashValue]

        if #available(iOS 17.0, *) {
            ContentUnavailableView(
                material.values?.title ?? "",
                systemImage: material.values?.systemIconName ?? "",
                description: Text(material.values?.description ?? "")
                    .font(font)
                    .fontWeight(fontWeight)
            )
        } else {
            ErrorMessage(message: "ContentUnavailableView is only available in IOS 17 and newer")
        }
    }

    // MARK: - NavigationLink

    @ViewBuilder func navigationLink() -> some View {
        if let subviews = material.subviews, let optionalSubviews = material.optionalSubviews {
            NavigationLink {
                VStack {
                    ForEach(subviews) {
                        ViewFactory(material: $0, children: children, onEvent: onEvent).toPresentable()
                    }
                }.navigationTitle(material.values?.title ?? "")
            }
            label: {
                ForEach(optionalSubviews) {
                    ViewFactory(material: $0, children: children, onEvent: onEvent).toPresentable()
                }
            }

        } else {
            ErrorMessage(message: "Make sure you have defined a SubView for NavigationLink")
        }
    }

    
    
    // MARK: - DisclosureGroup

    @ViewBuilder func disclosureGroup() -> some View {
        if let subviews = material.subviews {
            DisclosureGroup(material.values?.title ?? "") {
                ForEach(subviews) {
                    ViewFactory(material: $0, children: children, onEvent: onEvent).toPresentable()
                }
            }

        } else {
            ErrorMessage(message: "Make sure you have defined a SubView for Disclosure Group")
        }
    }

    // MARK: - Button

    @ViewBuilder func button() -> some View {
        if let subviews = material.subviews {
            
            
            
            Button {
                onEvent([material.values?.key ?? "Button": ["action": "press"]])
            }
            label: {
                ForEach(subviews) {
                    ViewFactory(material: $0, children: children, onEvent: onEvent).toPresentable()
                }
            }

        } else {
            ErrorMessage(message: "Make sure you have defined a SubView for Button")
        }
    }

    // MARK: - ToolbarItemGroup

    @ViewBuilder func toolbarItemGroup() -> some View {
        let placementHashValue = material.properties?.toolbarPlacement ?? "automatic"
        let placement = ToolbarItemPlacement.pick[placementHashValue] ?? .automatic

        if let subviews = material.subviews {
            VStack {}

                .toolbar {
                    ToolbarItemGroup(placement: placement) {
                        ForEach(subviews) {
                            ViewFactory(material: $0, children: children, onEvent: onEvent).toPresentable()
                        }
                    }
                }

        } else {
            ErrorMessage(message: "Make sure you have defined a SubView for ToolbarItemGroup")
        }
    }

    // MARK: - Group

    @ViewBuilder func group() -> some View {
        let fontHashValue = material.properties?.font ?? "body"
        let font = Font.pick[fontHashValue]
        let fontWeightHashValue = material.properties?.fontWeight ?? "regular"
        let fontWeight = Font.Weight.pick[fontWeightHashValue]
        if let subviews = material.subviews {
            if #available(iOS 16.0, *) {
                Group {
                    ForEach(subviews) {
                        ViewFactory(material: $0, children: children, onEvent: onEvent).toPresentable()
                    }
                    .fontWeight(fontWeight)
                    .font(font)
                }
            }

        } else {
            ErrorMessage(message: "Make sure you have defined a SubView for Group")
        }
    }

    @ViewBuilder func controlGroup() -> some View {
        let fontHashValue = material.properties?.font ?? "body"
        let font = Font.pick[fontHashValue]
        let fontWeightHashValue = material.properties?.fontWeight ?? "regular"
        let fontWeight = Font.Weight.pick[fontWeightHashValue]
        if let subviews = material.subviews {
            if #available(iOS 16.0, *) {
                ControlGroup {
                    ForEach(subviews) {
                        ViewFactory(material: $0, children: children, onEvent: onEvent).toPresentable()
                    }
                    .fontWeight(fontWeight)
                    .font(font)
                }
            }

        } else {
            ErrorMessage(message: "Make sure you have defined a SubView for ControlGroup")
        }
    }

    // MARK: - ContextMenu

    @ViewBuilder func contextMenu() -> some View {
        if let subviews = material.subviews, let optionalSubviews = material.optionalSubviews {
            ForEach(subviews) {
                ViewFactory(material: $0, children: children, onEvent: onEvent).toPresentable()
                    .contextMenu {
                        ForEach(optionalSubviews) {
                            ViewFactory(material: $0, children: children, onEvent: onEvent).toPresentable()
                        }
                    }
            }

        } else {
            ErrorMessage(message: "Make sure you have defined a SubView and an optional SubView for ContextMenu")
        }
    }

    // MARK: - PopoverView

    @ViewBuilder func popoverView() -> some View {
        if let subviews = material.subviews, let optionalSubviews = material.optionalSubviews {
            PopoverHelperView {
                ForEach(optionalSubviews) {
                    ViewFactory(material: $0, children: children, onEvent: onEvent).toPresentable()
                }

            } trigger: {
                ForEach(subviews) {
                    ViewFactory(material: $0, children: children, onEvent: onEvent).toPresentable()
                }
            }

        } else {
            ErrorMessage(message: "Make sure you have defined a SubView and an optional SubView for Popover ")
        }
    }

    // MARK: - SheetView

    @ViewBuilder func sheetView() -> some View {
        if let subviews = material.subviews, let optionalSubviews = material.optionalSubviews {
            SheetHelperView {
                ForEach(optionalSubviews) {
                    ViewFactory(material: $0, children: children, onEvent: onEvent).toPresentable()
                }

            } trigger: {
                ForEach(subviews) {
                    ViewFactory(material: $0, children: children, onEvent: onEvent).toPresentable()
                }
            }

        } else {
            ErrorMessage(message: "Make sure you have defined a SubView and an optional SubView for Popover ")
        }
    }

    // MARK: - MaskView

    @ViewBuilder func maskView() -> some View {
        if let subviews = material.subviews, let optionalSubviews = material.optionalSubviews {
            ForEach(subviews) {
                ViewFactory(material: $0, children: children, onEvent: onEvent).toPresentable()
                    .mask(
                        ForEach(optionalSubviews) {
                            ViewFactory(material: $0, children: children, onEvent: onEvent).toPresentable()
                        }
                    )
            }

        } else {
            ErrorMessage(message: "Make sure you have defined a SubView and an optional SubView for MaskView")
        }
    }

    // MARK: - NaviagtionSplitView

    @ViewBuilder func navigationSplitView() -> some View {
        if let subviews = material.subviews, let optionalSubviews = material.optionalSubviews {
            if #available(iOS 16.0, *) {
                NavigationSplitView {
                    ForEach(subviews) {
                        ViewFactory(material: $0, children: children, onEvent: onEvent).toPresentable()
                    }
                    .toolbar(.visible)
                    .navigationTitle(material.values?.title ?? "")
                } detail: {
                    ForEach(optionalSubviews) {
                        ViewFactory(material: $0, children: children, onEvent: onEvent).toPresentable()
                    }
                }

            } else {
                ErrorMessage(message: "NavigationSpllitView is only available in IOS 16 and newer")
            }

        } else {
            ErrorMessage(message: "Make sure you have defined a SubView and an optional SubView for NavigationSpllitView")
        }
    }

    // MARK: - ReactChildView

    @ViewBuilder func ReactChildView() -> some View {
        let index = material.values?.index
        if let children = children, let index = index, index < children.count {
            UIKitViewWrapper(uiView: children[index])
        } else {
            ErrorMessage(message: "Make sure you have specified an index for the ReactChildView")
        }
    }

    // MARK: - Spacer

    @ViewBuilder func spacer() -> some View {
        let minLength = material.properties?.minLength.toCGFloat()
        Spacer(minLength: minLength)
    }

    // MARK: - CustomView

    @ViewBuilder func customView() -> some View {
   
        
        if let key = material.values?.key {
            CustomView(viewKey: key , material: material, onEvent: onEvent)
        }
        else {
            ErrorMessage(message: "Please specify a native view key for the CustomView")
        }
    }
    
    
    // MARK: - Picker
    
    @ViewBuilder  func picker() -> some View {
        if let subviews = material.subviews {
            let selection = Binding<Int>(
                get: { material.selection ?? 0 },
                set: {
                    material.selection = $0
                    onEvent([material.values?.key ?? "picker": ["selection": $0]])
                }
            )
            if let title = material.values?.text {
                Picker(title, selection: selection) {
                    ForEach(subviews.indices, id: \.self) { index in
                        ViewFactory(material: subviews[index], children: children, onEvent: onEvent)
                            .toPresentable()
                            .tag(index)
                    }
                }.applyPickerStyle(material.pickerStyle)
            } else {
                Picker("", selection: selection) {
                    ForEach(subviews.indices, id: \.self) { index in
                        ViewFactory(material: subviews[index], children: children, onEvent: onEvent)
                            .toPresentable()
                            .tag(index)
                    }
                }.applyPickerStyle(material.pickerStyle)
            }
            
        }
    }
    

    @ViewBuilder func buildDefault() -> some View {
        switch material.type {
        case .ScrollView: scrollView()
        case .List: list()
        case .LazyVStack: lazyVstack()
        case .Gauge: gauge()
        case .LazyHStack: lazyHstack()
        case .VStack: vstack()
        case .HStack: hstack()
        case .ZStack: zstack()
        case .Picker: picker()
        case .Text: text()
        case .Image: image()
        case .Spacer: spacer()
        case .Rectangle: Rectangle()
        case .Divider: Divider()
        case .Circle: Circle()
        case .Ellipse: Ellipse()
        case .ContentUnavailableView: contentUnavailableView()
        case .NavigationLink: navigationLink()
        case .ContextMenu: contextMenu()
        case .DisclosureGroup: disclosureGroup()
        case .NavigationSplitView: navigationSplitView()
        case .ControlGroup: controlGroup()
        case .Label: label()
        case .SheetView: sheetView()
        case .CollapsibleSection: collapsiblesection()
        case .PopoverView: popoverView()
        case .MaskView: maskView()
        case .ReactChildView: ReactChildView()
        case .Section: section()
        case .Button: button()
        case .ListButton: listbutton()
        case .CustomView: customView()
        case .NavigationView: navigationView()
        case .ToolbarItemGroup: toolbarItemGroup()
        default: EmptyView()
        }
    }

    @ViewBuilder func toPresentable() -> some View {
        let prop = material.properties

        let uiComponent = buildDefault().embedInAnyView()
        uiComponent
            .modifier(ModifierFactory.PaddingModifier(padding: prop?.padding.toCGFloat()))
            .modifier(ModifierFactory.ForegroundModifier(foregroundColor: prop?.foregroundColor.toColor()))
            .modifier(ModifierFactory.BorderModifier(
                borderColor: prop?.borderColor.toColor(),
                borderWidth: prop?.borderWidth.toCGFloat()
            ))
            .modifier(ModifierFactory.FrameModifier(
                width: prop?.width.toCGFloat(),
                height: prop?.height.toCGFloat()
            ))
            .modifier(ModifierFactory.BackgroundColorModifer(
                backgroundColor: prop?.backgroundColor.toColor()

            ))
            .modifier(ModifierFactory.TintColorModifier(
                tint: prop?.tint.toColor()

            ))
            .modifier(ModifierFactory.ColorOverlayModifer(
                color: prop?.overlayColor.toColor()

            ))
            .modifier(ModifierFactory.FontWeightModifer(
                fontWeightHashValue: prop?.fontWeight

            ))
            .modifier(ModifierFactory.TitleDisplayModeModifer(
                titleDisplayModeHashValue: prop?.titleDisplayMode

            ))
            .modifier(ModifierFactory.NavigationBarHiddenModifer(
                hidden: prop?.navigationBarHidden ?? false

            ))
            .modifier(ModifierFactory.IgnoreSafeAreaModifer(
                ignore: prop?.ignoreSafeArea ?? false

            ))
            .modifier(ModifierFactory.HoverEffectModifer(
                effect: prop?.hoverEffect ?? ""

            ))
            .modifier(ModifierFactory.TextSelectionModifer(
                selectable: prop?.textSelection ?? false

            ))

            .modifier(ModifierFactory.AccessibilityModifer(
                hint: prop?.accessibilityHint,
                value: prop?.accessibilityValue,
                label: prop?.accessibilityLabel,
                identifer: prop?.accessibilityIdentifier

            ))
    }
    
    
    
    
    func move(from source: IndexSet, to destination: Int) {
           let indices = Array(source)

        onEvent(["onMove": ["indices": indices, "destination": destination]])
       }

       func delete(at offsets: IndexSet) {
           let indices = Array(offsets)
           onEvent(["onDelete": ["indices": indices]])
       }
}



@available(iOS 15.0, *)
func checkButtonRole(_ role: String?) -> ButtonRole? {
    switch role?.lowercased() {
    case "destructive":
        return .destructive
    case "cancel":
        return .cancel
    default:
        return nil
    }
}

@available(iOS 15.0, *)
func applyPickerStyle<V: View>(_ view: V, style: String?) -> AnyView {
    switch style?.lowercased() {
    case "segmented":
        return view.pickerStyle(SegmentedPickerStyle()).embedInAnyView()
    case "menu":
        return view.pickerStyle(MenuPickerStyle()).embedInAnyView()
    case "wheel":
        return view.pickerStyle(WheelPickerStyle()).embedInAnyView()
    case "inline":
            return view.pickerStyle(InlinePickerStyle()).embedInAnyView()
    default:
        return view.pickerStyle(DefaultPickerStyle()).embedInAnyView()
    }
}




