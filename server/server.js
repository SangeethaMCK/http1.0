const net = require('net');
const statusMessages = require('./statusCode');
const { reqParser } = require('./requestParser');
const { applyMiddlewares } = require('./middlewareHandler');
const { route, routes } = require('./routeHandler');
const { use } = require('./middlewareHandler');
const { methodHandler } = require('./methods');


// Function to handle incoming connections
function handleConnection(connection) {
    console.log('Client connected');
    console.log("routes", routes);
    connection.on('data', async (data) => {
        let req ={
            method:'',
            version:'',
            path:'',
            headers:{},
            body:'',
            query:{},
            params:{}

        }
         
        const res = {
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
        };
        console.log("data",data);
        req = reqParser(req, res, data, routes); 

        await applyMiddlewares(req, res, () => {

            if (route[req.method] && route[req.method][req.path]) {
                route[req.method][req.path](req, res);
            } else {
                methodHandler(req, res);
            }
        });
    });

    connection.on('end', () => {
        console.log('Client disconnected');
    });

    connection.on('error', (err) => {
        console.error('Error:', err);
    });
}

// Create the server
const server = () => {
    const serverInstance = net.createServer(handleConnection);
    serverInstance.use = use;
    serverInstance.route = route;
    return serverInstance;
};

// Export the server creation function
module.exports = {
    server
};
