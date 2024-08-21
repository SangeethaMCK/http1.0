const net = require('net');

const client = net.createConnection({ port: 8080 }, () => {
    console.log('Connected to server');
    client.write('Hello, Server!');
});

client.on('data', (data) => {
    console.log('Received from server:', data.toString());
    client.end(); // Close the connection after receiving the data
});

client.on('end', () => {
    console.log('Disconnected from server');
});

client.on('error', (err) => {
    console.error('Error:', err);
});
