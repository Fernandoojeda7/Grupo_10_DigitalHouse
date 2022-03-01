const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

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
		const errors = validationResult(req);
		if (errors.isEmpty()){
		let newProduct= {
			id: products[products.length - 1].id + 1,
			...req.body,
			image: req.file.filename
		}

		products.push(newProduct)

		const jsonProduct = JSON.stringify(products);
		fs.writeFileSync(productsFilePath, jsonProduct, 'utf-8')
		res.render('products')
	} else {

		return res.render('addProduct', {errors: errors.errors, old: req.body});
	}
	},


	edit: (req, res) => {
		const idProduct = req.params.id;
		const productEdit = products.find(item => item.id == idProduct);
		
		res.render('editProduct', { productEdit });

	
	},

	update: (req, res) => {
		const idProduct = req.params.id;
		let productEdit = products.find(item => item.id == idProduct);
				
		productEdit= {
				id: req.body.id,
				name: req.body.name,
				description: req.body.description,
				price: req.body.price,
				discount: req.body.discount,
				category: req.body.category,
				image: req.body.image,
				type: req.body.type
			}  
			products.push(productEdit);
		
		const jsonProduct = JSON.stringify(products);
		fs.writeFileSync(productsFilePath, jsonProduct, 'utf-8')
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

		},
	search: (req, res) =>{
		let loQueBuscoElUsuario = req.query.search;
		products
		let productsResults = [];
		for (let i = 0; i < products.length; i++){
			if (products[i].name.includes(loQueBuscoElUsuario)){
				productsResults.push(products[i]);
			} else {
				res.send('El Producto no se encontro')
			}
		}
		res.render('productResult', { productsResults: productsResults })
	}


};

module.exports = controller;