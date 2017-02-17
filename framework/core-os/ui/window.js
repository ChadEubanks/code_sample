alto_require('core-os/ui/core_view.js');

// ==========================================================================
// Project: Alto - JavaScript Application Framework
// Copyright: @2015 The Code Boutique, LLC
// License:   Intellectual property of The Code Boutique. LLC
// ==========================================================================

/**
 Base pane class.

 @module UI
 @class Alto.Window
 @extends Alto.CoreView
 @since Alto 0.0.2
 @internal-version 0.0.1
 @author Chad Eubanks and Miguel Chateloin
 */

CoreOs.Window = Alto.Object.extend({

    isWindow: true,

    init: function () {
        this.establishEventListenrs();
    },

    establishEventListenrs: function () {
        var that = this,
            _window = document.getElementsByTagName('body')[0];

        // let the html element know about the view //
        _window.__alto_object__ = this;

        // register client handler
        _window.addEventListener("click", that.mouseDown, true);
        _window.addEventListener("touchend", that.mouseDown, true);

    },

    mouseDown: function (event) {
        var APP = CoreOs.applicationName,
            responderPane = Alto.isPresent(CoreApp.window.get('responder'));

        if (Alto.isNone(event.target.__alto_object__)) {
            return
        }
        if (Alto.isPresent(event.target.__alto_object__.action)) {

            if (event.target.__alto_object__._mouseDown) {
                event.target.__alto_object__._mouseDown();
            }

            if (event.target.__alto_object__.action != 'internal') {
                window[APP].statechart.dispatchEvent(event.target.__alto_object__.action, event.target.__alto_object__);
            }

        } else {
            var _action, sender = event.target.__alto_object__;

            while (!_action && !sender.stopPropagation) {
                if (!sender.parentView) {
                    return
                }
                _action = sender.parentView.action;
                sender = sender.parentView;

                if (responderPane && Alto.isPresent(CoreApp.window.get('responder'))) {
                    CoreApp.window.get('responder').remove();
                    CoreApp.window.set('responder', '');
                }
            }

            if (sender.stopPropagation) {
                return
            }

            if (sender._mouseDown) {
                sender._mouseDown();
            }

            if (_action && _action != 'internal') {
                window[APP].statechart.dispatchEvent(_action, sender);
            }

        }
    }

});
