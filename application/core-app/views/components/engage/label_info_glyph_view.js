CoreApp.LabelInfoGlyphView = CoreOs.View.extend({
    classNames :['label-info-glyph-view'],
    childViews: ['Label', 'InfoGlyph'],

    title: null,

    Label: CoreOs.LabelView.extend({
        classNames: ['package-label'],
        titleBinding: 'parentView.title'
    }),

    InfoGlyph: CoreOs.View.extend({
        classNames: ['images-info-glyph-2x'],
        action: 'displayInfoGlyph'
    })
})