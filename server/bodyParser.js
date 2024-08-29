const bodyParser = (req, res, next) => {
    const contentType = req.headers['Content-Type'] || req.headers['content-type'];

    if (contentType === 'application/json' && req.body) {
        try {
            req.body = JSON.parse(req.body);
        } catch (e) {
            console.error('Error parsing JSON:', e);
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Invalid JSON' }));
        }
    } else if (contentType === 'text/plain' || contentType === 'text/html') {
        req.body = req.body.toString();
    }

    next();
};

module.exports = { bodyParser };
