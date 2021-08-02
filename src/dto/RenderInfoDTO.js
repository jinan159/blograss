const grassUtils = require("../utils/grassUtils");

class RenderingDTO {

    /**
     * Initialize blograss rendering data dto
     * @param {String} blog_type 
     * @param {String} blog_name 
     * @param {String} size 
     * @param {String} background_color 
     * @param {String} text_color 
     * @param {String} grass_color 
     * @param {Number} year
     */
    constructor(blog_type, blog_name, size, background_color, text_color, grass_color, year) {
        this.blog_type = blog_type;
        this.blog_name = blog_name;
        this.background_color = background_color;
        this.text_color = text_color;
        this.grass_color = grass_color;
        this.size = size;
        this.year = year;
    }
}

module.exports = RenderingDTO;