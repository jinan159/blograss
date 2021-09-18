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
        expect(dateUtils.getLastDayOfMonth(2021, 6)).toBe(30);
    });
    test('getLastDayOfMonth get lastday of leap year 2', () => {
        expect(dateUtils.getLastDayOfMonth(2020, 2)).toBe(29);
    });
    test('getLastDayOfMonth lastday of 14', () => {
        expect(dateUtils.getLastDayOfMonth(2021, 14)).toBe(31);
    });
    test('getLastDayOfMonth lastday of -1', () => {
        expect(dateUtils.getLastDayOfMonth(2021, -1)).toBe(31);
    });


    // == isLeapYear ==================================
    test('isLeapYear return true for 2020(number)', () => {
        expect(dateUtils.isLeapYear(2020)).toBeTruthy();
    });
    test('isLeapYear return true for 2021(number)', () => {
        expect(dateUtils.isLeapYear(2021)).toBeFalsy();
    });
    test('isLeapYear return true for 2020(string)', () => {
        expect(dateUtils.isLeapYear('2020')).toBeTruthy();
    });


    // == isYearValid ==================================
    test('isYearValid return true for 2020(number)', () => {
        expect(dateUtils.isYearValid(2020)).toBeTruthy();
    });
    test('isYearValid return true for 2020(string)', () => {
        expect(dateUtils.isYearValid('2020')).toBeTruthy();
    });
    test('isYearValid return false for 202o(string)', () => {
        expect(dateUtils.isYearValid('202o')).toBeFalsy();
    });
});