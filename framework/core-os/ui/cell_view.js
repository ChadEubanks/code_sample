alto_require('core-os/ui/core_view.js');

// ==========================================================================
// Project: CoreOs - JavaScript Application Framework
// Copyright: @2015 The Code Boutique, LLC
// License:   Intellectual property of The Code Boutique. LLC
// ==========================================================================

/**
 Gives logging to your console some color.

 @module UI
 @class CoreOs.Cell
 @extends CoreOs.CoreView
 @since CoreOs 1.0
 @author Chad Eubanks
 */

CoreOs.Cell = CoreOs.CoreView.extend ({

    tag: 'li',

    /**
     Index of cell at a particular row in a list.
     @property indexRow
     */
    indexRow: "",

    isSelectedBinding: 'this.data.isSelected',

    selection: '',

    action: 'internal',

    /*
     Has the html elements and passes them to viewWillAppear().

     We know about the html elements and can do some setup in here.
     Example: add disabled, hidden, etc className / adds alto object ids (maybe) / setup dynamic data and more...
     */
    viewDidLoad: function(node) {
        this._super(node);

        if (this.get('isSelected')) {
            node.classList.add('is-selected');
        }

        if (!this.get('isVisible')) {
            node.classList.add('hidden');
        }

    },

    isSelectedDidChange: Alto.observer('isSelected', function () {
        if (this.get('isSelected')) {
            this.node.classList.add('is-selected');
        } else {
            this.node.classList.remove('is-selected');
        }

        // update the prior selected cell selection state
        if (Alto.isPresent(this.parentView.get('selectedCell'))) {
            this.parentView.selectedCell.set('isSelected', false);
        }

        this.parentView.set('selectedCell', this);
    }),

    _mouseDown: function () {
        this.set('isSelected', true);
        this.set('selection', this.get('data'));
    }

});