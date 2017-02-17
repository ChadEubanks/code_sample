alto_require('core-app/states/viewstates/initial_view_state.js');

CoreApp.SpringboardState = CoreOs.State.extend({

    viewState: CoreApp.InitialViewState.create(),

    enterState: function () {
        if (CoreApp.get('encounterMode')) {
            CoreApp.statechart.dispatchEvent('checkRoleContentForAdmin');
        } else {
            CoreApp.statechart.dispatchEvent('checkSpringboardContent');
        }

    },

    checkRoleContentForAdmin: function () {
        if (Alto.isEqual(CoreApp.roleController.get('type'), 'Admin')) {
            CoreApp.statechart.dispatchEvent('launchApp', Alto.Object.create({data: CoreOs.permission.get('adminApplications.0')}));
        } else {
            CoreApp.statechart.dispatchEvent('checkSpringboardContent');
        }
    },

    checkSpringboardContent: function () {
        var content = CoreApp.springboardController.get('content');

        if (Alto.isPresent(content)) {
            CoreApp.statechart.dispatchViewEvent('displaySpringboardView');
        } else {
            CoreApp.router.replaceRoute('#');
        }
    },

    profileAction: function () {
        CoreApp.router.goToRoute('#/account');
    },

    logoutAction: function () {
        CoreApp.endSession();
    },

    switchRole: function () {
        CoreApp.router.goToRoute('#');
    },

    launchApp: function (sender) {
        CoreApp.sandboxApplicationController.set('content', Alto.Object.createWithMixins(sender.data, {}));
        CoreApp.router.goToRoute(sender.data.get('route'));
    },

    exitState: function () {
        CoreApp.statechart.dispatchViewEvent('removeSpringboardView');
    }
});
