const middlewares = [];

// Function to add a middleware
function use(middleware) {
    middlewares.push(middleware);
    console.log('Middleware Added:',middleware.length);
   
}

// Function to apply middlewares sequentially
async function applyMiddlewares(req, res, next) {
    console.log('Middleware Handler:',middlewares);

    let index = -1;

    async function nextMiddleware() {
        index++;
        if (index < middlewares.length) {
            await middlewares[index](req, res, nextMiddleware);
        } else {
            await next(); 
        }
    }

    await nextMiddleware();
}
module.exports = { use, applyMiddlewares };
