const { grassUtils, themeUtils, dateUtils } = require("../utils/util");
const component = {
    rect: require('./rect'),
    title: require('./title'),
    container: require('./container'),
    grass: require('./grass')
}

/**
 * 
 * @param {Array} blogData 
 * @param {Array} levelData 
 * @returns 
 */
const render = (renderData, blogData, levelData) => {
    var blograssScript = "";
    
    var {x, y} = grassUtils.getGrassStartPosition();
    
    var startDate = new Date(`${renderData.year}-01-01`);
    var endDate = new Date(`${renderData.year}-12-31`);
    var yearDate = 365;

    var blogDataToRender = blogData.filter(data => new Date(data.date) > startDate && new Date(data.date) < endDate );
    
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

    blograssScript += component.rect.render(renderData.rectSize, renderData.rectColor);;
    blograssScript += component.title.render(renderData.blog_type, renderData.blog_name, renderData.textColor);;
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

    return `<svg xmlns="http://www.w3.org/2000/svg" width="850" height="180" version="1.1">${blograssScript}</svg>`;
}

module.exports = { render };