const net = require('net');

const server = net.createServer((c) => {
    
    c.on('data', (data) => {
        console.log('Received data:', data.toString());
        c.write('Echo server received your message');
    });

    c.on('end', () => {
        console.log('Connection closed');
    });
});

server.listen(8080, () => {
    console.log('Server listening on port 8080');
});
