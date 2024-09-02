const statusMessages = require('./statusCode');

const createReq = () => {
    return {
    method:'',    
    version:'http/1.0',
    path:'',
    headers:{},
    body:'',
    query:{},
    params:{},

    setMethod(method) {
        this.method = method;
    },

    setPath(path) {
        this.path = path;
    },

    setHeaders(headers) {
        this.headers = headers;
    },

    setBody(body) {
        this.body = body;
    },

    setQuery(query) {
        this.query = query;
    },

    setParams(params, value) {
        this.params[params] = value;
    }
}
};

const createRes = (connection) => {
    return {
    statusCode: '',  
    headers: {},      
    body: '',         
    
    setStatusCode(code) {
        this.statusCode = code;
    },
    
    setHeader(name, value) {
        this.headers[name] = value;
    },

    setBody(content) {
        this.body = content;
    },

    send() {
        let response = (`HTTP/1.0 ${this.statusCode} ${statusMessages(this.statusCode)}\r\n`);

        for (const [key, value] of Object.entries(this.headers)) {
            response += `${key}: ${value}\r\n`;
        }   
        response += `\r\n`;

        if (this.body) {
            response += this.body;
        }
        connection.write(response);
        connection.end();
        return;
    }
}}

module.exports = { createReq, createRes };
