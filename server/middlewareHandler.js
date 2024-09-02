const { methodHandler } = require("./methods");

const middlewares = [];

// Function to add a middleware
function use(middleware) {
    middlewares.push(middleware);
}

// Function to apply middlewares sequentially
async function applyMiddlewares(req, res, next) {
    console.log('Middleware Handler:');

    let index = -1;

    async function nextMiddleware() {
        index++;
        if (index < middlewares.length) {
            await middlewares[index](req, res, nextMiddleware);
        } else {
            await next(); // Proceed to the next stage (route handling) after all middlewares
        }
    }

    await nextMiddleware();
}
module.exports = { use, applyMiddlewares };
