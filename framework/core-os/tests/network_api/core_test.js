//alto_require('core-os/network_api/core.js');

TestRunner.lwFrameworkNetworkApiTest = Alto.TestModule.createWithMixins({

    moduleName: 'lw framework network api test',

    setup: function () {

    },

    testNetworkApiInstance: function () {
        var expected = 'Instance',
            result = LW.networkApi;
        Alto.test.type(expected, result, "LW.networkApi should be an %@".fmt(expected));
    },

    testStagingUrls: function () {
        LW.networkApi.set('_environment', 'staging');

        var expected = 'staging',
            result = LW.networkApi.get('_environment');
        Alto.test.equals(expected, result, 'Staging network url:  Environment should equal "%@"'.fmt(expected));

        expected = 'user';
        result = LW.networkApi.get('_user');
        Alto.test.equals(expected, result, 'Staging network url:  User constant should equal "%@"'.fmt(expected));

        expected = 'https://staging.lifewallet.com/api/v1/';
        result = LW.networkApi.get('_baseUrl');
        Alto.test.equals(expected, result, 'Staging network url:  Base url should equal "%@"'.fmt(expected));

        expected = 'https://staging.lifewallet.com/api/v1/user';
        result = LW.networkApi.get('authenticationUrl');
        Alto.test.equals(expected, result, 'Staging network url:  Authentication url should equal "%@"'.fmt(expected));
    },

    teardown: function () {

    }

});