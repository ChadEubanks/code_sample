alto_require('core-os/core.js');

TestRunner.lwFrameworkCoreTest = Alto.TestModule.createWithMixins({

    moduleName: 'lw framework core test',

    setup: function () {

    },

    testApplicationNamespace: function () {
        var result = CoreOs.get('NAMESPACE'),
            expected = 'CoreOs';

        Alto.test.equals(expected, result, "Framework NAMESPACE should equal %@.".fmt(expected));
    },

    testApplicationVersion: function () {
        var result = CoreOs.get('VERSION'),
            expected = 1.0;

        Alto.test.equals(expected, result, "Version should equal %@".fmt(expected));
    },

    teardown: function () {
        CoreApp.set('Environment', 'local');
        CoreApp.configureEnvironment();
    }

});