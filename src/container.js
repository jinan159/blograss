const { grassUtils, themeUtils } = require("./utils");

/**
 * 
 * @param {Number} x 
 * @param {Number} y 
 * @param {String} grassScript 
 * @returns 
 */
const render = (x, y, grassScript) => {
    return `<g transform="translate(${x}, ${y})">${grassScript}</g>`;
}

module.exports = { render };