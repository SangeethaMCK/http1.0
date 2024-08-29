const cors = (req, res, next) => {
    console.log("CORS", res.headers);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next(); 
  };
  
  module.exports = {cors};
  