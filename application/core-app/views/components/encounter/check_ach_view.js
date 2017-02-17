alto_require('core-app/localization/en/strings.js');

CoreApp.CheckAchView = CoreOs.View.extend({
    classNames: ['check-ach-view'],
    childViews: ['AccountInformationFrame'],

    AccountInformationFrame: CoreOs.View.extend({
        classNames: ['account-information-frame'],
        childViews: ['Header', 'RoutingNumber', 'DriversLicense', 'CheckingNumber', 'CheckingNumberTwo', 'State'],

        Header: CoreOs.LabelView.extend({
            classNames: ['header'],
            title: Alto.String.loc('ACCOUNT_INFORMATION_HEADER')
        }),

        RoutingNumber: CoreOs.TextField.extend({
            classNames: ['left-textfield'],
            hint: Alto.String.loc('BANK_ROUTING_NUMBER_LABEL'),
            animateHint: true,
            valueBinding: 'CoreApp.accountController.routingNumber'
        }),

        CheckingNumber: CoreOs.TextField.extend({
            classNames: ['left-textfield', 'margin'],
            hint: Alto.String.loc('CHECKING_ACCOUNT_NUMBER_LABEL'),
            animateHint: true,
            valueBinding: 'CoreApp.accountController.accountNumber'
        }),

        CheckingNumberTwo: CoreOs.TextField.extend({
            classNames: ['right-textfield', 'margin'],
            hint: Alto.String.loc('REENTRY_CHECKING_ACCOUNT_NUMBER_LABEL'),
            animateHint: true,
            valueBinding: 'CoreApp.accountController.accountNumberDuplicate'
        }),

        DriversLicense: CoreOs.TextField.extend({
            classNames: ['right-textfield'],
            hint: Alto.String.loc('DRIVERS_LICENSE_LABEL'),
            animateHint: true,
            valueBinding: 'CoreApp.accountController.driverLicenceNumber'
        }),

        State: CoreOs.LabelSelectView.extend({
            classNames: ['state-form'],
            title: Alto.String.loc('STATE_FORM'),
            hint: Alto.String.loc('SELECT_STATE_HINT'),
            keyValue: 'name',
            optionsBinding: 'CoreOs.MapUtil.states',
            valueBinding: 'CoreApp.accountController.state'
        })
    })
})