const { describe, test, expect } = require("@jest/globals");
const renderData = require('../src/config/render-data.json');
const blograssApiData = require('../src/config/blograss-api.json');

describe('themeUtils test', () => {
    
    const { themeUtils } = require("../src/utils");

    // == isGrassThemeExist ==================================
    test('isGrassThemeExist green theme is exist', () => {
        expect(themeUtils.isGrassThemeExist('green')).toBeTruthy();
    });
    test('isGrassThemeExist jwkim theme is not exist', () => {
        expect(themeUtils.isGrassThemeExist('jwkim')).toBeFalsy();
    });

    
    // == getGrassThemeColors ==================================
    test('getGrassThemeColors return gray theme', () => {
        expect(themeUtils.getGrassThemeColors('gray')).toEqual(renderData.grass.theme.gray.level_colors);
    });
    test('getGrassThemeColors return default green theme', () => {
        expect(themeUtils.getGrassThemeColors('jwkim')).toEqual(renderData.grass.theme.green.level_colors);
    });


    // == getGrassThemeColor ==================================
    test('getThemeLevelColor return gray grass 2 theme', () => {
        expect(themeUtils.getGrassThemeColor('gray', 2)).toEqual(renderData.grass.theme.gray.level_colors[2]);
    });
    test('getThemeLevelColor return default green grass 2 theme', () => {
        expect(themeUtils.getGrassThemeColor('jwkim', 2)).toEqual(renderData.grass.theme.green.level_colors[2]);
    });
    test('getThemeLevelColor return grass 0 when value < 1', () => {
        expect(themeUtils.getGrassThemeColor('green', -1)).toEqual(renderData.grass.theme.gray.level_colors[0]);
    });
    test('getThemeLevelColor return grass 4 when value > 4', () => {
        expect(themeUtils.getGrassThemeColor('green', 5)).toEqual(renderData.grass.theme.green.level_colors[4]);
    });


    // == isContainerThemeExist ==================================
    test('isContainerThemeExist dark theme is exist', () => {
        expect(themeUtils.isContainerThemeExist('dark')).toBeTruthy();
    });
    test('isContainerThemeExist jwkim theme is not exist', () => {
        expect(themeUtils.isContainerThemeExist('jwkim')).toBeFalsy();
    });


    // == getContainerThemeColor ==================================
    test('getContainerThemeColor return light theme', () => {
        expect(themeUtils.getContainerThemeColor('light')).toEqual(renderData.container.theme.light.color);
    });
    test('getContainerThemeColor return dark theme', () => {
        expect(themeUtils.getContainerThemeColor('dark')).toEqual(renderData.container.theme["dark"].color);
    });
    test('getContainerThemeColor return default dark theme', () => {
        expect(themeUtils.getContainerThemeColor('jwkim')).toEqual(renderData.container.theme.dark.color);
    });


    // == getTextThemeColor ==================================
    test('getTextThemeColor return brown theme', () => {
        expect(themeUtils.getTextThemeColor('brown')).toEqual(renderData.grass.theme.brown.text_color);
    });
    test('getTextThemeColor return dark default theme', () => {
        expect(themeUtils.getTextThemeColor('jwkim')).toEqual(renderData.grass.theme.green.text_color);
    });
});

describe('grassUtils test', () => {
    
    const { grassUtils } = require("../src/utils");


    // == getGrassSize ==================================
    test('getGrassSize return grass size', () => {
        expect(grassUtils.getGrassSize()).toEqual(renderData.grass.size);
    });


    // == getGrassMargin ==================================
    test('getGrassMargin return grass margin', () => {
        expect(grassUtils.getGrassMargin()).toEqual(renderData.grass.margin);
    });


    // == getGrassStartPosition ==================================
    test('getGrassStartPosition return grass start position', () => {
        expect(grassUtils.getGrassStartPosition()).toEqual(renderData.grass.start_position);
    });


    // == isContainerSizeExist ==================================
    test('isContainerSizeExist large size is exist', () => {
        expect(grassUtils.isContainerSizeExist('large')).toBeTruthy();
    });
    test('isContainerSizeExist jwkim size is not exist', () => {
        expect(grassUtils.isContainerSizeExist('jwkim')).toBeFalsy();
    });


    // == getContainerSize ==================================
    test('getContainerSize return small size', () => {
        expect(grassUtils.getContainerSize('small')).toEqual(renderData.container.size.small);
    });
    test('getContainerSize return default large size', () => {
        expect(grassUtils.getContainerSize('jwkim')).toEqual(renderData.container.size.large);
    });


    // == getTitleStartPosition ==================================
    test('getTitleStartPosition return title start position', () => {
        expect(grassUtils.getTitleStartPosition()).toEqual(renderData.title.start_position);
    });
});

describe('blograssApiUtils test', () => {
    
    const { blograssApiUtils } = require("../src/utils");


    // == isBlogTypeExist ==================================
    test('isBlogTypeExist blog type tistory is exist', () => {
        expect(blograssApiUtils.isBlogTypeExist('tistory')).toBeTruthy();
    });
    test('isContainerSizeExist blog type jwkim  not exist', () => {
        expect(blograssApiUtils.isBlogTypeExist('jwkim')).toBeFalsy();
    });


    // == getBlogInfos ==================================
    test('getBlogInfos return all blog informations', () => {
        expect(blograssApiUtils.getBlogInfos()).toEqual(blograssApiData.blog);
    });


    // == getBlogInfo ==================================
    test('getBlogInfo return velog blog information', () => {
        expect(blograssApiUtils.getBlogInfo('velog')).toEqual(blograssApiData.blog.velog);
    });
    test('getBlogInfo return default tistory blog information', () => {
        expect(blograssApiUtils.getBlogInfo('jwkim')).toEqual(blograssApiData.blog.tistory);
    });
});