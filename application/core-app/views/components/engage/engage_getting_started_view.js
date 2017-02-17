CoreApp.EngageGettingStartedView = CoreOs.View.extend({
    classNames: ['engage-getting-started-view'],
    childViews: ['DocumentFrame'],

    DocumentFrame: CoreOs.View.extend({
        classNames: ['document-frame'],
        childViews: ['Header', 'AdminFrame', 'OrganizationFrame', 'Toolbar'],

        Header: CoreOs.LabelView.extend({
            classNames: ['getting-started-header'],
            title: Alto.String.loc('GETTING_STARTED_HEADER')
        }),

        AdminFrame: CoreOs.View.extend({
            classNames: ['admin-frame'],
            childViews: ['HeaderFrame', 'LoginFrame'],

            HeaderFrame: CoreOs.View.extend({
                classNames: ['header-frame'],
                childViews: ['Header', 'InfoGlyph'],

                Header: CoreOs.LabelView.extend({
                    classNames: ['admin-header'],
                    title: Alto.String.loc('CREATE_ADMIN_HEADER')
                }),

                InfoGlyph: CoreOs.View.extend({
                    classNames: ['images-info-glyph-2x'],
                    action: 'displaySectionInfo',
                    title: Alto.String.loc('CREATE_ACCOUNT_LOGIN_INFO')
                })
            }),

            LoginFrame: CoreOs.View.extend({
                classNames: ['login-frame'],
                childViews: ['FirstName', 'LastName', 'Email', 'Password', 'ConfirmPassword'],

                FirstName: CoreOs.TextField.extend({
                    classNames: ['first-name'],
                    hint: Alto.String.loc('FIRST_NAME_LABEL'),
                    animateHint: true,
                    valueBinding: 'CoreApp.accountController.firstName'
                }),

                LastName: CoreOs.TextField.extend({
                    classNames: ['last-name', 'middle'],
                    hint: Alto.String.loc('LAST_NAME_LABEL'),
                    animateHint: true,
                    valueBinding: 'CoreApp.accountController.lastName'
                }),

                Email: CoreOs.TextField.extend({
                    classNames: ['email'],
                    hint: Alto.String.loc('EMAIL_LABEL'),
                    animateHint: true,
                    valueBinding: 'CoreApp.accountController.email'
                }),

                Password: CoreOs.TextField.extend({
                    classNames: ['password'],
                    hint: Alto.String.loc('PASSWORD_LABEL'),
                    animateHint: true,
                    type: 'password',
                    valueBinding: 'CoreApp.accountController.password'
                }),

                ConfirmPassword: CoreOs.TextField.extend({
                    classNames: ['company-name', 'middle'],
                    hint: Alto.String.loc('CONFIRM_PASSWORD_LABEL'),
                    animateHint: true,
                    valueBinding: 'CoreApp.accountController.confirmPassword'
                })
            })

        }),

        OrganizationFrame: CoreOs.View.extend({
            classNames: ['organization-frame'],
            childViews: ['HeaderFrame', 'OrganizationDetailsFrame'],

            HeaderFrame: CoreOs.View.extend({
                classNames: ['header-frame'],
                childViews: ['Header', 'InfoGlyph'],

                Header: CoreOs.LabelView.extend({
                    classNames: ['organization-header'],
                    title: Alto.String.loc('CREATE_YOUR_ORGANIZATION_HEADER')
                }),

                InfoGlyph: CoreOs.View.extend({
                    classNames: ['images-info-glyph-2x'],
                    action: 'displaySectionInfo',
                    title: Alto.String.loc('CREATE_ACCOUNT_LOGIN_INFO')
                })
            }),

            OrganizationDetailsFrame: CoreOs.View.extend({
                classNames: ['organization-details-frame'],
                childViews: ['OrganizationTitle', 'Phone', 'NPI', 'AddressOne', 'AddressTwo', 'City', 'State', 'Zip'],

                OrganizationTitle: CoreOs.TextField.extend({
                    classNames: ['organization-title'],
                    hint: Alto.String.loc('ORGANIZATION_TITLE'),
                    animateHint: true,
                    valueBinding: 'CoreApp.accountController.organizationTitle'
                }),

                Phone: CoreOs.TextField.extend({
                    classNames: ['phone', 'middle'],
                    hint: Alto.String.loc('PHONE_FORM'),
                    animateHint: true,
                    valueBinding: 'CoreApp.accountController.phone'
                }),

                NPI: CoreOs.TextField.extend({
                    classNames: ['npi'],
                    hint: Alto.String.loc('NPI_LABEL_2'),
                    animateHint: true,
                    valueBinding: 'CoreApp.accountController.npi'
                }),

                AddressOne: CoreOs.TextField.extend({
                    classNames: ['address-one'],
                    hint: Alto.String.loc('STREET_ONE_LABEL'),
                    animateHint: true,
                    valueBinding: 'CoreApp.accountController.address1'
                }),

                AddressTwo: CoreOs.TextField.extend({
                    classNames: ['address-two', 'middle'],
                    hint: Alto.String.loc('STREET_TWO_LABEL'),
                    animateHint: true,
                    valueBinding: 'CoreApp.accountController.address2'
                }),

                City: CoreOs.TextField.extend({
                    classNames: ['city'],
                    hint: Alto.String.loc('CITY_FORM'),
                    animateHint: true,
                    valueBinding: 'CoreApp.accountController.city'
                }),

                State: CoreOs.LabelSelectView.extend({
                    classNames: ['state-form'],
                    title: Alto.String.loc('STATE_FORM'),
                    hint: Alto.String.loc('SELECT_STATE_HINT'),
                    keyValue: 'name',
                    optionsBinding: 'CoreOs.MapUtil.states',
                    valueBinding: 'CoreApp.accountController.state',

                    valueDidChange: Alto.observer('value', function () {
                        var that =  this,
                            states = CoreOs.MapUtil.states,
                            state = states.filter(function (obj) {
                                return Alto.isEqual(obj.name, that.get('value'))
                            });

                        CoreApp.accountController.set('stateAbbreviation', state[0].abbreviation);
                    })
                }),

                Zip: CoreOs.TextField.extend({
                    classNames: ['zip', 'middle'],
                    hint: Alto.String.loc('ZIP_FORM'),
                    animateHint: true,
                    valueBinding: 'CoreApp.accountController.zip'
                })
            })

        }),

        Toolbar: CoreOs.View.extend({
            classNames: ['bottom-toolbar'],
            childViews: ['ContinueButton'],

            ContinueButton: CoreOs.ButtonView.extend({
                classNames: ['continue-button'],
                title: Alto.String.loc('CONTINUE_BUTTON_TITLE'),
                action: 'continue'
            })
        })
    })
})