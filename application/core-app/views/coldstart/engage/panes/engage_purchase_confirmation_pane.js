alto_require('core-app/localization/en/strings.js');

CoreApp.EngagePurchaseConfirmationPane = CoreOs.ModalPane.extend({
    classNames: ['purchase-confirmation-pane'],
    action: 'cancelConfirmation',

    ContentView: CoreOs.View.extend({
        classNames: ['content-view'],
        childViews: ['Header', 'PurchaseContainer', 'ButtonFrame'],
        stopPropagation: true,

        Header: CoreOs.LabelView.extend({
            classNames: ['header'],
            title: Alto.String.loc('ENGAGE_LICENSE_CONFIRMATION_HEADER')
        }),

        PurchaseContainer: CoreOs.View.extend({
            classNames: ['purchase-container'],
            childViews: ['SetupFeeFrame', 'TaxFrame', 'TotalFrame'],

            SetupFeeFrame: CoreOs.View.extend({
                classNames: ['purchase-frame'],
                childViews: ['Text', 'Value'],

                Text: CoreOs.LabelView.extend({
                    classNames: ['text'],
                    title: Alto.String.loc('ENGAGE_SETUP_FEE_LABEL')
                }),

                Value: CoreOs.LabelView.extend({
                    classNames: ['value'],
                    titleBinding: 'CoreApp.paymentPlanController.formattedYearlyPrice'
                })
            }),

            TaxFrame: CoreOs.View.extend({
                classNames: ['purchase-frame'],
                childViews: ['Text', 'Value'],

                Text: CoreOs.LabelView.extend({
                    classNames: ['text'],
                    title: Alto.String.loc('SALES_TAX_LABEL')
                }),

                Value: CoreOs.LabelView.extend({
                    classNames: ['value'],
                    titleBinding: 'CoreApp.paymentPlanController.formattedYearlyTax'
                })
            }),

            TotalFrame: CoreOs.View.extend({
                classNames: ['purchase-frame', 'total'],
                childViews: ['Text', 'Value'],

                Text: CoreOs.LabelView.extend({
                    classNames: ['text', 'bold'],
                    title: Alto.String.loc('TOTAL_LABEL')
                }),

                Value: CoreOs.LabelView.extend({
                    classNames: ['value', 'bold'],
                    titleBinding: 'CoreApp.paymentPlanController.formattedYearlyTotal'
                })
            })
        }),

        ButtonFrame: CoreOs.View.extend({
            classNames: ['button-frame'],
            childViews: ['CancelButton', 'PurchaseButton'],

            CancelButton: CoreOs.ButtonView.extend({
                classNames: ['cancel-button'],
                title: Alto.String.loc('CANCEL_BUTTON_TITLE'),
                action: 'cancelConfirmation'
            }),

            PurchaseButton: CoreOs.ButtonView.extend({
                classNames: ['purchase-button'],
                title: Alto.String.loc('PURCHASE_NOW_BUTTON_TITLE'),
                action: 'purchaseLicense'
            })
        })
    })
})