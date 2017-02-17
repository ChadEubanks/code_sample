// ==========================================================================
// Project: Alto - JavaScript Application Framework
// Copyright: @2015 The Code Boutique, LLC
// License:   Intellectual property of The Code Boutique. LLC
// ==========================================================================

/**
 Permission orchestrator

 @module Permission
 @class CoreOs.permission
 @extends Alto.Object
 @since CoreOs 1.0
 @author Chad Eubanks
 */

CoreOs.permission = Alto.Object.createWithMixins({

    // 1) keys below map to incoming urls
    // 2) the values map to the respective key and are valid or possible roles
    brokerage: ['broker', 'csr', 'agent'],

    hr: ['human resource', 'hr'],

    employee: ['employee'],

    consumer: ['user', 'consumer'],

    carrier: ['carrier admin', 'carrier'],

    admin: ['admin'],

    brokerageApplications: [
        Alto.Object.createWithMixins({
            url: '/roles/brokerage/companies',
            route: Alto.computed(function () {
                var route = CoreApp.roleController.get('brokerageId') ? CoreApp.roleController.get('brokerageId') : parent.CoreApp.router.get('route').split('/')[1];
                return '#/brokerage/%@/companies'.fmt(route);
            }).volatile(),
            applicationName: 'Companies',
            applicationIcon: 'images-companies-icon',
            smallApplicationIcon: 'images-companies-icon-sm',
            isVisible: true
        }),

        Alto.Object.createWithMixins({
            url: '/roles/brokerage/plans',
            route: Alto.computed(function () {
                var route = CoreApp.roleController.get('brokerageId') ? CoreApp.roleController.get('brokerageId') : parent.CoreApp.router.get('route').split('/')[1];
                return '#/brokerage/%@/plans'.fmt(route);
            }).volatile(),
            applicationName: 'Plans',
            applicationIcon: 'images-plans-icon',
            smallApplicationIcon: 'images-plans-icon-sm',
            isVisible: true
        }),

        Alto.Object.createWithMixins({
            url: '/roles/brokerage/colleagues',
            route: Alto.computed(function () {
                var route = CoreApp.roleController.get('brokerageId') ? CoreApp.roleController.get('brokerageId') : parent.CoreApp.router.get('route').split('/')[1];
                return '#/brokerage/%@/colleagues'.fmt(route);
            }).volatile(),
            applicationName: 'Colleagues',
            applicationIcon: 'images-colleagues-icon',
            smallApplicationIcon: 'images-colleagues-icon-sm',
            isVisible: true
        }),

        Alto.Object.createWithMixins({
            url: '/roles/brokerage/enrollments',
            route: Alto.computed(function () {
                var route = CoreApp.roleController.get('brokerageId') ? CoreApp.roleController.get('brokerageId') : parent.CoreApp.router.get('route').split('/')[1];
                return '#/brokerage/%@/enrollments'.fmt(route);
            }).volatile(),
            applicationName: 'Enrollments',
            applicationIcon: 'images-enrollments-icon',
            smallApplicationIcon: 'images-enrollments-icon-sm',
            isVisible: true
        }),

        Alto.Object.createWithMixins({
            url: '/springboard',
            route: '#/springboard',
            applicationName: 'Home',
            applicationIcon: 'images-Unknown',
            smallApplicationIcon: 'images-home-icon-sm',
            isVisible: false
        })
    ],

    hrApplications: [
        Alto.Object.createWithMixins({
            url: '/roles/hr/employees',
            route: Alto.computed(function () {
                var companyId = CoreApp.roleController.get('companyId') ? CoreApp.roleController.get('companyId') : parent.CoreApp.router.get('route').split('/')[1];

                return '#/hr/%@/employees'.fmt(companyId);
            }).volatile(),
            applicationName: 'Employees',
            applicationIcon: 'images-colleagues-icon',
            smallApplicationIcon: 'images-colleagues-icon-sm',
            isVisible: true
        }),
        Alto.Object.createWithMixins({
            url: '/roles/hr/enrollments',
            route: Alto.computed(function () {
                var companyId = CoreApp.roleController.get('companyId') ? CoreApp.roleController.get('companyId') : parent.CoreApp.router.get('route').split('/')[1];

                return '#/hr/%@/enrollments'.fmt(companyId);
            }).volatile(),
            applicationName: 'Enrollments',
            applicationIcon: 'images-enrollments-icon',
            smallApplicationIcon: 'images-enrollments-icon-sm',
            isVisible: true
        }),
        Alto.Object.createWithMixins({
            url: '/springboard',
            route: '#/springboard',
            applicationName: 'Home',
            applicationIcon: 'images-Unknown',
            smallApplicationIcon: 'images-home-icon-sm',
            isVisible: false
        })
    ],

    consumerApplications: [
        Alto.Object.createWithMixins({
            url: '/roles/consumer/healthbook',
            route: '#/consumer/healthbook',
            applicationName: 'Healthbook',
            applicationIcon: 'images-healthbook-icon',
            smallApplicationIcon: 'images-healthbook-icon-sm',
            isVisible: true
        }),

        Alto.Object.createWithMixins({
            url: '/roles/consumer/notifications',
            route: '#/consumer/notifications',
            applicationName: 'Notifications',
            applicationIcon: 'images-notifications-icon',
            smallApplicationIcon: 'images-notifications-icon-sm',
            isVisible: true,
            isDisabled: true
        }),

        Alto.Object.createWithMixins({
            url: '/springboard',
            route: '#/springboard',
            applicationName: 'Home',
            applicationIcon: 'images-Unknown',
            smallApplicationIcon: 'images-home-icon-sm',
            isVisible: false
        })
    ],

    employeeApplications: [
        Alto.Object.createWithMixins({
            url: '/roles/employee/enrollments',
            route: Alto.computed(function () {
                return '#/employee/%@/companies/%@/enrollments'.fmt(CoreApp.roleController.get('employeeId'), CoreApp.roleController.get('companyId'));
            }).volatile(),
            applicationName: 'Enrollments',
            applicationIcon: 'images-enrollments-icon',
            smallApplicationIcon: 'images-enrollments-icon-sm',
            isVisible: true
        }),

        Alto.Object.createWithMixins({
            url: '/roles/employee/policies',
            route: '#/consumer/policies',
            applicationName: 'Policies',
            applicationIcon: 'images-policies-icon',
            smallApplicationIcon: 'images-policies-icon-sm',
            isVisible: true,
            isDisabled: true
        }),

        Alto.Object.createWithMixins({
            url: '/roles/employee/notifications',
            route: '#/consumer/notifications',
            applicationName: 'Notifications',
            applicationIcon: 'images-notifications-icon',
            smallApplicationIcon: 'images-notifications-icon-sm',
            isVisible: true,
            isDisabled: true
        }),

        Alto.Object.createWithMixins({
            url: '/springboard',
            route: '#/springboard',
            applicationName: 'Home',
            applicationIcon: 'images-Unknown',
            smallApplicationIcon: 'images-home-icon-sm',
            isVisible: false
        })
    ],

    carrierApplications: [
        Alto.Object.createWithMixins({
            url: '/roles/carrier/exporter',
            route: Alto.computed(function () {
                return '#/carrier/%@/exporter'.fmt(CoreApp.roleController.get('carrierId'));
            }).volatile(),
            applicationName: 'Exporter',
            applicationIcon: 'images-Unknown',
            smallApplicationIcon: 'images-home-icon-sm',
            isVisible: true
        }),

        Alto.Object.createWithMixins({
            url: '/roles/carrier/plans',
            route: Alto.computed(function () {
                return '#/carrier/%@/plans'.fmt(CoreApp.roleController.get('carrierId'));
            }).volatile(),
            applicationName: 'Plans',
            applicationIcon: 'images-plans-icon',
            smallApplicationIcon: 'images-plans-icon-sm',
            isVisible: true
        }),

        Alto.Object.createWithMixins({
            url: '/roles/carrier/quoter',
            route: Alto.computed(function () {
                return '#/carrier/%@/quoter'.fmt(CoreApp.roleController.get('carrierId'));
            }).volatile(),
            applicationName: 'Quoter',
            applicationIcon: 'images-plans-icon',
            smallApplicationIcon: 'images-plans-icon-sm',
            isVisible: true
        }),

        Alto.Object.createWithMixins({
            url: '/springboard',
            route: '#/springboard',
            applicationName: 'Home',
            applicationIcon: 'images-Unknown',
            smallApplicationIcon: 'images-home-icon-sm',
            isVisible: false
        })
    ],

    adminApplications:[
        Alto.Object.createWithMixins({
            url: '/roles/admin/encounter',
            route: Alto.computed(function () {
                return '#/admin/%@/encounter/facilities/%@'.fmt(CoreApp.roleController.get('doctorId'), CoreApp.roleController.get('facilityId'));
            }).volatile(),
            applicationName: 'Encounter',
            applicationIcon: 'images-encounter-icon-sm',
            isVisible: true
        }),

        Alto.Object.createWithMixins({
            url: '/roles/admin/engage',
            route: Alto.computed(function () {
                return '#/admin/%@/engage/facilities/%@'.fmt(CoreApp.roleController.get('doctorId'), CoreApp.roleController.get('facilityId'));
            }).volatile(),
            applicationName: 'Engage',
            applicationIcon: 'images-engage-icon-sm',
            isVisible: true,
            isDisabled: true
        }),

        Alto.Object.createWithMixins({
            url: '/roles/admin/template_builder',
            route: Alto.computed(function () {
                return '#/admin/%@/builder/facilities/%@/templates/communications'.fmt(CoreApp.roleController.get('doctorId'), CoreApp.roleController.get('facilityId'));
            }).volatile(),
            applicationName: 'Builder',
            applicationIcon: 'images-builder-icon-sm',
            isVisible: Alto.computed(function () {
                return CoreApp.userController.get('admin');
            })
        })

    ]

});