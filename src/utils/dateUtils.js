const renderData = require('../json/render-data.json');

module.exports = {
    
    /**
     * add days and return calculated date
     * @param {Date} date 
     * @param {Number} days 
     */
    addDays(date, days) {
        if (date.getDate == undefined) throw new Error(`'date' type is required`);
        var preDate = new Date(date.getTime());
        var newDate = preDate.setDate(preDate.getDate() + days);
        return new Date(newDate);
    },

    /**
     * add month and return calculated date
     * @param {Date} date 
     * @param {Number} month 
     * @returns 
     */
    addMonth(date, month) {
        if (date.getDate == undefined) throw new Error(`'date' type is required`);
        var preDate = new Date(date.getTime());
        var newDate = preDate.setMonth(preDate.getMonth() + month);
        return new Date(newDate);
    },

    /**
     * return last day of month
     * @param {Number} month 1 ~ 12
     */
    getLastDayOfMonth(year, month) {
        if (month < 1 || month > 12) {
            if (month < 1) month = 1;
            else month = 12;
        }
        return new Date(year, month, 0).getDate();
    },

    /**
     * 
     * @param {Number} year 
     */
    isLeapYear(year) {
        var isLeap = false;
        var targetYear = year;

        // convert year to number type
        if (typeof(targetYear) !== 'number') {
            try {
                targetYear = parseInt(targetYear);
            } catch (error) {
                console.error(error);
                targetYear = parseInt(new Date().getFullYear());
            }
        }

        /*
            1. year % 4 == 0 then 'leap year = YES'
            2. pass 1 and  year % 100 == 0 then 'leap year = NO'
            3. pass 2 and  year % 400 == 0 then 'leap year = YES'
        */

        if (targetYear % 4 === 0) {
            isLeap = true;
            if (targetYear % 100 === 0) {
                isLeap = false;
                if (targetYear % 400 === 0) {
                    isLeap = true;
                }
            }
        }

        return isLeap;
    },
}