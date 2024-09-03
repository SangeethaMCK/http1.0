const cors = (options = {}) =>{
  const {
     origin = '*',
     methods = 'GET, POST, PUT, PATCH, DELETE',
     headers = 'Content-Type, Authorization',
     } = options;

  return(req, res, next) => {
  console.log('CORS:');
  
  if(typeof origin === 'string'){
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  else{
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  }

  res.setHeader('Access-Control-Allow-Methods', methods);
  res.setHeader('Access-Control-Allow-Headers', headers);
  
  if (req.method === 'OPTIONS') {
     res.setStatusCode(200);
     res.send();
     return;

  }
  
  next();
};
};

module.exports = { cors };
