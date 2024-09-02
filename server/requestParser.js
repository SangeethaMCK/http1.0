const { bodyParser } = require("./bodyParser");
const { pathParser } = require("./pathParser");

// need to add routes
function reqParser(req, res, data, routes) {
console.log('Request Parser:');

  const delimiters = Buffer.from("\r\n\r\n");


  const [reqHeaders, reqBody] = [
    data.slice(0, data.indexOf(delimiters)),
    data.slice(data.indexOf(delimiters) + delimiters.length),
  ];

  const [reqline, ...reqHeader] = reqHeaders.toString().split("\r\n");

  const [method, path, version] = reqline.split(" ");

  // Parse headers
  const headers = {};
  reqHeader.forEach((header) => {
    const [key, ...values] = header.split(":");
    headers[key.trim()] = values.join(":").trim();
  });
  req.setMethod(method);
  req.setPath(path);
  req.setHeaders(headers);
  req.setBody(reqBody);

pathParser(req, res, routes);
 

}

module.exports = { reqParser };
