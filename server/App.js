const { server } = require('./server'); 
const { bodyParser } = require('./bodyParser');
const { cors } = require('./cors');

const app = server();
app.use(bodyParser);
app.use(cors);

const getUsers = (req, res) => {    
    res.setStatusCode(200);
    res.setHeader('Content-Type', 'application/json');
    res.setBody(JSON.stringify({ message: `User ID is ${req.params.userId}`, query: req.query }));
    res.send();
};

app.route('GET', '/users/:userId', getUsers);


// Start the server
app.listen(8080, () => {
    console.log('Server listening on port 8080');
});
