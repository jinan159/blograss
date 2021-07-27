const { describe, expect } = require("@jest/globals");
const { grassUtils, themeUtils } = require("../src/utils");

describe('grass.js test', ()=>{
    const grass = require('../src/grass');
    
    // == render ==================================
    test('grass render test',()=>{
        const theme = "green";
        const level = 3;
        const x = 10;
        const y = 12;

        // test data
        const {
            width,
            height
        } = grassUtils.getGrassSize();
        const fillColor = themeUtils.getGrassThemeColor('green', level);

        expect(grass.render(theme, level, x, y)).toEqual(`<rect width="${width}" height="${height}" x="${x}" y="${y}" rx="2" ry="2" style="fill: #${fillColor};"/>`);
    })
});