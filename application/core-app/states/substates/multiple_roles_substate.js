CoreApp.MultipleRolesSubstate = CoreOs.Substate.extend({

    enterState: function () {
        CoreApp.statechart.dispatchViewEvent('displayRoleSelectionView');
    },

    goToSpringboard: function () {
        CoreApp.router.goToRoute('#/springboard');
    },

    exitState: function () {
        CoreApp.statechart.dispatchViewEvent('removeRoleSelectionView');
    }

});
