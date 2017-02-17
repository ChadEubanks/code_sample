alto_require('core-os/statechart/state.js');

// ==========================================================================
// Project: Alto - JavaScript Application Framework
// Copyright: @2015 The Code Boutique, LLC
// License:   Intellectual property of The Code Boutique. LLC
// ==========================================================================

/**
 A substate object is used as a communication point between all of your applications components.

 @module Statechart
 @class CoreOs.SubState
 @extends CoreOs.State
 @since CoreOs 1.0
 @author Chad Eubanks
 */

CoreOs.Substate = CoreOs.State.extend ({

    isHistorySubstate: true

});