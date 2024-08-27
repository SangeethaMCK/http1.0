const net = require('net');
const reqParser = require('./requestParser');
const { methodHandler } = require('./methods');
const statusMessage = require('./statusCode'); 

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

