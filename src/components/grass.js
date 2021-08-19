const { grassUtils, themeUtils } = require("../utils/util");

/**
 * 
 * @param {String} theme 
 * @param {Boolean} dark_mode
 * @param {Number} level 
 * @param {Number} x 
 * @param {Number} y 
 * @returns 
 */
const render = (theme, dark_mode, level, x, y) => {

    const {
        width,
        height
    } = grassUtils.getGrassSize();
    const fillColor = themeUtils.getGrassThemeColor(theme, dark_mode, level)

    return `<rect width="${width}" height="${height}" x="${x}" y="${y}" rx="2" ry="2" style="fill: #${fillColor};"/>`;
}

module.exports = { render };