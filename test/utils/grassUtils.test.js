const { describe, test, expect } = require("@jest/globals");
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
});