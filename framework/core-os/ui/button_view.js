alto_require('core-os/ui/core_view.js');

// ==========================================================================
// Project: Alto - JavaScript Application Framework
// Copyright: @2015 The Code Boutique, LLC
// License:   Intellectual property of The Code Boutique. LLC
// ==========================================================================

/**
 An `Alto.ButtonView` is an instance that implements a button view. This class provides methods for setting the title,
 target action, and an icon. Icon positioning can use one of three types (leftIcon, rightIcon, and tabbedIcon).
 Using these methods, you can specify a different appearance for each button state.

 @class CoreOs.ButtonView
 @extends Alto.ButtonView
 @since Alto 1.0.0
 @author Chad Eubanks
 */

CoreOs.ButtonView = CoreOs.CoreView.extend({

    tag: 'button',

    title: '',

    action: '',

    viewDidLoad: function (html) {
        var title = this.get('title'),
            action = this.get('action');

        if (Alto.isPresent(title)) {
            html.innerText = title;
        } else {
            Alto.Logger.error('Alto.Button requires a title.  Make sure you provide a value.  Button can not be created.');
            return;
        }

        if (Alto.isEmpty(action)) {
            Alto.Logger.error('Alto.Button requires an action.  Make sure you provide a value.  Button can not be created.');
            return;
        }

        this._super(html)
    }

});