const { describe, test, expect } = require("@jest/globals");
const BlogInfoDTO = require("../../src/dto/BlogInfoDTO");
const renderData = require('../../src/json/render-data.json');

describe('grassUtils test', () => {
    
    const { grassUtils } = require("../../src/utils/util");

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


    // == getLevelStandard ==================================
    test('getLevelStandard put [1 ... ] arrays and return grass level standard', () => {
        var postCountArray = [1, 1, 1, 1 ,1 ,1];
        var result = [{ level: 4, max: 1, min: 1 }]
        var a = grassUtils.getLevelStandard(postCountArray)
        console.log(a);
        expect(grassUtils.getLevelStandard(postCountArray)).toEqual(result);
    });
    test('getLevelStandard put [1,2,3,4,5,6,7,8,9,10] arrays and return grass level standard', () => {
        var postCountArray = [1,2,3,4,5,6,7,8,9,10];
        var result = [{ level: 4, max: 10, min: 8 },
                      { level: 3, max: 7, min: 5 },
                      { level: 2, max: 4, min: 2 }, 
                      { level: 1, max: 1, min: 1 }]
        expect(grassUtils.getLevelStandard(postCountArray)).toEqual(result);
    });


    // == getLeveledBlogInfo ==================================
    test('getLeveledBlogInfo put data and return leveled blog info', () => {
        var blogInfoArray = [];
        blogInfoArray.push(new BlogInfoDTO('2021-07-01', 1, 0));
        blogInfoArray.push(new BlogInfoDTO('2021-07-02', 2, 0));
        blogInfoArray.push(new BlogInfoDTO('2021-07-03', 3, 0));
        blogInfoArray.push(new BlogInfoDTO('2021-07-04', 4, 0));
        blogInfoArray.push(new BlogInfoDTO('2021-07-05', 5, 0));
        blogInfoArray.push(new BlogInfoDTO('2021-07-06', 6, 0));
        blogInfoArray.push(new BlogInfoDTO('2021-07-07', 7, 0));
        blogInfoArray.push(new BlogInfoDTO('2021-07-08', 8, 0));
        blogInfoArray.push(new BlogInfoDTO('2021-07-09', 9, 0));
        blogInfoArray.push(new BlogInfoDTO('2021-07-10', 10, 0));

        var result = [];
        result.push(new BlogInfoDTO('2021-07-01', 1, 1));
        result.push(new BlogInfoDTO('2021-07-02', 2, 2));
        result.push(new BlogInfoDTO('2021-07-03', 3, 2));
        result.push(new BlogInfoDTO('2021-07-04', 4, 2));
        result.push(new BlogInfoDTO('2021-07-05', 5, 3));
        result.push(new BlogInfoDTO('2021-07-06', 6, 3));
        result.push(new BlogInfoDTO('2021-07-07', 7, 3));
        result.push(new BlogInfoDTO('2021-07-08', 8, 4));
        result.push(new BlogInfoDTO('2021-07-09', 9, 4));
        result.push(new BlogInfoDTO('2021-07-10', 10, 4));
        
        expect(grassUtils.getLeveledBlogInfo(blogInfoArray)).toEqual(result);
    });

});