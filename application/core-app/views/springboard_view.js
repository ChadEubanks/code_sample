// ==========================================================================
// Project: CoreOs - JavaScript Application Framework
// Copyright: @2015 The Code Boutique, LLC
// License:   Intellectual property of The Code Boutique. LLC
// ==========================================================================

CoreApp.SpringboardView = CoreOs.View.extend({
    classNames: ['springboard-view'],
    childViews: ['TopToolbar', 'ApplicationsFrame'],

    TopToolbar: CoreOs.View.extend({
        classNames: ['top-tool-bar'],
        childViews: ['LwIcon', 'UserButton'],

        LwIcon: CoreOs.View.extend({
            classNames: ['lw-logo', 'images-lw-logo-white']
        }),

        UserButton: CoreOs.ButtonView.extend(CoreOs.RightIconButtonViewMixin, {
            classNames: ['user-button'],
            iconClassNames: ['lw-drop-down-arrow', 'images-drop_down_arrow_white'],
            titleBinding: 'CoreApp.userController.firstName',
            action: 'displaySpringboardOptionMenu'
        })

    }),

    ApplicationsFrame: CoreOs.View.extend({
        classNames: ['application-frame'],
        childViews: ['ApplicationsListView'],

        ApplicationsListView: CoreOs.ListView.extend({
            classNames: ['applications-list-view'],
            dataBinding: 'CoreApp.springboardController.content',

            Cell: CoreOs.Cell.extend({
                classNames: ['cell'],
                childViews: ['ApplicationIcon', 'ApplicationName'],
                action: 'launchApp',
                isVisibleBinding: 'data.isVisible',

                ApplicationIcon: CoreOs.SpringboardIconView.extend({
                    classNames: ['application-icon'],
                    iconNameBinding: 'parentView.data.applicationIcon',
                    isDisabledBinding: 'parentView.data.isDisabled'
                }),

                ApplicationName: CoreOs.LabelView.extend({
                    classNames: ['application-name'],
                    titleBinding: 'parentView.data.applicationName'
                })

            })

        })

    })

});