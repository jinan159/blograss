const { describe, test, expect } = require("@jest/globals");

describe('util.js test', () => {
    
    const { 
        themeUtils, 
        grassUtils, 
        blogApiUtils, 
        dateUtils } = require("../../src/utils/util");


    // == utils test ==================================
    test('themeUtils is defined', () => {
        expect(themeUtils).toBeDefined();
    });
    test('grassUtils is defined', () => {
        expect(grassUtils).toBeDefined();
    });
    test('blogApiUtils is defined', () => {
        expect(blogApiUtils).toBeDefined();
    });
    test('dateUtils is defined', () => {
        expect(dateUtils).toBeDefined();
    });
});

