// ==========================================================================
// Project: Alto - JavaScript Application Framework
// Copyright: @2015 The Code Boutique, LLC
// License:   Intellectual property of The Code Boutique. LLC
// Version:   1.0.0
// ==========================================================================

CoreOs.CoreRouter = Alto.Object.extend(CoreOs.RouterProperties, CoreOs.SandboxRouter, {

    init: function () {
        if (window.addEventListener) {
            window.addEventListener("hashchange", this.hashDidChange, false);
        } else if (window.attachEvent) {
            window.attachEvent("hashchange", this.hashDidChange, false);
        }
    },

    routerDidBecomeActive: function () {
        this.checkForIndexRoute();
    },

    checkForIndexRoute: function () {
        var indexRoute = Alto.isEmpty(this.get('route'));

        if (indexRoute || Alto.isEqual(this.get('route'), 'springboard') || Alto.isEqual(this.get('route'), 'account')) {
            if (Alto.isPresent(CoreApp.get('application'))) {
                CoreApp.get('application').remove();
                CoreApp.set('application', '');
            }
        }

        if (indexRoute) {
            this.pairWithApplicationIndexRoute();
        } else {
            this.checkForDefaultUnauthorizedRoute();
        }
    },

    pairWithApplicationIndexRoute: function () {
        var url = window.location.href,
            coldstartApplication = url.split('?coldstart=')[1];

        if (Alto.isPresent(coldstartApplication)) {
            this.pairWithColdStartApplicationRoute(coldstartApplication);
        } else {
            this.set('routeObject', this.index);
            this.parseRouteObject(this.get('routeObject'));
        }
    },

    pairWithColdStartApplicationRoute: function (application) {
        this.set('routeObject', this[application]); //  set the route object to the application route listed in CoreApp.CoreRouter

        location.href = '%@%@'.fmt(location.href.split('?')[0], this.routeObject.route);
    },

    parseRouteObject: function (routeObject) {
        routeObject.isSecure ? this.set('routeIsSecure', true) : this.set('routeIsSecure', false);
        routeObject.state ? this.set('routeIsParentState', true) : this.set('routeIsParentState', false);

        this.checkForSecureRoute(routeObject);
    },

    checkForDefaultUnauthorizedRoute: function () {
        var unauthorizedRoute = this.unauthorized.route === this.get('location');

        if (unauthorizedRoute) {
            this.pairWithDefaultUnauthorizedRoute();
        } else {
            this.checkIncomingRoutePairsWithRouteObject();
        }
    },

    checkIncomingRoutePairsWithRouteObject: function () {
        var path = this.get('route').split('/'),
            routeObject,
            count = 0;

        while (count < path.length) {
            // (if) the first iteration: no route object... so lets assign one
            // (else if) continue walking the route object path
            // (else if) route not found... but we did find a potential path... lets assume it is a unique_id being passed in
            if (count === 0) {
                routeObject = this[path[count]];
            } else if (routeObject && routeObject[path[count]]) {
                routeObject = routeObject[path[count]];
            } else if (routeObject && !this[path[count]] && !routeObject[path[count]]) {
                routeObject = routeObject['unique_id'];
            }

            count++;
        }

        // when the above did resolve route... parse it
        // else assume it is a route that matches an internal route on a sandboxed application (pass it to the sandbox router)
        if (Alto.isPresent(routeObject)) {
            this.set('routeObject', routeObject);
            this.parseRouteObject(this.get('routeObject'));
        } else {
            this.sandboxRouterDidBecomeActive();
        }

    },

    pairWithDefaultUnauthorizedRoute: function () {
        this.set('routeObject', this.unauthorized);
        this.parseRouteObject(this.get('routeObject'));
    },

    checkForSecureRoute: function (routeObject) {
        if (routeObject.isSecure) {
            var cookieName = window[CoreOs.applicationName].get('COOKIENAME');
            this.verifyApplicationHasValidSession(Alto.Cookie.find(cookieName), routeObject);
        } else {
            this.checkForApplicationStatechartInstance(routeObject);
        }
    },

    checkForApplicationStatechartInstance: function (routeObject) {
        if (!Alto.isPresent(window[CoreOs.applicationName].statechart)) {
            window[CoreOs.applicationName].statechart = Alto.Statechart.createWithMixins();
        }

        this.checkRouteForState(routeObject);
    },

    checkRouteForState: function (routeObject) {
        if (Alto.isPresent(routeObject.state)) {
            this.verifyStateClassExists(routeObject);
        } else {
            this.malformedStateGiven(routeObject);
        }
    },

    verifyStateClassExists: function (routeObject) {
        if (window[CoreOs.applicationName][Alto.String.classify(routeObject.state)]) {
            this.checkForStateInstance(routeObject);
        } else {
            this.malformedStateGiven(routeObject);
        }
    },

    checkForStateInstance: function (routeObject) {
        if (!window[CoreOs.applicationName][routeObject.state]) {
            window[CoreOs.applicationName][routeObject.state] = window[CoreOs.applicationName][Alto.String.classify(routeObject.state)].create();
        }

        this.transitionToState(routeObject);
    },

    transitionToState: function (routeObject) {
        var currentState = window[CoreOs.applicationName].statechart.get('currentState');

        if (routeObject.state && currentState === routeObject.state) {
            // do nothing
        } else if (routeObject.state) {
            window[CoreOs.applicationName].statechart.goToState(routeObject.state);
        }

    },

    malformedStateGiven: function (routeObject) {
        //todo missing logic
        Alto.Logger.error('Malformed state provided on route', routeObject);
    },

    verifyApplicationHasValidSession: function (sessionCookie, routeObject) {
        if (sessionCookie) {
            this.checkForApplicationStatechartInstance(routeObject);
        } else {
            this.replaceRouteWithUnauthorizedRoute();
        }
    },

    replaceRouteWithUnauthorizedRoute: function () {
        this.replaceRoute(this.unauthorized.route);
        Alto.run.next(this, function () {
            location.reload();
        });
    },

    goToRoute: function (route) {
        if (Alto.isPresent(CoreApp.get('application')) && Alto.isEqual(route, '#/sandbox')) {
            CoreApp.get('application').remove();
            CoreApp.set('application', '');
        }

        this.pushRoute(route);
        this.checkForIndexRoute();
    },

    pushRoute: function (route) {
        if (Alto.isEqual(route.slice(-1), '/')) {route = route.slice(0, -1);}
        history.pushState('', '', route);
    },

    replaceRoute: function (route) {
        if (this.get('location').split('/')[this.get('location').split('/').length - 1] === route.split('/')[route.split('/').length - 1]) {
            route = route.split('/').removeAt(route.split('/').length - 1).join('/')
        }
        history.replaceState('', '', route);
        this.checkForIndexRoute();
    },


    hashDidChange: function () {
        window[CoreOs.applicationName].router.checkForIndexRoute();
    }

});