const { grassUtils, themeUtils } = require("../utils/util");

/**
 * 
 * @param {String} theme 
 * @param {String} isDarkMode
 * @param {Number} level 
 * @param {Number} x 
 * @param {Number} y 
 * @returns 
 */
const render = (theme, isDarkMode, level, x, y) => {

    const {
        width,
        height
    } = grassUtils.getGrassSize();
    const fillColor = themeUtils.getGrassThemeColor(theme, isDarkMode, level)

    return `<rect width="${width}" height="${height}" x="${x}" y="${y}" rx="2" ry="2" style="fill: #${fillColor};"/>`;
}

module.exports = { render };