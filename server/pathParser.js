const pathParser = (req, res,routes) => {
    console.log('pathParser');

    const [pathWithoutQuery, queryString] = req.path.split('?');
    const pathArr = pathWithoutQuery.split('/').filter(segment => segment);


    const matchedRoute = findMatchingRoute(req.method, pathArr, routes);

    // Extract route parameters
    if (matchedRoute) {
        const routeSegments = matchedRoute.split('/').filter(segment => segment);
        for (let i = 0; i < routeSegments.length; i++) {
            if (routeSegments[i].startsWith(':')) {
                const paramName = routeSegments[i].slice(1);
                req.setParam(paramName, pathArr[i]);
            }
        }
        console.log("match",routes[method][matchedRoute]);
        routes[method][matchedRoute](req, res);
    }

    // Extract query parameters
    if (queryString) {
        const queryArr = queryString.split('&');
        queryArr.forEach(query => {
            const [key, value] = query.split('=');
            req.setQuery(key, decodeURIComponent(value));
        });
    }
    return req;
};

function findMatchingRoute(method, pathArr, routes) {
    const methodRoutes = routes[method];
    if (!methodRoutes) {
        console.log(`No routes found for method: ${method}`);
        return null;
    }
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
