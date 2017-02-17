CoreApp.LoginView = CoreOs.View.extend({
    classNames: ['login-view'],
    childViews: ['ContentFrame'],

    ContentFrame: CoreOs.View.extend({
        classNames: ['content-frame'],
        childViews: ['LwIcon', 'LoginPane'],

        LwIcon: CoreOs.View.extend({
            classNames: ['lw-logo','images-lw-logo']
        }),

        LoginPane: CoreOs.View.extend({
            classNames: ['login-pane'],
            childViews: ['EmailForm', 'PasswordForm', 'ErrorLabel', 'ActionItemFrame'],

            EmailForm: CoreOs.TextField.extend({
                classNames: ['textfield', 'emailForm'],
                animateHint: true,
                isDefaultFocus: true,
                hint: 'Email',
                valueBinding: 'CoreApp.userController.email'
            }),

            PasswordForm: CoreOs.TextField.extend({
                classNames: ['textfield'],
                animateHint: true,
                hint: 'Password',
                type: 'password',
                valueBinding: 'CoreApp.userController.password'
            }),

            ErrorLabel: CoreOs.LabelView.extend({
                classNames: ['login-error-label'],
                isVisibleBinding: 'CoreApp.userController.isErrorVisible',
                title: Alto.String.loc('INVALID_CREDENTIALS_LABEL')
            }),

            ActionItemFrame: CoreOs.View.extend({
                classNames: ['action-item-frame'],
                childViews: ['SubmitButton'],

                SubmitButton: CoreOs.ButtonView.extend(CoreOs.KeyPressActionMixin, {
                    classNames: ['submit-button'],
                    title: 'Submit',
                    action: 'initiateAuthentication'
                })

            })

        })

    })

});