const { describe, expect } = require("@jest/globals");
const { grassUtils, themeUtils } = require("../../src/utils/util");

describe('title.js test', ()=>{
    const title = require('../../src/components/title');
    
    // == render ==================================
    test('title render test',()=>{
        const theme = 'green';
        const text = 'jwkim96\'s tistory Blograss';

        // test data
        const {
            x,
            y
        } = grassUtils.getTitleStartPosition();
        const fillColor = themeUtils.getTextThemeColor('green');

        expect(title.render("tistory", "jwkim96", text)).toEqual(`<text x="${x}" y="${y}" fill="#${fillColor}" font-size="18" font-family="Tahoma">${text}</text>`);
    })
});