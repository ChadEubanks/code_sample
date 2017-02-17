CoreApp.InitializedWithSessionSubstate = CoreOs.Substate.extend({

    enterState: function () {
        CoreApp.statechart.dispatchEvent('checkUserControllerContent');
    },

    checkUserControllerContent: function () {
        var content = CoreApp.userController.get('content'),
            datastore = CoreApp.AuthenticateDatastore.create();

        if (Alto.isEmpty(content)) {
            var url = LW.networkApi.get('authenticationUrl');

            datastore.findRecord(url).then(function () {
                CoreApp.statechart.dispatchEvent('processUrl');
            }, function (error) {

            });
        } else {
            CoreApp.statechart.dispatchEvent('processUrl');
        }
    },

    exitState: function () {

    }

});