alto_require('core-app/views/components/encounter/payment_information_segmented_view.js');
alto_require('core-app/localization/en/strings.js');

CoreApp.EncounterCreateAccountView = CoreOs.View.extend({
    classNames: ['create-account-view'],
    childViews: ['Toolbar', 'ContentFrame'],

    Toolbar: CoreOs.View.extend({
        classNames: ['toolbar'],
        childViews: ['ApplicationLabel', 'SignInFrame'],

        ApplicationLabel: CoreOs.LabelView.extend({
            classNames: ['application-label', 'images-encounter-application-icon'],
            title: Alto.String.loc('ENCOUNTER_APPLICATION_NAME')
        }),

        SignInFrame: CoreOs.View.extend({
            classNames: ['sign-in-frame'],
            childViews: ['AccountLabel', 'SignInButton'],

            AccountLabel: CoreOs.LabelView.extend({
                classNames: ['account-label'],
                title: Alto.String.loc('EXISTING_ACCOUNT_LABEL')
            }),

            SignInButton: CoreOs.ButtonView.extend({
                classNames: ['sign-in-button'],
                title: Alto.String.loc('SIGN_IN_BUTTON_TITLE'),
                action: 'transitionToIndexRoute'
            })
        })
    }),

    ContentFrame: CoreOs.View.extend({
        classNames: ['content-frame'],
        childViews: ['DocumentFrame'],

        DocumentFrame: CoreOs.View.extend({
            classNames: ['document-frame'],
            childViews: ['Header', 'CreateLoginFrame', 'PaymentInformationFrame', 'TermsAndConditionsFrame', 'ButtonFrame'],

            Header: CoreOs.LabelView.extend({
                classNames: ['encounter-header'],
                title: Alto.String.loc('ENCOUNTER_WELCOME_HEADER')
            }),

            CreateLoginFrame: CoreOs.View.extend({
                classNames: ['create-login-frame'],
                childViews: ['HeaderFrame', 'LoginFrame'],

                HeaderFrame: CoreOs.View.extend({
                    classNames: ['header-frame'],
                    childViews: ['LoginHeader', 'InfoGlyph'],

                    LoginHeader: CoreOs.LabelView.extend({
                        classNames: ['login-header'],
                        title: Alto.String.loc('CREATE_ACCOUNT_LOGIN_HEADER')
                    }),

                    InfoGlyph: CoreOs.View.extend({
                        classNames: ['images-info-glyph'],
                        action: 'displaySectionInfo',
                        title: Alto.String.loc('CREATE_ACCOUNT_LOGIN_INFO')
                    })
                }),

                LoginFrame: CoreOs.View.extend({
                    classNames: ['login-frame'],
                    childViews: ['FirstName', 'LastName', 'Email', 'Password', 'CompanyName'],

                    FirstName: CoreOs.TextField.extend({
                        classNames: ['first-name'],
                        hint: Alto.String.loc('FIRST_NAME_LABEL'),
                        animateHint: true,
                        valueBinding: 'CoreApp.accountController.firstName'
                    }),

                    LastName: CoreOs.TextField.extend({
                        classNames: ['last-name'],
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

                    CompanyName: CoreOs.TextField.extend({
                        classNames: ['company-name'],
                        hint: Alto.String.loc('COMPANY_NAME_LABEL'),
                        animateHint: true,
                        valueBinding: 'CoreApp.accountController.name'
                    }),

                    NPI: CoreOs.TextField.extend({
                        classNames: ['npi'],
                        hint: Alto.String.loc('NPI_LABEL'),
                        animateHint: true,
                        valueBinding: 'CoreApp.accountController.npi'
                    })
                })
            }),

            PaymentInformationFrame: CoreOs.View.extend({
                classNames: ['payment-information-frame'],
                childViews: ['HeaderFrame', 'PaymentSegmentedView'],

                HeaderFrame: CoreOs.View.extend({
                    classNames: ['header-frame'],
                    childViews: ['LoginHeader', 'InfoGlyph'],

                    LoginHeader: CoreOs.LabelView.extend({
                        classNames: ['login-header'],
                        title: Alto.String.loc('PAYMENT_INFORMATION_HEADER')
                    }),

                    InfoGlyph: CoreOs.View.extend({
                        classNames: ['images-info-glyph'],
                        action: 'displaySectionInfo',
                        title: Alto.String.loc('PAYMENT_INFORMATION_INFO')
                    })
                }),

                PaymentSegmentedView: CoreApp.PaymentInformationSegmentedView.extend()
            }),

            TermsAndConditionsFrame: CoreOs.View.extend({
                classNames: ['terms-and-conditions-frame'],
                childViews: ['TermsAndConditions', 'TermsAndConditionsLink', 'PrivacyPolicyLink', 'Checkbox'],

                TermsAndConditions: CoreOs.LabelView.extend({
                    classNames: ['terms-and-conditions'],
                    title: Alto.String.loc('TERMS_AND_CONDITIONS_MESSAGE')
                }),

                TermsAndConditionsLink: CoreOs.LinkView.extend({
                    classNames: ['terms-and-conditions-link'],
                    title: Alto.String.loc('TERMS_AND_CONDITIONS_BUTTON_TITLE'),
                    href: 'https://www.lifewallet.com/terms-of-use.html'
                }),

                PrivacyPolicyLink: CoreOs.LinkView.extend({
                    classNames: ['privacy-policy-link'],
                    title: Alto.String.loc('PRIVACY_POLICY_BUTTON_TITLE'),
                    href: 'https://www.lifewallet.com/privacy-policy.html'
                }),

                Checkbox: CoreOs.Checkbox.extend({
                    classNames: ['terms-and-condition-checkbox'],
                    title: Alto.String.loc('ACCOUNT_TERMS_AND_CONDITIONS_CHECKBOX'),
                    isCheckedBinding: 'CoreApp.accountController.isReadTermsAndConditions'
                })
            }),

            ButtonFrame: CoreOs.View.extend({
                classNames: ['account-button-frame'],
                childViews: ['CompleteButton'],

                CompleteButton: CoreOs.ButtonView.extend({
                    classNames: ['complete-button', 'disabled'],
                    title: Alto.String.loc('CONTINUE_BUTTON_TITLE'),
                    action: 'fetchPaymentPlans',

                    viewDidLoad: function (node) {
                        this._super(node);

                        node.disabled = true;
                    },

                    isReadDidChange: Alto.observer('CoreApp.accountController.isReadTermsAndConditions', function () {
                        if (CoreApp.accountController.get('isReadTermsAndConditions')) {
                            this.node.disabled = false;
                            this.node.classList.remove('disabled');
                        } else {
                            this.node.disabled = true;
                            this.node.classList.add('disabled');
                        }

                    })
                })
            })
        })
    })
})