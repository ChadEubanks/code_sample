CoreOs.KeyPressActionMixin = Alto.Mixin.create({

    /*
     Action that is dispatched when the key stroke is met.
     @property action
     */
    action: null,

    /*
     Keyboard char stroke code that is used to check if it was pressed to fire the appropriate action
     @property keyStroke
     */
    keyStroke: null,

    /*
     Adds event listener to the window and performs an action based on the element you have attached it to.
     @method viewWillLoad
    */

    viewWillLoad: function () {
        this._super();

        var APP = CoreOs.applicationName,
            action = this.get('action'),
            keyStroke = Alto.isPresent(this.get('keyStroke')) ? this.get('keyStroke') : 13;

        window.addEventListener('keypress', function (event) {

            if (Alto.isEqual(event.keyCode, keyStroke)) {

                if (Alto.isPresent(action)) {
                    window[APP].statechart.dispatchEvent(action);
                } else {
                    Alto.Logger.error('There is no action associated to the element the key press mixin was attached to.');
                    return;
                }

            }

        });
    }
})