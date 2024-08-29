const { server } = require('./server'); 
// const { bodyParser } = require('./bodyParser');
const { cors } = require('./cors');

const app = server();
// app.use(bodyParser);
app.use(cors);

const getUsers = (req, res) => {    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: `User ID is ${req.params.userId}`, query: req.query }));
};

app.route('GET', '/users/:userId', getUsers);


// Start the server
app.listen(8080, () => {
    console.log('Server listening on port 8080');
});
