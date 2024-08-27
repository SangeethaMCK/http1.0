function reqParser(req) {
    const [reqHeaders, reqBody] = req.split("\r\n\r\n");

    const [reqline, ...reqHeader] = reqHeaders.split("\r\n");
    
    const [method, path, version] = reqline.split(" ");

    // Parse headers
    const headers = {};
    reqHeader.forEach(header => {
        const [key, ...values] = header.split(":",2);
        headers[key.trim()] = values[0].trim();
    });

    return { method, path, version, headers, body: reqBody };
}

module.exports = reqParser;
