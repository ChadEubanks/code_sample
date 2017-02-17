CoreApp.AuthenticateDataSource = CoreOs.DataSource.extend({

    authenticate: function (data) {
        return new Alto.RSVP.Promise(function (succeeded, failed) {
            var request = Alto.Request.create({
                url: LW.networkApi.get('authenticationUrl'),
                httpMethod: 'POST',
                requestHeaders: {
                    'Content-Type': 'application/json'
                },
                data: data,

                success: function () {
                    var json;

                    if (CoreApp.get('useFixtureData')) {
                        json = CoreApp.authenticateFixtureData.get('fixtureData');
                    } else {
                        json = JSON.parse(request.xhr.response);
                    }

                    CoreApp.createSession(JSON.parse(request.xhr.response).token, 30);

                    LW.networkApi.set('_environment', 'lwebserver');

                    succeeded(json);
                },

                error: function () {
                    failed(request.xhr);
                }

            })
        })
    },

    createSessionWithRoles: function (data) {
        return new Alto.RSVP.Promise(function (succeeded, failed) {

            var request = Alto.Request.create({
                urlBinding: 'CoreApp.coreNetWorkApi.sessionWithRolesUrl',
                httpMethod: 'POST',
                requestHeaders: {
                    'Content-Type': 'application/json',
                    'AUTH-TOKEN': LW.networkApi.get('_sessionToken')
                },
                data: data,

                success: function () {
                    succeeded();
                },

                error: function () {
                    failed();
                }

            })

        })
    },

    fetchRecords: function (url) {
        return new Alto.RSVP.Promise(function (succeeded, failed) {

            var request = Alto.Request.create({
                url: url,
                httpMethod: 'GET',
                requestHeaders: {
                    'Content-Type': 'application/json',
                    'AUTH-TOKEN': LW.networkApi.get('_sessionToken')
                },

                success: function () {
                    var json = JSON.parse(request.xhr.response);
                    succeeded(json);
                },

                error: function () {
                    failed();
                }

            })

        })
    },

    saveRecord: function (url, data) {
        return new Alto.RSVP.Promise(function (succeeded, failed) {
            var request = Alto.Request.create({
                url: url,
                httpMethod: 'POST',
                requestHeaders: {
                    'Content-Type': 'application/json',
                    'AUTH-TOKEN': LW.networkApi.get('_sessionToken')
                },
                data: data,

                success: function () {
                    var json = JSON.parse(request.xhr.response);

                    LW.networkApi.set('_environment', 'lwebserver');

                    succeeded(json);
                },

                error: function () {
                    failed(request.xhr);
                }

            })
        })
    },

    updateRecord: function (url, data) {
        return new Alto.RSVP.Promise(function (succeeded, failed) {

            var request = Alto.Request.create({
                url: url,
                httpMethod: 'PUT',
                requestHeaders: {
                    'Content-Type': 'application/json',
                    'AUTH-TOKEN': LW.networkApi.get('_sessionToken')
                },
                data: data,

                success: function () {
                    var json = JSON.parse(request.xhr.response);
                    succeeded(json);
                },

                error: function () {
                    failed();
                }

            })

        })
    }

});