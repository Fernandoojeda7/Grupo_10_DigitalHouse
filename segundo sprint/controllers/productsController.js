const { json } = require('express');
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));



const controller = {
	index: (req, res) => {
		res.render('index', {products})
	},

	
	productDetail: (req, res) => {
		res.render('productDetail')
	},

	
	create: (req, res) => {
		res.render('addProduct')
	},
	

	store: (req, res) => {
		console.log(req.files);
		let newProduct= {
			id: products[products.length - 1].id + 1,
			...req.body,
			image: req.file.fieldname
		}

		products.push(newProduct)

		const jsonProduct = JSON.stringify(products);
		fs.writeFileSync(productsFilePath, jsonProduct, 'utf-8')
		res.render('addProduct')
	},

	// Update - Form to edit
	edit: (req, res) => {
		res.render('editProduct')
	},
	// Update - Method to update
	update: (req, res) => {
		res.render('')
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		res.render('')
	}
};

module.exports = controller;