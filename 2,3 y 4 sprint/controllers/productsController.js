const { json } = require('express');
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const controller = {
	index: (req, res) => {
		res.render('products', {products})
	},

	
	productDetail: (req, res) => {
		const idProduct = req.params.id;
		const detailProduct = products.find(item => item.id == idProduct);
		
		res.render('productDetail', {detailProduct} )
	},

	
	create: (req, res) => {
		res.render('addProduct')
	},
	

	store: (req, res) => {
		console.log(req.files);
		let newProduct= {
			id: products[products.length - 1].id + 1,
			...req.body,
			image: req.file.filename
		}

		products.push(newProduct)

		const jsonProduct = JSON.stringify(products);
		fs.writeFileSync(productsFilePath, jsonProduct, 'utf-8')
		res.render('addProduct')
	},


	edit: (req, res) => {
		const idProduct = req.params.id;
		const productEdit = products.find(item => item.id == idProduct);
		console.log(productEdit);

		res.render('editProduct', { productEdit });

	
	},

	update: (req, res) => {
		res.send('Viajo por Put')
	},
	
	destroy : (req, res) => {
		const numero = req.params.id;
		const idProduct = numero - 1;
		delete products[idProduct];
		
		res.send('Viajo por DELETE')
	}
};

module.exports = controller;