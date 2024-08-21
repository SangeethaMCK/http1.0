const net = require('net');

const server = net.createServer((connection) => {
    console.log('Client connected');

    connection.on('data', (data) => {
        console.log('Received:', data.toString());
        connection.write(data); // Echo the received data back to the client
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
