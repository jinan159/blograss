const renderData = require('../json/render-data.json');

module.exports = {

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
    * @param {String} themes
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