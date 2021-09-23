const { describe, test, expect } = require("@jest/globals");

describe('commonUtils test', () => {
    
    const { commonUtils } = require("../../src/utils/util");

    // == cloneObject ==================================
    test('cloneObject clone object', () => {
        var obj = {
            'a': '',
            'b': { '10': 20 },
            'c': [1,2,3,4,5]
        }
        var result = commonUtils.cloneObject(obj);
        expect(result).toEqual(obj);
        expect(result === obj).toBeFalsy();
    });
});