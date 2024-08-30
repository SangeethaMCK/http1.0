const bodyParser = (req, res, next) => {
    console.log('Body Parser');
    const contentType = req.headers['Content-Type'] || req.headers['content-type'];

    if (contentType === 'application/json' && req.body) {
        try {
            
            req.setBody(JSON.parse(req.body.toString()))
            // console.log("req.body1:",req.body);
            // console.log("parsingg",JSON.parse(req.body));
        } catch (e) {
            console.error('Error parsing JSON:', e);
            res.setStatusCode(400);
            res.setHeader('Content-Type', 'application/json');
            res.setBody(JSON.stringify({ error: 'Invalid JSON' }));
            res.send();
            return;
        }
    } else if (contentType === 'text/plain' || contentType === 'text/html') {
        req.setBody(req.body.toString());
    }

    next();
};

module.exports = { bodyParser };
