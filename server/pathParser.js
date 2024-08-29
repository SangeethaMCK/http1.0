const pathParser = (method, path, routes) => {
    console.log('pathParser');

    const [pathWithoutQuery, queryString] = path.split('?');
    const pathArr = pathWithoutQuery.split('/').filter(segment => segment);


    const matchedRoute = findMatchingRoute(method, pathArr, routes);

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
        const queryArr = queryString.split('&');
        queryArr.forEach(query => {
            const [key, value] = query.split('=');
            req.query[key] = decodeURIComponent(value);
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
