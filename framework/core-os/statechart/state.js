// ==========================================================================
// Project: Alto - JavaScript Application Framework
// Copyright: @2015 The Code Boutique, LLC
// License:   Intellectual property of The Code Boutique. LLC
// ==========================================================================

/**
 A state object is used as a communication point between all of your applications components.

 @module Statechart
 @class CoreOs.State
 @extends Alto.Object
 @since CoreOs 1.0
 @author Chad Eubanks
 */

CoreOs.State = Alto.Object.extend ({

    /**
     @method enterState
     */
    enterState: function () {},

    /**
     @method exitState
     */
    exitState: function () {}

});