CoreApp.CoreRouter = CoreOs.CoreRouter.extend({

    // core routes
    unauthorized: {
        route: 'index.html',
        state: 'unauthorizedState'
    },

    index: {
        route: 'index.html',
        state: 'initialState'
    },

    springboard: {
        state: 'springboardState',
        route: '#/springboard',
        isSecure: true
    },

    account: {
        state: 'accountSettingsState',
        route: '#/account',
        isSecure: true
    },

    encounter: {
        state: 'encounterColdstartState',
        route: '#/encounter',
        isSecure: false,

        create: {
            state: 'createOrganizationState',
            route: '#/encounter/create',
            isSecure: true
        }
    }

});