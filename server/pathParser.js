const pathParser = (method, path, routes) => {
    console.log('pathParser', path);

    // Split the path into the path without query and the query string
    const [pathWithoutQuery, queryString] = path.split('?');
    const pathArr = pathWithoutQuery.split('/').filter(segment => segment);

    console.log("pathArr", pathArr);


    // Find the matching route
    const matchedRoute = findMatchingRoute(method, pathArr, routes);
    console.log("matchedRoute", matchedRoute);

    // Initialize req object
    const req = {
        params: {},
        query: {},
    };

    // Extract route parameters
    if (matchedRoute) {
        const routeSegments = matchedRoute.split('/').filter(segment => segment);
        for (let i = 0; i < routeSegments.length; i++) {
            if (routeSegments[i].startsWith(':')) {
                const paramName = routeSegments[i].slice(1);
                req.params[paramName] = pathArr[i];
            }
        }
    }

    // Extract query parameters
    if (queryString) {
        console.log("queryString", queryString);
        const queryArr = queryString.split('&');
        queryArr.forEach(query => {
            const [key, value] = query.split('=');
            req.query[key] = decodeURIComponent(value);
        });
    }

    console.log("req after parser", req);
    return req;
};

// Helper function to find the matching route
function findMatchingRoute(method, pathArr, routes) {
    // Access routes for the specific HTTP method
    const methodRoutes = routes[method];
    if (!methodRoutes) {
        console.log(`No routes found for method: ${method}`);
        return null;
    }

    console.log("findMatchingRoute methodRoutes", methodRoutes);

    // Iterate over the paths in the methodRoutes
    for (let route in methodRoutes) {
        const routeSegments = route.split('/').filter(segment => segment);
        let match = true;

        if (routeSegments.length !== pathArr.length) continue;

        for (let i = 0; i < routeSegments.length; i++) {
            if (!routeSegments[i].startsWith(':') && routeSegments[i] !== pathArr[i]) {
                match = false;
                break;
            }
        }

        if (match) return route;
    }

    return null;
}


module.exports = { pathParser };
