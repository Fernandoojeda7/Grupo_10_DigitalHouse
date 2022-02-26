const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator');

const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
	login: (req, res) => {
		res.render('login')
	},

	processLogin: (req, res) =>{
		const errors = validationResult(req);
		if (errors.isEmpty()){
			 let usersJson = fs.readFileSync(usersFilePath, 'utf-8');
			 let users;
			 if(users == "") {
				 users =[];
			 } else {
				 users = JSON.parse(usersJson)
			 }
			 let userALogin
			 for (let i = 0; i < users.length; i++) {
				 if (users[i].email == req.body.email) {
					 if (bcrypt.compareSync(req.body.contraseña, users[i].contraseña)) {
						   userALogin = users[i];
						 break;
					 }

				 }
			 }
			 if (userALogin == undefined) {
				return res.render('login', {errors: [
					{msg: 'Contraseña Incorrecta'}
				]});
			 }

			 req.session.userLogin = userALogin;

			 if (req.body.recordame != undefined) {
				res.cookie('recordame', userALogin.email, {maxAge: 20000 })
			 }
			 console.log(userALogin);
			 res.render('users', { user: userALogin, products })
		} else {

			return res.render('login', {errors: errors.errors});
		}
	},

	register : (req, res) => {
		res.render('register');
	},

	registered: (req, res) => {
		const errors = validationResult(req);
		if (errors.isEmpty()){
		let newUser= {
			id: users[users.length - 1].id + 1,
			...req.body,
			contraseña: bcrypt.hashSync(req.body.contraseña, 10),
			image: req.file.filename
		}

		users.push(newUser)

		const jsonUser = JSON.stringify(users);
		fs.writeFileSync(usersFilePath, jsonUser, 'utf-8')
		res.render('login');
		} else {

			return res.render('register', {errors: errors.errors, old: req.body});
		}
	},

	users: (req, res) => {
		let userALogin
		for (let i = 0; i < users.length; i++) {
			if (users[i].email == req.body.email) {
				if (bcrypt.compareSync(req.body.contraseña, users[i].contraseña)) {
					  userALogin = users[i];
					break;
				}
			}
		}
		req.session.userLogin = userALogin;

			 if (req.body.recordame != undefined) {
				res.cookie('recordame', userALogin.email, {maxAge: 20000 })
			 }
		res.render('users', { user: userALogin, products })
	},

	usersDB: (req, res) => {
		
		res.render('usersDB', { users })
	}

	
};

module.exports = controller;

