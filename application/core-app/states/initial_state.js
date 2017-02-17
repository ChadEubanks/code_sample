alto_require('core-app/states/substates/multiple_roles_substate.js');
alto_require('core-app/states/substates/single_role_substate.js');
alto_require('core-app/states/substates/unauthorized_substate.js');
alto_require('core-app/states/substates/initialized_with_session_substate.js');
alto_require('core-app/states/viewstates/initial_view_state.js');

CoreApp.InitialState = CoreOs.State.extend({

    viewState: CoreApp.InitialViewState.create(),

    enterState: function () {
        var cookie = Alto.Cookie.find(CoreApp.get('COOKIENAME'));

        if (Alto.isPresent(cookie)) {
            CoreApp.statechart.goToSubstate('initializedWithSessionSubstate');
        } else {
            CoreApp.statechart.goToSubstate('unauthorizedSubstate');
        }
    },

    processUrl: function () {
        var path = location.hash;

        if (path.charAt(0) === '#') {
            path = path.slice(1, path.length)
        }

        if (path.charAt(0) === '/') {
            path = path.slice(1, path.length)
        }

        if (path.indexOf('?') > -1) {
            path = path.substr(0, path.indexOf('?'));
        }

        CoreApp.statechart.dispatchEvent('determineUrlType', path);
    },

    determineUrlType: function (url) {
        var possibleRole, routeHasRole;

        if (Alto.isPresent(url)) {
            possibleRole = url.split('/')[0];
        } else {
            possibleRole = false;
        }

        routeHasRole = Alto.isPresent(CoreOs.permission[possibleRole]);

        if (!routeHasRole) {
            CoreApp.statechart.dispatchEvent('checkForManyRoles');
        }

        CoreApp.statechart.dispatchEvent('instantiateApplicationRouter');
    },

    instantiateApplicationRouter: function () {
        CoreApp.router = CoreApp.CoreRouter.createWithMixins();
        CoreApp.router.routerDidBecomeActive();
    },

    checkForManyRoles: function () {
        var roles = CoreApp.rolesController.get('content');

        //checks for encounter mode or when user authenticates and facility id's are returned
        if (CoreApp.get('encounterMode') || Alto.isPresent(CoreApp.userController.get('facilities'))) {
            CoreApp.statechart.dispatchEvent('checkForAdminRole', roles);
        } else if (roles.length > 1) {
            CoreApp.statechart.dispatchEvent('transitionToMultipleRolesSubstate');
        } else {
            CoreApp.statechart.dispatchEvent('transitionToSingleRoleSubstate');
        }

    },

    checkForAdminRole: function () {
        var account,
            roles = CoreApp.rolesController.get('content'),
            superAdmin = CoreApp.userController.get('admin');

        roles.forEach(function (role) {
            if (Alto.isEqual(role.get('type'), 'Admin')) {
                account = role;
            }
        })

        if (CoreApp.get('encounterMode') && superAdmin) {
            CoreApp.router.replaceRoute('#/encounter');
        } else if (Alto.isEmpty(account) && CoreApp.get('encounterMode') && !superAdmin) {
            //go to create organization flow
            Alto.run.next(function () {
                CoreApp.router.replaceRoute('#/encounter/create');
            })
        } else if (Alto.isPresent(account) && CoreApp.get('encounterMode')) {
            //jump straight into encounter for that id
            Alto.run.next(function () {
                CoreApp.roleController.set('content', account);
                CoreApp.router.replaceRoute(CoreOs.permission.get('adminApplications.0.route'));
            })
        } else if (Alto.isEqual(location.hash.split('/')[1], 'encounter')) {
            //do nothing
        } else {
            if (roles.length > 1) {
                CoreApp.statechart.dispatchEvent('transitionToMultipleRolesSubstate');
            } else {
                CoreApp.statechart.dispatchEvent('transitionToSingleRoleSubstate');
            }
        }
    },

    createAdminRoles: function (parentFacilities) {
        var parentRoles = parentFacilities.parent;

        parentRoles.forEach(function (parent) {
            // add all parent organization admin roles
            var obj = Alto.Object.create({
                type: 'Admin',
                doctorId: CoreApp.userController.get('profiles.doctorId'),
                facilityId: parent.id,
                companyName: parent.name
            });

            CoreApp.rolesController.get('content').addObject(obj);


        })
    },

    transitionToMultipleRolesSubstate: function () {
        CoreApp.statechart.goToSubstate('multipleRolesSubstate');
    },

    transitionToSingleRoleSubstate: function () {
        CoreApp.statechart.goToSubstate('singleRolesSubstate');
    },

    exitState: function () {

    },

    initializedWithSessionSubstate: CoreApp.InitializedWithSessionSubstate.extend(),
    unauthorizedSubstate: CoreApp.UnauthorizedSubstate.extend(),
    multipleRolesSubstate: CoreApp.MultipleRolesSubstate.extend(),
    singleRolesSubstate: CoreApp.SingleRoleSubstate.extend()

});