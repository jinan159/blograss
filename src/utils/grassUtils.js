const renderData = require('../json/render-data.json');
const BlogInfoDTO = require('../dto/BlogInfoDTO');

module.exports = {

    rectDefaultSize: "large",

    /**
     * get grass size
     * @returns 
     */
    getGrassSize: function() {
        return renderData.grass.size;
    },

    /**
     * get grass margin
     * @returns 
     */
     getGrassMargin: function() {
        return renderData.grass.margin;
    },

    /**
     * get grass start position
     * @returns
     */
     getGrassStartPosition: function() {
        return renderData.grass.start_position;
    },

    /**
     * get grass height by day
     * ex) sunday: top of week
     * @param {Date} value 
     */
     getGrassHeightByDay: function(date) {
        if (date.getDate == undefined) throw new Error(`'date' type is required`);
    
        // console.log(new Intl.DateTimeFormat('ko-KR', { weekday: 'long'}).format(date));
        var day = date.getDay();
    
        var size = this.getGrassSize();
        var margin = this.getGrassMargin();
        
        return (size.height + margin) * day;
    },

    /**
     * check size is exist
     * @param {String} size
     * @returns 
     */
     isRectSizeExist: function(size) {
        return Object.keys(renderData.rect.size).includes(size);
    },

    /**
     * get rect size
     * @param {String} size 
     * @returns 
     */
    getRectSize: function(size) {        
        if (this.isRectSizeExist(size)) {
            return {
                width: renderData.rect.size[size].width,
                height: renderData.rect.size[size].height,
            }
        } else {
            return {
                width: renderData.rect.size[this.rectDefaultSize].width,
                height: renderData.rect.size[this.rectDefaultSize].height,
            }
        }
    },

    /**
     * get title start position
     * @returns
     */
     getTitleStartPosition: function() {
        return renderData.title.start_position;
    },

    /**
     * make level standard
     * @param {Number[]} postCountArray 
     */
    getLevelStandard: function(postCountArray) {
        if (postCountArray instanceof Array && postCountArray.length > 0) {

            // distinct array
            postCountArray = Array.from(new Set(postCountArray)); 

            // decending sort
            postCountArray.sort((a, b) => b - a);

            // make level standard(min, max value of each levels)
            var level = 4;
            var itemCountPerGroup = (postCountArray.length <= 4) ? 1 : Number.parseInt(postCountArray.length / 4) + 1;
            var levelStandards = [];
            
            while(postCountArray.length > 0) {
                var tempArr = postCountArray.splice(0, itemCountPerGroup);
            
                levelStandards.push({
                    level: level,
                    max: Math.max(...tempArr),
                    min: Math.min(...tempArr)
                });
            
                level--;
            }

            return levelStandards;
        }
    },

    /**
     * 
     * @param {BlogInfoDTO[]} blogInfoArray 
     * @returns BlogInfoDTO[]
     */
    getLeveledBlogInfo: function(blogInfoArray) {
        
        if (blogInfoArray instanceof Array && blogInfoArray.length > 0) {

            // make post_count list for level standard
            var postCountArray = []; // list of post count. 
            blogInfoArray.map(blogInfo => postCountArray.push(blogInfo.count)) // push all post count        

            // get level standard
            var levelStandards = this.getLevelStandard(postCountArray);

            // make leveled bloginfo
            var blogInfoDTOArray = [];
            blogInfoArray.sort((a,b) => new Date(a.date) - new Date(b.date)); // order by date asc
            blogInfoArray.map( blogInfo => {
                
                var matched_level = levelStandards.filter( levelData => levelData.min <= blogInfo.count && levelData.max >= blogInfo.count ); 
                
                matched_level = (matched_level == undefined || matched_level.length < 1) ? 0 : matched_level[0].level;
                blogInfo.level = matched_level
                blogInfoDTOArray.push(blogInfo);
            });

            
        }

        return blogInfoDTOArray ?? [];
    }
}