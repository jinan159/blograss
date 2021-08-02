const { themeUtils, grassUtils, blogApiUtils, dateUtils } = require('../src/utils/util');
const Joi = require('joi');
const blograss = require('../src/components/blograss');
const RenderInfoDTO = require('../src/dto/RenderInfoDTO');
const BlogInfoDTO = require('../src/dto/BlogInfoDTO');

module.exports = async (req, res) => {

    // -- Request Query Validation ------------------------------------------------------------------------------------------------------------

	// joi api validation schema
    const schema = Joi.object({
        blog_type : Joi.string().required(),
        blog_name: Joi.string().required(),
		
		size: Joi.string(),
        background_color: Joi.string(),
        text_color: Joi.string(),
        grass_color: Joi.string(),

        year: Joi.number().min(1970).max(new Date().getFullYear())
    });
	
	// joi validation
    const requestValidation = schema.validate(req.query);

    // validation error
    if (requestValidation.error) {
		res.setHeader("Content-Type", "text/html");
		res.send(requestValidation.error.details[0].message);
		return;
	}
	
    // -- Get Request parameters ------------------------------------------------------------------------------------------------------------
    
    const {
        // blog info parameters
        blog_type = "",
        blog_name = "",
        
        // grass theme parameters
        size = grassUtils.rectDefaultSize,       // grass rect size
        background_color = themeUtils.rectDefaultTheme, // background theme
        text_color = themeUtils.textDefaultTheme,       // title text color
        grass_color = themeUtils.grassDefaultTheme,     // grass color

        year = new Date().getFullYear(),
    } = req.query;

    // -- Set Current Theme ------------------------------------------------------------------------------------------------------------
    var renderInfoDTO = new RenderInfoDTO(blog_type
                                        , blog_name
                                        , size
                                        , background_color
                                        , text_color
                                        , grass_color
                                        , year);

    // -- Data preprocessing ------------------------------------------------------------------------------------------------------------

    // TODO develop model layer(select blog data)
    const blogData = require('../src/json/mock-data.json'); // mock data
    
    
    // make post_count list for level standard
    var postCountList = []; // list of post_count. 
    blogData.map(data => postCountList.push(data.post_count)); // get post_count
    postCountList = Array.from(new Set(postCountList)); // distinct array
    postCountList.sort((a, b) => a - b); // ascending sort

    // set level standard(min, max value of each levels)
    var level = 4;
    var itemsPerGroup = (postCountList.length <= 4) ? 1 : Number.parseInt(postCountList.length / 4) + 1;
    var levelStandard = [];
    
    // make level standard
    while(postCountList.length > 0) {
        var tempArr = postCountList.splice(0, itemsPerGroup);
    
        levelStandard.push({
            level: level,
            max: Math.max(...tempArr),
            min: Math.min(...tempArr)
        });
    
        level--;
    }

    // make bloginfo 
    var blogInfoDTOArray = [];
    blogData.sort((a,b) => new Date(a.date) - new Date(b.date)); // order by date asc
    blogData.map( blog => {
        var matched_level = levelStandard.filter( levelData => levelData.min <= blog.post_count && levelData.max >= blog.post_count );
        matched_level = (matched_level == undefined) ? 0 : matched_level[0].level;
        blogInfoDTOArray.push(new BlogInfoDTO(blog.date, blog.post_count, matched_level));
    });

    // -- Render Blograss ------------------------------------------------------------------------------------------------------------
    var blograssSvg = blograss.render(renderInfoDTO, blogInfoDTOArray);

    res.setHeader("Content-Type", "image/svg+xml");
    res.send(blograssSvg);
};