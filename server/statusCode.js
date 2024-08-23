function statusMessage(statusCode) {
    const statusMessages = {
        200: "OK",
        201: "Created",
        400: "Bad Request",
        404: "Not Found",
        405: "Method Not Allowed"
        
    };
    return statusMessages[statusCode] || "Unknown Status";
}
module.exports = statusMessage;