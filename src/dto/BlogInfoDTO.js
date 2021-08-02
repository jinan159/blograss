class BlogInfoDTO {

    /**
     * 
     * @param {String} date YYYY-MM-DD
     * @param {Number} count 
     * @param {Number} level 
     */
    constructor(date, count, level) {
        this.date = date;
        this.count = count;
        this.level = level;
    }
}

module.exports = BlogInfoDTO;