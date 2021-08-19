const axios = require('axios');
const blogApiUtils = require('../utils/blogApiUtils');
const BlogInfoDTO = require('../dto/BlogInfoDTO');

// TODO test case
// TODO improve latency [vercel location:us ~ tistory api location:kr]
// TODO improve unefficient api call logig
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
        if (!Number.isInteger(year) || year < 1970 || year > new Date().getFullYear()) throw new Error('Invalid Parameter');

        var page = 1;
        var count = 30;
        var posts = [];
        var result = await this.fetchBlogData(blogName, 1, 1);
        var totalCount = 0;
        
        // get total count
        if (!!result && !!result.item) totalCount = Number.parseInt(result.item.totalCount);

        // success to fetchBlogData
        if (totalCount > 0) {

            // fetch to requested year
            for (var i=0; i<(totalCount/count) + 1; i++) {
                result = await this.fetchBlogData(blogName, page + i, count);
                
                if (!!result && !!result.item && !!result.item.posts) {
                    posts.push(...result.item.posts);
                    
                    var lastPost = posts[posts.length-1];
                    var lastPostDate = lastPost.date.split(' ')[0];

                    if (lastPostDate.split('-')[0] == String(year - 1)) break;
                }
            }

            if (posts.length > 0) {

                var postCountArray = {};
                var blogInfoDTOArray = [];

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

        }

        return blogInfoDTOArray ?? [];
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
}

module.exports = TistoryModel;