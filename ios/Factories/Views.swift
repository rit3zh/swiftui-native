import ExpoModulesCore
import Kingfisher
import SwiftUI

struct ViewFactory: PresentableProtocol {
    private let material: ViewMaterial
    private let children: [UIView]?


    private let onEvent: EventDispatcher
    private var index: Int? = nil
    private var menuIndex: Int? = nil
    private var context: [String: Any]? = nil
    init(material: ViewMaterial, children: [UIView]? = nil, onEvent: EventDispatcher, index: Int? = nil, context: [String: Any]? = nil, menuIndex: Int? = nil) {
        self.material = material
        self.children = children
        self.onEvent = onEvent
        self.index = index
        self.context = context
        self.menuIndex = menuIndex
    }



    // MARK: - Pressable
    
    @ViewBuilder
    func pressable() -> some View {
        if let subviews = material.subviews {
            let spacing = material.properties?.spacing.toCGFloat() ?? 0
            let horizontalAlignmentKey = material.properties?.horizontalAlignment ?? "center"
            let horizontalAlignment = HorizontalAlignment.pick[horizontalAlignmentKey] ?? .center
            let index = material.values?.index
            
            VStack(alignment: horizontalAlignment, spacing: spacing) {
                ForEach(Array(subviews.enumerated()), id: \.offset) { idx, item in
                    let gesture = LongPressGesture(minimumDuration: 0)
                        .onChanged { _ in
                            onEvent(["onPressIn": ["index": idx]])
                        }
                        .onEnded { _ in
                            onEvent(["onPressOut": ["index": idx]])
                            onEvent(["onPress": [
                                "index": idx,
                                "menuIndex": menuIndex as Any,
                                "context": context as Any,
                                "initialIndex": index as Any
                            ]])
                        }

                    ViewFactory(material: item, children: children, onEvent: onEvent, index: idx, context: context)
                        .toPresentable()
                        .gesture(gesture)
                }
            }
        } else {
            ErrorMessage(message: "Make sure you have defined a SubView for Pressable")
        }
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

          let scroll = ScrollView(axis, showsIndicators: showsIndicators) {
                AxisBasedStack(axis: axis) {
                    ForEach(subviews) { subview in
                        ViewFactory(material: subview, children: children, onEvent: onEvent).toPresentable()
                    }
                }
            }


            if #available(iOS 15.0, *) {
                scroll.refreshable {
                    onEvent(["onRefresh": [:]])
                }
            } else {
                scroll
            }


        } else {
            ErrorMessage(message: "Make sure you have defined a SubView for ScrollView")
        }
    }


    
    // MARK: - EditButton


    @ViewBuilder
    func editButton() -> some View {
        
        @State var editMode: EditMode = .inactive

        if #available(iOS 15.0, *) {
        
            EditButton()
                .tint(material.tint.toColor())
                .environment(\.editMode, $editMode)
                .onChange(of: editMode) { newValue in
                    onEvent([
                        ".$onEditToggle": [
                            "isEditing": newValue == .active
                        ]
                    ])
                }
        } else {
            EmptyView()
        }
    }

    // MARK: - ListButton


    @ViewBuilder
    func listbutton() -> some View {
        
        let foregroundColor = Color(hex: material.properties?.foregroundColor ?? "#FFFFFF")
        if #available(iOS 15.0, *) {

            if let title = material.values?.text {
                Button(role: checkButtonRole(material.role)) {
                    onEvent([".$onListButtonPress": ["index": index as Any, "title": title]])
                } label: {
                    Label(title, systemImage: material.values?.systemIconName ?? "").tint(material.tint.toColor())
                }
            }
        } else {
            Button(material.properties?.text ?? "") {
                onEvent(["onListButtonPress": ["index": index as Any, "title": material.values?.text as Any]])
            }
        }
    }

    // MARK: - List
    
    @ViewBuilder
    func list() -> some View {
        if let subviews = material.subviews {
            let editModeValue: EditMode = (material.enableEditing == true) ? .active : .inactive

            let listView = List {
                ForEach(Array(subviews.enumerated()), id: \.offset) { index, item in
                    if #available(iOS 15.0, *) {
                        ViewFactory(material: item, children: children, onEvent: onEvent)
                            .toPresentable()
                            .swipeActions(edge: .leading, allowsFullSwipe: material.leadingSwipeActionFullSwipeEnable ?? true) {
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
                }
                .onDelete(perform: material.enableEditing == true ? delete : nil)

                .onMove(perform: material.enableEditing == true ? move : nil)
            }.environment(\.editMode, .constant(editModeValue))
            .animation(.default, value: material.enableEditing)
            .toolbar {
                if let toolBarRender = material.renderListToolBar {
                    ForEach(toolBarRender) { item in
                        ViewFactory(material: item, children: children, onEvent: onEvent)
                            .toPresentable()
                    }
                }
            }
            .onAppear{
                UIScrollView.appearance().isScrollEnabled = material.scrollDisable ?? false
            }
            .modifier(ModifierFactory.ListStyleModifer(style: material.properties?.listStyle ?? ""))
            
            
            if #available(iOS 16.0, *) {
                listView.refreshable {
                    onEvent(["onRefresh": [:]])
                }
                
            } else {
                listView
            }

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
                        withAnimation {
                        material.isExpandable = newValue
                        onEvent([material.values?.key ?? "expandable": ["isExpanded": newValue]])
                        }
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

    @ViewBuilder
    func navigationView() -> some View {



        if let subviews = material.subviews {
            @State var searchText: String = material.searchable?["initialText"] ?? ""
            @State var selectedScopeIndex: Int = 0

            NavigationView {
                let view = ForEach(subviews) {
                    ViewFactory(material: $0, children: children, onEvent: onEvent).toPresentable()
                }
                .navigationTitle(material.values?.title ?? "")
                .navigationViewStyle(.stack)


                if let searchable = material.searchable {
                    if #available(iOS 15.0, *) {
                        let placement = checkSearchPlacement(searchable["placement"])


                        if #available(iOS 16.0, *) {


                            view.searchable(

                                    text: Binding(
                                        get: { searchText },
                                        set: { newValue in
                                            searchText = newValue
                                            onEvent(["onChangeText": [
                                                "text": newValue
                                            ]])
                                        }
                                    ),
                                    placement: placement,
                                    prompt: Text(searchable["placeholder"] ?? "Search")
                                )
                                .onSubmit(of: .search) {
                                    onEvent(["onSubmitText": [
                                        "submittedText": searchText
                                    ]])
                                }

                                .searchScopes(Binding(
                                    get: { selectedScopeIndex },
                                    set: { newIndex in
                                        selectedScopeIndex = newIndex
                                        onEvent(["onScopeChange": [
                                            "selectedScopeIndex": newIndex
                                        ]])
                                    }
                                )) {
                                    if let scopeViews = material.scopes {
                                        ForEach(Array(scopeViews.enumerated()), id: \.element.id) { index, scope in
                                            ViewFactory(material: scope, children: children, onEvent: onEvent)
                                                .toPresentable()
                                                .tag(index)
                                        }
                                    }
                                }.searchSuggestions {
                                    if let suggestionViews = material.searchSuggestions {
                                        ForEach(suggestionViews) { suggestion in
                                            ViewFactory(material: suggestion, children: children, onEvent: onEvent)
                                                .toPresentable()
                                        }
                                    }
                                }

                        } else {
                            // Fallback on earlier versions
                        }
                    } else {
                        ErrorMessage(message: "Searchable is only available on iOS 15.0 or later.")
                    }
                } else {
                    view
                }
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

    @ViewBuilder
    func image() -> some View {
        let cornerRadius = CGFloat(material.properties?.cornerRadius ?? 10)
        if let systemIconName = material.values?.systemIconName {
            
            var image = Image(systemName: systemIconName)
                .resizable()
                .scaledToFit()

            if #available(iOS 17.0, *) {
                let effect = getSymbolEffect(name: material.symbolEffectName)
                image.applySymbolEffectStyle(material.symbolEffectName, value: EquatableAnyValue(base: material.symbolEffectValue))
            }
        } else if let localIconName = material.values?.localImageName {
            Image(localIconName)
                .resizable()
                .scaledToFit()

        } else if let remoteUrl = material.values?.imageUrl {
            KFImage(URL(string: remoteUrl))
                .resizable()
                .scaledToFit()
                .clipShape(.rect(cornerRadius: cornerRadius))

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
                onEvent([material.values?.key ?? "Button": ["action": "press", "index": menuIndex as Any]])
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
    
    
    
    
    // MARK: - toolBarItem

    @ViewBuilder func toolBarItem() -> some View {
        let placementHashValue = material.properties?.toolbarPlacement ?? "automatic"
        let placement = ToolbarItemPlacement.pick[placementHashValue] ?? .automatic

        if let subviews = material.subviews {
            VStack {}

                .toolbar {
                    ToolbarItem(placement: placement) {
                        ForEach(subviews) {
                            ViewFactory(material: $0, children: children, onEvent: onEvent).toPresentable()
                        }
                    }
                }

        } else {
            ErrorMessage(message: "Make sure you have defined a SubView for ToolbarItem")
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

    @ViewBuilder
    func contextMenu() -> some View {
        if let subviews = material.subviews, let optionalSubviews = material.optionalSubviews {
            ForEach(Array(subviews.enumerated()), id: \.offset) { index, item in
                if #available(iOS 16.0, *) {
                    ViewFactory(material: item, children: children, onEvent: onEvent, menuIndex: index).toPresentable()
                        .contextMenu {
                            ForEach(optionalSubviews) {
                                ViewFactory(material: $0, children: children, onEvent: onEvent, menuIndex: index).toPresentable()
                            }
                        } preview: {
                            if let previewMaterial = material.menuPreview {
                                ForEach(previewMaterial) {
                                    ViewFactory(material: $0, children: children, onEvent: onEvent, menuIndex: index).toPresentable()
                                }

                            }
                        }
                } else {
                    ErrorMessage(message: "Context menu for only iOS 16")
                }
            }
        } else {
            ErrorMessage(message: "Make sure you have defined a SubView and an optional SubView for ContextMenu")
        }
    }

    // MARK: - PopoverView
    @ViewBuilder
    func popoverView() -> some View {
        let anchorPoint = unitPoint(from: material.anchorPoint)

        if let subviews = material.subviews, let optionalSubviews = material.optionalSubviews {
            PopoverHelperView(
                content: {
                    ForEach(optionalSubviews) {
                        ViewFactory(material: $0, children: children, onEvent: onEvent).toPresentable()
                    }
                },
                trigger: {
                    ForEach(subviews) {
                        ViewFactory(material: $0, children: children, onEvent: onEvent).toPresentable()
                    }
                },
                anchorPoint: anchorPoint
            )
        } else {
            ErrorMessage(message: "Make sure you have defined a SubView and an optional SubView for Popover")
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



    @ViewBuilder
    func form() -> some View {
        if let subviews = material.subviews {
            if #available(iOS 16.0, *) {
                Form {
                    ForEach(subviews) { subview in
                        ViewFactory(material: subview, children: children, onEvent: onEvent).toPresentable()
                    }
                }
                .applyFormStyle(material.values?.formStyle)
            } else {
                VStack {
                    ForEach(subviews) { subview in
                        ViewFactory(material: subview, children: children, onEvent: onEvent).toPresentable()
                    }
                }
            }
        } else {
            ErrorMessage(message: "Make sure you have defined subviews for Form")
        }
    }


    @ViewBuilder
    func texteditor () -> some View{
        let key = material.values?.key ?? "textEditor"
        let initialText = material.values?.text ?? ""
        let lineSpacing = material.values?.lineSpacing ?? 2
        let lineLimit = material.values?.lineLimit ?? 100
        @State var text: String = initialText

        if #available(iOS 17.0, *) {
            TextEditor(text: Binding(
                get: { text },
                set: { newText in
                    text = newText
                    material.values?.text = newText
                    onEvent([key: ["text": newText]])
                }
            )).applyTextEdtorStyle(material.values?.textEditorStyle)
                .lineSpacing(CGFloat(lineSpacing))
                .lineLimit(lineLimit)
        } else {
            TextEditor(text: Binding(
                get: { text },
                set: { newText in
                    text = newText
                    material.values?.text = newText
                    onEvent([key: ["text": newText]])
                }
            )).lineSpacing(CGFloat(lineSpacing))
                .lineLimit(lineLimit)
        }

    }


    @ViewBuilder
    func textfield () -> some View{
        let key = material.values?.key ?? "textFieldChange"
        let initialText = material.values?.text ?? ""
        let placeholder = material.values?.placeholder ?? ""
        let textFieldStyle = material.values?.textFieldStyle
        @State var text: String = initialText


        TextField(placeholder, text: Binding(
            get: { text },
            set: { newText in
                text = newText
                material.values?.text = newText
                onEvent([key: ["text": newText]])
            })).applyTextFieldStyle(textFieldStyle)



    }

    @ViewBuilder
    func toggle() -> some View {
        let key = material.values?.key ?? "toggle"
        let initialState = material.values?.isOn ?? false
        let toggleStyle = material.values?.toggleStyle
        @State var isOn: Bool = initialState

        let binding = Binding<Bool>(
            get: { isOn },
            set: { newValue in
                isOn = newValue
                material.values?.isOn = newValue
                onEvent([key: ["isOn": newValue]])
            }
        )

        if let subviews = material.subviews {
            Toggle(isOn: binding) {
                ForEach(subviews) { subview in
                    ViewFactory(material: subview, children: children, onEvent: onEvent).toPresentable()
                }
            }.applyToggleStyle(toggleStyle)
        } else {
            Toggle(isOn: binding) {
                     EmptyView()
                 }.applyToggleStyle(toggleStyle)
        }
    }


    @ViewBuilder
    func colorpicker() -> some View {
        if #available(iOS 14.0, *) {
            let key = material.values?.key ?? "colorPicker"

            let binding = Binding<Color>(
                get: {
                    Color(hex: material.values?.hexColor ?? "#0000FF")
                },
                set: { newColor in
                    material.values?.hexColor = newColor.toHex()
                    onEvent([key: ["color": newColor.toHex()]])
                }
            )


            ColorPicker(material.values?.title ?? "Pick Color", selection: binding, supportsOpacity: true)
        } else {
            ErrorMessage(message: "ColorPicker requires iOS 14.0 or higher")
        }
    }




    @ViewBuilder
    func datepicker() -> some View {
        if #available(iOS 14.0, *) {
            let formatter = ISO8601DateFormatter()

            let key = material.values?.key ?? "datePicker"

            let selectedDate = formatter.date(from: material.values?.date ?? "") ?? Date()
            let minDate = formatter.date(from: material.values?.minDate ?? "")
            let maxDate = formatter.date(from: material.values?.maxDate ?? "")

            let title = material.values?.title ?? ""
            let isLabelHidden = material.values?.labelHidden ?? false
            let style = material.values?.datePickerStyle

            let binding = Binding<Date>(
                get: { selectedDate },
                set: { newDate in
                    let safeFormatter = ISO8601DateFormatter()
                    let dateString = safeFormatter.string(from: newDate)
                    material.values?.date = dateString
                    onEvent([key: ["date": dateString]])
                }
            )

            let datePicker = DatePicker(
                title,
                selection: binding,
                in: (minDate ?? .distantPast)...(maxDate ?? .distantFuture),
                displayedComponents: [.date]
            )
            .applyDatePickerStyle(style)
            .padding()

            if isLabelHidden {
                datePicker.labelsHidden()
            } else {
                datePicker
            }

        } else {
            ErrorMessage(message: "DatePicker requires iOS 14.0 or higher")
        }
    }

    @ViewBuilder
    func stepper() -> some View {
        let key = material.values?.key ?? "stepper"
        let minValue = material.minValue ?? 4
        let maxValue = material.maxValue ?? 10
        let step = material.step ?? 1

        let binding = Binding<Int>(
            get: { material.value ?? 0 },
            set: { newValue in
                let clamped = max(min(newValue, maxValue), minValue)
                material.value = clamped
                onEvent([key: ["value": clamped]])
            }
        )

        Stepper(
            material.values?.title ?? "",
            value: binding, in: minValue...maxValue, step: step)
    }



    @ViewBuilder
    func meshgradient() -> some View {
      if #available(iOS 18.0, *) {
        let colors: [Color] = (material.properties?.colors?.map { Color(hex: $0) }) ?? [.blue, .purple, .green]
        let basePoints: [[Double]] = material.properties?.points ?? []

        let rows = material.properties?.rows ?? 3
        let columns = material.properties?.columns ?? 3
        let smooth = material.properties?.smoothsColors ?? true
        let ignoresSafe = material.properties?.ignoresSafeArea ?? true
        let animationType = material.properties?.animationType ?? "none"

        // 🔁 Binding to external isAnimating state
        let animationBinding = Binding<Bool>(
          get: { material.properties?.isAnimating ?? false },
          set: { newValue in
            material.properties?.isAnimating = newValue
            onEvent([material.values?.key ?? "meshgradient": ["isAnimating": newValue]])
          }
        )

        let animatedPoints: [[Double]] = basePoints.enumerated().map { index, point in
          guard point.count == 2 else { return point }
          switch animationType {
          case "pulse":
            return [
              point[0] + (animationBinding.wrappedValue ? 0.02 : -0.02),
              point[1] + (animationBinding.wrappedValue ? -0.02 : 0.02)
            ]
          case "squish":
            return index == 4 ? [point[0], animationBinding.wrappedValue ? 0.8 : 0.5] : point
          case "wave":
            return index % 2 == 0 ?
              [point[0] + (animationBinding.wrappedValue ? 0.02 : -0.02), point[1]] :
              point
          default:
            return point
          }
        }

        MeshGradient(
          width: columns,
          height: rows,
          points: animatedPoints.map { SIMD2<Float>(Float($0[0]), Float($0[1])) },
          colors: colors,
          smoothsColors: smooth
        )
        .ignoresSafeArea(edges: ignoresSafe ? .all : [])
      } else {
        ErrorMessage(message: "MeshGradient requires iOS 18 or newer.")
      }
    }



    // MARK: - ActionSymbol

    @ViewBuilder
    func actionsymbol() -> some View {
      if let systemName = material.values?.systemIconName {
        let iconWeightKey = material.properties?.fontWeight ?? "regular"
        let iconSize = CGFloat(material.properties?.size ?? 20)
        let bgColor = Color(hex: material.properties?.backgroundColor ?? "#00000020")
        let cornerRadius = CGFloat(material.properties?.cornerRadius ?? 10)
        let width = CGFloat(material.properties?.backgroundWidth ?? 44)
        let height = CGFloat(material.properties?.backgroundHeight ?? 44)
          let actionBackgroundColor = Color(hex: material.properties?.actionBackgroundColor ?? "#FFFFFF")
        let fontWeight = Font.Weight.pick[iconWeightKey] ?? .regular

          if #available(iOS 15.0, *) {
              Image(systemName: systemName)
                  .font(.system(size: iconSize, weight: fontWeight))

                  .frame(width: width, height: height)
                  .background(
                    RoundedRectangle(cornerRadius: cornerRadius).foregroundStyle(actionBackgroundColor)
                  )
          } else {
              ErrorMessage(message: "In order to use Action Symbol your iOS version must be 15.0 or higher.")
          }
      } else {
        ErrorMessage(message: "Missing systemIconName for ActionSymbol")
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
        case .MeshGradient: meshgradient()
        case .ActionSymbol: actionsymbol()
        case .ColorPicker : colorpicker()
        case .DatePicker: datepicker()
        case .Stepper: stepper()
        case .Form: form()
        case .Toggle: toggle()
        case .TextEditor: texteditor()
        case .TextField: textfield()
        case .ToolBarItem: toolBarItem()
        case .EditButton: editButton()
        case .Pressable: pressable()

        default: EmptyView()
        }
    }

    @ViewBuilder func toPresentable() -> some View {
        let prop = material.properties
        let actionKey = material.values?.key ?? "onTapGesture"

        let uiComponent = buildDefault().embedInAnyView()


        uiComponent
            .modifier(ModifierFactory.PaddingModifier(padding: prop?.padding.toCGFloat()))
            .modifier(ModifierFactory.PaddingLeftModifier(padding: prop?.paddingLeft.toCGFloat()))
            .modifier(ModifierFactory.PaddingRightModifier(padding: prop?.paddingRight.toCGFloat()))
            .modifier(ModifierFactory.PaddingTopModifier(padding: prop?.paddingTop.toCGFloat()))
            .modifier(ModifierFactory.PaddingBottomModifier(padding: prop?.paddingBottom.toCGFloat()))
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
            .modifier(ModifierFactory.MultilineTextAlignment(alignment: prop?.multilineTextAlignment))

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





@available(iOS 15.0, *)
func checkSearchPlacement(_ placement: String?) -> SwiftUI.SearchFieldPlacement {
  switch placement {
  case "navigationBarDrawerAlways":
    return .navigationBarDrawer(displayMode: .always)
  case "navigationBarDrawer":
      return .navigationBarDrawer
  case "sidebar":
      return .sidebar
  case "toolabar":
      return .toolbar
  default:
    return .automatic
  }
}


@available(iOS 17.0, *)
func getSymbolEffect(name: String?) -> any SymbolEffect {
    switch name?.lowercased() {
    case "scale": return .scale
    case "bounce": return .bounce
    case "pulse": return .pulse
    case "appear": return .appear
    case "disappear": return .disappear
    case "wiggle":
        if #available(iOS 18.0, *) {
            return .wiggle
        } else {
            return .pulse
        }
    default:
        return .pulse
    }
}

func unitPoint(from string: String?) -> UnitPoint {
    switch string?.lowercased() {
    case "topleading": return .topLeading
    case "top": return .top
    case "toptrailing": return .topTrailing
    case "leading": return .leading
    case "center": return .center
    case "trailing": return .trailing
    case "bottomleading": return .bottomLeading
    case "bottom": return .bottom
    case "bottomtrailing": return .bottomTrailing
    default: return .topLeading // fallback
    }
}
