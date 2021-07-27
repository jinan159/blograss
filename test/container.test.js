const { describe, expect } = require("@jest/globals");
const renderData = require('../src/json/render-data.json');
const { themeUtils, grassUtils } = require("../src/utils");

describe('container.js test', ()=>{
    
    const container = require('../src/container');
    
    // == render ==================================
    test('container small size, dark theme render test',()=>{
        // test data
        const {
            width,
            height
        } = grassUtils.getContainerSize("small");
        const fillColor = themeUtils.getContainerThemeColor('dark');

        expect(container.render('small', 'dark')).toEqual(`<rect width="${width}" height="${height}" rx="5" ry="5" style="fill: #${fillColor};"/>`);
    });
    test('container large, dark default render test',()=>{
        // test data
        const {
            width,
            height
        } = grassUtils.getContainerSize("large");
        const fillColor = themeUtils.getContainerThemeColor('dark');

        expect(container.render()).toEqual(`<rect width="${width}" height="${height}" rx="5" ry="5" style="fill: #${fillColor};"/>`);
    })
});