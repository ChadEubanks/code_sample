alto_require('core-os/ui/core_view.js');

// ==========================================================================
// Project: CoreOs - JavaScript Application Framework
// Copyright: @2015 The Code Boutique, LLC
// License:   Intellectual property of The Code Boutique. LLC
// ==========================================================================

/**
 `CoreOs.Checkbox` is an instance that defaults to a checkbox. Setting the boolean isRadio to true is used when there is a list of two
 or more options that are mutually exclusive and the user must select exactly one choice. The property isEnabled will
 set the checkbox value prior to usage in a CoreOs view.

 A simple example of usage:

 ```javascript
 sampleCheckbox: CoreOs.Checkbox.extend({
    title: 'Sample Checkbox',
    isRadio: true,
    isEnabled: true                     //checkbox set to display as checked
 })
 ```

 @module UI
 @class CoreOs.Checkbox
 @extends CoreOs.CoreView
 @since CoreOs 1.0
 @author Chad Eubanks
 */

CoreOs.Checkbox = CoreOs.CoreView.extend({

    name: null,

    /**
     Sets the title of the button.

     @property title
     @type String
     */
    title: '',

    /**
     Sets the checkbox label to be checked.

     @property isChecked
     @type boolean
     */
    isChecked: false,

    /**
     Checkbox label is enabled for the view.

     @property isEnabled
     @type boolean
     */
    isEnabled: true,

    /**
     Sets the checkbox to a radio style checkbox.

     @property isRadio
     @type boolean
     */
    isRadio: false,

    value: null,

    /*
     Gets the template and passes html elements to viewDidLoad().

     We dont know anything about the html elements nor should
     we make that assumption.
     */
    viewWillLoad: function () {
        var label = document.createElement('label'),
            input = document.createElement('input');

        this.viewDidLoad(label, input);
    },

    /*
     Has the html elements and passes them to viewWillAppear().

     We know about the html elements and can do some setup in here.
     Example: add disabled, hidden, etc className / adds alto object ids (maybe) / setup dynamic data and more...
     */
    viewDidLoad: function (label, input) {
        if (label && input) {
            input.type = (this.get('isRadio')) ? 'radio' : 'checkbox';
            input.checked = this.get('isChecked');

            label.innerHTML = this.get('title');
            label.className = 'alto-checkbox-label'
            label.appendChild(input);
        }

        if (!this.get('isEnabled')) {
            label.classList.add('disabled');
            input.disabled = true;
        }

        if (this.get('isRadio') && Alto.isPresent(this.get('name'))) {
            input.name = this.get('name');
        }

        if (this.get('isRadio') && Alto.isPresent(this.get('value'))) {
            input.value = this.get('value');
        }


        if (this.get('isRadio')) {
            input.className = 'radio-button';
        }

        this.addClickHandler(label);

        this._super(label);
    },

    addClickHandler: function (node) {
        var that = this

        node.addEventListener("change", function () {
            that.onChange(that)
        }, false);
    },

    onChange: function (view) {

        this.set('selection', this.get('value'));

        if (this.get('isEnabled')) {
            this.set('isChecked', view.node.children[0].checked)
        } else {
            this.node.children[0].checked = this.get('isChecked');
        }
    },

    _isEnableDidChange: function () {
        if (this.get('isEnabled')) {
            this.node.classList.remove('disabled');
            this.node.children[0].disabled = false;
        } else {
            this.node.classList.add('disabled');
            this.node.children[0].disabled = true;
        }
    }.observes('this.isEnabled'),

    _isCheckDidChange: function () {
        this.node.children[0].checked = this.get('isChecked');
    }.observes('this.isChecked')

});