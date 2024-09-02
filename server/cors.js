const cors = (req, res, next) => {
  console.log('CORS:');
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
     res.setStatusCode(200);
     res.send();
     return;

  }
  
  next();
};

module.exports = { cors };
