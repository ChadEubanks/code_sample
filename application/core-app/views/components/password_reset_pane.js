CoreApp.PasswordResetPane = CoreOs.ModalPane.extend({
    classNames: ['password-reset-pane'],
    action: 'removePasswordResetPane',

    ContentView: CoreOs.View.extend({
        classNames: ['content-view'],
        childViews: ['PasswordMessage', 'DoneButton'],
        stopPropagation: true,

        PasswordMessage: CoreOs.LabelView.extend({
            classNames: ['password-message'],
            title: Alto.String.loc('PASSWORD_RESET_MESSAGE')
        }),

        DoneButton: CoreOs.ButtonView.extend({
            classNames: ['done-button'],
            title: Alto.String.loc('DONE_BUTTON_TITLE'),
            action: 'removePasswordResetPane'
        })
    })
})