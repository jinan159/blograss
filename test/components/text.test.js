const { describe, expect } = require("@jest/globals");
const { grassUtils, themeUtils } = require("../../src/utils/util");

describe('text.js test', ()=>{
    const text = require('../../src/components/text');
    
    // == render ==================================
    test('text render test',()=>{
        const theme = 'green';
        const titleText = 'jwkim96\'s tistory Blograss';
        const fontSize = 18;

        // test data
        const {
            x,
            y
        } = grassUtils.getTitleStartPosition();
        const fillColor = themeUtils.getTextThemeColor(theme);
        expect(text.render(x, y, titleText, fontSize, theme)).toEqual(`<text x="${x}" y="${y}" fill="#${fillColor}" font-size="${fontSize}" font-family="Tahoma">${titleText}</text>`);
    })
});