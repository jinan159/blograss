const renderData = require('./json/render-data.json');
const blograssApiData = require('./json/blograss-api.json');

const themeUtils = {

    grassThemeDefault: "green",
    containerThemeDefault: "dark",

    /**
     * check theme is exist
     * @param {String} theme 
     * @returns 
     */
    isGrassThemeExist: function(theme) {
        return Object.keys(renderData.grass.theme).includes(theme);
    },

    /**
    * get theme grass level colors
    * @param {String} theme 
    * @returns 
    */
     getGrassThemeColors: function(theme) {
        if (this.isGrassThemeExist(theme)) {
            return renderData.grass.theme[theme].level_colors;
        } else {
            return renderData.grass.theme[this.grassThemeDefault].level_colors;
        }
    },

    /**
     * get grass theme level color
     * @param {String} theme 
     * @param {Number} level
     * @returns 
     */
    getGrassThemeColor: function (theme, level=0) {
        if (level < 0) level = 0
        if (level > 4) level = 4

        if (this.isGrassThemeExist(theme)) {
            return renderData.grass.theme[theme].level_colors[level];
        } else {
            return renderData.grass.theme[this.grassThemeDefault].level_colors[level];
        }        
    },

    /**
     * check theme is exist
     * @param {String} theme 
     * @returns 
     */
    isContainerThemeExist: function(theme) {
        return Object.keys(renderData.container.theme).includes(theme);
    },

    /**
     * get container theme
     * @param {String} theme 
     * @returns 
     */
    getContainerThemeColor: function (theme) {
        if (this.isContainerThemeExist(theme)) {
            return renderData.container.theme[theme].color;
        } else {
            return renderData.container.theme[this.containerThemeDefault].color;
        }
    },

    /**
     * get text theme
     * @param {String} theme 
     * @returns 
     */
     getTextThemeColor: function (theme) {
        if (this.isGrassThemeExist(theme)) {
            return renderData.grass.theme[theme].text_color;
        } else {
            return renderData.grass.theme[this.grassThemeDefault].text_color;
        }
    },
}

const grassUtils = {

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
     * check size is exist
     * @param {String} size
     * @returns 
     */
     isContainerSizeExist: function(size) {
        return Object.keys(renderData.container.size).includes(size);
    },

    /**
     * get container size
     * @param {String} size 
     * @returns 
     */
    getContainerSize: function(size) {        
        if (this.isContainerSizeExist(size)) {
            return {
                width: renderData.container.size[size].width,
                height: renderData.container.size[size].height,
            }
        } else {
            return {
                width: renderData.container.size["large"].width,
                height: renderData.container.size["large"].height,
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

const blograssApiUtils = {

    blogTypeDefault: "tistory",

    /**
     * check blog_type is exist
     * @param {String} blog_type 
     */
    isBlogTypeExist: function(blog_type) {
        return Object.keys(blograssApiData.blog).includes(blog_type);
    },

    /**
    * get all blog info
    * @returns 
    */
    getBlogInfos: function() {
        return blograssApiData.blog;
    },

    /**
    * get blog into
    * @param {String} blog_type
    * @returns 
    */
    getBlogInfo: function(blog_type) {
        if (this.isBlogTypeExist(blog_type)) {
            return blograssApiData.blog[blog_type];
        } else {
            return blograssApiData.blog[this.blogTypeDefault]; // tistory
        }
    },
}

module.exports = { themeUtils, grassUtils, blograssApiUtils }