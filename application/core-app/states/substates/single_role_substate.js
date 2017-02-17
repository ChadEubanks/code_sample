CoreApp.SingleRoleSubstate = CoreOs.Substate.extend ({

    enterState: function () {
        CoreApp.statechart.dispatchEvent('pairRoleController');
    },

    pairRoleController: function () {
        var role = CoreApp.rolesController.get('content.0');

        CoreApp.roleController.set('content', role);

        Alto.run.next(function () {
            CoreApp.statechart.dispatchEvent('goToSpringboard');
        });
    },

    goToSpringboard: function () {
        CoreApp.router.goToRoute('#/springboard');
    },

    exitState: function () {

    }

});