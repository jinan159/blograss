const { describe, expect, test, afterAll } = require("@jest/globals");
const index = require('../api/index');
const http = require('http');

describe('index.js test', ()=>{

    // create mock request
    const requestMock = new http.IncomingMessage();

    // create mock response
    const responseMock = new http.OutgoingMessage();
    responseMock.send = (msg)=>{
        // make 'RESPONSE_DATA' property and set data here for api testing
        responseMock.RESPONSE_DATA = msg;
    }

    test('index.js api call without required parameter only', async ()=>{

        // set request
        requestMock.method = 'GET';
        requestMock.query = { }

        await index(requestMock, responseMock);

        expect(responseMock.RESPONSE_DATA).toBeDefined();
        expect(responseMock.getHeader("Content-Type")).toEqual("text/html");
    });

    test('index.js api call with required parameter only', async ()=>{

        // set request
        requestMock.method = 'GET';
        requestMock.query = {
            blog_type: "tistory",
            blog_name: "jwkim96",
        }

        await index(requestMock, responseMock);

        expect(responseMock.RESPONSE_DATA).toBeDefined();
        expect(responseMock.getHeader("Content-Type")).toEqual("image/svg+xml");
    });

    test('index.js api call with \'background_color\' parameter', async ()=>{

        // set request
        requestMock.method = 'GET';
        requestMock.query = {
            blog_type: "tistory",
            blog_name: "jwkim96",
            dark_mode: true,
        }

        await index(requestMock, responseMock);

        expect(responseMock.RESPONSE_DATA).toBeDefined();
        expect(responseMock.getHeader("Content-Type")).toEqual("image/svg+xml");
    });

    test('index.js api call with \'text_color\' parameter', async ()=>{

        // set request
        requestMock.method = 'GET';
        requestMock.query = {
            blog_type: "tistory",
            blog_name: "jwkim96",
            text_color: "green",
        }

        await index(requestMock, responseMock);

        expect(responseMock.RESPONSE_DATA).toBeDefined();
        expect(responseMock.getHeader("Content-Type")).toEqual("image/svg+xml");
    });

    test('index.js api call with \'grass_color\' parameter', async ()=>{

        // set request
        requestMock.method = 'GET';
        requestMock.query = {
            blog_type: "tistory",
            blog_name: "jwkim96",
            grass_color: "green",
        }

        await index(requestMock, responseMock);

        expect(responseMock.RESPONSE_DATA).toBeDefined();
        expect(responseMock.getHeader("Content-Type")).toEqual("image/svg+xml");
    });

    // test('index.js api call with \'size\' parameter', async ()=>{

    //     // set request
    //     requestMock.method = 'GET';
    //     requestMock.query = {
    //         blog_type: "tistory",
    //         blog_name: "jwkim96",
    //         size: "large",
    //     }

    //     await index(requestMock, responseMock);

    //     expect(responseMock.RESPONSE_DATA).toBeDefined();
    //     expect(responseMock.getHeader("Content-Type")).toEqual("image/svg+xml");
    // });


    test('index.js api call with all parameter', async ()=>{

        // set request
        requestMock.method = 'GET';
        requestMock.query = {
            blog_type: "tistory",
            blog_name: "jwkim96",
            // size: "large",
            text_color: "green",
            grass_color: "green",
            dark_mode: true
        }

        await index(requestMock, responseMock);

        expect(responseMock.RESPONSE_DATA).toBeDefined();
        expect(responseMock.getHeader("Content-Type")).toEqual("image/svg+xml");
    });
	
	
});