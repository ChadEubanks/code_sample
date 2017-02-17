alto_require('core-app/controllers/user_controller.js');

CoreApp.rolesController = Alto.ArrayController.createWithMixins({

    contentBinding: 'CoreApp.userController.roles'

});