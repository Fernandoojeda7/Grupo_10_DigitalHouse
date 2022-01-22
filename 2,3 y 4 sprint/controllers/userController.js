const fs = require('fs');
const path = require('path');
// const { json } = require('express');

const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));



const controller = {
	login: (req, res) => {
		res.render('login')
	},

	
	register : (req, res) => {
		res.render('register');
	},

	registered: (req, res) => {
		const newUser = { 
			nombre: req.body.nombre, 
			documento: req.body.documento, 
			email: req.body.email, 
			fecha: req.body.fecha, 
			contraseña: req.body.contraseña, 
			confirmarContraseña: req.body.confirmarContraseña };
			
			users.push(newUser);
			console.log(req.body);

		const jsonUser = JSON.stringify(users);
		fs.writeFileSync(usersFilePath, jsonUser, 'utf-8')
		res.render('login')
	}

	
};

module.exports = controller;