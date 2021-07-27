const { grassUtils, themeUtils } = require("./utils");

/**
 * 
 * @param {String} grass_size 
 * @param {String} theme 
 * @returns 
 */
const render = (grass_size='large', theme='dark') => {

    const {
        width,
        height
    } = grassUtils.getContainerSize(grass_size);

    const fillColor = themeUtils.getContainerThemeColor(theme);

    return `<rect width="${width}" height="${height}" rx="5" ry="5" style="fill: #${fillColor};"/>`;
}

module.exports = { render };