CoreApp.authenticateFixtureData = Alto.Object.createWithMixins({

    user: 'Anthony', // Chad, Business  

    fixtureData: Alto.computed(function () {
        var currentUser = this.get('user').toLowerCase();
        if (Alto.isPresent(this[currentUser])) {
            return this.get(currentUser);
        } else {
            Alto.Logger.error('User', currentUser, 'is not a known fixture hash.');
        }
    }).volatile(),

    chad: {
        "id": 3,
        "email": "chade@lifewallet.co",
        "token": "522c3244a8c69bab6da66c0fa0a66f37",
        "first_name": "Chad",
        "last_name": "Eubanks",
        "employee_profile_id": null,
        "profile_picture": null,
        "roles": [{
            type: 'Broker',
            brokerageId: 08,
            companyName: 'Chad Eubanks Brokerage'
        }, {
            type: 'Carrier',
            carrierId: 01,
            companyName: 'Chad Eubanks Carrier'
        },{
            type: 'Human Resource',
            companyId: '719eee46-49ff-45a6-8f71-4cae56cdc458',
            companyName: 'The Code Boutique'
        }],

        "profiles": {}
    },

    anthony: {
        "id": 2985,
        "email": "anthonya@lifewallet.co",
        "token": "12bf4d523b8e27c8283277aba794f501",
        "first_name": "Anthony",
        "last_name": "Alviz",
        "employee_profile_id": null,
        "profile_picture": null,
        "roles": [{
            type: 'Broker',
            brokerageId: 12,
            companyName: 'Apple Inc'
        }, {
            type: 'Human Resources',
            companyId: '7eab1f1f-c375-410d-ae64-9931b50918e5',
            companyName: 'Apple Inc'
        }, {
            type: 'Employee',
            companyId: '073e5a78-2f52-431e-9123-5d73bb22d11d',
            employeeId: '9a267a24-1854-43b9-a491-bdbc46cbd9dc',
            companyName: 'Apple Inc'
        }],

        "profiles": {
            doctorId: 22,
            personId: 630
        },

        "facilities": {
            "parent": [{
                id: 30,
                name: 'LifeWallet'
            }, {
                id: 103,
                name: 'LifeWallet'
            }, {
                "id": 138,
                "name": "iOS"
            }],
            "admin": [],
            "owner": [30, /*31, 42, 43, 44, 45, 73*/]
        }
    },

    jonathan: {
        "id": 3,
        "email": "jonathan@lifewallet.co",
        "token": "223e82eb4f2520657f3835840008b214",
        "first_name": "Jonathan",
        "last_name": "Benghiat",
        "employee_profile_id": null,
        "profile_picture": null,
        "roles": [{
            type: 'Broker',
            brokerageId: 14,
            companyName: 'Yung Brokers'
        }, {
            type: 'Human Resources',
            companyId: '63ed1d16-9699-4c6f-942b-e53ac4fb1b3e',
            companyName: 'The Code Boutique'
        }, {
            type: 'Employee',
            companyId: '63ed1d16-9699-4c6f-942b-e53ac4fb1b3e',
            employeeId: '72c05e09-edab-4a73-a53c-5829f443a7a6',
            companyName: 'Tesla Motors'
        },{
            type: 'Carrier',
            carrierId: 01,
            companyName: 'Chad Eubanks Carrier'
        }],
        "profiles": {
            personId: 630
        }
    },

    business: {
        // secret //
        "id": 8441,
        "email": "business_demo@lifewallet.com",
        "token": "dd796cc9f3d904d3f9e102356c57dbcd",
        "first_name": "Business",
        "last_name": "Demo",
        "employee_profile_id": null,
        "profile_picture": null,
        "roles": [{
            type: 'Broker',
            brokerageId: 16,
            companyName: 'HRBenefits Brokerage'
        }, {
            type: 'Human Resource',
            companyId: '80c3a65c-fc00-4e76-abda-f71f61ee3465',
            companyName: 'The Code Boutique'
        }, {
            type: 'Employee',
            companyId: '80c3a65c-fc00-4e76-abda-f71f61ee3465',
            employeeId: '4d388b72-5221-4bb1-992a-889a43998f81',
            companyName: 'The Code Boutique (Marin)'
        }, , {
            type: 'Employee',
            companyId: '80c3a65c-fc00-4e76-abda-f71f61ee3465',
            employeeId: 'fe66f433-73c5-43f3-8dc7-59b905f16ab4',
            companyName: 'The Code Boutique (Chad)'
        }],
        "profiles": {}
    }
});
