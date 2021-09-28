const Joi = require('joi');
const dotenv = require('dotenv');
dotenv.config();
const override = require('../src/utils/override');
override.initialize();
const RenderInfoDTO = require('../src/dto/RenderInfoDTO');
const TistoryModel = require('../src/model/TistoryModel');
const blograss = require('../src/blograss');
const { themeUtils, grassUtils } = require('../src/utils/util');

// TODO add logging(Counting users, Counting API Calls, Error ... )
module.exports = async (req, res) => {
    try {
        res.setHeader('Cache-Control', 's-maxage=86400');
        res.setHeader('Content-Type', 'image/svg+xml');

        // -- Request Query Validation ------------------------------------------------------------------------------------------------------------

        let thisYear = new Date().getFullYear();

        // joi api validation schema
        const schema = Joi.object({
            blog_type : Joi.string().required(),
            blog_name: Joi.string().required(),

            // size: Joi.string(),
            dark_mode: Joi.boolean(),
            text_color: Joi.string(),
            grass_color: Joi.string(),
            year: Joi.number().max(thisYear)
        });
        
        // joi validation
        const requestValidation = schema.validate(req.query);

        // validation error
        if (requestValidation.error) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'text/html');
            res.send(requestValidation.error.details[0].message);
            return;
        }
        
        // -- Get Request parameters ------------------------------------------------------------------------------------------------------------
        
        if (req.query.year == '-1') req.query.year = thisYear-1;
        else if (req.query.year == '-2') req.query.year = thisYear-2;
        else req.query.year = thisYear;

        const {
            // blog info parameters
            blog_type = "",
            blog_name = "",
            
            // grass theme parameters
            size = grassUtils.rectDefaultSize,       // grass rect size
            dark_mode = true,
            background_color = (dark_mode) ? themeUtils.rectDefaultTheme : themeUtils.rectDefaultTheme, // background theme
            text_color = themeUtils.textDefaultTheme,       // title text color
            grass_color = themeUtils.grassDefaultTheme,     // grass color
            year = new Date().getFullYear(),
        } = req.query;

        // -- Set Current Theme ------------------------------------------------------------------------------------------------------------
        let renderInfoDTO = new RenderInfoDTO(blog_type
                                            , blog_name
                                            , size
                                            , background_color
                                            , text_color
                                            , grass_color
                                            , Number.parseInt(year)
                                            , Boolean.convertToBoolean(dark_mode));


        // -- Data preprocessing ------------------------------------------------------------------------------------------------------------
        let blogInfoArray = []
        let blogInfoDTOArray = []
        try {

            let tistoryModel = new TistoryModel();        
            blogInfoArray = await tistoryModel.getBlogData(renderInfoDTO.blog_name, renderInfoDTO.year);
        
            // get leveled blog info
            blogInfoDTOArray = grassUtils.getLeveledBlogInfo(blogInfoArray);

        } catch (err) {
            console.error(err);
        }

        // -- Render Blograss ------------------------------------------------------------------------------------------------------------
        let blograssSvg = blograss.render(renderInfoDTO, blogInfoDTOArray);

        res.statusCode = 200;
        res.send(blograssSvg);
    } catch (error) {
        console.log(error);
    }
};