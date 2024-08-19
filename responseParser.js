 function resParser(res) {
    const resArr = res.split("\r\n");

    // Parse the status line
    const statusLine = resArr[0];
    const resLineArr = statusLine.split(" ");
    
    // Version and status
    const version = resLineArr[0];
    const status = resLineArr[1];
    const phrase = resLineArr.slice(2).join(" ");  // Join the rest as the status phrase
    console.log("version", version, "status", status, "phrase", phrase);

    const emptyLineIndex = resArr.indexOf("");

    // Parse headers
    const headersArr = resArr.slice(1, emptyLineIndex);
    const headers = {};
    headersArr.forEach(header => {
        const [key, ...values] = header.split(":");
        headers[key.trim()] = values.join(":").trim();
        console.log(`${key}: ${values.join(":").trim()}`);
    });

    // Parse body
    const body = resArr.slice(emptyLineIndex + 1).join("\r\n");
    let parsedBody = null;
    if (body) {
        try {
            parsedBody = JSON.parse(body);
            console.log("body", parsedBody);
        } catch (err) {
            console.log("Body parsing failed:", err);
        }
    }

    return { version, status, phrase, headers, body: parsedBody };
}

// Test example
const res = "HTTP/1.1 200 OK\r\n" +
    "Date: Fri, 01 Jan 2019 00:00:00 GMT\r\n" +
    "Server: Apache/2.4.29 (Ubuntu)\r\n" +
    "Last-Modified: Fri, 01 Jan 2019 00:00:00 GMT\r\n" +
    "ETag: \"1-52b6a8a0:0\"\r\n" +
    "Accept-Ranges: bytes\r\n" +
    "Content-Length: 0\r\n" +
    "Vary: Accept-Encoding\r\n" +
    "Content-Type: text/html; charset=UTF-8\r\n" +
    "Connection: close\r\n" +
    "\r\n" +
    "{\"name\": \"Sangeetha\", \"age\": 25, \"email\": \"sangeetha@example.com\"}\r\n";

resParser(res);

module.exports = resParser;
