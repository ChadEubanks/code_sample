// ==========================================================================
// Project: Alto - JavaScript Application Framework
// Copyright: @2015 The Code Boutique, LLC
// License:   Intellectual property of The Code Boutique. LLC
// Version:   1.0.0
// ==========================================================================

CoreOs.RouterProperties = Alto.Mixin.create({

    // the current route object
    routeObject: null,

    routeObjectsForInverseRoute: null,

    routeHasDatasource: false,

    routeIsSecure: false,

    routeIsParentState: false,

    routeIsSubstate: false,

    // computed properties
    location: Alto.computed(function () {
        var _location = location.hash;

        return _location === ('#/' || '#' || '') ? '' : _location;
    }).volatile(),

    // a clean representation of the incoming route.  Removes '?', '/', and '#' from route.
    route: Alto.computed('location', function () {
        var path = this.get('location');

        if (path.charAt(0) === '#') {
            path = path.slice(1, path.length)
        }

        if (path.charAt(0) === '/') {
            path = path.slice(1, path.length)
        }

        if (path.indexOf('?') > -1) {
            path = path.substr(0, path.indexOf('?'));
        }

        return path;
    }).volatile(),

    roleFromRoute: Alto.computed(function ()  {
        var route = this.get('route'),
            possibleRole;

        if (Alto.isPresent(route)) {
            possibleRole = this.get('route').split('/')[0];
        } else  {
            possibleRole = false;
        }

       return possibleRole;
    }).volatile(),

    applicationFromRoute: Alto.computed(function ()  {
        var route = this.get('route'),
            routeSplit = route.split('/'),
            possibleApplication;
        // todo capture non unique_id applications (some consumer applications)

        if (Alto.isEqual(routeSplit[0], 'consumer') && Alto.isEqual(routeSplit[2], 'companies'), Alto.isEqual(routeSplit[4], 'enrollments')) {
            possibleApplication = routeSplit[4];
        } else if ((Alto.isEqual(routeSplit[0], 'consumer') && Alto.isEqual(routeSplit[1], 'healthbook')) || (Alto.isEqual(routeSplit[0], 'consumer') && Alto.isEqual(routeSplit[1], 'policies')) || (Alto.isEqual(routeSplit[0], 'billing')))  {
            possibleApplication = routeSplit[1]
        } else if (Alto.isPresent(route)) {
            possibleApplication = routeSplit[2];
        } else  {
            possibleApplication = false;
        }

        return possibleApplication;
    }).volatile()

});