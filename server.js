const net = require('net');
const reqParser = require('./requestParser'); 
const resParser = require('./responseParser');

const port = 8080;

const server = net.createServer(socket => {

    socket.on('data', data => {
        const req = reqParser(data.toString());
        // console.log(req);

        // Craft a simple HTTP response
        const response = [
            'HTTP/1.0 200 OK',
            'Content-Type: application/json',
            'Content-Length: 19',
            '',
            '{"status":"success"}'
        ].join("\r\n");

        socket.write(response);
        socket.end();
    });

    socket.on('error', err => {
        console.error('Socket error:', err);
    });
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
