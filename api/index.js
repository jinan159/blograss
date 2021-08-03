const { themeUtils, grassUtils, blogApiUtils, dateUtils } = require('../src/utils/util');
const Joi = require('joi');
const blograss = require('../src/blograss');
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

    // TODO develop model layer(select blog data) - should be return BlogInfoDTO[] type
    const blogPostData = require('../src/json/mock-data.json'); // mock data
    
    // push blogInfo to DTO array
    var blogInfoArray = [];
    blogPostData.map(blogPost => {
        blogInfoArray.push(new BlogInfoDTO(blogPost.date, blogPost.post_count, 0));
    });

    // get leveled blog info
    var blogInfoDTOArray = grassUtils.getLeveledBlogInfo(blogInfoArray);

    // -- Render Blograss ------------------------------------------------------------------------------------------------------------
    var blograssSvg = blograss.render(renderInfoDTO, blogInfoDTOArray);

    res.setHeader("Content-Type", "image/svg+xml");
    res.send(blograssSvg);
};