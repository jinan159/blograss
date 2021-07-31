const { describe, test, expect } = require("@jest/globals");
const renderData = require('../src/json/render-data.json');
const blograssApiData = require('../src/json/blograss-api.json');

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


    // == isRectSizeExist ==================================
    test('isRectSizeExist large size is exist', () => {
        expect(grassUtils.isRectSizeExist('large')).toBeTruthy();
    });
    test('isRectSizeExist jwkim size is not exist', () => {
        expect(grassUtils.isRectSizeExist('jwkim')).toBeFalsy();
    });


    // == getRectSize ==================================
    test('getRectSize return small size', () => {
        expect(grassUtils.getRectSize('small')).toEqual(renderData.rect.size.small);
    });
    test('getRectSize return default large size', () => {
        expect(grassUtils.getRectSize('jwkim')).toEqual(renderData.rect.size.large);
    });


    // == getTitleStartPosition ==================================
    test('getTitleStartPosition return title start position', () => {
        expect(grassUtils.getTitleStartPosition()).toEqual(renderData.title.start_position);
    });


    // == getGrassHeightByDay ==================================
    test('getGrassHeightByDay return height of sunday grass', () => {
        expect(grassUtils.getGrassHeightByDay(new Date('2021-08-01'))).toEqual(0);
    });
});

describe('blograssApiUtils test', () => {
    
    const { blograssApiUtils } = require("../src/utils");


    // == isBlogTypeExist ==================================
    test('isBlogTypeExist blog type tistory is exist', () => {
        expect(blograssApiUtils.isBlogTypeExist('tistory')).toBeTruthy();
    });
    test('isRectSizeExist blog type jwkim  not exist', () => {
        expect(blograssApiUtils.isBlogTypeExist('jwkim')).toBeFalsy();
    });
	
	// == getBlogs ==================================
    test('getBlogs return array of blogs', () => {
        expect(blograssApiUtils.getBlogs()).toEqual(Object.keys(blograssApiData.blog));
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

describe('dateUtils test', () => {
    
    const { dateUtils } = require("../src/utils");

    // == addDays ==================================
    test('addDays add 2 days', () => {
        expect(dateUtils.addDays(new Date('2021-01-01'), 2)).toEqual(new Date('2021-01-03'));
    });
    test('addDays minus 2 days', () => {
        expect(dateUtils.addDays(new Date('2021-01-01'), -2)).toEqual(new Date('2020-12-30'));
    });
    test('addDays add 0 days', () => {
        expect(dateUtils.addDays(new Date('2021-01-01'), 0)).toEqual(new Date('2021-01-01'));
    });
});