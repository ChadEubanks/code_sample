alto_require('core-app/states/viewstates/engage_view_state.js');

CoreApp.EngageColdstartState = CoreOs.State.extend({

    viewState: CoreApp.EngageViewState.create(),

    enterState: function () {
        CoreApp.statechart.dispatchEvent('prepView');
        CoreApp.statechart.dispatchViewEvent('displayEngageCreateAccountView');
    },

    prepView: function () {
        CoreApp.set('engageMode', true);

        CoreApp.statechart.dispatchViewEvent('removeLoginView');
        CoreApp.statechart.dispatchViewEvent('removeRoleSelectionView');

        CoreApp.accountController.set('content', CoreApp.EngageAccountRecord.create());
    },

    continue: function () {
        CoreApp.engageCreateAccountView.contentFrame.carouselView.toolbar.navigate(1)
    },

    previous: function () {
        CoreApp.engageCreateAccountView.contentFrame.carouselView.toolbar.navigate(-1)
    },

    purchaseLicense: function () {
        Alto.run.later(function () {
            CoreApp.statechart.dispatchViewEvent('removeEngagePurchaseConfirmationPane');
            CoreApp.statechart.dispatchViewEvent('displayEngagePurchaseSuccessPane');
        }, 500)
    },

    cancelConfirmation: function () {
        CoreApp.statechart.dispatchViewEvent('removeEngagePurchaseConfirmationPane');
    },

    transitionToDashboardRoute: function () {
        var doctorId = CoreApp.userController.get('doctorId'),
            facilityId = CoreApp.userController.get('parentFacilityId');

        CoreApp.statechart.dispatchViewEvent('removeEngagePurchaseSuccessPane');

        Alto.run.later(function () {
            CoreApp.router.goToRoute('#/admin/%@/engage/facilities/%@'.fmt(1, 100));
        }, 300);
    },

    exitState: function () {

    }

})