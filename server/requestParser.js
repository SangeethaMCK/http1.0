function reqParser(req) {
    const reqArr = req.split("\r\n");

    // Parse request line
    const reqLine = reqArr[0];
    const reqLineArr = reqLine.split(" ");
    const method = reqLineArr[0];
    const path = reqLineArr[1];
    const version = reqLineArr[2];

    // Find the empty line (separates headers from the body)
    const emptyLineIndex = reqArr.indexOf("");

    // Parse headers
    const headersArr = reqArr.slice(1, emptyLineIndex);
    const headers = {};
    headersArr.forEach(header => {
        const [key, ...values] = header.split(":");
        headers[key.trim()] = values.join(":").trim();
    });

    // Parse body
    const body = reqArr.slice(emptyLineIndex + 1).join("\r\n");

    return { method, path, version, headers, body };
}

module.exports = reqParser;
