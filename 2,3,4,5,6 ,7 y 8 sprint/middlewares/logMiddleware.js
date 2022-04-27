
const fs = require('fs') 

function logMiddleware(req, res, next){
    fs.appendFileSync('./logs/log.txt', 'Se ingreso en la página ' + req.url +'\n');

    next();
};

module.exports = logMiddleware;