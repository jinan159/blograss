const { themeUtils, grassUtils, blogApiUtils, dateUtils } = require('../src/utils/util');
const Joi = require('joi');
const blograss = require('../src/components/blograss');

module.exports = async (req, res) => {

    // -- Request Query Validation ------------------------------------------------------------------------------------------------------------

	// joi api validation schema
    const schema = Joi.object({
        blog_type : Joi.string().required(),
        blog_name: Joi.string().required(),
		
        background_color: Joi.string(),
        text_color: Joi.string(),
        grass_color: Joi.string(),
		grass_size: Joi.string(),

        year: Joi.number().min(1970).max(new Date().getFullYear()),
        term: Joi.valid('today', 'year')
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
        background_color = themeUtils.rectDefaultTheme, // background theme
        text_color = themeUtils.grassDefaultTheme,           // title text color
        grass_color = themeUtils.textDefaultTheme,           // grass color
        grass_size = grassUtils.grassDefaultSize,            // grass rect size // TODO rename this parameter for rect

        year = new Date().getFullYear(),
    } = req.query;

    // -- Set Current Theme ------------------------------------------------------------------------------------------------------------
    
    const renderData = {
        blog_type,
        blog_name,

        rectColor: background_color,
        rectSize: grass_size,
        textColor: text_color,
        grassColor: grass_color,

        year
    }

	// -- Get Blog data ------------------------------------------------------------------------------------------------------------

    // TODO develop model layer(select blog data) ;
    const blogData = require('../src/json/mock-data.json'); // mock data
    
    blogData.sort((a,b) => new Date(a.date) - new Date(b.date)); // order by date asc
    
    // -- Data preprocessing ------------------------------------------------------------------------------------------------------------
    
    var postCountList = []; // list of post_count. 
    blogData.map((mock)=> {
        if (!postCountList.includes(mock.post_count)){
            postCountList.push(mock.post_count);
        }
    });

    postCountList.sort((a, b) => a - b); // ascending sort

    // set standard(min, max value of levels)
    var level = 4;
    var itemsPerGroup = (postCountList.length <= 4) ? 1 : Number.parseInt(postCountList.length / 4) + 1;
    var levelData = [];
    
    while(postCountList.length > 0) {
        var tempArr = postCountList.splice(0, itemsPerGroup);
    
        levelData.push({
            level: level,
            max: Math.max(...tempArr),
            min: Math.min(...tempArr)
        });
    
        level--;
    }

    // -- Render Blograss ------------------------------------------------------------------------------------------------------------
    var blograssSvg = blograss.render(renderData, blogData, levelData);

    res.setHeader("Content-Type", "image/svg+xml");
    res.send(blograssSvg);
};