const db = require('../../database/models');
const Op = db.sequelize;

const Usuarios = db.Usuario;

const controller= {

    lista: (req, res)=> {
        Usuarios.findAll()
        .then(usuarios => {
            let response =  {
                status:200, 
                total: usuarios.length,
                data: usuarios.map(usuario => ({
                    id: usuario.id,
                    nombre: usuario.nombre,
                    email:usuario.email,
                    Imagen: 'http://localhost:3030/img/users' + '/' + usuario.image,
                    detail: req.originalUrl + '/' + usuario.id
                }))
            }
            
           return res.status(200).json(response);
            
        })
    },
        detalle: (req, res) => {
            Usuarios.findByPk(req.params.id)
            .then((usuario)=>{
                return res.status(200).json({
                    status: 200,
                    Usuario: [{
                    Id: usuario.id,
                    Nombre: usuario.nombre,
                    Apellido: usuario.apellido,
                    Documento: usuario.document,
                    Direccion: usuario.direccion,
                    Email: usuario.email,
                    Fecha_Nacimiento: usuario.fecha_nacimiento,
                    Imagen: 'http://localhost:3030/img/users' + '/' + usuario.image

                }]
                })
            })
            

        }
        


}

module.exports = controller;