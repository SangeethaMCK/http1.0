const net = require('net');
const { reqParser } = require('./requestParser');
const { applyMiddlewares } = require('./middlewareHandler');
const { route, routes } = require('./routeHandler');
const { use } = require('./middlewareHandler');
const { methodHandler } = require('./methods');
const { req, res } = require('./reqResObj');


// Function to handle incoming connections
function handleConnection(connection) {
    console.log('Client connected');
    console.log("routes", routes);
    connection.on('data', async (data) => {
        console.log("data",data);
        
        reqParser(req, res, data, routes); 

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
