const RenderInfoDTO = require("./dto/RenderInfoDTO");
const BlogInfoDTO = require("./dto/BlogInfoDTO");
const { grassUtils, dateUtils } = require("./utils/util");
const component = {
    rect: require('./components/rect'),
    text: require('./components/text'),
    container: require('./components/container'),
    grass: require('./components/grass')
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
    blograssScript += component.rect.render(renderInfoDTO.size, renderInfoDTO.dark_mode);


    // -- title script ------------------------------------------------------------------------------------------------------------
    var titlePosition = grassUtils.getTitleStartPosition();
    var titleText = `${renderInfoDTO.blog_name}'s ${renderInfoDTO.blog_type} blograss - ${renderInfoDTO.year}`;
    
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
    var monthScript = "";
    var prevMonth = -1;

    for (var i=0; i<yearDate; i++) {
        // set grass initial data
        var grassDate = dateUtils.addDays(startDate, i);
        var height = grassUtils.getGrassHeightByDay(grassDate);
        var blogInfo = blogInfoToRender.find(info => new Date(info.date).getTime() == grassDate.getTime())
        var level = (blogInfo == undefined) ? 0 : blogInfo.level;

        // add grass of week
        grassComponent += component.grass.render(renderInfoDTO.grass_color, renderInfoDTO.dark_mode, level, 0, height);

        // if 'saturday' of 'first of month' or 'end of data' then, finish week
        if (grassDate.getDay() == 6 || i == yearDate - 1) {
            grassContainer += component.container.render(x, y, grassComponent);
            grassComponent = "";

            var width = grassUtils.getGrassSize().width;
            var margin = grassUtils.getGrassMargin();
            x += width + margin;
        } 
        // if 'sunday', and different from month of prev week's sunday
        else if (grassDate.getDay() == 0 && prevMonth != grassDate.getMonth()) {
            var monthFormat = new Intl.DateTimeFormat('us-EN', {month: 'short'}).format(grassDate);
            var monthText = `${monthFormat}/${grassDate.getDate()}`;
            monthScript += component.text.render(x, y-10, monthText, 12, renderInfoDTO.text_color);

            prevMonth = grassDate.getMonth();
        }
    }

    blograssScript += grassContainer;

    // TODO font size move to render-data.json
    // -- daysContainer script ------------------------------------------------------------------------------------------------------------
    var daysScript = component.text.render(0, 0, "Mon", 12, renderInfoDTO.text_color)
                    + component.text.render(0, 26, "Wed", 12, renderInfoDTO.text_color)
                    + component.text.render(0, 52, "Fri", 12, renderInfoDTO.text_color);
    var daysContainer = component.container.render(17, 96, daysScript);
    blograssScript += daysContainer;
    blograssScript += monthScript;

    // TODO develop less more
    // -- less more script ------------------------------------------------------------------------------------------------------------

    return `<svg xmlns="http://www.w3.org/2000/svg" width="850" height="180" version="1.1">${blograssScript}</svg>`;
}

module.exports = { render };