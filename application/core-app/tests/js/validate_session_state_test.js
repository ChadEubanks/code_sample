alto_require('core.js');

TestRunner.validateSessionStateTest = Alto.TestModule.createWithMixins({

    moduleName: 'validate session state test',

    setup: function () {
        // make sure we dont have a valid session
        Alto.testUtils.mockEndSession(CoreApp);
        // create content for a single role
        CoreApp.mockSingleRoleControler = Alto.ArrayController.create({
            content: [CoreApp.RolesRecord.create({
                type: 'employee',
                companyId: 1,
                companyName: 'The Code Boutique'
            })]
        })
        // create content for multiple roles
        CoreApp.mockMultipleRolesController = Alto.ArrayController.create({
            content: [CoreApp.RolesRecord.create({
                type: 'employee',
                companyId: 1,
                companyName: 'The Code Boutique'
            }), CoreApp.RolesRecord.create({
                type: 'broker',
                companyId: 2,
                companyName: 'Quest Love Brokerage'
            })]
        })
    },

    testStatechartCurrentStateEmpty: function () {
        //set to null for router
        CoreApp.statechart.set('currentState', null);

        var expression = CoreApp.statechart.get('currentState');

        Alto.test.empty(expression, 'Statechart should have an empty currentState.');

        //reset to original value
        CoreApp.statechart.set('currentState', 'validateSessionState');
    },

    testStatechartCurrentState: function () {
        var result = CoreApp.statechart.get('currentState'),
            expected = 'validateSessionState';

        Alto.test.equals(expected, result, "Application statechart currentState should equal '%@'".fmt(expected));
    },

    testSubstateForEmptyCookie: function () {
        CoreApp.statechart.goToState('validateSessionState');

        var result = CoreApp.statechart.get('currentSubstate'),
            expected = 'unauthorizedSubstate';

        Alto.test.equals(expected, result, "Application statechart currentSubstate should equal '%@'".fmt(expected));
    },

    testSubstateForValidCookie: function () {
        CoreApp.statechart.set('currentState', '');
        CoreApp.statechart.set('currentSubstate', '');
        Alto.testUtils.mockCreateSession(CoreApp);
        CoreApp.rolesController.set('content', CoreApp.mockMultipleRolesController.get('content'));

        var expected = 2,
            result = CoreApp.rolesController.get('content').length;

        Alto.test.equals(expected, result, "Role controller content length should be '%@'".fmt(expected));

        CoreApp.statechart.goToState('validateSessionState');

        result = CoreApp.statechart.get('currentSubstate');
        expected = 'multipleRolesSubstate';

        Alto.test.equals(expected, result, "Application statechart currentSubstate should equal '%@'".fmt(expected));

        CoreApp.rolesController.set('content', CoreApp.mockSingleRoleControler.get('content'));

        CoreApp.statechart.set('currentState', '');
        CoreApp.statechart.set('currentSubstate', '');

        expected = 1;
        result = CoreApp.rolesController.get('content').length;

        Alto.test.equals(expected, result, "Role controller content length should be '%@'".fmt(expected));

        CoreApp.statechart.goToState('validateSessionState');

        result = CoreApp.statechart.get('currentSubstate');
        expected = 'singleRolesSubstate';

        Alto.test.equals(expected, result, "CurrentSubstate should equal '%@'".fmt(expected));
    },

    teardown: function () {
        CoreApp.statechart.set('currentState', '');
        CoreApp.statechart.set('currentSubstate', '');
        Alto.testUtils.mockEndSession(CoreApp);
    }

});