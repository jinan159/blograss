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
        expect(themeUtils.getGrassThemeColors('white')).toEqual(renderData.grass.theme.white.level_colors);
    });
    test('getGrassThemeColors return default green theme', () => {
        expect(themeUtils.getGrassThemeColors('jwkim')).toEqual(renderData.grass.theme.green.level_colors);
    });


    // == getGrassThemeColor ==================================
    test('getThemeLevelColor return white grass 2 theme', () => {
        expect(themeUtils.getGrassThemeColor('white', 2)).toEqual(renderData.grass.theme.white.level_colors[2]);
    });
    test('getThemeLevelColor return default green grass 2 theme', () => {
        expect(themeUtils.getGrassThemeColor('jwkim', 2)).toEqual(renderData.grass.theme.green.level_colors[2]);
    });
    test('getThemeLevelColor return grass 0 when value < 1', () => {
        expect(themeUtils.getGrassThemeColor('green', -1)).toEqual(renderData.grass.theme.white.level_colors[0]);
    });
    test('getThemeLevelColor return grass 4 when value > 4', () => {
        expect(themeUtils.getGrassThemeColor('green', 5)).toEqual(renderData.grass.theme.green.level_colors[4]);
    });


    // == isRectThemeExist ==================================
    test('isRectThemeExist dark theme is exist', () => {
        expect(themeUtils.isRectThemeExist('dark')).toBeTruthy();
    });
    test('isRectThemeExist jwkim theme is not exist', () => {
        expect(themeUtils.isRectThemeExist('jwkim')).toBeFalsy();
    });


    // == getRectThemeColor ==================================
    test('getRectThemeColor return light theme', () => {
        expect(themeUtils.getRectThemeColor('light')).toEqual(renderData.rect.theme.light.color);
    });
    test('getRectThemeColor return dark theme', () => {
        expect(themeUtils.getRectThemeColor('dark')).toEqual(renderData.rect.theme["dark"].color);
    });
    test('getRectThemeColor return default dark theme', () => {
        expect(themeUtils.getRectThemeColor('jwkim')).toEqual(renderData.rect.theme.dark.color);
    });


    // == getTextThemeColor ==================================
    test('getTextThemeColor return brown theme', () => {
        expect(themeUtils.getTextThemeColor('brown')).toEqual(renderData.grass.theme.brown.text_color);
    });
    test('getTextThemeColor return dark default theme', () => {
        expect(themeUtils.getTextThemeColor('jwkim')).toEqual(renderData.grass.theme.green.text_color);
    });
});