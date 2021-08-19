const { grassUtils, themeUtils } = require("../utils/util");

/**
 * 
 * @param {String} rectSize 
 * @param {Boolean} dark_mode
 * @returns 
 */
const render = (size = 'large', dark_mode = true) => {

    const {
        width,
        height
    } = grassUtils.getRectSize(size);

    const fillColor = themeUtils.getRectThemeColor(dark_mode);

    return `<rect width="${width}" height="${height}" rx="5" ry="5" style="fill: #${fillColor};"/>`;
}

module.exports = { render };