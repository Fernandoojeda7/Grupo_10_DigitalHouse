const path = require('path');
const { validationResult } = require('express-validator');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");



const Productos = db.Producto;
const Proveedores = db.Proveedor;
const Usuarios = db.Usuario;
const Ventas = db.Venta;


const controller = {
	index: (req, res) => {
		Productos.findAll()
		.then(productos => {
			res.render('products', {productos})
		})
	},

	productDetail: (req, res) => {
		Productos.findByPk(req.params.id)
			.then(productos => {
				res.render('productDetail', {productos} )
			}).catch(error => res.send(error))
		
	},
	add: function (req, res) {
		let promVentas = Ventas.findAll();
        let promProveedores = Proveedores.findAll();
		let promUsuarios = Usuarios.findAll();
        
        Promise
        .all([promVentas, promProveedores, promUsuarios])
        .then(([allVentas, allProveedores, allUsuarios]) => {
            return res.render(path.resolve(__dirname, '..', 'views',  'addProduct'), {allVentas, allProveedores, allUsuarios})})
        .catch(error => res.send(error))
    },


	create: (req, res) => {
		const errors = validationResult(req);
			if (errors.isEmpty()){
		Productos.create(
			{
				name: req.body.name,
    			discount: req.body.discount,
    			price: req.body.price,
    			category: req.body.category,
    			type: req.body.type,
    			description: req.body.description,
				image: req.file.filename
			}
		) 
		.then(()=> {
			return res.redirect('/products')})
		.catch(error => res.send(error))
	} else {

			return res.render('addProduct', {errors: errors.errors, old: req.body});
		}
	},	

	edit: function(req,res) {
		let productoId = req.params.id;
		Productos.findByPk(productoId)
		.then((Producto) =>{
			res.render('editProduct', {Producto})
		})      	
	},

	update: (req, res) => {
		const idProducto = req.params.id;
		Productos.update(
            {
				name: req.body.name,
    			discount: req.body.discount,
    			price: req.body.price,
    			category: req.body.category,
    			type: req.body.type,
    			description: req.body.description
			},
            {
                where: {id: idProducto}
            })
        .then(()=> {
            return res.redirect('/products')})            
        .catch(error => res.send(error))
    },
	
	destroy: function (req,res) {
        let productoId = req.params.id;
        Productos.destroy({where: {id: productoId}, force: true}) 
        .then(()=>{
            return res.redirect('/products')})
        .catch(error => res.send(error)) 
    },

	search: (req, res) =>{
		Productos.findAll()
		.then((producto) => {
		let busqueda = req.query.search;
		for (let i = 0; i < producto.length; i++){
			if(busqueda.length < 0){
				break;
			}
			if (producto[i].name.includes(busqueda)){
				resultado.push(producto[i]);
			} else {
				res.send('El Producto no se encontro')
			}
		}
		res.render('productResult', {Productos: producto, resultado: resultado})
	})}
};


module.exports = controller;