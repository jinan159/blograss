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
});