const fs = require('fs');
const path = require('path');

const methods = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
    PATCH: "PATCH"
};

const methodHandler = (req, res) => {
    const { method, path: reqPath } = req;

    switch (method) {
        case methods.GET:
            const filePath = path.join(__dirname, reqPath==="/" ? "index.html" : reqPath );
            fs.readFile(filePath, (err, data) => {
                if (err) {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'File not found' }));
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(data);
                }
            });
            break;

        // case methods.POST:
            
        //     res.writeHead(200, { 'Content-Type': 'application/json' });
        //     res.end(JSON.stringify({ message: 'POST request received', data: req.body }));
        //     break;

        

        // default:
        //     res.writeHead(405, { 'Content-Type': 'application/json' });
        //     res.end(JSON.stringify({ error: 'Method Not Allowed' }));
        //     break;
    }
};

module.exports = { methods, methodHandler };
