CoreApp.EngageAccountRecord = Alto.Object.extend({

    email: '',
    password: '',
    confirmPassword: '',
    titleOfParentFacility: '',
    npi: '',

    paymentMethod: '',  //credit or check
    cardNumber: '',
    nameOnCard: '',
    expirationMonth: '',
    expirationYear: '',
    cvc: '',

    firstName: '',
    lastName: '',
    telephone: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    stateAbbreviation: '',
    zipCode: '',
    country: '',

    routingNumber: '',
    accountNumber: '',
    accountNumberDuplicate: '',
    driverLicenceNumber: '',

    // ui
    isCreditCardModel: true,
    isCheckAchModel: false,
    pricingModelType: 'credit_card',
    isReadTermsAndConditions: false,


    // computed
    expirationDate: Alto.computed('expirationMonth', 'expirationYear', function () {
        return ('%@/%@'.fmt(this.get('expirationMonth'), this.get('expirationYear')));
    }).volatile(),



    // observers
    isCreditCardModelDidChange: Alto.observer('isCreditCardModel', function () {
        if (this.get('isCreditCardModel')) {
            this.set('isCheckAchModel', false);
            this.set('pricingModelType', 'credit_card');
            this.set('paymentMethod', 'credit');
        }
    }).on('init'),

    isCheckAchModelDidChange: Alto.observer('isCheckAchModel', function () {
        if (this.get('isCheckAchModel')) {
            this.set('isCreditCardModel', false);
            this.set('pricingModelType', 'check_ach');
            this.set('paymentMethod', 'check');
        }
    }).on('init'),

    telephoneDidChange: Alto.observer('telephone', function () {
        this.formatPhoneNumber('telephone');
    }),

    formatPhoneNumber: function (key) {
        var number = this.get(key),
            parts, phone,
            regexObj = /^(?:\+?1[-. ]?)?(?:\(?([0-9]{3})\)?[-. ]?)?([0-9]{3})[-. ]?([0-9]{4})$/;

        if (regexObj.test(number)) {
            parts = number.match(regexObj);
            phone = '';

            if (parts[1]) {
                phone += "(" + parts[1] + ") ";
            }
            phone += parts[2] + "-" + parts[3];

            this.set(key, phone);
        }

        else {
            //invalid phone number
            this.set(key, number);
        }
    }

});