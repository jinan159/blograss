const axios = require('axios');
const blogApiUtils = require('../utils/blogApiUtils');
const BlogInfoDTO = require('../dto/BlogInfoDTO');
const dateUtils = require('../utils/dateUtils');

// TODO test case
// TODO improve latency [vercel location:us ~ tistory api location:kr]
// TODO improve unefficient api call logging
class TistoryModel {

    constructor() {
        this.blogApiInfo = blogApiUtils.getBlogInfo('tistory');
    }

    /**
     * get blog data
     * @param {String} blogName 
     * @param {Number} year YYYY 
     * @returns BlogInfoDTO[]
     */
    async getBlogData(blogName, year) {
        
        if (!dateUtils.isYearValid(year)) {
            throw new Error('Invalid Parameter');
        }

        let totalCount = await this.getTotalCount(blogName);
        let blogInfoDTOArray = [];
        
        // success to fetchBlogData
        if (totalCount > 0) {
            blogInfoDTOArray = await this.findUntilTargetYearIsEnd(blogName, year, totalCount);
        }

        return blogInfoDTOArray ?? [];
    }

    /**
     * fetch api until find end of target year
     * @param {String} blogName
     * @param {Number} year
     * @param {Number} totalCount
     */
    async findUntilTargetYearIsEnd(blogName, year, totalCount) {

        let startPage = 1;
        let countPerPage = 30;
        let posts = [];

        // fetch to requested year
        for (var i=0; i<(totalCount/countPerPage) + 1; i++) {
            let result = await this.fetchBlogData(blogName, startPage + i, countPerPage);
            
            if (!!result && !!result.item && !!result.item.posts) {
                posts.push(...result.item.posts);
                
                var lastPost = posts[posts.length-1];
                var lastPostDate = lastPost.date.split(' ')[0];

                if (lastPostDate.split('-')[0] == String(year - 1)) break;
            }
        }

        var blogInfoDTOArray = this.convertPostsToBlogInfoDataArray(posts, year);

        return blogInfoDTOArray ?? [];
    }

    /**
     * get totalCount of blog
     * @param {String} blogName 
     */
    async getTotalCount(blogName) {
        var blogData = await this.fetchBlogData(blogName, 1, 1);
        var totalCount = 0;
        
        // get total count
        if (!!blogData && !!blogData.item) totalCount = Number.parseInt(blogData.item.totalCount);

        return totalCount;
    }

    /**
     * fetch blog data
     * @param {String} blogName 
     * @param {Number} page 
     * @param {Number} count 
     * @returns 
     */
    async fetchBlogData(blogName, page, count) {

        var blogData = null;
        
        // fetch blog data
        try {

            var result = await axios({
                method: 'get',
                url: this.blogApiInfo.api_urls.post_list,
                params: {
                    access_token: process.env.TISTORY_ACCESS_TOKEN,
                    output: 'json',
                    blogName,
                    page,
                    count
                }
            });

            // if result is success
            if (!!result && !!result.data && result.data.tistory) {
                blogData = result.data.tistory;
            } 

            return blogData;

        } catch(err) {
            throw err;
        }
    }

    /**
     * Convert post Data to BlogInfoData array
     * @param {any} posts 
     * @param {Number} year
     */
    convertPostsToBlogInfoDataArray(posts, year) {

        var postCountArray = {};
        var blogInfoDTOArray = [];

        if (posts.length > 0) {

            // get post count per day
            posts.map( post => {
                var date = post.date.split(' ')[0];

                if (date.split('-')[0] == String(year)) {
                    if (Object.keys(postCountArray).includes(date)) {
                        postCountArray[date] += 1;
                    } else {
                        postCountArray[date] = 1;
                    }
                }
            });

            for (var key in postCountArray) {
                
                blogInfoDTOArray.push(new BlogInfoDTO(key, postCountArray[key], 0));
            }
        }

        return blogInfoDTOArray;
    }
}

module.exports = TistoryModel;