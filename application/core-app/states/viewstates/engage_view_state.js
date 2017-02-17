CoreApp.EngageViewState = Alto.Object.extend({

    /*---Views---*/
    displayEngageCreateAccountView: function () {
        if (Alto.isNone(CoreApp.engageCreateAccountView)) {
            CoreApp.engageCreateAccountView = CoreApp.EngageCreateAccountView.createWithMixins({attachToNode: 'body', instanceName: 'CoreApp.engageCreateAccountView'});
        }
    },

    /*---Panes---*/
    displayPurchaseConfirmationPane: function () {
        if (Alto.isNone(CoreApp.engagePurchaseConfirmationPane)) {
            CoreApp.engagePurchaseConfirmationPane = CoreApp.EngagePurchaseConfirmationPane.createWithMixins({attachToNode: 'body', instanceName: 'CoreApp.engagePurchaseConfirmationPane'});
        }
    },

    displayEngagePurchaseSuccessPane: function () {
        if (Alto.isNone(CoreApp.engagePurchaseSuccessPane)) {
            CoreApp.engagePurchaseSuccessPane = CoreApp.EngagePurchaseSuccessPane.createWithMixins({attachToNode: 'body', instanceName: 'CoreApp.engagePurchaseSuccessPane'});
        }
    },

    removeEngagePurchaseConfirmationPane: function () {
        if (Alto.isPresent(CoreApp.engagePurchaseConfirmationPane)) {
            CoreApp.engagePurchaseConfirmationPane.remove();
        }
    },

    removeEngagePurchaseSuccessPane: function () {
        if (Alto.isPresent(CoreApp.engagePurchaseSuccessPane)) {
            CoreApp.engagePurchaseSuccessPane.remove();
        }
    },

    removeEngageCreateAccountView: function () {
        if (Alto.isPresent(CoreApp.engageCreateAccountView)) {
            CoreApp.engageCreateAccountView.remove();
        }
    },

    removeLoginView: function () {
        if (CoreApp.loginView) {
            CoreApp.loginView.remove();
        }
    },

    removeRoleSelectionView: function () {
        if (CoreApp.roleSelectionView) {
            CoreApp.roleSelectionView.remove();
        }
    }

})