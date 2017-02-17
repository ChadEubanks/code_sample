alto_require('core-app/states/viewstates/initial_view_state.js');

CoreApp.EncounterColdstartState = CoreOs.State.extend({

    viewState: CoreApp.InitialViewState.create(),

    enterState: function () {
        CoreApp.statechart.dispatchEvent('checkForCookie');
    },

    checkForCookie: function () {
        var cookie = Alto.Cookie.find('coreappauth'),
            parentFacilities = CoreApp.userController.get('facilities.parent'),
            superAdmin = CoreApp.userController.get('admin');

        if (Alto.isPresent(cookie) && Alto.isPresent(parentFacilities)) {
            // only allows one parent facility
            CoreApp.router.goToRoute('#/admin/%@/encounter/facilities/%@'.fmt(CoreApp.userController.get('profiles.doctorId'), parentFacilities[0].id));
        } else if (Alto.isPresent(cookie) && Alto.isEmpty(parentFacilities) && !superAdmin) {
            CoreApp.statechart.goToState('createOrganizationState');
        } else {
            CoreApp.statechart.dispatchEvent('prepView');
            CoreApp.statechart.dispatchViewEvent('displayEncounterCreateAccountView');
        }
    },

    prepView: function () {
        CoreApp.set('encounterMode', true);

        CoreApp.statechart.dispatchViewEvent('removeLoginView');
        CoreApp.statechart.dispatchViewEvent('removeRoleSelectionView');

        CoreApp.accountController.set('content', CoreApp.EncounterAccountRecord.create());
    },

    cancelConfirmation: function () {
        CoreApp.statechart.dispatchViewEvent('removePurchaseConfirmationPane');
    },

    fetchPaymentPlans: function () {
        //CoreApp.statechart.dispatchEvent('transitionToCreateGroupRoute');

        var datastore = CoreApp.PaymentPlansDatastore.create({urlBinding: 'CoreApp.coldstartCoreNetWorkApi.paymentPlansUrl'});

        datastore.findRecords().then(function () {
            CoreApp.statechart.dispatchEvent('fetchTaxes');
        }, function (error) {

        });

    },

    fetchTaxes: function () {
        var datastore = CoreApp.PaymentPlansDatastore.create({urlBinding: 'CoreApp.coldstartCoreNetWorkApi.paymentPlanUrl'});

        datastore.findRecord().then(function () {
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

    transitionToIndexRoute: function () {
        CoreApp.router.goToRoute('index.html');
    },

    transitionToDashboardRoute: function () {
        var doctorId = CoreApp.userController.get('doctorId'),
            facilityId = CoreApp.userController.get('parentFacilityId');

        CoreApp.statechart.dispatchViewEvent('removePurchaseSuccessPane');

        Alto.run.later(function () {
            CoreApp.router.goToRoute('#/admin/%@/encounter/facilities/%@'.fmt(doctorId, facilityId));
        }, 300);
    },

    displaySectionInfo: function (sender) {
        CoreApp.statechart.dispatchViewEvent('displayInfoSectionView', sender);
    },

    remove: function () {
        if (Alto.isPresent(CoreApp.loadingPane)) {
            CoreApp.loadingPane.remove();
        }
    },

    exitState: function () {
        CoreApp.statechart.dispatchViewEvent('removeEncounterCreateAccountView');
    }
});
