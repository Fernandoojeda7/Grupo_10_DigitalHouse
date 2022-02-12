const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs')
// const { json } = require('express');

const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
	login: (req, res) => {
		res.render('login')
	},

	
	register : (req, res) => {
		res.render('register');
	},

	registered: (req, res) => {
		console.log(req.file);
		if(req.file){
		let newUser= {
			id: users[users.length - 1].id + 1,
			nombre: req.body.nombre, 
			documento: req.body.documento, 
			email: req.body.email, 
			fecha: req.body.fecha, 
			contraseña: bcrypt.hashSync(req.body.contraseña, 10),
			image: req.file.filemane
		}
		users.push(newUser)
		const jsonUser = JSON.stringify(users);
		fs.writeFileSync(usersFilePath, jsonUser, 'utf-8')
		res.render('login')
	} else{
		res.render('register')
	}
	},

	users: (req, res) => {
		res.render('users', { users, products })
	},

	
};

module.exports = controller;

// const newUser = { 
// 	nombre: req.body.nombre, 
// 	documento: req.body.documento, 
// 	email: req.body.email, 
// 	fecha: req.body.fecha, 
// 	contraseña: req.body.contraseña, 
// 	confirmarContraseña: req.body.confirmarContraseña };