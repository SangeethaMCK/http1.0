const net = require('net');

//callback is exec, if connection is success
const client = net.createConnection({ port: 8080 }, () => {
    console.log('Connected to server');
    client.write("GET /users/123 HTTP/1.0\r\n"+
        "Host: localhost:8080\r\n"+
        "Content-Type: application/json\r\n"+
        "Connection: close\r\n\r\n"
    );

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
