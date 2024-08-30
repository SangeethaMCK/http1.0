const routes = {
    GET: {},
    POST: {},
    PUT: {},
    DELETE: {},
    // Add other methods as needed
};

function route(method, path, handler) {
    if (!routes[method]) {
        routes[method] = {};
    }

    // Normalize the path (ensure it doesn't start with "/")
    const normalizedPath = path.startsWith("/") ? path.slice(1) : path;
    // Store the handler in the routes object
    routes[method][normalizedPath] = handler;
    console.log("routes", routes)
}

module.exports = { route, routes };
