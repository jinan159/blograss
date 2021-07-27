const { request, ClientRequest, IncomingMessage } = require('http');
const TistoryModel = require('../model/TistoryModel');
const { themeUtils, grassUtils, blograssApiUtils } = require('../src/utils');

module.exports = async (req, res) => {

    // -- Request Query ------------------------------------------------------------------------------------------------------------
    const {
        // blog query
        blog_type = "",
        blog_name = "",
        
        // grass query
        theme = themeUtils.getContainerThemeColor('dark'),    // background theme
        text_color = themeUtils.getTextThemeColor('green'),   // title text color 
        grass_color = themeUtils.getGrassThemeColor('green'), // grass color
        grass_size = grassUtils.getContainerSize('large'),    // grass container size
    } = req.query;

    // -- Request Query Validation ------------------------------------------------------------------------------------------------------------
    var isError = false;
    var error_message_array = [];
    var bold_open_tag = `<span style="font-weight: bold;">`;
    var bold_close_tag = `</span>`;
    var red_bold_open_tag = `<span style="color: #ff0000; font-weight: bold;">`;
    var red_bold_close_tag = `</span>`;

    // check blog_type
    if (!blograssApiUtils.isBlogTypeExist(blog_type)) {
        isError = true;
        error_message_array.push(`blog_type=${bold_open_tag}${blog_type}${bold_close_tag} is ${red_bold_open_tag}not${red_bold_close_tag} provided`);
    }

    // check blog_name
    if (!blog_name) {
        isError = true;
        error_message_array.push(`${bold_open_tag}blog_name${bold_close_tag} is required.`);
    }
    
    // response error page(html)
    if (isError && error_message_array) {
        
        var error_message_script = "";
        
        for (var i in error_message_array) {
            error_message_script += `<li>${error_message_array[i]}</li>`;
        }

        res.setHeader("Content-Type", "text/html");
        res.send(`
            <h1>Error</h1>
            <ul>${error_message_script}</ul>
            <p>Please check usage from here : ${bold_open_tag}<a href="https://github.com/jinan159/blograss#usage">https://github.com/jinan159/blograss#usage</a>${bold_close_tag}</p>
            `);
        return;
    }

    // TODO develop model layer(select blog data) ;
    var mockData = require('../src/json/mock-data.json'); // for test
    
    // TODO develop render layer

    // -- Render Blograss ------------------------------------------------------------------------------------------------------------
    var size = 10;
    var x_start = 45;
    var y_start = 65;
    var x = x_start;
    var y = y_start;
    var margin = 3;
    var grassScript = "";

    for (var i=0; i<(7*5*12); i++) {
        grassScript += addGrass(size, x, y, grass_color, (i%6)) + "\n            ";
        y += size + margin;
        if ((i+1) % 7 == 0) {
            x += size + margin;
            y = y_start;
        }
    }

    res.setHeader("Content-Type", "image/svg+xml");

    res.send(`
    <svg xmlns="http://www.w3.org/2000/svg" width="850" height="180" version="1.1">
        <rect width="850" height="180" rx="5" ry="5" style="fill: #ffffff;"/>
        <rect width="850" height="180" rx="5" ry="5" style="fill: #23272d;"/>
        <text 
            x="15" y="30" 
            fill="#60cd6f" font-size="18" font-family="Tahoma">
            jwkim96's Tistory Grass
        </text>
        <g id="grassContainer">
            ${grassScript}
        </g>
        <g>
            <!-- Days  dis=(y:26) -->
            <text 
                x="17" y="88" 
                fill="#60cd6f" font-size="12" font-family="Tahoma">
                Mon
            </text>
            <text 
                x="17" y="114" 
                fill="#60cd6f" font-size="12" font-family="Tahoma">
                Wed
            </text>
            <text 
                x="17" y="140" 
                fill="#60cd6f" font-size="12" font-family="Tahoma">
                Fri
            </text>
        </g>
        <g>
            <!-- Months week=(x:13) -->
            <text 
                x="46" y="55"
                fill="#60cd6f" font-size="12" font-family="Tahoma">
                Jan
            </text>
            <text 
                x="111" y="55"
                fill="#60cd6f" font-size="12" font-family="Tahoma">
                Feb
            </text>
            <text 
                x="176" y="55"
                fill="#60cd6f" font-size="12" font-family="Tahoma">
                Mar
            </text>
            <text 
                x="241" y="55"
                fill="#60cd6f" font-size="12" font-family="Tahoma">
                Apr
            </text>
            <text 
                x="306" y="55"
                fill="#60cd6f" font-size="12" font-family="Tahoma">
                May
            </text>
            <text 
                x="371" y="55"
                fill="#60cd6f" font-size="12" font-family="Tahoma">
                Jun
            </text>
            <text 
                x="436" y="55"
                fill="#60cd6f" font-size="12" font-family="Tahoma">
                Jul
            </text>
            <text 
                x="501" y="55"
                fill="#60cd6f" font-size="12" font-family="Tahoma">
                Aug
            </text>
            <text 
                x="566" y="55"
                fill="#60cd6f" font-size="12" font-family="Tahoma">
                Sep
            </text>
            <text 
                x="631" y="55"
                fill="#60cd6f" font-size="12" font-family="Tahoma">
                Oct
            </text>
            <text 
                x="696" y="55"
                fill="#60cd6f" font-size="12" font-family="Tahoma">
                Nov
            </text>
            <text 
                x="761" y="55"
                fill="#60cd6f" font-size="12" font-family="Tahoma">
                Dec
            </text>
        </g>        
    </svg>
    `);

};

function addGrass(size, x, y, color, grass_level) {
    var rgb = "";

    switch(color) {
        case "brown":
            switch(grass_level) {
                case 1: rgb = "49322c"; break;
                case 2: rgb = "724337"; break;
                case 3: rgb = "9f513c"; break;
                case 4: rgb = "c96245"; break;
                default: rgb = "2e333a"; break;
            }
            break;
        case "gray":
            switch(grass_level) {
                case 1: rgb = "4d4d4d"; break;
                case 2: rgb = "808080"; break;
                case 3: rgb = "bfbfbf"; break;
                case 4: rgb = "ffffff"; break;
                default: rgb = "2e333a"; break;
            }
            break;
        case "green":
            switch(grass_level) {
                case 1: rgb = "20432b"; break;
                case 2: rgb = "2f6b38"; break;
                case 3: rgb = "52a44e"; break;
                case 4: rgb = "6bd064"; break;
                default: rgb = "2e333a"; break;
            }
            break;
        case "orange":
            switch(grass_level) {
                case 1: rgb = "573a0f"; break;
                case 2: rgb = "8a590f"; break;
                case 3: rgb = "c2780a"; break;
                case 4: rgb = "ff9900"; break;
                default: rgb = "2e333a"; break;
            }
            break;
        default: rgb = "rgb(46, 51, 58)"; break;
    }

    return `<rect width="${size}px" height="${size}px" x="${x}" y="${y}" rx="2px" ry="2px" style="fill: #${rgb}"/>`;
}