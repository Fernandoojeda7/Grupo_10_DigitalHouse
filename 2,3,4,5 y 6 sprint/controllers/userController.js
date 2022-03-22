const path = require('path');
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const Productos = db.Producto;
const Usuarios = db.Usuario;



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
		Usuarios.findAll()
		.then((resultado)=> {

			console.log(resultado)
		})
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
		 Usuarios.findAll()
		 .then((usuarios)=>{
			let usuarioALoguearse
			 for (let i = 0; i < usuarios.length; i++) {
				 if (usuarios[i].email == req.body.email) {
					 if (bcrypt.compareSync(req.body.contraseña, usuarios[i].contraseña)){
						   usuarioALoguearse = usuarios[i];
						 break;
					 }
					 
				 }
			 }
				 if(usuarioALoguearse == undefined) {
					 return res.render('login', {errors: [
						 {msg: 'Credenciales Invalidas',
						}
					 ]});
				 }
				 
				 req.session.usuarioLogueado = usuarioALoguearse;
				 res.render('users', {usuarios: usuarioALoguearse, Productos })
				 
				 if (req.body.recordame != undefined) {
					 res.cookie('recordame', usuarioALoguearse.email, {maxAge: 20000 })
				 }}).catch(error => res.send(error))
	},

	users: (req, res) => {
		let promProducto = Productos.findAll();
		let promUsuario = Usuarios.findAll();
        
        Promise
        .all([promProducto, promUsuario])
        .then(([Productos, allProductos, allUsuarios]) => {
            return res.render('users', {Productos,allProductos,allUsuarios})})
        .catch(error => res.send(error))
    
		
			// let usuarioALoguearse
			//  for (let i = 0; i < usuarios.length; i++) {
			// 	 if (Usuarios[i].email == req.body.email) {
			// 		 if (bcrypt.compareSync(req.body.contraseña, Usuarios[i].contraseña)){
			// 			   usuarioALoguearse = Usuarios[i];
			// 			 break;
			// 		 }
					 
			// 	 }
			//  }
				
			// 	 req.session.usuarioLogueado = usuarioALoguearse;
				 
				 
			// 	 if (req.body.recordame != undefined) {
			// 		 res.cookie('recordame', usuarioALoguearse.email, {maxAge: 20000 })
			// 	 }   
			// 	res.render('users', { Usuarios: usuarioALoguearse, Productos })
				
	},

	usersDB: (req, res) => {
		Usuarios.findAll()
		 .then((Usuarios)=>{
		res.render('usersDB', { Usuarios })
	})
},

edit: function(req,res) {
	let usuarioId = req.params.id;
	Usuarios.findByPk(usuarioId)
	.then((Usuario) =>{
		res.render('editUser', {Usuario, old: req.body}) 
	})      	
},

	update: (req, res) => {
		const idUsuario = req.params.id;
		Usuarios.update(
            {
					nombre: req.body.nombre,
					apellido: req.body.apellido,
					documento: req.body.documento,
					direccion: req.body.direccion,
					email: req.body.email
			},
            {
                where: {id: idUsuario}
            })
        .then(()=> {
            return res.redirect('/user/usersDB')})            
        .catch(error => res.send(error))
    },
	
	destroy: function (req,res) {
        let usuarioId = req.params.id;
        Usuarios.destroy({where: {id: usuarioId}, force: true}) 
        .then(()=>{
            return res.redirect('/user/usersDB')})
        .catch(error => res.send(error)) 
    }

	
};

module.exports = controller;

