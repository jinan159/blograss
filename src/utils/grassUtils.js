const renderData = require('../json/render-data.json');

module.exports = {

    rectDefaultSize: "large",

    /**
     * get grass size
     * @returns 
     */
    getGrassSize: function() {
        return renderData.grass.size;
    },

    /**
     * get grass margin
     * @returns 
     */
     getGrassMargin: function() {
        return renderData.grass.margin;
    },

    /**
     * get grass start position
     * @returns
     */
     getGrassStartPosition: function() {
        return renderData.grass.start_position;
    },

    /**
     * get grass height by day
     * ex) sunday: top of week
     * @param {Date} value 
     */
     getGrassHeightByDay: function(date) {
        if (date.getDate == undefined) throw new Error(`'date' type is required`);
    
        // console.log(new Intl.DateTimeFormat('ko-KR', { weekday: 'long'}).format(date));
        var day = date.getDay();
    
        var size = this.getGrassSize();
        var margin = this.getGrassMargin();
        
        return (size.height + margin) * day;
    },

    /**
     * check size is exist
     * @param {String} size
     * @returns 
     */
     isRectSizeExist: function(size) {
        return Object.keys(renderData.rect.size).includes(size);
    },

    /**
     * get rect size
     * @param {String} size 
     * @returns 
     */
    getRectSize: function(size) {        
        if (this.isRectSizeExist(size)) {
            return {
                width: renderData.rect.size[size].width,
                height: renderData.rect.size[size].height,
            }
        } else {
            return {
                width: renderData.rect.size[this.rectDefaultSize].width,
                height: renderData.rect.size[this.rectDefaultSize].height,
            }
        }
    },

    /**
     * get title start position
     * @returns
     */
     getTitleStartPosition: function() {
        return renderData.title.start_position;
    }
}