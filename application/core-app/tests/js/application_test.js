alto_require('core.js');

TestRunner.applicationTest = Alto.TestModule.createWithMixins({

    moduleName: 'application test',

    setup: function () {
        CoreApp.set('isTestMode', true);
        CoreApp.set('Environment', 'local');
        CoreApp.configureEnvironment();
    },

    testApplicationNamespace: function () {
        var result = CoreApp.get('NAMESPACE'),
            expected = 'CoreApp';

        Alto.test.equals(expected, result, "Application NAMESPACE should equal %@.".fmt(expected));
    },

    testApplicationVersion: function () {
        var result = CoreApp.get('VERSION'),
            expected = 1.0;

        Alto.test.equals(expected, result, "Version should equal %@".fmt(expected));
    },

    testApplicationEnvironmentSettings: function () {
        var logStateTransitionsExpected, logMessagesExpected, cookieDomainExpected;

        // local environment
        logStateTransitionsExpected = true;
        logMessagesExpected = true;
        cookieDomainExpected = '';

        Alto.test.equals(logStateTransitionsExpected, CoreApp.get('LogStateTransitions'), "Local environemnt: LogStateTransitions should equal %@".fmt(logStateTransitionsExpected));
        Alto.test.equals(logMessagesExpected, CoreApp.get('LogMessages'), "Local environemnt: LogMessages should equal %@".fmt(logMessagesExpected));
        Alto.test.equals(cookieDomainExpected, CoreApp.get('CookieDomain'), "Local environemnt: CookieDomain should equal %@".fmt(cookieDomainExpected));

        // staging environment
        logStateTransitionsExpected = true;
        logMessagesExpected = true;
        cookieDomainExpected = 'enrollee.s3-website-us-east-1.amazonaws.com';

        CoreApp.set('Environment', 'staging');
        CoreApp.configureEnvironment();
        Alto.test.equals(logStateTransitionsExpected, CoreApp.get('LogStateTransitions'), "Staging environemnt: LogStateTransitions should equal %@".fmt(logStateTransitionsExpected));
        Alto.test.equals(logMessagesExpected, CoreApp.get('LogMessages'), "Staging environemnt: LogMessages state transitions should equal %@".fmt(logMessagesExpected));
        Alto.test.equals(cookieDomainExpected, CoreApp.get('CookieDomain'), "Staging environemnt: CookieDomain should equal %@".fmt(cookieDomainExpected));

        // production environment
        logStateTransitionsExpected = false;
        logMessagesExpected = false;
        cookieDomainExpected = 'lwcore.lifewallet.io';

        CoreApp.set('Environment', 'production');
        CoreApp.configureEnvironment()
        Alto.test.equals(logStateTransitionsExpected, CoreApp.get('LogStateTransitions'), "Production environemnt: LogStateTransitions should equal %@".fmt(logStateTransitionsExpected));
        Alto.test.equals(logMessagesExpected, CoreApp.get('LogMessages'), "Production environemnt: LogMessages should equal %@".fmt(logMessagesExpected));
        Alto.test.equals(cookieDomainExpected, CoreApp.get('CookieDomain'), "Production environemnt: CookieDomain should equal %@".fmt(cookieDomainExpected));

        // invalid environment
        logStateTransitionsExpected = true;
        logMessagesExpected = true;
        cookieDomainExpected = '';

        CoreApp.set('Environment', 'foobar');
        CoreApp.configureEnvironment();
        Alto.test.equals(logStateTransitionsExpected, CoreApp.get('LogStateTransitions'), "Invalid environemnt: LogStateTransitions should equal %@".fmt(logStateTransitionsExpected));
        Alto.test.equals(logMessagesExpected, CoreApp.get('LogMessages'), "Invalid environemnt: LogMessages should equal should equal %@".fmt(logMessagesExpected));
        Alto.test.equals(cookieDomainExpected, CoreApp.get('CookieDomain'), "Invalid environemnt: CookieDomain should equal %@".fmt(cookieDomainExpected));
    },

    testApplicationStatechartIsInstantiated: function () {
        var expected = 'Instance',
            result = CoreApp.get('statechart');

        Alto.test.type(expected, result, "Application statechart should be an %@".fmt(expected));
    },

    teardown: function () {
        CoreApp.set('Environment', 'local');
        CoreApp.configureEnvironment();
    }

});