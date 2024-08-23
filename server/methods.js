const fs = require("fs");
const path = require("path");
const bodyParser = require("./bodyParser");
const { create } = require("domain");

const methods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
};

// Helper function to send a response
const sendResponse = (res, statusCode, contentType, body) => {
  res.writeHead(statusCode, { "Content-Type": contentType });
  res.end(body);
};

const methodHandler = (req, res) => {
  const { method, path: reqPath, headers, body } = req;

  switch (method) {
    case methods.GET:
      const filePath = path.join(
        __dirname,
        reqPath === "/" ? "index.html" : reqPath
      );
      fs.readFile(filePath, (err, data) => {
        if (err) {
          sendResponse(
            res,
            404,
            "application/json",
            JSON.stringify({ error: "File not found" })
          );
        } else {
          sendResponse(res, 200, headers["content-type"] || "text/html", data);
        }
      });
      break;

    case methods.POST:
      const parsedBody = bodyParser(body, headers);
      console.log("parsedBody", parsedBody);
      if (parsedBody) {
        sendResponse(
          res,
          200,
          headers["content-type"] || "application/json",
          JSON.stringify({
            message: "Created successfully",
            data: parsedBody,
          })
        );
      } else {
        sendResponse(
          res,
          400,
          "application/json",
          JSON.stringify({ error: "Invalid body content" })
        );
      }
      break;

    case methods.PUT:
      try {
        sendResponse(
          res,
          200,
          headers["content-type"] || "application/json",
          JSON.stringify({ message: "Updated successfully" })
        );
      } catch (error) {
        sendResponse(
          res,
          400,
          "application/json",
          JSON.stringify({ error: "Invalid body content" })
        );
      }
      break;

    case methods.DELETE:
      sendResponse(
        res,
        200,
        "application/json",
        JSON.stringify({ message: "Resource deleted" })
      );
      break;

    default:
      sendResponse(
        res,
        405,
        "application/json",
        JSON.stringify({ error: "Method Not Allowed" })
      );
      break;
  }
};

module.exports = { methods, methodHandler };
