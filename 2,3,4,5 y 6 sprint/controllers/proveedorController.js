const path = require('path');
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const Productos = db.Producto;
const Ventas = db.Venta;
const Proveedores = db.Proveedor


const controller = {


	loginProv: (req, res) => {
		res.render('loginProv')
	},

	registerProv: (req, res) => {
		let promProducto = Productos.findAll();
		let promVenta = Ventas.findAll();
		        
        Promise
        .all([promProducto, promVenta])
        .then(([allProductos, allVentas]) => {
            return res.render(path.resolve(__dirname, '..', 'views',  'registerProveedor'), {allProductos, allVentas})})
        .catch(error => res.send(error))
    },

	registeredProv: (req, res) => {
		Proveedores.findAll()
		.then((resultado)=> {

			console.log(resultado)
		})
		const errors = validationResult(req);
		if (errors.isEmpty()){
		Proveedores.create({
					nombre: req.body.nombre,
					apellido: req.body.apellido,
					documento: req.body.documento,
					email: req.body.email,
					direccion: req.body.direccion,
					contraseña: bcrypt.hashSync(req.body.contraseña, 10),
					product_id: req.body.product_id
			
		})
		.then(()=> {
			return res.redirect('loginProv')})
		.catch(error => res.send(error)) 
		} else {

			return res.render('registerProveedor', {errors: errors.errors, old: req.body});
		}
	},

	processLoginProv: (req, res) =>{
		const errors = validationResult(req);
		Proveedores.findAll()
		.then((proveedor) => {
			 let provALogin
			 for (let i = 0; i < proveedor.length; i++) {
				 if (proveedor[i].email == req.body.email) {
					 if (bcrypt.compareSync(req.body.contraseña, proveedor[i].contraseña)) {
						   provALogin = proveedor[i];
						 break;
					 }

				 }
			 }
			 if (provALogin == undefined) {
				return res.render('loginProv', {errors: [
					{msg: 'Contraseña Incorrecta'}
				]});
			 }

			 req.session.provLogin = provALogin;
			 res.render('addProduct');

			 if (req.body.recordame != undefined) {
				res.cookie('recordame', provALogin.email, {maxAge: 20000 })
			 }})
			 .catch(error => res.send(error))
	}

};

module.exports = controller;
