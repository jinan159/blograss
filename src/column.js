const { grassUtils, themeUtils } = require("./utils");

const render = (x, grassScript) => {
    return `<g transform="translate(${x}, 0)">${grassScript}</g>`;
}

module.exports = { render };