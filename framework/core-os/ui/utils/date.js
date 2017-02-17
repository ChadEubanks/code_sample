CoreOs.date = Alto.Object.createWithMixins({

    days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],

    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

    monthsNumeral: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],

    monthsAbbreviated: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

    futureYears: ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025',],

    now: function () {
        return new Date();
    }.property().volatile(),

    formatDate: function(date) {

        if (Alto.isEmpty(date)) {
            return
        }

        var day = new Date (date).getUTCDate(),
            monthIndex = new Date (date).getMonth(),
            year = new Date (date).getFullYear();

        return '%@ %@, %@'.fmt(this.get('monthsAbbreviated')[monthIndex], day, year)
    },

    formatUTCHours: function(date) {
        var hour = (new Date (date)).getUTCHours(),
            min = (new Date (date)).getUTCMinutes().toString(),
            formattedMin, timeStamp;

        if (Alto.isEqual(min.length, 1)) {
            formattedMin = "0%@".fmt(min);
        } else {
            formattedMin = min;
        }

        if (hour > 12) {
            timeStamp = "%@:%@pm".fmt(hour-12, formattedMin);
        } else {
            timeStamp = "%@:%@am".fmt(hour, formattedMin);
        }

        return timeStamp;
    },

    formatHours: function(date) {
        var hour = (new Date (date)).getHours(),
            min = (new Date (date)).getMinutes().toString(),
            formattedMin, timeStamp;

        if (Alto.isEqual(min.length, 1)) {
            formattedMin = "0%@".fmt(min);
        } else {
            formattedMin = min;
        }

        if (hour > 12) {
            timeStamp = "%@:%@pm".fmt(hour-12, formattedMin);
        } else if (Alto.isEqual(hour, 12)) {
            timeStamp = "%@:%@pm".fmt(12, formattedMin);
        } else if (Alto.isEqual(hour, 0)) {
            //midnight test case
            timeStamp = "%@:%@am".fmt(12, formattedMin);
        } else {
            timeStamp = "%@:%@am".fmt(hour, formattedMin);
        }

        return timeStamp;
    },

    formatIsoTimezone: function (date) {
        var time = Alto.isPresent(date) ? new Date(date) : new Date(),
            tzo = -time .getTimezoneOffset(),
            dif = tzo >= 0 ? '+' : '-',
            pad = function(num) {
                var norm = Math.abs(Math.floor(num));
                return (norm < 10 ? '0' : '') + norm;
            };
        return time.getFullYear()
            + '-' + pad(time.getMonth()+1)
            + '-' + pad(time.getDate())
            + 'T' + pad(time.getHours())
            + ':' + pad(time.getMinutes())
            + ':' + pad(time.getSeconds())
            + '.' + pad(time.getMilliseconds())
            + dif + pad(tzo / 60)
            + ':' + pad(tzo % 60);
    }
});