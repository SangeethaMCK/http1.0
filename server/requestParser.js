function reqParser(req) {
    const reqArr = req.split("\r\n");

    // Parse request line
    const reqLine = reqArr[0];
    const reqLineArr = reqLine.split(" ");
    const method = reqLineArr[0];
    const path = reqLineArr[1];
    const version = reqLineArr[2];
    console.log("Method:", method, "Path:", path, "Version:", version);

    // Find empty line
    const emptyLineIndex = reqArr.indexOf("");

    // Parse headers
    const headersArr = reqArr.slice(1, emptyLineIndex);
    const headers = {};
    headersArr.forEach(header => {
        const [key, ...values] = header.split(":");
        headers[key.trim()] = values.join(":").trim();
        console.log(`${key}: ${values.join(":").trim()}`);
    });

    // Parse body
    const body = reqArr.slice(emptyLineIndex + 1).join("\r\n");
    let parsedBody = null;
    if (body) {
        try {
            parsedBody = JSON.parse(body);
        } catch (err) {
            console.log("Body parsing failed:", err);
        }
    }
    console.log("Body:", parsedBody);

    return { method, path, version, headers, body: parsedBody };
}

const req = "POST /api/data HTTP/1.1\r\n"+
"Host: example.com\r\n"+
"User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36\r\n"+
"Content-Type: application/json\r\n"+
"Accept: application/json\r\n"+
"Authorization: Bearer your-access-token\r\n"+
"Content-Length: 45\r\n"+
"Connection: close\r\n"+
"\r\n"+
"{\"name\": \"Sangeetha\", \"age\": 25, \"email\": \"sangeetha@example.com\"}\r\n";

// Test the reqParser function
reqParser(req);

module.exports = reqParser;