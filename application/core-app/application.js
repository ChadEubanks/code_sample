CoreApp = CoreOs.Application.createWithMixins ({

    NAMESPACE: 'CoreApp',

    VERSION: 1.0,

    MILESTONE: '17a',

    LogStateTransitions: true,

    LogMessages: true,

    CookieDomain: null,

    DESCRIPTION: 'CoreApp: Shared application for the LW-OS ecosystem.  CoreApp namespace encapsulates the ' +
    'login_view, roles_selection_view and springboard_view.',

    AUTHORS: 'Chad Eubanks',

    useFixtureData: false,

    window: CoreOs.Window.createWithMixins(),

    applicationInstance: null,

    offlineMode: false,

    encounterMode: false,

    engageMode: false,

    /*
     =========== Environments ===========
     'production': lw-web.lifewallet.co
     'staging': lw-web.lifewallet.io
     'local': localhost
     */
    Environment: 'local',

    LogStateTransitions: null,

    LogMessages: null,

    CookieDomain: null,

    statechart: CoreOs.Statechart.create(),

    applicationWillLoad: function () {
        this.configureEnvironment();
    },

    applicationDidLoad: function () {
        CoreApp.statechart.goToState('initialState');
    },

    configureEnvironment: function () {
        var environemnt = this.get('Environment');

        if (environemnt === 'production') {
            this.set('LogStateTransitions', false);
            this.set('LogMessages', false);
            this.set('CookieDomain', 'lifeos.lifewallet.com');
        } else if (environemnt === 'staging') {
            this.set('LogStateTransitions', true);
            this.set('LogMessages', true);
            this.set('CookieDomain', 'lifeos.lifewallet.io');
        } else if (environemnt === 'local') {
            this.set('LogStateTransitions', true);
            this.set('LogMessages', true);
            this.set('CookieDomain', '');
        } else {
            this.set('LogStateTransitions', true);
            this.set('LogMessages', true);
            this.set('CookieDomain', '');
        }

    }

});