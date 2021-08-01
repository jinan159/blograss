const blograssApiData = require('../json/blograss-api.json');

module.exports = {

    blogDefaultType: "tistory",

    /**
     * check blog_type is exist
     * @param {String} blog_type 
     */
    isBlogTypeExist: function(blog_type) {
        return Object.keys(blograssApiData.blog).includes(blog_type);
    },
	
	/**
     * get all blog list
     * @param {String} blog_type 
     */
	getBlogs: function() {
		return Object.keys(blograssApiData.blog);
	},

    /**
    * get all blog info
    * @returns 
    */
    getBlogInfos: function() {
        return blograssApiData.blog;
    },

    /**
    * get blog into
    * @param {String} blog_type
    * @returns 
    */
    getBlogInfo: function(blog_type) {
        if (this.isBlogTypeExist(blog_type)) {
            return blograssApiData.blog[blog_type];
        } else {
            return blograssApiData.blog[this.blogDefaultType]; // tistory
        }
    },
}