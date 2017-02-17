CoreApp.coreNetWorkApi = Alto.Object.createWithMixins ({

    environment: 'production', // local, staging, production, demo

    localUrl: 'http://localhost:8080',

    stagingUrl: null,

    productionUrl: null,

    demoUrl: null,

    init: function () {
        var environment = this.get('environment');

        if (Alto.isEqual(environment, 'staging')) {
            this.set('_base', this.get('stagingUrl'));
        } else if (Alto.isEqual(environment, 'demo')) {
            this.set('_base', this.get('demoUrl'));
        } else if (Alto.isEqual(environment, 'production')) {
            this.set('_base', this.get('productionUrl'));
        } else {
            this.set('_base', this.get('localUrl'));
        }

    },

    _sessionWithRoles: 'roles',

    sessionWithRolesUrl: function () {
        return "%@/%@".fmt(this.get('_base'), this.get('_sessionWithRoles'));
    }.property('_baseUrl', '_user').volatile()

});