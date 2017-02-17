alto_require('core-app/localization/en/strings.js');

CoreApp.CreditCardView = CoreOs.View.extend({
    classNames: ['credit-card-view'],
    childViews: ['CardInformationFrame', 'BillingAddressFrame'],

    CardInformationFrame: CoreOs.View.extend({
        classNames: ['card-information-frame'],
        childViews: ['Header', 'CardNumber', 'ExpirationDate', 'CCV'],

        Header: CoreOs.LabelView.extend({
            classNames: ['header'],
            title: Alto.String.loc('CARD_INFORMATION_HEADER')
        }),

        CardNumber: CoreOs.TextField.extend({
            classNames: ['left-textfield'],
            hint: Alto.String.loc('CARD_NUMBER_LABEL'),
            animateHint: true,
            maxLength: 16,
            valueBinding: 'CoreApp.accountController.cardNumber'
        }),

        ExpirationDate: CoreOs.View.extend({
            classNames: ['right-textfield', 'expiration'],
            childViews: ['ExpirationDateLabel', 'MonthSelectMenu', 'YearSelectMenu'],

            ExpirationDateLabel: CoreOs.LabelView.extend({
                classNames: ['expiration-date-label'],
                title: Alto.String.loc('EXPIRATION_DATE_LABEL')
            }),

            MonthSelectMenu: CoreOs.LabelSelectView.extend({
                classNames: ['month-select-menu'],
                hint: Alto.String.loc('SELECT_MONTH_HINT'),
                optionsBinding: 'CoreOs.date.monthsNumeral',
                valueBinding: 'CoreApp.accountController.expirationMonth'
            }),

            YearSelectMenu: CoreOs.LabelSelectView.extend({
                classNames: ['year-select-menu'],
                hint: Alto.String.loc('SELECT_YEAR_HINT'),
                optionsBinding: 'CoreOs.date.futureYears',
                valueBinding: 'CoreApp.accountController.expirationYear'
            })
        }),

        CCV: CoreOs.TextField.extend({
            classNames: ['left-textfield', 'ccv'],
            hint: Alto.String.loc('CCV_LABEL'),
            animateHint: true,
            maxLength: 3,
            valueBinding: 'CoreApp.accountController.cvc'
        })
    }),

    BillingAddressFrame: CoreOs.View.extend({
        classNames: ['billing-address-frame'],
        childViews: ['Header', 'Phone', 'AddressOne', 'AddressTwo', 'City', 'State', 'Zip', 'Country'],

        Header: CoreOs.LabelView.extend({
            classNames: ['header'],
            title: Alto.String.loc('BILLING_ADDRESS_HEADER')
        }),

        Phone: CoreOs.TextField.extend({
            classNames: ['left-textfield'],
            hint: Alto.String.loc('PHONE_FORM'),
            animateHint: true,
            maxLength: 14,
            valueBinding: 'CoreApp.accountController.telephone',

            valueDidChange: function () {
                this._super();
                this.node.children[1].value = this.get('value');
            }.observes('this.value')
        }),

        AddressOne: CoreOs.TextField.extend({
            classNames: ['right-textfield', 'address-one'],
            hint: Alto.String.loc('STREET_ONE_LABEL'),
            animateHint: true,
            valueBinding: 'CoreApp.accountController.address1'
        }),

        AddressTwo: CoreOs.TextField.extend({
            classNames: ['left-textfield', 'margin', 'address-two'],
            hint: Alto.String.loc('STREET_TWO_LABEL'),
            animateHint: true,
            valueBinding: 'CoreApp.accountController.address2'
        }),

        City: CoreOs.TextField.extend({
            classNames: ['right-textfield', 'margin', 'city'],
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
            classNames: ['right-textfield', 'margin', 'zip'],
            hint: Alto.String.loc('ZIP_FORM'),
            animateHint: true,
            maxLength: 5,
            valueBinding: 'CoreApp.accountController.zipCode'
        }),

        Country: CoreOs.LabelSelectView.extend({
            classNames: ['country-form'],
            title: Alto.String.loc('COUNTRY_LABEL'),
            hint: Alto.String.loc('SELECT_COUNTRY_HINT'),
            keyValue: 'name',
            optionsBinding: 'CoreOs.MapUtil.countries',
            valueBinding: 'CoreApp.accountController.country'
        })
    })
})