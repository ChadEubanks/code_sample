alto_require('core-app/localization/en/strings.js');

CoreApp.PaymentInformationSegmentedView = CoreOs.View.extend({
    classNames: ['payment-information-segmented-view'],
    childViews: ['RadioButtonsFrame', 'PricingModelForms'],

    RadioButtonsFrame: CoreOs.View.extend({
        classNames: ['radio-button-frame'],
        childViews: ['Header', 'CreditCard', 'Check'],

        Header: CoreOs.LabelView.extend({
            classNames: ['header'],
            title: Alto.String.loc('PAYMENT_INFORMATION_FRAME_HEADER')
        }),

        CreditCard: CoreOs.Checkbox.extend({
            classNames: ['credit-card-checkbox'],
            title: Alto.String.loc('CREDIT_CARD_LABEL'),
            isRadio: true,
            name: 'credit_card',
            isCheckedBinding: 'CoreApp.accountController.isCreditCardModel'
        }),

        Check: CoreOs.Checkbox.extend({
            classNames: ['check-checkbox'],
            title: Alto.String.loc('CHECK_ACH_LABEL'),
            isRadio: true,
            name: 'check_ach',
            isCheckedBinding: 'CoreApp.accountController.isCheckAchModel'
        })

    }),

    planPricingModelDidChange: Alto.observer('CoreApp.accountController.pricingModelType', function () {
        Alto.DomUtil.removeAllChildren(this.node);
        Alto.run.once(this, 'viewCreateSubViews', true);
    }),

    PricingModelForms: CoreOs.View.extend({
        classNames: ['forms-frame'],
        childViews: ['ViewFrame'],

        ViewFrame: CoreOs.View.extend({
            classNames: ['view-frame'],
            childViews: ['DynamicPricingModelFormsView'],

            viewWillLoad: function () {
                this.defineChildViews();
                this._super();
            },

            defineChildViews: function () {
                var pricingModelType = CoreApp.accountController.get('pricingModelType'),
                    viewMixin = {classNames: ['dynamic-pricing-model-forms-view'], childViews: []};

                if (Alto.isEqual(pricingModelType, 'credit_card')) {
                    viewMixin.childViews.addObject('CreditCardForms');
                    viewMixin.CreditCardForms =  CoreApp.CreditCardView.extend();

                    this.parentView.parentView.parentView.node.style.height = '855px';
                } else if (Alto.isEqual(pricingModelType, 'check_ach')) {
                    viewMixin.childViews.addObject('CheckAchForms');
                    viewMixin.CheckAchForms =  CoreApp.CheckAchView.extend();

                    this.parentView.parentView.parentView.node.style.height = '585px';
                } else {
                    // do nothing
                }

                this.set('DynamicPricingModelFormsView', CoreOs.View.extend(viewMixin));
            },

            DynamicPricingModelFormsView: null
        })
    })
})