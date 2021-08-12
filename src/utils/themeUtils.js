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
    * @param {Boolean} isDarkMode
    * @returns 
    */
     getGrassThemeColors: function(grassTheme, isDarkMode = true) {
        
        if (!this.isGrassThemeExist(grassTheme)) {
            grassTheme = this.grassDefaultTheme;   
        }

        isDarkMode = Boolean.convertToBoolean(isDarkMode); // validate and convert 'isDarkMode' value to Boolean

        // clone level_colors data to protect original data
        var level_colors = commonUtils.cloneObject(renderData.grass.theme[grassTheme].level_colors);
        level_colors['0'] = level_colors['0'][isDarkMode];

        return level_colors;
    },

    /**
     * get grass theme level color
     * @param {String} theme
     * @param {Boolean} isDarkMode 
     * @param {Number} level
     * @returns 
     */
    getGrassThemeColor: function (grassTheme, isDarkMode, level=0) {
        if (level < 0) level = 0;
        else if (level > 4) level = 4;

        if (!this.isGrassThemeExist(grassTheme)) {
            grassTheme = this.grassDefaultTheme;   
        }

        var level_colors = renderData.grass.theme[grassTheme].level_colors;
        var level_color = null;

        if (level == 0) {
            isDarkMode = Boolean.convertToBoolean(isDarkMode); // validate and convert 'darkMode' value to Boolean
            level_color = level_colors[level][isDarkMode];
        } else {
            level_color = level_colors[level]
        }

        return level_color;
    },

    /**
     * get rect theme
     * @param {Boolean} isDarkMode 
     * @returns 
     */
    getRectThemeColor: function (isDarkMode) {
        
        isDarkMode = Boolean.convertToBoolean(isDarkMode);// validate and convert 'darkMode' value to Boolean

        return renderData.rect.theme.background_color[isDarkMode];
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