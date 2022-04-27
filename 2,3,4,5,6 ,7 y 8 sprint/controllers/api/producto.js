const db = require('../../database/models');
const Op = db.sequelize;

const Productos = db.Producto;

const controller= {

    lista: (req, res)=> {
        Productos.findAll()
        .then(productos => {
            let response = {
                status:200,
                total: productos.length,
                
            }
            return res.status(200).json({response})
        })

    },
        detalle: (req, res) => {
            Productos.findByPk(req.params.id)
            .then((producto)=>{
                return res.status(200).json({
                    status: 200,
                    Producto: producto
                })
            })
            

        }
        


}

module.exports = controller;