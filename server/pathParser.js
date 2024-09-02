// const { bodyParser } = require("./bodyParser");

const pathParser = (req, res,routes) => {
console.log('Path Parser:');

    const [pathWithoutQuery, queryString] = req.path.split('?');
     req.pathArr = pathWithoutQuery.split('/').filter(segment => segment);


    // Extract query parameters
    if (queryString) {
        const queryArr = queryString.split('&');
        queryArr.forEach(query => {
            const [key, value] = query.split('=');
            req.setQuery(key, decodeURIComponent(value));
        });
    }
};




module.exports = { pathParser };
