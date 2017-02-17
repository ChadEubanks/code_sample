// Project: Alto - JavaScript Application Framework
// Copyright: @2014 The Code Boutique, LLC
// License:   Intellectual property of The Code Boutique. LLC
// ==========================================================================

/**
 `Alto.CoreView` is the root view of all view instances. Every class you use or write inherits the instance methods of
 `Alto.Object`. You may not need to use any of these methods, but, if you choose to do so, you may need to override
 them with code that is specific to your class.

 @module UI
 @class Alto.CoreView
 @extends Alto.Object
 @since Alto 0.0.1
 @author Chad Eubanks
 */

CoreOs.CoreView = Alto.CoreView.extend({

    /**
     With our html elements all setup and ready to go.
     We add them to the dom and invokes viewDidAppear().
     @method viewWillAppear
     */
    viewWillAppear: function (html) {
        var attachToNode = this.get('attachToNode'),
            attachBeforeNode = this.get('attachBeforeNode'),
            APP = CoreOs.applicationName;

        if (Alto.isPresent(attachToNode) && Alto.isEmpty(attachBeforeNode)) {
            if (Alto.isEqual(attachToNode, 'body')) {
                document.getElementsByTagName('body')[0].appendChild(html);
            } else {
                attachToNode.appendChild(html);
            }
        } else {
            // todo handle before node use case
        }

        this.viewDidAppear(html);
    }

});