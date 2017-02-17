CoreApp.InitialViewState = Alto.Object.extend({

    displayLoginView: function () {
        if (Alto.isNone(CoreApp.loginView)) {
            CoreApp.loginView = CoreApp.LoginView.createWithMixins({instanceName: 'CoreApp.loginView', attachToNode: 'body'});
        }
    },

    displayRoleSelectionView: function () {
        if (Alto.isNone(CoreApp.roleSelectionView)) {
            CoreApp.roleSelectionView = CoreApp.RoleSelectionView.createWithMixins({instanceName: 'CoreApp.roleSelectionView', attachToNode: 'body'});
        }
    },

    displaySpringboardView: function () {
        if (Alto.isNone(CoreApp.springboardView)) {
            CoreApp.springboardView = CoreApp.SpringboardView.createWithMixins({instanceName: 'CoreApp.springboardView', attachToNode: 'body'});
        }
    },

    displaySpringboardOptionMenu: function (sender) {
        if (Alto.isNone(CoreApp.springboardOptionMenu)) {
            CoreApp.springboardOptionMenu = CoreApp.SpringboardOptionMenu.createWithMixins({instanceName: 'CoreApp.springboardOptionMenu', attachToNode: sender.node})
        }
    },

    displayEncounterCreateAccountView: function () {
        if (Alto.isNone(CoreApp.encounterCreateAccountView)) {
            CoreApp.encounterCreateAccountView = CoreApp.EncounterCreateAccountView.createWithMixins({attachToNode: 'body', instanceName: 'CoreApp.encounterCreateAccountView'});
        }
    },

    displayEncounterCreateOrganizationView: function () {
        if (Alto.isNone(CoreApp.encounterCreateOrganizationView)) {
            CoreApp.encounterCreateOrganizationView = CoreApp.EncounterCreateOrganizationView.createWithMixins({attachToNode: 'body', instanceName: 'CoreApp.encounterCreateOrganizationView'});
        }
    },

    displayInfoSectionView: function (sender) {
        CoreApp.statechart.dispatchViewEvent('removeInfoSectionView');

        if (Alto.isNone(CoreApp.infoSectionView)) {
            CoreApp.infoSectionView = CoreApp.InfoSectionView.create({attachToNode: sender.node, instanceName: 'CoreApp.infoSectionView', title: sender.title});
        }
    },

    displayPurchaseConfirmationPane: function () {
        if (Alto.isNone(CoreApp.purchaseConfirmationPane)) {
            CoreApp.purchaseConfirmationPane = CoreApp.PurchaseConfirmationPane.create({attachToNode: 'body', instanceName: 'CoreApp.purchaseConfirmationPane'});
        }
    },

    displayPurchaseSuccessPane: function () {
        if (Alto.isNone(CoreApp.purchaseSuccessPane)) {
            CoreApp.purchaseSuccessPane = CoreApp.PurchaseSuccessPane.create({attachToNode: 'body', instanceName: 'CoreApp.purchaseSuccessPane'});
        }
    },

    displayAccountSettingsView: function () {
        if (Alto.isNone(CoreApp.accountSettingsView)) {
            CoreApp.accountSettingsView = CoreApp.AccountSettingsView.create({attachToNode: 'body', instanceName: 'CoreApp.accountSettingsView'});
        }
    },

    displayPasswordResetPane: function () {
        if (Alto.isNone(CoreApp.passwordResetPane)) {
            CoreApp.passwordResetPane = CoreApp.PasswordResetPane.create({attachToNode: 'body', instanceName: 'CoreApp.passwordResetPane'});
        }
    },

    displayLoginLoadingPane: function () {
        if (Alto.isNone(CoreApp.loginLoadingPane)) {
            CoreApp.loginLoadingPane = CoreApp.LoadingPane.create({classNames: ['lw-loading-pane', 'login'], attachToNode: 'body', instanceName: 'CoreApp.loginLoadingPane'});
        }
    },

    removeLoginLoadingPane: function () {
        if (CoreApp.loginLoadingPane) {
            CoreApp.loginLoadingPane.remove();
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
    },

    removeSpringboardView: function () {
        if (CoreApp.springboardView) {
            CoreApp.springboardView.remove();
        }
    },

    removeSpringboardOptionMenu: function () {
        if (CoreApp.springboardOptionMenu) {
            CoreApp.springboardOptionMenu.remove();
        }
    },

    removeEncounterCreateAccountView: function () {
        if (Alto.isPresent(CoreApp.encounterCreateAccountView)) {
            CoreApp.encounterCreateAccountView.remove();
        }
    },

    removeEncounterCreateOrganizationView: function () {
        if (Alto.isPresent(CoreApp.encounterCreateOrganizationView)) {
            CoreApp.encounterCreateOrganizationView.remove();
        }
    },

    removeInfoSectionView: function () {
        if (Alto.isPresent(CoreApp.infoSectionView)) {
            CoreApp.infoSectionView.remove();
        }
    },

    removePurchaseConfirmationPane: function () {
        if (Alto.isPresent(CoreApp.purchaseConfirmationPane)) {
            CoreApp.purchaseConfirmationPane.remove();
        }
    },

    removePurchaseSuccessPane: function () {
        if (Alto.isPresent(CoreApp.purchaseSuccessPane)) {
            CoreApp.purchaseSuccessPane.remove();
        }
    },

    removeAccountSettingsView: function () {
        if (Alto.isPresent(CoreApp.accountSettingsView)) {
            CoreApp.accountSettingsView.remove();
        }
    },

    removePasswordResetPane: function () {
        if (Alto.isPresent(CoreApp.passwordResetPane)) {
            CoreApp.passwordResetPane.remove();
        }
    }

})