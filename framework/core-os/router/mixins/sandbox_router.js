CoreOs.SandboxRouter = Alto.Mixin.create({

    sandboxRouterDidBecomeActive: function () {
        this.verifySanboxApplicationHasValidSession();
    },

    verifySanboxApplicationHasValidSession: function () {
        var sessionCookie = window[CoreOs.applicationName].get('COOKIENAME');

        if (Alto.Cookie.find(sessionCookie)) {
            this.determineRoleProvided();
        } else {
            this.replaceRouteWithUnauthorizedRoute();
        }
    },

    determineRoleProvided: function () {
        var role = this.get('roleFromRoute');

        this.verifyRoleIsValid(role);
    },

    verifyRoleIsValid: function (role) {
        var roleIsValid = Alto.isPresent(CoreOs.permission[role]);

        if (roleIsValid) {
            var appsRole = '%@Applications'.fmt(role);

            CoreApp.springboardController.set('content', CoreOs.permission[appsRole]);
            this.checkForRoleContent(role);
        } else {
            //todo we should go to a root state here... and display UI that says the link provided is not valid then redirect to index.html
            Alto.Logger.error('Invalid role provided in url');
        }

    },

    checkForRoleContent: function (role) {
        var routeRole;

        if (Alto.isEqual(role, 'brokerage')) {
            routeRole = 'Broker';
        } else if (Alto.isEqual(role, 'hr')) {
            routeRole = 'Human Resources';
        } else if (Alto.isEqual(role, 'employee')) {
            routeRole = 'Employee';
        } else if (Alto.isEqual(role, 'consumer')) {
            routeRole = 'Consumer';
        }

        if (Alto.isEmpty(CoreApp.roleController.get('content'))) {
            var roles = CoreApp.rolesController.get('content');

            roles.forEach(function (role) {
                if (Alto.isEqual(routeRole, role.get('type'))) {
                    CoreApp.roleController.set('content', role);
                }
            });
        }

        this.determineApplicationProvided(role);
    },

    determineApplicationProvided: function (role) {
        var application = this.get('applicationFromRoute');

        this.verifyApplicationIsValid(application, role);
    },

    verifyApplicationIsValid: function (applicationFromRoute, role) {
        var possibleApplications = CoreOs.permission['%@Applications'.fmt(role)],
            applicationIsValid;

        if (possibleApplications) {
            possibleApplications.some(function (application) {
                if (Alto.isEqual(application.get('applicationName').toLowerCase(), applicationFromRoute.toLowerCase())) {
                    applicationIsValid = true;
                    return
                }
            });
        }

        if (applicationIsValid) {
            this.launchSandboxApplicationFromRouter();
        } else {
            //todo we should go to a root state here... and display UI that says the link provided is not valid then redirect to index.html
            Alto.Logger.error('Invalid application provided in url');
        }

    },

    launchSandboxApplicationFromRouter: function () {
        var applicationsForRoleLookup = '%@Applications'.fmt(this.get('roleFromRoute')),
            applicationsForRole = CoreOs.permission[applicationsForRoleLookup],
            applicationFromRoute = this.get('applicationFromRoute'),
            sandbox;

        applicationsForRole.some(function (application) {
            var applicationName = application.get('applicationName').toLowerCase();

            // find the pair
            if (Alto.isEqual(applicationName, applicationFromRoute)) {

                // ignore the incoming url if it belongs to the current sandbox
                if (Alto.isEqual(CoreApp.get('application.url'), application.get('url'))) {
                    CoreApp.applicationInstance.router.checkForIndexRoute();
                    return
                } else {

                    // reuse the current sandbox frame
                    if (Alto.isPresent(CoreApp.get('application'))) {
                        CoreApp.get('application').set('url', application.get('url'));
                    } else {
                        // create a sandbox frame
                        sandbox = CoreOs.ApplicationSandbox.createWithMixins({
                            url: application.get('url'),
                            isLocal: false
                        });

                        CoreApp.set('application', sandbox);
                    }
                    return
                }
            }
        })

    }

});