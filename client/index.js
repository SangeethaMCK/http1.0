const net = require('net');

//callback is exec, if connection is success
const client = net.createConnection({ port: 8080 }, () => {
    console.log('Connected to server');
    client.write("GET /api/data HTTP/1.1\r\n"+
"Host: example.com\r\n"+
"User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36\r\n"+
"Content-Type: application/json\r\n"+
"Accept: application/json\r\n"+
"Authorization: Bearer your-access-token\r\n"+
"Content-Length: 45\r\n"+
"Connection: close\r\n"+
"\r\n"+
"{\"name\": \"Sangeetha\", \"age\": 25, \"email\": \"sangeetha@example.com\"}\r\n");
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
