const { pathParser } = require('./pathParser');

// need to add routes
function reqParser(req, res, reqData, routes) {
    console.log("reqParser", reqData);
    const [reqHeaders, reqBody] = reqData.split("\r\n\r\n");

    const [reqline, ...reqHeader] = reqHeaders.split("\r\n");

    const [method, path, version] = reqline.split(" ");

    // Parse the path and extract params and query using pathParser
     req = pathParser(req, res, method, path, routes);

    // Parse headers
    const headers = {};
    reqHeader.forEach(header => {
        const [key, ...values] = header.split(":");
        headers[key.trim()] = values.join(':').trim();
    });

    req.method = method;
    req.version = version;
    req.headers = headers;
    req.body = reqBody;
    req.path = path;

    return req;
}

module.exports = { reqParser };
