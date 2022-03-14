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
			return res.redirect('products')})
		.catch(error => res.send(error))
	} else {

			return res.render('addProduct', {errors: errors.errors, old: req.body});
		}
	},	

	edit: function(req,res) {
		let productoId = req.body.id;
		let promProductos = Productos.findByPk(productoId, {include: ['venta', 'proveedor', 'usuario']});      	
		let promVentas = Ventas.findAll();
        let promProveedores = Proveedores.findAll();
		let promUsuarios = Usuarios.findAll();
       
        Promise
        .all([promProductos, promVentas, promProveedores, promUsuarios])
        .then((Producto) => {
            return res.render(path.resolve(__dirname, '..', 'views',  'editProduct'), {Producto: Producto})})
        .catch(error => res.send(error))
		
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
        let productId = req.params.id;
        Productos.destroy({where: {id: productId}, force: true}) 
        .then(()=>{
            return res.redirect('/products')})
        .catch(error => res.send(error)) 
    },

	search: (req, res) =>{
		let loQueBuscoElUsuario = req.query.search;
		Productos
		let resultado = [];
		for (let i = 0; i < Productos.length; i++){
			if (Productos[i].name.includes(loQueBuscoElUsuario)){
				resultado.push(Productos[i]);
			} else {
				res.send('El Producto no se encontro')
			}
		}
		res.render('productResult', {Productos})
	}


};


module.exports = controller;