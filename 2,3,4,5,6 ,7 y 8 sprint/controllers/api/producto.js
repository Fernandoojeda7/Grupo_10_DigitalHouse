const db = require('../../database/models');
const Sequelize = require('sequelize')
const Op = db.sequelize;

const Productos = db.Producto;
const Proveedor = db.Proveedor;

const controller = {

    lista: async (req, res) => {
        let individualesCount = await Productos.count(
            {
                attributes: ['category'],
                group: 'category',

            })
        let generalCount = await Productos.count();

        let totalProductos = await Productos.findAll();

        let productosAProveedor = await Productos.count({
            include: [{model: Proveedor, as: 'proveedores'}],
            distinct: 'id' 
        });

        let allProducts = await totalProductos.map(producto => ({
            id: producto.id,
            nombre: producto.name,
            descripcion:producto.description,
            detail: req.originalUrl + '/' + producto.id
            }))

        return res.json({
            total: generalCount,
            individuals: individualesCount,
            array: productosAProveedor,
            products: allProducts
            })
    },
    
    detalle: (req, res) => {
        Productos.findByPk(req.params.id)
            .then((producto) => {
                return res.status(200).json({
                    status: 200,
                    Producto: [{
                        Id: producto.id,
                        nombre: producto.name,
                        precio: producto.price,
                        descuento: producto.descount,
                        tipo: producto.type,
                        categoria: producto.category,
                        descripcion: producto.description,
                        imagen: 'http://localhost:3030/img/products' + '/' + producto.image
    
                    }]
                    })
                })


    }



}

module.exports = controller;
