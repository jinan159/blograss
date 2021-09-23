const { describe, expect } = require("@jest/globals");
const renderData = require('../../src/json/render-data.json');
const { themeUtils, grassUtils } = require("../../src/utils/util");

describe('rect.js test', ()=>{
    
    const rect = require('../../src/components/rect');
    
    // == render ==================================
    test('rect small size, dark_mode=true render test',()=>{
        // test data
        const {
            width,
            height
        } = grassUtils.getRectSize("small");
        const fillColor = themeUtils.getRectThemeColor(true);

        expect(rect.render('small', true)).toEqual(`<rect width="${width}" height="${height}" rx="5" ry="5" style="fill: #${fillColor};"/>`);
    });
    test('rect large, dark_mode=false render test',()=>{
        // test data
        var size = 'large';
        var dark_mode = false;
        const {
            width,
            height
        } = grassUtils.getRectSize(size);
        const fillColor = themeUtils.getRectThemeColor(dark_mode);

        expect(rect.render(size, dark_mode)).toEqual(`<rect width="${width}" height="${height}" rx="5" ry="5" style="fill: #${fillColor};"/>`);
    })
});