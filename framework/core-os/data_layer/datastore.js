CoreOs.DataStore = Alto.Object.extend({

    arrayController: null,

    objectController: null,

    datasource: null,

    model: null,

    authenticate: function () {
        var that = this,
            record = that.get('objectController'),
            json = that.serialize(record),
            datasource = that.get('datasource').create();

        return new Alto.RSVP.Promise(function (succeeded, failed, operation) {

            datasource.authenticate(json).then(operation, function (json) {
                that.set('objectController', that.deserialize(that.get('model').create(), json));
                succeeded();
            }, function (error) {
                failed(error);
            })

        });
    },

    commitRecord: function () {
        var record = this.get('objectController'),
            json = this.serialize(record);

        //todo make this generic
    },

    commitRecords: function () {

    },

    deleteRecord: function () {

    },

    deleteRecords: function () {

    },

    findRecord: function (url, predicate) {
        var that = this;
        datasource = that.get('datasource').create();

        return new Alto.RSVP.Promise(function (succeeded, failed, operation) {

            datasource.fetchRecord(url).then(function (json) {
                that.set('objectController', that.deserialize(that.get('model').create(), json));
                succeeded();
            }, function (error) {
                failed(error);
            })
        })

    },

    findRecords: function (url, predicate) {

    },

    // internal use only //

    deserialize: function (recordInstance, json, stringFormat) {

        if (!stringFormat) {
            stringFormat = 'camelize';
        }

        if (stringFormat && !Alto.String[stringFormat]) {
            Alto.Logger.error('unknown string format given.  Alto.String does not have a method called', stringFormat);
            return;
        }

        for (var key in json) {
            var value = json[key];

            if (Object.prototype.toString.call(json) !== '[object Object]') {
                return;
            }

            if (stringFormat && Alto.String[stringFormat]) {
                key = Alto.String[stringFormat](key);
            }

            if (!Alto.isNone(recordInstance.get(key))) {

                if (Alto.isNone(value)) {
                    value = ''
                }
                ;

                if (!recordInstance.__alto_meta__.descs[key]) {
                    recordInstance.set(key, value);
                }

            } else {

                CoreOs.Console.log("Can not set missing property \"%@\" on model".fmt(key), CoreOs.Console.warnColor);
            }
        }

        return recordInstance;
    },

    serialize: function (record, stringFormat) {
        var json = {};

        if (!stringFormat) {
            stringFormat = 'underscore'
        }

        if (!Alto.String[stringFormat]) {
            Alto.Logger.error('unknown string format given.  Alto.String does not have a method called', stringFormat);
            return;
        }

        if (!record instanceof Alto.Object) {
            Alto.Logger.error('Unknown record type given.  Expecting record to be instance of Alto.Object');
            return;
        }

        Alto.keys(record).forEach(function (recordKey) {
            if (recordKey.indexOf('Binding') > -1) {
                json[recordKey.slice(recordKey.length - 7, recordKey.length)[stringFormat]()] = record.get(recordKey);
            } else {
                json[recordKey[stringFormat]()] = record.get(recordKey);
            }
        });

        // hack for some odd bug
        if (json.binding) {
            delete json.binding;
        }

        return JSON.stringify(json);
    }
});