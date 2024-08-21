const net = require('net');
const reqParser = require('./requestParser'); 
const resParser = require('./responseParser');

const port = 8080;

const server = net.createServer( => {

});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
