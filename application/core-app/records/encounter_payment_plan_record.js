CoreApp.EncounterPaymentPlanRecord = Alto.Object.extend({

    id: '',
    amountPerMonth: '',
    name: '',
    setupFee: '',

    yearlyPrice: '',
    yearlyTotal: '',
    yearlyTax: '',

    monthlyPrice: '',
    monthlyTotal: '',
    monthlyTax: '',


    //computed
    formattedYearlyPrice: Alto.computed('yearlyPrice', function () {
        return '$%@ USD'.fmt(parseInt(this.get('yearlyPrice')).toFixed(2));
    }).volatile(),

    formattedYearlyTotal: Alto.computed('yearlyTotal', function () {
        return '$%@ USD'.fmt(parseInt(this.get('yearlyTotal')).toFixed(2));
    }).volatile(),

    formattedYearlyTax: Alto.computed('yearlyTax', function () {
        return '$%@ USD'.fmt(parseInt(this.get('yearlyTax')).toFixed(2));
    }).volatile()

});