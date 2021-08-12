const { describe, test, expect } = require("@jest/globals");
const renderData = require('../../src/json/render-data.json');

describe('themeUtils test', () => {
    
    const { themeUtils } = require("../../src/utils/util");

    // == isGrassThemeExist ==================================
    test('isGrassThemeExist green theme is exist', () => {
        expect(themeUtils.isGrassThemeExist('green')).toBeTruthy();
    });
    test('isGrassThemeExist jwkim theme is not exist', () => {
        expect(themeUtils.isGrassThemeExist('jwkim')).toBeFalsy();
    });

    
    // == getGrassThemeColors ==================================
    test('getGrassThemeColors return white theme', () => {
        var level_colors = {
            "0": "bfbfbf",
            "1": "4d4d4d",
            "2": "808080",
            "3": "bfbfbf",
            "4": "ffffff"
        }
        expect(themeUtils.getGrassThemeColors('white', false)).toEqual(level_colors);
    });
    test('getGrassThemeColors return default green theme', () => {
        var level_colors = {
            "0": "2e333a",
            "1": "20432b",
            "2": "2f6b38",
            "3": "52a44e",
            "4": "6bd064"
        }
        expect(themeUtils.getGrassThemeColors('jwkim', true)).toEqual(level_colors);
    });


    // == getGrassThemeColor ==================================
    test('getThemeLevelColor return white grass 2 theme', () => {
        expect(themeUtils.getGrassThemeColor('white', true, 2)).toEqual("808080");
    });
    test('getThemeLevelColor return default green grass 2 theme', () => {
        expect(themeUtils.getGrassThemeColor('jwkim', true, 2)).toEqual("2f6b38");
    });
    test('getThemeLevelColor return grass 0 when value < 1', () => {
        expect(themeUtils.getGrassThemeColor('green', false, -1)).toEqual("bfbfbf");
    });
    test('getThemeLevelColor return grass 4 when value > 4', () => {
        expect(themeUtils.getGrassThemeColor('green', false, 5)).toEqual("6bd064");
    });

    // == getRectThemeColor ==================================
    test('getRectThemeColor return darkMode=true color', () => {
        expect(themeUtils.getRectThemeColor(true)).toEqual("23272d");
    });
    test('getRectThemeColor return darkMode=false color', () => {
        expect(themeUtils.getRectThemeColor(false)).toEqual("e6e6e6");
    });
    test('getRectThemeColor return default(darkMode=false) color(when darkMode value is not valid) ', () => {
        expect(themeUtils.getRectThemeColor('hello world')).toEqual("e6e6e6");
    });


    // == getTextThemeColor ==================================
    test('getTextThemeColor return brown theme', () => {
        expect(themeUtils.getTextThemeColor('brown')).toEqual(renderData.grass.theme.brown.text_color);
    });
    test('getTextThemeColor return dark default theme', () => {
        expect(themeUtils.getTextThemeColor('jwkim')).toEqual(renderData.grass.theme.green.text_color);
    });
});