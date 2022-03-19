const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator');


const proveedorFilePath = path.join(__dirname, '../data/proveedorDataBase.json');
const proveedor = JSON.parse(fs.readFileSync(proveedorFilePath, 'utf-8'));



const controller = {


	loginProv: (req, res) => {
		res.render('loginProv')
	},

	processLoginProv: (req, res) =>{
		const errors = validationResult(req);
		if (errors.isEmpty()){
			 let provJson = fs.readFileSync(proveedorFilePath, 'utf-8');
			 let proveedor;
			 if(proveedor == "") {
				 proveedor =[];
			 } else {
				 proveedor = JSON.parse(provJson)
			 }
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

			 if (req.body.recordame != undefined) {
				res.cookie('recordame', provALogin.email, {maxAge: 20000 })
			 }
			 console.log(provALogin);
			 res.render('addProduct');
		} else {

			return res.render('loginProv', {errors: errors.errors});
		}
	},

    registerProv: (req, res) => {
		res.render('registerProveedor');
	},

	registeredProv: (req, res) => {
		const errors = validationResult(req);
		if (errors.isEmpty()){
		let newProv= {
			id: proveedor[proveedor.length - 1].id + 1,
			...req.body,
			contraseña: bcrypt.hashSync(req.body.contraseña, 10),
			
		}

		proveedor.push(newProv)

		const jsonProv = JSON.stringify(proveedor);
		fs.writeFileSync(proveedorFilePath, jsonProv, 'utf-8')
		res.render('loginProv');
		} else {

			return res.render('registerProveedor', {errors: errors.errors, old: req.body});
		}
	}
};

module.exports = controller;
