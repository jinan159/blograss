const { themeUtils, grassUtils, blogApiUtils, dateUtils } = require('../src/utils/util');
const Joi = require('joi');
const component = {
    rect: require('../src/components/rect'),
    title: require('../src/components/title'),
    container: require('../src/components/container'),
    grass: require('../src/components/grass')
}


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
        term = "today"
    } = req.query;

    // -- Set Current Theme ------------------------------------------------------------------------------------------------------------
    
    const renderData = {
        rectColor: background_color,
        rectSize: grass_size,
        textColor: text_color,
        grassColor: grass_color,
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
	
    // TODO develop render layer
    var blograssScript = "";
    
    var {x, y} = grassUtils.getGrassStartPosition();
    var div = 1;

    var yyyy = String(year);
    var mm = "01";
    var startDate = new Date(`${yyyy}-01-01`);
    var endDate = null;

    switch (renderData.rectSize) {
        case "large": div = 1; endDate = new Date(`${yyyy}-12-31`); break;
        case "middle": div = 2;  endDate = new Date(`${yyyy}-06-30`); break;
        case "small": div = 4; endDate = new Date(`${yyyy}-03-31`); break;
        default: div = 1; endDate = new Date(`${yyyy}-12-31`); break;
    }
    
    var yearDate = Number.parseInt(365/div);
    var blogDataToRender = blogData.filter(data => new Date(data.date) > startDate && new Date(data.date) < endDate );

    // console.log(blogDataToRender);
    
    var blograssRect = component.rect.render(renderData.rectSize, renderData.rectColor);
    var blograssTitle = component.title.render(blog_type, blog_name, renderData.textColor);
    var grassScript = "";
    var grassContainer = "";

    for (var i=0; i<yearDate; i++) {
        // set grass initial data
        var date = dateUtils.addDays(startDate, i);
        var height = grassUtils.getGrassHeightByDay(date);
        var level = 0;

        // get level
        var dataToRender = blogDataToRender.find(data => new Date(data.date).getTime() == date.getTime())
        
        if (dataToRender != undefined) {
            var post_count = dataToRender.post_count;
            for(var j in levelData) {
                if (post_count >= levelData[j].min && post_count <= levelData[j].max) level = levelData[j].level;
            }
        }

        // add grass of week
        grassScript += component.grass.render(renderData.grassColor, level, 0, height);

        // if 'saturday' or 'end of data' then, finish week
        if (date.getDay() == 6 || i == yearDate - 1) {
            grassContainer += component.container.render(x, y, grassScript);
            grassScript = "";

            var width = grassUtils.getGrassSize().width;
            var margin = grassUtils.getGrassMargin();
            x += width + margin;
        }
    }    

    blograssScript += blograssRect;
    blograssScript += blograssTitle;
    blograssScript += grassContainer;
    blograssScript += 
    `
        <g>
            <!-- Days  dis=(y:26) -->
            <text 
                x="17" y="88" 
                fill="#${themeUtils.getTextThemeColor(renderData.textColor)}" font-size="12" font-family="Tahoma">
                Mon
            </text>
            <text 
                x="17" y="114" 
                fill="#${themeUtils.getTextThemeColor(renderData.textColor)}" font-size="12" font-family="Tahoma">
                Wed
            </text>
            <text 
                x="17" y="140" 
                fill="#${themeUtils.getTextThemeColor(renderData.textColor)}" font-size="12" font-family="Tahoma">
                Fri
            </text>
        </g>
    `;

    var blograssSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="850" height="180" version="1.1">${blograssScript}</svg>`;

    res.setHeader("Content-Type", "image/svg+xml");
    res.send(blograssSvg);

    // res.send(`
    // <svg xmlns="http://www.w3.org/2000/svg" width="850" height="180" version="1.1">
    //     <rect width="850" height="180" rx="5" ry="5" style="fill: #ffffff;"/>
    //     <rect width="850" height="180" rx="5" ry="5" style="fill: #23272d;"/>
    //     <text 
    //         x="15" y="30" 
    //         fill="#${renderData.textColor}" font-size="18" font-family="Tahoma">
    //         ${blog_name}'s ${blog_type} Grass
    //     </text>
    //     <g id="grassRect">
    //         ${grassScript}
    //     </g>
    //     <g>
    //         <!-- Days  dis=(y:26) -->
    //         <text 
    //             x="17" y="88" 
    //             fill="#${renderData.textColor}" font-size="12" font-family="Tahoma">
    //             Mon
    //         </text>
    //         <text 
    //             x="17" y="114" 
    //             fill="#${renderData.textColor}" font-size="12" font-family="Tahoma">
    //             Wed
    //         </text>
    //         <text 
    //             x="17" y="140" 
    //             fill="#${renderData.textColor}" font-size="12" font-family="Tahoma">
    //             Fri
    //         </text>
    //     </g>
    //     <g>
    //         <!-- Months week=(x:13) -->
    //         <text 
    //             x="46" y="55"
    //             fill="#${renderData.textColor}" font-size="12" font-family="Tahoma">
    //             Jan
    //         </text>
    //         <text 
    //             x="111" y="55"
    //             fill="#${renderData.textColor}" font-size="12" font-family="Tahoma">
    //             Feb
    //         </text>
    //         <text 
    //             x="176" y="55"
    //             fill="#${renderData.textColor}" font-size="12" font-family="Tahoma">
    //             Mar
    //         </text>
    //         <text 
    //             x="241" y="55"
    //             fill="#${renderData.textColor}" font-size="12" font-family="Tahoma">
    //             Apr
    //         </text>
    //         <text 
    //             x="306" y="55"
    //             fill="#${renderData.textColor}" font-size="12" font-family="Tahoma">
    //             May
    //         </text>
    //         <text 
    //             x="371" y="55"
    //             fill="#${renderData.textColor}" font-size="12" font-family="Tahoma">
    //             Jun
    //         </text>
    //         <text 
    //             x="436" y="55"
    //             fill="#${renderData.textColor}" font-size="12" font-family="Tahoma">
    //             Jul
    //         </text>
    //         <text 
    //             x="501" y="55"
    //             fill="#${renderData.textColor}" font-size="12" font-family="Tahoma">
    //             Aug
    //         </text>
    //         <text 
    //             x="566" y="55"
    //             fill="#${renderData.textColor}" font-size="12" font-family="Tahoma">
    //             Sep
    //         </text>
    //         <text 
    //             x="631" y="55"
    //             fill="#${renderData.textColor}" font-size="12" font-family="Tahoma">
    //             Oct
    //         </text>
    //         <text 
    //             x="696" y="55"
    //             fill="#${renderData.textColor}" font-size="12" font-family="Tahoma">
    //             Nov
    //         </text>
    //         <text 
    //             x="761" y="55"
    //             fill="#${renderData.textColor}" font-size="12" font-family="Tahoma">
    //             Dec
    //         </text>
    //     </g>        
    // </svg>
    // `);

};