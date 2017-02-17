alto_require('core-os/ui/core_view.js');
alto_require('core-os/ui/cell_view.js');
alto_require('core-os/ui/utils/dom_util.js');

// ==========================================================================
// Project: CoreOs - JavaScript Application Framework
// Copyright: @2015 The Code Boutique, LLC
// License:   Intellectual property of The Code Boutique. LLC
// ==========================================================================

/**
 `CoreOs.ListView` is an instance that creates an unordered list. Each list view has a cell,
 which can bind to the data property and be independet from any other cells in the list.

 One example of usage:

 ```javascript
 sampleList: CoreOs.ListView.extend({
        cell: CoreOs.Cell.extend({})
        data: "ApplicationName.ApplicationController.content"
 })
 ```

 @module UI
 @class CoreOs.ListView
 @extends CoreOs.CoreView
 @since CoreOs 1.0
 @author Chad Eubanks
 */

CoreOs.ListView = CoreOs.CoreView.extend({

    selectedCell: '',

    tag: "ul",

    /**
     Individual cell for each item in the list
     @property cell
     @type object
     */
    Cell: null,

    /**
     The information that the list will bind to.
     @property data
     @type object
     */
    data: null,

    /*
     Create the views subviews

     */
    viewCreateSubViews: function (skipAnimation) {
        if (Alto.isEmpty(this.get('data'))) {
            return
        }

        var dataCollection = this.get('data'),
            Cell = this.get('Cell'), that = this;

        dataCollection.forEach(function (data, idx) {
            var cell = Cell.createWithMixins({parentView: that, data: data, indexRow: idx});

            if (data.get('isSelected')) {
                that.set('selectedCell', cell);
                cell.set('selection', data);
            }
            that.node.appendChild(cell.node)
        })

        if (skipAnimation) {
            // do nothing
        } else {
            Alto.run.later(function () {
                that.viewAnimateIn();
            }, 200);
        }

    },

    dataDidChange: Alto.observer('data', 'data.length', function () {
        if (!this.get('data')) {
            return
        }

        CoreOs.DomUtil.removeAllChildren(this.node);

        Alto.run.once(this, 'viewCreateSubViews', true);
    })

})