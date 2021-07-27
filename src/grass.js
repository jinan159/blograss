const { grassUtils, themeUtils } = require("./utils");

/**
 * 
 * @param {String} theme 
 * @param {Number} level 
 * @param {Number} x 
 * @param {Number} y 
 * @returns 
 */
const render = (theme, level, x, y) => {

    const {
        width,
        height
    } = grassUtils.getGrassSize();
    const fillColor = themeUtils.getGrassThemeColor(theme, level)

    return `<rect width="${width}" height="${height}" x="${x}" y="${y}" rx="2" ry="2" style="fill: #${fillColor};"/>`;
}

module.exports = { render };