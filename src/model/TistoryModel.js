const axios = require('axios');
const BlogInfoDTO = require('../dto/BlogInfoDTO');
const dateUtils = require('../utils/dateUtils');

// TODO test case
class TistoryModel {

    constructor() {}

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

        let blogInfoDTOArray = [];
        let posts = await this.getTistoryPostList(blogName, year);

        // success to fetchBlogData
        if (posts.length > 0) {
            blogInfoDTOArray = this.convertPostsToBlogInfoDataArray(posts, year);            
        }

        return blogInfoDTOArray ?? [];
    }

    /**
     * fetch blog data
     * @param {String} blogName 
     * @param {Number} year
     * @returns 
     */
     async getTistoryPostList(blogName, year) {

        let posts = [];
        
        // fetch blog data
        try {
            let result = await axios({
                method: 'get',
                url: process.env.TISTORY_POST_LIST,
                params: {
                    blogName,
                    year
                }
            });

            // if result is success
            if (!!result && !!result.data) {
                posts = result.data;
            }

        } catch(err) {
            posts = [];
        }

        return posts;
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