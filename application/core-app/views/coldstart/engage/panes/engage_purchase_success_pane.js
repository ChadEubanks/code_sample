alto_require('core-app/localization/en/strings.js');

CoreApp.EngagePurchaseSuccessPane = CoreOs.ModalPane.extend({
    classNames: ['purchase-success-pane'],

    ContentView: CoreOs.View.extend({
        classNames: ['content-view'],
        childViews: ['SuccessIcon', 'Message', 'ButtonFrame'],
        stopPropagation: true,

        SuccessIcon: CoreOs.View.extend({
            classNames: ['images-success-icon-green']
        }),

        Message: CoreOs.LabelView.extend({
            classNames: ['message'],
            title: Alto.String.loc('ENGAGE_PURCHASE_SUCCESS_MESSAGE')
        }),

        ButtonFrame: CoreOs.View.extend({
            classNames: ['button-frame'],
            childViews: ['ViewDashboardButton'],

            ViewDashboardButton: CoreOs.ButtonView.extend({
                classNames: ['view-dashboard-button'],
                title: Alto.String.loc('VIEW_DASHBOARD_BUTTON_TITLE'),
                action: 'transitionToDashboardRoute'
            })
        })
    })
})