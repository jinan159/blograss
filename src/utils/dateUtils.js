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
        if (month < 1 || month > 12) throw new Error(`'month' should be between 1 and 12`);
        return new Date(year, month-1, 0).getDate();
    },
}