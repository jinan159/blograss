const { grassUtils, themeUtils } = require("./utils");

/**
 * 
 * @param {String} theme 
 * @param {Number} level 
 * @param {Number} x 
 * @param {Number} y 
 * @returns 
 */
const render = (theme, text) => {

    const {
        x,
        y
    } = grassUtils.getTitleStartPosition();
    const fillColor = themeUtils.getTextThemeColor(theme);

    return `<text x="${x}" y="${y}" fill="#${fillColor}" font-size="18" font-family="Tahoma">${text}</text>`;
}

module.exports = { render };