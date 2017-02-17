alto_require('core-os/application/debug/console.js');
alto_require('core-os/statechart/state.js');
alto_require('core-os/statechart/substate.js');

// ==========================================================================
// Project: Alto - JavaScript Application Framework
// Copyright: @2015 The Code Boutique, LLC
// License:   Intellectual property of The Code Boutique. LLC
// ==========================================================================

/**
 An application will have one StateChart.  When your application initalizes, a StateChart singleton scoped to your
 application name is created for you.

 @module Statechart
 @class CoreOs.Statechart
 @extends Alto.Object
 @since CoreOs 1.0
 @author Chad Eubanks
 */


CoreOs.Statechart = Alto.Object.extend({

    /**
     Current state the application is in.
     @property currentState
     */
    currentState: "",

    /**
     Current substate the application is in.
     @property currentSubstate
     */
    currentSubstate: "",

    dispatchViewEvent: function (eventName) {
        var APP = CoreOs.applicationName,
            state = window[APP].statechart.currentState,
            substate = window[APP].statechart.currentSubstate,
            args = Array.prototype.slice.call(arguments),
            message = "Unknown method name: Your state is missing the method \"" + eventName + "\".";

        args.shift();

        if (!window[APP][state]) {
            return
        }

        if (window[APP][substate] && window[APP][substate][eventName]) {
            window[APP][substate][eventName].apply(this, args);
        } else if (window[APP][state].viewState && window[APP][state].viewState[eventName]) {
            window[APP][state].viewState[eventName].apply(this, args);
        } else if (window[APP][substate].viewState && window[APP][substate].viewState[eventName]) {
            window[APP][substate].viewState[eventName].apply(this, args);
        } else {
            CoreOs.Console.log(message, CoreOs.Console.errorColor);
        }

    },

    /**
     Takes function parameter and executes that event.

     Example:
     ```javascript
     window[APP].statechart.dispathEvent('function')
     ```
     @method dispatchEvent
     @param function
     @type String
     */
    dispatchEvent: function (eventName) {
        var APP = CoreOs.applicationName,
            state = window[APP].statechart.currentState,
            substate = window[APP].statechart.currentSubstate,
            args = Array.prototype.slice.call(arguments),
            message = "Unknown method name: Your state is missing the method \"" + eventName + "\".";

        args.shift();

        if (!window[APP][state]) {
            return
        }

        if (window[APP][substate] && window[APP][substate][eventName]) {
            window[APP][substate][eventName].apply(this, args);
        } else if (window[APP][state][eventName]) {
            window[APP][state][eventName].apply(this, args);
        } else if (window[APP][state].viewState[eventName]) {
            window[APP][state].viewState[eventName].apply(this, args);
        } else {
            CoreOs.Console.log(message, CoreOs.Console.errorColor);
        }

    },

    /**
     Leaves current state and routes to a new state.

     Example:
     ```javascript
     window[APP].statechart.goToState('newState')
     ```
     @method goToState
     @type String
     @param stateName
     */
    goToState: function (state) {
        var APP = CoreOs.applicationName;

        // If we are already in a state, call is exitState before transitioning
        if (window[APP].statechart.get("currentState") != "") {

            if (Alto.isPresent(window[APP].statechart.get('currentSubstate'))) {
                window[APP].statechart.leaveCurrentSubState();
                window[APP].statechart.set('substateHistory', []);
            }

            if (window[APP].LogStateTransitions) {
                var message = "Exiting " + window[APP].statechart.get("currentState");
                CoreOs.Console.log(message, CoreOs.Console.warnColor);
            }

            window[APP][window[APP].statechart.get("currentState")].exitState();
        }

        // Handle an attempt to enter a non existent state
        if (!window[APP][state.classify()]) {
            var message = "Can not find state " + state + ".";
            CoreOs.Console.log(message, CoreOs.Console.errorColor);
        } else {

            if (!window[APP][state]) {
                window[APP][state] = window[APP][state.classify()].create();
            }

            window[APP].statechart.set("currentState", state.camelize());

            if (window[APP].LogStateTransitions) {
                var message = "Entering " + window[APP].statechart.get("currentState");
                CoreOs.Console.log(message, CoreOs.Console.messageColor);
            }

            window[APP].statechart.set('currentSubstate', '');
            window[APP][state.camelize()].enterState();
        }
    },

    /**
     Leaves current substate (if present) and routes to new substate. Still retains parent state.

     Example:
     ```javascript
     window[APP].statechart.goToSubstate('newSubState')
     ```
     @method goToSubstate
     @param substate
     @type String
     */
    goToSubstate: function (substate) {
        // check if the current state has the substate
        // enter the substate
        // set the statecharts current substate
        var APP = CoreOs.applicationName,
            currentState = window[APP].statechart.get("currentState"),
            currentSubstate = window[APP].statechart.get("currentSubstate");

        if (Alto.isPresent(currentSubstate)) {
            window[APP].statechart.leaveCurrentSubState();
        }

        if (window[APP][currentState][substate]) {
            window[APP][substate] = window[APP][currentState][substate].create();

            window[APP].statechart.set("currentSubstate", substate);

            if (window[APP].LogStateTransitions) {
                var message = "Entering substate " + window[APP].statechart.get("currentSubstate");
                CoreOs.Console.log(message, CoreOs.Console.messageColor);
            }

            window[APP][substate].enterState();

        } else if (window[APP][currentSubstate][substate]) {
            window[APP][substate] = window[APP][currentSubstate][substate].create();

            window[APP].statechart.leaveCurrentSubState();

            window[APP].statechart.set("currentSubstate", substate);

            if (window[APP].LogStateTransitions) {
                var message = "Entering substate " + window[APP].statechart.get("currentSubstate");
                CoreOs.Console.log(message, CoreOs.Console.messageColor);
            }

            window[APP][substate].enterState();
        } else {
            Alto.Logger.error('Substate', substate, 'not found in parent state');
        }

    },

    /**
     Explicitly leaves current substate and will display to console. However, `leaveCurrentSubState` is implicitly
     performed during `goToState` and `goToSubstate` methods.

     Example:
     ```javascript
     window[APP].statechart.leaveCurrentSubState();
     ```
     @method leaveCurrentSubState
     */
    leaveCurrentSubState: function () {
        var APP = CoreOs.applicationName,
            substate = window[APP].statechart.get("currentSubstate");

        if (window[APP].LogStateTransitions) {
            var message = "Exiting substate " + substate;
            CoreOs.Console.log(message, CoreOs.Console.warnColor);
        }

        window[APP][substate].exitState();

        window[APP].statechart.set("currentSubstate", null);
    }

});