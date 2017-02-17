alto_require('core-app/datasource/authentication_datasource.js');
alto_require('core-app/datastore/coldstart_core_network_api.js');
alto_require('core-app/controllers/payment_plans_controller.js');
alto_require('core-app/controllers/payment_plan_controller.js');
alto_require('core-app/records/encounter_payment_plan_record.js');

CoreApp.PaymentPlansDatastore = CoreOs.DataStore.extend({

    objectController: CoreApp.paymentPlanController,

    arrayController: CoreApp.paymentPlansController,

    datasource: CoreApp.AuthenticateDataSource.extend(),

    model: CoreApp.EncounterPaymentPlanRecord.extend(),

    findRecord: function () {
        var that = this,
            datasource = that.get('datasource').create(),
            url = this.get('url');

        return new Alto.RSVP.Promise(function (succeeded, failed) {

            datasource.fetchRecord(url).then(function (json) {
                that.objectController.set('content', that.deserialize(that.get('model').create(), json));
                succeeded();
            }, function (error) {
                failed(error);
            })

        })
    },

    findRecords: function () {
        var that = this,
            datasource = that.get('datasource').create(),
            url = this.get('url');

        return new Alto.RSVP.Promise(function (succeeded, failed) {

            datasource.fetchRecords(url).then(function (json) {

                if (Alto.isPresent(json)) {
                    json.forEach(function (obj) {
                        that.arrayController.get('content').addObject(that.deserialize(that.get('model').create(), obj));
                    })
                }

                that.objectController.set('content', that.arrayController.get('content.0'));

                succeeded();
            }, function (error) {
                failed(error);
            })

        })
    }

});