const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator');

const proveedorFilePath = path.join(__dirname, '../data/usersDataBase.json');
const proveedor = JSON.parse(fs.readFileSync(proveedorFilePath, 'utf-8'));

const controller = {

    registerProv: (req, res) => {
		const errors = validationResult(req);
		if (errors.isEmpty()){
		let newProv= {
			id: proveedor[users.length - 1].id + 1,
			...req.body,
			contraseña: bcrypt.hashSync(req.body.contraseña, 10),
		}

		proveedor.push(newProv)

		const jsonProv = JSON.stringify(users);
		fs.writeFileSync(proveedorFilePath, jsonProv, 'utf-8')
		res.render('login_Proveedor');
		} else {

			return res.render('registerProveedor', {errors: errors.errors, old: req.body});
		}
	}
};

module.exports = controller;
