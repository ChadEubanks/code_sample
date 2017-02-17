CoreApp.AccountSettingsView = CoreOs.View.extend({
    classNames: ['lw-account-settings-view'],
    childViews: ['Toolbar', 'ContentFrame'],

    Toolbar: CoreOs.View.extend({
        classNames: ['toolbar'],
        childViews: ['LwIconView'],

        LwIconView: CoreOs.View.extend({
            classNames: ['lw-icon-view', 'images-lw-logo-blue']
        })
    }),

    ContentFrame: CoreOs.View.extend({
        classNames: ['content-frame'],
        childViews: ['MockBaseView', 'DocumentFrame'],

        MockBaseView: CoreOs.View.extend({
            classNames: ['mock-base-view']
        }),

        DocumentFrame: CoreOs.View.extend({
            classNames: ['document-frame'],
            childViews: ['InformationFrame', 'ButtonToolbar'],

            InformationFrame: CoreOs.View.extend({
                classNames: ['information-frame'],
                childViews: ['Header', 'UserFrame'],

                Header: CoreOs.LabelView.extend({
                    classNames: ['header'],
                    title: Alto.String.loc('LOGIN_INFORMATION_HEADER')
                }),

                UserFrame: CoreOs.View.extend({
                    classNames: ['user-frame'],
                    childViews: ['FullNameFrame', 'EmailFrame'],

                    FullNameFrame: CoreOs.View.extend({
                        classNames: ['full-name-frame'],
                        childViews: ['FirstNameFrame', 'LastNameFrame'],

                        FirstNameFrame: CoreOs.View.extend({
                            classNames: ['first-name-frame'],
                            childViews: ['FirstNameHeader', 'FirstName'],

                            FirstNameHeader: CoreOs.LabelView.extend({
                                classNames: ['name-header'],
                                title: Alto.String.loc('FIRST_NAME_HEADER')
                            }),

                            FirstName: CoreOs.TextField.extend({
                                classNames:['first-name'],
                                valueBinding: 'CoreApp.userController.firstName'
                            })
                        }),


                        LastNameFrame: CoreOs.View.extend({
                            classNames: ['last-name-frame'],
                            childViews: ['LastNameHeader', 'LastName'],

                            LastNameHeader: CoreOs.LabelView.extend({
                                classNames: ['name-header'],
                                title: Alto.String.loc('LAST_NAME_HEADER')
                            }),

                            LastName: CoreOs.TextField.extend({
                                classNames:['last-name'],
                                valueBinding: 'CoreApp.userController.lastName'
                            })
                        })

                    }),

                    EmailFrame: CoreOs.View.extend({
                        classNames: ['email-frame'],
                        childViews: ['EmailHeader', 'Email'],

                        EmailHeader: CoreOs.LabelView.extend({
                            classNames: ['email-header'],
                            title: Alto.String.loc('EMAIL_ADDRESS_HEADER')
                        }),

                        Email: CoreOs.TextField.extend({
                            classNames: ['email'],
                            valueBinding: 'CoreApp.userController.email'
                        })
                    })
                })
            }),

            ButtonToolbar: CoreOs.View.extend({
                classNames: ['button-toolbar'],
                childViews: ['BackButton', 'SaveButton', 'PasswordButton'],

                BackButton: CoreOs.ButtonView.extend({
                    classNames: ['back-button'],
                    title: Alto.String.loc('BACK_BUTTON_TITLE'),
                    action: 'goToBaseRoute'
                }),

                PasswordButton: CoreOs.ButtonView.extend({
                    classNames: ['password-button'],
                    title: Alto.String.loc('CHANGE_PASSWORD_BUTTON_TITLE'),
                    action: 'changePassword'
                }),

                SaveButton: CoreOs.ButtonView.extend({
                    classNames: ['save-button'],
                    title: Alto.String.loc('SAVE_CHANGES_BUTTON_TITLE'),
                    action: 'saveAccountChanges'
                })
            })
        })
    })
})