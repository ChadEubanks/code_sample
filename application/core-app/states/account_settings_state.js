alto_require('core-app/states/viewstates/initial_view_state.js');

CoreApp.AccountSettingsState = CoreOs.State.extend({

    viewState: CoreApp.InitialViewState.create(),

    enterState: function () {
        CoreApp.statechart.dispatchViewEvent('removeRoleSelectionView');
        CoreApp.statechart.dispatchViewEvent('displayAccountSettingsView');
    },

    changePassword: function () {
        var datastore = CoreApp.AuthenticateDatastore.create(),
            url = LW.networkApi.get('passwordResetUrl'),
            data = Alto.Object.create({email: CoreApp.userController.get('email')});

        CoreApp.loadingPane = CoreApp.LoadingPane.create({instanceName: 'CoreApp.loadingPane'});

        datastore.resetPassword(url, data).then(function () {
            if (CoreApp.loadingPane) {
                CoreApp.loadingPane.remove();
            }

            CoreApp.statechart.dispatchViewEvent('displayPasswordResetPane');
        }, function (error) {

        })
    },

    saveAccountChanges: function () {
        var datastore = CoreApp.AuthenticateDatastore.create(),
            url = LW.networkApi.get('authenticationUrl'),
            data = Alto.Object.create({
                firstName: CoreApp.userController.get('firstName'),
                lastName: CoreApp.userController.get('lastName'),
                email: CoreApp.userController.get('email')
            });

        CoreApp.loadingPane = CoreApp.LoadingPane.create({instanceName: 'CoreApp.loadingPane'});

        datastore.updateRecord(url, data).then(function () {
            if (CoreApp.loadingPane) {
                CoreApp.loadingPane.remove();
            }
        }, function (error) {

        })
    },

    goToBaseRoute: function () {
        CoreApp.router.goToRoute('#');
    },

    removePasswordResetPane: function () {
        CoreApp.statechart.dispatchViewEvent('removePasswordResetPane');
    },

    exitState: function () {
        CoreApp.statechart.dispatchViewEvent('removeAccountSettingsView');
    }
});
