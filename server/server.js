const net = require('net');
const reqParser = require('./requestParser');
const { methodHandler } = require('./methods');

const server = net.createServer((connection) => {
    console.log('Client connected');

    connection.on('data', (data) => {
        const req = reqParser(data.toString());
        console.log('Parsed Request:', req);


        const res = {
            writeHead: (statusCode, headers) => {
                connection.write(`HTTP/1.0 ${statusCode} ${statusMessage(statusCode)}\r\n`);
                for (const [key, value] of Object.entries(headers)) {
                    connection.write(`${key}: ${value}\r\n`);
                }
                connection.write("\r\n");
            },
            end: (body) => {
                // console.log('Sending response:', body.toString());
                connection.write(body);
                connection.end(); 
            }
        };

        methodHandler(req, res);
    });

    connection.on('end', () => {
        console.log('Client disconnected');
    });

    connection.on('error', (err) => {
        console.error('Error:', err);
    });
});

server.listen(8080, () => {
    console.log('Server listening on port 8080');
});

function statusMessage(statusCode) {
    const statusMessages = {
        200: "OK",
        404: "Not Found",
        405: "Method Not Allowed"
    };
    return statusMessages[statusCode] || "Unknown Status";
}
