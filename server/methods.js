const fs = require("fs");
const path = require("path");

const methods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
};

// Helper function to send a response
const sendResponse = (res, statusCode, contentType, body) => {
  res.setStatusCode(statusCode);
  res.setHeader('Content-Type', contentType);
  res.setHeader('Content-Length', Buffer.from(body).length);
  res.setBody(body);
  res.send();
};

const methodHandler = (req, res) => {
  console.log('methodHandler', req);
  const { method, path: reqPath, headers, body } = req;

  switch (method) {
    case methods.GET:
      const filePath = path.join(
        __dirname,
        reqPath === "/" ? "index.html" : reqPath
      );

      fs.readFile(filePath, (err, data) => {
        if (err) {
          console.error(`Error reading file: ${filePath}`, err);
          sendResponse(
            res,
            404,
            "application/json",
            JSON.stringify({ error: "File not found" })
          );
        } else {
          // Determine Content-Type based on file extension
          const ext = path.extname(filePath).slice(1);
          const contentTypeMap = {
            html: "text/html",
            js: "application/javascript",
            css: "text/css",
            json: "application/json",
            txt: "text/plain",
          };

          const contentType = contentTypeMap[ext] || "application/octet-stream";
          sendResponse(res, 200, contentType, data);
        }
      });
      break;

    case methods.POST:
      try {
        // If body is JSON, parse it
        const parsedBody = headers["content-type"] === "application/json" ? JSON.parse(body) : body;
        console.log("Parsed Body:", parsedBody);

        sendResponse(
          res,
          201,
          headers["content-type"] || "application/json",
          JSON.stringify({
            message: "Created successfully",
            data: parsedBody,
          })
        );
      } catch (error) {
        console.error("Error parsing body:", error);
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
        // If body is JSON, parse it
        const updatedBody = headers["content-type"] === "application/json" ? JSON.parse(body) : body;
        console.log("Updated Body:", updatedBody);

        sendResponse(
          res,
          200,
          headers["content-type"] || "application/json",
          JSON.stringify({ message: "Updated successfully", data: updatedBody })
        );
      } catch (error) {
        console.error("Error parsing body:", error);
        sendResponse(
          res,
          400,
          "application/json",
          JSON.stringify({ error: "Invalid body content" })
        );
      }
      break;

    case methods.PATCH:
      try {
        // If body is JSON, parse it
        const updatedBody = headers["content-type"] === "application/json" ? JSON.parse(body) : body;
        console.log("Updated Body:", updatedBody);

        sendResponse(
          res,
          200,
          headers["content-type"] || "application/json",
          JSON.stringify({ message: "Updated successfully", data: updatedBody })
        );
      } catch (error) {
        console.error("Error parsing body:", error);
        sendResponse(
          res,
          400,
          "application/json",
          JSON.stringify({ error: "Invalid body content" })
        );
      }

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
