const RenderInfoDTO = require("../dto/RenderInfoDTO");
const BlogInfoDTO = require("../dto/BlogInfoDTO");
const { grassUtils, dateUtils } = require("../utils/util");
const component = {
    rect: require('./rect'),
    text: require('./text'),
    container: require('./container'),
    grass: require('./grass')
}

/**
 * 
 * @param {RenderInfoDTO} renderInfoDTO
 * @param {BlogInfoDTO[]} blogInfoDTOArray
 * @returns 
 */
const render = (renderInfoDTO, blogInfoDTOArray) => {

    var blograssScript = "";

    // -- rect script ------------------------------------------------------------------------------------------------------------
    blograssScript += component.rect.render(renderInfoDTO.size, renderInfoDTO.background_color);


    // -- title script ------------------------------------------------------------------------------------------------------------
    var titlePosition = grassUtils.getTitleStartPosition();
    var titleText = `${renderInfoDTO.blog_name}'s ${renderInfoDTO.blog_type} blograss`;
    
    blograssScript += component.text.render(titlePosition.x, titlePosition.y, titleText, 18, renderInfoDTO.text_color);;


    // -- grassContainer script ------------------------------------------------------------------------------------------------------------
    var now = new Date();
    var startDate = new Date(`${renderInfoDTO.year}-01-01`);
    var endDate = new Date(`${renderInfoDTO.year}-12-31`);
    var yearDate = 365;
    
    // if year is this year, set endDate to today
    if ( renderInfoDTO.year == now.getFullYear() ) {
        endDate = now;
        
        var diff = Math.abs(endDate.getTime() - startDate.getTime());
        diff = Math.ceil(diff / (1000 * 3600 * 24));
        yearDate = diff;
    }
    
    // filter date between startDate and endDate
    var blogInfoToRender = blogInfoDTOArray.filter(info => new Date(info.date) > startDate && new Date(info.date) < endDate );
    
    // make grassScript
    var {x, y} = grassUtils.getGrassStartPosition();
    var grassComponent = "";
    var grassContainer = "";

    for (var i=0; i<yearDate; i++) {
        // set grass initial data
        var grassDate = dateUtils.addDays(startDate, i);
        var height = grassUtils.getGrassHeightByDay(grassDate);
        var blogInfo = blogInfoToRender.find(info => new Date(info.date).getTime() == grassDate.getTime())
        var level = (blogInfo == undefined) ? 0 : blogInfo.level;

        // add grass of week
        grassComponent += component.grass.render(renderInfoDTO.grass_color, level, 0, height);

        // if 'saturday' or 'end of data' then, finish week
        if (grassDate.getDay() == 6 || i == yearDate - 1) {
            grassContainer += component.container.render(x, y, grassComponent);
            grassComponent = "";

            var width = grassUtils.getGrassSize().width;
            var margin = grassUtils.getGrassMargin();
            x += width + margin;
        }
    }

    blograssScript += grassContainer;

    // TODO font size move to render-data.json
    // -- daysContainer script ------------------------------------------------------------------------------------------------------------
    var daysScript = component.text.render(0, 0, "Mon", 12, renderInfoDTO.text_color)
                    + component.text.render(0, 26, "Wed", 12, renderInfoDTO.text_color)
                    + component.text.render(0, 52, "Fri", 12, renderInfoDTO.text_color);
    var daysContainer = component.container.render(17, 88, daysScript);
    blograssScript += daysContainer;

    return `<svg xmlns="http://www.w3.org/2000/svg" width="850" height="180" version="1.1">${blograssScript}</svg>`;
}

module.exports = { render };