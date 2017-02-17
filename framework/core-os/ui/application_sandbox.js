alto_require('core-os/ui/core_view.js');

// ==========================================================================
// Project: CoreOs - JavaScript Application Framework
// Copyright: @2015 The Code Boutique, LLC
// License:   Intellectual property of The Code Boutique. LLC
// ==========================================================================

/**

 @class CoreOs.ApplicationSandbox
 @extends CoreOs.CoreView
 @since CoreOs 1.0
 @author Chad Eubanks
 */


CoreOs.ApplicationSandbox = CoreOs.CoreView.extend({
    classNames: ['application-sandbox'],

    tag: 'iframe',

    attachToNode: 'body',

    url: null,

    isLocal: null,

    viewDidLoad: function (html) {
        var frame = document.createElement('div');

        html.classList.add('application-window');
        frame.appendChild(html);
        this._super(frame);
    },

    /**
     Our html is now on the dom and can be queried.
     @method viewDidAppear
     */
    viewDidAppear: function (html) {
        if (this.get('isLocal')) {
            window.frames[0].location.replace('%@/%@/applications%@/index.html'.fmt(location.origin, location.pathname.split('/')[1], this.get('url')));
        } else {
            window.frames[0].location.replace('%@/applications%@/index.html'.fmt(location.origin, this.get('url')));
        }

        this._super(html);
    },


    urlDidChange: Alto.observer('url', 'isLocal', function () {
        if (this.get('isLocal')) {
            window.frames[0].location.replace('%@/%@/applications%@/index.html'.fmt(location.origin, location.pathname.split('/')[1], this.get('url')));
        } else {
            window.frames[0].location.replace('%@/applications%@/index.html'.fmt(location.origin, this.get('url')));
        }
    })

})