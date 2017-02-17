CoreApp.InfoSectionView = CoreOs.PickerPane.extend({
    classNames: ['info-section-view'],
    childViews: ['ContentView', 'Anchor'],

    title: null,

    Anchor: CoreOs.View.extend({
        classNames: ['custom-anchor']
    }),

    ContentView: CoreOs.View.extend({
        classNames: ['content-view'],
        childViews: ['Message'],
        stopPropagation: true,

        Message: CoreOs.LabelView.extend({
            classNames: ['message'],
            titleBinding: 'parentView.parentView.title'
        })
    })
})