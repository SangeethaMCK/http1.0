const net = require('net');
const statusMessage = require('./statusCode');
const { reqParser } = require('./requestParser');
const { applyMiddlewares } = require('./middlewareHandler');
const { route, routes } = require('./routeHandler');
const { use } = require('./middlewareHandler');
const { methodHandler } = require('./methods');

// Function to handle incoming connections
function handleConnection(connection) {
    console.log('Client connected');

    connection.on('data', async (data) => {
        const req = reqParser(data.toString(), routes); // Parse the request
        console.log('Parsed Request:', req);

        // Prepare response object
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
            },
            headersSent: false // Add this to check if headers are sent
        };

        // Apply middlewares and route the request
        await applyMiddlewares(req, res, () => {

            if (route[req.method] && route[req.method][req.path]) {
                route[req.method][req.path](req, res);
            } else {
                methodHandler(req, res);
            }
        });
    });

    connection.on('end', () => {
        console.log('Client disconnected');
    });

    connection.on('error', (err) => {
        console.error('Error:', err);
    });
}

// Create the server
const server = () => {
    const serverInstance = net.createServer(handleConnection);
    serverInstance.use = use;
    serverInstance.route = route;
    return serverInstance;
};

// Export the server creation function
module.exports = {
    server
};
