const { describe, expect } = require("@jest/globals");

describe('container.js test', ()=>{
    const container = require('../src/container');
    
    test('1=1',()=>{
        expect(1).toEqual(1);
    })
});