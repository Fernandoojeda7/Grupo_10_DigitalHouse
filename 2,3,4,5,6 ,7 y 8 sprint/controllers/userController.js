const path = require('path');
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator');
const db = require('../database/models');
const sequelize = db.sequelize;


const Productos = db.Producto;
const Usuarios = db.Usuario;



const controller = {
	login: (req, res) => {
		res.render('login')
	},

	resultado: (req, res) => {
		res.render('perfilAct')
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
		.then(()=> {
		})
		const errors = validationResult(req);
		if (errors.isEmpty()){
			console.log(req.file);
			Usuarios.create(
				{
					nombre: req.body.nombre,
					apellido: req.body.apellido,
					documento: req.body.documento,
					email: req.body.email,
					fecha_nacimiento: req.body.fecha_nacimiento,
					direccion: req.body.direccion,
					contraseña: bcrypt.hashSync(req.body.contraseña, 10),
					image: `/img/users/${req.file.filename}`,
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
				 const productos = Productos.findAll()
				 .then((response) =>{
					  res.render('users', {usuarios: usuarioALoguearse, productos: response })
				 })
				 
				 if (req.body.recordame != undefined) {
					 res.cookie('recordame', usuarioALoguearse.email, {maxAge: 20000 })
				 }}).catch(error => res.send(error))
	},

	users: (req, res) => {
			Usuarios.findAll()
				.then((users) => {
					let usuarioALoguearse
				for (let i = 0; i < users.length; i++) {
					if (users[i].email == req.cookies.recordame) {
						usuarioALoguearse = users[i];
							break;
						}
					}
					if(usuarioALoguearse == undefined) {
						return res.render('login', {errors: [
							{msg: 'Debes Iniciar Sesión',
						   }
						]});
					}
				req.session.usuarioLogueado = usuarioALoguearse;
				const productos = Productos.findAll()
				.then((response) =>{
					 res.render('users', {usuarios: usuarioALoguearse, productos: response })
				})
				})
			
	},

	usersDB: (req, res) => {
		Usuarios.findByPk(req.params.id)
			.then(usuario => {
				res.render('UsersDB', {Usuarios: usuario} )
			}).catch(error => res.send(error))    
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
					email: req.body.email,
					contraseña: bcrypt.hashSync(req.body.contraseña, 10)
			},
            {
                where: {id: idUsuario}
            })
        .then(()=> {
            return res.render('perfilAct')})            
        .catch(error => res.send(error))
    },
	
	destroy: function (req,res) {
        let usuarioId = req.params.id;
        Usuarios.destroy({where: {id: usuarioId}, force: true}) 
        .then(()=>{
            return res.redirect('/')})
        .catch(error => res.send(error)) 
    }

	
};

module.exports = controller;

