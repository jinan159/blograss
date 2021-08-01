const { grassUtils, themeUtils } = require("../utils/util");

/**
 * get text component
 * @param {Number} x 
 * @param {Number} y 
 * @param {String} text 
 * @param {number} fontSize
 * @param {String} theme 
 * @returns 
 */
const render = (x, y, text, fontSize, theme) => {

    // const {
    //     x,
    //     y
    // } = grassUtils.getTitleStartPosition();
    // var text = `${blog_name}'s ${blog_type} Blograss`;
    const fillColor = themeUtils.getTextThemeColor(theme);

    return `<text x="${x}" y="${y}" fill="#${fillColor}" font-size="${fontSize}" font-family="Tahoma">${text}</text>`;
}

module.exports = { render };