// ==========================================================================
// Project: Alto - JavaScript Application Framework
// Copyright: @2015 The Code Boutique, LLC
// License:   Intellectual property of The Code Boutique. LLC
// ==========================================================================

/**
 Alto.main starts the initialization of your application.  You should not call this directly nor should you modify this
 method.

 @since CoreOs 1.0
 @author Chad Eubanks
 */

CoreOs.main = function() {
    var APP = window.CoreOs.applicationName;
    window[APP].applicationDidLoad();
}
CoreOs.main();
