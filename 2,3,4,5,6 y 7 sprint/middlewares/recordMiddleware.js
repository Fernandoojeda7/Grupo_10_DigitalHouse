const db = require('../database/models');

const Usuarios = db.Usuario;
function recordMiddleware(req, res, next) {
    next();
    if (req.cookies.recordame != undefined &&
        req.session.usuarioLogueado == undefined) {
            Usuarios.findAll()
            .then((users) => {
                let usuarioALoguearse
            for (let i = 0; i < users.length; i++) {
                if (users[i].email == req.cookies.recordame) {
                    usuarioALoguearse = users[i];
                        break;
                    }
                }
                req.session.usuarioLogueado = usuarioALoguearse;
                console.log(usuarioALoguearse)
            })} 
        }


module.exports = recordMiddleware;