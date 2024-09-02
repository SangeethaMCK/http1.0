const routes = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {},
    // Add other methods as needed
};

function route(method, path, handler) {
    // console.log('Route Handler:');
    
    if (!routes[method]) {
        routes[method] = {};
    }

    const normalizedPath = path.startsWith("/") ? path.slice(1) : path;
    
    routes[method][normalizedPath] = handler;
    
}

module.exports = { route, routes };
