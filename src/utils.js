const renderData = require('./json/render-data.json');
const blograssApiData = require('./json/blograss-api.json');

const themeUtils = {

    grassDefaultTheme: "green",
    textDefaultTheme: "green",
    rectDefaultTheme: "dark",

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
            return renderData.grass.theme[this.grassDefaultTheme].level_colors;
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
            return renderData.grass.theme[this.grassDefaultTheme].level_colors[level];
        }        
    },

    /**
     * check theme is exist
     * @param {String} theme 
     * @returns 
     */
    isRectThemeExist: function(theme) {
        return Object.keys(renderData.rect.theme).includes(theme);
    },

    /**
     * get rect theme
     * @param {String} theme 
     * @returns 
     */
    getRectThemeColor: function (theme) {
        if (this.isRectThemeExist(theme)) {
            return renderData.rect.theme[theme].color;
        } else {
            return renderData.rect.theme[this.rectDefaultTheme].color;
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
            return renderData.grass.theme[this.grassDefaultTheme].text_color;
        }
    },
}

const grassUtils = {

    grassDefaultSize: "green",

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
                width: renderData.rect.size["large"].width,
                height: renderData.rect.size["large"].height,
            }
        }
    },

    /**
     * get title start position
     * @returns
     */
     getTitleStartPosition: function() {
        return renderData.title.start_position;
    },

    /**
     * 
     * @param {String} value 
     */
    getGrassHeightByDay: function(dateString) {
        var date = new Date(dateString);
    
        // console.log(new Intl.DateTimeFormat('ko-KR', { weekday: 'long'}).format(date));
        var day = date.getDay();
    
        var grassStartPoint = grassUtils.getGrassStartPosition();
        var size = grassUtils.getGrassSize();
        var margin = grassUtils.getGrassMargin();
        
        return String(Number.parseInt(grassStartPoint.y) + (Number.parseInt(size.height) + Number.parseInt(margin)) * day);
    }
}

const blograssApiUtils = {

    blogDefaultType: "tistory",

    /**
     * check blog_type is exist
     * @param {String} blog_type 
     */
    isBlogTypeExist: function(blog_type) {
        return Object.keys(blograssApiData.blog).includes(blog_type);
    },
	
	/**
     * get all blog list
     * @param {String} blog_type 
     */
	getBlogs: function() {
		return Object.keys(blograssApiData.blog);
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
            return blograssApiData.blog[this.blogDefaultType]; // tistory
        }
    },
}

module.exports = { themeUtils, grassUtils, blograssApiUtils }