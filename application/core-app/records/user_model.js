CoreApp.UserRecord = Alto.Object.extend({


    accessCode: '',
    address1: '',
    address2: '',
    admin: '',
    brokerageId: '',
    city: '',
    companyId: '',
    employeeId: '',
    dependents: [],
    dob: '',
    email: '',
    employeeProfileId: '',
    firstName: '',
    gender: '',
    hasCobra: '',
    hasMedicaid: '',
    hasMedicare: '',
    id: '',
    isDisabled: '',
    isEligible: '',
    isFulltimeStudent: '',
    isRetired: '',
    isTerminated: '',
    isUser: '',
    jobTitle: '',
    language: '',
    lastFourSsn: '',
    lastName: '',
    mailingAddress1: '',
    mailingAddress2: '',
    mailingCity: '',
    mailingState: '',
    mailingZip: '',
    memberType: '',
    middleName: '',
    number: '',
    phone: '',
    profiles: {},
    workPhone: '',
    profilePicture: '',
    relationship: '',
    role: '',
    roles: [],
    salary: '',
    smoker: '',
    ssn: '',
    startedOn: '',
    state: '',
    terminatedOn: '',
    tobaccoUse: '',
    token: '',
    userId: '',
    workPhone: '',
    zip: '',
    settings: '',

    //coldstart encounter
    userId: '',
    userToken: '',
    doctorId: '',
    parentFacilityId: '',

    facilities: '',

    isErrorVisible: false,

    // computed properties
    fullName: function () {
        return "%@ %@".fmt(this.get('firstName'), this.get('lastName'));
    }.property('firstName', 'lastName').volatile(),

    fullAddress: function () {
        return "%@ %@, %@, %@ %@".fmt(this.get('address1'), this.get('address2'), this.get('city'), this.get('state'), this.get('zip'));
    }.property('address1', 'address2', 'city', 'state', 'zip').volatile(),

    fullMailingAddress: function () {
        var address = "%@ %@, %@, %@ %@".fmt(this.get('mailingAddress1'), this.get('mailingAddress2'), this.get('mailingCity'), this.get('mailingState'), this.get('mailingZip'));

        if (address === " , ,  ") {
            return "%@ %@, %@, %@ %@".fmt(this.get('address1'), this.get('address2'), this.get('city'), this.get('state'), this.get('zip'));
        } else {
            return address
        }
    }.property('mailingAddress1', 'mailingAddress2', 'mailingCity', 'mailingState', 'mailingZip').volatile(),

    // utils
    useHomeAddressForMailingAddress: '',

    useHomeAddressForMailingAddressInverse: Alto.computed.not('useHomeAddressForMailingAddress'),

    useHomeAddressForMailingAddressDidChange: function () {
        if (this.get('useHomeAddressForMailingAddress')) {
            this.set('mailingAddress1', this.get('address1'));
            this.set('mailingAddress2', this.get('address2'));
            this.set('mailingCity', this.get('city'));
            this.set('mailingState', this.get('state'));
            this.set('mailingZip', this.get('zip'));
        }
    }.observes('useHomeAddressForMailingAddress'),

    formattedDate: function () {
        var date = this.get('dob');
        return new Date(Date.parse(date)).getMonth() + 1 + '/' + new Date(Date.parse(date)).getDate() + '/' + new Date(Date.parse(date)).getFullYear()
    }.property('dob').volatile(),

    smokerDidChange: function () {
        if (this.get('smoker')) {
            this.set('tobaccoUse', 'Yes')
        } else {
            this.set('tobaccoUse', 'No')
        }
    }.observes('smoker'),


    phoneDidChange: function () {
        this.formatPhoneNumber('phone');
    }.observes('phone'),

    workPhoneDidChange: function () {
        this.formatPhoneNumber('workPhone');
    }.observes('workPhone'),

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