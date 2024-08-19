function reqParser(req) {
    const reqArr = req.split("\r\n");

    //parse request line
    const reqLine = reqArr[0];

    const reqLineArr = reqLine.split(" ");
    //method path version
    const method = reqLineArr[0];
    const path = reqLineArr[1];
    const version = reqLineArr[2];
    console.log("method",method,"path",path,"version",version);
 
    //find empty line
    const emptyLineIndex = reqArr.indexOf("");

    //parse headers
    const headers = reqArr.slice(1).slice(0,emptyLineIndex-1);

    headers.forEach(header => {
        const headerArr = header.split(":",2);
        const key = headerArr[0];
        const value = header.slice(headerArr[0].length+1);
        console.log("key",key,"value",value);
    });

    //parse body
    const body = reqArr.slice(emptyLineIndex+1);
    console.log("body", JSON.parse(body));
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
"{\"name\": \"Sangeetha\", \"age\": 25, \"email\": \"sangeetha@example.com\"}"

    



reqParser(req);