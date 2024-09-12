const path = require('path');
const fs = require('fs');

const staticFile = (dirPath) => {
    console.log("staticFile:");
    if (typeof dirPath !== 'string' || !dirPath) {
        throw new Error('Invalid directory path provided.');
    }

    return (req, res, next) => {
        // const cwd = path.resolve();
        // console.log(cwd);
        // console.log(dirPath);
        // console.log(req.path);

        // Construct the file path
        const filePath = path.join(path.resolve(), dirPath, req.path);

      
            // Serve the file
           fs.readFile(filePath, (err, data) => {
                if (err) {
                    // console.error('Error reading file:', err);
                    res.setStatusCode(500);
                    res.setHeader('Content-Type', 'text/plain');
                    res.setBody('Internal Server Error');
                    // res.send();
                }

            res.setStatusCode(200);
            res.setHeader('Content-Type', getContentType(filePath));
            res.setBody(data);
            // res.send(); 
           });
      next();
    };
};

// Utility function to determine content type based on file extension
const getContentType = (filePath) => {
    const extname = path.extname(filePath).toLowerCase();
    console.log(extname);
    switch (extname) {
        case '.html': return 'text/html';
        case '.js': return 'application/javascript';
        case '.css': return 'text/css';
        case '.json': return 'application/json';
        case '.png': return 'image/png';
        case '.jpg':
        case '.jpeg': return 'image/jpeg';
        case '.gif': return 'image/gif';
        default: return 'application/octet-stream';
    }
};

module.exports = { staticFile };
