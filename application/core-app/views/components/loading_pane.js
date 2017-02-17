CoreApp.LoadingPane = CoreOs.LoadingPane.extend({
    classNames: ['lw-loading-pane'],
    childViews: ['ContentView'],

    dismissAction: 'remove',

    status: null,

    attachToNode: 'body',

    ContentView: CoreOs.View.extend({
        classNames: ['content-view'],
        childViews: ['StatusText', 'SpinnerView', 'DismissButton'],

        StatusText: CoreOs.LabelView.extend({
            classNames: ['status-text'],
            titleBinding: 'parentView.parentView.status'
        }),

        SpinnerView: CoreOs.View.extend({
            classNames: ['loader'],
            isVisible: true
        }),

        DismissButton: CoreOs.ButtonView.extend({
            classNames: ['dismiss-button'],
            title: 'Dismiss',
            isVisible: false,
            actionBinding: 'parentView.parentView.dismissAction'
        })

    }),

    renderError: function (error) {
        this.node.children[0].children[1].classList.add('hidden');
        this.node.children[0].children[2].classList.remove('hidden');
        this.set('status', '%@.'.fmt(error.capitalize()));
    }

});