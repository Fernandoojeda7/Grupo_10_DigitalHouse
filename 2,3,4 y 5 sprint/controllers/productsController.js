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
		
		res.render('editProduct', { productEdit });

	
	},

	update: (req, res) => {
		const idProduct = req.params.id;
		let productEdit = products.find(item => item.id == idProduct);
				
		productEdit = productAct = {
				id: req.body.id,
      			name: req.body.name,
				description: req.body.description,
				price: req.body.price,
				discount: req.body.discount,
				category: req.body.category,
				image: req.body.image,
				type: req.body.type
			}
		
		// const jsonProduct = JSON.stringify(productNew);
		// fs.writeFileSync(productsFilePath, jsonProduct, 'utf-8')
		// console.log(productNew);
		res.render('products', { products })


	},
	
	destroy : (req, res) => {
	
		const idProduct = req.params.id;
		const productEdit = products.find(item => item.id == idProduct);

	const product = products.filter(function(i) { return i !== productEdit });

	const jsonProduct = JSON.stringify(product);
	fs.writeFileSync(productsFilePath, jsonProduct, 'utf-8')
		res.send('El producto se elimino correctamente')

		}


};

module.exports = controller;