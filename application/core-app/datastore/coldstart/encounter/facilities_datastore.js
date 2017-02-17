alto_require('core-app/datasource/authentication_datasource.js');
alto_require('core-app/datastore/coldstart_core_network_api.js');

CoreApp.FacilitiesDatastore = CoreOs.DataStore.extend({

    objectController: CoreApp.userController,

    datasource: CoreApp.AuthenticateDataSource.extend(),

    model: CoreApp.UserRecord.extend(),

    url: CoreApp.coldstartCoreNetWorkApi.get('authenticationUrl'),

    authenticate: function (data) {
        var that = this,
            json = that.serialize(data),
            datasource = that.get('datasource').create(),
            url = this.get('url');

        CoreApp.loadingPane.set('status', 'Purchasing License');

        return new Alto.RSVP.Promise(function (succeeded, failed) {

            datasource.saveRecord(url, json).then(function (json) {
                var record = that.deserialize(that.get('model').create(), json);

                that.objectController.set('content', record);
                that.objectController.set('firstName', data.get('firstName'));
                that.objectController.set('lastName', data.get('lastName'));

                CoreApp.createSession(record.get('userToken'), 30);

                succeeded();
            }, function (error) {
                failed(error);
            })

        });
    }

});