alto_require('core-app/views/components/engage/carousel_view.js');

alto_require('core-app/localization/en/strings.js');

CoreApp.EngageCreateAccountView = CoreOs.View.extend({
    classNames: ['engage-create-account-view'],
    childViews: ['Toolbar', 'ContentFrame'],

    Toolbar: CoreOs.View.extend({
        classNames: ['toolbar'],
        childViews: ['EngageApplicationFrame', 'SignInFrame'],

        EngageApplicationFrame: CoreOs.View.extend({
            classNames: ['engage-application-frame'],
            childViews: ['ApplicationLogo', 'ApplicationLabel'],

            ApplicationLogo: CoreOs.View.extend({
                classNames: ['application-logo', 'images-engage-application-icon-2x']
            }),

            ApplicationLabel: CoreOs.LabelView.extend({
                classNames: ['application-label'],
                title: Alto.String.loc('ENGAGE_APPLICATION_NAME')
            })

        }),

        SignInFrame: CoreOs.View.extend({
            classNames: ['sign-in-frame'],
            childViews: ['AccountLabel', 'SignInButton'],

            AccountLabel: CoreOs.LabelView.extend({
                classNames: ['account-label'],
                title: Alto.String.loc('EXISTING_ACCOUNT_LABEL')
            }),

            SignInButton: CoreOs.ButtonView.extend({
                classNames: ['sign-in-button'],
                title: Alto.String.loc('SIGN_IN_BUTTON_TITLE'),
                action: 'transitionToIndexRoute'
            })
        })
    }),

    ContentFrame: CoreOs.View.extend({
        classNames: ['content-frame'],
        childViews: ['CarouselView'],

        CarouselView: CoreApp.CarouselView.extend({
            classNames: ['engage-carousel-view'],
            data: [Alto.Object.create({
                view: 'EngageGettingStartedView',
                index: 0
            }), Alto.Object.create({
                view: 'CustomizeEngageView',
                index: 1
            }), Alto.Object.create({
                view: 'EngagePaymentView',
                index: 2
            })]
        })

    })

})