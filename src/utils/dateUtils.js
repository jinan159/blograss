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
    }
}