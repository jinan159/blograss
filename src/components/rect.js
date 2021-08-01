const { grassUtils, themeUtils } = require("../utils/util");

/**
 * 
 * @param {String} rectSize 
 * @param {String} backgroundColor 
 * @returns 
 */
const render = (size = 'large', color='dark') => {

    const {
        width,
        height
    } = grassUtils.getRectSize(size);

    const fillColor = themeUtils.getRectThemeColor(color);

    return `<rect width="${width}" height="${height}" rx="5" ry="5" style="fill: #${fillColor};"/>`;
}

module.exports = { render };