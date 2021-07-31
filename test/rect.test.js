const { describe, expect } = require("@jest/globals");
const renderData = require('../src/json/render-data.json');
const { themeUtils, grassUtils } = require("../src/utils");

describe('rect.js test', ()=>{
    
    const rect = require('../src/rect');
    
    // == render ==================================
    test('rect small size, dark theme render test',()=>{
        // test data
        const {
            width,
            height
        } = grassUtils.getRectSize("small");
        const fillColor = themeUtils.getRectThemeColor('dark');

        expect(rect.render('small', 'dark')).toEqual(`<rect width="${width}" height="${height}" rx="5" ry="5" style="fill: #${fillColor};"/>`);
    });
    test('rect large, dark default render test',()=>{
        // test data
        const {
            width,
            height
        } = grassUtils.getRectSize("large");
        const fillColor = themeUtils.getRectThemeColor('dark');

        expect(rect.render()).toEqual(`<rect width="${width}" height="${height}" rx="5" ry="5" style="fill: #${fillColor};"/>`);
    })
});