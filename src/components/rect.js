const { grassUtils, themeUtils } = require("../utils/util");

/**
 * 
 * @param {String} rectSize 
 * @param {Boolean} isDarkMode
 * @returns 
 */
const render = (size = 'large', isDarkMode = true) => {

    const {
        width,
        height
    } = grassUtils.getRectSize(size);

    const fillColor = themeUtils.getRectThemeColor(isDarkMode);

    return `<rect width="${width}" height="${height}" rx="5" ry="5" style="fill: #${fillColor};"/>`;
}

module.exports = { render };