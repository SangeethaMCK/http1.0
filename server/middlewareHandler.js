

const dispatchChain = (req, res, middlewares) => {
    return middlewaresChain(req, res, middlewares)
}

const middlewaresChain = (req, res, middlewares) => {
    if(middlewares.length === 0) {
        return ;
    }
    // get the first middleware
    const currentMiddleware = middlewares[0];

    
    return currentMiddleware(req, res, async() => {
        await middlewaresChain(req, res, middlewares.slice(1))
    })
}