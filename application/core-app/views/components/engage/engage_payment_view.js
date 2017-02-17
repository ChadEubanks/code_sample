alto_require('core-app/localization/en/strings.js');

CoreApp.EngagePaymentView = CoreOs.View.extend({
    classNames: ['engage-payment-view'],
    childViews: ['DocumentFrame'],

    DocumentFrame: CoreOs.View.extend({
        classNames: ['document-frame'],
        childViews: ['Header', 'PaymentInformationFrame', 'TermsAndConditionsFrame', 'Toolbar'],


        Header: CoreOs.LabelView.extend({
            classNames: ['add-payment-header'],
            title: Alto.String.loc('ADD_METHOD_PAYMENT_HEADER')
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
                    classNames: ['images-info-glyph-2x'],
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

        Toolbar: CoreOs.View.extend({
            classNames: ['bottom-toolbar'],
            childViews: ['BackButton', 'ContinueButton'],

            BackButton: CoreOs.ButtonView.extend({
                classNames: ['back-button'],
                title: Alto.String.loc('BACK_BUTTON_TITLE'),
                action: 'previous'
            }),

            ContinueButton: CoreOs.ButtonView.extend({
                classNames: ['continue-button'],
                title: Alto.String.loc('CONTINUE_BUTTON_TITLE'),
                action: 'displayPurchaseConfirmationPane'
            })
        })
    })

})