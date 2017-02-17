alto_require('core-app/states/viewstates/initial_view_state.js');

CoreApp.CreateOrganizationState = CoreOs.State.extend({

    viewState: CoreApp.InitialViewState.create(),

    enterState: function () {
        //todo fix check for cookie and facility profile
        CoreApp.statechart.dispatchEvent('prepView');
        CoreApp.statechart.dispatchViewEvent('displayEncounterCreateOrganizationView');
    },

    prepView: function () {
        CoreApp.statechart.dispatchViewEvent('removeLoginView');
        CoreApp.statechart.dispatchViewEvent('removeRoleSelectionView');

        CoreApp.accountController.set('content', CoreApp.EncounterAccountRecord.create());
    },

    displaySectionInfo: function (sender) {
        CoreApp.statechart.dispatchViewEvent('displayInfoSectionView', sender);
    },

    fetchPaymentPlans: function () {
        var datastore = CoreApp.PaymentPlansDatastore.create({urlBinding: 'CoreApp.coldstartCoreNetWorkApi.paymentPlansUrl'});

        datastore.findRecords().then(function () {
            CoreApp.statechart.dispatchViewEvent('displayPurchaseConfirmationPane');
        }, function (error) {

        });
    },

    purchaseLicense: function () {
        var datastore = CoreApp.FacilitiesDatastore.create(),
            data = CoreApp.accountController.get('content');

        data.set('email', data.get('email').toLowerCase());
        
        CoreApp.loadingPane = CoreApp.LoadingPane.create({instanceName: 'LW.loadingPane'});

        delete data.isReadTermsAndConditions;

        datastore.authenticate(data).then(function () {
            CoreApp.statechart.dispatchEvent('licenseSuccess');
        }, function (error) {
            CoreApp.statechart.dispatchEvent('licenseError', JSON.parse(error.response).error);

        })
    },

    licenseSuccess: function () {
        CoreApp.statechart.dispatchViewEvent('removePurchaseConfirmationPane');

        Alto.run.later(function () {
            CoreApp.statechart.dispatchEvent('remove');
            CoreApp.statechart.dispatchViewEvent('displayPurchaseSuccessPane');
        }, 400);
    },

    licenseError: function (error) {
        CoreApp.statechart.dispatchViewEvent('removePurchaseConfirmationPane');

        Alto.run.later(function () {
            CoreApp.loadingPane.renderError(error);
        }, 400);
    },

    transitionToDashboardRoute: function () {
        var doctorId = CoreApp.userController.get('doctorId'),
            facilityId = CoreApp.userController.get('parentFacilityId');

        CoreApp.statechart.dispatchViewEvent('removePurchaseSuccessPane');

        Alto.run.later(function () {
            CoreApp.router.goToRoute('#/admin/%@/encounter/facilities/%@'.fmt(doctorId, facilityId));
        }, 300);
    },

    exitState: function () {
        CoreApp.statechart.dispatchViewEvent('removeEncounterCreateOrganizationView');
    }
});
