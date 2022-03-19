const path = require('path');
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const Productos = db.Producto;
const Proveedores = db.Proveedor;
const Usuarios = db.Usuario;
const Ventas = db.Venta;


const controller = {
	login: (req, res) => {
		res.render('login')
	},

	register: function (req, res) {
		let promProducto = Productos.findAll();
        
        Promise
        .all([promProducto])
        .then(([todoProductos]) => {
            return res.render(path.resolve(__dirname, '..', 'views',  'register'), {todoProductos})})
        .catch(error => res.send(error))
    },

	registered: (req, res) => {
		const errors = validationResult(req);
		if (errors.isEmpty()){
			Usuarios.create(
				{
					nombre: req.body.nombre,
					apellido: req.body.apellido,
					documento: req.body.documento,
					email: req.body.email,
					fecha_nacimiento: req.body.fecha_nacimiento,
					direccion: req.body.direccion,
					// contraseña: req.body.contraseña,
					contraseña: bcrypt.hashSync(req.body.contraseña, 10),
					image: req.file.filename,
					producto_id: req.body.producto_id

				}
			)
			.then(()=> {
				return res.redirect('login')})
			.catch(error => res.send(error)) 
			
		} else {

			return res.render('register', {errors: errors.errors, old: req.body});
		}
	},

	processLogin: (req, res) =>{
		const errors = validationResult(req);
		if (errors.isEmpty()){
			Usuarios;
			let usuarioALoguearse;
			for (let i = 0; i < Usuarios.length; i++) {
				if (Usuarios[i].email == req.body.email) {
					if (bcrypt.compareSync(req.body.contraseña, Usuarios[i].contraseña)){
						  usuarioALoguearse = Usuarios[i];
						break;
					}
					
				}
				
			} 
			if(usuarioALoguearse == undefined) {
				return res.render('login', {errors: [
					{msg: 'Credenciales Invalidas'}
				]});
			 }

			 req.session.usuarioLogueado = usuarioALoguearse;
			 res.render('users', { Usuarios: usuarioALoguearse, Productos })

			 if (req.body.recordame != undefined) {
				res.cookie('recordame', usuarioALoguearse.email, {maxAge: 20000 })
			 }
			 
		} else {

			return res.render('login', {errors: errors.errors});
		}
	},

	// register: (req, res) => {
	// 	res.render('register');
	// },
	
	

	users: (req, res) => {
		  usuarioALoguearse
		for (let i = 0; i < Usuarios.length; i++) {
			if (Usuarios[i].email == req.body.email) {
				if (bcrypt.compareSync(req.body.contraseña, users[i].contraseña)) {
					  usuarioALoguearse = Usuarios[i];
					break;
				}
			}
		}
		req.session.usuarioLogueado = usuarioALoguearse;

			 if (req.body.recordame != undefined) {
				res.cookie('recordame', usuarioALoguearse.email, {maxAge: 20000 })
			 }
		res.render('users', { Usuarios: usuarioALoguearse, Productos })
	},

	usersDB: (req, res) => {
		
		res.render('usersDB', { Usuarios })
	}

	
};

module.exports = controller;

