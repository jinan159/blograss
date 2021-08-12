const { describe, expect } = require("@jest/globals");
const renderData = require('../../src/json/render-data.json');
const { themeUtils, grassUtils } = require("../../src/utils/util");

describe('rect.js test', ()=>{
    
    const rect = require('../../src/components/rect');
    
    // == render ==================================
    test('rect small size, darkMode=true render test',()=>{
        // test data
        const {
            width,
            height
        } = grassUtils.getRectSize("small");
        const fillColor = themeUtils.getRectThemeColor(true);

        expect(rect.render('small', true)).toEqual(`<rect width="${width}" height="${height}" rx="5" ry="5" style="fill: #${fillColor};"/>`);
    });
    test('rect large, darkMode=false render test',()=>{
        // test data
        var size = 'large';
        var isDarkMode = false;
        const {
            width,
            height
        } = grassUtils.getRectSize(size);
        const fillColor = themeUtils.getRectThemeColor(isDarkMode);

        expect(rect.render(size, isDarkMode)).toEqual(`<rect width="${width}" height="${height}" rx="5" ry="5" style="fill: #${fillColor};"/>`);
    })
});