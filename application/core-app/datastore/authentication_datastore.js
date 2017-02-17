alto_require('core-app/records/user_model.js');
alto_require('core-app/records/roles_model.js');
alto_require('core-app/records/profiles_model.js');
alto_require('core-app/controllers/user_controller.js');
alto_require('core-app/datasource/authentication_datasource.js');

CoreApp.AuthenticateDatastore = CoreOs.DataStore.extend({

    objectController: CoreApp.userController,

    datasource: CoreApp.AuthenticateDataSource.extend(),

    model: CoreApp.UserRecord.extend(),

    authenticate: function () {
        var that = this,
            record = that.objectController.get('content'),
            json, datasource = that.get('datasource').create();

        record.set('email', record.get('email').toLowerCase());     /*--enforce this going further in other email account creations to avoid case sensitivity--*/
        
        delete record.isErrorVisible;

        json = that.serialize(record);

        return new Alto.RSVP.Promise(function (succeeded, failed) {

            datasource.authenticate(json).then(function (json) {
                if (CoreApp.get('useFixtureData')) {
                    var fixtureData = CoreApp.authenticateFixtureData.get(CoreApp.authenticateFixtureData.get('user').toLowerCase()),
                        sessionHash = {
                            auth_token: json.token,
                            agent: [],
                            broker: [],
                            carrier: [],
                            consumer: [],
                            csr: [],
                            employee: [],
                            hr: []
                        };

                    fixtureData.roles.forEach(function (role) {
                        var type = role.type.toLowerCase();

                        if (Alto.isEqual(type, 'broker') || Alto.isEqual(type, 'agent') || Alto.isEqual(type, 'csr')) {
                            sessionHash[type].addObject(role.brokerageId);
                        } else if (Alto.isEqual(type, 'human resource')) {
                            sessionHash['hr'].addObject(role.companyId);
                        } else if (Alto.isEqual(type, 'employee')) {
                            var companyId = role.companyId,
                                employeeId = role.employeeId,
                                obj = {};

                            obj[employeeId] = companyId;
                            sessionHash[type].addObject(obj);
                        } else if (Alto.isEqual(type, 'carrier')) {
                            sessionHash[type].addObject(role.carrier_id);
                        }

                    });
                } else {
                    var sessionHash = {
                            auth_token: json.token,
                            agent: [],
                            broker: [],
                            carrier: [],
                            consumer: [],
                            csr: [],
                            employee: [],
                            hr: []
                        };

                    json.roles.forEach(function (role) {
                        var type = role.type.toLowerCase();

                        if (Alto.isEqual(type, 'broker') || Alto.isEqual(type, 'agent') || Alto.isEqual(type, 'csr')) {
                            sessionHash[type].addObject(role.brokerage_id);
                        } else if (Alto.isEqual(type, 'hr_admin')) {
                            sessionHash['hr'].addObject(role.company_id);
                        } else if (Alto.isEqual(type, 'employee')) {
                            var companyId = role.company_id,
                                employeeId = role.employee_id,
                                obj = {};

                            obj[employeeId] = companyId;
                            sessionHash[type].addObject(obj);
                        } else if (Alto.isEqual(type, 'carrier')) {
                            sessionHash[type].addObject(role.carrier_id);
                        }

                    });
                }

                //datasource.createSessionWithRoles(JSON.stringify(sessionHash)).then(function () {
                    that.deserializeAuthenticationResponse(json);
                    succeeded();
                //}, function (error) {
                //    console.log(error);
                //});

            }, function (error) {
                CoreApp.userController.set('isErrorVisible', true);
                failed(error);
            })

        });
    },


    findRecord: function (url, predicate) {
        var that = this;
        datasource = that.get('datasource').create();

        if (CoreApp.get('offlineMode')) {
            return new Alto.RSVP.Promise(function (success, fail, operation) {
                json = CoreApp.authenticateFixtureData.get('fixtureData');
                that.deserializeAuthenticationResponse(json);
                success();
            })
        } else {
            return new Alto.RSVP.Promise(function (succeeded, failed, operation) {

                datasource.fetchRecord(url).then(function (json) {
                    if (CoreApp.get('useFixtureData')) {
                        var fixtureData = CoreApp.authenticateFixtureData.get(CoreApp.authenticateFixtureData.get('user').toLowerCase()),
                            json = fixtureData,
                            sessionHash = {
                                auth_token: json.token,
                                agent: [],
                                broker: [],
                                carrier: [],
                                consumer: [],
                                csr: [],
                                employee: [],
                                hr: []
                            };

                        fixtureData.roles.forEach(function (role) {
                            var type = role.type.toLowerCase();

                            if (Alto.isEqual(type, 'broker') || Alto.isEqual(type, 'agent') || Alto.isEqual(type, 'csr')) {
                                sessionHash[type].addObject(role.brokerageId);
                            } else if (Alto.isEqual(type, 'human resource')) {
                                sessionHash['hr'].addObject(role.companyId);
                            } else if (Alto.isEqual(type, 'employee')) {
                                var companyId = role.companyId,
                                    employeeId = role.employeeId,
                                    obj = {};

                                obj[employeeId] = companyId;
                                sessionHash[type].addObject(obj);
                            } else if (Alto.isEqual(type, 'carrier')) {
                                sessionHash[type].addObject(role.carrier_id);
                            }

                        });
                    } else {
                        var sessionHash = {
                            auth_token: json.token,
                            agent: [],
                            broker: [],
                            carrier: [],
                            consumer: [],
                            csr: [],
                            employee: [],
                            hr: []
                        };

                        json.roles.forEach(function (role) {
                            var type = role.type.toLowerCase();

                            if (Alto.isEqual(type, 'broker') || Alto.isEqual(type, 'agent') || Alto.isEqual(type, 'csr')) {
                                sessionHash[type].addObject(role.brokerage_id);
                            } else if (Alto.isEqual(type, 'hr_admin')) {
                                sessionHash['hr'].addObject(role.company_id);
                            } else if (Alto.isEqual(type, 'employee')) {
                                var companyId = role.company_id,
                                    employeeId = role.employee_id,
                                    obj = {};

                                obj[employeeId] = companyId;
                                sessionHash[type].addObject(obj);
                            } else if (Alto.isEqual(type, 'carrier')) {
                                sessionHash[type].addObject(role.carrier_id);
                            }

                        });
                    }

                    that.deserializeAuthenticationResponse(json);
                    succeeded();

                }, function (error) {
                    failed(error);
                })
            })
        }

    },

    resetPassword: function (url, data) {
        var that = this,
            datasource = that.get('datasource').create(),
            data = this.serialize(data);

        CoreApp.loadingPane.set('status', 'Sending Password Reset');

        return new Alto.RSVP.Promise(function (succeeded, failed) {

            datasource.saveRecord(url, data).then(function () {
                succeeded();
            }, function (error) {
                failed(error);
            })
        })
    },

    updateRecord: function (url, data) {
        var that = this,
            datasource = that.get('datasource').create(),
            data = this.serialize(data);

        CoreApp.loadingPane.set('status', 'Saving Account');

        return new Alto.RSVP.Promise(function (succeeded, failed) {

            datasource.updateRecord(url, data).then(function (json) {
                that.objectController.set('firstName', json.first_name);
                that.objectController.set('lastName', json.last_name);
                that.objectController.set('email', json.email);
                succeeded(json);
            }, function (error) {
                failed(error);
            })
        })
    },

    // custom deserialize methods //
    deserializeAuthenticationResponse: function (json) {
        var that = this, roleRecords = [Alto.Object.create({type: 'Consumer', companyName: 'LifeWallet'})], profilesRecord = {};
        this.objectController.set('content', this.deserialize(this.get('model').create(), json));

        if (json.roles && json.roles.length > 0) {
            json.roles.forEach(function (role) {
                var roleRecord;

                if (CoreApp.get('useFixtureData')) {
                    roleRecord = that.deserialize(CoreApp.RolesRecord.create(), role);
                } else {

                    if (Alto.isEqual(role.type, 'hr_admin')) {
                        role.type = 'Human Resources';
                    } else if (Alto.isEqual(role.type, 'broker') || Alto.isEqual(role.type, 'agent') || Alto.isEqual(role.type, 'csr')) {
                        role.company_name = role.brokerage_name;
                    }

                    role.type = role.type.capitalize();

                    roleRecord = that.deserialize(CoreApp.RolesRecord.create(), role);
                }



                roleRecords.addObject(roleRecord);
            })
        }

        if (json.profiles) {
            profilesRecord = that.deserialize(CoreApp.ProfilesRecord.create(), json.profiles);
        }

        if (json.facilities) {
            json.facilities.parent.forEach(function (parent) {
                var obj = Alto.Object.create({
                    type: 'Admin',
                    doctorId: profilesRecord.doctorId,
                    facilityId: parent.id,
                    companyName: parent.name
                });

                roleRecords.addObject(obj);
            })
        }

        this.objectController.set('roles', roleRecords);
        this.objectController.set('profiles', profilesRecord);
    }

});