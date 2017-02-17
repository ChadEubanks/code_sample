alto_require('core-app/datastore/core_network_api.js');

CoreApp.coldstartCoreNetWorkApi = Alto.Object.createWithMixins ({

    environment: 'production',

    localUrl: 'http://localhost:8080',

    stagingUrl: null,

    productionUrl: null,

    demoUrl: null,

    init: function () {
        var environment = Alto.isPresent(CoreApp.coreNetWorkApi) ? CoreApp.coreNetWorkApi.get('environment') : this.get('environment');

        if (Alto.isEqual(environment, 'staging')) {
            this.set('_base', this.get('stagingUrl'));
        } else if (Alto.isEqual(environment, 'demo')) {
            this.set('_base', this.get('demoUrl'));
        } else if (Alto.isEqual(environment, 'production')) {
            this.set('_base', this.get('productionUrl'));
        } else {
            this.set('_base', this.get('stagingUrl'));
        }

    },

    authenticationUrl: function () {
        return "%@/facilities_admin/facilities".fmt(this.get('_base'));
    }.property('_baseUrl').volatile(),

    paymentPlansUrl: function () {
        return "%@/facilities_admin/payment_plans".fmt(this.get('_base'));
    }.property('_base').volatile(),

    paymentPlanUrl: function () {
        return "%@/facilities_admin/payment_plans/%@?zipcode=%@&state=%@".fmt(this.get('_base'), CoreApp.paymentPlanController.get('id'), CoreApp.accountController.get('zipCode'), CoreApp.accountController.get('stateAbbreviation'));
    }.property('_base').volatile()

});