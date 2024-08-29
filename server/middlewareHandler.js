const { methodHandler } = require("./methods");

const middlewares = [];

// Function to add a middleware
function use(middleware) {
    middlewares.push(middleware);
}

// Function to apply middlewares sequentially
async function applyMiddlewares(req, res, next) {
    let index = 0;

    async function nextMiddleware() {
        index++;
        if (index < middlewares.length) {
            await middlewares[index](req, res, nextMiddleware);
        } else {
            methodHandler(req, res); // Call methodHandler when done with all middlewares
        }
    }

    if (middlewares.length > 0) {
        await middlewares[index](req, res, nextMiddleware);
    } else {
        methodHandler(req, res); // Call methodHandler if no middlewares
    }
}

module.exports = { use, applyMiddlewares };
