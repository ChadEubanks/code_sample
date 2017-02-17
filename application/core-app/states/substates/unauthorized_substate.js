CoreApp.UnauthorizedSubstate = CoreOs.Substate.extend({

    enterState: function () {
        //todo remove test credential but leave the content a new model instance
        CoreApp.userController.set('content', Alto.Object.create({email: '', password: ''}));
        CoreApp.statechart.dispatchEvent('checkForQuery');
        CoreApp.statechart.dispatchEvent('instantiateApplicationRouter');
    },

    checkForQuery: function () {
        if (location.hash !== '') {
            // do nothing, route handles query
        } else {
            CoreApp.statechart.dispatchViewEvent('displayLoginView');
        }
    },

    initiateAuthentication: function () {
        var datastore = CoreApp.AuthenticateDatastore.create();

        CoreApp.statechart.dispatchViewEvent('displayLoginLoadingPane');

        datastore.authenticate().then(function (json) {
            CoreApp.statechart.dispatchEvent('checkForManyRoles');
            CoreApp.statechart.dispatchViewEvent('removeLoginLoadingPane');
        }, function (error) {
            CoreApp.statechart.dispatchViewEvent('removeLoginLoadingPane');
        });
    },

    exitState: function () {
        CoreApp.statechart.dispatchViewEvent('removeLoginView');
    }

});
