const { describe, expect } = require("@jest/globals");

describe('column.js test', ()=>{
    const column = require('../src/column');
    
    test('1=1',()=>{
        expect(1).toEqual(1);
    })
});