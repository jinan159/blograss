const { grassUtils, themeUtils } = require("./utils");

/**
 * 
 * @param {String} blog_type
 * @param {String} blog_name
 * @param {String} theme
 * @returns 
 */
const render = (blog_type, blog_name, theme) => {

    const {
        x,
        y
    } = grassUtils.getTitleStartPosition();
    var text = `${blog_name}'s ${blog_type} Blograss`;
    const fillColor = themeUtils.getTextThemeColor(theme);

    return `<text x="${x}" y="${y}" fill="#${fillColor}" font-size="18" font-family="Tahoma">${text}</text>`;
}

module.exports = { render };