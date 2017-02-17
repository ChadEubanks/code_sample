alto_require('tests/test_module/core.js');

TestRunner.unauthorizedStateTest = Alto.TestModule.createWithMixins({

    moduleName: 'unauthorized state test',

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

    testStatechartIsClean: function () {
        var expression = CoreApp.statechart.get('currentState');
        Alto.test.empty(expression, 'Statechart should have an empty currentState.');

        expression = CoreApp.statechart.get('currentSubstate');
        Alto.test.empty(expression, 'Statechart should have an empty currenSubState.');
    },

    testStatechartState: function () {
        CoreApp.statechart.goToState('validateSessionState');

        var result = CoreApp.statechart.get('currentState'),
            expected = 'validateSessionState';

        Alto.test.equals(expected, result, "Application statechart currentState should equal '%@'".fmt(expected));

        result = CoreApp.statechart.get('currentSubstate');
        expected = 'unauthorizedSubstate';

        Alto.test.equals(expected, result, "Application statechart currentSubstate should equal '%@'".fmt(expected));
    },

    verifyLoginViewIsInstantiated: function () {
        var expected = 'Instance',
            result = CoreApp.loginView;

        Alto.test.type(expected, result, "CoreApp.loginView should be an '%@'".fmt(expected));
    },

    verifyUserController: function () {
        CoreApp.userController.set('content', Alto.Object.create({email: 'chade@lifewallet.co', password: 'secret'}));

        var expected = 'chade@lifewallet.co',
            result = CoreApp.userController.get('email');

        Alto.test.equals(expected, result, "User controller's email should equal '%@'".fmt(expected));

        expected = 'secret';
        result = CoreApp.userController.get('password');

        Alto.test.equals(expected, result, "User controller's password should equal '%@'".fmt(expected));
    },

    verifyMultipleRolesFlow: function () {
        CoreApp.rolesController.set('content', CoreApp.mockMultipleRolesController.get('content'));
        CoreApp.statechart.dispatchEvent('checkForManyRoles');

        var expected = 2,
            result = CoreApp.rolesController.get('content').length;

        Alto.test.equals(expected, result, "Role controller content length should be '%@'".fmt(expected));

        result = CoreApp.statechart.get('currentSubstate');
        expected = 'multipleRolesSubstate';

        Alto.test.equals(expected, result, "CurrentSubstate should equal '%@'".fmt(expected));

        Alto.test.uninstantiatedObject(CoreApp.loginView, 'CoreApp.loginView instance should be destroyed.');
    },

    verifySingleRoleFlow: function () {
        CoreApp.statechart.goToState('validateSessionState');
        CoreApp.statechart.goToSubstate('unauthorizedSubstate');
        CoreApp.rolesController.set('content', CoreApp.mockSingleRoleControler.get('content'));

        var expected = 1,
            result = CoreApp.rolesController.get('content').length;

        Alto.test.equals(expected, result, "Role controller content length should be '%@'".fmt(expected));

        CoreApp.statechart.dispatchEvent('checkForManyRoles');

        result = CoreApp.statechart.get('currentSubstate');
        expected = 'singleRolesSubstate';

        Alto.test.equals(expected, result, "CurrentSubstate should equal '%@'".fmt(expected));

        Alto.test.uninstantiatedObject(CoreApp.loginView, 'CoreApp.loginView instance should be destroyed.');
    },

    teardown: function () {
        CoreApp.statechart.set('currentState', '');
        CoreApp.statechart.set('currentSubstate', '');
        Alto.testUtils.mockEndSession(CoreApp);
    }

});