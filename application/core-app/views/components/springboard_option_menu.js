// ==========================================================================
// Project: CoreOs - JavaScript Application Framework
// Copyright: @2015 The Code Boutique, LLC
// License:   Intellectual property of The Code Boutique. LLC
// ==========================================================================

CoreApp.SpringboardOptionMenu = CoreOs.PickerPane.extend({
    classNames: ['user-option-menu'],
    action: 'removeSpringboardOptionMenu',

    ContentView: CoreOs.ListView.extend({
        classNames: ['options-content-view'],
        data: Alto.computed(function () {
            var buttons = [
                    Alto.Object.create({
                        title: 'Account Settings',
                        action: 'profileAction'
                    }),

                    Alto.Object.create({
                        title: 'Log Out',
                        action: 'logoutAction'
                    })
                ];

            if (CoreApp.rolesController.get('content').length > 1) {
                buttons.insertAt(1, Alto.Object.create({
                    title: 'Switch Role',
                    action: 'switchRole'
                }));
            }

            return buttons;
        }),
        stopPropagation: true,


        Cell: CoreOs.Cell.extend({
            classNames: ['options-cell'],
            childViews: ['ActionLabel'],
            actionBinding: 'data.action',

            ActionLabel: CoreOs.LabelView.extend({
                classNames: ['action-label'],
                titleBinding: 'parentView.data.title'
            })
        })
    })
})