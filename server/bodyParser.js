const bodyParser = (body, headers) => {
    
    const contentType = headers['Content-Type'];
    console.log('Content-Type:', contentType);
    if (contentType === 'application/json') {
        // console.log('Body-json:', JSON.parse(body));
        return JSON.parse(body);
    }
    else if (contentType === 'text/plain') {
        // console.log('Body-text:', body.toString());
        return body.toString();
    }
    else if(contentType === 'text/html') {
        // console.log('Body-html:', body.toString());
        return body.toString();
    }
    // return body.toString();
};

module.exports = bodyParser;