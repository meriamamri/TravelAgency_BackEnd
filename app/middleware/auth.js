const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    /*const token =  req.headers['x-access-token'];
    console.log(token);
    if (!token) return res.status(401).send('Access denied, there is no token provided.');

    try {
      const decoded = jwt.verify(token, config.secret);
      req.user = decoded;
      next();
    }
    catch (ex) {
      res.status(400).send('Invalid token.');
    }*/

    if (!req.headers.authorization){
        return res.status(401).send('Unauthorized request');
    }
    let token = req.headers.authorization.split(' ')[1];
    if(token === 'null'){
        return res.status(401).send('Unauthorized request');
    }
    let payload = jwt.verify(token, config.secret);
    if(!payload){
        return res.status(401).send('Unauthorized request');
    }
    req._id = payload.subject;
    next()
};