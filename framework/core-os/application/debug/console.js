// ==========================================================================
// Project: Alto - JavaScript Application Framework
// Copyright: @2015 The Code Boutique, LLC
// License:   Intellectual property of The Code Boutique. LLC
// ==========================================================================

/**
 `Alto.Console` is the root class for displaying messages in the console log. Warnings/errors are defaulted to red, while messages are black.

 @module Application
 @class CoreOs.Console
 @extends Alto.Object
 @since CoreOs 1.0
 @author Chad Eubanks
 */

CoreOs.Console = Alto.Object.create ({

    /**
     @property warnColor
     */
    warnColor: '#FFA500',

    /**
     @property errorColor
     */
    errorColor: '#ff0000',

    /**
     @property messageColor
     */
    messageColor: '#0099FF',

    /**
     @method log
     @param {String} msg The message to print in the console
     @param {String} color The color: warnColor, errorColor, messageColor
     */
    log: function (msg, color) {
        console.log("%c" + msg, "color:" + color + ";");
    }

});