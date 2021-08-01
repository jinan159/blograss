const { describe, test, expect } = require("@jest/globals");

describe('dateUtils test', () => {
    
    const { dateUtils } = require("../../src/utils/util");

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


    // == addMonth ==================================
    test('addMonth add 2 month', () => {
        expect(dateUtils.addMonth(new Date('2021-01-01'), 2)).toEqual(new Date('2021-03-01'));
    });
    test('addMonth minus 2 month', () => {
        expect(dateUtils.addMonth(new Date('2021-01-01'), -2)).toEqual(new Date('2020-11-01'));
    });
    test('addMonth add 0 month', () => {
        expect(dateUtils.addMonth(new Date('2021-01-01'), 0)).toEqual(new Date('2021-01-01'));
    });


    // == getLastDayOfMonth ==================================
    test('getLastDayOfMonth get lastday of 3', () => {
        expect(dateUtils.getLastDayOfMonth(2021, 1)).toEqual(31);
    });
    test('getLastDayOfMonth lastday of 14', () => {
        expect(() => { dateUtils.getLastDayOfMonth(2021, 14) }).toThrow(Error);
    });
    test('getLastDayOfMonth lastday of -1', () => {
        expect(() => { dateUtils.getLastDayOfMonth(2021, -1) }).toThrow(Error);
    });
});