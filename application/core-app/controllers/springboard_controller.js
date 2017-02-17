alto_require('core-app/controllers/role_controller.js');

CoreApp.springboardController = Alto.ArrayController.createWithMixins({

    content: [],

    adminAppsBinding: 'CoreOs.permission.adminApplications',

    brokerageAppsBinding: 'CoreOs.permission.brokerageApplications',

    carrierAppsBinding: 'CoreOs.permission.carrierApplications',

    consumerAppsBinding: 'CoreOs.permission.consumerApplications',

    employeeAppsBinding: 'CoreOs.permission.employeeApplications',

    hrAppsBinding: 'CoreOs.permission.hrApplications',

    roleBinding: 'CoreApp.roleController.content',

    roleDidChange: Alto.observer('role', function () {
        var type = CoreApp.roleController.get('type');
        
        if (type.toLowerCase() === 'broker' || type.toLowerCase() === 'agent' || type.toLowerCase() === 'csr') {
            this.set('content', this.get('brokerageApps'));

        } else if (type.toLowerCase() === 'employee') {
            this.set('content', this.get('employeeApps'));

        } else if (type.toLowerCase() === 'human resources' || type.toLowerCase() === 'human resource' || type.toLowerCase() === 'hr') {
            this.set('content', this.get('hrApps'));

        } else if (type.toLowerCase() === 'carrier') {
            this.set('content', this.get('carrierApps'));

        } else if (type.toLowerCase() === 'admin') {
            this.set('content', this.get('adminApps'));

        } else if (type.toLowerCase() === 'consumer') {
            this.set('content', this.get('consumerApps'));

        }

    })

});