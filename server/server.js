const net = require('net');
const { reqParser } = require('./requestParser');
const { applyMiddlewares } = require('./middlewareHandler');
const { route, routes } = require('./routeHandler');
const { use } = require('./middlewareHandler');
const { methodHandler } = require('./methods');
const { createReq, createRes } = require('./reqResObj');


// Function to handle incoming connections
function handleConnection(connection) {
    console.log('Client connected');

    const req = createReq();
    const res = createRes(connection);

    connection.on('data', async (data) => {
        reqParser(req, res, data, routes);

        // Run middlewares before handling routes
        await applyMiddlewares(req, res, async () => {

            const matchedRoute = findMatchingRoute(req.method, req.pathArr, routes);

            // Extract route parameters
            if (matchedRoute) {
                const routeSegments = matchedRoute.split('/').filter(segment => segment);
                for (let i = 0; i < routeSegments.length; i++) {
                    if (routeSegments[i].startsWith(':')) {
                        const paramName = routeSegments[i].slice(1);
                        req.setParams(paramName, req.pathArr[i]);
                    }
                }


                async function runHandlers(index) {
                    const handler =  routes[req.method][matchedRoute][index];
    
                    if (!handler) return; 
    
                    await handler(req, res, () => runHandlers(index + 1));
                }
                runHandlers(0);

            } else {
                methodHandler(req, res); // Handle unsupported methods or routes
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


function findMatchingRoute(method, pathArr, routes) {
    const methodRoutes = routes[method];
    if (!methodRoutes) {
        console.log(`No routes found for method: ${method}`); //
        return null;
    }
    for (let route in methodRoutes) {
        const routeSegments = route.split('/').filter(segment => segment);
        let match = true;

        if (routeSegments.length !== pathArr.length) continue;

        for (let i = 0; i < routeSegments.length; i++) {
            if (routeSegments[i].startsWith(':')) {
                continue;
            }

            if (routeSegments[i] !== pathArr[i]) {
                match = false;
                break;
            }
        }

        if (match) return route;
    }

    return null;
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

// path parser  
// ?array of handlers
// next
// req 
// cors
