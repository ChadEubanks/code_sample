alto_require('core-os/ui/core_view.js');

// ==========================================================================
// Project: CoreOs - JavaScript Application Framework
// Copyright: @2015 The Code Boutique, LLC
// License:   Intellectual property of The Code Boutique. LLC
// ==========================================================================

CoreOs.SpringboardIconView = CoreOs.CoreView.extend({

    tag: 'div',

    iconName: '',

    isDisabled: '',

    viewDidLoad: function (html) {
        var iconName = this.get('iconName'),
            action = this.get('action'),
            isDisabled = this.get('isDisabled');

        if (Alto.isPresent(iconName)) {
            if (isDisabled) {
                this.parentView.node.classList.add('disabled');
                this.parentView.action = 'internal'; // internal action means it will do nothing on click
            }

            html.classList.add(iconName);
        } else {
            Alto.Logger.error('SpringboardIconView requires a value for iconName.  View can not be created without an iconName.');
            return;
        }

        this._super(html);

    }

});