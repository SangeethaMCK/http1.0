const bodyParser = (req, res, next) => {
    console.log('Body Parser');
    const contentType = req.headers['Content-Type'] || req.headers['content-type'];

    if (contentType === 'application/json' && req.body) {
        try {
            req.body = JSON.parse(req.body);
        } catch (e) {
            console.error('Error parsing JSON:', e);
            res.statusCode = 400;
            res.headers.push({ 'Content-Type': 'application/json' });
            res.body = JSON.stringify({ error: 'Invalid JSON' });
            return;
        }
    } else if (contentType === 'text/plain' || contentType === 'text/html') {
        req.body = req.body.toString();
    }

    next();
};

module.exports = { bodyParser };
