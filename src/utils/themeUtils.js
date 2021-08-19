const renderData = require('../json/render-data.json');
const commonUtils = require('./commonUtils');

module.exports = {

    grassDefaultTheme: "green",
    textDefaultTheme: "green",
    rectDefaultTheme: "dark",

    /**
     * check theme is exist
     * @param {String} grassTheme 
     * @returns 
     */
    isGrassThemeExist: function(grassTheme) {
        return Object.keys(renderData.grass.theme).includes(grassTheme);
    },

    /**
    * get theme grass level colors
    * @param {String} grassTheme
    * @param {Boolean} dark_mode
    * @returns 
    */
     getGrassThemeColors: function(grassTheme, dark_mode = true) {
        
        if (!this.isGrassThemeExist(grassTheme)) {
            grassTheme = this.grassDefaultTheme;   
        }

        dark_mode = Boolean.convertToBoolean(dark_mode); // validate and convert 'dark_mode' value to Boolean

        // clone level_colors data to protect original data
        var level_colors = commonUtils.cloneObject(renderData.grass.theme[grassTheme].level_colors);
        level_colors['0'] = level_colors['0'][dark_mode];

        return level_colors;
    },

    /**
     * get grass theme level color
     * @param {String} theme
     * @param {Boolean} dark_mode 
     * @param {Number} level
     * @returns 
     */
    getGrassThemeColor: function (grassTheme, dark_mode, level=0) {
        if (level < 0) level = 0;
        else if (level > 4) level = 4;

        if (!this.isGrassThemeExist(grassTheme)) {
            grassTheme = this.grassDefaultTheme;   
        }

        var level_colors = renderData.grass.theme[grassTheme].level_colors;
        var level_color = null;

        if (level == 0) {
            dark_mode = Boolean.convertToBoolean(dark_mode); // validate and convert 'dark_mode' value to Boolean
            level_color = level_colors[level][dark_mode];
        } else {
            level_color = level_colors[level]
        }

        return level_color;
    },

    /**
     * get rect theme
     * @param {Boolean} dark_mode 
     * @returns 
     */
    getRectThemeColor: function (dark_mode) {
        
        dark_mode = Boolean.convertToBoolean(dark_mode);// validate and convert 'dark_mode' value to Boolean

        return renderData.rect.theme.background_color[dark_mode];
    },

    /**
     * get text theme
     * @param {String} theme 
     * @returns 
     */
     getTextThemeColor: function (textTheme) {
        if (!this.isGrassThemeExist(textTheme)) {
            textTheme = this.textDefaultTheme;    
        }

        return renderData.grass.theme[textTheme].text_color;
    },
}