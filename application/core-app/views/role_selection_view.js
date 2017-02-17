CoreApp.RoleSelectionView = CoreOs.View.extend({
    classNames: ['role-selection-view'],
    childViews: ['TopToolbar', 'ContentFrame'],

    TopToolbar: CoreOs.View.extend({
        classNames: ['top-tool-bar'],
        childViews: ['LwIcon'],

        LwIcon: CoreOs.View.extend({
            classNames: ['lw-logo', 'images-lw-logo']
        }),

    }),

    ContentFrame: CoreOs.View.extend({
        classNames: ['content-frame'],
        childViews: ['TextFrame', 'LoginPane'],

        TextFrame: CoreOs.View.extend({
            classNames: ['text-frame'],
            childViews: ['Header', 'Context', 'SubText'],

            Header: CoreOs.LabelView.extend({
                classNames: ['header'],
                title: 'Select Role'
            }),

            Context: CoreOs.LabelView.extend({
                classNames: ['context'],
                title: 'Your account is associated to multiple roles.'
            }),

            SubText: CoreOs.LabelView.extend({
                classNames: ['sub-text'],
                title: 'Choose which role you would like to use at this time.'
            })

        }),

        LoginPane: CoreOs.View.extend({
            classNames: ['login-pane'],
            childViews: ['ListView', 'ActionItemFrame'],

            ListView: CoreOs.ListView.extend({
                classNames: ['list-view'],
                dataBinding: 'CoreApp.rolesController.content',

                Cell: CoreOs.Cell.extend({
                    classNames: ['cell'],
                    childViews: ['RadioButton'],

                    RadioButton: CoreOs.Checkbox.extend({
                        classNames: ['radio-button'],
                        childViews: ['RoleLabel', 'CompanyNameLabel'],
                        name: 'role-radio',
                        isRadio: true,
                        valueBinding: 'parentView.data',
                        selectionBinding: 'CoreApp.roleController.content',

                        RoleLabel: CoreOs.LabelView.extend({
                            classNames: ['type-label'],
                            titleBinding: 'parentView.parentView.data.type'
                        }),

                        CompanyNameLabel: CoreOs.LabelView.extend({
                            classNames: ['company-label'],
                            titleBinding: 'parentView.parentView.data.companyName'
                        })

                    })

                })

            }),

            ActionItemFrame: CoreOs.View.extend({
                classNames: ['action-item-frame'],
                childViews: ['SubmitButton'],

                SubmitButton: CoreOs.ButtonView.extend({
                    classNames: ['submit-buttom'],
                    title: 'Submit',
                    action: 'goToSpringboard'
                })

            })

        })

    })

});