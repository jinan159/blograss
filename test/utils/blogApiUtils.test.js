const { describe, test, expect } = require("@jest/globals");
const blograssApiData = require('../../src/json/blograss-api.json');

describe('blogApiUtils test', () => {
    
    const { blogApiUtils } = require("../../src/utils/util");


    // == isBlogTypeExist ==================================
    test('isBlogTypeExist blog type tistory is exist', () => {
        expect(blogApiUtils.isBlogTypeExist('tistory')).toBeTruthy();
    });
    test('isRectSizeExist blog type jwkim  not exist', () => {
        expect(blogApiUtils.isBlogTypeExist('jwkim')).toBeFalsy();
    });
	
	// == getBlogs ==================================
    test('getBlogs return array of blogs', () => {
        expect(blogApiUtils.getBlogs()).toEqual(Object.keys(blograssApiData.blog));
    });
	

    // == getBlogInfos ==================================
    test('getBlogInfos return all blog informations', () => {
        expect(blogApiUtils.getBlogInfos()).toEqual(blograssApiData.blog);
    });


    // == getBlogInfo ==================================
    test('getBlogInfo return velog blog information', () => {
        expect(blogApiUtils.getBlogInfo('velog')).toEqual(blograssApiData.blog.velog);
    });
    test('getBlogInfo return default tistory blog information', () => {
        expect(blogApiUtils.getBlogInfo('jwkim')).toEqual(blograssApiData.blog.tistory);
    });
});

