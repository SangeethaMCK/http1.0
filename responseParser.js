function resParser(res) {
    const resArr = res.split("\r\n");

    //parse response line
    const resLine = resArr[0];
    const resLineArr = resLine.split(" ");
    
    //version status
    const version = resLineArr[0];
    const status = resLineArr[1];
    const phrase = resLineArr[2];
    console.log("version",version,"status",status,"phrase",phrase);

    const emptyLineIndex = resArr.indexOf("");

    //parse headers
    const headers = resArr.slice(1).slice(0,emptyLineIndex-1);
    headers.forEach(header => {
        const headerArr = header.split(":",2);
        const key = headerArr[0];
        const value = header.slice(headerArr[0].length+1);
        console.log(`${key}: ${value}`);
    });

    //parse body
    const body = resArr.slice(emptyLineIndex+1);
    console.log("body", JSON.parse(body));
}

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
    "\r\n"+
    "{\"name\": \"Sangeetha\", \"age\": 25, \"email\": \"sangeetha@example.com\"}";

    resParser(res);

